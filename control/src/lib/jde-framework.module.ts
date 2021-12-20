import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatSortModule} from '@angular/material/sort';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import { GraphQLDetailComponent } from './pages/GraphQL/detail/graph-ql-detail';
import { GraphQLComponent } from './pages/GraphQL/graph-ql-component';
import { GraphQLLinkComponent } from './pages/GraphQL/links/links';
import { GraphQLProperties } from './pages/GraphQL/properties/properties';
import { GraphQLTable } from './pages/GraphQL/table/table';
import {SelectDialog} from './pages/GraphQL/select-dialog/select-dialog';
import { LogsComponent } from './pages/logs/logs';
import { UserEntryDialog } from './pages/user-management/users/dialog/user-dialog';
import { UserComponent } from './pages/user-management/users/users';
//import { DateRangeComponent } from './shared/date-range/date-range'
//import { LinkSelectModule } from './shared/link-select/link-select'
import { PaginatorComponent } from './shared/paginator/paginator';
import { SeverityPickerComponent } from './shared/severity-picker/severity-picker';

//import { ComponentPageTitle } from 'jde-material';

@NgModule({
  	declarations: [PaginatorComponent,SeverityPickerComponent,
		SelectDialog, LogsComponent,
		GraphQLTable, GraphQLComponent, GraphQLDetailComponent, GraphQLLinkComponent, GraphQLProperties,
		UserComponent, UserEntryDialog ],
  	imports: [CommonModule,
	  FormsModule, ReactiveFormsModule,
	  MatButtonModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatIconModule, MatNativeDateModule, MatSelectModule, MatSortModule, MatTabsModule, MatTableModule, MatToolbarModule
	  //,ComponentPageTitle
	],
	entryComponents:[SelectDialog],
	exports: [PaginatorComponent,SeverityPickerComponent]
})
export class JdeFrameworkModule { }
