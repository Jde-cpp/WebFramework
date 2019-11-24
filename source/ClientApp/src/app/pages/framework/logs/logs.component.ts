import { HostListener, Component, OnDestroy, OnInit, ViewChild, Inject } from '@angular/core';
import { Sort, MatTable, MatOptionSelectionChange } from '@angular/material';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { Observable } from 'rxjs';
import { TraceEntry } from './TraceEntry';
import { DataSource } from './DataSource';
import {Application} from '../../../services/app/application';
import {AppService} from '../../../services/app/app.service';
import {ApplicationStrings} from './Application';
import {Settings} from './Settings';
import {ComponentPageTitle} from '../../material-site/page-title/page-title';
import { IProfile } from '../../../services/profile/IProfile';
import { DateUtilities } from '../../../utilities/dateUtilities';

import * as AppFromServer from '../../../proto/appFromServer';
import FromServer = AppFromServer.Jde.ApplicationServer.Web.FromServer;

import * as AppFromClient from '../../../proto/appFromClient';
import FromClient = AppFromClient.Jde.ApplicationServer.Web.FromClient;
import { FormControl } from '@angular/forms';

// Move levels to combo.
// Add dates.
// Fix pause button.
// Comment out statuses
@Component({selector: 'logs',templateUrl: './logs.component.html',styleUrls: ['./logs.component.css']})
export class LogsComponent implements OnInit, OnDestroy
{
	constructor( public _componentPageTitle: ComponentPageTitle, private appService:AppService, @Inject('IProfile') private profileService: IProfile )
	{}
	
	ngOnInit() 
	{
		this._componentPageTitle.title = "Logs";
		var beginningOfDay = DateUtilities.beginningOfDay( new Date() );
		beginningOfDay.setDate( beginningOfDay.getDate()-1 );
		//var yesterday = ;
		var start = beginningOfDay;
		this._start.setValue( start );
		this.data.onPageChange.subscribe( pageIndex=>this.pageIndex = pageIndex );
		this.profileService.get<Settings>( LogsComponent.profileKey ).subscribe( 
		{
			next: value =>
			{
				if( value )
					this.settings = new Settings( value );
				this.appService.get().subscribe( applications =>
				{
					for( let app of applications )
					{
						this.applications.push( new Application(app) );
						this.applicationStrings.set( app.Id, new ApplicationStrings(app.Id) );
					}
					this.statusSubscription = this.appService.statuses();
					this.statusSubscription.subscribe( statuses => {this.onStatus(statuses);} );
				});				
			},
			error: e =>{console.log(e);}
		});
	}
	ngOnDestroy() 
	{
		this.appService.statusUnsubscribe( this.statusSubscription );
		this.unsubscribe();
		this.profileService.put<Settings>( LogsComponent.profileKey, this.settings );
	}

	onStatus = ( statuses:FromServer.IStatuses ):void =>
	{
		for( const status of statuses.Values )
		{
			let found = this.applications.find( (existing)=>{return existing.id==status.ApplicationId;} );
			if( !found )
				console.error( `Could not find application '${status.ApplicationId}'` );
			else
				found.status = status;
		}
		// if( !this.instanceId )
		// {
		// 	var app = this.applications.find( (existing)=>{return existing.id==this.settings.applicationId;} );
		// 	if( app )
		// 	{
		// 		//this.instanceId = app.instanceId;
		// 		this.level = app.status.DBLogLevel;
		// 	}
		// }
	}
	onTraces = ( tuple:[number,FromServer.ITraceMessage] ):void =>
	{
		const applicationId = tuple[0];
		const trace =  tuple[1];
		//let status = this.applications.find( (app)=>{return app.id==trace.InstanceId;} );
		//if( !status )
		//	throw `no status for ${trace.InstanceId}`;
		var applicationStrings = this.applicationStrings.get( applicationId );
		let entry = new TraceEntry( trace, applicationStrings );
		var stringRequests = applicationStrings.requests( entry );
		if( stringRequests.Values.length>0 )
		{
			// for( let v of stringRequests.Values )
			// {	
			// 	if( v.Value==4219300030 )
			// 		console.log( v.Value );
			// }

			this.appService.requestStrings( stringRequests ).subscribe( value =>{this.onStrings(value[0], value[1]);} );
		}

		let data = stringRequests.Values.length>0 || this.buffer.length ? this.buffer : this.data;
		data.push( entry );
	}
	onStrings = ( applicationId:number, value:FromServer.IApplicationString ):void =>
	{
		//if( value.Id==4219300030 )
		//	console.log( value.Value );
		var applicationStrings = this.applicationStrings.get( applicationId );
		if( !applicationStrings )
			return;
		applicationStrings.set( <FromClient.EStringRequest>value.StringRequestType, value.Id, value.Value );
		let i=0;
		for( ; i<this.buffer.length; ++i )
		{
			let entry = this.buffer[i];
			const haveStrings = entry.message!=null && entry.file!=null && entry.functionName!=null;
			//haveStrings = entry.message!=null && entry.file!=null && entry.functionName!=null;
			if( haveStrings )
				this.data.push( entry );
			else
			{
				//console.log( `~(${entry.messageId}) haveStrings='${haveStrings}' message='${entry.message}' && ${entry.file} && ${entry.functionName} - ${entry.lineNumber}, buffer.length=${this.buffer.length-i}` );
				break;
			}
		}
		if( i>0 )
			this.buffer.splice( 0, i );
		if( !this.buffer.length )
			console.log( 'no buffer length' );
	}

	onChangeApplication( event:MatOptionSelectionChange ) 
	{
		if( event.source.selected )
			this.subscribe( event.source.value, this.level );
	}
	subscribe( applicationId:number, level:FromServer.ELogLevel )
	{
		var subscription = { applicationId: applicationId, level: level, start:this.start };
		if( JSON.stringify(this.currentSubscription)!=JSON.stringify(subscription) )
		{
			this.data.clear();
			this.unsubscribe();
			this.level = level;
			this.currentSubscription = subscription;
			this.subscription = this.appService.logs( subscription.applicationId, subscription.level, subscription.start );
			this.subscription.subscribe( traces => {this.onTraces(traces);} );
		}
	}
	stringify(row)
	{
		//console.log( JSON.stringify(row) );
//{"applicationStrings":{"id":9,"files":{},"functions":{},"messages":{},"users":{}},"_message":"Price below minimum:  CRR - 0.42<1.50","variables":["CRR","0.42","1.50"],"instanceId":1398,"time":"2019-11-22T15:42:16.000Z","level":3,"messageId":1217948776,"fileId":1340806314,"functionId":2692579098,"lineNumber":178,"userId":0,"threadId":3934680832,"_file":"./DecisionTreeManager.cpp","_function":"Calculate"}
		return row.lineNumber;
	}
	unsubscribe()
	{
		if( this.subscription )
		{
			this.appService.logsUnsubscribe( this.currentSubscription.applicationId, this.subscription );
			this.subscription = null;
			this.currentSubscription = LogsComponent.DefaultSubscription;
		}
	}
	@HostListener('window:scroll', ['$event']) 
	doSomething(event) 
	{
		console.debug("Scroll Event", document.body.scrollTop );
		console.debug("Scroll Event", window.pageYOffset );
	}
	onLevelChange( logLevel:FromServer.ELogLevel )
	{
		this.subscribe( this.applicationId, logLevel );
	}
	//@ViewChild("table-body") configuration:ConfigureTableComponent;
	sortData(sort: Sort) 
	{
		this.data.sort( sort );
		this.sort = sort;
  	}
	pageChangeEvent( event ) 
	{
		const offset = event.pageIndex * event.pageSize;
		this.data.setPage( offset, event.pageSize );
	}
	cellClick( event, i )
	{
		const row = event.target.parentElement as Element;
		row.classList.add( 'highlight' );
		if( this.selectedRow )
			this.selectedRow.classList.remove( 'highlight' );
		this.selectedRow = row==this.selectedRow ? null : row;
	}
	hideSelectedMessage()
	{
		//some maybe hidden, need to put it in html
		// errorService.assert(  this.selectedRow );
		// var i = this.pageIndex*this.pageSize;
		// while( (child = this.selectedRow.previousSibling) != null ) 
  		// 	i++;
	}
	get sort(){return this.settings.sort;} set sort(value){this.settings.sort=value;}
	settings:Settings = new Settings();
	pageSize:number=23;
	pageIndex:number=0;
	data: DataSource = new DataSource( this.pageSize );
	get paused(){return this.data.paused;} set paused(value){this.data.paused=value;}
//	private socket:WebSocketSubject<string>;
	connected = false;
	displayedColumns : string[] = [ 'date', 'level', 'message', 'function', 'file', 'line' ];
	//configuration = { displayHeader:true }
	@ViewChild('mainTable',{static: false}) _table:MatTable<TraceEntry>;

	toLevel( level:FromServer.ELogLevel ):string{ return FromServer.ELogLevel[level]; }

	get applicationId(){ return this.settings.applicationId; } set applicationId(value){ this.settings.applicationId=value; }
	get start():Date{ return this._start.value; } set start(value:Date){ this._start.setValue(value); 
	this.settings.start = value; } private _start = new FormControl();
	startChange( event: MatDatepickerInputEvent<Date> ){ this.subscribe( this.applicationId, this.level ); }
	private buffer:TraceEntry[] = [];
	static DefaultSubscription:ISubscription={ applicationId: 0, level:  FromServer.ELogLevel.None, start:null };
	private currentSubscription:ISubscription=LogsComponent.DefaultSubscription;//actual subscribtion
	private instanceId:number; //instance in dropdown
	private get level():FromServer.ELogLevel{ return this.settings.level; } private set level( value:FromServer.ELogLevel ){ this.settings.level=value; }
	private get application():Application|null{ return this.applications.find( (existing)=>{return existing.id==this.applicationId;} ); }
	private applications:Application[]=[];
	private subscription:Observable<[number,FromServer.ITraceMessage]>
	private applicationStrings:Map<number,ApplicationStrings> = new Map<number,ApplicationStrings>();
	private statusSubscription:Observable<FromServer.IStatuses>;
	private static profileKey="logs";
	private selectedRow:Element;
}

interface ISubscription{ applicationId:number, level:FromServer.ELogLevel, start:Date|null }