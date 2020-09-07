import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DateUtilities, Day } from 'src/app/utilities/dateUtilities';
import { IAssignable } from 'src/app/utilities/settings';
import { CircularBuffer } from 'src/app/utilities/collections'


@Component( {selector: 'link-select',templateUrl: 'link-select.html'} )
export class LinkSelectComponent<TOptionKey> implements OnInit
{
	ngOnInit()
	{
		//console.log( `LinkSelectComponent::ngOnInit() ${this.options.selected}` );
	}
	valueChange( selectedId )
	{
		this.selected = selectedId;
		this.selectChange.emit( selectedId );
		this.links.unshift( selectedId );
	}

	@Input() set placeholder( value ){ this._placeholder = value;} get placeholder(){return this._placeholder} private _placeholder:string="Date range";
	//@Input() options:Map<TOptionKey,string>;
	//@Input() set selected(x){if(this._selected!=x){ this._selected=x; this.selectChange.emit(x); } } get selected(){return this._selected;} _selected:TOptionKey; @Output() selectChange = new EventEmitter<TOptionKey>();
	//@Input() set links(x){if(this._links!=x){ this._links=x; this.linkChange.emit(x); } } get links(){return this._links;} _links:TOptionKey[]; @Output() linkChange = new EventEmitter<TOptionKey[]>();
	get links(){ return this.options.links; }
	get selected(){ return this.options.selected; } set selected(x){ if( this.options.selected!=x ) this.options.selected=x; } @Output() selectChange = new EventEmitter<TOptionKey>();
	@Input() options:LinkSelectOptions<TOptionKey>;
	get linkValues():Map<TOptionKey,string>{ var y=new Map<TOptionKey,string>(); this.links?.forEach(x => {if(x!=this.selected && this.options.values.has(x))y.set(x,this.options.values.get(x));}); return y;}
	//chip press, selection change.
}
export class LinkSelectOptions<TOptionKey> implements IAssignable<LinkSelectOptions<TOptionKey>>
{
	constructor( private readonly _values:Map<TOptionKey,string>, linkCount=3, public isValid:(TOptionKey,string)=>boolean=undefined )
	{
		this.links = new CircularBuffer<TOptionKey>( linkCount );
		this.fillLinks();
		this.selected = _values.keys().next().value;
	}
	assign( other:LinkSelectOptions<TOptionKey> )
	{
		this.selected = other.selected;
		this.links.assign( other.links );
		this.fillLinks();
	}
	fillLinks()
	{
		for( let [key,value] of this.values )
		//let iter = this.values.keys(), ret=iter.next(); !ret.done && this.links.length<this.links.maxLength; ret=iter.next() )
		{
			if( this.links.length>=this.links.maxLength )
			    break;
			//const key = ret.value;
			if( this.links.indexOf(key)==-1 && this.selected!=key && (!this.isValid || this.isValid(key,value)) )
				this.links.push( key );
		}
	}
	get values():Map<TOptionKey,string>
	{
		if( !this.isValid )
			return this._values;
		var values=new Map<TOptionKey,string>();
		this._values.forEach( (value,key)=>{ if(this.isValid(key,value)) values.set(key,value);} );
		return values;
	}
	selected:TOptionKey;
	links:CircularBuffer<TOptionKey>;
}