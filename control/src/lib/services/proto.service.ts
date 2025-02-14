import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { firstValueFrom, Observable, Subject } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Table, Mutation } from './IGraphQL';
import { Instance } from './app/app.service.types';
import * as CommonProto from '../proto/Common'; import ELogLevel = CommonProto.Jde.Proto.ELogLevel; import IException = CommonProto.Jde.Proto.IException;
import { J } from '@angular/cdk/keycodes';

interface IStringRequest<T>{ requestId:number; type:T; value:string; }
interface IStringResult{ id:number; value:string; }
interface IMessageUnion{ stringResult:IStringResult }
export interface IError{ requestId?:number; message: string; sc?:number; }

type TransformInput = (x:any)=>any;
type Resolve = (x:any)=>void;
type Reject = ( e:{error:IError} )=>void;
export type RequestId = number;
export enum ETransport{ Unsecure, Secure, Hybrid };

class RequestPromise<ResultMessage>{
	constructor( public result:(ResultMessage)=>any, public resolve:Resolve, public reject:Reject, public transformInput:TransformInput=null )
	{}
}

export abstract class ProtoService<Transmission,ResultMessage>{
	constructor( private TCreator: { new (): Transmission; }, protected http: HttpClient, public readonly transport:ETransport )
	{}
	connect():void{
		this.#socket = webSocket<protobuf.Buffer>( {url: this.socketUrl, deserializer: msg => this.onMessage(msg), serializer: msg=>msg, binaryType:"arraybuffer"} );
		this.#socket.subscribe(
			( msg ) => this.addMessage( msg ),
			( err ) => this.error( err ),
			() => this.socketComplete()
		);
	}
	//should deserialize put into a constant variable or process in deserialization?
	addMessage( msg )
	{}
	//
	error( err ){
		this.setSocketId( 0 );
		console.log( "No longer connected to Server.", err );
		this.handleConnectionError( err );
	}
	sendTransmission( t:Transmission ){
		console.log( JSON.stringify(t) );
		var toSend = this.encode(t).finish();
		this.#socket.next( toSend );
	}
	send( m:any, log:string ):RequestId{
		const requestId = this.getRequestId();
		this.sendWithId( m, requestId, log );
		return requestId;
	}
	protected sendWithId( m:any, requestId:RequestId, log:string ):void{
		let t = new this.TCreator();
		if( this.log.subRequest ) console.log( `[${requestId}]${log.substring(0, this.log.maxLength)}` );
		t["messages"].push( {requestId:requestId,...m} );
		if( (!this.socketId || !this.#socket) && !Object.hasOwn(m, 'sessionId') ){
			this.backlog.push( t );
			this.connect();
		}
		else
			this.sendTransmission( t );
	}

	protected async sendAuthorization( socketId:number ):Promise<void>{
		await this.sendPromise( {sessionId:Number(`0x${this.authorization}`)}, `sendAuthorization: ${this.authorization}` );
		this.setSocketId( socketId );//release buffer.
	}

	sendPromise<TResult>( m:any, log:string ):Promise<TResult>{
		const requestId = this.send( m, log );
		return new Promise<TResult>( ( resolve, reject )=>{
			this._callbacks.set( requestId, new RequestPromise(null, resolve, reject, null) );
		});
	}

	async InitWait():Promise<void>{
		let p = new Promise<void>( (resolve,reject)=>this.#initCallbacks.push({resolve:resolve,reject:reject}) );
		await p;
	}
	urlWithTarget( suffix:string, preferSecure:boolean=false ):string{
		return preferSecure && this.transport==ETransport.Hybrid
			? `${this.secureRestUrl}/${suffix}`
			: `${this.restUrl}/${suffix}`;
	}

	async get<Y>( target:string ):Promise<Y>{
		if( !this.#instances )
			await this.InitWait();
		if( this.log.restRequests )	console.log( target.substring(0,this.log.maxLength) );
		let url = this.urlWithTarget(target);
		let y:Y;
		try{
			if( this.authorization )
				y = await firstValueFrom( this.http.get<Y>(url, {headers:{"Authorization":this.authorization}}) );
			else{
				let response:HttpResponse<Y> = await firstValueFrom( this.http.get<Y>(url, {observe: "response", transferCache:{includeHeaders:["Authorization"]}}) );
				let authorization = response.headers.get( "Authorization" );
				if( authorization )
					this.setAuthorization( authorization, null );
				y = response.body;
			}
		}
		catch( e ){
			const errorResponse = e as HttpErrorResponse;
			if( errorResponse.status==401 && this.anonymous && this.authorization ){
				this.setAuthorization( null, null );
				y = await this.get<Y>( target );
			}
			else
				throw e;
		}
		return y;
	}
	async postRaw<Y>( target:string, body:any, preferSecure:boolean=false ):Promise<Y>{
		if( !this.#instances )
			await this.InitWait();
		const url = this.urlWithTarget( target, preferSecure );
		let y:any;
		if( this.authorization )
			y =  await firstValueFrom( this.http.post(url, body) );
		else{
			let response:HttpResponse<Y> = await firstValueFrom( this.http.post<Y>(url, body, {observe: "response", transferCache:{includeHeaders:["Authorization"]}}) );
			let authorization = response.headers.get( "Authorization" );
			if( authorization )
				this.setAuthorization( authorization, null );
			y = response.body;
		}
		return y;
	}
	//TODO change to use postRaw
	async post<Y>( target:string, body:any, preferSecure:boolean=false ):Promise<Y>{
		return await this.postRaw<Y>( target, body, preferSecure )[ "value" ];
	}

	private async graphQL<Y>( query: string ):Promise<Y>{
		var target = `graphql?query={${query}}`;
		const y = await this.get( target );
		return y ? y["data"] : null;
	}

	async query<Y>( ql: string ):Promise<Y>{
		return await this.graphQL( ql );
	}

	async queryArray<Y>( ql: string ):Promise<Y[]>{
		const member = ql.substring( 0, ql.indexOf('{') ).trim();
		const y = await this.graphQL( ql );
		return y[member];
	}

	async mutation<Y>( ql: string ):Promise<Y>{
		return await this.graphQL( `mutation ${ql}` );
	}

	schema( names:string[] ):Promise<Table[]>{
		return new Promise<Table[]>( (resolve, reject)=>{
			let results = new Array<Table>();
			let query =  new Array<string>();
			names.forEach( (x)=>{ if( ProtoService.#tables.has(x) ) results.push(ProtoService.#tables.get(x)); else query.push(x); } );
			if( !query.length )
				resolve( results );
			else{
				for( let name of query ){
					let ql = `__type(name: "${name}") { fields { name type { name kind ofType{name kind} } } }`;
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
		return new Promise<Mutation[]>( (resolve, reject)=>{
			if( ProtoService.#mutations )
				resolve( ProtoService.#mutations );
			else{
				let ql = `__schema{mutationType{name fields { name args { name defaultValue type { name } } } }`;
				this.query( ql ).then( ( data:any )=>
				{
					ProtoService.#mutations = data.__schema.fields;
					resolve( ProtoService.#mutations );
				}).catch( (e)=>reject(e) );
			}
		});
	}

	socketComplete(){ console.log( 'complete' ); }
	//get nextRequestId():RequestId{ return this.#requestId+1; }  why?
	getRequestId():RequestId{ return ++this.#requestId;} #requestId:RequestId=0;

	protected setAuthorization( authorization:string, loginName:string ){
		console.log( `setAuthorization( ${authorization}, ${loginName} )` );
		if( authorization )
			localStorage.setItem( "authorization", authorization );
		else
			localStorage.removeItem( "authorization" );
		if( loginName)
			this.#loginNameSubscription.next( loginName );
	}
	subscribeLoginName():Observable<string>{ return this.#loginNameSubscription.asObservable(); }
	protected setSocketId( id:number ){
		this.#socketId = id;
		for( var m of this.backlog )
			this.sendTransmission( m );
		this.backlog.length=0;
	}
	private onMessage( event:MessageEvent ):protobuf.Buffer{
		const m = new Uint8Array( event.data );
		this.processMessage( m );
		return m;
	}

	processCommonMessage( m:any, requestId:RequestId ):boolean{
		let handled = true;
		let message = Object.entries(m)[0][1];
		let c = this._callbacks.get( requestId );
		if( c ){
			if( !m.Value )
				c.resolve( null );
			else if( m["graphQl"] )
				c.resolve( c.transformInput(message["json"]) );
			else
				handled = false;
		}
		else
			handled = false;
		return handled;
	}
/*	processCallback( id:number, resolution:any, log:string ){
		if( !this._callbacks.has(id) )
			throw `no callback for:  '${id}'`;
		if( this.log.restResults ) console.log( `(${id})${log}` );
		let p:RequestPromise<ResultMessage> = this._callbacks.get( id );
		p.resolve( resolution );
		this._callbacks.delete( id );
	}
*/
	processError( e:IException, requestId ):boolean{
		const handled = this._callbacks.has( requestId );
		if( handled ){
			let p:RequestPromise<ResultMessage> = this._callbacks.get( requestId );
			p.reject( {error: {requestId:requestId, message:e.what, sc:e.code}} );
			this._callbacks.delete( requestId );
		}
		return handled;
	}
	protected abstract processMessage( bytearray:protobuf.Buffer );

	protected abstract handleConnectionError( err );
	protected abstract encode( t:Transmission );

	private anonymous:boolean=true;
	protected backlog:Transmission[] = [];
	protected log = { sockRequests:true, sockResults:true, restRequests:true, restResults:false, subRequest:true, subResults:true, maxLength:255 };
	#loginNameSubscription:Subject<string> = new Subject<string>();
	protected get authorization():string{ return localStorage.getItem("authorization"); }
	//Informational purposes only to match with server logs.
	protected get socketId():number{ return this.#socketId; } #socketId:number;
	get instances(){return this.#instances;} set instances(x){
		this.#instances = x;
		for( let callback of this.#initCallbacks ){
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
	private get url(){
		if( !this.instances?.length ) throw "no instances";
		return `${this.instances[0].host}:${this.instances[0].port}`;
	}
	protected get socketUrl(){ return `${this.transport==ETransport.Secure ? "wss" : "ws"}://${this.url}`; }
	private get restUrl(){return this.transport==ETransport.Secure ? this.secureRestUrl : `http://${this.url}`;}
	private get secureRestUrl(){return `https://${this.url}`;}
}
