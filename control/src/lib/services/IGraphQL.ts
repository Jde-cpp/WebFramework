import { Mutation } from '../model/ql/Mutation';
import { MutationSchema } from '../model/ql/schema/MutationSchema';
import { TableSchema } from '../model/ql/schema/TableSchema';

export type TypeName = string;

export interface IGraphQL{
	query<T>( ql: string ):Promise<T>;
	querySingle<T>( ql: string ):Promise<T>;
	schema( names:string[] ):Promise<TableSchema[]>;
	schemaWithEnums( type:string ):Promise<TableSchema>;
	mutation<T>( ql: string|Mutation|Mutation[] ):Promise<T>;
	mutations():Promise<MutationSchema[]>;

	targetQuery( schema:TableSchema, target: string, showDeleted:boolean ):string;
	subQueries( typeName: string, id: number ):string[];
	excludedColumns( tableName:string ):string[];
	toCollectionName( collectionDisplay:string ):string;
}

export interface IEnum{
	id:number;
	name:string;
}

export interface IQueryResult<T>{
	__type:Array<T>;
}