import {Component,EventEmitter,Input,Output} from '@angular/core';
import * as AppFromServer from '../../../proto/appFromServer';
import FromServer = AppFromServer.Jde.ApplicationServer.Web.FromServer;

interface LogOption
{
	name:string;
	value:FromServer.ELogLevel;
}

@Component({
	selector: 'severity-picker',
	templateUrl: './severity-picker.html'
})
export class SeverityPickerComponent
{
	@Input() level:FromServer.ELogLevel; @Output() levelChange = new EventEmitter<FromServer.ELogLevel>();
	@Input() isSelect:boolean=true;
	//level2:number=4;
	
	onSelectionChange( value:FromServer.ELogLevel )
	{
		if( this.level!=value )
		{
			this.level=value;
			this.levelChange.emit( value );
		}
	}
	options:LogOption[]=[{name:'Trace',value:FromServer.ELogLevel.Trace},{name:'Debug',value:FromServer.ELogLevel.Debug}, {name:'Info',value:FromServer.ELogLevel.Information},{name:'Warning',value:FromServer.ELogLevel.Warning},{name:'Error',value:FromServer.ELogLevel.Error},{name:'Critical',value:FromServer.ELogLevel.Critical},{name:'None',value:FromServer.ELogLevel.None}];
	//options2:LogOption[]=[{name:'Trace',value:0},{name:'Debug',value:1}, {name:'Info',value:2},{name:'Warning',value:3},{name:'Error',value:4},{name:'Critical',value:5},{name:'None',value:6}];
 }