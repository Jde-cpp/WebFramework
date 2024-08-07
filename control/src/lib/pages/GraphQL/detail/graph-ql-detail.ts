import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Component, ViewEncapsulation, OnInit, OnDestroy, Inject } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Params, Router, RouterModule, Routes} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { ComponentPageTitle } from 'jde-material';

import {IErrorService} from '../../../services/error/IErrorService';
import {IGraphQL, Table}  from '../../../services/IGraphQL';
import {IProfile} from '../../../services/profile/IProfile';
import {Settings} from '../../../utilities/settings';
import { MetaObject } from '../../../utilities/JsonUtils';
import { HttpErrorResponse } from '@angular/common/http';



@Component( { selector: 'graph-ql-detail', templateUrl: 'graph-ql-detail.html', styleUrls: ['./graph-ql-detail.scss'], encapsulation: ViewEncapsulation.None} )
export class GraphQLDetailComponent implements OnDestroy, OnInit{
	constructor( private route: ActivatedRoute, private router:Router, private dialog : MatDialog, private componentPageTitle:ComponentPageTitle, @Inject('IGraphQL') private graphQL: IGraphQL, @Inject('IProfile') private profileService: IProfile, @Inject('IErrorService') private cnsle: IErrorService ){
		this.target = this.router.url.substring( this.router.url.lastIndexOf('/')+1 );
	}

	ngOnDestroy(){ this.profile.save(); }
	ngOnInit(){
		// @ts-ignore
		//seems to be too much going on, component stays alive and continues to trigger this.
		//this.router.events.pipe( filter(e=>e instanceof NavigationEnd) ).subscribe( this.onNavigationEnd );
	}
	async ngAfterViewInit(){
		const grandParent = this.route.parent;
		const parentUrl = this.route.routeConfig.path.substr( 0, this.route.routeConfig.path.length-4 );
		const parent = grandParent.routeConfig.children.find( (x)=>x.path==parentUrl );
		this.name = parent.data["name"];
		const display = parent.data["display"] || "name";
		this.componentPageTitle.title = parent.data["name"];
		this.profile = new Settings<PageSettings>( PageSettings, `${this.type}-detail`, this.profileService );
		await this.profile.loadedPromise;
		try{
			let schemaData = ( await this.graphQL.schema( [this.type] ) )[0];
			if(  this.route.routeConfig?.data && this.route.routeConfig.data["excludedColumns"] )
				schemaData.fields = schemaData.fields.filter( (x)=>!this.route.routeConfig?.data["excludedColumns"].includes(x.name) );
			this.schema = schemaData;
			const columns = ["name", "target"];
			if( !columns.includes(display) )
				columns.push( display );
			//TODO find out why we are querying 2x, this time only for name/target.
			const ql = `${this.schema.objectCollectionName}(deleted:null){${columns.join(" ")}}`;
			const data = await this.graphQL.query( ql );
			const results = data[this.schema.objectCollectionName];
			const siblings = new Map<string,string>();
			if( results ){
				const parent = this.route.url["value"][0].path;
				siblings.set( parent, parent.charAt(0).toUpperCase()+parent.slice(1) );
				results.forEach( x => siblings.set(x.target,x[display]) );
			}
			this.siblings.next( siblings );
			if( this.target!='$new' )
				this.load();
			else
				this.viewPromise = Promise.resolve( true );
		}
		catch( e ){
			this.cnsle.exception( e );
		}
	}
	onNavigationEnd =( val:NavigationEnd )=>{///settings
		var parts = val.url.split( '/' ); parts.shift();
		if( parts.length<3 )//users->portfolio=2
			return;
		console.log( `onNavigationEnd( ${val} )` );
		this.target = this.router.url.substring( this.router.url.lastIndexOf('/')+1 );//settings
		const grandParent = this.route.parent;
		const parentUrl = this.route.routeConfig.path.substring( 0, this.route.routeConfig.path.length-4 );//roles
		if( this.target==parentUrl || !parts.find((x)=>x.toLowerCase()==parentUrl.toLowerCase()) )//going from groups to roles.
			return;
		const parent = grandParent.routeConfig.children.find( (x)=>x.path==parentUrl );
		const paths = [this.target, parent.data["name"] ];
		for( let x = grandParent; x.routeConfig?.data && x.routeConfig?.data["name"]; x = x.parent )
			paths.push( x.routeConfig.data["name"] );
		if( paths[0].toUpperCase()==paths[2].toUpperCase() )
			return;
		this.componentPageTitle.title = paths.join( " | " );
		this.load();
	}
	load(){
		if( this.target=="settings" )
			debugger;
		const fetch = async ( columns )=>{
			const ql = `${this.fetchName}(filter:{target:{ eq:"${this.target}"}}){ ${columns} }`;
			try{
				const data = await this.graphQL.query( ql );
				if( data==null )
				{
					debugger;
					throw "data==null";
				}
				this.data = data[this.fetchName];
			}
			catch( e ){
				debugger;
				this.cnsle.error( `${this.target} not found`, e );
			}
			this.viewPromise = Promise.resolve( true );
		}
		this.tabs.length = 0;
		let columns = this.schema.columns;
		const lists = this.schema.listFields.map( (x)=>x.type.ofType.name );
		if( lists.length ){
			this.graphQL.schema( lists ).then( (tables)=>{
				for( const table of tables ){
					if( table.typeName.startsWith(this.schema.typeName) )
						table.subType = new MetaObject( table.typeName.substring(this.schema.typeName.length) );
					else if( table.typeName.endsWith(this.schema.typeName) )
						table.subType = new MetaObject( table.typeName.substring(0, table.typeName.length-this.schema.typeName.length) );
					this.tabs.push( table );
					columns = columns.concat( ` ${table.objectCollectionName}{${table.columns}}` );
				}
				if( this.target=='$new' )
					this.viewPromise = Promise.resolve(true);
				else
					fetch( columns );//query {  role(target:"user_management") { id name attributes created deleted updated description target  groups{id name attributes created deleted updated description target } rolePermissions { rightId id name api{id name} }  }  }
			});
		}
		else
			fetch( columns );
	}
	onSave( newValue:any )
	{}
	tabIndexChanged( event ){
		 this.settings.tabIndex=<number>event;
	}
	get fetchName():string{ return this.schema.objectReferenceName; }
	name:string;
	data:any;
	get settings(){ return this.profile.value;}
	profile:Settings<PageSettings>;// = new Settings<PageSettings>( PageSettings, "UserComponent", this.profileService );
	get propertiesName(){ return this.target=="$new" ? `New ${this.schema.typeName}` : "Properties"; }
	schema:Table;
	siblings: Subject<Map<string,string>> = new Subject<Map<string,string>>();
	tabs = new Array<Table>();
	target:string;
	get type():string{ return this.name.substr( 0, this.name.length-1 ); }
	viewPromise:Promise<boolean>;
}

class PageSettings{
	assign( value:PageSettings ){ this.tabIndex = value.tabIndex;  }
	tabIndex:number=0;
}