
export class StringUtils
{
	static capitalize( value:string )//https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html
	{
		let y = value.charAt(0).toUpperCase()+value.slice(1);
	}
	static idToDisplay( id:string ){
		let y=''
		for( let i=0; i<id.length; ++i )
		{
			let ch = id[i];
			if( i>0 )
			{
				if( ch==ch.toUpperCase() )
					y+=" ";
				y+=ch;
			}
			else
				y+=ch.toUpperCase();
		}
		return y;
	}
}