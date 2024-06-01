import { GridOptions, IServerSideDatasource} from '@ag-grid-community/core';
import { AfterViewInit, Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject, takeUntil} from 'rxjs';
import { DatePickerModel } from 'src/app/common-components/date-picker/date-picker.model';
import { SnackbarComponent } from 'src/app/common-components/snackbar/snackbar.component';
import { CallHistoryGridConfigService } from 'src/app/data-grid/call-history-grid-config.service';
import { GridActionsService } from 'src/app/data-grid/grid-actions.service';
import { GridApiService } from 'src/app/data-grid/grid-api.service';
import { AuthService } from 'src/app/services/auth.service';
import { CallHistoryService } from 'src/app/services/call-history.service';
import { SidenavService } from 'src/app/services/sidenav.service';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-call-history',
  templateUrl: './call-history.component.html',
  styleUrls: ['./call-history.component.scss']
})
export class CallHistoryComponent implements OnInit, OnDestroy,AfterViewInit {
  @ViewChild('callhistorysidenav') public callhistorysidenav: MatSidenav;
  private destroy$ = new Subject<void>();
  public gridApi: any;
  columnDefs;
  gridOptions;
  gridRequestParams: any;
  searchText: string = '';
  apiLink: any;
  countResponse: any;
  userInfo: any;
  tokenInfo: any;
  params: any;
  sidePanelData: any;
  callHistoryDetailData: any;
  currentDateFilter: DatePickerModel;
  startDate: any;
  endDate: any;
  callhistoryCounts: any;
  isDispatchedOnly:boolean;
  Data:any
 callhistoryIcons: any[] = [
    { name: 'Total',icon: 'assets/images/sprite-icons.svg#siren-icon', feildName: 'total_cause',bgColor: 'bg-primary-2'},
    { name: 'Open',icon: 'assets/images/sprite-icons.svg#phone-icon', feildName: 'open_cause',  bgColor: ''},
    { name: 'Completed',icon: 'assets/images/sprite-icons.svg#checked-icon', feildName: 'complated_cause', bgColor: 'bg-sky-1'},
    { name: 'Cancel',icon: 'assets/images/sprite-icons.svg#emergency-icon', feildName: 'cancel_cause', bgColor: 'bg-gray'},
    { name: 'ALS',icon: 'assets/images/sprite-icons.svg#heart-icon', feildName: 'fire_cause',  bgColor: 'bg-red-2'},
    { name: 'BLS',icon: 'assets/images/sprite-icons.svg#medical-icon', feildName: 'medical_cause', bgColor: 'bg-success-3'},
 ]

 exportXlsxColumns:any[]=[
 {
   headerName: 'Date&Time',
  field: 'datetime',
  filter: 'agNumberColumnFilter',
  floatingFilter: true,
  sortable: true,
  minWidth:30
},
{
  headerName: 'Cad Number',
  field: 'cadnumber',
  filter: 'agNumberColumnFilter',
  floatingFilter: true,
  sortable: true,
  minWidth:30
},
{
  headerName: 'Address',
  field: 'address',
  filter: 'agTextColumnFilter',
  floatingFilter: true,
  sortable: true,
  minWidth:70
},
{
  headerName: 'Hospital',
  field: 'hospital',
  filter: 'agTextColumnFilter',
  floatingFilter: true,
  sortable: true,
  minWidth:70
},
{
  headerName: 'Call Type',
  field: 'calltype',
  filter: 'agTextColumnFilter',
  floatingFilter: true,
  sortable: true,
  minWidth:30
},
{
  headerName: 'Units',
  field: 'units',
  sortable: true,
  minWidth:50
},
{
  headerName: 'Medics',
  field: 'medics',
  sortable: true,
  minWidth:30
},
{
  headerName: 'Drivers',
  field: 'drivers',
  sortable: true,
  minWidth:30
},
{
  headerName: 'Buses',
  field: 'medibusescs',
  sortable: true,
  minWidth:30
},


{
  headerName: 'Cancel/Dismiss Status',
  field: 'status',
  filter: 'agTextColumnFilter',
  floatingFilter: true,
  sortable: true,
  minWidth:30
},

{
  headerName: 'Disposition',
  field: 'disposition',
  filter: 'agTextColumnFilter',
  floatingFilter: true,
  sortable: true,
  minWidth:30
},
{
  headerName: 'Location Name',
  field: 'locationname',
  filter: 'agTextColumnFilter',
  floatingFilter: true,
  sortable: true,
  minWidth:40
}

 ]
  loading: boolean=false;

//  @HostListener("click", ['$event'])
//  clicked(event: any) {
//     if(!event.target.classList.contains('ag-cell-value')){
//       this.close();
//     }

//  }

// @HostListener('document:click', ['$event'])
//   documentClick(event: any): void {
//     if (event.currentTarget.activeElement !== this.callhistorysidenav) {
//       this.close();
//     }
//   }


  constructor(private callHistoryGridConfigService: CallHistoryGridConfigService,
    private authService: AuthService,
    private gridApiService:GridApiService,
    private callhistoryservice:CallHistoryService,
    private sideNavService:SidenavService,
    private snackBar:MatSnackBar,
    private gridActionService:GridActionsService){

      this.gridOptions=this.callHistoryGridConfigService.gridOptions;
      this.columnDefs=this.callHistoryGridConfigService.columnDefs;
      const index = this.columnDefs.findIndex(x => x.headerName == 'Action' && "Restore")
      if(index==-1){
        this.columnDefs.splice(24,0,{
          headerName: 'Action',
          sortable: true,
          cellRenderer: "actionsCellRendererComponent",
          minWidth: 80,
          pinned: 'right',
          cellRendererParams: {
            edit: (params) => {
              // this.callHistoryDetailData = params.data.id;
              this.sideNavService.openSidePanel({callHistoryDetail: params.data.id,isActionSidenav:true});
            }
          },
      });

      this.columnDefs.splice(3, 0,
        {
          headerName: 'Restore',
          filter: 'agTextColumnFilter',
          // floatingFilter: true,
          // sortable: true,
          minWidth:100,
          cellRenderer:"actionsCellRendererComponent",
          cellRendererParams: {
            restore: (params) => this.restoreCallHistory(params.data)
          },
        });

      }
      this.gridApiService.selectedRows$.pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
       if (res.node?.selected) {
        if(this.sideNavService.actionSidenav._animationState !== 'open'){
          this.sideNavService.openSidePanel({callHistoryDetail:  res.data.id,isActionSidenav:true});
        }else {
          this.sidePanelData =null;
          this.loading = true;

          this.sidePanelData = res?.data.id;
          setTimeout(() => {
            this.loading = false;
          }, 1250);
        }
         }
       });
      }


  ngAfterViewInit(): void {
     this.sideNavService.setSidenav(this.callhistorysidenav,true);
  }

  ngOnDestroy(): void {
    if(this.gridActionService.selectedRows.length > 0 || this.gridActionService.selectedRows.data != null){
      this.gridActionService.selectedRows.data = null;
      this.gridActionService.selectedRows.node.selected = false;
    }
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  ngOnInit(): void {
   this.userInfo =  this.authService.userInfo$.value.data.userInfoDto;
   this.tokenInfo =  this.authService.userInfo$.value.data.tokens;
   this.setDateFilter();
   this.callhistoryservice.GetCallHistoryCounts()
   .pipe(takeUntil(this.destroy$)).subscribe((response: any) => {
    this.callhistoryCounts=response.data
    this.callhistoryIcons.forEach((ele,i)=>{
    this.callhistoryIcons[i].value  = this.callhistoryCounts[ele.feildName]
   })

  });
   this.gridApiService.gridApi$
      .pipe(takeUntil(this.destroy$))
      .subscribe((e: GridOptions) => {
        this.gridApi = e.api;
        this.gridApi.setServerSideDatasource(this.dataSource);
      });

      this.sideNavService.actionSidenavData$
        .pipe(takeUntil(this.destroy$))
        .subscribe((res) => {
          if (res?.callHistoryDetail) {
            this.sidePanelData = res.callHistoryDetail;
          }
        });

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
      const memberReportViewModel: any = {
        currentLoggedInUser: this.tokenInfo.userID,
        endDate: this.endDate,
        isDispatchedCallsOnly: this.isDispatchedOnly ?? false,
        paginationParameter: params.request,
        quickFilter: this.searchText,
        startDate: this.startDate
      };
      params.request.SearchText = this.searchText;
      params.api.sizeColumnsToFit();

        this.callhistoryservice.GetCallHistory(params.request,
        this.columnDefs,
        memberReportViewModel).pipe(takeUntil(this.destroy$)).subscribe((response: any) => {
        if (response) {
          if (!response.data.items?.length) {
            this.gridApi.showNoRowsOverlay();
          } else {
            this.gridApi.hideOverlay();
          }
          this.Data =response.data.items;
          params.success({
            rowData: response.data.items,
            rowCount: response.data.paginationParameter?.totalRow,

          });
        }
      });
    },
  };

    restoreCallHistory(params){
      const payload={
        clientId:params.id
      }
     this.callhistoryservice.restoreCallToPreviousStatus(payload)
     .pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any)=>{
      if(res.succeeded == true){
        this.gridApi?.refreshServerSide({ route: [], purge: true });
        this.close();
      }
      this.snackBar.openFromComponent(SnackbarComponent,
        {
          duration: 3000,
          horizontalPosition: 'start',
          data: {
            title:'Restored Successfully',
            action: 'Dismiss',
            type: 'snackbar-success',
          },
        }
    );
      }

    })
}

close(): void {
  this.sideNavService.close(true);
}
setDateFilter() {
  ;
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  this.currentDateFilter = {
    to: today,
    from: yesterday,
    label: 'Yesterday'
  };
}



    public selectedDate(event) {
      this.startDate = event.from
      this.endDate = event.to
      this.gridApi?.setServerSideDatasource(this.dataSource);
    }


    updateDispatchedOnly(event){
      this.isDispatchedOnly = event;
      this.gridApi?.refreshServerSide({ route:[] , purge: true});
    }

    searchCallhistory(event){
       this.searchText=event;
      this.gridApi?.refreshServerSide({ route:[] , purge: true});


    }

    GetCallListExport(){
    const snackbar = this.snackBar.openFromComponent(SnackbarComponent, {
      duration: 1000000,
      horizontalPosition: 'center',
      data: {
        title: 'Preparing file for export...',
        action: 'Dismiss',
        type: 'info',
      },
  });

     this.downloadExcel(this.Data, this.exportXlsxColumns, snackbar, 'CallHistory-List-download.xlsx');
    }

    downloadExcel(data: any[], exportXlsxColumns: any[], snackbar, name = 'CallHistory-List-download.xlsx') {
      const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([[]]);
      const headers = exportXlsxColumns.map(column => column.headerName || column.field);
      XLSX.utils.sheet_add_aoa(ws, [headers], { origin: 'A1' });
      const formattedData = data.map(item =>
        exportXlsxColumns.map(column => item[column.field])
      );
      XLSX.utils.sheet_add_aoa(ws, formattedData, { origin: 'A2' });
      const columnWidths = exportXlsxColumns.map(column => ({ wch: column.minWidth || 10 })); // Default width: 10
      ws['!cols'] = columnWidths;
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, name);
      if (snackbar) {
        snackbar.dismiss();
      }
    }

}

