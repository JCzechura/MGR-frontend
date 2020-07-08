import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {Metadata} from "../data-base.model";
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
  private readonly _selectedMetaData$ = new BehaviorSubject<string | null>(null);

  constructor(private dataBaseService: DataBaseService) { }

  ngOnInit() {
    this._selectedMetaData$.subscribe(
        (val) => console.log(val)
    );

  }

  onMetaDataSelected($event: MatRadioChange) {
    this.metaDataValue = $event.value;
    this.dataBaseService.tableName = $event.value.tableName;
    this.dataBaseService.selectedMetaData = $event.value;
  }
}
