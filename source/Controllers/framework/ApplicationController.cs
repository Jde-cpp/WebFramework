using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Diagnostics;
using System.Linq;
using Microsoft.AspNetCore.Mvc;

namespace Jde.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ApplicationController : Controller
	{
		public ApplicationController( DB.DataSource dataSource )
      {
			_dataSource = dataSource;
      }
		public enum EOperation
		{
			Start=0
		}
		[HttpPost("{name}")]
		public ActionResult<bool> Post( string name, [FromBody]EOperation operation )
		{
			var parameters = new List<DbParameter>{ _dataSource.Param("@name", name) };
			string location = null;
			using( var reader = _dataSource.ExecuteReader("select location from logs.log_applications where name=@name", parameters) )
			{
				if( reader.Read() )
					location = reader["location"] as string;
			}
			if( string.IsNullOrEmpty(location) )
				throw new Exception( $"Could not find location for application '{name}'." );
			
			//var p = new Process(){  };
			//p.Start();
			var startInfo = new ProcessStartInfo(location){CreateNoWindow=true};
			using( var process = System.Diagnostics.Process.Start(startInfo) )
			{
				process.StartInfo.UseShellExecute = false; //true=No application is registered as handling this file
				process.StartInfo.WorkingDirectory = System.IO.Path.GetDirectoryName( location );
				//process.StartInfo.FileName = System.IO.Path.GetFileName( location ); No such file or directory.
				//process.StartInfo.FileName = "."+location;=No such file or directory.
				process.StartInfo.FileName = location;//No such file or directory.
				process.StartInfo.CreateNoWindow = true;
				var result = process.Start();
			}
			
			// if( process==null )
			// 	throw new Exception( $"Could not start '{location}'." );
			return Ok( true );
		}

		[HttpGet]
		public ActionResult<Dictionary<int,string>> Get()
		{
			var values = new Dictionary<uint,string>();
			using( var reader = _dataSource.ExecuteReader("select id, name from logs.log_applications where location is not null") )
			{
				while( reader.Read() )
					values.Add( Convert.ToUInt32(reader["id"]), reader["name"] as string );
			}
			return Ok(values);
		}

		DB.DataSource _dataSource;
	}
}
