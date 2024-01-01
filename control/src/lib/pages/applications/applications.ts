import {Component, OnDestroy, OnInit, Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SeverityPicker } from '../../shared/severity-picker/severity-picker'
import { DomSanitizer } from "@angular/platform-browser";
import {Params} from '@angular/router';
import { MatIconRegistry } from "@angular/material/icon";
import { ComponentPageTitle } from 'jde-material';
import {AppService} from '../../services/app/app.service';
import {Observable, Subscription} from 'rxjs';
import {Application} from '../../services/app/application';
import {IErrorService} from '../../services/error/IErrorService';
import * as AppFromServer from 'jde-cpp/AppFromServer'; import FromServer = AppFromServer.Jde.ApplicationServer.Web.FromServer;
import * as AppFromClient from 'jde-cpp/AppFromClient'; import FromClient = AppFromClient.Jde.ApplicationServer.Web.FromClient;

@Component({
  selector: 'applications',
  templateUrl: './applications.html',
  styleUrls: ['./applications.scss']
})
export class Applications implements OnInit, OnDestroy
{
	params: Observable<Params>;
	routeParamSubscription: Subscription;
	_categoryListSummary: string;

	constructor( public _componentPageTitle: ComponentPageTitle, private appService:AppService, private dialog:MatDialog, private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer, @Inject('IErrorService') private cnsl: IErrorService ){
		const url = this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/download.svg");
		this.matIconRegistry.addSvgIcon( "ib", "download.svg" );
	}

	async ngOnInit(){
		this._componentPageTitle.title = "Applications";
		this.applications.length = 0;
		try{
			//await this.appService.custom( 99, new TextEncoder().encode("adsf") );
			const applications = await this.appService.getApplications();
			for( let app of applications )
				this.applications.push( new Application(app) );
			this.subscription = this.appService.statuses();
			this.subscription.subscribe( apps => {this.onStatus(apps);} );
		}
		catch( e ){
			this.cnsl.error( "Could not load applications", e );
		}
	}

	onStatus = ( statuses:FromServer.IStatuses ):void =>{
		this.mainOn = true;
		for( const status of statuses.values )
		{
			let existing = this.applications.find( app=>app.id==status.applicationId );
			if( existing )
				existing.status = status;
			else
			console.warn( `could not find app ${status.applicationId}` );
		}
	}

	ngOnDestroy(){
		this.appService.statusUnsubscribe( this.subscription );
	}

	togglePower( app:Application ){
		if( app.on )
			this.appService.request( app.instanceId, -2 );//FromClient.ERequest.Power | FromClient.ERequest.Negate
		else{
			this.cnsl.error( "applicationService.start failed", null );
			/*this.applicationService.start( app.name ).subscribe(
			{
				next:  response=>{console.log(`applicationService.start returned '${response}'`);},
				error:  e=>{ this.cnsl.error("applicationService.start failed", e); }
			});*/
		}
	}

	edit( app:Application ){
		const dialogRef = this.dialog.open(EditDialog, {
			width: '600px',
			data: {app: app}
		});
	}
	applications:Application[]=[];
	mainOn:boolean=false;
	private subscription:Observable<FromServer.IStatuses>;
}

interface DialogData{
	app: Application;
}

interface LogOption{
	name:string;
	value:FromServer.ELogLevel;
}

@Component( { selector: 'missing-dates-dialog',	templateUrl: 'edit-dialog.html'} )
export class EditDialog{
	constructor( public dialogRef:MatDialogRef<EditDialog>, @Inject(MAT_DIALOG_DATA) public data:DialogData, private appService:AppService ){
		this.dbLevel = this.app.status?.dbLogLevel;
		this.clientLevel = this.app.status?.fileLogLevel;
	}

	onCancelClick(): void{
	  this.dialogRef.close();
	}

	onSaveClick():void{
		this.saving = true;
		this.appService.updateLogLevel( this.app.instanceId, this.clientLevel, this.dbLevel );
		this.dialogRef.close();
	}
	dbLevel:FromServer.ELogLevel;
	clientLevel:FromServer.ELogLevel;
	options:LogOption[]=[{name:'Trace',value:FromServer.ELogLevel.Trace},{name:'Debug',value:FromServer.ELogLevel.Debug}, {name:'Info',value:FromServer.ELogLevel.Information},{name:'Warning',value:FromServer.ELogLevel.Warning},{name:'Error',value:FromServer.ELogLevel.Error},{name:'Critical',value:FromServer.ELogLevel.Critical},{name:'None',value:FromServer.ELogLevel.None}]
	get app():Application{ return this.data.app; }
	saving:boolean=false;
}