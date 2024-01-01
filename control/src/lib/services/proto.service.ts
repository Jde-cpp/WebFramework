import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IAuth } from 'jde-material';
import { Table, IGraphQL, Mutation } from './IGraphQL';

import { Instance } from './app/app.service.types';

interface IStringRequest<T>{ requestId:number; type:T; value:string; }
interface IStringResult{ id:number; value:string; }
interface IMessageUnion{ stringResult:IStringResult }
export interface IError{ requestId?:number; message: string; sc?:number; }

type TransformInput = (x:any)=>any;
type Resolve = (x:any)=>void;
type Reject = ( e:{error:IError} )=>void;

class RequestPromise<ResultMessage>
{
	constructor( public result:(ResultMessage)=>any, public resolve:Resolve, public reject:Reject, public transformInput:TransformInput=null )
	{}
}

export abstract class ProtoService<Transmission,ResultMessage>
{
	//, private UnionCreator:{ new (key:string,value:any):IRequestUnion }
	constructor( private TCreator: { new (): Transmission; }, protected http: HttpClient ){
	}
	connect():void
	{
		this.#socket = webSocket<protobuf.Buffer>( {url: this.socketUrl, deserializer: msg => this.onMessage(msg), serializer: msg=>msg, binaryType:"arraybuffer"} );
		this.#socket.subscribe(
			( msg ) => this.addMessage( msg ),
			( err ) => this.error( err ),
			() => this.socketComplete()
		);
	}
	//should deserialize put into a constant variable or process in deserialization?
	addMessage( msg )
	{
	}
	//
	error( err )
	{
	//	debugger;
		this.sessionId = null;
		if( this.authorizationService )
			this.authorizationService.onLogout();
		console.log( "No longer connected to Server.", err );
		this.handleConnectionError( err );
	}
	sendTransmission( t:Transmission ){
		var toSend = this.encode(t).finish();
		this.#socket.next( toSend );
	}
	send( request:any ):void{
		let t = new this.TCreator();
		t["messages"].push( request );
		if( !this.sessionId || !this.#socket ){
			this.backlog.push( t );
			this.connect();
		}
		else
			this.sendTransmission( t );
	}
	sendPromise<TInput,TResult>( param:string, value:TInput, result?:(ResultMessage)=>any, transformInput?:TransformInput ):Promise<TResult>
	{
		this.send( {[param]: value} ); //new Requests.MessageUnion( <Requests.IMessageUnion>{[param]: value}) );
		return new Promise<TResult>( ( resolve, reject )=>
		{
			this._callbacks.set( value["requestId"], new RequestPromise(result, resolve, reject, transformInput) );//todo also do a proper rejection
		});
	}

	sendStringPromise<ERequest,TResult>( e: ERequest, value:string, transform:(string)=>any, what:string ):Promise<TResult>
	{
		const id = this.getRequestId();
		//if( this.log.results ) console.log( `(${id})${ERequest[q]}( ${value} )` );
		if( this.log.requests )	console.log( `(${id})${what}( ${value} )` );

		return this.sendPromise<IStringRequest<ERequest>,TResult>( "stringRequest", {requestId: id, type: e, value: value}, (x:ResultMessage)=>x["stringResult"], transform );
	}
	async InitWait():Promise<void>
	{
		let p = new Promise<void>( (resolve,reject)=>this.#initCallbacks.push({resolve:resolve,reject:reject}) );
		await p;
		console.log("InitWait done");
	}
	target( suffix:string ){ return `${this.restUrl}/${suffix}` }

	async get<Y>( target:string ):Promise<Y>
	{
		if( !this.#instances )
		{
			await this.InitWait();
		}
		if( this.log.restRequests )	console.log( target );
		let headers = this.sessionId ? {sessionId:this.sessionId} : null;
		let options = headers ? { headers: headers } : {};
		let o = await firstValueFrom( this.http.get(this.target(target), options) );
		return <Y>o;
	}
	async post<Y>( target:string, body:any ):Promise<Y>
	{
		try
		{
			if( !this.#instances )
				await this.InitWait();
			let o =  await firstValueFrom( this.http.post(this.target(target), body) );
			return o["value"];
		}
		catch( e )
		{
			throw e["error"] ? e["error"] : e;
		}
	}


	async query<Y>( ql: string ):Promise<Y>
	{
		if( this.log.restRequests )	console.log( `graphql?query=${ql}` );
		const y = await this.get( `graphql?query=${ql}` );
		return y ? y["data"] : null;
	}

	schema( names:string[] ):Promise<Table[]>
	{
		return new Promise<Table[]>( (resolve, reject)=>
		{
			let results = new Array<Table>();
			let query =  new Array<string>();
			names.forEach( (x)=>{ if( ProtoService.#tables.has(x) ) results.push(ProtoService.#tables.get(x)); else query.push(x); } );
			if( !query.length )
				resolve( results );
			else
			{
				for( let name of query )
				{
					let ql = `{ __type(name: "${name}") { fields { name type { name kind ofType{name kind} } } } }`;
					this.query( ql ).then( ( data:any )=>
					{
						let table = new Table( data.__type );
						ProtoService.#tables.set( name, table );
						if( results.push( table )==names.length )
							resolve( results );
					}).catch( (e)=>reject(e) );
				}
			}
		});
	}
	mutations():Promise<Mutation[]>
	{
		return new Promise<Mutation[]>( (resolve, reject)=>
		{
			if( ProtoService.#mutations )
				resolve( ProtoService.#mutations );
			else
			{
				let ql = `query{__schema{mutationType{name fields { name args { name defaultValue type { name } } } } }`;
				this.query( ql ).then( ( data:any )=>
				{
					ProtoService.#mutations = data.__schema.fields;
					resolve( ProtoService.#mutations );
				}).catch( (e)=>reject(e) );
			}
		});
	}

	socketComplete(){ console.log( 'complete' ); }
	get nextRequestId(){ return this.#requestId+1; } getRequestId(){ return ++this.#requestId;} #requestId=0;
	setSessionId( sessionId )
	{
		this.sessionId = sessionId;
		for( var m of this.backlog )
			this.sendTransmission( m );
		this.backlog.length=0;
	}
	onMessage( event:MessageEvent ):protobuf.Buffer
	{
		const m = new Uint8Array( event.data );
		this.processMessage( m );
		return m;
	}

	processCommonMessage( m:any ):boolean
	{
		let handled = true;
		let message = Object.entries(m)[0][1];
		let c = message["requestId"] ? this._callbacks.get( message["requestId"] ) : null;
		if( c )
		{
			if( m["graphQl"] )
				c.resolve( c.transformInput(message["json"]) );
		}
		else
			handled = false;
		return handled;
	}
	processCallback( id:number, resolution:any, log:string )
	{
		if( !this._callbacks.has(id) )
			throw `no callback for:  '${id}'`;
		if( this.log.results ) console.log( `(${id})${log}` );
		let p:RequestPromise<ResultMessage> = this._callbacks.get( id );
		p.resolve( resolution );
		this._callbacks.delete( id );
	}
	processError( e:IError ):boolean
	{
		const id = e.requestId;
		const handled = this._callbacks.has( id );
		if( handled )
		{
			let p:RequestPromise<ResultMessage> = this._callbacks.get( id );
			p.reject( {error:e} );
			this._callbacks.delete( id );
		}
		return handled;
	}
	protected abstract processMessage( bytearray:protobuf.Buffer );

	abstract handleConnectionError( err );
	abstract encode( t:Transmission );

	protected authorizationService:IAuth;
	protected backlog:Transmission[] = [];
	protected log = { requests:true, results:true, restRequests:true, restResults:true };
	protected sessionId:string;
	get instances(){return this.#instances;} set instances(x)
	{
		this.#instances = x;
		for( let callback of this.#initCallbacks )
		{
			if( x.length )
				callback.resolve();
			else
				callback.reject( {error:{sc:0,message:"no server instances found."}} );
		}
	} #instances:Instance[];
	#initCallbacks:{resolve:()=>void, reject:Reject}[]=[];
	//abstract get queryId():number;
	#socket:WebSocketSubject<protobuf.Buffer>;
	protected _callbacks = new Map<number, RequestPromise<ResultMessage>>();
	static #tables = new Map<string,Table>();
	static #mutations:Array<Mutation>;
	protected get socketUrl(){if(!this.instances?.length) throw "no instances"; return `ws://${this.instances[0].host}:${this.instances[0].websocketPort}`;}
	protected get restUrl(){if(!this.instances?.length) throw "no instances"; return `http://${this.instances[0].host}:${this.instances[0].restPort}`;}

}
