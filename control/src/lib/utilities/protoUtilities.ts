import Long from "long";

export class ProtoUtilities
{
	static toNumber( value:number|Long ):number
	{
		return typeof(value)==='object' ? value.toNumber() : value;
	}
}