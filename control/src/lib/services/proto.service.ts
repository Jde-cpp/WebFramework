import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { firstValueFrom, Observable, Subject } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { clone, FieldKind, fromIsoDuration, IEnum, IQueryResult, MutationSchema, TableSchema } from 'jde-framework';
import { Instance } from './app/app.service.types';
import * as CommonProto from '../proto/Common'; import ELogLevel = CommonProto.Jde.Proto.ELogLevel; import IException = CommonProto.Jde.Proto.IException;
import { J } from '@angular/cdk/keycodes';
import { assert, Mutation, MutationType } from 'jde-framework';
import { computed, signal } from '@angular/core';
import { EProvider, LoggedInUser } from 'jde-material';

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
	constructor( public result:(ResultMessage)=>any, public resolve:Resolve, public reject:Reject, public transformInput:TransformInput|null=null )
	{}
}

const userStorageKey = 'user';
export abstract class ProtoService<Transmission,ResultMessage>{
	constructor( private TCreator: { new (): Transmission; }, protected http: HttpClient, public readonly transport:ETransport ){
		const loggedInUser = localStorage.getItem(userStorageKey);
		if(loggedInUser)
			this.#userSignal.set( JSON.parse(loggedInUser) );
	}
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
		await this.sendPromise( {sessionId:this.user().authorization}, `sendAuthorization: ${this.user().authorization}` );
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

	private async authGet<Y>( target:string, authorization?:string ):Promise<Y>{
		if( this.log.restRequests )	console.log( target.substring(0,this.log.maxLength) );
		let url = this.urlWithTarget(target);
		let y:Y;
		if( authorization ){
			try{
				y = await firstValueFrom( this.http.get<Y>(url, {headers:{"Authorization":authorization}}) );
				this.lastRestCall = new Date();
			}
			catch( e ){
				if( e["status"]==401 ){
					this.setAuthorization( null );
					y = await this.authGet<Y>( target );
				}
				else
					throw e;
			}
		}
		else{
			let response:HttpResponse<Y> = await firstValueFrom( this.http.get<Y>(url,
				{observe: "response", transferCache:{includeHeaders:["Authorization"]}}) );
			let authorization = response.headers.get( "Authorization" );
			if( authorization )
				this.setAuthorization( {authorization:authorization} );
			y = response.body;
		}
		if( this.log.restResults ) console.log( JSON.stringify(y) );
		return y;
	}

	async get<Y>( target:string ):Promise<Y>{
		if( !this.#instances )
			await this.InitWait();
		let y:Y;
		let isActive = this.lastRestCall && (this.lastRestCall.getTime() > Date.now() - this.timeoutSeconds* 1000);
		if( this.user()?.authorization && isActive )
			y = await this.authGet<Y>( target, this.user().authorization );
		else{
			let settings = await this.authGet<any>( "serverSettings", null );
			this.timeoutSeconds = fromIsoDuration( settings["restSessionTimeout"] );
			let serverInstance = parseInt( settings["serverInstance"] );
			let timedout = this.lastRestCall && (this.lastRestCall.getTime() < Date.now() - this.timeoutSeconds* 1000);
			if( timedout || (this.user()?.authorization && this.user().serverInstance!=serverInstance) )
				this.setAuthorization( {authorization:null, serverInstance:serverInstance} );
			y = await this.authGet<Y>( target, this.user()?.authorization );
		}
		return y;
	}

	async postRaw<Y>( target:string, body:any, preferSecure:boolean=false ):Promise<Y>{
		if( !this.#instances )
			await this.InitWait();
		const url = this.urlWithTarget( target, preferSecure );
		let y:any;
		if( this.user()?.authorization )
			y =  await firstValueFrom( this.http.post(url, body) );
		else{
			let response:HttpResponse<Y> = await firstValueFrom( this.http.post<Y>(url, body, {observe: "response", transferCache:{includeHeaders:["Authorization"]}}) );
			let authorization = response.headers.get( "Authorization" );
			if( authorization )
				this.setAuthorization( {authorization:authorization} );
			y = response.body;
		}
		return y;
	}
	//TODO change to use postRaw
	async post<Y>( target:string, body:any, preferSecure:boolean=false ):Promise<Y>{
		return (await this.postRaw<Y>( target, body, preferSecure ))[ "value" ];
	}

	private async graphQL<Y>( query: string ):Promise<Y>{
		var target = `graphql?query={${query}}`;
		const y = await this.get( target );
		return y ? y["data"] : null;
	}

	async providers():Promise<EProvider[]>{
		const ql = `__type(name: "Provider") { enumValues { id name } }`;
		const data = await this.query( ql );
		return data["__type"]["enumValues"].map( (x:IEnum)=>x.id );
	}
	async query<Y>( ql: string ):Promise<Y>{
		return await this.graphQL( ql );
	}
	async querySingle<Y>( ql: string ):Promise<Y>{
		const y = await this.query<any>( ql );
		return y[Object.keys(y)[0]];
	}
	async queryObject<Y>( ql: string, cnstrctr: new(...args:any[]) => Y ):Promise<Y>{
		const result = await this.query<any>( ql );
		return new cnstrctr( result[Object.keys(result)[0]] );
	}
	async queryArray<Y>( ql: string ):Promise<Y[]>{
		const member = ql.substring( 0, ql.indexOf('{') ).trim();
		const y = await this.graphQL( ql );
		return y[member];
	}

	async querySetting(target:string):Promise<string>{
		const queryResult = await this.querySingle<string>( `setting(target:\"${target}\"){value}` );
		return queryResult["value"];
	}
	async querySettings(target:string[]):Promise<{[key:string]:string}>{
		const queryResult = await this.query<string>( `settings(target:${JSON.stringify(target)}){target value}` );
		let y:{[key:string]:string} = {};
		for( const setting of queryResult["settings"] )
			y[setting.target] = setting.value;
		return y;
	}

	async mutation<Y>( ql: string|Mutation|Mutation[] ):Promise<Y>{
		if( Array.isArray(ql) ){
			let y = [];
			for( let m of <Mutation[]>ql )
				y.push( await this.mutation( m ) );
			return <Y>y;
		}
		let query = ql instanceof Mutation ? ql.toString() : ql;
		assert( query );
		return await this.graphQL<Y>( `mutation ${query}` );
	}

	async schemaWithEnums( type:string ):Promise<TableSchema>{
		let schema = ( await this.schema([type]) )[0];
		if( !schema.enums ){
			schema.enums = new Map<string, IEnum[]>();
			for( const field of schema.fields.filter((x)=>x.type.underlyingKind==FieldKind.ENUM && !schema.enums.has(x.name)) ){
				let values:Array<IEnum>;
				values = ( await this.query<IQueryResult<IEnum>>(` __type(name: "${field.type.name}") { enumValues { id name } }`) ).__type["enumValues"];
				schema.enums.set( field.type.name, values );
			}
		}
		return schema;
	}
	async schema( types:string[] ):Promise<TableSchema[]>{
		let results = new Array<TableSchema>();
		let queries =  new Array<string>();
		console.log( `schema(${JSON.stringify(types)})` );
		debugger;
		for( let type of types ){
			if( this.#tables.has(type) )
				results.push(this.#tables.get(type));
			else
				queries.push(type);
		};
		for( let type of queries ){
			const ql = `__type(name: "${type}") { fields { name type { name kind ofType{name kind} } } }`;
			const data = await this.query( ql );
			const schema = new TableSchema( data["__type"] );
			this.#tables.set( type, schema );
			results.push( schema );
		}
		return results;
	}

	mutations():Promise<MutationSchema[]>{
		return new Promise<MutationSchema[]>( (resolve, reject)=>{
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


	protected setAuthorization( user:LoggedInUser | null ){
		console.log( `setAuthorization( ${user ? user.id : "null"} )` );
		if( user ){
			const current = this.user();
			let updated = current ? clone( current ) : user;
			if( current ){
				for( let key in user )
					updated[key] = user[key];
			}
			localStorage.setItem( userStorageKey, JSON.stringify(updated) );
		}else
			localStorage.removeItem( userStorageKey );
		this.#userSignal.set( user );
	}
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

	protected backlog:Transmission[] = [];
	protected log = { sockRequests:true, sockResults:true, restRequests:true, restResults:true, subRequest:true, subResults:true, maxLength:255 };
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
	#tables = new Map<string,TableSchema>();
	static #mutations:Array<MutationSchema>;
	private get url(){
		if( !this.instances?.length ) throw "no instances";
		return `${this.instances[0].host}:${this.instances[0].port}`;
	}
	protected get socketUrl(){ return `${this.transport==ETransport.Secure ? "wss" : "ws"}://${this.url}`; }
	private get restUrl(){return this.transport==ETransport.Secure ? this.secureRestUrl : `http://${this.url}`;}
	private get secureRestUrl(){return `https://${this.url}`;}

	isLoggedIn = computed(() => !!this.user());
	#userSignal = signal<LoggedInUser | null>(null);
	user = this.#userSignal.asReadonly();
	lastRestCall:Date = null;
	timeoutSeconds:number;
}
