import { Observable } from 'rxjs';

export interface IProfile
{
	get<T>( key:string ): Observable<T>;
	put<T>( name:string, value:T ):void;
}