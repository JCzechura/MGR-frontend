import { Component, OnInit } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {map} from "rxjs/operators";
import {Metadata} from "./data-base-option.model";
import {DataBaseService} from "../data-base.service";
import {MatRadioChange} from "@angular/material/radio";

@Component({
  selector: 'app-data-base-option-list',
  templateUrl: './data-base-option-list.component.html',
  styleUrls: ['./data-base-option-list.component.css']
})
export class DataBaseOptionListComponent implements OnInit {

  metaDataValue: Metadata;
  metaData$: Observable<Metadata[]> = this.dataBaseService.dictionariesMetadata$;
  readonly addDictButtonSubject$: Subject<void> = new Subject<void>();
  private readonly _selectedDict$ = new BehaviorSubject<Metadata | null>(null);
  onMetaDataSelected$ = this._selectedDict$.asObservable();
  constructor(private dataBaseService: DataBaseService) { }

  ngOnInit() {
  }

  onMetaDataSelected($event: MatRadioChange) {
    this.metaDataValue = $event.value;
    this._selectedDict$.next($event.value);
  }
}
