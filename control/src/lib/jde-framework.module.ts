import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatSortModule} from '@angular/material/sort';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { GraphQLDetailComponent } from './pages/GraphQL/detail/graph-ql-detail';
import { GraphQLComponent } from './pages/GraphQL/graph-ql-component';
import { GraphQLLinkComponent } from './pages/GraphQL/links/links';
import { GraphQLProperties } from './pages/GraphQL/properties/properties';
import { GraphQLTable } from './pages/GraphQL/table/table';
import {EditDialog} from './pages/applications/applications'
import {SelectDialog} from './pages/GraphQL/select-dialog/select-dialog';
import { Applications } from './pages/applications/applications';
import { LogsComponent } from './pages/logs/logs';
import { UserEntryDialog } from './pages/user-management/users/dialog/user-dialog';
import { UserComponent } from './pages/user-management/users/users';
import { SeverityPickerModule } from './shared/severity-picker/severity-picker';

@NgModule({
  	declarations: [
		EditDialog, SelectDialog, Applications, LogsComponent,
		GraphQLTable, GraphQLComponent, GraphQLDetailComponent, GraphQLLinkComponent, GraphQLProperties,
		UserComponent, UserEntryDialog ],
  	imports: [CommonModule, SeverityPickerModule, MatAutocompleteModule,
	  FormsModule, ReactiveFormsModule,
	  MatButtonModule, MatCheckboxModule, MatCardModule,MatChipsModule, MatDatepickerModule, MatDialogModule, MatDividerModule, MatFormFieldModule, MatInputModule, MatIconModule, MatNativeDateModule, MatSelectModule, MatSortModule, MatTabsModule, MatTableModule, MatToolbarModule
	],
	//entryComponents:[SelectDialog,EditDialog],
	exports: []
})
export class JdeFrameworkModule{}