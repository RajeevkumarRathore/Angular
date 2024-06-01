import { GridOptions, IServerSideDatasource } from '@ag-grid-community/core';
import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { Subject, takeUntil } from 'rxjs';
import { GridApiService } from 'src/app/data-grid/grid-api.service';
import { MembersGridConfigService } from 'src/app/data-grid/members-grid-config.service';
import { AuthService } from 'src/app/services/auth.service';
import { MemberService } from 'src/app/services/member.service';
import { SidenavService } from 'src/app/services/sidenav.service';
import { AddNewMemberPopUpComponent } from '../add-new-member-pop-up/add-new-member-pop-up.component';
import { ConfirmDialogComponent } from 'src/app/common-components/confirm-dialog/confirm-dialog.component';
import { SnackbarComponent } from 'src/app/common-components/snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GridActionsService } from 'src/app/data-grid/grid-actions.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit, OnDestroy,AfterViewInit{
  @ViewChild('memberSidenav') public memberSidenav: MatSidenav;
  private destroy$ = new Subject<void>();
  sidePanelData: any;
  public gridRequestParams;
  searchText: string = '';
  public gridApi: any;
  public columnDefs;
  public gridOptions;
  userInfo:any;
  tokenInfo: any;
  params: any;
  @ViewChild('ItemGrid') itemGrid: MembersComponent;
  memberCounts: any;
  callTextOnOff: any;
  notificationsOnOff: any;
  memberDetail: any[] = [];
  filterColumnsDataList: any;
  memberIcons: any[] = [
    { name: 'Total Member',icon: 'assets/images/sprite-icons.svg#siren-icon', feildName: 'total_member',bgColor: 'bg-primary-2'},
    { name: 'Units',icon: 'assets/images/sprite-icons.svg#checked-icon', feildName: 'units',  bgColor: 'bg-sky-1'},
    { name: 'Medics',icon: 'assets/images/sprite-icons.svg#fire-icon', feildName: 'medics', bgColor: 'bg-red-2'},
    { name: 'Drivers',icon: 'assets/images/sprite-icons.svg#medical-icon', feildName: 'drivers', bgColor: 'bg-success-3'},
    { name: 'Other',icon: 'assets/images/sprite-icons.svg#phone-icon', feildName: 'other',  bgColor: ''},
    { name: 'Buses',icon: 'assets/images/sprite-icons.svg#emergency-icon', feildName: 'buses', bgColor: 'bg-gray'},
 ]
  selectedRow: any;
  loading:boolean=false
  constructor(private sideNavService:SidenavService,
    private membersGridConfigService: MembersGridConfigService,
    private memberService: MemberService,
    private gridApiService: GridApiService,
    private authService:AuthService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private gridActionService: GridActionsService)
    {
      this.gridOptions = this.membersGridConfigService.gridOptions;
      this.columnDefs = this.membersGridConfigService.columnDefs;
      const index = this.columnDefs.findIndex(x => x.headerName == 'Action' && "Is Dispatcher" && "Is Bus/Engine" && "Is Base" && "Is Base")
      if(index == -1){
      this.columnDefs.splice(14, 0,
        {
          headerName: 'Action',
          sortable: true,
          cellRenderer:"actionsCellRendererComponent",
          minWidth:120,
          pinned: 'right',
          cellRendererParams: {
            edit: (params) =>{
              this.sideNavService.openSidePanel({members: params.data,isActionSidenav:true});
            } ,

            delete: (params) => this.deleteMembers(params.data)
          }
        });
      this.columnDefs.splice(6, 0,
        {
          headerName: "Is Dispatcher",
          field: 'isDispatcher',
          filter: 'agNumberColumnFilter',
          floatingFilter: true,
          sortable: true,
          cellRenderer: "toggleCellRendererComponent",
          cellRendererParams: {
            props: {
              col: 'isDispatcher'
            },
            updateToggle: (params) => this.updateIsDispatcher(params.data)
          },
        });
      this.columnDefs.splice(11, 0,
        {
          headerName: "Is NS Unit",
          field: 'isNsUnit',
          filter: 'agNumberColumnFilter',
          floatingFilter: true,
          sortable: true,
          cellRenderer: "toggleCellRendererComponent",
          cellRendererParams: {
            props: {
              col: 'isNsUnit'
            },
            updateToggle: (params) => this.updateIsNsUnit(params.data)
          },
        });
      this.columnDefs.splice(12, 0,
        {
          headerName: "Is Bus/Engine",
          field: 'isBus',
          filter: 'agNumberColumnFilter',
          floatingFilter: true,
          sortable: true,
          cellRenderer: "toggleCellRendererComponent",
          cellRendererParams: {
            props: {
              col: 'isBus'
            },
            updateToggle: (params) => this.updateIsBus(params.data)
          },
        });
      this.columnDefs.splice(13, 0,
          {
            headerName: "Is Base",
            field: 'isBase',
            filter: 'agNumberColumnFilter',
            floatingFilter: true,
            sortable: true,
            cellRenderer: "toggleCellRendererComponent",
            cellRendererParams: {
              props: {
                col: 'isBase'
              },
              updateToggle: (params) => this.updateIsBase(params.data)
            },
        });
      }
      this.sideNavService.actionSidenavData$
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        if(res?.members && res !== null)
        this.sidePanelData = res.members;
      });
      this.gridApiService.selectedRows$
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if(res){
          this.selectedRow = res.data;

          if (res?.node?.selected) {
            if (this.sideNavService.actionSidenav._animationState !== 'open') {
              this.sideNavService.openSidePanel({
                members: res.data,
                isActionSidenav: true
              });
            } else {
              this.sidePanelData =null;
              this.loading = true;

              this.sidePanelData = res?.data;
              setTimeout(() => {
                this.loading = false;
              }, 1250);
            }
          }
        }
      });

    }

  ngAfterViewInit(): void {
   this.sideNavService.setSidenav(this.memberSidenav,true);
  }


  ngOnDestroy(): void {
    if(this.gridActionService.selectedRows.length > 0 || this.gridActionService.selectedRows.data != null){
      this.gridActionService.selectedRows.data = null;
      this.gridActionService.selectedRows.node.selected = false;
    }
    this.destroy$.next(null);
    this.destroy$.unsubscribe();
  }

  ngOnInit(): void {
    this.userInfo =  this.authService.userInfo$.value.data.userInfoDto;
    this.tokenInfo =  this.authService.userInfo$.value.data.tokens;
    this.getCallTextOnOffStatus();
    this.getNotificationsOnOffStatus();
    this.getMemberCounts();
    this.gridApiService.gridApi$
      .pipe(takeUntil(this.destroy$))
      .subscribe((e: GridOptions) => {
        this.gridApi = e.api;
        this.gridApi.setServerSideDatasource(this.dataSource);
    });
    this.memberService.refreshMemberDetail$.subscribe((res) => {
      if(res == true)
      this.gridApi?.refreshServerSide({ route: [], purge: true });
    })
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
        quickFilter: this.searchText,
        paginationParameter: params.request
      };
      // this.gridRequestParams = params.request;
      params.request.SearchText = this.searchText;
      params.api.sizeColumnsToFit();
      this.memberService.GetMembers(
        params.request,
        this.columnDefs,
        memberReportViewModel
      ).pipe(takeUntil(this.destroy$)).subscribe((response: any) => {
        if (response) {
          if (!response.data.items?.length) {
            this.gridApi.showNoRowsOverlay();
          } else {
            this.gridApi.hideOverlay();
          }
        params.success({
          rowData: response.data.items,
          rowCount: response.data.totalCount,
        });
        }
      });
    },
  };

  close(): void {
    this.sideNavService.close(true);
  }

  deleteMembers(params){
    this.dialog
    .open(ConfirmDialogComponent, {
      width: "400px",
      data: {
        title: "Delete Member",
        message: "Do you want to delete this member?",
      },
    })
    .afterClosed()
    .subscribe((res) => {
      if (res === "Confirm"){
    const payload = {
      user_id: params.user_id
    }
    this.memberService.deleteMember(payload).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any)=>{
        this.gridApi?.refreshServerSide({ route: [], purge: true });
        this.snackBar.openFromComponent(SnackbarComponent,
          {
            duration: 3000,
            horizontalPosition: 'center',
            data: {
              title: 'Member Deleted successfully',
              action: 'Dismiss',
              type: 'snackbar-success',
            },
          }
      );
      }
     })
    }
   })
  }


  updateIsDispatcher(params){
    const payload = {
      user_id: params.user_id,
      isDispatcher: params.isDispatcher
    }
    this.memberService.updateIsDispatcher(payload).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any)=>{
        //if(res.data == true)
        //this.gridApi?.refreshServerSide({ route: [], purge: true });
      }
    })
  }

  updateIsNsUnit(params){
    const payload = {
      user_id: params.user_id,
      isNsUnit: params.isNsUnit
    }
    this.memberService.updateIsNsUnit(payload).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any)=>{
        //if(res.data == true)
        //this.gridApi?.refreshServerSide({ route: [], purge: true });
      }
    })
  }

  updateIsBus(params){
    const payload = {
      user_id: params.user_id,
      isBus: params.isBus
    }
    this.memberService.updateIsBus(payload).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any)=>{
        //if(res.data == true)
        //this.gridApi?.refreshServerSide({ route: [], purge: true });
      }
    })
  }

  updateIsBase(params){
    const payload = {
      user_id: params.user_id,
      isBase: params.isBase
    }
    this.memberService.updateIsBase(payload).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any)=>{
        //if(res.data == true)
        //this.gridApi?.refreshServerSide({ route: [], purge: true });
      }
    })
  }

  getCallTextOnOffStatus(){
    this.memberService.getCallTextOnOffStatus().pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any)=>{
        this.callTextOnOff = res.data.isCallTextOn
      }
    })
  }

  updateCallTextOnOffStatus(event){
    const payload ={
      isCallTextOn: event
    }
    this.memberService.updateCallTextOnOffStatus(payload).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any)=>{}
    })
  }

  getNotificationsOnOffStatus(){
    this.memberService.getNotificationsOnOffStatus().pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any)=>{
        this.notificationsOnOff = res.data.isGeneralNotificationsOn
      }
    })
  }

  updateGeneralNotificationsOnOffStatus(event){
    const payload ={
      isGeneralNotificationsOn: event
    }
    this.memberService.updateGeneralNotificationsOnOffStatus(payload).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any)=>{}
    })
  }

  searchMember(event){
    this.searchText = event;
    this.gridApi?.refreshServerSide({ route: [], purge: true });
  }

  addNewMember(){
    this.dialog
      .open(AddNewMemberPopUpComponent, {
        autoFocus: false,
        width: '600px',
      })
      .afterClosed()
      .subscribe((e: any) => {
        if(e == 'Saved'){
          this.gridApi?.refreshServerSide({ route: [], purge: true });
          this.getMemberCounts();
        }
      });
  }

  getMemberCounts(){
    this.memberService.getMemberCounts().pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any)=>{
        this.memberCounts = res.Value.data;
         this.memberIcons.forEach((ele,i)=>{
         this.memberIcons[i].value  = this.memberCounts[ele.feildName]
        })
      }
    })

  }
}
