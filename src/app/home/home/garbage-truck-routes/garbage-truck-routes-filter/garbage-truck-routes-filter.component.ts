import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GarbageTruckRoutesFilter, GarbageTruckRoutesFilterFieldName} from "./garbage-truck-routes-filter.model";

@Component({
  selector: 'app-garbage-truck-routes-filter',
  templateUrl: './garbage-truck-routes-filter.component.html',
  styleUrls: ['./garbage-truck-routes-filter.component.scss']
})
export class GarbageTruckRoutesFilterComponent implements OnChanges {
  @Input() disabled: boolean;
  @Input() garbageTruckRoutesFilter: GarbageTruckRoutesFilter;
  @Output() readonly filterChange = new EventEmitter<GarbageTruckRoutesFilter>();

  readonly filterForm: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    const controlsConfig = {
      driverLogin: [null, Validators.min(1)],
      routeId: [null, Validators.min(1)],
      truckCode: [null, Validators.min(1)],
      dateFrom: [null],
      dateTo: [null]
    };
    this.filterForm = this.fb.group(controlsConfig);
  }

  get<T extends AbstractControl>(fieldName: GarbageTruckRoutesFilterFieldName): T {
    return this.filterForm.controls[fieldName] as T;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.locationFilter) {
      this.filterForm.patchValue(this.garbageTruckRoutesFilter || {});
    }
  }

  applyFilters(): void {
    const filters: GarbageTruckRoutesFilter = this.filterForm.value;
    this.filterChange.emit(filters);
  }
}
