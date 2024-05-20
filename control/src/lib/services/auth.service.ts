import { Injectable } from '@angular/core';
import { IAuth } from 'jde-material';
import { AppService } from './app/app.service';

@Injectable()
export class AuthService implements IAuth{
	constructor( private app: AppService )
	{}

	get enabled():boolean{ return true; }

	login( token?:string ):Promise<void>{
		return this.loggedIn ? Promise.resolve() : this.pushLoginPromise( token );
	}
	loginPassword( username:string, password:string, authenticator:string ):Promise<void>{
		return this.loggedIn ? Promise.resolve() : this.pushLoginPromise();
	}
	onLogout():void{
		this.#loggedIn = false;
	}
	pushLoginPromise( token?:string ):Promise<void>{
		let p = new Promise<void>( (resolve, reject)=>this.#promises.push( [resolve,reject] ) );
		if( this.#promises.length==1 )
			this.callServer( token );
		return p;
	}
	async googleAuthClientId():Promise<string>{
		if( this.#googleAuthClientId )
			return Promise.resolve( this.#googleAuthClientId );
		let p = await this.app.googleAuthClientId();
		this.#googleAuthClientId = p;

		return p;

		// let thisResolve:()=>void, thisRefect:(x:any)=>void;
		// let p = this.#googleAuthClientId
		// 	? Promise.resolve( this.#googleAuthClientId )
		// 	: new Promise<string>( (resolve, reject)=>{thisResolve=resolve, thisReject} );
		// if( this.#googleAuthClientIdPromises.length==1 )
		// 	this.googleAuthClientIdAsync( p );
		// return p;
	}
	async callServer( token?:string ){
		let self = this;
		try{
			await this.app.googleLogin( token, this );
			this.#loggedIn = true;
			this.#promises.forEach( x=>x[0]() );
			this.#promises.length=0;
		}
		catch( e ){
			for( var promise of self.#promises )
				promise[1]( e );
		}
	}
	get loggedIn(){return this.#loggedIn;} #loggedIn=false;
	idToken:string;
	#promises:[()=>void,(x:any)=>void][]=[];
	#googleAuthClientId:string;
}