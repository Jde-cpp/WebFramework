import {Sort} from '@angular/material';

import * as AppFromServer from '../../../proto/appFromServer';
import FromServer = AppFromServer.Jde.ApplicationServer.Web.FromServer;

export class Settings
{
	constructor( params:Settings=null )
	{
		if( !params )
			return;
		if( params.sort )
			this.sort = params.sort;
		if( params.autoScroll )
			this.autoScroll = params.autoScroll;
		if( params.applicationId )
			this.applicationId = params.applicationId;
		if( params.level )
			this.level = params.level;
		if( params.start )
			this.start = params.start;
		if( params.hiddenMessages )
			this.hiddenMessages = params.hiddenMessages;
		if( params.limit )
			this.limit = params.limit;
	}
	sort:Sort = {active: "time", direction: "asc"};
	autoScroll:boolean=true;
	applicationId:number=1;
	level:FromServer.ELogLevel=FromServer.ELogLevel.Information;
	limit:number=5000;
	hiddenMessages:number[]=[];
	get start():Date{ return this._start || Settings.defaultDate; } set start( value:Date ){ this._start=value==Settings.defaultDate ? null : value;} private _start:Date;
	static get defaultDate():Date{ var start = new Date(); start.setHours( 0, 0, 0, 0 ); start.setDate( start.getDate()-1 ); return start; }
}
