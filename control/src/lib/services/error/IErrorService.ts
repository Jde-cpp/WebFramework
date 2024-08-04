
export abstract class IErrorService
{
	abstract show( e:any ):void;
	abstract error( message:string, error?: any ):void;
	abstract exception( e ):void;
	abstract assert( condition:boolean ):void;
	abstract warn( message: string ):void;
	abstract info( message:string):void;
}

export class ErrorService implements IErrorService
{
	show( e:any ):void{};
	error( message:string, error: any ):void{}
	exception( e ):void{};
	assert( condition:boolean ):void{}
	warn( message: string ):void{}
	info( message:string):void{}
}