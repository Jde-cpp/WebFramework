import {Component,EventEmitter,OnInit,Input,Output, OnDestroy, ChangeDetectorRef} from '@angular/core';
import { Observable, Subscription } from 'rxjs';

export class IPageEvent
{
	constructor(){this.startIndex=0; this.pageSize=50;}
	//length: number;
	//pageIndex: number;
	startIndex:number;
	pageSize: number;
	//previousPageIndex: number;
}

@Component({ selector: 'paginator', templateUrl: './paginator.html' })
export class PaginatorComponent implements OnInit, OnDestroy
{
	constructor( private cdr: ChangeDetectorRef )
	{}
	ngOnInit()
	{
		this.lengthChangeSubscription = this.lengthChange.subscribe( (value)=>this.length = value );

	}
	ngOnDestroy()
	{
		this.lengthChangeSubscription.unsubscribe();
	}
	onSelectionChange(  )
	{}

	firstPage(){ this.startIndex = 0; }
	prevPage(){ this.startIndex = this.startIndex-this.pageSize; }
	prevItem(){ --this.startIndex; }
	nextItem(){ ++this.startIndex; }
	nextPage(){ this.startIndex = this.startIndex+this.pageSize; }
	lastPage(){ this.startIndex = this.length-this.length%this.pageSize; }

	//@Input() color: ThemePalette;
	get disabled(){ return this._disabled; }
	set disabled(value){this._disabled=value;} _disabled: boolean=false;
	@Input() hidePageSize: boolean;
	@Input() lengthChange:Observable<number>;//
	private lengthChangeSubscription: Subscription;
	set length(value)
	{
		if( !value )
			value = 0;
		if( value!=this.length )
		{
			this._length = value;
			if( value!=0 )
				this.startIndex = this.settingsIndex || this.startIndex;
			this.settingsIndex = null;
			this.cdr.detectChanges();
		}
	} get length(){return this._length;} _length: number=0; //The length of the total number of items that are being paginated.
	@Input() set pageIndex( value ){ this.startIndex = value*this.pageSize; } get pageIndex(){return this.startIndex/this.length; }
	@Input() set pageSize(value)
	{
		if( value!=this.pageSize )
		{
			this._pageSize=value;
			this.startIndex=this.startIndex;
			if( this.page )
				this.page.next( {startIndex:this.startIndex, pageSize:this.pageSize} );
		} } get pageSize(){return this._pageSize;} _pageSize:number=50;
	//@Input() pageSizeOptions: number[];
	@Input() showFirstLastButtons: boolean=true;
	@Output() page = new EventEmitter<IPageEvent>();
	//initialized: Observable<void>;
	settingsIndex:number;
	@Input()	set startIndex(value)
	{
		if( value>this.length-1 )
		{
			if( this.length==0 )
				this.settingsIndex = value;
			value = this.length-this.pageSize-1;
		}
		if( value<0 )
			value = 0;
		if( value!=this.startIndex )
		{
			this._startIndex = value;
			if( this.page )
				this.page.next( {startIndex:this.startIndex, pageSize:this.pageSize} );
		}
		//console.log( `startIndex=${this.startIndex}` );
	}
	get startIndex(){return this._startIndex}; _startIndex:number=0;
	get startIndexDisplay(){ return Math.max(0,Math.min(this.startIndex,this.length-1)); }
	get endIndex()
	{
		const endIndex = Math.max( Math.min(this.startIndex+this.pageSize, this.length-1), 0 );
		//console.log( `length=${this.length} pageSize=${this.pageSize} startIndex=${this.startIndex}, endIndex=${endIndex}` );
		return endIndex;
	}
	get onFirstPage(){ return this.startIndex==0; }
	get onLastPage(){ return this.endIndex==this.length-1; }
}

