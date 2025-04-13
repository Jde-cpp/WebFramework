import { Component } from "@angular/core";
import { ComponentCategoryList } from "jde-material";


@Component( {
	templateUrl: './home.html',
	styleUrls: ['./home.scss'],
	host: {class:'xyz'},
	imports: [ComponentCategoryList]
})
export class Home{
}
