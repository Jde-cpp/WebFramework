import * as AppFromServer from 'jde-cpp/AppFromServer'; import FromServer = AppFromServer.Jde.ApplicationServer.Web.FromServer;

export interface Instance
{
	application?:string;
	host:string;
	pid?:number;
	serverLogLevel?:FromServer.ELogLevel;
	clientLogLevel?:FromServer.ELogLevel;
	startTime?:Date;
	restPort:number;
	websocketPort?:number;
	instanceName?:string;
}
