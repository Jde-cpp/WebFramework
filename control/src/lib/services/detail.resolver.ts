import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Inject, Injectable } from '@angular/core';
import { IErrorService, IGraphQL, IProfile, MetaObject, Settings, TableSchema, UserSettings } from 'jde-framework';

export type DetailPageSettings = {
	excludedColumns:string[];
	profile:Settings<UserSettings>;
};

export type DetailResolverData<T>={
	row:any;
	pageSettings: DetailPageSettings;
	schema: TableSchema;
};

@Injectable()
export class DetailResolver<T> implements Resolve<DetailResolverData<T>> {
	constructor( private route: ActivatedRoute, private router:Router,
		@Inject('IProfile') private profileService: IProfile,
		@Inject('IErrorService') private snackbar: IErrorService,
		@Inject('IGraphQL') private ql: IGraphQL
	){}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Promise<DetailResolverData<T>>{
		let collectionDisplay = route.url[route.url.length-2].path; //users
		let target = route.paramMap.get( "target" );
		return this.loadProfile( collectionDisplay, target );
	}
	async loadProfile( collectionDisplay:string, target:string ):Promise<DetailResolverData<T>>{
		const profile = new Settings<UserSettings>( UserSettings, `${collectionDisplay}-detail`, this.profileService );
		await profile.loadedPromise;
		try{
			return DetailResolver.load<T>( this.ql, this.ql.toCollectionName(collectionDisplay), target, profile );
		}
		catch( e ){
			this.snackbar.error( `Target not found:  '${target}'` );
			this.router.navigate( ['..'], { relativeTo: this.route } );
			return null;
		}
	}

	static async load<T>( ql:IGraphQL, collectionName:string, target:string, profile:Settings<UserSettings> ):Promise<DetailResolverData<T>>{
		const schema = await ql.schemaWithEnums( MetaObject.toTypeFromCollection(collectionName) );
		let obj = {};
		if( target!="$new" ){
			obj = await ql.querySingle( ql.targetQuery(schema, target, profile.value.showDeleted) );
			for( let query of ql.subQueries(schema.type, obj["id"]) ){
				const subRows = await ql.query<any>( query );
				//"acl":[{"role":{"id":33,"name":"Opc Gateway Permissions","deleted":null},"identity":{"id":1}}]}
				let [property, propValue] = Object.entries(subRows)[0];
				if( !obj[property] )
					obj[property] = [...<[]>propValue];
				else
					obj[property] = obj[property].concat( propValue );
			}
		}
		return {
			pageSettings: {profile:profile,excludedColumns:ql.excludedColumns(schema.collectionName)},
			row: obj,
			schema: schema
		};
	}
}