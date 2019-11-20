import { Injectable } from '@angular/core';

@Injectable()
export class CookieService
{
	get(name:string): any
	{
		let foundCookie = null;
		if( document!=undefined )
		{
			const ARRcookies=document.cookie.split(";");
			for( let i=0;i<ARRcookies.length; i++ )
			{
				let x = ARRcookies[i].substr( 0, ARRcookies[i].indexOf("=") );
				const y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
				x = x.replace(/^\s+|\s+$/g,"");
				if( x==name )
				{
					try
					{
						foundCookie = JSON.parse( y );
					}
					catch( error )
					{
						console.error(error);
					}
					break;
				}
			}
		}
		return foundCookie;
	}
	set(name:string, value:any)
	{
		const exdate = new Date();
		exdate.setDate( exdate.getDate() + 364 );
		const c_value= JSON.stringify(value) + "; expires="+exdate.toUTCString();
		document.cookie = name + "=" + c_value;
	}
}
