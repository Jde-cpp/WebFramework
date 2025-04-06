//get googleId on login.
import { Subject,Observable,firstValueFrom, tap } from 'rxjs';
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Instance} from './app.service.types'

import { ETransport, IError, ProtoService, RequestId } from '../proto.service';
import * as AppFromServer from '../../proto/App.FromServer'; import FromServer = AppFromServer.Jde.App.Proto.FromServer;
import * as AppFromClient from '../../proto/App.FromClient'; import FromClient = AppFromClient.Jde.App.Proto.FromClient;
import * as AppCommon from '../../proto/App'; import App = AppCommon.Jde.App.Proto;
import * as CommonProto from '../../proto/Common'; import ELogLevel = CommonProto.Jde.Proto.ELogLevel; import IException = CommonProto.Jde.Proto.IException;
import { IEnvironment } from 'jde-material';
import { IGraphQL } from '../IGraphQL';
import { FieldKind, TableSchema } from 'jde-framework';

type Resolve<T> = (value: T | PromiseLike<T>) => void;
type Reject = (reason?: any) => void;

/*
class PromiseCallbacks<T>{
	constructor( public resolve:Resolve<T>, public reject:Reject )
	{}
}
*/

@Injectable( {providedIn: 'root'} )
export class AppService extends ProtoService<FromClient.Transmission,FromServer.IMessage> implements IGraphQL{
	constructor( http: HttpClient, @Inject('IEnvironment') private environment: IEnvironment ){
		super( FromClient.Transmission, http, environment.get<ETransport>("httpTransport") );
		let appServer = environment.get<Instance>( 'applicationServer' );
		if( !appServer ){
			console.log( "No Application Server set in environment" );
			appServer = { port:1967, host:"localhost" };
		}
		super.instances = [appServer];
	}
	// ping():Promise<string>{
	// 	return this.sendSingularRequest( FromClient.ERequest.Ping );
	// }

	async iotInstances():Promise<Instance[]>{
		const y = await this.get( "IotWebSocket" );
		return y["servers"];
	}

	protected fieldColumns( schema: TableSchema, showDeleted:boolean ):string[]{
		let columns = [];
		let filtered = schema.fields.filter(
			(x)=>!this.excludedColumns(schema.collectionName).includes(x.name) && (x.name!="deleted" || showDeleted) );
		for( const field of filtered ){
			if( field.type.underlyingKind==FieldKind.UNION )
				columns.push( `${field.name}{id}` );
			else if( field.type.underlyingKind==FieldKind.OBJECT )
				columns.push( `${field.name}{id name}` );
			else
				columns.push( field.name );
		}
		return columns;
	}
	excludedColumns( tableName: string ): string[] { return []; }
	targetQuery( schema: TableSchema, target: string, showDeleted:boolean ):string{
		throw "noImpl";
	}
	subQueries( typeName: string, id: number ):string[]{
		throw "noImpl";
	}

/*	getApplications():Promise<FromServer.IApplication[]>{
		return this.applications.length
			? Promise.resolve( this.applications )
			: new Promise<FromServer.IApplication[]>( (resolve,reject)=>
			{
				this.applicationPromises.push( new PromiseCallbacks<FromServer.IApplication[]>(resolve,reject) );
				if( this.applicationPromises.length==1 )
					this.sendRequest( FromClient.ERequest.Applications );
			});
	};
*/
	statuses():Observable<FromServer.IStatus>{
		var eventStream = new Subject<FromServer.IStatus>();
		this.statusSubscriptions.push( eventStream );
		if( this.statusSubscriptions.length==1 ){
			this.send( {subscribeStatus:true}, "Subscribe: statuses" );
		}
		return eventStream;
	}
	statusUnsubscribe( subscription:Observable<FromServer.IStatus> ){
		const index = this.statusSubscriptions.indexOf( <Subject<FromServer.IStatus>>subscription );
		if( index>-1 )
			this.statusSubscriptions.splice( index, 1 );
		if( !this.statusSubscriptions.length )
			this.send( {subscribeStatus:false}, "UnSubscribe: statuses" );
	};

	logs( applicationId:number, level:ELogLevel, start:Date, limit:number ):Observable<FromServer.ITrace>{
		const columns = "id instance_id time level message_id file_id function_id line user_pk thread_id args";
		const q = `subscribe logs(applicationId:${applicationId}, limit:${limit}, filter:{ level:{gte:${level}}, {time:{gte:${start.toISOString()}}} }){ ${columns} }`;
		const requestId = this.send( {graphQl:q}, q );
		let callback:Subject<FromServer.ITrace> = new Subject<FromServer.ITrace>();
		this.logsSubscriptions.set( requestId, callback );
		return callback.pipe(
			tap( {unsubscribe:()=>{this.logsUnsubscribe( requestId );}} )
		);
	}
	logsUnsubscribe( requestId:RequestId ){
		if( this.log.subRequest ) console.log( `[${requestId}]UnSubscribe: logs()` );
		this.logsSubscriptions.delete( requestId );
		this.sendWithId( {requestIdType:FromClient.ERequestIdType.UnsubscribeLogs}, requestId, "UnSubscribe: logs" );
	};

	updateLogLevel( instanceId:number, defaultFileLevel:ELogLevel, defaultDBLevel:ELogLevel ):void{
		const q = `{ mutation  LogApplicationInstances( id:${instanceId} dbLogLevel:${defaultDBLevel}, fileLogLevel:${defaultFileLevel} ){}`;
		this.send( {graphQL:q}, q );
	}

	requestStrings( strings:App.StringPKs ):Promise<FromServer.Strings>{
		const requestId = this.send( {strings:strings}, `AppService::requestStrings count='${strings.files.length+strings.functions.length+strings.messages.length+strings.threads.length+strings.userPKs.length}'` );
		return new Promise<FromServer.Strings>( (resolve,reject)=>{ this.stringRequests.set(requestId,{resolve:resolve,reject:reject})} );
	}
/*	request( instanceId:number, value:number ){
		var request = new FromClient.RequestApp(); request.type = value; request.instanceId = instanceId;
		var msg = new FromClient.MessageUnion(); msg.requestApp=request;
		this.send( msg );
	}
*/
	custom( appPK:number, bytes:Uint8Array ):Promise<Uint8Array>{
		const requestId = this.send( {forwardExecution:{appPK:appPK, executionTransmission:bytes}}, `custom appPK: ${appPK}, bytes: ${bytes.length}` );
		return new Promise<Uint8Array>( (resolve,reject)=>{ this.customCallbacks.set(requestId,{resolve:resolve,reject:reject})} );
	}

/*	private sendRequest( x:FromClient.ERequest ){
		console.log( `requesting '${FromClient.ERequest[x]}'`)
		let msg = { request: {type:x} };
		this.send( msg );
	}

	private sendSingularRequest( x:FromClient.ERequest ):Promise<string>{
		const m = { value:x, instanceId:super.nextRequestId };
		let p = new Promise<string>( (resolve,reject)=>{
			this.singularRequests.set( m.instanceId, {resolve:resolve,reject:reject} );
		});

		console.log( `(${m.instanceId})requesting '${FromClient.ERequest[m.value]}'` );
		this.send( m );
		return p;
	}
*/
	async googleLogin( token:string ):Promise<void>{
//		return this.sendStringPromise<FromClient.ERequest,void>( FromClient.ERequest.GoogleLogin, token, null, FromClient.ERequest[FromClient.ERequest.GoogleLogin] );
		let self = this;
		//if( this.log.restRequests )	console.log( `googleLogin( ${token} )` );
		const sessionId = await this.post<string>( 'GoogleLogin', {value:token}, true );
		self.setAuthorization( sessionId, "loginName:  TODO" );
		if( this.log.restResults )	console.log( `authorization='${self.authorization}'` );

		//let p = this.sendPromise<FromClient.IRequestValue,void>( "requestValue", {requestId: id, type: FromClient.ERequest.GoogleLogin, string: token } );

		//return p;
	}
	async googleAuthClientId():Promise<string>{
//		try
//		{
			if( this.log.restRequests )	console.log( `googleAuthClientId()` );
			//JSON.parse( "{'value': '445012155442-1v8ntaa22konm0boge6hj5mfs15o9lvd.apps.googleusercontent.com'}" );
			let o = await firstValueFrom( this.http.get(`http://localhost:1999/GoogleAuthClientId`) );//TODO wrong url
			return o["value"];
//		}
//		catch( e )
//		{
//			console.log( e );
//			throw e;
//		}
	}
		//.);
		// const id = this.getRequestId();
		// if( this.log.requests )	console.log( `(${id})googleAuthClientId()` );
		// let p = this.sendPromise<FromClient.IRequestValue,string>( "requestValue", {requestId: id, type: FromClient.ERequest.GoogleAuthClientId}, (x:FromServer.StringValue)=>x["stringResult"] );
		// //this.stringValuePromises.set( id, p );
		// return p;
	//}
	private logsSubscriptions:Map<RequestId,Subject<FromServer.ITrace>>= new Map<RequestId,Subject<FromServer.ITrace>>();
	//private addMessage( msg ):void{}
	override handleConnectionError( err ):void{
		this.statusSubscriptions.forEach( (x)=>x.error( err ) );
		this.statusSubscriptions = [];
	}
	encode( t:FromClient.Transmission ){ return FromClient.Transmission.encode(t); }
	public async validateSessionId():Promise<{domain:string,loginName:string}>{
		console.log( `validateSessionId: ${this.authorization}` );
		if( !this.authorization )
			return Promise.resolve( null );
		const y = await this.query<{session:{domain:string,loginName:string}}>( `session( id:"${this.authorization}" ){ domain loginName }` );
		return y.session;
	}
	private complete():void{
		console.log( 'complete' );
		for( const subscription of this.statusSubscriptions )
			subscription.complete();
	}

	protected processMessage( bytearray:protobuf.Buffer ){
		try{
			let t:FromServer.Transmission;
			try{
				t = FromServer.Transmission.decode( bytearray );
			}
			catch( e ){
				throw `error decode ${bytearray.length} bytes, error: ${JSON.stringify(e)}`;
			}
			for( const message of t.messages ){
				const requestId = message.requestId;
				if( super.processCommonMessage(message, requestId) )
					continue;
				if( message.ack ){//first message after handshake
					console.log( `[App.${requestId}]Connected to '${super.socketUrl}', socketId: ${message.ack}` );
					let socketId = message.ack;
					if( this.authorization )
						super.sendAuthorization( socketId );
					else{
						console.warn( `no authorization` );
						this.setSocketId( socketId );
					}
				}
				else if( message.executeResponse ){
					var promise = this.customCallbacks.get( requestId ); if( !promise ) throw `no promise for requestId=${requestId}`;
					promise.resolve( message.executeResponse );
				}
				else if( message.status ){
					if( this.log.subResults )	console.log( `[App.${requestId}]status appId:${message.status.applicationId}` );
					for( const callback of this.statusSubscriptions )
						callback.next( message.status );
				}
				else if( message.strings ){
					const x = message.strings;
					if( this.log.sockResults ) console.log( `[App.${requestId}]strings messageCount: ${Object.keys(x.messages).length}` );
					let promise = this.stringRequests.get( requestId ); if( !promise ) throw `no promise for requestId=${requestId}`;
					promise.resolve( x );
				}
				else if( message.traces ){
					if( this.log.subResults )	console.log( `[App.${requestId}]traces count:${message.traces.values.length}` );
					let subject = this.logsSubscriptions.get( requestId ); if( !subject ) throw `no subscription for requestId=${requestId}`;
					message.traces.values.forEach( x=>subject.next(x) );
				}
				else if( message.exception ){
					let processed = false;
					if( requestId ){
						processed = super.processError(message.exception, requestId)
							|| this.iotProcessError(message.exception, requestId);
					}
					if( !processed )
						throw `[App.${requestId}]Error:  (${message.exception.code.toString(16)})${message.exception.what}`;
				}
				else
					throw `unknown message type ${Object.keys(message)}`
			}
		}
		catch( e ){
			console.error( e );
		}
		return bytearray;
	}
	iotProcessError( e:IException, requestId:RequestId ):boolean{
		let processed = true;
		if( this.stringRequests.has(requestId) ){
			this.stringRequests.get( requestId ).reject( e );
			this.stringRequests.delete( requestId );
		}
		else if( this.customCallbacks.has(requestId) ){
			this.customCallbacks.get( requestId ).reject( e );
			this.customCallbacks.delete( requestId );
		}
		else
			processed = false;
		return processed;
	}
	//private applications:FromServer.IApplication[]=[];
	//private applicationPromises:PromiseCallbacks<FromServer.IApplication[]>[]=[];
	//private singularRequests = new Map<number,{resolve:any,reject:any}>();
	private stringRequests = new Map<number,{resolve:any,reject:any}>();
	//private stringRequests:Map<FromClient.IRequestAppString,Subject<[number,FromServer.IApplicationString]>>= new Map<FromClient.IRequestAppString,Subject<[number,FromServer.IApplicationString]>>();
	private statusSubscriptions:Subject<FromServer.IStatus>[]=[];
	private customCallbacks = new Map<number,{resolve:any,reject:any}>();
	//private stringValuePromises = new Map<number,Promise<string>>();
	//private _customRequestId:number=0;
//	private static Url = environment.applicationServerUrl;// 'ws://localhost:1967';
}
