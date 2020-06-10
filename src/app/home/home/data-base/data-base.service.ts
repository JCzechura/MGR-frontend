import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {publishReplay, refCount, repeatWhen, tap} from "rxjs/operators";
import {BackendService} from "../../../core/backend/backend.service";
import {DatabaseEntry, Metadata, PageChange} from "./data-base.model";
import {urlList} from "../../../../environments/url-list";
import {Page} from "../../../core/backend/page";
import {Sort} from "@angular/material/sort";

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
const createParams = (tableName: string, page: PageChange, sort: Sort | null) => {
  const params: RequestParams = {};
  params.tableName = String(tableName);
  params.page = String(page.pageIndex);
  params.size = String(page.pageSize);
  appendSort(params, sort);
  return params;
};

@Injectable({
  providedIn: 'root'
})
export class DataBaseService {
  private readonly _pageChange$: BehaviorSubject<PageChange> = new BehaviorSubject<PageChange>({
    pageSize: INIT_PAGE_SIZE,
    pageIndex: INIT_PAGE_INDEX
  });
  private _sort$: BehaviorSubject<Sort | null> = new BehaviorSubject<Sort | null>(null);
  private _tableName$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private metadataFromBackend$ = this.backendService.get<Metadata[]>(urlList.metadataGET);
  private refresh$ = new Subject<void>();
  readonly dictionariesMetadata$ = this.metadataFromBackend$.pipe(
      tap(metadataFromBackend => console.log('Metadata from backend', metadataFromBackend)),
      repeatWhen(() => this.refresh$.asObservable()),
      publishReplay(1), refCount(),
      tap(cachedValue => console.log('Cached value', cachedValue))
  );

  selectedMetaData: Metadata;

  constructor(private backendService: BackendService) {

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

  get tableName$(): Observable<string> {
    return this._tableName$.asObservable();
  }

  set tableName(value: string) {
    console.log(value);
    this._tableName$.next(value);
  }

  getDataList(tableName: string, page: PageChange, sort: Sort | null) {
    console.log(createParams(tableName, page, sort));
    return this.backendService.get<Page<DatabaseEntry>>(urlList.databaseGET, {
      params: createParams(tableName, page, sort)
    });
  }
}
