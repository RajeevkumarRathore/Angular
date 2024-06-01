import { GridOptions } from "@ag-grid-community/core";

import { Injectable } from "@angular/core";

import {ReplaySubject, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class GridApiService {
  gridApi$: Subject<GridOptions> = new Subject();
  selectedRows$: Subject<any> = new ReplaySubject(1);
  constructor() {}
}
