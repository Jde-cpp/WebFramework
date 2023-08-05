import { Injectable, isDevMode } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {IErrorService} from './IErrorService'

@Injectable()
export class DefaultErrorService implements IErrorService
{
	constructor( private snackbar:MatSnackBar )
	{}

	private showUser( message:string, panelClass:string )
	{
		this.snackbar.open( message, null, {panelClass: [panelClass], duration: 2000} );
	}
	private showUserError( message:string ){ this.showUser( message, 'red-snackbar' ); }

	assert( condition ):void
	{
		this.showUserError( "assert failed" );
		if( !condition )
			throw "assert failed";
	}

	error( message:string, error: any )
	{
		//console.error(  );
		//this.showUserError( isDevMode() && error ? `${message}:  ${error.toString()}` : message );
		this.showUserError( message );
	}
	show( e: any )
	{
		this.error( e["message"], e );
	}

	warn( message:string )
	{
		this.showUser( message, 'yellow-snackbar' );
	}

	info( message:string):void
	{
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