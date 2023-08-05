//get googleId on login.
import { Subject,Observable,of } from 'rxjs';
import { IAuth } from 'jde-material';
import { Injectable, Inject } from '@angular/core';
import { IErrorService } from '../error/IErrorService';

import { ProtoService, IError } from '../proto.service';
import * as AppFromServer from 'jde-cpp/FromServer'; import FromServer = AppFromServer.Jde.ApplicationServer.Web.FromServer;
import * as AppFromClient from 'jde-cpp/FromClient'; import FromClient = AppFromClient.Jde.ApplicationServer.Web.FromClient;
import { IEnvironment } from 'jde-material';

type StatusSubscription = (statuses:FromServer.IStatuses) => void;

type Resolve<T> = (value: T | PromiseLike<T>) => void;
type Reject = (reason?: any) => void;
class PromiseCallbacks<T>
{
	constructor( public resolve:Resolve<T>, public reject:Reject )
	{}
}
/*
export abstract class foo{
	constructor( x:any ){}
	send( request:any ):void	{}
	get nextRequestId(){ return 5; } getRequestId(){ return 5;} #requestId=0;
	sendStringPromise<ERequest,TResult>( e:ERequest, value:string, transform:(string)=>any, what:string ):Promise<TResult>{ return null; }
	abstract handleConnectionError( err );
	protected sessionId:number;
}
*/
@Injectable( {providedIn: 'root'} )
export class AppService extends ProtoService<FromClient.Transmission,FromServer.IMessageUnion>
{
	constructor( @Inject('IEnvironment') private environment: IEnvironment, @Inject('IErrorService') private cnsle: IErrorService )
	{
		super( FromClient.Transmission, environment.get('applicationServerUrl') );
	}
	ping():Promise<string>
	{
		return this.sendSingularRequest( FromClient.ERequest.Ping );
	}
//	request<T>( requestType:Requests.ERequests ):Promise<T>{ return this.connection.request<T>(requestType); }
	get():Promise<FromServer.IApplication[]>
	{
		return this.applications.length
			? Promise.resolve( this.applications )
			: new Promise<FromServer.IApplication[]>( (resolve,reject)=>
			{
				this.applicationPromises.push( new PromiseCallbacks<FromServer.IApplication[]>(resolve,reject) );
				if( this.applicationPromises.length==1 )
					this.sendRequest( FromClient.ERequest.Applications );
			});
	};
	statuses():Observable<FromServer.IStatuses>
	{
		var eventStream = new Subject<FromServer.IStatuses>();
		this.statusSubscriptions.push( eventStream );
		if( this.statusSubscriptions.length==1 )
			this.sendRequest( FromClient.ERequest.Statuses );

		return eventStream;
	}
	statusUnsubscribe( subscription:Observable<FromServer.IStatuses> )
	{
		const index = this.statusSubscriptions.indexOf( <Subject<FromServer.IStatuses>>subscription );
		if( index>-1 )
			this.statusSubscriptions.splice( index, 1 );
		if( !this.statusSubscriptions.length )
			this.sendRequest( FromClient.ERequest.Statuses | FromClient.ERequest.Negate );
	};

	logs( applicationId:number, value:FromServer.ELogLevel, start:Date, limit:number ):Observable<[number,FromServer.ITraceMessage]>
	{
		let subscriptions = this.logsSubscriptions.get( applicationId );
		if( !subscriptions )
			this.logsSubscriptions.set( applicationId, subscriptions=[] );

		let minLevel = FromServer.ELogLevel.None;
		for( const [level, _] of subscriptions )
			minLevel = Math.min( minLevel, level );
		let callback = new Subject<[number,FromServer.ITraceMessage]>();
		subscriptions.push( [value, callback] );
		if( value<minLevel )
		{
			var request = new FromClient.RequestLogs(); request.value = value; request.applicationId = applicationId; request.start = start ? start.getTime()/1000 : 0; request.limit = limit;
			var msg = new FromClient.MessageUnion(); msg.requestLogs=request;
			console.log( `AppService::RequestLogs applicationId='${applicationId}', level='${value}', date='${start ? start.toISOString() : "null"}'` );
			this.send( msg );//todo set new structure to ApplicationId, fix server.
		}
		return callback;
	}
	logsUnsubscribe( instanceId:number, callback:Observable<[number,FromServer.ITraceMessage]> )
	{
		let subscriptions = this.logsSubscriptions.get( instanceId );
		if( !subscriptions )
		{
			console.warn( `no log callbacks to unsubscribe ${instanceId}` );
			return;
		}

		let index = -1; let removedLevel = FromServer.ELogLevel.None;
		let minLevel = FromServer.ELogLevel.None;
		for( let i = 0; i<subscriptions.length; ++i )
		{
			var [level,currentCallback] = subscriptions[i];
			if( callback==currentCallback )
			{
				index = i;
				level = removedLevel;
			}
			else
				minLevel = Math.min( level, minLevel );
		}
		if( index>-1 )
			subscriptions.splice( index, 1 );
		if( subscriptions.length==0 )
		{
			this.logsSubscriptions.delete( instanceId );
			console.log( `Unsubscribe from logs for application ${instanceId}` );
			this.request( instanceId, -3 ); //FromClient.ERequest.logs | FromClient.ERequest.negate
		}
		else if( minLevel>removedLevel )
		{
			var request = new FromClient.RequestLogs(); request.value = minLevel; request.instanceId = instanceId;
			var msg = new FromClient.MessageUnion(); msg.requestLogs=request;
			this.send( msg );
		}
	};

	updateLogLevel( instanceId:number, clientLevel:FromServer.ELogLevel, dbLevel:FromServer.ELogLevel )
	{
		var request = new FromClient.LogValues(); request.instanceId = instanceId; request.clientValue = clientLevel; request.dbValue = dbLevel;
		var msg = new FromClient.MessageUnion(); msg.LogValues=request;
		this.send( msg );
	}
	requestStrings( requests:FromClient.IRequestStrings ):Observable<[number,FromServer.IApplicationString]>
	{
		let message = new FromClient.MessageUnion();
		message.requestStrings = requests;
		let callback = new Subject<[number,FromServer.IApplicationString]>();
		for( let request of requests.values )
			this.stringRequests.set( request, callback );
		console.log( `AppService::requestStrings count='${requests.values.length}'` );
		this.send( message );
		return callback;
	}
	request( instanceId:number, value:number )
	{
		var request = new FromClient.RequestId(); request.value = value; request.instanceId = instanceId;
		var msg = new FromClient.MessageUnion(); msg.requestId=request;
		this.send( msg );
	}

	custom( applicationId:number, value:Uint8Array ):Observable<Uint8Array>
	{
		var custom = new FromClient.Custom();
		custom.applicationId = applicationId;
		custom.requestId = ++this._customRequestId;
		custom.message = value;
		var msg = new FromClient.MessageUnion; msg.custom=custom;
		let callback = new Subject<Uint8Array>();
		this.customCallbacks.set( custom.requestId, callback );
		this.send( msg );

		return callback;
	}

	private sendRequest( x:FromClient.ERequest )
	{
		console.log( `requesting '${FromClient.ERequest[x]}'`)
		//var request = new FromClient.Request(); request.value = x;
		let msg = { Request: {Value:x} };
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

/*	send<T>( request:T ):void
	{
		var transmission = new FromClient.Transmission();

		transmission.Messages.push( request );
		var writer = FromClient.Transmission.encode( transmission );
		this.#socket.next( writer.finish() );
	}*/

	googleLogin( token:string ):Promise<void>
	{
		//console.log( `(${this.nextRequestId})googleLogin( ${token?.length} )` );
		return this.sendStringPromise<FromClient.ERequest,void>( FromClient.ERequest.GoogleLogin, token, null, FromClient.ERequest[FromClient.ERequest.GoogleLogin] );
	};

	private logsSubscriptions:Map<number,[FromServer.ELogLevel, Subject<[number,FromServer.ITraceMessage]>][]>= new Map<number,[FromServer.ELogLevel, Subject<[number,FromServer.ITraceMessage]>][]>();
	//private addMessage( msg ):void{}
	override handleConnectionError( err ):void
	{
		this.statusSubscriptions.forEach( (x)=>x.error( err ) );
		this.statusSubscriptions = [];
	}
	encode( t:FromClient.Transmission ){ return FromClient.Transmission.encode(t); }

	private complete():void
	{
		console.log( 'complete' );
		for( const subscription of this.statusSubscriptions )
			subscription.complete();
	}

	protected processMessage( bytearray:protobuf.Buffer )
	{
		try
		{
			const t = FromServer.Transmission.decode( bytearray );
			for( const message of t.messages )
			{
				if( message.traces )
				{
					const applicationId = message.traces.applicationId;
					var subscriptions = this.logsSubscriptions.get( applicationId );
					if( !subscriptions )
						continue;//todo end subscription
					for( let trace of message.traces.values )
					{
						for( let [level,callback] of subscriptions )
						{
							if( trace.level>=level )
								callback.next( [applicationId,trace] );
						}
					}
				}
				else if( message.strings )
				{
					var applicationId = message.strings.applicationId;
					for( var string of message.strings.values )
					{
						for( let [request,callback] of this.stringRequests )
						{
							if( request.applicationId==applicationId && request.type==string.stringRequestType && request.value==string.id )
							{
								//console.log( `applicationId=${applicationId}, type=${string.StringRequestType}, value=${string.Id}, ${string.Value}` );
								callback.next( [applicationId,string] );
							}
						}
					}

				}
				else if( message.statuses )
				{
					for( const callback of this.statusSubscriptions )
						callback.next( message.statuses );
				}
				else if( message.acknowledgement )
				{
					console.log( `(${message.acknowledgement.id})Connected to '${super.url}'` );
					this.sessionId = message.acknowledgement.id;
					for( var m of this.backlog )
						this.sendTransmission( m );
				}
				else if( message.applications )
				{
					this.applications.length=0;
					for( var application of message.applications.values )
						this.applications.push( application );
					for( let callback of this.applicationPromises )
						callback.resolve( this.applications );
					this.applicationPromises.length = 0;
				}
				else if( message.custom )
				{
					var callback = this.customCallbacks.get( message.custom.requestId );
					if( callback )
						callback.next( message.custom.message );
					else
						console.error( `no callback for '${message.custom.requestId}'` );
				}
				else if( message.error )
				{
					if( message.error.requestId )
						this.processError( <IError>message.error );
					else
						console.error( message.error );
				}
				else
					console.error( `unknown message type ${Object.keys(message)}` );
			}
		}
		catch( e )
		{
			console.error( `error read ${bytearray.length} bytes`+e.toString() );
		}
		//var tokens = msg.data.split( '\0' );
		return bytearray;
	}
	private applications:FromServer.IApplication[]=[];
	private applicationPromises:PromiseCallbacks<FromServer.IApplication[]>[]=[];
	private singularRequests = new Map<number,{resolve:any,reject:any}>;
	private stringRequests:Map<FromClient.IRequestString,Subject<[number,FromServer.IApplicationString]>>= new Map<FromClient.IRequestString,Subject<[number,FromServer.IApplicationString]>>();
	private statusSubscriptions:Subject<FromServer.IStatuses>[]=[];
	private customCallbacks = new Map<number,Subject<Uint8Array>>();
	private _customRequestId:number=0;
//	private static Url = environment.applicationServerUrl;// 'ws://localhost:1967';
}
