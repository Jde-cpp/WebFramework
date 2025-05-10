
export abstract class IErrorService
{
	abstract show( e:any ):void;
	abstract error( message:string, error?: any, log?:(string)=>void ):void;
	abstract exception( e ):void;
	abstract assert( condition:boolean ):void;
	abstract warn( message: string ):void;
	abstract info( message:string):void;
}