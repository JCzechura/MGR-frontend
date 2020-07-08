import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DataBaseComponent} from "./data-base/data-base.component";
import {DataBaseOptionListComponent} from './data-base-option-list/data-base-option-list.component';
import { DataBaseTableComponent } from './data-base-table/data-base-table.component';
import {MatRadioModule} from "@angular/material/radio";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatPaginatorModule} from "@angular/material/paginator";
import { DataBaseEditDialogComponent } from './data-base-edit-dialog/data-base-edit-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';


@NgModule({
    declarations: [
        DataBaseComponent,
        DataBaseOptionListComponent,
        DataBaseTableComponent,
        DataBaseEditDialogComponent
    ],
    imports: [
        CommonModule,
        MatRadioModule,
        FormsModule,
        MatTableModule,
        MatSortModule,
        MatCheckboxModule,
        MatPaginatorModule,
        MatDialogModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatDatepickerModule,
        MatNativeDateModule
    ],
    entryComponents: [
        DataBaseEditDialogComponent
    ],
      providers: [
        {provide: MAT_DATE_LOCALE, useValue: 'pl'}
      ]
})
export class DataBaseModule { }
