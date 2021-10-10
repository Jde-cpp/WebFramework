import { Component, AfterViewInit, OnInit, OnDestroy, Inject, ViewChild } from '@angular/core';
import {ActivatedRoute, Params, Router, RouterModule, Routes} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {Sort} from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
//import { IProfile, IErrorService, Settings, IGraphQL, Table, FieldKind, Field} from 'jd e-framework'
import {IProfile} from '../../services/profile/IProfile'
import {IErrorService} from '../../services/error/IErrorService'
import {IGraphQL, Table, FieldKind, Field}  from '../../services/IGraphQL'
import {Settings} from '../../utilities/settings'


import { ComponentPageTitle } from 'jde-material';
import { Subject } from 'rxjs';

@Component( {selector: 'graph-ql-component.main-content.mat-drawer-container.my-content', styleUrls: ['graph-ql-component.scss'], templateUrl: './graph-ql-component.html'} )
export class GraphQLComponent implements AfterViewInit, OnInit, OnDestroy
{
	constructor( private route: ActivatedRoute, private router:Router, private dialog : MatDialog, private componentPageTitle:ComponentPageTitle, @Inject('IGraphQL') private graphQL: IGraphQL, @Inject('IProfile') private profileService: IProfile, @Inject('IErrorService') private cnsle: IErrorService )
	{}

	ngOnDestroy(){ this.profile.save(); }
	ngOnInit()
	{
		let paths = [];
		for( let x = this.route; x.routeConfig?.data?.name; x = x.parent )
			paths.push( x.routeConfig.data.name );

		this.componentPageTitle.title = paths.join( " | " ); 	//this.componentPageTitle.title ? `${this.componentPageTitle.title} | ${title}` : title;
	};
	ngAfterViewInit():void
	{
		this.profile = new Settings<PageSettings>( PageSettings, this.type, this.profileService );
		this.profile.load().then( ()=>
		{
			let ql = `{ __type(name: "${this.type}") { fields { name type { name kind ofType{name kind} } } } }`;
			this.graphQL.query( ql ).then( (data)=>
			{
				this.schema = new Table( data.__type );
				this.load();
			});
		});
	}
	load()
	{
		const order = ["name", "description","created", "updated", "deleted", "target"];
		const sort = ( x:Field,y:Field )=>order.indexOf(x.name)-order.indexOf(y.name);
		this.displayedColumns = this.schema.fields.filter( (x)=>x.displayed ).sort( sort );

		let columns = this.schema.fields.filter( (x)=>x.type.kind!=FieldKind.LIST ).map( (x)=>x.name ).join( " " );
		let ql = `query{ ${this.fetchName} { ${columns} } }`;
		this.graphQL.query( ql ).then( (data:any)=>
		{
			this.data = data[this.fetchName];
			this.viewPromise = Promise.resolve(true);
		}).catch( (e)=>console.error(e) );
	}
	selectionChanged( $event:any )
	{
		this.selection = $event;
	}
	sortData( options:Sort )
	{
		const values = this.data.slice();
		const multiplier = options.direction === 'asc' ? 1 : -1;
		const name = options.active;
		this.data = values.sort((a, b) =>
		{
			let lessThan = a[name]<b[name];
			return (lessThan ? -1 : 1)*multiplier;
		});
		debugger;
		this._table.renderRows();
	}
	edit()
	{
		if( this.selection.deleted )
			this.graphQL.query( `{ mutation { restore${this.type}("id":${this.selection.id}) } }` ).then( ()=>this.selection.deleted=null ).catch( (e)=>console.log(e) );
		else
			this.router.navigate( ["settings", this.fetchName, this.selection.target] );
	}
	insert()
	{
		this.router.navigate( ["settings", this.fetchName, '$new'] );
	}

	delete()
	{
		const purge = this.selection.deleted!=null;
		const type = purge ? "purge" : "delete";
		const next = purge ? ()=>this.load() : ()=>this.selection.deleted = new Date();

		this.graphQL.query(`{ mutation { ${type}${this.type}(\"id\":${this.selection.id}) } }`).then( next ).catch( (e)=>{ console.error(e.toString()); } );
	}

	get haveSelection(){ return !!this.selection; }
	selection:any|null|undefined;

	viewPromise:Promise<boolean>;
	displayedColumns:Field[];
	@ViewChild('mainTable',{static: false}) _table:MatTable<any>;

	data;
	get name():string{ return this.routeConfig.data.name; }
	get fetchName():string{ return this.routeConfig.path; }
	profile:Settings<PageSettings>;
	get routeConfig(){ return this.route.routeConfig;}
	schema:Table;
	get settings(){ return this.profile.value; }
	get sort(){ return this.settings.sort; }
	get showAdd():boolean{ return this.routeConfig.data.showAdd ?? true};
	get showDeleted(){return this.settings.showDeleted;}
	showDeletedSubject = new Subject<boolean>();
	get type():string{ return this.name.substr(0,this.name.length-1); }
	toggleShowDeleted(){ this.settings.showDeleted = !this.settings.showDeleted; this.showDeletedSubject.next( this.settings.showDeleted ); }
}

class PageSettings
{
	assign( value:PageSettings ){ this.sort = value.sort; this.showDeleted = value.showDeleted; }
	sort:Sort = {active: "name", direction: "asc"};
	showDeleted:boolean = false;
}
