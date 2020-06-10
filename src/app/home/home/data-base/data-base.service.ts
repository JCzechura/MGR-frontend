import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {publishReplay, refCount, repeatWhen, tap} from "rxjs/operators";
import {BackendService} from "../../../services/backend.service";
import {Metadata} from "./data-base-option-list/data-base-option.model";
import {urlList} from "../../../../environments/url-list";

@Injectable({
  providedIn: 'root'
})
export class DataBaseService {
  private readonly metadataFromBackend$ = this.backendService.get<Metadata[]>(urlList.metadataGET);
  private readonly refresh$ = new Subject<void>();
  readonly dictionariesMetadata$ = this.metadataFromBackend$.pipe(
      tap(metadataFromBackend => console.log('Metadata from backend', metadataFromBackend)),
      repeatWhen(() => this.refresh$.asObservable()),
      publishReplay(1), refCount(),
      tap(cachedValue => console.log('Cached value', cachedValue))
  );
  constructor(private backendService: BackendService) { }
}
