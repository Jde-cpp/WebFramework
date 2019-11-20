import { Injectable } from '@angular/core';

//@Injectable( {providedIn: 'root'} )
export class DateUtilities
{
	static endOfDay( value:Date|null=null )
	{
		let copy = value ? new Date(value) : new Date(); 
		copy.setHours( 23 ); copy.setMinutes( 59 ); copy.setSeconds( 59 );
		return copy;
	}
	static beginningOfDay( value:Date|null=null )
	{
		let copy = value ? new Date( value ) : new Date(); 
		copy.setHours( 0 ); copy.setMinutes( 0 ); copy.setSeconds( 0 );
		return copy;
	}
}