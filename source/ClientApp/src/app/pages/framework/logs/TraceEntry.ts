import {ProtoUtilities} from '../../../utilities/protoUtilities'
import * as AppFromServer from '../../../proto/appFromServer';
import FromServer = AppFromServer.Jde.ApplicationServer.Web.FromServer;
import {ApplicationStrings} from './Application';

export class TraceEntry
{
	constructor( trace:FromServer.ITraceMessage, public applicationStrings:ApplicationStrings )
	{
		this.instanceId = ProtoUtilities.toNumber( trace.InstanceId );
		this.time = new Date( ProtoUtilities.toNumber(trace.Time) );
		this.level = trace.Level;
		this.messageId = trace.MessageId;
		this.fileId = trace.FileId;
		this.functionId = trace.FunctionId;
		this.lineNumber = trace.LineNumber;
		this.userId = trace.UserId;
		this.threadId = ProtoUtilities.toNumber(trace.ThreadId);
		for( let variable of trace.Variables )
			this.variables.push( variable );
	}
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
	get file():string
	{
		return this._file ? this._file: this._file = this.applicationStrings.files.get( this.fileId );
	}; _file:string;
	get functionName():string
	{
		return this._function ? this._function: this._function = this.applicationStrings.functions.get( this.functionId );
	}; _function:string;

	instanceId:number;
	time:Date;
	level:FromServer.ELogLevel;
	messageId:number;
	fileId:number;
	functionId:number;
	lineNumber:number;
	userId:number;
	threadId:number;
	variables:string[] = [];
	index:number;
}