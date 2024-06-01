import { GridApi, GridOptions } from '@ag-grid-community/core';
import { Injectable } from '@angular/core';
import { GridApiService } from './grid-api.service';
import { GridActionsService } from './grid-actions.service';
import { CallHistoryCellRendererComponent } from '../ag-grid-components/call-history-cell-renderer/call-history-cell-renderer.component';
import { ActionsCellRendererComponent } from '../ag-grid-components/actions-cell-renderer/actions-cell-renderer.component';

@Injectable({
  providedIn: 'root'
})
export class CallHistoryGridConfigService {
  gridApi: GridApi;
  constructor(private gridApiService: GridApiService,
    private gridActionsService:GridActionsService) {
    this.gridApiService.gridApi$.subscribe((e: GridOptions) => {
      this.gridApi = e.api;
    })
  }

  columnDefs = [
    {
      headerName: 'Cad Number',
      field: 'cadnumber',
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      sortable: true,
      minWidth:100
    },
    {
      headerName: 'Call Type',
      field: 'calltype',
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      sortable: true,
      minWidth:100
    },
    {
      headerName: 'Status',
      field: 'mappedcallstatus',
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      sortable: true,
      minWidth:100
    },
    {
      headerName: 'Cancel/Dismiss Status',
      field: 'status',
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      sortable: true,
      minWidth:100
    },

    {
      headerName: 'Disposition',
      field: 'disposition',
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      sortable: true,
      minWidth:100
    },
    {
      headerName: 'Full name',
      field: 'fullname',
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      sortable: true,
      minWidth:100
    },
    {
      headerName: 'Address',
      field: 'address',
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      sortable: true,
      minWidth:120
    },
    {
      headerName: 'Area',
      field: 'area',
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      sortable: true,
      minWidth:100
    },
    {
      headerName: 'Age',
      field: 'age',
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      sortable: true,
      minWidth:100
    },
    {
      headerName: 'Gender',
      field: 'gender',
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      sortable: true,
      minWidth:100
    },
    {
      headerName: 'Date&Time',
      field: 'datetime',
      filter: 'agDateColumnFilter',
      floatingFilter: true,
      sortable: true,
      minWidth:100
    },
    {
      headerName: 'Phone Number',
      field: 'phonenumber',
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      sortable: true,
      minWidth:100
    },
    {
      headerName: 'Type',
      field: 'type',
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      sortable: true,
      cellClass: 'column-render-cell',
      minWidth:100,
      valueFormatter: (params) => params.value ? params.value.toUpperCase() : '',
    },
    {
      headerName: 'Members',
      field: 'reports',
      //filter: 'agNumberColumnFilter',
      //floatingFilter: true,
      sortable: true,
      minWidth:120,
      cellRenderer:"callHistoryCellRendererComponent",
      cellRendererParams: {
        props: {
          col: 'reports'
        },
      }
    },
    {
      headerName: 'Audio',
      field: 'externalfilepath',
      //filter: 'agTextColumnFilter',
      //floatingFilter: true,
      sortable: true,
      minWidth:120,
      cellRenderer:"callHistoryCellRendererComponent",
      cellRendererParams: {
        props: {
          col: 'externalFilePath'
        },
      }
    },
    {
      headerName: 'Parent FirstName',
      field: 'parentfirstname',
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      sortable: true,
      minWidth:100
    },
    {
      headerName: 'Parent LastName',
      field: 'parentlastname',
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      sortable: true,
      minWidth:100
    },
    {
      headerName: 'Hebrew Name',
      field: 'hebrewname',
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      sortable: true,
      minWidth:100
    },
    {
      headerName: 'Response Agent',
      field: 'responseagent',
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      sortable: true,
      minWidth:100
    },
    {
      headerName: 'Created By Dispatcher',
      field: 'createdby',
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      sortable: true,
      minWidth:100
    },
    {
      headerName: 'Update By Dispatcher',
      field: 'updatedby',
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      sortable: true,
      minWidth:100
    },
    {
      headerName: 'Hospital',
      field: 'hospital',
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      sortable: true,
      minWidth:100
    },
    {
      headerName: 'Location Name',
      field: 'locationname',
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      sortable: true,
      minWidth:100
    }
  ]
  components = {
    callHistoryCellRendererComponent:CallHistoryCellRendererComponent,
    actionsCellRendererComponent:ActionsCellRendererComponent
  }


  gridOptions: GridOptions = {
    rowModelType: "serverSide",
    blockLoadDebounceMillis: 1,
    serverSideStoreType: "partial",
    tooltipShowDelay: 800,
    suppressCopyRowsToClipboard: true,
    maxBlocksInCache: 2,
    defaultColDef: {
      resizable: true,
      filterParams: {
        suppressAndOrCondition: true,
      },
      menuTabs: ["filterMenuTab"],
      tooltipComponent: "customHeaderTooltipComponent",
    },
    components: this.components,
    statusBar: {
      statusPanels: [
        { statusPanel: "statusBarRendererComponent", align: "left" },
      ],
    },
    rowHeight: 40,
    headerHeight: 28,
    rowSelection: "single",
    suppressRowClickSelection: false,
    loadingCellRenderer: "loadingCellRenderer",
    cacheBlockSize: 100,
    pivotPanelShow: "onlyWhenPivoting",
    rowBuffer: 50,
    enableCellChangeFlash: true,
    suppressMenuHide: true,
    icons: {
      menu: '<span class="ag-icon ag-icon-filter" unselectable="on" role="presentation"></span>',
      filter:
        '<span class="ag-icon ag-icon-filter" style="display:none;" unselectable="on" role="presentation"></span>',
    },
    onGridReady: (e) => {
      this.gridApiService.gridApi$.next(e);
      e.api.sizeColumnsToFit();
    },
     onRowSelected: (e) => this.gridActionsService.updateSelectedRows(e),
    }
}
