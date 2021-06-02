import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DateUtilities, Day } from '../../utilities/dateUtilities';
import { IAssignable } from '../../utilities/settings';

export enum TimeFrame{None=0, Week=7, Month=30, Quarter=90, Year=360, All=1000}

@Component( {selector: 'date-range',templateUrl: 'date-range.html'} )
export class DateRangeComponent implements OnInit
{
	ngOnInit()
	{
		if( this.settings.timeFrame )
			this.setTimeFrame( this.settings.timeFrame, true );
		else
		{
			this.setEndControl( this.end );
			this.setStartControl( this.start );
		}

		this.range.controls.start.valueChanges.subscribe( value=>
		{
			const day = value==null ? null : DateUtilities.toDays( value );
			if( day!=this.start )
			{
				console.log( `_start=${day}` );
				this.timeFrame = TimeFrame.None;
				this.settings.start = day;
				this.settingsChange.emit( this.settings );
			}
		});
		this.range.controls.end.valueChanges.subscribe( value=>
		{
			const day = value==null ? null : DateUtilities.toDays( value );
			if( day!=this.end )
			{
				this.timeFrame = TimeFrame.None;
				this.settings.end = day;
				this.settingsChange.emit( this.settings );
			}
		});
	}
	static toDate( day:Day ):Date
	{
		const time=DateUtilities.fromDays(day);
		return new Date( time.getTime()+time.getTimezoneOffset()*60000 );
	}
	static fromDate( time:Date ):Day
	{
		return DateUtilities.toDays( new Date(time.getTime()-time.getTimezoneOffset()*60000) );
	}
	setStartControl(day:Day){ this.range.controls.start.setValue( day==null ? null : DateRangeComponent.toDate(day) ); }
	setEndControl(day:Day){ this.range.controls.end.setValue( day ? DateRangeComponent.toDate(day) : null ); }
	setTimeFrame( x:TimeFrame, force=false )
	{
		if( x==TimeFrame.None ){ debugger; throw('unexpected'); }
		if( x==this.timeFrame && !force )
			return;
		this.timeFrame = x;
		this.settings.dayCount = this.settings.end = undefined;
		this.setStartControl( this.start );
		this.setEndControl( this.end );

		this.settingsChange.emit( this.settings );
	}
	/*set baseDay(x:Day){this.settings.baseDay = x;}*/ get max():Day{ return this.settings.max; };
	get dayCount(){ return this.settings.dayCount; }
	get end():Day{ return !this.timeFrame && this.settings.end ? this.settings.end : null; }
	@Input() set placeholder( value ){ this._placeholder = value;} get placeholder(){return this._placeholder} private _placeholder:string="Date range";
	@Input()settings:DateRangeSettings; @Output() settingsChange = new EventEmitter<DateRangeSettings>();
	get start():Day{ return this.settings.start; }
	get timeFrame(){return this.settings.timeFrame;} set timeFrame(x){this.settings.timeFrame = x;}TimeFrameType = TimeFrame;
	range = new FormGroup( { start: new FormControl(), end: new FormControl() } );
}
export class DateRangeSettings implements IAssignable<DateRangeSettings>
{
	constructor( public timeFrame:TimeFrame=undefined, private _max:Day = DateUtilities.toDays(new Date()), private isValidDay:(_:Day)=>boolean=()=>{return true;} )
	{}
	assign(other: DateRangeSettings)
	{
		this.end = other.end;
		this.dayCount = other.dayCount;
		this.timeFrame = other.timeFrame;
	}
	toJSON = function()
	{
		return { dayCount: this.dayCount, end: this.end, timeFrame: this.timeFrame };
  	}
	get max(){ return this._max; }
	get dayCount()
	{
		let dayCount = this._dayCount ?? null;
		if( this.timeFrame==TimeFrame.Week )
			dayCount = 7;
		else if( this.timeFrame && this.timeFrame!=TimeFrame.All )
		{
			const max:Date = DateUtilities.fromDays( this.max );
			const delta = this.timeFrame==TimeFrame.Month ? 1 : this.timeFrame==TimeFrame.Quarter ? 3 : 12;
			const start = new Date( max.getUTCFullYear(), max.getUTCMonth()-delta, max.getUTCDate() );
			dayCount = this.max - DateUtilities.toDays( start );
		}
		return dayCount;
	} set dayCount(x:number|undefined){ this._dayCount = x;} _dayCount:number| undefined;
	end: Day | undefined;
	get start():Day
	{
		let day = null;
		if( this.timeFrame!=TimeFrame.All && this.dayCount!=undefined )
			for( day = (this.end ?? this.max) - this.dayCount; day<=(this.end ?? this.max) && !this.isValidDay(day); ++day );
		return day;
	} set start( x:Day ){ this.dayCount = Math.max( 0, (this.end ?? this.max)-(x ?? 0) ); }
}