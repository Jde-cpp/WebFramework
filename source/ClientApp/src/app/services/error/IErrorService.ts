
export interface IErrorService
{
	//error( error: string ):void;
	error( message:string, error: any ):void;
	assert( condition:boolean ):void;
	warn( message: string ):void;
	//log( message: string ):void;
}
