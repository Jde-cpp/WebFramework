using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
//using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;

namespace Jde.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ProfileController : Controller
	{
		public ProfileController( IConfiguration Configuration, Jde.DB.DataSource dataSource )
      {
         _configuration = Configuration;
			_dataSource = dataSource;
      }

		[HttpGet]
		public ActionResult<Dictionary<string,string>> Get()
		{
			//var parameters = new List<DbParameter>{ _dataSource.Param("@name", id), _dataSource.Param("@userId", 0) };
			var values = new Dictionary<string,string>();
			//values.Add( 0, "foo" );
			using( var reader = _dataSource.ExecuteReader("select id, name from set_profiles") )
			{
				while( reader.Read() )
					values.Add( reader["id"].ToString(), reader["name"] as string );
			}
			return Ok(values);
		}

		[HttpPost("{name}")]
		public ActionResult<uint> Post( string name )
		{
			var values = new Dictionary<uint,string>();
			var parametersSelect = new List<DbParameter>{ _dataSource.Param("@name", name) };
			uint profileId = 0;
			using( var reader = _dataSource.ExecuteReader("select id from set_profiles where name=?", parametersSelect) )
			{
				if( reader.Read() )
					profileId = Convert.ToUInt32( reader["id"] );
			}
			if( profileId==0 )
			{
				var parameters = new List<DbParameter>{ _dataSource.Param("name", name), _dataSource.Param("id", DB.DataType.UInt) };
				var result = _dataSource.StoredProc( "set_profile_insert", parameters );
				profileId = Convert.ToUInt32( parameters.Last().Value );
			}
			return Ok( profileId );
		}

		IConfiguration _configuration;
		//List<Models.SettingBase> _settings;
		//IMemoryCache _cache;
		DB.DataSource _dataSource;
	}
}
