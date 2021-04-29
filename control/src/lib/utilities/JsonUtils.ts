export class MetaObject
{
	constructor( public typeName:string ){}
	get collectionDisplay(){ return this.typeName+'s'; }
	get objectReferenceName(){ return this.typeName.charAt(0).toLowerCase() + this.typeName.slice(1); }
	get objectCollectionName(){ return this.objectReferenceName+"s"; }
	get idReferenceName(){ return this.objectReferenceName+"Id"; }
}