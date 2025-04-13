import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Inject, Injectable} from '@angular/core';
import {FieldKind, IEnum, IErrorService, IProfile, IQueryResult, Settings, TargetRow, TableSchema, IGraphQL, PageSettings, StringUtils, Field, MetaObject} from 'jde-framework';
import { Sort } from '@angular/material/sort';
import { filter } from 'rxjs';
import { DocItem } from 'jde-material';

export type QLListData = {
	profile:Settings<UserSettings>;
	pageSettings:PageSettings;
	schema: TableSchema;
	data: any[];
};
@Injectable()
export class QLListResolver implements Resolve<QLListData> {
	constructor( private route: ActivatedRoute, private router:Router, @Inject('IGraphQL') private ql: IGraphQL, @Inject('IProfile') private profileService: IProfile, @Inject('IErrorService') private cnsl: IErrorService ){}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Promise<QLListData>{
		const collectionDisplay = route.paramMap.get( "collectionDisplay" );
		let data = route.data["collections"].filter( x=> typeof x=="string" ? x==collectionDisplay : x["id"]==collectionDisplay )[0];
		let routerData:DocItem = typeof data=="string" ?  {id:data,name:StringUtils.capitalize(data)} : data;
		return this.load( routerData );
	}

	async load( pageData:DocItem ):Promise<QLListData>{
		const profile = new Settings<UserSettings>( UserSettings, `${pageData.id}-list`, this.profileService );
		await profile.loadedPromise;
		pageData.excludedColumns = this.ql.excludedColumns( pageData.id );
		return QLListResolver.load( this.ql, pageData.collectionName ?? pageData.id, profile, new PageSettings(pageData) );
	}
	static async load( ql:IGraphQL, collectionName:string, profile:Settings<UserSettings>, pageSettings:PageSettings ):Promise<QLListData>{
		const schema = await ql.schemaWithEnums( MetaObject.toTypeFromCollection(collectionName) );
		let columns = Field.filter( schema.fields, pageSettings.excludedColumns, profile.value.showDeleted ).map( x=>x.name );
		let query = `${collectionName}{ ${columns.join(" ")} }`;
		const rows = await ql.query( query );
		return {
			profile: profile,
			pageSettings: pageSettings,
			schema: schema,
			data: <any[]>rows
		};
	}
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