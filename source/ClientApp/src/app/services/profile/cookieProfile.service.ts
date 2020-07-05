import { Injectable } from '@angular/core';
import{ IProfile } from './IProfile'
import { Observable,of, throwError } from 'rxjs';

@Injectable()
export class CookieProfile implements IProfile
{
	get<T>( key:string ): Observable<T>
	{
		var callback:Observable<T> = null;
		let foundCookie = null;
		const cookies = document ? document.cookie.split( ";" ) : [];
		for( let cookie of cookies )
		{
			let x = cookie.substr( 0, cookie.indexOf("=") );
			const y=cookie.substr( cookie.indexOf("=")+1 );
			x = x.replace(/^\s+|\s+$/g,"");
			if( x!=key )
				continue;
			try
			{
				callback = of( JSON.parse(y) );
			}
			catch( e )
			{
				throw throwError( e );
			}
			break;
		}
		if( !callback )
			callback = of( null );

		return callback;
	}
	put<T>( name:string, value:T ):void
	{
		this.put( name, JSON.stringify(value) );
	}
	putJson( name:string, json:string ):void
	{
		const exdate = new Date();
		exdate.setDate( exdate.getDate() + 364 );
		const c_value = json + "; expires="+exdate.toUTCString();
		document.cookie = name + "=" + c_value;
	}
}
