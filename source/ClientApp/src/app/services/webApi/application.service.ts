import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject,Observable,of } from 'rxjs';

@Injectable()
export class ApplicationService
{
	constructor( private http: HttpClient, @Inject('API_URL') baseUrl: string )
	{
		this.url = baseUrl + 'api/Application';
	}
	get(): Observable<Map<number,string>>
	{
		var callback = new Subject<Map<number,string>>();
		this.http.get(this.url).subscribe(
		{
			next: response => 
			{
				let values = new Map<number,string>();
				Object.keys(response).forEach( (id)=>
				{
					let name = response[id] as string;
					let pk = id as unknown as number;
					values.set( pk, name );
				});
				return values;
			},
			error:  e=>{callback.error(e);}
		});
		return callback;
	}

	start( name:string ): Observable<boolean>
	{
		var callback = new Subject<boolean>();
		this.http.post( `${this.url}/${name}`, 0 ).subscribe(
		{
			next:  response=>{callback.next(response as boolean);},
			error:  e=>{callback.error(e);}
		});//.catch( e=>{console.error(e);} )
		return callback;
	}

	private url:string;
}
