import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GarbageTruckRoutesComponent} from "./garbage-truck-routes/garbage-truck-routes.component";
import { GarbageTruckRoutesMapComponent } from './garbage-truck-routes-map/garbage-truck-routes-map.component';
import { GarbageTruckRoutesFilterComponent } from './garbage-truck-routes-filter/garbage-truck-routes-filter.component';
import { GarbageTruckRoutesListComponent } from './garbage-truck-routes-list/garbage-truck-routes-list.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";


@NgModule({
  declarations: [
    GarbageTruckRoutesComponent,
    GarbageTruckRoutesFilterComponent,
    GarbageTruckRoutesListComponent,
    GarbageTruckRoutesMapComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
    MatInputModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'pl'}
  ]
})
export class GarbageTruckRoutesModule { }
