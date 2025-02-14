import { Component, HostBinding, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject,Observable,firstValueFrom } from 'rxjs';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import {Router, RouterModule} from '@angular/router';
import { MatButtonModule } from '@angular/material/button'
import {MatCardModule} from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { IAuth } from 'jde-material';
//import { AuthService } from '../../../services/auth.service';
import {IErrorService} from '../../../services/error/IErrorService';

@Component({selector: 'app-login-page', templateUrl: './login-page.html', styleUrls: ['./login-page.scss'],
	imports: [MatButtonModule, MatCardModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, RouterModule]
})
export class LoginPageComponent implements OnInit {
  constructor(private http: HttpClient, private router:Router, @Inject('IAuth') private authService: IAuth, @Inject('IErrorService') private cnsl: IErrorService){}

  async ngOnInit(){
    this.loginForm = new FormGroup({
      username: new FormControl( '', Validators.required ),
      password: new FormControl( '', Validators.required ),
    });
  }

  async onSubmit(){
		let userName = this.loginForm.get( 'username' )!.value;
		let domain = null;
		if( userName.indexOf('\\')!=-1 ){
			const parts = userName.split('\\');
			domain = parts[0];
			userName = parts[1];
		}

		try{
			await this.authService.loginPassword(
				domain,
				userName,
				this.loginForm!.get( 'password' )!.value
			);
			this.router.navigate( [''] );
		}
		catch( e ){
			this.cnsl.exception( e );
		}
  }
	@HostBinding('class.main-content') readonly mainContentClass = true;
	public loginForm!: FormGroup;
}