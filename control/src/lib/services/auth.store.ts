import { Injectable, Signal, signal } from '@angular/core';
import { LoggedInUser } from 'jde-material';
import { clone } from '../utilities/utils'

const userStorageKey = 'user';

@Injectable({ providedIn: 'root' })
export class AuthStore{
	constructor(){
		const loggedInUser = localStorage.getItem(userStorageKey);
		if( this.log ) console.log( `AuthService: ${loggedInUser}` );
		if( loggedInUser ){
			let user = JSON.parse(loggedInUser);
			this.#userSignal.set( user );
		}
	}

	append( user:LoggedInUser ):void{
		const current = this.user();
		let updated = current ? clone( current ) : user;
		if( current ){
			for( let key in user )
				updated[key] = user[key];
		}
		if( this.log ) console.log( `auth.append( ${JSON.stringify(updated)} )` );
		localStorage.setItem( userStorageKey, JSON.stringify(updated) );
		this.#userSignal.set( updated );
	}

	reset( serverInstance?:{url:string,instance:number} ):void{
		let user = null;
		if( serverInstance ){
			user = { serverInstances: this.user()?.serverInstances ?? [] };
			AuthStore.upsertServerInstance( user, serverInstance.url, serverInstance.instance );
		}
		if( this.log ) console.log( `auth.reset( ${JSON.stringify(user)} )` );
		if( user )
			localStorage.setItem( userStorageKey, JSON.stringify(user) );
		else
			localStorage.removeItem( userStorageKey );
		this.#userSignal.set( user );
	}

	setServerInstance( url: string, instance: number ){
		let user = this.user() ?? {};
		AuthStore.upsertServerInstance( user, url, instance );
		if( this.log ) console.log( `setServerInstance( ${JSON.stringify(user)} )` );
		this.#userSignal.set( user );
	}

	static upsertServerInstance( user: LoggedInUser, url: string, instance: number ){
		let index = user.serverInstances.findIndex( (x)=>x.url==url );
		if( index>=0 )
			user.serverInstances[index].instance = instance;
		else
			user.serverInstances.push({ url, instance });
	}

	logout(){
		let newAuth = this.user()?.serverInstances ? {serverInstances:this.user().serverInstances} : null;
		if( newAuth )
			localStorage.setItem( userStorageKey, JSON.stringify(newAuth) );
		else
			localStorage.removeItem( userStorageKey );
		if( this.log ) console.log( `logout(${JSON.stringify(newAuth)})` );
		this.#userSignal.set( newAuth );
	}

	log:boolean = true;
	#userSignal = signal<LoggedInUser | null>( null );
	get user():Signal<LoggedInUser | null>{ return this.#userSignal.asReadonly(); }
}