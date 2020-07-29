import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {Sort} from '@angular/material';
import {finalize, map, share, switchMap} from 'rxjs/operators';
import {Page} from "../../../core/backend/page";
import {PageChange, PlansEntry} from "./plans.model";
import {PlansService} from "./plans.service";

export class PlansDataSource implements DataSource<PlansEntry> {
    readonly plansPage$: Observable<Page<PlansEntry>>;

    private readonly page$: Observable<PageChange>;
    private readonly sort$: Observable<Sort | null>;
    private readonly isLoadingEmiter: BehaviorSubject<boolean>;

    constructor(private readonly plansService: PlansService) {
        this.page$ = this.plansService.pageChange$;
        this.sort$ = this.plansService.sort$;
        this.isLoadingEmiter = new BehaviorSubject<boolean>(false);
        this.plansPage$ = combineLatest(this.page$, this.sort$)
            .pipe(
                switchMap(([page, sort]) => this.loadLocationsList(page, sort)),
                share()
            );
    }

    get isLoading$(): Observable<boolean> {
        return this.isLoadingEmiter.asObservable();
    }

    connect(collectionViewer: CollectionViewer): Observable<PlansEntry[] | ReadonlyArray<PlansEntry>> {
        return this.plansPage$
            .pipe(
                map(locationsList => locationsList.content)
            );
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.isLoadingEmiter.complete();
    }

    private loadLocationsList(page: PageChange, sort: Sort | null) {
        this.isLoadingEmiter.next(true);
        return this.plansService.getPlansList(page, sort)
            .pipe(
                finalize(() => this.isLoadingEmiter.next(false))
            );
    }
}
