import {Component, computed, effect, Inject, inject, Resource, resource} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { EProvider, IAuth, IEnvironment, LoggedInUser } from 'jde-material';
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {IErrorService} from '../../../services/error/IErrorService';

declare const google: any;

@Component({
    selector: 'app-login-page',templateUrl: './login-page.html',styleUrl: './login-page.scss',
    imports: [MatButtonModule,MatFormFieldModule,MatInputModule,RouterLink,ReactiveFormsModule],
})
export class LoginPageComponent{
	constructor( @Inject('IAuth') private authService: IAuth, @Inject('IErrorService') private snackbar: IErrorService, @Inject('IEnvironment') private envService: IEnvironment ){
		effect( async ()=>{
			let y = this.providers?.value()?.includes( EProvider.Google );
			if( y ){
				let authId = await this.getGoogleAuthClientId();
				this.showGoogleLogin( authId );
			}
			return y;
		});

	}

  async onLogin() {
		let {username, password} = this.form.value;
		if (!username || !password) {
			this.snackbar.error("Enter an email and password.");
			return;
		}
		let domain = null;
		if( username.indexOf('\\')!=-1 ){
			const parts = username.split('\\');
			domain = parts[0];
			username = parts[1];
		}
		try{
			await this.authService.loginPassword(
				domain,
				username,
				password
			);
			this.router.navigate( [''] );
		}
		catch( e ){
			this.snackbar.exception( e );
		}
  }
	onGoogleLogin2(credential:string){
		debugger;
		this.onGoogleLogin( credential );
	}
	async onGoogleLogin(credential: string){
		let user = this.toLoginUser( credential );
		try{
			await this.authService.loginGoogle( user );
			localStorage.setItem( "googleLoginHint", user.email );
			this.router.navigate( [''] );
		}
		catch( e ){
			this.snackbar.exception( e );
		};
	}

	showGoogleLogin( authId:string ){
		let self = this;
		if( !google )
			throw "google not defined";
		try{
			google.accounts.id.initialize({
				client_id: authId,
				auto_select: true,
				button_auto_select: true,
				cancel_on_tap_outside: true,
				callback:  (response) => {self.onGoogleLogin(response.credential); },
				native_callback: (response) => {self.onGoogleLogin2(response.credential);},
				login_hint: localStorage.getItem( "googleLoginHint" )
			});
			google.accounts.id.renderButton(
				document.getElementById("google-button"),
				{ theme: "outline", size: "large" }
			);
			if( this.googleCredential && !this.user().pictureUrl )
				this.onGoogleLogin( this.googleCredential );
		}
		catch( e ){
			console.assert( !(e instanceof ReferenceError), "ReferenceError" );
			this.snackbar.error( `could not render google login`, e );
		}
	}

	async getGoogleAuthClientId():Promise<string>{
		const y = await this.authService.googleAuthClientId();
		return y;
	}
	//get googleLoginClientId(){ return "445012155442-1v8ntaa22konm0boge6hj5mfs15o9lvd.apps.googleusercontent.com";}//todo get from server or config
	hasUserPassword = computed(() => { return !this.providers.isLoading() && this.providers.value().includes( EProvider.OpcServer ); });
	providers = resource<EProvider[], {}>( {loader: async () =>await this.authService.providers()} );

	private decodeJwt(idToken: string):any{
    const base64Url = idToken.split( "." )[1];
    const base64 = base64Url.replace( /-/g, "+" ).replace( /_/g, "/" );
    const jsonPayload = decodeURIComponent(
      window.atob( base64 ).split("")
        .map( (c)=>"%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2) )
        .join("")
    );
    return JSON.parse( jsonPayload );
  }

	private toLoginUser(credential: string):LoggedInUser {
		const jwt = this.decodeJwt( credential );
		return {
			credential: credential,
			email: jwt.email,
			name: jwt.name,
			pictureUrl: jwt.picture,
			provider: EProvider.Google
		} as LoggedInUser;
	}

	fb = inject(FormBuilder);
	private get googleCredential():string{return this.envService.get("googleCredential"); }
  form = this.fb.group({ username: [''], password: [''] });
	router = inject(Router);
	user = computed<LoggedInUser | null>( () => {
		return this.authService.user();
	});
}
