import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class ApplicationService
{
	constructor( private http: HttpClient, @Inject('API_URL') baseUrl: string )
	{
		this.url = baseUrl + 'api/Application';
	}
	get() : Promise<Map<number,string>>
	{
		return this.http.get(this.url).toPromise().then( response => 
		{
			let values = new Map<number,string>();
			Object.keys(response).forEach( (id)=>
			{
				let name = response[id] as string;
				let pk = id as unknown as number;
				values.set( pk, name );
			});
			return values;
		});
	}

	start( name:string ): Promise<boolean>
	{
		return this.http.post( `${this.url}/${name}`, 0 ).toPromise().then( response =>
		{
			return response as boolean;
		});//.catch( e=>{console.error(e);} )
	}

	private url:string;
}
