import { ProtoUtilities } from '../../utilities/protoUtilities';
import {ApplicationStrings} from './Application';

import * as AppFromServer from '../../proto/App.FromServer'; import FromServer = AppFromServer.Jde.App.Proto.FromServer;
import * as CommonProto from '../../proto/Common'; import ELogLevel = CommonProto.Jde.Proto.ELogLevel;


export class TraceEntry
{
	constructor( trace:FromServer.ITrace, private applicationStrings:ApplicationStrings )
	{
		this.id = ProtoUtilities.toNumber( trace.id );
		this.instanceId = ProtoUtilities.toNumber( trace.instanceId );
		this.time = new Date( ProtoUtilities.toDate(trace.time) );
		this.level = trace.level;
		this.messageId = trace.messageId;
		this.fileId = trace.fileId;
		this.functionId = trace.functionId;
		this.lineNumber = trace.line;
		this.userId = trace.userPk;
		this.threadId = ProtoUtilities.toNumber(trace.threadId);
		for( let variable of trace.args )
			this.variables.push( variable );
	}
	time:Date;

	get message():string
	{
		if( this._message )
			return this._message;
		var template = this.applicationStrings.messages.get( this.messageId );
		if( !template )
			return null;

		let i; let j=0;
		while( (i=template.indexOf("{}"))!=-1 && j<this.variables.length )
		{
			const temp = template.substring(0, i)+this.variables[j++] + ((i<template.length-2) ? template.substring(i+2) : "");
			template = temp;
		}
		return this._message = template;
	}; _message:string=null;
	get fileName():string{ const i=this.file ? this.file.lastIndexOf('/') : -1; return i==-1 ? this.file : this.file.substr(i+1); };
	get file():string{ return this._file ? this._file: this._file = this.applicationStrings.files.get( this.fileId ); }; _file:string;
	get functionName():string
	{
		return this._function ? this._function: this._function = this.applicationStrings.functions.get( this.functionId );
	}; _function:string;

	id:number;
	instanceId:number;
	level:ELogLevel;
	messageId:number;
	fileId:number;
	functionId:number;
	lineNumber:number;
	userId:number;
	threadId:number;
	variables:string[] = [];
	index:number;
	hidden:boolean;
}