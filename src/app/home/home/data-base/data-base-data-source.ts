import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {Sort} from '@angular/material';
import {finalize, map, share, switchMap} from 'rxjs/operators';
import {DatabaseEntry, PageChange} from "./data-base.model";
import {Page} from "../../../core/backend/page";
import {DataBaseService} from "./data-base.service";

export class DataBaseDataSource implements DataSource<DatabaseEntry> {
    readonly dataBasePage$: Observable<Page<DatabaseEntry>>;

    private readonly page$: Observable<PageChange>;
    private readonly sort$: Observable<Sort | null>;
    private readonly tableName$: Observable<string>;
    private readonly isLoadingEmiter: BehaviorSubject<boolean>;

    constructor(private readonly dataBaseService: DataBaseService) {
        this.page$ = this.dataBaseService.pageChange$;
        this.sort$ = this.dataBaseService.sort$;
        this.tableName$ = this.dataBaseService.tableName$;
        this.isLoadingEmiter = new BehaviorSubject<boolean>(false);
        this.dataBasePage$ = combineLatest(this.tableName$, this.page$, this.sort$)
            .pipe(
                switchMap(([locationFilter, page, sort]) => this.loadLocationsList(locationFilter, page, sort)),
                share()
            );
    }

    get isLoading$(): Observable<boolean> {
        return this.isLoadingEmiter.asObservable();
    }

    connect(collectionViewer: CollectionViewer): Observable<DatabaseEntry[] | ReadonlyArray<DatabaseEntry>> {
        return this.dataBasePage$
            .pipe(
                map(locationsList => locationsList.content)
            );
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.isLoadingEmiter.complete();
    }

    private loadLocationsList(tableName: string, page: PageChange, sort: Sort | null) {
        this.isLoadingEmiter.next(true);
        return this.dataBaseService.getDataList(tableName, page, sort)
            .pipe(
                finalize(() => this.isLoadingEmiter.next(false))
            );
    }
}
