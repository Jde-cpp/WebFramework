import {Component, Inject, Input, Output, AfterViewInit, EventEmitter, ViewChild, ViewChildren, ElementRef, OnInit, OnDestroy, QueryList, ChangeDetectorRef} from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { IErrorService } from 'jde-framework';
import { ComponentPageTitle } from 'jde-material';
import { Field, FieldKind, IEnum, IGraphQL, IQueryResult } from '../../../services/IGraphQL';
import { StringUtils } from '../../../utilities/StringUtils';

@Component( { selector: 'graph-ql-properties', templateUrl: 'properties.html'} )
export class GraphQLProperties implements OnInit, AfterViewInit, OnDestroy
{
	constructor( private route: ActivatedRoute, private router:Router, private componentPageTitle:ComponentPageTitle, @Inject('IGraphQL') private graphQL: IGraphQL, private cdr: ChangeDetectorRef, @Inject('IErrorService') private cnsl: IErrorService )
	{}
	async ngOnDestroy()
	{
		for( const f of this.fields.filter(f=>f.type==InputTypes.Select) ){
			if( this.#original[f.name] )
				this.#original[f.name] = f.options.find( (x)=>x.id==this.#original[f.name] ).name;
		}
	}
	async ngOnInit()
	{
		try
		{
			const schema = await this.graphQL.schema( [this.type] );
			for( const field of schema[0].fields.filter((x)=>[FieldKind.OBJECT,FieldKind.LIST].indexOf(x.type.underlyingKind)==-1 && GraphQLProperties.noShowFields.indexOf(x.name)==-1) )
			{
				let values:Array<IEnum>;
				if( field.type.underlyingKind==FieldKind.ENUM )
				{
					values = ( await this.graphQL.query<IQueryResult<IEnum>>(`query{ __type(name: "${field.type.name}") { enumValues { id name } } }`) ).__type["enumValues"];
					if( this.#original[field.name] )
					{
						const v = values.find( (x)=>x.name==this.#original[field.name] )?.id;
						this.clone.set( field.name, v );
						this.#original[field.name] = v;
					}
				}
				const p = new PropertyField(field, values);
				(p.type==InputTypes.Bool ? this.boolFields : this.fields).push( p );
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
		setTimeout( ()=>{ this.viewChildren.first["nativeElement"].focus(); this.cdr.detectChanges();}, 0 );
	}

	@ViewChildren('myInput') viewChildren:QueryList<MatFormField>;

	ngAfterViewInit()
	{
	}

	originalOrder = ( a, b )=> {return 0;}
	onCancelClick()
	{
		this.router.navigate( ['..'], { relativeTo: this.route } );
	}

	mods():any
	{
		let input:any = this.original.id==null ? {...this.clone} : {};
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
		return input;
	}
	get enableSubmit():boolean
	{
		let enable = !this.saving
			&& this.fields.find( (x)=>!x.nullable && x.type!=InputTypes.Select && (!this.clone.get(x.name) || this.clone.get(x.name).length==0) )==null; //non-null is null
		if( enable && this.original.id!=null )
			enable = Object.keys( this.mods() ).length>0;
		return enable;
	}
	async onSubmitClick()
	{
		const update = this.original.id!=null;
		let idString = update ? `"id":${this.original.id},` : "";
		let output = update ? "" : "{id}";
		let cmd = update ? "update" : "create";
		const input = this.mods();
		if( Object.keys(input).length )
		{
			var ql = `{ mutation { ${cmd}${this.type}( ${idString} "input": ${JSON.stringify(input)} )${output} } }`;
			try
			{
				//throw "here";
				await this.graphQL.query( ql );
				this.router.navigate( ['..'], { relativeTo: this.route } );
				// if( update && this.original.target==this.clone["target"] )
				// {
				// 	for( let m in input )
				// 		this.original[m] = input[m];
				// 	this.save.emit( this.original );
				// }
				// else
				// 	this.router.navigate([`../${input.target ?? this.original.target}`], { relativeTo: this.route });
			}
			catch( e )
			{
				this.cnsl.error( "Saving properties failed", e );
				console.log( e.toString() );
			}
			this.saving=false;
		}
	}
	get InputTypes(){ return InputTypes; }
	fields=new Array<PropertyField>();
	boolFields=new Array<PropertyField>();
	saving=false;
	@Output() save = new EventEmitter<any>();
	static noShowFields = ["id", "created", "attributes", "updated", "deleted"];
	clone = new Map<string,any>();//good but tabs don't work.
	@Input() set original(x)
	{
		this.#original = x ?? {};
		this.componentPageTitle.detail = this.#original["name"] ?? "New";
		let add = ( m )=>this.clone.set( m, this.#original[m] ?? '' );
		for( let m in x ){
			if( x[m]!==undefined && GraphQLProperties.noShowFields.indexOf(m)==-1 )
				this.clone.set( m, x[m] );
		}
	} get original(){return this.#original; } #original:any;
	@Input() type:string;
	viewPromise:Promise<boolean>;
}
enum InputTypes
{
	Select=-1,
	None=0,
	Text=1,
	Bool=2
}
class PropertyField
{
	constructor( private field:Field, public options?:Array<IEnum> )
	{}
	get name(){ return this.field.name; }
	get displayName(){ return this.field.name=="target" ? "Id" : StringUtils.idToDisplay( this.field.name ); }
	get nullable(){ return this.field.type.kind!=FieldKind.NON_NULL; }
	get type():InputTypes
	{
		let type = InputTypes.None;
		if( this.options )
			type = InputTypes.Select;
		else if( this.name=="description" )
			type = InputTypes.Text;
		else if( this.name.startsWith("is") )
			type = InputTypes.Bool;
		return type;
	}
}