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
	private showUserError( message:string, log:(string)=>void=console.log ){
		this.showUser( message, 'red-snackbar' );
		log( message );
	}

	assert( condition ):void{
		this.showUserError( "assert failed" );
		if( !condition )
			throw "assert failed";
	}

	error( message:string, error: any, log?:(string)=>void ){
		this.showUserError( error && typeof error=='object' ? `${message} - ${error["message"]}` : message, log );
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