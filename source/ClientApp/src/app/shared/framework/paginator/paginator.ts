import {Component,EventEmitter,OnInit,Input,Output, OnDestroy, ChangeDetectorRef} from '@angular/core';
import { Observable, Subscription } from 'rxjs';

export class PageEvent
{
	constructor(){this.startIndex=0; this.pageLength=50;}
	//length: number;
	//pageIndex: number;
	startIndex:number;
	pageLength: number;
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
		this.startIndexChangeSubscription = this.startIndexChange.subscribe( (value)=>this.startIndex = value );

	}
	ngOnDestroy()
	{
		this.lengthChangeSubscription.unsubscribe();
		this.startIndexChangeSubscription.unsubscribe();
	}
	onSelectionChange(  )
	{}

	firstPage(){ this.startIndex = 0; }
	prevPage(){ this.startIndex = this.startIndex-this.pageLength; }
	prevItem(){ --this.startIndex; }
	nextItem(){ ++this.startIndex; }
	nextPage(){ this.startIndex = this.startIndex+this.pageLength; }
	lastPage(){ this.startIndex = this.length-this.length%this.pageLength; }

	//@Input() color: ThemePalette;
	//get disabled(){ return this._disabled; }
	//set disabled(value){this._disabled=value;} _disabled: boolean=false;
	@Input() hidepageLength: boolean;
	@Input() lengthChange:Observable<number>;	private lengthChangeSubscription: Subscription;
	@Input() startIndexChange:Observable<number>; private startIndexChangeSubscription: Subscription;
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
	lengthTimeout;
	@Input() set pageIndex( value ){ this.startIndex = value*this.pageLength; } get pageIndex(){return this.startIndex/this.length; }
	@Input() set pageLength(value)
	{
		if( value!=this.pageLength )
		{
			this._pageLength=value;
			this.startIndex=this.startIndex;
			if( this.page )
			{
				if( this.lengthTimeout )
					clearTimeout( this.lengthTimeout );
				this.lengthTimeout = setTimeout( ()=>{ this.lengthTimeout = undefined; this.page.next( {startIndex:this.startIndex, pageLength:this.pageLength} ); }, 1000 );
			}
		} } get pageLength(){return this._pageLength;} _pageLength:number=50;
	@Input() showFirstLastButtons: boolean=true;
	@Output() page = new EventEmitter<PageEvent>();
	//initialized: Observable<void>;
	settingsIndex:number;
	@Input()	set startIndex(value)
	{
		if( value>this.length-1 )
		{
			if( this.length==0 )
				this.settingsIndex = value;
			value = this.length-this.pageLength-1;
		}
		if( value<0 )
			value = 0;
		if( value!=this.startIndex )
		{
			this._startIndex = value;
			if( this.page )
				this.page.next( {startIndex:this.startIndex, pageLength:this.pageLength} );
		}
		//console.log( `startIndex=${this.startIndex}` );
	}
	get startIndex(){return this._startIndex}; _startIndex:number=0;
	get startIndexDisplay(){ return Math.max(0,Math.min(this.startIndex,this.length-1)); }
	get endIndex()
	{
		const endIndex = Math.max( Math.min(this.startIndex+this.pageLength, this.length-1), 0 );
		//console.log( `length=${this.length} pageLength=${this.pageLength} startIndex=${this.startIndex}, endIndex=${endIndex}` );
		return endIndex;
	}
	get onFirstPage(){ return this.startIndex==0; }
	get onLastPage(){ return this.endIndex==this.length-1; }
}

