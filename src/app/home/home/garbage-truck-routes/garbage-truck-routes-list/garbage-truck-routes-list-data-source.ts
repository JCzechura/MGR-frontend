import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {Sort} from '@angular/material';
import {finalize, map, share, switchMap} from 'rxjs/operators';
import {Page} from "../../../../core/backend/page";
import {GarbageTruckRoutesListEntry, PageChange} from "./garbage-truck-routes-list.model";
import {GarbageTruckRoutesFilter} from "../garbage-truck-routes-filter/garbage-truck-routes-filter.model";
import {GarbageTruckRoutesListService} from "./garbage-truck-routes-list.service";

export class GarbageTruckRoutesListDataSource implements DataSource<GarbageTruckRoutesListEntry> {
    readonly locationsPage$: Observable<Page<GarbageTruckRoutesListEntry>>;

    private readonly page$: Observable<PageChange>;
    private readonly sort$: Observable<Sort | null>;
    private readonly locationFilter$: Observable<GarbageTruckRoutesFilter>;
    private readonly isLoadingEmiter: BehaviorSubject<boolean>;

    constructor(private readonly garbageTruckRoutesListService: GarbageTruckRoutesListService) {
        this.page$ = this.garbageTruckRoutesListService.pageChange$;
        this.sort$ = this.garbageTruckRoutesListService.sort$;
        this.locationFilter$ = this.garbageTruckRoutesListService.routesFilter$;
        this.isLoadingEmiter = new BehaviorSubject<boolean>(false);
        this.locationsPage$ = combineLatest(this.locationFilter$, this.page$, this.sort$)
            .pipe(
                switchMap(([locationFilter, page, sort]) => this.loadLocationsList(locationFilter, page, sort)),
                share()
            );
    }

    get isLoading$(): Observable<boolean> {
        return this.isLoadingEmiter.asObservable();
    }

    connect(collectionViewer: CollectionViewer): Observable<GarbageTruckRoutesListEntry[] | ReadonlyArray<GarbageTruckRoutesListEntry>> {
        return this.locationsPage$
            .pipe(
                map(locationsList => locationsList.content)
            );
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.isLoadingEmiter.complete();
    }

    private loadLocationsList(locationFilter: GarbageTruckRoutesFilter, page: PageChange, sort: Sort | null) {
        this.isLoadingEmiter.next(true);
        return this.garbageTruckRoutesListService.getLocationsList(locationFilter, page, sort)
            .pipe(
                finalize(() => this.isLoadingEmiter.next(false))
            );
    }
}
