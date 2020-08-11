import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Sort} from "@angular/material/sort";
import {urlList} from "../../../../environments/url-list";
import {BackendService} from "../../../core/backend/backend.service";
import {Page} from "../../../core/backend/page";
import {PageChange, PlansEntry, PlansWebObject} from "./plans.model";


interface RequestParams {
    [paramName: string]: string | string[];
}

const INIT_PAGE_SIZE = 100;
const INIT_PAGE_INDEX = 0;

const appendSort = (params: RequestParams, sort: Sort | null) => {
    if (!sort || !sort.active || !sort.direction) {
        return;
    }
    params.sort = `${sort.active},${sort.direction}`;
};
const createParams = (page: PageChange, sort: Sort | null) => {
    const params: RequestParams = {};
    params.page = String(page.pageIndex);
    params.size = String(page.pageSize);
    appendSort(params, sort);
    return params;
};

@Injectable({
    providedIn: 'root'
})
export class PlansService {
    private readonly _pageChange$: BehaviorSubject<PageChange> = new BehaviorSubject<PageChange>({
        pageSize: INIT_PAGE_SIZE,
        pageIndex: INIT_PAGE_INDEX
    });

    constructor(private backendService: BackendService) {

    }

    private _sort$: BehaviorSubject<Sort | null> = new BehaviorSubject<Sort | null>(null);

    get sort$(): Observable<Sort | null> {
        return this._sort$.asObservable();
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

    set sort(value: Sort | null) {
        this._sort$.next(value);
    }

    getPlansList(page: PageChange, sort: Sort | null) {
        console.log(createParams(page, sort));
        return this.backendService.get<Page<PlansEntry>>(urlList.plansGET, {
            params: createParams(page, sort)
        });
    }

    sendPlanRows(body: PlansWebObject, type: string) {
        console.log(type);
        const path = type === 'new' ? urlList.plansNewPOST : urlList.plansExceptionalPOST;
        return this.backendService.post<number>(path, body);

    }

    plan() {
        return this.backendService.get<number>(urlList.planGET);
    }
}