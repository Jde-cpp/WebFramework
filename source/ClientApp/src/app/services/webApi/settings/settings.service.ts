import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { IErrorService } from "../../error/IErrorService";
import { DataTypes } from "./DataType"

export interface ISettingGroups
{
	id: number;
	name: string;
	description: string;
	visible: boolean;
	editable: boolean;
	settings: Array<ISetting>;
}
export interface ISetting
{
	id: number;
	name: string;
	description: string;
	value: string;
	type: DataTypes;
	isList: boolean;
	visible: boolean;
	editable: boolean;
	tabId: number;
}


//@Injectable()
export class SettingsService
{
	constructor( private http: HttpClient, @Inject('IErrorService') private profileService: IErrorService, @Inject('API_URL') baseUrl: string )
	{
		this.baseUrl = baseUrl + 'api/Settings';
	}
	get(): Promise<ISettingGroups[]>
	{
		return this.http.get(this.baseUrl).toPromise().then(response =>
    	{
			return response  as ISettingGroups[];
		}).catch( e => {return Promise.reject( e.message || e )} ); 
	}
	/*put( instance_name:string, zone_id:number, value:boolean ):Promise<boolean>
	{
			try
			{
					//return Promise.reject("not implemented");
					return this.http.put( this.getUrl(instance_name), {"zone_id":zone_id, "value":value}).toPromise().then( response =>{return true;}).catch( ServiceUtilities.handleError );
			}
			catch( e )
			{
					return Promise.reject(e);
			}
	}*/
	private baseUrl: string;
	getUrl(instanceName: string) { return this.baseUrl + "/" + instanceName; }
}
