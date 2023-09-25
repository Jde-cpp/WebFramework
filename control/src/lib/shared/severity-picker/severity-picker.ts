import {Component,EventEmitter,Input,NgModule,Output} from '@angular/core';
//import { BrowserModule } from '@angular/platform-browser'
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import * as AppFromServer from 'jde-cpp/FromServer'; import FromServer = AppFromServer.Jde.ApplicationServer.Web.FromServer;

@Component({ selector: 'severity-picker', templateUrl: './severity-picker.html' })
export class SeverityPicker
{
	ngOnInit()
	{
	}
	/*onSelectionChange( value:FromServer.ELogLevel )
	{
		if( this.level!=value )
		{
			this.level=value;
			this.levelChange.emit( value );
		}
	}*/
	get level(){ return this.#level; } @Input() set level(x){ let emit = this.#level!==undefined; this.#level=x; if( emit )this.levelChange.emit( x ); }   #level:FromServer.ELogLevel;
	@Output() levelChange = new EventEmitter<FromServer.ELogLevel>();
	@Input() isSelect:boolean=true;

	options:LogOption[]=[{name:'Trace',value:FromServer.ELogLevel.Trace},{name:'Debug',value:FromServer.ELogLevel.Debug}, {name:'Info',value:FromServer.ELogLevel.Information},{name:'Warning',value:FromServer.ELogLevel.Warning},{name:'Error',value:FromServer.ELogLevel.Error},{name:'Critical',value:FromServer.ELogLevel.Critical},{name:'None',value:FromServer.ELogLevel.None}];
}

interface LogOption
{
	name:string;
	value:FromServer.ELogLevel;
}

@NgModule( {exports: [SeverityPicker], declarations: [SeverityPicker], imports:[/*BrowserModule,*/MatFormFieldModule,MatSelectModule]} )
export class SeverityPickerModule {}