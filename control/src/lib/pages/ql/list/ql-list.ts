import { Component, OnInit, OnDestroy, Inject, ViewChild, input, signal, model, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {Sort} from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import {IProfile} from '../../../services/profile/IProfile'
import {IErrorService} from '../../../services/error/IErrorService'
import {IGraphQL, Field, IEnum, TableSchema, MetaObject}  from 'jde-framework'
import {Settings} from '../../../utilities/settings'

import { ComponentPageTitle } from 'jde-material';
import { Subject } from 'rxjs';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatToolbar } from '@angular/material/toolbar';
import { GraphQLTable } from '../../GraphQL/table/table';
import { QLListData, QLListResolver, UserSettings } from '../../../services/ql-list.resolver';
import { SelectionModel } from '@angular/cdk/collections';

@Component( {
		selector: 'ql-list',//.main-content.mat-drawer-container.my-content
		styleUrls: ['ql-list.scss'],
		templateUrl: './ql-list.html',
		host: {class:'main-content mat-drawer-container my-content'},
		imports: [CommonModule, MatCheckbox, MatIcon, MatIconButton, MatToolbar, GraphQLTable]
})
export class QLList implements OnInit, OnDestroy{
	constructor( private route: ActivatedRoute, private router:Router, private componentPageTitle:ComponentPageTitle,
		@Inject('IGraphQL') private ql: IGraphQL, @Inject('IProfile') private profileService: IProfile,
		@Inject('IErrorService') private snackbar: IErrorService ){
	}
	ngOnDestroy(){ this.profile.save(); }

  subscribe( route: ActivatedRoute, who: string ){
    route.title.subscribe( (x)=>{
      console.log( `${who}.title: ${JSON.stringify(x)}` );
    });
    route.params.subscribe( (x)=>{
      console.log( `${who}.params: ${JSON.stringify(x)}` );
    });
    route.queryParams.subscribe( (x)=>{
      console.log( `${who}.queryParams: ${JSON.stringify(x)}` );
    });
    route.fragment.subscribe( (x)=>{
      console.log( `${who}.fragment: ${JSON.stringify(x)}` );
    });
/*    route.data.subscribe( (x)=>{
      console.log( `${who}.data: ${JSON.stringify(x)}` );
    });*/
    route.paramMap.subscribe( (x)=>{
      console.log( `${who}.paramMap: ${JSON.stringify(x)}` );
    });
    route.queryParamMap.subscribe( (x)=>{
      console.log( `${who}.queryParamMap: ${JSON.stringify(x)}` );
    });
    route.url.subscribe( (x)=>{
      console.log( `${who}.url: ${JSON.stringify(x)}` );
    });
  }

	async ngOnInit(){
		this.subscribe( this.route, "QLList" );
		this.route.data.subscribe( (x)=>{
			if( this.resolvedData )
				this.resolvedData.profile.save();
			this.init( x );
    });
	}
	init( resolvedValue ){
		this.resolvedData = resolvedValue["data"];
		this.showDeleted = this.resolvedData.profile.value.showDeleted;
		let paths = [];
		for( let x = this.route; x.routeConfig?.data && x.routeConfig?.data["name"]; x = x.parent )
			paths.push( x.routeConfig.data['name'] );
		this.componentPageTitle.title = paths[0];//.join( " | " ); 	//this.componentPageTitle.title ? `${this.componentPageTitle.title} | ${title}` : title;

		const order = ["name","created", "updated", "deleted", "target", "description"];
		this.displayedFields = Field.filterSort( this.schema.fields, order, [...this.excludedColumns, "description"], this.showDeleted );
		if( !this.excludedColumns.find(x=>x=="description") )
			this.displayedFields.push( this.schema.fields.find(x=>x.name=="description") );

		this.isLoading.set( false );
	};
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
		if( this.selection().deleted )
			this.ql.mutation( `restore${this.type}("id":${this.selection().id})` ).then( ()=>this.selection().deleted=null ).catch( (e)=>console.log(e) );
		else{
			try{
				this.router.navigate([this.selection().target], {relativeTo: this.route} );
			}catch( e ){
				this.snackbar.error( "Could not navigate to properties", e );
			}
		}
	}

	insert(){
		this.router.navigate(['$new'], {relativeTo: this.route} );
	}

	async delete(){
		const purge = this.selection().deleted!=null;
		const type = purge ? "purge" : "delete";
		try{
			await this.ql.mutation(`${type}${this.type}(id:${this.selection().id})`)
			if( !purge && this.showDeleted )
				this.selection().deleted = new Date();
			else
				this.data.splice( this.data.indexOf(this.selection()), 1 );
		}
		catch( e ){
			this.snackbar.error(e["message"]);
		}
	}
	selection = computed<any>( ()=>{
		return this.selections().selected.length==1 ? this.selections().selected[0] : null;
	});

	async toggleShowDeleted(){
		this.resolvedData.profile.value.showDeleted = !this.showDeleted;
		let reload = await QLListResolver.load( this.ql, this.collectionName, this.profile, this.resolvedData.pageSettings );
		this.init( {data:reload} );
	}

	collectionDisplay = input.required<string>();

	isLoading = signal<boolean>( true );
	selections = signal<SelectionModel<any>>( new SelectionModel<any>(false, []) );

	displayedFields:Field[];
	@ViewChild('mainTable',{static: false}) _table:MatTable<any>;
	get canPurge():boolean{ return this.resolvedData.pageSettings.canPurge; }
	private get collectionName():string{ return this.schema.collectionName; }
	get data(){ return this.resolvedData.data[this.collectionName]; } set data(x){ this.resolvedData.data[this.collectionName] = x; }
	private get excludedColumns(){ return this.resolvedData.pageSettings.excludedColumns; }
	get name():string{ return <string>this.routeConfig.title; }
	get enums():Map<string, IEnum[]>{ return this.schema.enums; }
	private get profile():Settings<UserSettings>{ return this.resolvedData.profile; }
	resolvedData:QLListData;
	get routeConfig(){ return this.route.routeConfig;}
	private get schema():TableSchema{ return this.resolvedData.schema; }
	get settings(){ return this.profile.value; }
	get sort(){ return this.settings.sort; }
	showDeleted = false;
	get showAdd():boolean{ return this.routeConfig.data['showAdd'] ?? true};
	showDeletedSubject = new Subject<boolean>();
	get type(){ return MetaObject.toTypeFromCollection(this.collectionName);}
}
