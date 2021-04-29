import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatChipsModule} from '@angular/material/chips';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import { DateRangeComponent } from './shared/date-range/date-range'
import { LinkSelectComponent } from './shared/link-select/link-select'
import { PaginatorComponent } from './shared/paginator/paginator';
import { SeverityPickerComponent } from './shared/severity-picker/severity-picker';

@NgModule({
  	declarations: [PaginatorComponent,LinkSelectComponent, DateRangeComponent, SeverityPickerComponent ],
  	imports: [
	  FormsModule, ReactiveFormsModule,
	  MatChipsModule,MatDatepickerModule,MatFormFieldModule,MatIconModule,MatSelectModule
	],
  	exports: [PaginatorComponent,LinkSelectComponent, DateRangeComponent, SeverityPickerComponent]
})
export class JdeFrameworkModule { }
