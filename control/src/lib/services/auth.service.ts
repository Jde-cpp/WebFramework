import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { IAuth } from 'jde-material';
import { AppService } from './app/app.service';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

const userStorageKey = 'user';
/*
@Injectable()
export class AuthService implements IAuth{
	constructor( private app: AppService ) {
    this.loadUserFromStorage();
    effect(() => {
      const user = this.user();
      if (user) {
        localStorage.setItem(userStorageKey,
          JSON.stringify(user));
      }
    });
		app.subscribeLoginName().subscribe({
			next:(login: string) =>{
				this.subscription.next( login );
			},
			error:(error: Error) =>{
				console.log( error.message );
				this.subscription.next( "" );
		}});
  }

  private loadUserFromStorage() {
    const json = localStorage.getItem(userStorageKey);
    if(json)
      this.#userSignal.set(JSON.parse(json));
  }

	get enabled():boolean{ return true; }

	loginGoogle( token?:string ):Promise<void>{
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
	async validateSessionId():Promise<void>{
		const sessionInfo = await this.app.validateSessionId();
		this.subscription.next( sessionInfo ? sessionInfo.domain ? `${sessionInfo.domain}/${sessionInfo.loginName}` : sessionInfo.loginName : "" );
	}
	async googleAuthClientId():Promise<string>{
		if( this.#googleAuthClientId )
			return Promise.resolve( this.#googleAuthClientId );
		let p = await this.app.googleAuthClientId();
		this.#googleAuthClientId = p;

		return p;
	}
	async callServer( token?:string ){
		let self = this;
		try{
			await this.app.googleLogin( token );
			this.#loggedIn = true;
			this.#promises.forEach( x=>x[0]() );
		}
		catch( e ){
			self.#promises.forEach( x=>x[1](e) );
		}
		this.#promises.length=0;
	}

	subscribe():Observable<string>{
		return this.subscription.asObservable();
	}

	get loggedIn(){return this.#loggedIn;} #loggedIn=false;
//	get sessionId():string{ return localStorage.getItem("sessionId"); }
//	set sessionId(x:string){
//		localStorage.setItem("sessionId",x);
//		this.#subscription.next(x);
//	}
	idToken:string;
	protected subscription:Subject<string> = new Subject<string>();
	#promises:[()=>void,(x:any)=>void][]=[];
	#googleAuthClientId:string;

  isLoggedIn = computed(() => !!this.user());
	router = inject(Router);
	#userSignal = signal<LoggedInUser | null>(null);
  user = this.#userSignal.asReadonly();
}
*/