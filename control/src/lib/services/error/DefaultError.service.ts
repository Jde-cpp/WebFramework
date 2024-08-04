import { Injectable, isDevMode } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {IErrorService} from './IErrorService'
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class DefaultErrorService implements IErrorService
{
	constructor( private snackbar:MatSnackBar )
	{}

	private showUser( message:string, panelClass:string ){
		this.snackbar.open( message, null, {panelClass: [panelClass], duration: 2000} );
	}
	private showUserError( message:string ){ this.showUser( message, 'red-snackbar' ); }

	assert( condition ):void{
		this.showUserError( "assert failed" );
		if( !condition )
			throw "assert failed";
	}

	error( message:string, error: any ){
		//console.error(  );
		//this.showUserError( isDevMode() && error ? `${message}:  ${error.toString()}` : message );
		this.showUserError( error && typeof error=='object' ? `${message} - ${error["message"]}` : message );
	}

	exception( e ):void{
		if( e instanceof HttpErrorResponse ){
			if( e.error instanceof ProgressEvent )
				this.error( `(${e.status})${e.message}`, null );
			else if( e.error && e.error.message )
				this.error( e.error.message, null );
			else
				this.error( `(${e.status})${e.error}`, null );
		}
	}
	show( e: any ){
		this.error( e["message"], e );
	}

	warn( message:string ){
		this.showUser( message, 'yellow-snackbar' );
	}

	info( message:string):void{
		this.showUser( message, 'white-snackbar' );
	}

/*	warn( message: string ):void
	{
		console.warn( message );
	}

	log( message: string ):void
	{
		console.log( message );
	}
*/
}