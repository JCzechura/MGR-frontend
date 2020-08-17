import { Component, OnInit } from '@angular/core';
import {GarbageTruckRoutesListService} from "../garbage-truck-routes-list/garbage-truck-routes-list.service";

@Component({
  selector: 'app-garbage-truck-routes-details',
  templateUrl: './garbage-truck-routes-details.component.html',
  styleUrls: ['./garbage-truck-routes-details.component.css']
})
export class GarbageTruckRoutesDetailsComponent implements OnInit {

  garbageTruckRouteDetails$ = this.garbageTruckRoutesListService.garbageTruckRouteDetails$;
  constructor(public garbageTruckRoutesListService: GarbageTruckRoutesListService) { }

  ngOnInit() {
  }

}
