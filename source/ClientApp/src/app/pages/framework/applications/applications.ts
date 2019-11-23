import {Component, NgModule, OnDestroy, OnInit, Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DomSanitizer } from "@angular/platform-browser";
import {ActivatedRoute, Params} from '@angular/router';
import { MatIconRegistry } from "@angular/material/icon";
import {ComponentPageTitle} from '../../material-site/page-title/page-title';
import {AppService} from '../../../services/app/app.service';
import {ApplicationService} from '../../../services/webApi/application.service';
import {Observable, Subscription} from 'rxjs';
import {Application} from '../../../services/app/application'
import {IErrorService} from '../../../services/error/IErrorService'

import * as AppFromServer from '../../../proto/appFromServer';
import FromServer = AppFromServer.Jde.ApplicationServer.Web.FromServer;

import * as AppFromClient from '../../../proto/appFromClient';
import FromClient = AppFromClient.Jde.ApplicationServer.Web.FromClient;


@Component({
  selector: 'applications',
  templateUrl: './applications.html',
  styleUrls: ['./applications.scss']
})
export class ApplicationsHomeComponent implements OnInit, OnDestroy
{
	params: Observable<Params>;
	routeParamSubscription: Subscription;
	_categoryListSummary: string;

	constructor( public _componentPageTitle: ComponentPageTitle, private _route: ActivatedRoute, private appService:AppService, private applicationService:ApplicationService, private dialog:MatDialog, private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer, @Inject('IErrorService') private cnsl: IErrorService ) 
	{
		const url = this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/download.svg");
		this.matIconRegistry.addSvgIcon( "ib", "download.svg" );
	}
	ngOnInit() 
	{
		this._componentPageTitle.title = "Applications";
		this.applications.length = 0;
		this.appService.get().subscribe( 
		{
			next:	applications =>
			{
				for( let app of applications )
					this.applications.push( new Application(app) );
				this.subscription = this.appService.statuses();
				this.subscription.subscribe( apps => {this.onStatus(apps);} );
			},
			error: e=>{ this.cnsl.observableError("Could not load applications", e); }
		});
	}

	onStatus = ( statuses:FromServer.IStatuses ):void =>
	{
		this.mainOn = true;
		for( const status of statuses.Values )
		{
			let existing = this.applications.find( app=>app.id==status.ApplicationId );
			if( existing )
				existing.status = status;
			else
			this.cnsl.warn( `could not find app ${status.ApplicationId}` );
		}
	}

	ngOnDestroy() 
	{
		this.appService.statusUnsubscribe( this.subscription );
	}
	togglePower( app:Application )
	{
		if( app.on )
			this.appService.request( app.instanceId, -2 );//FromClient.ERequest.Power | FromClient.ERequest.Negate
		else
		{
			this.applicationService.start( app.name ).subscribe(
			{
				next:  response=>{this.cnsl.log(`applicationService.start returned '${response}'`);},
				error:  e=>{ this.cnsl.observableError("applicationService.start failed", e); }
			});
		}
	}
	edit( app:Application )
	{
		const dialogRef = this.dialog.open(EditDialog, {
			width: '600px',
			data: {app: app}
		});
	}
	applications:Application[]=[];
	mainOn:boolean=false;
	private subscription:Observable<FromServer.IStatuses>;
}

interface DialogData 
{
	app: Application;
}

interface LogOption
{
	name:string;
	value:FromServer.ELogLevel;
}

@Component( { selector: 'missing-dates-dialog',	templateUrl: 'edit-dialog.html'} )
export class EditDialog
{
	constructor( public dialogRef:MatDialogRef<EditDialog>, @Inject(MAT_DIALOG_DATA) public data:DialogData, private appService:AppService )
	{
		this.dbLevel = this.app.status.DBLogLevel;
		this.clientLevel = this.app.status.FileLogLevel;
	}
 
	onCancelClick(): void 
	{
	  this.dialogRef.close();
	}
	onSaveClick():void
	{
		this.saving = true;
		this.appService.updateLogLevel( this.app.instanceId, this.clientLevel, this.dbLevel );
		this.dialogRef.close();
	}
	dbLevel:FromServer.ELogLevel;
	clientLevel:FromServer.ELogLevel;
	options:LogOption[]=[{name:'Trace',value:FromServer.ELogLevel.Trace},{name:'Debug',value:FromServer.ELogLevel.Debug}, {name:'Info',value:FromServer.ELogLevel.Information},{name:'Warning',value:FromServer.ELogLevel.Warning},{name:'Error',value:FromServer.ELogLevel.Error},{name:'Critical',value:FromServer.ELogLevel.Critical},{name:'None',value:FromServer.ELogLevel.None}]
	get app():Application{return this.data.app;}
	saving:boolean=false;
}