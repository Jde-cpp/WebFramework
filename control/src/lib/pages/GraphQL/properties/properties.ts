import {Component, Inject, Input, Output, AfterViewInit, EventEmitter} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Field, FieldKind, IEnum, IGraphQL, IQueryResult } from '../../../services/IGraphQL';
import { StringUtils } from '../../../utilities/StringUtils';

@Component( { selector: 'graph-ql-properties', templateUrl: 'properties.html'} )
export class GraphQLProperties implements AfterViewInit
{
	constructor( private route: ActivatedRoute, private router:Router, @Inject('IGraphQL') private graphQL: IGraphQL )
	{}
	async ngAfterViewInit()
	{
		try
		{
			const schema = await this.graphQL.schema( [this.type] );
			for( const field of schema[0].fields.filter((x)=>[FieldKind.OBJECT,FieldKind.LIST].indexOf(x.type.underlyingKind)==-1 && GraphQLProperties.noShowFields.indexOf(x.name)==-1) )
			{
				console.log( field.name );
				let values:Array<IEnum>;
				if( field.type.underlyingKind==FieldKind.ENUM )
				{
					values = ( await this.graphQL.query<IQueryResult<IEnum>>(`query{ __type(name: "${field.type.name}") { enumValues { id name } } }`) ).__type["enumValues"];
					if( this.#original[field.name] )
						this.clone.set( field.name, values.find((x)=>x.name==this.#original[field.name])?.id );
				}
				this.fields.push( new PropertyField(field, values) );
			}
		}
		catch( e )
		{
			console.log( e );
		}
		const order = ["target", "name"];
		const sort = ( x:PropertyField,y:PropertyField )=>
		{
			const yIndex = order.indexOf( y.name )+1;
			const xIndex = order.indexOf( x.name )+1;
			if( xIndex || yIndex )
				return ( xIndex || order.length )-( yIndex || order.length );
			else
				return x.name.localeCompare( y.name );
		}
		this.fields.sort( sort );

		this.viewPromise = Promise.resolve( true );
	}
	originalOrder = ( a, b )=> {return 0;}
	onCancelClick()
	{
		debugger;
	}
	enableSubmit():boolean
	{
		debugger;
		return !this.saving && this.fields.find( (x)=>x.nullable && x.type!=InputTypes.Select && this.clone.get(x.name).length==0 )==null;
	}
	onSubmitClick():void
	{
		const update = this.original.id!=null;
		let idString = update ? `"id":${this.original.id},` : "";
		let output = update ? "" : "{id}";
		let cmd = update ? "update" : "create";
		let input:any = update ? {} : {...this.clone};
		for( var m in this.original )
		{
			if( this.clone.get(m)!==undefined && this.original[m]!=this.clone.get(m) )
				input[m] = this.clone.get(m);
		}

		for( var [key,value] of this.clone )//previously no description, now description.
		{
			if( this.original[key]===undefined )
				input[key] = this.clone.get(key);
		}

		if( Object.keys(input).length )
		{
			var ql = `{ mutation { ${cmd}${this.type}( ${idString} "input": ${JSON.stringify(input)} )${output} } }`;
			this.graphQL.query( ql ).then( (x)=>
			{
				if( update && this.original.target==this.clone["target"] )
				{
					for( let m in input )
						this.original[m] = input[m];
					this.save.emit( this.original );
				}
				else
					this.router.navigate([`../${input.target ?? this.original.target}`], { relativeTo: this.route });
			}).catch( (e)=>
			{
				debugger;
				console.log( e.toString() );
			}).finally( ()=>this.saving=false );
		}
	}
	get InputTypes(){ return InputTypes; }
	fields=new Array<PropertyField>();
	saving=false;
	@Output() save = new EventEmitter<any>();
	static noShowFields = ["id", "created", "attributes", "updated", "deleted"];
	clone = new Map<string,any>();//good but tabs don't work.
	@Input() set original(x)
	{
		this.#original = x ?? {};
		let add = ( m )=>this.clone.set( m, this.#original[m] ?? '' );
		add( "name" );
		add( "target" );
		for( let m in x )
		{
			if( x[m]===undefined && GraphQLProperties.noShowFields.indexOf(m)==-1 )
			this.clone.set( m, x[m] );
		}
		add( "description" );
	} get original(){return this.#original; } #original:any;
	@Input() type:string;
	viewPromise:Promise<boolean>;
}
enum InputTypes
{
	Select=-1,
	None=0,
	Text
}
class PropertyField
{
	constructor( private field:Field, public options?:Array<IEnum> )
	{}
	get name(){ return this.field.name; }
	get displayName(){ return this.field.name=="target" ? "Id" : StringUtils.capitalize( this.field.name ); }
	get nullable(){ return this.field.type.kind!=FieldKind.NON_NULL; }
	get type():InputTypes
	{
		let type = InputTypes.None;
		if( this.options )
			type = InputTypes.Select;
		else if( this.name=="description" )
			type = InputTypes.Text;
		return type;
	}
}