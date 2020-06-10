import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DataBaseComponent} from "./data-base/data-base.component";
import {DataBaseOptionListComponent} from './data-base-option-list/data-base-option-list.component';
import { DataBaseTableComponent } from './data-base-table/data-base-table.component';
import {MatRadioModule} from "@angular/material/radio";
import {FormsModule} from "@angular/forms";


@NgModule({
    declarations: [
        DataBaseComponent,
        DataBaseOptionListComponent,
        DataBaseTableComponent
    ],
    imports: [
        CommonModule,
        MatRadioModule,
        FormsModule,
    ]
})
export class DataBaseModule { }
