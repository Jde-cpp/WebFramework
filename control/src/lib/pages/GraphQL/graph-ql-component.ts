import { Component, AfterViewInit, OnInit, OnDestroy, Inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, Params, Router, RouterModule, Routes} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {Sort} from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
//import { IProfile, IErrorService, Settings, IGraphQL, Table, FieldKind, Field} from 'jd e-framework'
import {IProfile} from '../../services/profile/IProfile'
import {IErrorService} from '../../services/error/IErrorService'
import {IGraphQL, Table, FieldKind, Field, IQueryResult}  from '../../services/IGraphQL'
import {Settings} from '../../utilities/settings'
import {PageSettings} from './model/PageSettings';

import { ComponentPageTitle } from 'jde-material';
import { map, Observable, Subject } from 'rxjs';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatToolbar } from '@angular/material/toolbar';
import { GraphQLTable } from './table/table';
import { StringUtils } from '../../utilities/StringUtils';

@Component( {
    selector: 'graph-ql-component.main-content.mat-drawer-container.my-content',
    styleUrls: ['graph-ql-component.scss'],
    templateUrl: './graph-ql-component.html',
    imports: [CommonModule, MatCheckbox, MatIcon, MatIconButton, MatToolbar, GraphQLTable]
})
export class GraphQLComponent implements AfterViewInit, OnInit, OnDestroy{
	constructor( private route: ActivatedRoute, private router:Router, private componentPageTitle:ComponentPageTitle,
		@Inject('IGraphQL') private graphQL: IGraphQL, @Inject('IProfile') private profileService: IProfile,
		@Inject('IErrorService') private cnsl: IErrorService )
	{}

	ngOnDestroy(){ this.profile.save(); }
	ngOnInit(){
		this.pageSettings$ = this.route.data.pipe( map(data => data["pageSettings"]) );
		this.pageSettings$.subscribe( (x:PageSettings)=>{ this.pageSettings = x; } );

		let paths = [];
		for( let x = this.route; x.routeConfig?.data && x.routeConfig?.data["name"]; x = x.parent )
			paths.push( x.routeConfig.data['name'] );
		this.componentPageTitle.title = paths[0];//.join( " | " ); 	//this.componentPageTitle.title ? `${this.componentPageTitle.title} | ${title}` : title;

		//if( this.route.routeConfig?.data )
		//	this.excludedColumns = this.route.routeConfig.data["excludedColumns"];
	};
	async ngAfterViewInit(){
		this.profile = new Settings<UserSettings>( UserSettings, this.type, this.profileService );
		await this.profile.loadedPromise;
		try{
			//await this.authorizationService.login();
			const data = await this.graphQL.query<IQueryResult<any>>( `__type(name: "${this.type}") { fields { name type { name kind ofType{name kind} } } }` );
			this.schema = new Table( data.__type );
			this.load();
		}
		catch( e ){
			console.log( e );
			this.cnsl.show( e );
		}
	}
	async load(){
		const order = ["name", "description","created", "updated", "deleted", "target"];
		const sort = ( x:Field,y:Field )=>{const yIndex = order.indexOf( y.name )+1; const xIndex = order.indexOf( x.name )+1; return ( xIndex || order.length )-( yIndex || order.length ); }
		this.displayedColumns = this.schema.fields.filter( (x)=>x.displayed && !this.excludedColumns?.includes(x.name) ).sort( sort );
		//let objectColumnNames = this.displayedColumns.filter( (x)=>x.type.underlyingKind==FieldKind.OBJECT ).map( (x)=>x.name );
		//let stringColumnNames = this.displayedColumns.filter( (x)=>(x.type.underlyingKind==FieldKind.SCALAR && x.type.underlyingName=="String") || x.type.underlyingKind==FieldKind.ENUM ).map( (x)=>x.name );
		let columns = this.schema.fields.filter( (x)=>x.type.kind!=FieldKind.LIST && !this.excludedColumns?.includes(x.name) ).map( (x)=>x.name ).join( " " );
		let ql = `${this.fetchName} { ${columns} }`;
		try{
			let d = await this.graphQL.query( ql );
			this.data = d[this.fetchName];
			this.viewPromise = Promise.resolve(true);
		}
		catch( e ){
			this.cnsl.show( e );
			debugger;
		}
	}
	selectionChange( $event:any ){
		this.selection = $event;
	}
	sortData( options:Sort ){
		const values = this.data.slice();
		const multiplier = options.direction === 'asc' ? 1 : -1;
		const name = options.active;
		this.data = values.sort((a, b) =>{
			let lessThan = a[name]<b[name];
			return (lessThan ? -1 : 1)*multiplier;
		});
		this._table.renderRows();
	}

	edit(){
		if( this.selection.deleted )
			this.graphQL.mutation( `restore${this.type}("id":${this.selection.id})` ).then( ()=>this.selection.deleted=null ).catch( (e)=>console.log(e) );
		else{
			let routes = this.router.routerState.snapshot.url.split('/');
			routes.push( this.selection.target );
			try{
				this.router.navigate( routes );
			}catch( e ){
				this.cnsl.error( "Could not navigate to properties", e );
			}
		}
	}

	insert(){
		this.router.navigate( ["settings", this.fetchName, '$new'] );
	}

	delete(){
		const purge = this.selection.deleted!=null;
		const type = purge ? "purge" : "delete";
		const next = purge ? ()=>this.load() : ()=>
		{
			this.selection.deleted = new Date();
			if( !this.showDeleted )
				this.selection = null;
		}

		this.graphQL.mutation(`${type}${StringUtils.capitalize(this.type)}(\"id\":${this.selection.id})`).then( next ).catch( (e)=>{  this.cnsl.error(e.message); console.error( JSON.stringify(e) ); } );
	}

	get haveSelection(){ return !!this.selection; }
	selection:any|null|undefined;

	viewPromise:Promise<boolean>;
	displayedColumns:Field[];
	@ViewChild('mainTable',{static: false}) _table:MatTable<any>;
	data;
	get excludedColumns():string[]{ return this.pageSettings.excludedColumns; }
	pageSettings$: Observable<PageSettings>;//lesson$
	pageSettings:PageSettings;
	get name():string{ return <string>this.routeConfig.title; }
	get fetchName():string{ return this.routeConfig.path; }
	profile:Settings<UserSettings>;
	get routeConfig(){ return this.route.routeConfig;}
	schema:Table;
	get settings(){ return this.profile.value; }
	get sort(){ return this.settings.sort; }
	get showAdd():boolean{ return this.routeConfig.data['showAdd'] ?? true};
	get showDeleted(){return this.settings.showDeleted;}
	showDeletedSubject = new Subject<boolean>();
	get type():string{ return this.pageSettings.type ?? StringUtils.plural(StringUtils.toJson(this.name)); }
	toggleShowDeleted(){ this.settings.showDeleted = !this.settings.showDeleted; this.showDeletedSubject.next( this.settings.showDeleted ); }
	eventsSubject: Subject<void> = new Subject<void>();

	emitEventToChild() {
	  this.eventsSubject.next();
	}
}

class UserSettings{
	assign( value:UserSettings ){ this.sort = value.sort; this.showDeleted = value.showDeleted; }
	sort:Sort = {active: "name", direction: "asc"};
	showDeleted:boolean = false;
}

function at(pageSettings$: Observable<PageSettings>) {
	throw new Error('Function not implemented.');
}
