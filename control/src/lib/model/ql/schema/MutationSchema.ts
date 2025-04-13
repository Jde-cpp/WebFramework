import { OfType } from "jde-framework";
import { QLSchema } from "./Schema";

export class Arg{
	name:string;
	defaultValue:string;
	type:OfType;
}

export class MutationSchema extends QLSchema{
	args:Arg[];
}
