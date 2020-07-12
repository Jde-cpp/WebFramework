import { Injectable } from '@angular/core';
import{ IProfile } from './IProfile'
import { Observable,of, throwError } from 'rxjs';

@Injectable()
export class LocalStorageProfile implements IProfile
{
	get<T>( key:string ): Observable<T>
	{
		const item = localStorage.getItem( key );
		var callback:Observable<T> = of( item ? JSON.parse(item) : null );
		return callback;
	}
	put<T>( name:string, value:T ):void
	{
		this.putJson( name, value ? JSON.stringify(value) : null );
	}
	putJson( name:string, json:string ):void
	{
		if( json )
			localStorage.setItem( name, json );
		else
			localStorage.removeItem( name );
	}
}
