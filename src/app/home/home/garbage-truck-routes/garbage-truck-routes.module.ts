import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GarbageTruckRoutesComponent} from "./garbage-truck-routes/garbage-truck-routes.component";
import { GarbageTruckRoutesMapComponent } from './garbage-truck-routes-map/garbage-truck-routes-map.component';
import { GarbageTruckRoutesFilterComponent } from './garbage-truck-routes-filter/garbage-truck-routes-filter.component';
import { GarbageTruckRoutesListComponent } from './garbage-truck-routes-list/garbage-truck-routes-list.component';



@NgModule({
  declarations: [
    GarbageTruckRoutesComponent,
    GarbageTruckRoutesFilterComponent,
    GarbageTruckRoutesListComponent,
    GarbageTruckRoutesMapComponent
  ],
  imports: [
    CommonModule
  ]
})
export class GarbageTruckRoutesModule { }
