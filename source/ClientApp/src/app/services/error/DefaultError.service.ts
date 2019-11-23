import { Injectable } from '@angular/core';
import {IErrorService} from './IErrorService'
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable()
export class DefaultErrorService implements IErrorService
{
	constructor( private snackbar:MatSnackBar )
	{}

	private showUserError( message:string )
	{
		this.snackbar.open( message, null, {panelClass: ['red-snackbar']} );
	}
	error( message:string ):void
	{
		console.error( message );
		this.showUserError( message );
	}

	observableError( message:string, error: any )
	{
		console.error( `${message} error:  ${error.toString}` );
		this.showUserError( message );
	}
	warn( message: string ):void
	{
		console.warn( message );
	}

	log( message: string ):void
	{
		console.log( message );
	}

}