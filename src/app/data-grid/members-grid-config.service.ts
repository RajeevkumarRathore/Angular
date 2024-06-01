import { GridApi, GridOptions } from '@ag-grid-community/core';
import { Injectable } from '@angular/core';
import { GridApiService } from './grid-api.service';
import { GridActionsService } from './grid-actions.service';
import { MembersCellRendererComponent } from '../ag-grid-components/members-cell-renderer/members-cell-renderer.component';
import { ActionsCellRendererComponent } from '../ag-grid-components/actions-cell-renderer/actions-cell-renderer.component';
import { ToggleCellRendererComponent } from '../ag-grid-components/toggle-cell-renderer/toggle-cell-renderer.component';
import * as moment from 'moment';
import { ExpertisesListCellRendererComponent } from '../ag-grid-components/expertises-list-cell-renderer/expertises-list-cell-renderer.component';

@Injectable({
  providedIn: 'root'
})
export class MembersGridConfigService {
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
      headerName: 'Id',
      field: 'memberId',
      filter: 'agTextColumnFilter',
      minWidth: 100,
      floatingFilter: true,
      sortable: true
    },
    {
      headerName: 'First Name',
      field: 'firstName',
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      sortable: true
    },

    {
      headerName: 'Last Name',
      field: 'lastName',
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      sortable: true
    },

    {
      headerName: 'Phone Number',
      field: 'phoneNumber',
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      sortable: true
    },
    {
      headerName: "ESO Cad Name",
      field: 'esoCadName',
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      sortable: true
    },
    {
      headerName: "Emergncy Type Id",
      field: 'emergencyTypeId',
      // filter: 'agNumberColumnFilter',
      floatingFilter: true,
      sortable: true,
      cellRenderer: "membersCellRendererComponent"
    },
    {
      headerName: "Address",
      field: 'address',
      filter: 'agTextColumnFilter',
      minWidth: 350,
      floatingFilter: true,
      sortable: true
    },
    {
      headerName: "Status",
      field: 'status',
      // filter: 'agTextColumnFilter',
      floatingFilter: true,
      sortable: true,
      cellRenderer: "membersCellRendererComponent"
    },
    {
      headerName: "Expertises",
      field: 'expertises',
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      sortable: true,
      cellRenderer: "expertisesListCellRendererComponent",
    },
    {
      headerName: "Member Since",
      field: 'memberSince',
      filter: 'agDateColumnFilter',
      floatingFilter: true,
      sortable: true,
      cellRenderer: (data) => {
        if (data.value) {
          return moment(data.value).format('MM/DD/YYYY')
        }
        return '';
      }
    }
  ]

  components = {
    membersCellRendererComponent: MembersCellRendererComponent,
    actionsCellRendererComponent: ActionsCellRendererComponent,
    toggleCellRendererComponent: ToggleCellRendererComponent,
    expertisesListCellRendererComponent:ExpertisesListCellRendererComponent
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
     onCellClicked:(e: any)=>{
      if(e.column.colId == '0' || e.column.colId == "isDispatcher" ||
       e.column.colId == 'isNsUnit' || e.column.colId == 'isBus' || e.column.colId == 'isBase'){
        e.api.deselectAll();
      }
    },
    }

}
