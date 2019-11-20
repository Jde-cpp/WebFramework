import { Sort,MatTable } from '@angular/material';
import { TraceEntry } from './TraceEntry';
import { Subject } from 'rxjs';
import {EventEmitter} from '@angular/core';

export class DataSource
{
	constructor( private pageSize:number=10 )
	{
	}
	connect( table:MatTable<TraceEntry> )
	{
		if( !this.observable )
		{
			this.observable = new Subject<TraceEntry[]>();
			setTimeout( ()=>{this.setPage();}, 1 );
		}
		return this.observable;
	}
	disconnect()
	{
		//console.log( "disconnect" );
		this.data.length=0;
	}
	setPage( start=-1, pageSize=0 )
	{
		if( pageSize>0 )
			this.pageSize=pageSize;
		if( start==-1 )
			start = Math.max( this.data.length-this.pageSize, 0 );
		this.page = start/this.pageSize;
		let values = new Array<TraceEntry>();
		for( let i=start; i<this.data.length; ++i )
			values.push( this.data[i] );
		if( this.observable )
			this.observable.next( values );
	}
	push( entry:TraceEntry )
	{
		this.data.push( entry );
		if( this.autoScroll )
			this.setPage();
	}
	clear()
	{
		this.data.length=0;
		this.setPage();
	}
	sort( options:Sort )
	{
		if( !options || !options.active || options.direction === '' )
			return;

		const values = this.data.slice();
		const multiplier = options.direction === 'asc' ? 1 : -1;
		this.data = values.sort((a, b) => 
		{
			let lessThan = false;
			if( options.active=='date' )
				lessThan = a.time<b.time;
			else if( options.active=='level' )
				lessThan = a.level<b.level;
			else if( options.active=='message' )
				lessThan = a.message<b.message;
			else if( options.active=='file' )
				lessThan = a.file<b.file;
			else if( options.active=='function' )
				lessThan = a.functionName<b.functionName;
			else
				console.error( `unknown sort'${options.active}'` );
			return (lessThan ? -1 : 1)*multiplier;
		});
		this.setPage();
	}
	autoScroll:boolean=true;
	get paused(){return this._paused;} set paused(value){this._paused=value;}_paused=false;
	get length():number{return this.data.length;}
	get page(){return this._page;} set page(value){this._page=value;this.onPageChange.emit(value);} _page:number; onPageChange= new EventEmitter<number>();
	observable:Subject<object>;
	data:TraceEntry[] = [];
}
