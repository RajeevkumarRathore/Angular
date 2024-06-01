import { GridOptions, IServerSideDatasource } from '@ag-grid-community/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { ContactGridConfigService } from 'src/app/data-grid/contact-grid-config.service';
import { GridApiService } from 'src/app/data-grid/grid-api.service';
import { AuthService } from 'src/app/services/auth.service';
import { ContactService } from 'src/app/services/contact.service';
import { SidenavService } from 'src/app/services/sidenav.service';
import { AddContactPopUpComponent } from '../add-contact-pop-up/add-contact-pop-up.component';
import { GridActionsService } from 'src/app/data-grid/grid-actions.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, OnDestroy{
  private destroy$ = new Subject<void>();
  columnDefs;
  gridOptions;
  public gridRequestParams;
  private searchText = '';
  public currentTab: string;
  public apiLink;
  countResponse: any;
  public gridApi: any;
  public selectedRow: any;
  public contactDetails: any;
  private _activeTab: string;
  tokenInfo: any;
  userInfo: any;
  sidePanelData: any;

  get activeTab() {
    return this._activeTab;
  }

  set activeTab(tab: string) {
    this._activeTab = tab;
    this.selectPage(this._activeTab);

  }

  constructor(private contactGridConfigService: ContactGridConfigService,public contactService:ContactService,private dialog: MatDialog,
        private gridApiService: GridApiService,
        private authService:AuthService,
        private gridActionService: GridActionsService){
      this.gridOptions = this.contactGridConfigService.gridOptions;
      this.columnDefs = this.contactGridConfigService.columnDefs;
      const index = this.columnDefs.findIndex(x => x.headerName == 'Action' )
      if(index == -1){
      this.columnDefs.splice(18, 0,
        {
          headerName: 'Action',
          sortable: true,
          cellRenderer:"actionsCellRendererComponent",
          minWidth:120,
          pinned: 'right',
          cellRendererParams: {
            edit: (params) => this.addUpdateContact(params.data)
          }
        });
      }
      this.gridApiService.selectedRows$.subscribe((res) => {
        if (res?.node?.selected == true) {
         this.selectedRow = res.data;
        }
        else if(res?.data?.id == this.selectedRow?.id){
          this.selectedRow = null;
        }
      });
    }

      ngOnDestroy(): void {
        if(this.gridActionService.selectedRows.length > 0 || this.gridActionService.selectedRows.data != null){
          this.gridActionService.selectedRows.data = null;
          this.gridActionService.selectedRows.node.selected = false;
        }
      }


  ngOnInit(): void {

   this.activeTab = 'Contacts';
   this.gridApiService.gridApi$
     .pipe(takeUntil(this.destroy$))
     .subscribe((e: GridOptions) => {
       this.gridApi = e.api;
       this.gridApi.setServerSideDatasource(this.dataSource);
     });
     this.userInfo =  this.authService.userInfo$.value.data.userInfoDto;
     this.tokenInfo =  this.authService.userInfo$.value.data.tokens;

  }

  public tabClicked(e) {
    this.activeTab = e;
  }

  public dataSource: IServerSideDatasource = {
    getRows: (params: any) => {
      const filterModels = params.request.filterModel;
      for (const colId in filterModels) {
        if (filterModels.hasOwnProperty(colId)) {
          const filterModel = filterModels[colId];
          params.request['filterModel'][colId].Values = [filterModel.filter]
        }
      }
      this.gridRequestParams = params.request;
      params.request.SearchText = this.searchText;
      params.api.sizeColumnsToFit();
      this.selectPage(this.currentTab);
      this.apiLink?.subscribe((response: any) => {
        if (response) {
          if (!response.data.items?.length) {
            this.gridApi.showNoRowsOverlay();
          } else {
            this.gridApi.hideOverlay();
          }
          params.success({
            rowData: response.data.items,
            rowCount: response.data?.totalCount,
          });

        }
      });
    },
  };

  public selectPage(page) {
    this.selectedRow = null;
    this.contactDetails = null;
    const body =
      this.gridRequestParams && this._activeTab === page
        ? this.gridRequestParams
        : { startRow: 0, endRow: 50 };
    if (page == 'Contacts') {

      this.getContact(body);
    }
    // else if (page === 'Sync History') {
    //   this.columnDefs = this.contactGridConfigService.columnDefs;
    //   this.getSyncHistory(body);
    // }
    if (this.currentTab !== page) {
      this.currentTab = page;
      this.gridApi?.deselectAll();
      this.gridApi?.refreshServerSide({ route: [], purge: true });
    }
  }

  public getContact(body){
    const memberReportViewModel: any = {
      paginationParameter : body,
      quickFilter : this.searchText,

    };
    this.apiLink =this.contactService.getAllContact(body,this.columnDefs,memberReportViewModel)
  }

  goToNextOrPreviousRecord(isNext = false) {
    let node = this.gridOptions.api.getSelectedNodes()[0];
    let rowIndex = node.rowIndex;
    let row = this.gridOptions.api.getDisplayedRowAtIndex(isNext ? (rowIndex + 1) : (rowIndex - 1));
    this.gridOptions.api.forEachNode((node) => {
      if (node.rowIndex === row.rowIndex) {
        node.setSelected(true);
        return;
      }
    });
  }

  addUpdateContact(data?){
    this.dialog.open(AddContactPopUpComponent, {
      autoFocus: false,
        width: '600px',
        data: data
      })
      .afterClosed()
      .subscribe((e: any) => {
        if(e === 'Saved'){
          this.gridApi?.refreshServerSide({ route: [], purge: true });
        }
      });
  }

  searchContact(text){
    this.searchText = text;
    this.gridApi?.refreshServerSide({ route: [], purge: true });
  }
}
