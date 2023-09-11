import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { IAuth } from 'jde-material';
import { Table, IGraphQL, Mutation } from './IGraphQL';

import * as AppFromClient from 'jde-cpp/FromClient'; import FromClient = AppFromClient.Jde.ApplicationServer.Web.FromClient;

interface IStringRequest<T>{ requestId:number; type:T; value:string; }
interface IStringResult{ id:number; value:string; }
interface IMessageUnion{ stringResult:IStringResult }
export interface IError{ requestId:number; message: string; }

type TransformInput = (x:any)=>any;
type Resolve = (x:any)=>void;
type Reject = (x:IError)=>void;

class RequestPromise<ResultMessage>
{
	constructor( public result:(ResultMessage)=>any, public resolve:Resolve, public reject:Reject, public transformInput:TransformInput=null )
	{}
}

export abstract class ProtoService<Transmission,ResultMessage>
{
	//, private UnionCreator:{ new (key:string,value:any):IRequestUnion }
	constructor( private TCreator: { new (): Transmission; }, private _url:string ){
	}
	connect():void
	{
		this.#socket = webSocket<protobuf.Buffer>( {url: this.url, deserializer: msg => this.onMessage(msg), serializer: msg=>msg, binaryType:"arraybuffer"} );
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
	sendTransmission( t:Transmission ){	this.#socket.next( this.encode(t).finish() ); }
	send( request:any ):void
	{
		let t = new this.TCreator(); t["messages"].push( request );
		if( !this.sessionId )
		{
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

	query<T>( ql: string ):Promise<T>
	{
		//return this.sendStringPromise<Requests.ERequest,T>( this.queryId, ql, (x:string)=>x ? JSON.parse(x).data : null );
		const id = this.getRequestId();
		if( this.log.requests ) console.log( `(${id})query( ${ql} )` );
		return this.sendPromise<FromClient.IGraphQL,T>( "graphQl", {requestId: id, query: ql}, (x:ResultMessage)=>x["json"], (x:string)=>x ? JSON.parse(x).data : null );
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
			p.reject( e );
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
	//abstract get queryId():number;
	#socket:WebSocketSubject<protobuf.Buffer>;
	_callbacks = new Map<number, RequestPromise<ResultMessage>>();
	static #tables = new Map<string,Table>();
	static #mutations:Array<Mutation>;
	public get url(){return this._url;}

}
