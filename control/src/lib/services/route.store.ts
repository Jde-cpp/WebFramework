import { HostListener, Injectable } from "@angular/core";
import { UrlSegment } from "@angular/router";
import { DocItem } from "jde-material";
import { load } from "protobufjs";

@Injectable({ providedIn: 'root' })
export class RouteStore{
	getSiblings( url:string ):DocItem[]{
		return this.#siblings.get( url ) ?? this.loadSiblings( url );
	}

	setSiblings( url:string, siblings:DocItem[] ){
		this.#siblings.set( url, siblings.map(s=>{return {title:s.title, path:s.path}}) );
		localStorage.setItem( url, JSON.stringify(this.#siblings.get(url)) );
	}

	private loadSiblings( key:string ):DocItem[]{
		let storage = localStorage.getItem( key );
		let siblings:DocItem[] = [];
		if( storage ){
			siblings = JSON.parse(storage);
			this.#siblings.set( key, siblings );
			//localStorage.removeItem( key );
		}
		return siblings;
	}

	/*TODO move to somewhere that works.
	@HostListener( 'window:beforeunload', ['$event'] )
  beforeUnloadHandler(event: BeforeUnloadEvent) {
		debugger;
    for (const key of this.#siblings.keys()) {
			localStorage.setItem( key, JSON.stringify(this.#siblings.get(key)) );
		}
  }
*/
	#siblings:Map<string,DocItem[]> = new Map<string,DocItem[]>();
}