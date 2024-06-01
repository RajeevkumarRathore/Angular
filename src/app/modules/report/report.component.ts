import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GridApiService } from 'src/app/data-grid/grid-api.service';
import { ReportGridConfigService } from 'src/app/data-grid/report-grid-config.service';
import { GridOptions, IServerSideDatasource } from '@ag-grid-community/core';
import { Subject, takeUntil } from 'rxjs';
import * as html2pdf from 'html2pdf.js';
import { CallHistoryService } from 'src/app/services/call-history.service';
import { DatePickerModel } from 'src/app/common-components/date-picker/date-picker.model';
import { SidenavService } from 'src/app/services/sidenav.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatSidenav } from '@angular/material/sidenav';
import { ReportService } from 'src/app/services/report.service';
import { DatePipe } from '@angular/common';
import { SnackbarComponent } from 'src/app/common-components/snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HeaderService } from 'src/app/services/header.service';
import { MatDialog } from '@angular/material/dialog';
import { ThanksMessageToAllPopUpComponent } from './thanks-message-to-all-pop-up/thanks-message-to-all-pop-up.component';
import { MemberBydateSettingPopUpComponent } from './member-bydate-setting-pop-up/member-bydate-setting-pop-up.component';
import { GridActionsService } from 'src/app/data-grid/grid-actions.service';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit, OnDestroy {
  @ViewChild('reportDetailNav') public reportDetailNav: MatSidenav;
  private destroy$ = new Subject<void>();
  public gridApi: any;
  public gridOptions: GridOptions;
  public globalSearch: string;
  public apiLink;
  public gridRequestParams;
  public currentTab: string;
  private searchText = '';
  public columnDefs;
  public dateColumnDefs;
  public summaryColumnDefs;
  private _activeTab: string;
  public startDate = new Date();
  public endDate;
  public selectedRow: any;
  public callHistoryDetails: any[] = [];
  public callHistoryByBadgeDetail: any;
  public loading: boolean;
  element: any;
  countResponse: any;
  showReportDetail: boolean;
  membersDetails: any;
  memberActivity: any;
  sidePanelData: any;
  currentDateFilter: DatePickerModel;
  tokenInfo: any;
  userInfo: any;
  allExperties: any;
  experties: any;
  selectedMonthAndYear: any;
  spinner: boolean = false;
  get activeTab() {
    return this._activeTab;
  }

  set activeTab(tab: string) {
    this._activeTab = tab;
    this.setDateFilter();
    this.selectPage(this._activeTab);
  }

  reportIcons: any[] = [
    {
      name: 'Total Calls',
      icon: 'assets/images/sprite-icons.svg#phone-icon',
      feildName: 'Total Calls',
      bgColor: ' ',
    },
    {
      name: 'Total Transport',
      icon: 'assets/images/sprite-icons.svg#abulance-icon',
      feildName: 'Total Transport',
      bgColor: 'bg-primary-2',
    },
    {
      name: 'Calls With Medics',
      icon: 'assets/images/sprite-icons.svg#medical-icon',
      feildName: 'Calls With Medics',
      bgColor: 'bg-success-3',
    },
    {
      name: 'ALS Calls',
      icon: 'assets/images/sprite-icons.svg#call-icon',
      feildName: 'ALS Calls',
      bgColor: 'bg-gray',
    },
    {
      name: 'Night Calls',
      icon: 'assets/images/sprite-icons.svg#night-call-icon',
      feildName: 'Night Calls',
      bgColor: 'bg-light-dark',
    },
    {
      name: 'Fast Responded Calls',
      icon: 'assets/images/sprite-icons.svg#checked-icon',
      feildName: 'Fast Responded Calls',
      bgColor: 'bg-sky-1',
    },
  ];

  constructor(
    private reportGridConfigService: ReportGridConfigService,
    private gridApiService: GridApiService,
    private reportService: ReportService,
    private callHistoryService: CallHistoryService,
    private authService: AuthService,
    private sideNavService: SidenavService,
    private datePipe: DatePipe,
    private cdr: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    private headerService:HeaderService,
    private dialog:MatDialog,
    private gridActionService: GridActionsService
  ) {
    this.gridApiService.selectedRows$.subscribe((res) => {
      if (res?.node?.selected) {
        this.selectedRow = res.data;
        this.getMemberCallHistoryReport();
        //this.getMemberCallHistoryReportByBadge();
      } else {
        this.callHistoryDetails = [];
        this.callHistoryByBadgeDetail = [];
      }
    });
  }

  ngOnDestroy(): void {
    if(this.gridActionService.selectedRows.length > 0|| this.gridActionService.selectedRows.data != null){
      this.gridActionService.selectedRows.data = null;
      this.gridActionService.selectedRows.node.selected = false;
    }
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  ngOnInit(): void {
    this. getExperties();
    this.activeTab = 'Members';
    this.gridApiService.gridApi$
      .pipe(takeUntil(this.destroy$))
      .subscribe((e: GridOptions) => {
        this.gridApi = e.api;
        this.gridApi.setServerSideDatasource(this.dataSource);
      });
    this.userInfo = this.authService.userInfo$.value.data.userInfoDto;
    this.tokenInfo = this.authService.userInfo$.value.data.tokens;

    this.sideNavService.actionSidenavData$
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res?.report) this.sidePanelData = res.report;
      });

      this.reportService.selectedMonthAndYear$.pipe(takeUntil(this.destroy$)).subscribe({
        next: (res: any)=>{
          this.selectedMonthAndYear = this.datePipe.transform(res?._d, 'MM/yyyy');
        }
      })
  }

  public dataSource: IServerSideDatasource = {
    getRows: (params: any) => {
      this.gridRequestParams = params.request;
      params.request.SearchText = this.searchText;
      params.api.sizeColumnsToFit();
      this.selectPage(this.currentTab);
      this.apiLink?.subscribe((response: any) => {
        if (response) {
          this.countResponse = response.data.items[0].counts;
          this.countResponse.forEach((element) => {
            this.reportIcons.forEach((ele, i) => {
              if (ele.feildName == element.textValue)
                this.reportIcons[i].value = element.total;
            });
          });
          if (!response.data.items[0]?.members?.length) {
            this.gridApi.showNoRowsOverlay();
          } else {
            this.gridApi.hideOverlay();
          }
          params.success({
            rowData: response.data.items[0]?.members,
            rowCount: response.data.totalCount,
          });
        }
      });
    },
  };

  public tabClicked(e) {
    this.activeTab = e;
    this.setDateFilter();
  }

  setDateFilter() {
    const today = new Date();
    const oneYearAgo = new Date(today);
    oneYearAgo.setFullYear(today.getFullYear() - 1);
    switch (this.activeTab) {
      case 'Members':
        this.currentDateFilter = {
          to: today,
          from: today,
          label: 'Today',
        };
        break;
      case 'By Date':
        this.currentDateFilter = {
          to: today,
          from: new Date(today.getTime() - this.getDaysAgo(30)),
          label: 'Last 30 Days',
        };

        break;
      case 'Summary':
        this.currentDateFilter = {
          to: today,
          from: oneYearAgo,
          label: 'Last 365 Days',
        };
        break;
      default:
        this.currentDateFilter = {
          to: today,
          from: new Date(today.getTime() - this.getDaysAgo(30)),
          label: 'Last 30 Days',
        };
        break;
    }
  }

  public selectPage(page) {
    this.selectedRow = null;
    this.callHistoryDetails = [];
    this.gridOptions = this.reportGridConfigService.gridOptions;
    const body =
      this.gridRequestParams && this.currentTab === page
        ? this.gridRequestParams
        : { startRow: 0, endRow: 100 };
    if (page == 'Members') {
      this.columnDefs = this.reportGridConfigService.columnDefs;
      this.getMembersReportByDateRange(body, false);
    } else if (page === 'By Date') {
      this.columnDefs = this.reportGridConfigService.dateColumnDefs;
      this.getMembersReportByDateRange(body, true);
    } else if (page === 'Summary') {
      this.columnDefs = this.reportGridConfigService.summaryColumnDefs;
      this.getMembersSummaryForReport(body);
    }
    if (this.currentTab !== page) {
      this.currentTab = page;
      this.gridApi?.deselectAll();
      this.gridApi?.refreshServerSide({ route: [], purge: true });
    }
  }

  public getMembersReportByDateRange(body, byDate) {
    const fromTime = this.datePipe.transform(this.startDate, 'MM/dd/yyyy');
    let toTime = this.datePipe.transform(this.endDate, 'MM/dd/yyyy');
    if (toTime == null && this.currentTab == 'Members') {
      const newToTime = new Date();
      toTime = this.datePipe.transform(newToTime, 'MM/dd/yyyy');
    } else if (toTime == null && this.currentTab == 'By Date') {
      const newToTime = new Date(
        this.startDate.getTime() - this.getDaysAgo(30)
      );
      toTime = this.datePipe.transform(newToTime, 'MM/dd/yyyy');
    }
    const memberReportViewModel: any = {
      fromTime: fromTime,
      toTime: toTime,
      dayFromTime: '00:00',
      dayToTime: '00:00',
      nightFromTime: '00:00',
      nightToTime: '00:00',
      byDate: byDate,
      isNSCoordinator: false,
    };
    this.apiLink = this.reportService.getMembersReportByDateRange(
      body,
      this.columnDefs,
      memberReportViewModel
    );
  }

  public getMembersSummaryForReport(body) {
    const now = this.datePipe.transform(this.startDate, 'yyyy');
    const membersSummaryReportViewModel: any = {
      year: Number(now),
      getMemberCallHistoryReportByBadge: false,
    };
    this.apiLink = this.reportService.getMembersSummaryForReport(
      body,
      this.columnDefs,
      membersSummaryReportViewModel
    );
  }

  public selectedDate(event) {
    if(this.currentTab != 'Summary'){

    this.startDate = event.from
    this.endDate = event.to
    }else{
      const currentYear = event?._d ? event._d.getFullYear() : event.to.getFullYear();
      this.startDate = new Date(currentYear, 0, 1);
      this.endDate = new Date(currentYear, 11, 31)
    }
    this.gridApi?.setServerSideDatasource(this.dataSource);
  }


  public getDaysAgo(amountOfDays: number): number {
    return amountOfDays * 24 * 60 * 60 * 1000;
  }



  public printCallHistory() {
    this.loading = true;
    setTimeout(() => {
      this.printReport();
    }, 50);
  }


  public printReport() {
    this.loading = true;
    setTimeout(() => {
        const printElement: any = document.getElementById('printId');
        const printWindow: any = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
        printWindow.document.write(document.documentElement.innerHTML)
        setTimeout(() => {
          printWindow.document.body.style.margin = '0 0';
          printWindow.document.body.innerHTML = printElement.outerHTML;
          printWindow.document.close();
          printWindow.focus();
          printWindow.print();
          printWindow.close();
        }, 100);
        return;
          },50);
        this.loading = false;
          this.cdr.detectChanges();
  //         const style = document.createElement("style");
  // style.textContent = `body { background: #fff; }`;
  // document.head.appendChild(style);

  // const element2 = document.querySelector("body");
    const element = document.getElementById('');
    const options = {
      margin: [0.5, 0.5, 0.5, 0.5],
      filename: 'CallHistory.pdf',
      pagebreak: { avoid: ['div', 'p', 'span', '.page-break'] },
      html2canvas: { dpi: 96, scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait',header: () => {}, footer: () => {}},
    };
    html2pdf()
      .from(element)
      // .from(element2)
      .set(options)
      .toPdf()
      .get('pdf')
      .then((pdf: any) => {
        const totalPages = pdf.internal.getNumberOfPages();
        for (let i = 1; i <= totalPages; i++) {
          // Header
          if (i === 1) {
            pdf.setPage(i);
            pdf.setFontSize(16);
            pdf.setFontStyle('bold');
            pdf.setTextColor(0);
          }
        }
      });

  }

  // private printOrder(orderNumber:any) {
  //   this.toasterService.showError('Preparing the Document');
  //   this.cdr.detectChanges();
  //   const element = document.getElementById("print-order");
  //   const options = {
  //     //margin: [0.5],
  //     margin: [0.5, 0.5, 0.5, 0.5],
  //     filename: "Order_"+ orderNumber + ".pdf",
  //     //pagebreak: { avoid: ['tr','div','.page-break'] },
  //     pagebreak: { mode: [ 'css', 'legacy'], after:'.page-break'},
  //      html2canvas: { scale: 2, useCORS: true},
  //      //html2canvas: { scale: 2, letterRendering: true },
  //      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
  //      //jsPDF: { unit: "in", format: "Letter", orientation: "portrait" },
  //   };
  //   html2pdf()
  //     .from(element)
  //     .set(options)
  //     .toPdf()
  //     .get("pdf")
  //     .then((pdf: any) => {

  //       const totalPages = pdf.internal.getNumberOfPages();
  //       for (let i = 1; i <= totalPages; i++) {
  //         // Header
  //         if (i === 1) {
  //          pdf.setPage(i);
  //         pdf.setFontSize(16);
  //         pdf.setFontStyle("bold");
  //         pdf.setTextColor(0);
  //       }
  //      }
  //       window.open(pdf.output("bloburl"), "_blank");
  //       this.printOrderResponse = null
  //     });


  // }


  public getMemberCallHistoryReport() {
    this.spinner = true;
    let payload: any;
    let startDate = this.datePipe.transform(this.startDate, 'MM/dd/yyyy');
    let endDate = this.datePipe.transform(this.endDate, 'MM/dd/yyyy');
    if (this.currentTab === 'By Date') {
      payload = {
        isMember: false,
        badgeNumber: null,
        fromTime: this.selectedRow.date,
        toTime: this.selectedRow.date,
      };
    } else {
      payload = {
        badgeNumber: this.selectedRow.badge_number,
        fromTime:startDate,
        toTime: this.endDate
          ? endDate
          : new Date(this.startDate.getTime() - this.getDaysAgo(30)),
        isMember:
          this.currentTab === 'Members' || this.currentTab === 'Summary',
      };
    }

    this.callHistoryService
      .getMemberCallHistoryReport(payload)
      .subscribe((res: any) => {
        ;
        this.callHistoryDetails = res?.data;
        this.callHistoryDetails.forEach((element) => {
          if (element.medics) {
            element.medics = element.medics?.split(',').map(el => el.trim()).filter(el => el !== '');
          }

          if (element.drivers) {
            element.drivers = element.drivers?.split(',').map(el => el.trim()).filter(el => el !== '');
          }

          if (element.buses) {
            element.buses = element.buses?.split(',').map(el => el.trim()).filter(el => el !== '');
          }

          if (element.allOtherMembers) {
            element.allOtherMembers = element.allOtherMembers?.split(',').map(el => el.trim()).filter(el => el !== '');
          }
          if (element.medics) {
            element.medics = element.medics.filter(item => {
              return !(
                (element?.buses && element.buses.includes(item)) ||
                (element?.drivers && element.drivers.includes(item))
              );
            });
          }
          if (element.drivers) {
            element.drivers = element.drivers.filter(item => {
              return !(
                (element?.buses && element.buses.includes(item)) ||
                (element?.medics && element.medics.includes(item))
              );
            });
          }
          if (element.buses) {
            element.buses = element.buses.filter(item => {
              return !(
                (element?.drivers && element.drivers.includes(item)) ||
                (element?.medics && element.medics.includes(item))
              );
            });
          }
          if (element.allOtherMembers) {
            element.allOtherMembers = element.allOtherMembers.filter(item => {
              return !(
                (element?.buses && element.buses.includes(item)) ||
                (element?.drivers && element.drivers.includes(item)) ||
                (element?.medics && element.medics.includes(item))
              );
            });
          }
        });
        this.spinner = false;
      });
  }

  public getMemberCallHistoryReportByBadge() {
    const payload = {
      badgeNumber: this.selectedRow.badge_number,
      fromTime: this.startDate,
      toTime: this.endDate
        ? this.endDate
        : new Date(this.startDate.getTime() - this.getDaysAgo(30)),
    };
    this.callHistoryService
      .getMemberCallHistoryReportByBadge(payload)
      .subscribe((res: any) => {
        this.callHistoryByBadgeDetail = res.data.dataList;
      });
  }

  GetCallHistoryDetail(item) {
    const payload = {
      id: item.id,
    };
    this.reportService
      .GetCallHistoryDetail(payload)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: any) => {
        this.memberActivity = res.data;
        this.sideNavService.setSidenav(this.reportDetailNav, true);
        if (this.tokenInfo.userID) {
          var itemId = this.tokenInfo.userID;
          this.sideNavService.openSidePanel({
            report: itemId,
            isActionSidenav: true,
          });
        }
      });
  }

  close() {
    this.showReportDetail = false;
  }

  filterReportGrids(event) {
    this.searchText = event;
    this.selectPage(this.currentTab);
    this.gridApi?.refreshServerSide({ route: [], purge: true });
  }

  sendsMessageToAll() {
    const message = this.experties
  ? `Do you want to send thank you messages to <strong>${this.experties}</strong> members?`
  : 'Do you want to send thank you messages to <strong>all</strong> members?';
      this.dialog
      .open(ThanksMessageToAllPopUpComponent, {
        width: "428px",
        data: {
          sendMessage:"sendMessage",
          message: message,
        },
      })
      .afterClosed()
      .subscribe((res) => {
        if (res === "Yes, send it!"){
            let monthAndYear = this.datePipe.transform(this.startDate, 'MM/yyyy');
            const payload = {
              experties: this.experties?? "",
              monthAndYear: this.selectedMonthAndYear??monthAndYear,
            };
            this.reportService
            .SendThankyouMessageToAll(payload)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
              next: (res: any) => {
                ;
                if (res.message == 'Success') {
                  this.snackBar.openFromComponent(SnackbarComponent, {
                    duration: 3000,
                    horizontalPosition: 'start',
                    data: {
                      title: 'Thanks Message Sent To All  SuccessFully',
                      action: 'success',
                      type: 'snackbar-success',
                },
            });
          }
        },
      });
          }
        }
    );
  }

  getExperties() {
    this.headerService.GetAll().pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any) => {
        this.allExperties = res.data;
      },
    });
}

getSelectedExpertise(event){
  this.experties=event
  this.dialog
  .open(ThanksMessageToAllPopUpComponent, {
    width: "300px",
    data: {
     selecteexperties:"selecteexperties",
      message: "Thank you message will be sent to <strong>"+event+"</strong> Members",
    }
  })
  .afterClosed()
  .subscribe((res) => {

        });
      }

      openSettingBox(){
        this.dialog
        .open(MemberBydateSettingPopUpComponent, {
          width: "500px"

        })
      }

}


