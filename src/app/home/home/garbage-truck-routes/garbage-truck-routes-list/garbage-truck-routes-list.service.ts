import {Injectable} from '@angular/core';
import {Sort} from '@angular/material';
import {BehaviorSubject, Observable} from 'rxjs';
import {GarbageTruckRouteDetails, GarbageTruckRoutesListEntry, PageChange} from "./garbage-truck-routes-list.model";
import {BackendService} from "../../../../core/backend/backend.service";
import {GarbageTruckRoutesFilter} from "../garbage-truck-routes-filter/garbage-truck-routes-filter.model";
import {Page} from "../../../../core/backend/page";
import {urlList} from "../../../../../environments/url-list";
import {tap} from 'rxjs/operators';
import {GarbageTruckRoutesMapService} from "../garbage-truck-routes-map/garbage-truck-routes-map.service";

interface RequestParams {
  [paramName: string]: string | string[];
}

const appendFilter = (params: RequestParams, filter: GarbageTruckRoutesFilter) => {
  if (filter.routeId != null) {
    params.routeId = String(filter.routeId);
  }
  if (filter.driverLogin) {
    params.driverLogin = filter.driverLogin;
  }
  if (filter.truckCode) {
    params.truckCode = filter.truckCode;
  }
  if (filter.dateFrom) {
    params.dateFrom = filter.dateFrom.toISOString();
  }
  if (filter.dateTo) {
    filter.dateTo.setHours(23, 59, 59, 999);
    params.dateTo = filter.dateTo.toISOString();
  }
};

const appendPage = (params: RequestParams, page: PageChange) => {
  params.page = String(page.pageIndex);
  params.size = String(page.pageSize);
};

const appendSort = (params: RequestParams, sort: Sort | null) => {
  if (!sort || !sort.active || !sort.direction) {
    return;
  }
  params.sort = `${sort.active},${sort.direction}`;
};

const createParams = (filter: GarbageTruckRoutesFilter, page: PageChange, sort: Sort | null) => {
  const params: RequestParams = {};
  appendFilter(params, filter);
  appendPage(params, page);
  appendSort(params, sort);
  return params;
};

const INIT_PAGE_SIZE = 100;
const INIT_PAGE_INDEX = 0;

@Injectable({
  providedIn: 'root'
})
export class GarbageTruckRoutesListService {

  garbageTruckRouteDetails$: Observable<GarbageTruckRouteDetails>;
  private readonly _pageChange$: BehaviorSubject<PageChange> = new BehaviorSubject<PageChange>({
    pageSize: INIT_PAGE_SIZE,
    pageIndex: INIT_PAGE_INDEX
  });
  private readonly _sort$: BehaviorSubject<Sort | null> = new BehaviorSubject<Sort | null>(null);
  private readonly _routesFilter$: BehaviorSubject<GarbageTruckRoutesFilter> = new BehaviorSubject<GarbageTruckRoutesFilter>({});

  constructor(private readonly backendService: BackendService, private garbageTruckRoutesMapService: GarbageTruckRoutesMapService) {
  }

  get pageChange$(): Observable<PageChange> {
    return this._pageChange$.asObservable();
  }

  get pageChange(): PageChange {
    return this._pageChange$.value;
  }

  set pageChange(value) {
    this._pageChange$.next(value);
  }

  get sort$(): Observable<Sort | null> {
    return this._sort$.asObservable();
  }

  set sort(value: Sort | null) {
    this._sort$.next(value);
  }

  get routesFilter$(): Observable<GarbageTruckRoutesFilter> {
    return this._routesFilter$.asObservable();
  }

  set routesFilter(value: GarbageTruckRoutesFilter) {
    this._routesFilter$.next(value);
  }

  getLocationsList(locationFilter: GarbageTruckRoutesFilter, page: PageChange, sort: Sort | null) {
    return this.backendService.get<Page<GarbageTruckRoutesListEntry>>(urlList.routesGET, {
      params: createParams(locationFilter, page, sort)
    });
  }

  getRouteDetails(locationId: number) {
    const params = {id: locationId.toString()};
    this.garbageTruckRouteDetails$ = this.backendService.get<GarbageTruckRouteDetails>(urlList.routeDetailsGET,
        {params}
    ).pipe(
        tap(value => {
          console.log(value);
          this.garbageTruckRoutesMapService.ignoredWastesMarkersVectorSource.clear();
          this.garbageTruckRoutesMapService.unloadingMarkersVectorSource.clear();
          this.garbageTruckRoutesMapService.templateLineVectorSource.clear();
          this.garbageTruckRoutesMapService.improvedLineVectorSource.clear();
          if (value.ignoredWastes) {
            for (const ignoredWaste of value.ignoredWastes) {
              console.log('ignore');
              this.garbageTruckRoutesMapService.addIgnoredWastesMarker(ignoredWaste.location.lon, ignoredWaste.location.lat, ignoredWaste.code);
            }
          }
          if (value.unloadingLocations) {
            console.log('unloading');
            for (const unloadingLocation of value.unloadingLocations) {
              this.garbageTruckRoutesMapService.addUnloadingMarker(unloadingLocation.lon, unloadingLocation.lat);
            }
          }
          if (value.linePoints) {
            console.log('line');
            this.garbageTruckRoutesMapService.createImprovedLine(value.linePoints);
          }
          if (value.templateLinePoints) {
            console.log('tempLine');
            this.garbageTruckRoutesMapService.createTemplateLine(value.templateLinePoints);
          }
        })
    )
  }
}
