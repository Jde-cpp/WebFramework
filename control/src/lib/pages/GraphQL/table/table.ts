import { Observable, Subscription } from 'rxjs';
import {Component, AfterViewInit, Inject, OnDestroy, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
//import {Remove} from '@material-ui/icons';
import { MatTableDataSource } from '@angular/material/table';
import { Sort } from '@angular/material/sort';
import { IErrorService } from '../../../services/error/IErrorService';
import { Field, FieldKind, IGraphQL, Table } from '../../../services/IGraphQL';




@Component( { selector: 'graph-ql-table', styleUrls: ['table.scss'], templateUrl: 'table.html'} )
export class GraphQLTable implements OnInit, AfterViewInit, OnDestroy
{
	constructor( @Inject('IGraphQL') private graphQL: IGraphQL, @Inject('IErrorService') private cnsle: IErrorService )
	{}
	ngOnInit()
	{
		this.showDeletedSub = this.showDeletedEvents?.subscribe( (x)=>
		{
			this.showDeleted = x
		} );
	}
	ngAfterViewInit():void
	{
		this.viewPromise = Promise.resolve( true );
	}
	ngOnDestroy()
	{
		this.showDeletedSub?.unsubscribe();
	}
	static query( graphQL: IGraphQL, schema:Table, query: string, showExtra:boolean, isFlags:boolean ):{query:string, displayedColumns:Field[]}
	{
		var selectFields:string[] = [], displayedColumns=[];
		for( let field of schema.fields )
		{
			if( !showExtra && (field.type.kind==FieldKind.LIST || ["created", "updated", "deleted", "target"].includes(field.name)) )
				continue;
			if( field.type.underlyingKind==FieldKind.SCALAR )
			{
				displayedColumns.push( field );
				selectFields.push( field.name );
			}
			else if( field.type.underlyingKind==FieldKind.OBJECT )
			{
				displayedColumns.push( field );
				selectFields.push( `${field.name}{name}` );
			}
		}

		var filter = 'null';
		if( isFlags )
			filter = "{id: {ne: 0}}";
		else if( schema.fields.find((x)=>x.name=="deleted") )
			filter = "{deleted: {eq:null}}";
		return {query: `query{ ${query}(filter: ${filter}) {${selectFields.join(" ")}} }`, displayedColumns: displayedColumns };
	}
	checkboxLabel( row?: any ): string
	{
		return row
			? `${this.selections.isSelected(row) ? 'deselect' : 'select'} row ${row.name}`
			: `${this.isAllSelected() ? 'select' : 'deselect'} all`;
	}
	masterToggle()
	{
		if( this.isAllSelected() )
			this.selections.deselect( ...this.dataSource.data );
		else
			this.selections.select( ...this.dataSource.data );
	}

	cellClick( row:any ){  this.selection = this.selection == row ? null : row; this.selectionChange.emit( this.selection ); }

	edit2( row?: any ): string
	{
		return row
			? `${this.selections.isSelected(row) ? 'deselect' : 'select'} row ${row.name}`
			: `${this.isAllSelected() ? 'select' : 'deselect'} all`;
	}

	delete( row?: any ): string
	{
		return row
			? `${this.selections.isSelected(row) ? 'deselect' : 'select'} row ${row.name}`
			: `${this.isAllSelected() ? 'select' : 'deselect'} all`;
	}

	isAllSelected(){ return this.selections.selected.length==this.dataSource.data.length; }
	sortData( event )
	{}
	edit( column, element )
	{}

	@Input() dataSource:MatTableDataSource<any>;
	@Input() selections:SelectionModel<any>;
	@Input() displayedColumns:Field[]//{ return this.schema.fields.filter( (x)=>x.displayed ); }
	@Input() set showDeleted(x)
	{
		this.#showDeleted=x;
		let field = this.displayedColumns.find( (c)=>c.name=="deleted" );
		if( field )
			field.displayed = x;
	} get showDeleted(){return this.#showDeleted;} #showDeleted:boolean;
	@Input() showDeletedEvents:Observable<boolean>; private showDeletedSub: Subscription;
	@Input() sort:Sort = { active:"name", direction: 'asc' };
	@Input() selection:any;
	@Output() selectionChange = new EventEmitter();


	get displayedColumnNames(){ return (this.selections ? ["select"/*,"icons"*/] : [/*"icons"*/]).concat( this.displayedColumns.filter((x)=>x.displayed).map((x)=>x.name) ); };
	get stringColumnNames(){ return this.displayedColumns.filter( (x)=>(x.type.underlyingKind==FieldKind.SCALAR && x.type.underlyingName=="String") || x.type.underlyingKind==FieldKind.ENUM ).map( (x)=>x.name ); }
	get objectColumnNames(){ return this.displayedColumns.filter( (x)=>x.type.underlyingKind==FieldKind.OBJECT ).map( (x)=>x.name ); }
	get listColumnNames(){ return this.displayedColumns.filter( (x)=>x.type.underlyingKind==FieldKind.LIST ).map( (x)=>x.name ); }
	get dateColumnNames(){ return this.displayedColumns.filter( (x)=>x.type.underlyingName=="DateTime" ).map( (x)=>x.name ); }


	viewPromise:Promise<boolean>;
}