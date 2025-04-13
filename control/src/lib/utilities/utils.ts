import { TargetRow } from "jde-framework";

export function arraysEqual(a, b) {
  if (a == b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;
	return a.every( (v,i)=>v==b[i] );
}

export function assert( expr:unknown, msg:string=undefined ):asserts expr{
	if( !expr )
		throw new Error( msg ?? "Assertion failed" );
}

export function getEnumName(enumObj: any, enumValue: number | string): string | undefined {
  return Object.keys(enumObj).find((key) => enumObj[key] === enumValue);
}

export function clone( obj: any ):any{
	return JSON.parse( JSON.stringify(obj) );
}

export function cloneClassArray<T>( from:Array<T>, ctor: new (item: T) => T ):T[]{
	if( from==undefined )
		return undefined;
	let clone = [];
	for( let item of from )
		clone.push( new ctor(item) );
	return clone;
}

export function toIdArray( from:number[] ):any{
	let clone = [];
	for( let id of from )
		clone.push( {id:id} );
	return clone;
}
//Temporal.Duration
export function fromIsoDuration( str:string ):number{
	if( str.length==0 )
		return 0;
	if( str[0]!='P' )
		throw `Expected 'P' as first character. ${str}`;
	let parsingTime = false;
	let seconds = 0;
	for( let i=1; i<str.length; i++ ){
		if( str[i]=='T' ){
			parsingTime = true;
			continue;
		}
		let value = 0;
		while( i<str.length && str[i]>='0' && str[i]<='9' )
			value = value*10 + (+str[i++]);
		let type = str[i++];
		let multiplier = 1;
		if( type!='S' ){
			multiplier *= 60;
			if( type!='M' ){
				multiplier *= 60;
				if( type!='H' ){
					multiplier *= 24;
					if( type=='Y' )
						multiplier *= 365.25;
					else
						throw `Unknown type '${type}' in duration. '${str}'`;
				}
			}
		}
		seconds += multiplier*value;
	}
	return seconds;
}