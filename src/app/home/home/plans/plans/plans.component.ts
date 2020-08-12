import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {filter, flatMap, map, startWith} from "rxjs/operators";
import {PlansDataSource} from "../plans-data-source";
import {PlansService} from "../plans.service";
import {PlansEntry, PlansWebObject} from "../plans.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Observable} from "rxjs";
import {DataBaseEditDialogComponent} from "../../data-base/data-base-edit-dialog/data-base-edit-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {PlansConfirmDialogComponent} from "../plans-confirm-dialog/plans-confirm-dialog.component";

const mapToField = <T, K extends keyof T>(fieldName: K) => map((item: T) => item[fieldName]);

const INIT_PAGE_SIZE = 100;
const INIT_PAGE_INDEX = 0;

@Component({
  selector: 'app-report',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit {
  readonly dataSource: PlansDataSource;
  readonly pageSizeOptions = [10, 50, 100, 200];
  readonly listTotalLength$: Observable<number>;
  readonly pageIndex$: Observable<number>;
  readonly pageSize$: Observable<number>;
  readonly areLocationsLoading$: Observable<boolean>;
  public rows: PlansEntry[] = [];
  @ViewChild('csvReader', {static: true}) csvReader: any;
  displayedColumns: string[] = ['dzień tygodnia', 'kod trasy wzorcowej', 'login kierowcy', 'kod samochodu'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  file: any;
  isProcessing: boolean = false;

  constructor(private readonly plansService: PlansService,
              private _snackBar: MatSnackBar,
              private readonly dialog: MatDialog) {
    this.dataSource = new PlansDataSource(this.plansService);
    this.listTotalLength$ = this.dataSource.plansPage$
        .pipe(
            mapToField('totalElements'),
            startWith(0)
        );
    this.pageIndex$ = this.dataSource.plansPage$
        .pipe(
            mapToField('number'),
            startWith(INIT_PAGE_INDEX)
        );
    this.pageSize$ = this.dataSource.plansPage$.pipe(mapToField('size'), startWith(INIT_PAGE_SIZE));
    this.areLocationsLoading$ = this.dataSource.isLoading$;
  }

  ngOnInit(): void {
    this.plansService.checkIfNextWeekIsPlanned();
  }

  loadPlanFromFile(type: string, e: any) {
    console.log(type);
    this.isProcessing = true;
    console.log(this.isProcessing);
    this.file = e.target.files[0];
    if (this.isValidCSVFile(this.file)) {

      let fileReader: FileReader = new FileReader();

      fileReader.readAsText(this.file);
      fileReader.onload = async () => {
        let csvData = fileReader.result;
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);

        let headersRow = this.getHeaderArray(csvRecordsArray);
        console.log(headersRow);

        let plansArray = [];
        for (let i = 1; i < csvRecordsArray.length; i++) {
          let currentRecord = (<string>csvRecordsArray[i]).split(',');
          if (currentRecord.length == headersRow.length) {
            let csvRecord: PlansEntry = {
              weekday: Number(currentRecord[0].trim()),
              templateCode: currentRecord[1].trim(),
              driverLogin: currentRecord[2].trim(),
              truckCode: currentRecord[3].trim()
            };
            plansArray.push(csvRecord);
          }
        }
        const plansWebObject: PlansWebObject = {
          totalNumber: csvRecordsArray.length - 1,
          webObject: plansArray
        }
        this.plansService.sendPlanRows(plansWebObject, type).subscribe(data => {
          console.log(data);
          this.isProcessing = false;
          alert('PLIK PRZETWORZONO POMYSLNIE');
        });
      };

      fileReader.onerror = function () {
        console.error('error is occured while reading file!');
      };
    } else {
      alert("WCZYTANY PLIK NIE JEST FORMATU .CSV !");
    }
  }

  pageChanged({pageSize, pageIndex}: PageEvent): void {
    const {pageSize: prevPageSize, pageIndex: prevPageIndex} = this.plansService.pageChange;
    if (pageSize !== prevPageSize || pageIndex !== prevPageIndex) {
      this.plansService.pageChange = {pageIndex, pageSize};
    }
  }

  sortChanged(sort: Sort): void {
    this.plansService.sort = sort;
  }

  isValidCSVFile(file: any) {
    return file.name.endsWith(".csv");
  }

  getHeaderArray(csvRecordsArr: any) {
    let headers = (<string>csvRecordsArr[0]).split(',');
    let headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }

  onInputClick = (event) => {
    event.target.value = ''
  }

  loadExceptionalPlan($event: Event) {
    this.loadPlanFromFile('exceptional', $event);
  }

  loadNewPlan($event: Event) {
    this.loadPlanFromFile('new', $event);
  }

  plan() {
    if (this.plansService.isNextWeekPlanned) {
      this.dialog.open(PlansConfirmDialogComponent, {width: '700px'}).afterClosed()
          .pipe(
              filter(value => value),
              flatMap(() => this.plansService.plan())
          ).subscribe(() => alert('PRZYSZLY TYDZIEN ZAPLANOWANY POMYSLNIE'));

    } else {
      this.plansService.plan().subscribe(() => alert('PRZYSZLY TYDZIEN ZAPLANOWANY POMYSLNIE'));
    }
  }
}
