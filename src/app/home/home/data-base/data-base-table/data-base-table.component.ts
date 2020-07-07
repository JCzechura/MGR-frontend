import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Metadata} from "../data-base.model";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {Observable, Subscription} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {DataBaseService} from "../data-base.service";
import {DataBaseDataSource} from "../data-base-data-source";
import {map, startWith} from "rxjs/operators";
import {DatabaseEditDialogEntry} from "../data-base-edit-dialog/data-base-edit-dialog-entry";
import {DataBaseEditDialogComponent} from "../data-base-edit-dialog/data-base-edit-dialog.component";

const mapToField = <T, K extends keyof T>(fieldName: K) => map((item: T) => item[fieldName]);

const INIT_PAGE_SIZE = 100;
const INIT_PAGE_INDEX = 0;

@Component({
  selector: 'app-data-base-table',
  templateUrl: './data-base-table.component.html',
  styleUrls: ['./data-base-table.component.scss']
})
export class DataBaseTableComponent implements OnInit, OnDestroy {
  readonly dataSource: DataBaseDataSource;
  readonly pageSizeOptions = [10, 50, 100, 200];
  readonly listTotalLength$: Observable<number>;
  readonly pageIndex$: Observable<number>;
  readonly pageSize$: Observable<number>;
  readonly areLocationsLoading$: Observable<boolean>;
  readonly tableName$: Observable<string>;
  displayedColumns: string[] = [];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

 //  @Input() addDictButtonClickedEvent$: Observable<void>;

  private addDictButtonClickedSub: Subscription;

  constructor(private readonly dataBaseService: DataBaseService,
              private readonly dialog: MatDialog) {
    this.dataSource = new DataBaseDataSource(this.dataBaseService);
    this.listTotalLength$ = this.dataSource.dataBasePage$
        .pipe(
            mapToField('totalElements'),
            startWith(0)
        );
    this.pageIndex$ = this.dataSource.dataBasePage$
        .pipe(
            mapToField('number'),
            startWith(INIT_PAGE_INDEX)
        );
    this.pageSize$ = this.dataSource.dataBasePage$.pipe(mapToField('size'), startWith(INIT_PAGE_SIZE));
    this.areLocationsLoading$ = this.dataSource.isLoading$;
    this.tableName$ = this.dataBaseService.tableName$;
  }

  private _dictMetadata: Metadata;

  @Input()
  set dictMetadata(dictMetadata: Metadata | null) {
    console.log(dictMetadata);
    if (!dictMetadata) {
      return;
    }
    this._dictMetadata = dictMetadata;
    this.setDisplayedColumns(dictMetadata);
  }

  get tableName() {
    return this._dictMetadata.tableName;
  }

  ngOnInit() {
    // this.addDictButtonClickedSub = this.addDictButtonClickedEvent$.subscribe(value => {
    //   this.editDict({dictName: this.tableName});
    // });
  }

  pageChanged({pageSize, pageIndex}: PageEvent): void {
    const {pageSize: prevPageSize, pageIndex: prevPageIndex} = this.dataBaseService.pageChange;
    if (pageSize !== prevPageSize || pageIndex !== prevPageIndex) {
      this.dataBaseService.pageChange = {pageIndex, pageSize};
    }
  }

  sortChanged(sort: Sort): void {
    this.dataBaseService.sort = sort;
  }

  editDict(row: any) {
    console.log(row);
    const dictEditDialogInfo: DatabaseEditDialogEntry = {data: row, metadata: this._dictMetadata};
    this.dialog.open(DataBaseEditDialogComponent, {width: '400px', data: dictEditDialogInfo});
  }

  ngOnDestroy(): void {
    // this.addDictButtonClickedSub.unsubscribe();
  }

  private setDisplayedColumns(dictMetadata: Metadata) {
    this.displayedColumns = [];
    if (dictMetadata.attrib_01_Desc) {
      this.displayedColumns.push(dictMetadata.attrib_01_Desc);
    }
    if (dictMetadata.attrib_02_Desc) {
      this.displayedColumns.push(dictMetadata.attrib_02_Desc);
    }
    if (dictMetadata.attrib_03_Desc) {
      this.displayedColumns.push(dictMetadata.attrib_03_Desc);
    }
    if (dictMetadata.attrib_04_Desc) {
      this.displayedColumns.push(dictMetadata.attrib_04_Desc);
    }
    if (dictMetadata.attrib_05_Desc) {
      this.displayedColumns.push(dictMetadata.attrib_05_Desc);
    }
    if (dictMetadata.attrib_06_Desc) {
      this.displayedColumns.push(dictMetadata.attrib_06_Desc);
    }
    console.log(this.displayedColumns);
  }
}
