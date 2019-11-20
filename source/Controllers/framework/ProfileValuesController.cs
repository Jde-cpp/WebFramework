using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;

namespace Jde.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ProfileValuesController : Controller
	{
		public ProfileValuesController( IConfiguration Configuration, IMemoryCache cache, DB.DataSource dataSource )
      {
         _configuration = Configuration;
			_cache = cache;
			_dataSource = dataSource;
      }

		[HttpGet]
		public ActionResult<Dictionary<int,string>> Get()
		{
			//var parameters = new List<DbParameter>{ _dataSource.Param("@name", id), _dataSource.Param("@userId", 0) };
			var values = new Dictionary<uint,string>();
			//values.Add( 0, "foo" );
			using( var reader = _dataSource.ExecuteReader("select id, name from set_profiles") )
			{
				while( reader.Read() )
					values.Add( Convert.ToUInt32(reader["id"]), reader["name"] as string );
			}
			return Ok(values);
		}

		[HttpGet("{id}")]
		public ActionResult<string> Get( uint id )
		{
			var p = new List<DbParameter>{ _dataSource.Param("@id", id) };//, _dataSource.Param("@userId", (uint?)null) };
			string value=string.Empty;
			using( var reader = _dataSource.ExecuteReader($"select value from set_profile_values where profile_id=@id and user_id is null", p) )
			{
				if( reader.Read() )
					value = reader["value"] as string;
			}
			return value;
		}

		[HttpPut("{name}")]
		public IActionResult PutSetting( string name, [FromBody]object settings )
		{
			var parameters = new List<DbParameter>{ _dataSource.Param("@value", settings.ToString()), _dataSource.Param("@name", name) };//, _dataSource.Param("@userId", (uint?)null) };
			var result = _dataSource.Execute("update set_profile_values set value=@value where profile_id=(select id from set_profiles where name=@name) and user_id is null", parameters);
			if( result==0 )
				result = _dataSource.Execute( "insert into set_profile_values select id, null, @value from set_profiles where name=@name ", parameters );

			return Ok(result);
		}

		IConfiguration _configuration;
		//List<Models.SettingBase> _settings;
		IMemoryCache _cache;
		DB.DataSource _dataSource;
	}
}
