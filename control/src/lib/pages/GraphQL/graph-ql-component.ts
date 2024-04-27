import { Component, AfterViewInit, OnInit, OnDestroy, Inject, ViewChild } from '@angular/core';
import {ActivatedRoute, Params, Router, RouterModule, Routes} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {Sort} from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
//import { IProfile, IErrorService, Settings, IGraphQL, Table, FieldKind, Field} from 'jd e-framework'
import {IProfile} from '../../services/profile/IProfile'
import {IErrorService} from '../../services/error/IErrorService'
import {IGraphQL, Table, FieldKind, Field, IQueryResult}  from '../../services/IGraphQL'
import {Settings} from '../../utilities/settings'


import { ComponentPageTitle, IAuth } from 'jde-material';
import { Subject } from 'rxjs';

@Component( {selector: 'graph-ql-component.main-content.mat-drawer-container.my-content', styleUrls: ['graph-ql-component.scss'], templateUrl: './graph-ql-component.html'} )
export class GraphQLComponent implements AfterViewInit, OnInit, OnDestroy
{
	constructor( private route: ActivatedRoute, private router:Router, private dialog : MatDialog, private componentPageTitle:ComponentPageTitle, @Inject('IGraphQL') private graphQL: IGraphQL, @Inject('IProfile') private profileService: IProfile, @Inject('IErrorService') private cnsl: IErrorService, @Inject('IAuth') public authorizationService: IAuth )
	{}

	ngOnDestroy(){ this.profile.save(); }
	ngOnInit(){
		let paths = [];
		for( let x = this.route; x.routeConfig?.data && x.routeConfig?.data["name"]; x = x.parent )
			paths.push( x.routeConfig.data['name'] );

		this.componentPageTitle.title = paths[0];//.join( " | " ); 	//this.componentPageTitle.title ? `${this.componentPageTitle.title} | ${title}` : title;
	};
	async ngAfterViewInit(){
		this.profile = new Settings<PageSettings>( PageSettings, this.type, this.profileService );
		await this.profile.loadedPromise;
		try{
			//await this.authorizationService.login();
			const data = await this.graphQL.query<IQueryResult<any>>( `{ __type(name: "${this.type}") { fields { name type { name kind ofType{name kind} } } } }` );
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
		this.displayedColumns = this.schema.fields.filter( (x)=>x.displayed ).sort( sort );
		//let objectColumnNames = this.displayedColumns.filter( (x)=>x.type.underlyingKind==FieldKind.OBJECT ).map( (x)=>x.name );
		//let stringColumnNames = this.displayedColumns.filter( (x)=>(x.type.underlyingKind==FieldKind.SCALAR && x.type.underlyingName=="String") || x.type.underlyingKind==FieldKind.ENUM ).map( (x)=>x.name );
		let columns = this.schema.fields.filter( (x)=>x.type.kind!=FieldKind.LIST ).map( (x)=>x.name ).join( " " );
		let ql = `query{ ${this.fetchName} { ${columns} } }`;
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
			this.graphQL.query( `{ mutation { restore${this.type}("id":${this.selection.id}) } }` ).then( ()=>this.selection.deleted=null ).catch( (e)=>console.log(e) );
		else
			this.router.navigate( ["settings", this.fetchName, this.selection.target] );
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

		this.graphQL.query(`{ mutation { ${type}${this.type}(\"id\":${this.selection.id}) } }`).then( next ).catch( (e)=>{  this.cnsl.error(e.message); console.error( JSON.stringify(e) ); } );
	}

	get haveSelection(){ return !!this.selection; }
	selection:any|null|undefined;

	viewPromise:Promise<boolean>;
	displayedColumns:Field[];
	@ViewChild('mainTable',{static: false}) _table:MatTable<any>;

	data;
	get name():string{ return this.routeConfig.data['name']; }
	get fetchName():string{ return this.routeConfig.path; }
	profile:Settings<PageSettings>;
	get routeConfig(){ return this.route.routeConfig;}
	schema:Table;
	get settings(){ return this.profile.value; }
	get sort(){ return this.settings.sort; }
	get showAdd():boolean{ return this.routeConfig.data['showAdd'] ?? true};
	get showDeleted(){return this.settings.showDeleted;}
	showDeletedSubject = new Subject<boolean>();
	get type():string{ return this.name.substr(0,this.name.length-1); }
	toggleShowDeleted(){ this.settings.showDeleted = !this.settings.showDeleted; this.showDeletedSubject.next( this.settings.showDeleted ); }
	eventsSubject: Subject<void> = new Subject<void>();

	emitEventToChild() {
	  this.eventsSubject.next();
	}
}

class PageSettings{
	assign( value:PageSettings ){ this.sort = value.sort; this.showDeleted = value.showDeleted; }
	sort:Sort = {active: "name", direction: "asc"};
	showDeleted:boolean = false;
}