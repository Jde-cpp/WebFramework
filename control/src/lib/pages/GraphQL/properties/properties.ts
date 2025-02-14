import {Component, effect, Inject, input, output, AfterViewInit, EventEmitter, ViewChild, ViewChildren, ElementRef, OnInit, OnDestroy, QueryList, ChangeDetectorRef, computed} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormField, MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { IErrorService } from '../../../services/error/IErrorService';
import { ComponentPageTitle } from 'jde-material';
import { Field, FieldKind, IEnum, IGraphQL, IQueryResult, Table } from '../../../services/IGraphQL';
import { StringUtils } from '../../../utilities/StringUtils';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatChipGrid } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import * as JSON5 from 'json5';

@Component({
    selector: 'properties',
    templateUrl: 'properties.html',
    imports: [CommonModule, MatButtonModule, MatChipGrid, MatInputModule, MatFormFieldModule, MatLabel, MatSelectModule]
})
export class Properties implements OnInit, AfterViewInit, OnDestroy{
	constructor( private route: ActivatedRoute, private router:Router, private componentPageTitle:ComponentPageTitle, @Inject('IGraphQL') private graphQL: IGraphQL, private cdr: ChangeDetectorRef, @Inject('IErrorService') private cnsl: IErrorService ){
		effect( ()=>{
			this.componentPageTitle.detail = this.record()["name"] ?? "New";
			//console.log( `record: ${JSON.stringify(this.record())}` );
		});
	}
	async ngOnDestroy(){
		//for( const f of this.fields.filter(f=>f.type==InputTypes.Select && this.record()[f.name]) )
		//	this.record()[f.name] = f.options.find( (x)=>x.id==this.record()[f.name] ).name;
	}
	async ngOnInit(){
/*		try{
			const schema = await this.graphQL.schema( [this.type()] );
			for( const field of schema[0].fields.filter((x)=>[FieldKind.OBJECT,FieldKind.LIST].indexOf(x.type.underlyingKind)==-1 && GraphQLProperties.noShowFields.indexOf(x.name)==-1) ){
				let values:Array<IEnum>;
				if( field.type.underlyingKind==FieldKind.ENUM ){
					values = ( await this.graphQL.query<IQueryResult<IEnum>>(` __type(name: "${field.type.name}") { enumValues { id name } }`) ).__type["enumValues"];
					if( this.#record[field.name] ){
						const v = values.find( (x)=>x.name==this.#record[field.name] )?.id;
						this.clone().set( field.name, v );
						this.#record[field.name] = v;
					}
				}
				const p = new PropertyField(field, values);
				(p.type==InputTypes.Bool ? this.boolFields : this.fields).push( p );
			}
		}
		catch( e ){
			console.log( e );
		}*/
		const order = ["target", "name"];
		const sort = ( x:PropertyField,y:PropertyField )=>{
			const yIndex = order.indexOf( y.name )+1;
			const xIndex = order.indexOf( x.name )+1;
			if( xIndex || yIndex )
				return ( xIndex || order.length )-( yIndex || order.length );
			else
				return x.name.localeCompare( y.name );
		}
		this.fields().sort( sort );

		this.viewPromise = Promise.resolve( true );
		//setTimeout( ()=>{ this.viewChildren.first["nativeElement"].focus(); this.cdr.detectChanges();}, 0 );
	}

	@ViewChildren('myInput') viewChildren:QueryList<MatFormField>;

	ngAfterViewInit()
	{}

	originalOrder = ( a, b )=> {return 0;}
	onCancelClick(){
		this.router.navigate( ['..'], { relativeTo: this.route } );
	}

	mods():any{
		let input:any = this.record().id==null ? {...this.clone()} : {};
		for( var m in this.record() ){
			if( this.clone().get(m)!==undefined && this.record()[m]!=this.clone().get(m) )
				input[m] = this.clone().get(m);
		}

		for( var [key,value] of this.clone() ){//previously no description, now description.
			if( this.record()[key]===undefined )
				input[key] = this.clone().get(key);
		}
		for( var field of this.boolFields()){
			if( this.clone().get(field.name)===undefined )
				input[field.name] = false;
		}
		return input;
	}

	get enableSubmit():boolean{
		let enable = !this.saving
			&& this.fields().find( (x)=>!x.nullable && x.type!=InputTypes.Select && (!this.clone().get(x.name) || this.clone().get(x.name).length==0) )==null; //non-null is null
		if( enable && this.record().id!=null )
			enable = Object.keys( this.mods() ).length>0;
		return enable;
	}

	async onSubmitClick(){
		const update = this.record().id!=null;
		let output = update ? "" : "{id}";
		let cmd = update ? "update" : "create";
		const input = this.mods();
		if( Object.keys(input).length ){
			if( update )
				input["id"] = this.record().id;
			let inputString = JSON.stringify( input );
			var ql = `${cmd}${this.type()}( ${inputString.substring(1,inputString.length-1)} )${output}`;
			try{
				await this.graphQL.mutation( ql );
				this.router.navigate( ['..'], { relativeTo: this.route } );
				// if( update && this.record().target==this.clone()["target"] )
				// {
				// 	for( let m in input )
				// 		this.record()[m] = input[m];
				// 	this.save.emit( this.record() );
				// }
				// else
				// 	this.router.navigate([`../${input.target ?? this.record().target}`], { relativeTo: this.route });
			}
			catch( e ){
				this.cnsl.error( "Saving properties failed", e );
				console.log( e.toString() );
			}
			this.saving=false;
		}
	}
	get InputTypes(){ return InputTypes; }
	schema = input.required<Table>();
	enums = input.required<Map<string, IEnum[]>>();
	fields = computed<PropertyField[]>( ()=>{
		let y = [];
		for( const field of this.schema()[0].fields.filter(
			(x)=>[FieldKind.OBJECT,FieldKind.LIST].indexOf(x.type.underlyingKind)==-1 && Properties.noShowFields.indexOf(x.name)==-1) ){
			let values:Array<IEnum>;
			//if( field.type.underlyingKind==FieldKind.ENUM ){
			//	values = this.enums().get(field.type.name);
			//	if( this.record()[field.name] ){
			//		const v = values.find( (x)=>x.name==this.record()[field.name] )?.id;
			//		this.clone().set( field.name, v );
			//		this.record()[field.name] = v;
			//	}
			//}
			y.push( new PropertyField(field, values) );
			//(p.type==InputTypes.Bool ? this.boolFields : this.fields).push( p );
		}
		//const fields = this.schema().find( (x)=>x.name==this.type() ).fields.filter( (x)=>x.name!="id" && x.name!="created" && x.name!="updated" && x.name!="deleted" );
		//return fields.map( (x)=>new PropertyField(x) );
		return y;
	});
	boolFields = computed<PropertyField[]>( ()=>{
		return this.fields().filter( (x)=>x.type==InputTypes.Bool );
	});
	saving=false;
	static noShowFields = ["id", "created", "attributes", "updated", "deleted"];

	record = input.required<any>();
	clone = computed<any>( ()=>{
		let clone = new Map<string,any>();//good but tabs don't work.
		let record = this.record() ?? {};
		//let add = ( m )=>this.clone().set( m, this.#record[m] ?? '' );
		for( let m in record ){
			if( record[m]!==undefined && Properties.noShowFields.indexOf(m)==-1 )
				clone.set( m, record[m] );
		}
		return clone;
	});
	save = output<any>();
	type = input.required<string>();
	viewPromise:Promise<boolean>;
}
enum InputTypes{
	Select=-1,
	None=0,
	Text=1,
	Bool=2
}
class PropertyField{
	constructor( private field:Field, public options?:Array<IEnum> )
	{}
	get name(){ return this.field.name; }
	get displayName(){ return this.field.name=="target" ? "Id" : StringUtils.idToDisplay( this.field.name ); }
	get nullable(){ return this.field.type.kind!=FieldKind.NON_NULL; }
	get type():InputTypes{
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