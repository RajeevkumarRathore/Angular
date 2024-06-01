import { GridApi, GridOptions } from '@ag-grid-community/core';
import { Injectable } from '@angular/core';
import { GridApiService } from './grid-api.service';

@Injectable({
  providedIn: 'root',
})
export class GridActionsService {
  gridOptions: GridOptions;
  gridApi: GridApi;
  rowsSelected: any;
  selectedRows:any = [];
 
  constructor(private gridApiService: GridApiService) {
    this.gridApiService.gridApi$.subscribe((e) => {
      this.gridOptions = e;
      this.gridApi = this.gridOptions.api;
      this.gridApiService.selectedRows$.next([]);
    });
    this.gridApiService.selectedRows$.subscribe((selectedRows) => {
      this.selectedRows = selectedRows;
    });
  }


updateSelectedRows(e?) {
this.gridApiService.selectedRows$.next(e);

}


deselectAllRow(){
  this.gridApi.deselectAll();
}

// deselectRow(data: any) {
//   if (this.gridApi?.getSelectedNodes()) {
//     const row = this.gridApi
//       .getSelectedNodes()
//       .filter((node: any) => node.data.Sku === data.sku.Sku);
//     if (row.length != 0) this.gridApi.deselectIndex(row[0].rowIndex);
//   }
// }

}
