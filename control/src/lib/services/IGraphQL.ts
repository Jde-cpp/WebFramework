import { MetaObject } from "../utilities/JsonUtils";


export interface IGraphQL
{
	query( ql: string ):Promise<any>;
	schema( names:string[] ):Promise<Table[]>;
	mutations():Promise<Mutation[]>;
}

//https://graphql.org/learn/introspection/
export enum FieldKind
{
	SCALAR=0,
	OBJECT=1,
	INTERFACE=2,
	UNION=3,
	ENUM=4,
	INPUT_OBJECT=5,
	LIST=6,
	NON_NULL=7
}
export class QLSchema
{
	constructor( j )
	{
		this.name = j.name;
	}
	name:string;
}
export class OfType extends QLSchema
{
	constructor( j )
	{
		super( j );
		this.kind = j.kind;
		//this.kind = FieldKind.UNION;
	}
	kind:FieldKind;
}
export class FieldType extends OfType
{
	constructor( j )
	{
		super( j )
		this.ofType = j.ofType;
	}
	get underlyingKind():FieldKind{ return this.ofType?.kind ?? this.kind; }
	get underlyingName():string{ return this.ofType?.name ?? this.name; }
	get underlyingVariableName():string{ return this.underlyingName.charAt(0).toLowerCase()+this.underlyingName.slice(1) ; }
	ofType:OfType;
}
export class Field extends QLSchema
{
	constructor( j )
	{
		super( j )
		this.type = j.type ? new FieldType( j.type ) : undefined;
	}
	get displayed():boolean{ return this.type.ofType?.name!="ID" && this.name!="attributes" && this.type.kind!=FieldKind.LIST; }
	type:FieldType;
}
export class Table extends MetaObject
{
	constructor( j )
	{
		super( j.name );
		//this.name = ty;
		j.fields.forEach( (x)=>this.fields.push( new Field(x) ) );
	}
	get columns():string
	{
		var result = '';
		for( const column of this.nonListFields )
			result += column.type.underlyingKind==FieldKind.OBJECT ? `${column.type.underlyingVariableName}{ id name } ` : `${column.name} `;

		return result;
	}
	fields = new Array<Field>();
	//name:string;
	get nonListFields():Array<Field>{ return this.fields.filter((x)=>x.type.kind!=FieldKind.LIST); }
	get listFields():Array<Field>{ return this.fields.filter((x)=>x.type.kind==FieldKind.LIST); }
	//get jsonName(){ return this.name[0].toLowerCase() + this.name.substring(1); }
	//get plural(){ return this.jsonName+'s'; }
	get display(){ return this.subType?.collectionDisplay ?? this.typeName+'s'; }
	subType:MetaObject;
}

export class Arg
{
	name:string;
	defaultValue:string;
	type:OfType;
}

export class Mutation extends QLSchema
{
	args:Arg[];
}
