
export interface IErrorService
{
	error( error: string ):void;
	observableError( message:string, error: any ):void;
	warn( message: string ):void;
	log( message: string ):void;
}
