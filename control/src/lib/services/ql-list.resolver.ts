import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {inject, Inject, Injectable} from '@angular/core';
import {IErrorService, IProfile, Settings, TableSchema, IGraphQL, PageSettings, StringUtils, Field, MetaObject } from 'jde-framework';
import { Sort } from '@angular/material/sort';
import { DocItem } from 'jde-material';
import { RouteStore } from './route.store';

type CollectionItem = string | { path:string, title?:string, data?:{summary:string, collectionName:string, canPurge:boolean,showAdd:boolean} };
export class ListRoute extends DocItem{
	constructor( collection:string|CollectionItem ){
		super();
		if( typeof collection=='string' )
			collection = {path:collection, title:StringUtils.capitalize(collection)};
		this.path = collection.path;
		this.collectionName = collection.data?.collectionName ?? this.path;
		//this.excludedColumns = collection.data ? collection.data["excludedColumns"] : undefined;
		this.canPurge = collection.data?.canPurge ?? true;
		this.showAdd = collection.data?.showAdd ?? true;
		this.summary = collection?.data?.summary;
		this.title = collection.title ?? StringUtils.capitalize( this.path );
	}
	static find( target:string, collections:CollectionItem[] ):ListRoute{
		let collection:CollectionItem = collections.find( c=>((typeof c =="string") && c==target) || c["path"]==target );
		return new ListRoute( collection );
	}

	canPurge?: boolean; //if true, the user can purge deleted items.
	collectionName: string;
	showAdd?: boolean; //if true, the user can add new items.
}

export type QLListData = {
	profile:Settings<UserSettings>;
	pageSettings:PageSettings;
	schema: TableSchema;
	data: any; //{users:ITargetRow[]};
	routing:ListRoute;
};

@Injectable()
export class QLListResolver implements Resolve<QLListData> {
	constructor( private route: ActivatedRoute, private router:Router, @Inject('IGraphQL') private ql: IGraphQL, @Inject('IProfile') private profileService: IProfile, @Inject('IErrorService') private cnsl: IErrorService ){}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Promise<QLListData>{
		const collectionDisplay = route.paramMap.get( "collectionDisplay" );
		//let parent = { path: route.parent.url.map(seg=>seg.path).join("/"), title: route.parent.title ?? StringUtils.capitalize(route.parent.url[route.parent.url.length-1].path) };
		let routing:ListRoute;
		const siblings:ListRoute[] = [];
		for( let collection of route.data["collections"] ){
			const sibling = new ListRoute( collection );
			siblings.push( sibling );
			if( sibling.path==collectionDisplay )
				routing = sibling;
		}
		routing.siblings = siblings;
		//routing.parent = parent;
		return this.load( routing );
	}

	private async load( routing:ListRoute ):Promise<QLListData>{
		const profile = new Settings<UserSettings>( UserSettings, `${routing.collectionName}`, this.profileService );
		await profile.loadedPromise;
		routing.excludedColumns = this.ql.excludedColumns( routing.collectionName );
		return QLListResolver.load( this.ql, profile, new PageSettings(routing), routing, this.routeStore );
	}
	static async load( ql:IGraphQL, profile:Settings<UserSettings>, pageSettings:PageSettings, routing:ListRoute, routeStore:RouteStore ):Promise<QLListData>{
		const collectionName = routing.collectionName;
		const schema = await ql.schemaWithEnums( MetaObject.toTypeFromCollection(collectionName) );
		let columns = Field.filter( schema.fields, pageSettings.excludedColumns, profile.value.showDeleted ).map( x=>x.name );
		let query = `${collectionName}{ ${columns.join(" ")} }`;
		const data = await ql.query<any>( query );
		routeStore.setSiblings( routing.path, data[schema.collectionName].map( r=>{return {title:r.name, path:`${routing.path}/${r.target}`};}) );

		return {
			profile: profile,
			pageSettings: pageSettings,
			schema: schema,
			data: data,
			routing: routing
		};
	}
	routeStore = inject( RouteStore );
}
export class UserSettings{
	assign( value:UserSettings ){
		this.tabIndex = value.tabIndex;
		this.showDeleted = value.showDeleted;
		this.sort = value.sort;
	}
	showDeleted:boolean = false;
	sort:Sort = {active: "name", direction: "asc"};
	tabIndex:number=0;
}