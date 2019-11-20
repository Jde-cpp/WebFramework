import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { ErrorService } from "../error.service";
//import { reject } from 'q';


@Injectable()
export class HistorianService
{
	constructor( private http: HttpClient, @Inject('API_URL') private _baseUrl: string )
	{}

	post( contractId:number, values:string[][] ): Promise<void>
	{
		let param = [];
		values.forEach( (strings)=>{ param.push( {"start": strings[0], "end": strings[1]}); });
		let url = `${this.baseUrl}/${contractId}`;
		return this.http.post( url, param ).toPromise().then( response =>
		{
			return;
		}).catch( (e)=>
		{
			console.error(e); 
			throw e;
		});
	}

	get baseUrl(){return this._baseUrl + 'api/historian';}
}