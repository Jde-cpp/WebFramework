import {Component,EventEmitter,Input,NgModule,Output} from '@angular/core';
//import { BrowserModule } from '@angular/platform-browser'
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import * as AppFromServer from '../../proto/App.FromServer'; import FromServer = AppFromServer.Jde.App.Proto.FromServer;
import * as CommonProto from '../../proto/Common'; import Common = CommonProto.Jde.Proto;

@Component({ selector: 'severity-picker', templateUrl: './severity-picker.html' })
export class SeverityPicker{
	ngOnInit()
	{
	}
	/*onSelectionChange( value:Common.ELogLevel )
	{
		if( this.level!=value )
		{
			this.level=value;
			this.levelChange.emit( value );
		}
	}*/
	get level(){ return this.#level; } @Input() set level(x){ let emit = this.#level!==undefined; this.#level=x; if( emit )this.levelChange.emit( x ); }   #level:Common.ELogLevel;
	@Output() levelChange = new EventEmitter<Common.ELogLevel>();
	@Input() isSelect:boolean=true;

	options:LogOption[]=[{name:'Trace',value:Common.ELogLevel.Trace},{name:'Debug',value:Common.ELogLevel.Debug}, {name:'Info',value:Common.ELogLevel.Information},{name:'Warning',value:Common.ELogLevel.Warning},{name:'Error',value:Common.ELogLevel.Error},{name:'Critical',value:Common.ELogLevel.Critical},{name:'None',value:Common.ELogLevel.NoLog}];
}

interface LogOption
{
	name:string;
	value:Common.ELogLevel;
}

@NgModule( {exports: [SeverityPicker], declarations: [SeverityPicker], imports:[/*BrowserModule,*/MatFormFieldModule,MatSelectModule]} )
export class SeverityPickerModule {}