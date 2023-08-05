import { Injectable } from '@angular/core';
import { IAuth } from 'jde-material';
import { AppService } from './app/app.service';

@Injectable()
export class AuthService implements IAuth
{
	constructor( private app: AppService )
	{}

	get enabled():boolean{ return true; }

	login( token?:string ):Promise<void>
	{
		return this.loggedIn ? Promise.resolve() : this.pushLoginPromise( token );
	}
	pushLoginPromise( token?:string ):Promise<void>
	{
		let p = new Promise<void>( (resolve, reject)=>this.#promises.push( [resolve,reject] ) );
		if( this.#promises.length==1 )
			this.callServer( token );
		return p;
	}
	async callServer( token?:string )
	{
		let self = this;
		try
		{
			await this.app.googleLogin( token );
			debugger;
			this.#promises.forEach( x=>x[0]() );
			this.#promises.length=0;
		}
		catch( e )
		{
			for( var promise of self.#promises )
				promise[1]( e );
		}
	}
	get loggedIn(){return this.#loggedIn;} #loggedIn=false;
	idToken:string;
	#promises:[()=>void,(x:any)=>void][]=[];
}