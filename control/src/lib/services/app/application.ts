import {ProtoUtilities} from '../../utilities/protoUtilities'
import { DatePipe } from '@angular/common';

import * as AppFromServer from '../../proto/AppFromServer'; import FromServer = AppFromServer.Jde.ApplicationServer.Web.FromServer;

export class Application
{
	constructor( private app:FromServer.IApplication )
	{}
	status:FromServer.IStatus
	get id():number{return this.app.id};
	get name():string{return this.app.name};
	get instanceId():number{ return ProtoUtilities.toNumber(this.status ? this.status.instanceId : 0); }
	get startTime():Date|null{return !this.status || !this.status.startTime ? null : new Date(this.status.startTime*1000);}
	get startTimeString():string
	{
		if( !this.startTime )
			return "Stopped";
		const startTime = this.startTime;
		const now = Date.now();
		const pipe = new DatePipe('en-US');
		let result=null;
		if( startTime.getTime()>now-24*60*60*1000 )
			result = pipe.transform( startTime, 'shortTime' );
		else
			result = pipe.transform( startTime, 'shortDate' );
		return result;
	}
	get memory():number{ return this.status.memory ? ProtoUtilities.toNumber(this.status.memory) : 0; }
	get memoryString():string
	{
		var value = this.memory;
		var suffix = "";
		const test = function( boundry, boundrySuffix )
		{
			const overBoundry = value>boundry;
			if( overBoundry )
			{
				value = value/boundry;
				suffix = boundrySuffix;
			}
			return overBoundry;
		}
		if( !test(Math.pow(2,30), "GB") )
			if( !test(Math.pow(2,20), "MB") )
				test( Math.pow(2,10), "KB" );
		return Math.round(value).toString()+suffix;
	}
	get dbLevel():string{return FromServer.ELogLevel[this.status.dbLogLevel];}
	get clientLevel():string{return FromServer.ELogLevel[this.status.fileLogLevel];}
	get description():string[]{return this.status.values;}
	get on():boolean{return this.startTime!=null && this.startTime.getTime()!=0; }
	get icon():string
	{
		var icon="touch_app";
		if( this.name=="Main" )
			icon="domain";
		else if( this.name=="Historian" )
			icon="history";
		else if( this.name=="DriveBackup" )
			icon="sync";
		else if( this.name=="training" )
			icon="train";
		else if( this.name=="TwsWebSocket" )
			icon="ib";

		return icon;
	}
}
