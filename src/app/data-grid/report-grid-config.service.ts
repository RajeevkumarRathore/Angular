import { Injectable } from '@angular/core';
import {
  GridApi,
  GridOptions
} from "@ag-grid-community/core";
import { GridApiService } from './grid-api.service';
import { GridActionsService } from './grid-actions.service';
import * as moment from 'moment';
import { ExpertisesListCellRendererComponent } from '../ag-grid-components/expertises-list-cell-renderer/expertises-list-cell-renderer.component';
import { ReportCellRendererComponent } from '../ag-grid-components/report-cell-renderer/report-cell-renderer.component';

@Injectable({
  providedIn: 'root'
})
export class ReportGridConfigService {
  gridApi: GridApi;
  isOpened: boolean = false;
  constructor(private gridApiService: GridApiService,
    private gridActionsService:GridActionsService) {
    this.gridApiService.gridApi$.subscribe((e: GridOptions) => {
      this.gridApi = e.api;
    })
  }

  columnDefs = [
    {
      headerName: 'Unit',
      field: 'badge_number',
      // checkboxSelection: true,
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      sortable: true,
      minWidth: 100,
    },
    {
      headerName: 'Department',
      field: 'isNSUnit',
      // filter: 'agNumberColumnFilter',
      // floatingFilter: true,
      sortable: true,
      minWidth: 150,
    },
    {
      headerName: 'Firstname ',
      field: 'memberFirstName',
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      sortable: true,
      minWidth: 150
    },
    {
      headerName: 'Lastname',
      field: 'memberLastName',
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      sortable: true,
      minWidth: 150
    },
    {
      headerName: 'Expertises',
      field: 'expertises',
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      sortable: true,
      minWidth: 150,
      cellRenderer: 'expertisesListCellRendererComponent',
    },

    {
      headerName: 'TR-Hospital',
      field: 'transport',
      filter: 'agNumberColumnFilter',
      minWidth: 180,
      floatingFilter: true,
      sortable: true
    },

    {
      headerName: 'Scene Only',
      field: 'toScene',
      filter: 'agNumberColumnFilter',
      floatingFilter: true,
      sortable: true,
      minWidth: 150
    },
    {
      headerName: "Nu's",
      field: 'nu',
      filter: 'agNumberColumnFilter',
      floatingFilter: true,
      sortable: true,
      minWidth: 150
    },
    {
      headerName: "Day Calls",
      field: 'dayCalls',
      filter: 'agNumberColumnFilter',
      floatingFilter: true,
      sortable: true,
      minWidth: 150
    },
    {
      headerName: "Night Calls",
      field: 'nightCalls',
      filter: 'agNumberColumnFilter',
      floatingFilter: true,
      sortable: true,
      minWidth: 150
    },
    {
      headerName: "Total",
      field: 'memberTotal',
      filter: 'agNumberColumnFilter',
      floatingFilter: true,
      sortable: true,
      minWidth: 150
    },
  ]

  dateColumnDefs = [
    {
      headerName: 'Date',
      // checkboxSelection: true,
      field: 'date',
      filter: 'agDateColumnFilter',
      floatingFilter: true,
      sortable: true
    },

    {
      headerName: 'TR - Hospital',
      field: 'transport',
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      sortable: true
    },

    {
      headerName: 'Scene Only',
      field: 'toScene',
      filter: 'agNumberColumnFilter',
      floatingFilter: true,
      sortable: true
    },

    {
      headerName: "Nu's",
      field: 'nu',
      filter: 'agNumberColumnFilter',
      floatingFilter: true,
      sortable: true
    },

    {
      headerName: "Day Calls",
      field: 'dayCalls',
      filter: 'agNumberColumnFilter',
      floatingFilter: true,
      sortable: true
    },

    {
      headerName: "Night Calls",
      field: 'nightCalls',
      filter: 'agNumberColumnFilter',
      floatingFilter: true,
      sortable: true
    },
    {
      headerName: "Total",
      field: 'memberTotal',
      filter: 'agNumberColumnFilter',
      floatingFilter: true,
      sortable: true,
      minWidth: 150
    },
  ]

  summaryColumnDefs = [
    {
      headerName: 'Unit',
      field: 'badge_number',
      // checkboxSelection: true,
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      sortable: true,
      minWidth:120
    },
    {
      headerName: 'Department',
      field: 'isNSUnit',
      // filter: 'agTextColumnFilter',
      // floatingFilter: true,
      sortable: true,
      minWidth:120
    },
    {
      headerName: 'Firstname',
      field: 'memberFirstName',
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      sortable: true,
      minWidth:120
    },
    {
      headerName: 'Lastname',
      field: 'memberLastName',
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      sortable: true,
      minWidth:120
    },
    {
      headerName: 'Expertises',
      field: 'expertises',
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      sortable: true,
      minWidth:120,
      cellRenderer: 'expertisesListCellRendererComponent',
    },

    {
      headerName: "Start Date",
      field: 'memberSince',
      checkboxSelection: false,
      filter: 'agDateColumnFilter',
      floatingFilter: true,
      sortable: true,
      minWidth:120,
      cellRenderer: (data) => {
        if (data.value) {
          return moment(data.value).format('MM/DD/YYYY')
        }
        return '';
      }
    },

    {
      headerName: "Jan",
      field: 'jan',
      filter: 'agNumberColumnFilter',
      floatingFilter: true,
      sortable: true,
      minWidth:120
    },

    {
      headerName: "Feb",
      field: 'feb',
      filter: 'agNumberColumnFilter',
      floatingFilter: true,
      sortable: true,
      minWidth:120
    },
    {
      headerName: "Mar",
      field: 'mar',
      filter: 'agNumberColumnFilter',
      floatingFilter: true,
      sortable: true,
      minWidth:120
    },
    {
      headerName: "Apr",
      field: 'apr',
      filter: 'agNumberColumnFilter',
      floatingFilter: true,
      sortable: true,
      minWidth:120
    },
    {
      headerName: "May",
      field: 'may',
      filter: 'agNumberColumnFilter',
      floatingFilter: true,
      sortable: true,
      minWidth:120
    },
    {
      headerName: "Jun",
      field: 'jun',
      filter: 'agNumberColumnFilter',
      floatingFilter: true,
      sortable: true,
      minWidth:120
    },
    {
      headerName: "Jul",
      field: 'jul',
      filter: 'agNumberColumnFilter',
      floatingFilter: true,
      sortable: true,
      minWidth:120
    },
    {
      headerName: "Aug",
      field: 'aug',
      filter: 'agNumberColumnFilter',
      floatingFilter: true,
      sortable: true,
      minWidth:120
    },
    {
      headerName: "Sep",
      field: 'sep',
      filter: 'agNumberColumnFilter',
      floatingFilter: true,
      sortable: true,
      minWidth:120
    },
    {
      headerName: "Oct",
      field: 'oct',
      filter: 'agNumberColumnFilter',
      floatingFilter: true,
      sortable: true,
      minWidth:120
    },
    {
      headerName: "Nov",
      field: 'nov',
      filter: 'agNumberColumnFilter',
      floatingFilter: true,
      sortable: true,
      minWidth:120
    },
    {
      headerName: "Dec",
      field: 'dec',
      filter: 'agNumberColumnFilter',
      floatingFilter: true,
      sortable: true,
      minWidth:120
    },
    {
      headerName: "Sum (2023)",
      field: 'sumYear',
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      sortable: true,
      minWidth:120
    },

    {
      headerName: "Annual Avg.",
      field: 'annualAverage',
      filter: 'agNumberColumnFilter',
      floatingFilter: true,
      sortable: true,
      minWidth:120
    },

    {
      headerName: "3 Month Avg.",
      field: 'threeMonthsAverage',
      filter: 'agNumberColumnFilter',
      floatingFilter: true,
      sortable: true,
      minWidth:120
    },

    {
      headerName: "Years",
      field: 'years',
      filter: 'agNumberColumnFilter',
      floatingFilter: true,
      sortable: true,
      minWidth:120
    },
    {
      headerName: "Status",
      field: 'status',
      filter: 'agNumberColumnFilter',
      floatingFilter: true,
      sortable: true,
      minWidth:120,
      cellClass: (params)=>{
        return params.data.status == 'Met Quota' ? 'column-cell-green-color' : 'column-cell-red-color';
      }
    },
    {
      headerName: "Thank You Message",
      filter: 'agNumberColumnFilter',
      floatingFilter: true,
      sortable: true,
      minWidth:120,
      cellRenderer:'reportCellRendererComponent',
    },
  ]
  components = {
    expertisesListCellRendererComponent:ExpertisesListCellRendererComponent,
    reportCellRendererComponent:ReportCellRendererComponent
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
  };

