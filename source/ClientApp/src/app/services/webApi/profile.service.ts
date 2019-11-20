import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject,Observable,of } from 'rxjs';
import { callbackify } from 'util';
//import { ErrorService } from "../error.service";
//import { DataTypes } from "../../DataType"


@Injectable()
export class ProfileService
{//, @Inject(ErrorService) public errorService: ErrorService
	constructor( private http: HttpClient, @Inject('API_URL') baseUrl: string )
	{
		this.profileUrl = baseUrl + 'api/Profile';
		this.valuesUrl = baseUrl + 'api/ProfileValues';
	}
	get<T>( key:string ): Observable<T>
	{
		let callback = new Subject<T>();
		this.getProfile(key).subscribe(
		{
			next: profileId => 
			{
				console.log( `${this.valuesUrl}/${profileId}` );
				this.http.get( `${this.valuesUrl}/${profileId}` ).subscribe( 
				{
					next:  response =>{callback.next( response as T );},
					error: e=>{ callback.error( e ); }
				});
			},
			error: e=>{ callback.error(e); }
		});//.catch( e=>{return Promise<T>.reject(e);} );
		return callback;
	}
	put<T>( name:string, value:T ):void
	{
		var url = `${this.valuesUrl}/${name}`;
		console.log( `put:  ${url}` );
		this.http.put( url, value ).subscribe(//, headers
      		data => console.log('put profile'),
      		error => console.error(`put profile failed - ${error.message}`) );
	}
	private getProfile(key:string) : Observable<number>
	{
		var callback = null;
		this.loadProfiles().subscribe( 
		{
			next: values =>
			{
				if( values.has(key) )
				{
					if( callback )
						callback.next( values.get(key) );
					else
						callback = of( values.get(key) );
				}
				else
				{
					this.postProfile( key ).subscribe(
					{
						next: value=>{callback.next(value);},
						error: e=>{callback.error(e);}
					});
				}
			},
			error: e=>{callback.error(e);}
		});
		if( !callback )
			callback = new Subject<number>();
		return callback;
	};
	private postProfile( name:string ): Observable<number>
	{
		var callback = new Subject<number>();
		console.log( `post:  ${this.profileUrl}/${name}` );
		this.http.post( `${this.profileUrl}/${name}`, null ).subscribe(
		{
			next: value=>{ callback.next( <number>value );},
			error: e=>{callback.error( e );}
		});//.catch( e=>{console.error(e);} )
		return callback;
	}

	private loadProfiles() : Observable<Map<string,number>>
	{
		if( this.profiles )
			return of( this.profiles );
		var callback = new Subject<Map<string,number>>();
		console.log( this.profileUrl );
		this.http.get( this.profileUrl ).subscribe(
		{
			next: response => 
			{
				this.profiles = new Map<string,number>();
				Object.keys(response).forEach( (id)=>
				{
					let name = response[id] as string;
					let pk = id as unknown as number;
					this.profiles.set(name, pk);
				});
				callback.next( this.profiles );
			},
			error:  e=>{callback.error(e);}
		});
		return callback;
	}

	private profileUrl: string;
	private valuesUrl: string;
	private profiles:Map<string,number>;// = new Map<string,number>();
	//private getUrl(instanceName: string) { return this.baseUrl + "/" + instanceName; }
}
