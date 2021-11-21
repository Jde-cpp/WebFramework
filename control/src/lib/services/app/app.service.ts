import { Subject,Observable,of } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Injectable } from '@angular/core';

import * as AppFromServer from 'jde-cpp/FromServer'; import FromServer = AppFromServer.Jde.ApplicationServer.Web.FromServer;
import * as AppFromClient from 'jde-cpp/FromClient'; import FromClient = AppFromClient.Jde.ApplicationServer.Web.FromClient;

type StatusSubscription = (statuses:FromServer.IStatuses) => void;

type Resolve<T> = (value: T | PromiseLike<T>) => void;
type Reject = (reason?: any) => void;
class PromiseCallbacks<T>
{
	constructor( public resolve:Resolve<T>, public reject:Reject )
	{}
}

@Injectable( {providedIn: 'root'} )
export class AppService
{
	constructor()
	{
		this.#socket = webSocket<protobuf.Buffer>( {url: AppService.Url, deserializer: msg => this.onMessage(msg), serializer: msg=>msg, binaryType:"arraybuffer"} );
		this.#socket.subscribe( (x)=>this.addMessage(x), (e)=>this.error(e), ()=>this.complete() );
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
			var request = new FromClient.RequestLogs(); request.Value = value; request.ApplicationId = applicationId; request.Start = start ? start.getTime()/1000 : 0; request.Limit = limit;
			var msg = new FromClient.MessageUnion(); msg.RequestLogs=request;
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
			this.request( instanceId, -3 ); //FromClient.ERequest.Logs | FromClient.ERequest.Negate
		}
		else if( minLevel>removedLevel )
		{
			var request = new FromClient.RequestLogs(); request.Value = minLevel; request.InstanceId = instanceId;
			var msg = new FromClient.MessageUnion(); msg.RequestLogs=request;
			this.send( msg );
		}
	};

	updateLogLevel( instanceId:number, clientLevel:FromServer.ELogLevel, dbLevel:FromServer.ELogLevel )
	{
		var request = new FromClient.LogValues(); request.InstanceId = instanceId; request.ClientValue = clientLevel; request.DbValue = dbLevel;
		var msg = new FromClient.MessageUnion(); msg.LogValues=request;
		this.send( msg );
	}
	requestStrings( requests:FromClient.IRequestStrings ):Observable<[number,FromServer.IApplicationString]>
	{
		let message = new FromClient.MessageUnion();
		message.RequestStrings = requests;
		let callback = new Subject<[number,FromServer.IApplicationString]>();
		for( let request of requests.Values )
			this.stringRequests.set( request, callback );
		console.log( `AppService::requestStrings count='${requests.Values.length}'` );
		this.send( message );
		return callback;
	}
	request( instanceId:number, value:number )
	{
		var request = new FromClient.RequestId(); request.Value = value; request.InstanceId = instanceId;
		var msg = new FromClient.MessageUnion(); msg.RequestId=request;
		this.send( msg );
	}

	custom( applicationId:number, value:Uint8Array ):Observable<Uint8Array>
	{
		var custom = new FromClient.Custom();
		custom.ApplicationId = applicationId;
		custom.RequestId = ++this._customRequestId;
		custom.Message = value;
		var msg = new FromClient.MessageUnion; msg.Custom=custom;
		let callback = new Subject<Uint8Array>();
		this.customCallbacks.set( custom.RequestId, callback );
		this.send( msg );

		return callback;
	}

	private sendRequest( x:FromClient.ERequest )
	{
		console.log( `requesting '${FromClient.ERequest[x]}'`)
		//var request = new FromClient.Request(); request.Value = x;
		let msg = { Request: {Value:x} };
		this.send( msg );

	}
	send<T>( request:T ):void
	{
		var transmission = new FromClient.Transmission(); transmission.Messages.push( request );
		var writer = FromClient.Transmission.encode( transmission );
		this.#socket.next( writer.finish() );
	}

	private logsSubscriptions:Map<number,[FromServer.ELogLevel, Subject<[number,FromServer.ITraceMessage]>][]>= new Map<number,[FromServer.ELogLevel, Subject<[number,FromServer.ITraceMessage]>][]>();
	private addMessage( msg ):void{}
	private error( err ):void
	{
		this.sessionId = null;
		console.error( err );
		for( const subscription of this.statusSubscriptions )
			subscription.error( err );
		this.statusSubscriptions = [];
	}
	private complete():void
	{
		console.log( 'complete' );
		for( const subscription of this.statusSubscriptions )
			subscription.complete();
	}
	#socket:WebSocketSubject<protobuf.Buffer>;
	private sessionId:number;
	private onMessage( event:MessageEvent ):protobuf.Buffer
	{
		const bytearray = new Uint8Array( event.data );
		try
		{
			const t = FromServer.Transmission.decode( bytearray );
			for( const message of t.Messages )
			{
				if( message.Traces )
				{
					const applicationId = message.Traces.ApplicationId;
					var subscriptions = this.logsSubscriptions.get( applicationId );
					if( !subscriptions )
						continue;//todo end subscription
					for( let trace of message.Traces.Values )
					{
						for( let [level,callback] of subscriptions )
						{
							if( trace.Level>=level )
								callback.next( [applicationId,trace] );
						}
					}
				}
				else if( message.Strings )
				{
					var applicationId = message.Strings.ApplicationId;
					for( var string of message.Strings.Values )
					{
						for( let [request,callback] of this.stringRequests )
						{
							if( request.ApplicationId==applicationId && request.Type==string.StringRequestType && request.Value==string.Id )
							{
								//console.log( `applicationId=${applicationId}, type=${string.StringRequestType}, value=${string.Id}, ${string.Value}` );
								callback.next( [applicationId,string] );
							}
						}
					}

				}
				else if( message.Statuses )
				{
					for( const callback of this.statusSubscriptions )
						callback.next( message.Statuses );
				}
				else if( message.Acknowledgement )
				{
					console.log( `(${message.Acknowledgement.Id})Connected to '${AppService.Url}'` );
					this.sessionId = message.Acknowledgement.Id;
				}
				else if( message.Applications )
				{
					this.applications.length=0;
					for( var application of message.Applications.Values )
						this.applications.push( application );
					for( let callback of this.applicationPromises )
						callback.resolve( this.applications );
					this.applicationPromises.length = 0;
				}
				else if( message.Custom )
				{
					var callback = this.customCallbacks.get( message.Custom.RequestId );
					if( callback )
						callback.next( message.Custom.Message );
					else
						console.error( `no callback for '${message.Custom.RequestId}'` );
				}
				else
					console.error( "unknown message type" );
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
	private stringRequests:Map<FromClient.IRequestString,Subject<[number,FromServer.IApplicationString]>>= new Map<FromClient.IRequestString,Subject<[number,FromServer.IApplicationString]>>();
	private statusSubscriptions:Subject<FromServer.IStatuses>[]=[];
	private customCallbacks = new Map<number,Subject<Uint8Array>>();
	private _customRequestId:number=0;
	private static Url = 'ws://localhost:1967';
}
