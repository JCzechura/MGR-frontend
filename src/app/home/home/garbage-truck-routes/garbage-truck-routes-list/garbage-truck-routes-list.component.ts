import {Component, ElementRef, OnInit, QueryList, ViewChildren, ViewContainerRef} from '@angular/core';
import {Observable, Subject, Subscription} from "rxjs";
import {SelectionModel} from "@angular/cdk/collections";
import {debounceTime, distinctUntilChanged, filter, map, startWith} from "rxjs/operators";
import {Router} from "@angular/router";
import {PageEvent} from "@angular/material/paginator";
import {Sort} from "@angular/material/sort";
import {Page} from "../../../../core/backend/page";
import {GarbageTruckRoutesFilter} from "../garbage-truck-routes-filter/garbage-truck-routes-filter.model";
import {GarbageTruckRoutesListEntry} from "./garbage-truck-routes-list.model";
import {GarbageTruckRoutesListService} from "./garbage-truck-routes-list.service";
import {GarbageTruckRoutesListDataSource} from "./garbage-truck-routes-list-data-source";

const mapToField = <T, K extends keyof T>(fieldName: K) => map((item: T) => item[fieldName]);

const INIT_PAGE_SIZE = 100;
const INIT_PAGE_INDEX = 0;

@Component({
  selector: 'app-garbage-truck-routes-list',
  templateUrl: './garbage-truck-routes-list.component.html',
  styleUrls: ['./garbage-truck-routes-list.component.scss']
})
export class GarbageTruckRoutesListComponent implements OnInit {
  @ViewChildren('locationRow', {read: ViewContainerRef}) rows?: QueryList<ViewContainerRef>;

  readonly dataSource: GarbageTruckRoutesListDataSource;
  readonly displayedColumns =
      ['id', 'driverLogin', 'truckCode', 'date'];
  readonly sortIds = {
    id: 'id',
    driverLogin: 'referenceRoute.driver.login',
    truckCode: 'referenceRoute.truck.code',
    date: 'referenceRoute.date'
  };
  readonly pageSizeOptions = [10, 25, 50, 100, 200];
  readonly listTotalLength$: Observable<number>;
  readonly pageIndex$: Observable<number>;
  readonly pageSize$: Observable<number>;
  readonly areLocationsLoading$: Observable<boolean>;
  readonly garbageTruckRoutesFilter$: Observable<GarbageTruckRoutesFilter>;

  constructor(private readonly garbageTruckRoutesListService: GarbageTruckRoutesListService,
              private readonly router: Router) {
    this.dataSource = new GarbageTruckRoutesListDataSource(this.garbageTruckRoutesListService);
    this.listTotalLength$ = this.dataSource.locationsPage$
        .pipe(
            mapToField('totalElements'),
            startWith(0)
        );
    this.pageIndex$ = this.dataSource.locationsPage$
        .pipe(
            mapToField('number'),
            startWith(INIT_PAGE_INDEX)
        );
    this.pageSize$ = this.dataSource.locationsPage$.pipe(mapToField('size'), startWith(INIT_PAGE_SIZE));
    this.areLocationsLoading$ = this.dataSource.isLoading$;
    this.garbageTruckRoutesFilter$ = this.garbageTruckRoutesListService.routesFilter$;
  }

  ngOnInit(): void {
  }

  goToCaseDetails(location: GarbageTruckRoutesListEntry) {// : Promise<boolean> {
    console.log(location);
    // return this.router.navigate(['cases', location.id]);
  }

  pageChanged({pageSize, pageIndex}: PageEvent): void {
    const {pageSize: prevPageSize, pageIndex: prevPageIndex} = this.garbageTruckRoutesListService.pageChange;
    if (pageSize !== prevPageSize || pageIndex !== prevPageIndex) {
      this.garbageTruckRoutesListService.pageChange = {pageIndex, pageSize};
    }
  }

  sortChanged(sort: Sort): void {
    this.garbageTruckRoutesListService.sort = sort;
  }

  onLocationFilterChange(locationFilter: GarbageTruckRoutesFilter): void {
    this.garbageTruckRoutesListService.routesFilter = locationFilter;
  }
}
