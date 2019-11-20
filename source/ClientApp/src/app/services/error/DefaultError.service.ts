import { Injectable } from '@angular/core';
import {IErrorService} from './IErrorService'

@Injectable()
export class DefaultErrorService implements IErrorService
{
	error( error: any ):void
	{
		console.error( 'An error occurred', error );
	}
}