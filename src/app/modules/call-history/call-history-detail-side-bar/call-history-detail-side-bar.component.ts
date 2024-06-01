import { ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as html2pdf from 'html2pdf.js';
import { Subject, takeUntil } from 'rxjs';
import { SnackbarComponent } from 'src/app/common-components/snackbar/snackbar.component';
import { GridActionsService } from 'src/app/data-grid/grid-actions.service';
import { CallHistoryService } from 'src/app/services/call-history.service';
import { SidenavService } from 'src/app/services/sidenav.service';
@Component({
  selector: 'app-call-history-detail-side-bar',
  templateUrl: './call-history-detail-side-bar.component.html',
  styleUrls: ['./call-history-detail-side-bar.component.scss']
})

export class CallHistoryDetailSideBarComponent implements OnInit,OnDestroy{

  private _callHistoryData;
  callHistoryDetailData: any;
  @Input() get callHistoryData() {
    return this._callHistoryData;
  }

  set callHistoryData(value) {

    this._callHistoryData = value;
    if(this._callHistoryData) this.editCallHistory(this._callHistoryData)
  }
    public loading: boolean;
    selectedHospital: any;
    EventOptions:any;
    private destroy$ = new Subject<void>();
    callhistorymembersDetails: any;
    callhistoryClientActivityLogs: any;
    hospital = new FormControl("");
    dismissedEvent= new FormControl("");
    callHistoryNotes: any;
    addNotes: any;
    constructor(  private cdr: ChangeDetectorRef,
    private callhistoryservice:CallHistoryService,
    private snackBar:MatSnackBar,
  private sideNavService:SidenavService,
  private gridActionService:GridActionsService){

    }


  ngOnInit(): void {

  }

editCallHistory(callHistoryId){
  const payload = {
    id: callHistoryId,
  };
  this.callhistoryservice
    .GetCallHistoryDetail(payload).pipe(takeUntil(this.destroy$))
    .subscribe((res: any) => {
      this.callHistoryDetailData = res.data;
      this.getClientActivityLogs();
      this.getCallHistoryNotes();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
    this.sideNavService.close();
  }

  changeMemberType(item: any, type: string){
        const payload = {
        clientId: this.callHistoryDetailData?.id,
        memberId: item.memberId,
        type: type,
        isNotificationTemporarySwitchOn: false,
        checkedStatus: false
      }
      this.callhistoryservice.changeMemberType(payload).pipe(takeUntil(this.destroy$)).subscribe({
          next: (res: any)=>{
            if(res.succeeded === true){
              this.GetCallHistoryDetail();
            }else{
            this.snackBar.openFromComponent(SnackbarComponent,
              {
                duration: 3000,
                horizontalPosition: 'center',
                data: {
                  title: res.messages.length > 0 ? res.messages : res.errors[0],
                  action: 'Dismiss',
                  type: 'snackbar-warning',
                },
              }
            );
            }
          }
        })
    }

    public printCallHistory() {
      this.loading = true;
      setTimeout(() => {
        this.printCallHistoryDetail();
      }, 50);
    }


    public printCallHistoryDetail() {
      this.loading = true;
      setTimeout(() => {
          const printElement: any = document.getElementById('printDetailsId');
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


      GetCallHistoryDetail() {
        const payload = {
          id: this.callHistoryDetailData?.id,
        };
        this.callhistoryservice
          .GetCallHistoryDetail(payload)
          .pipe(takeUntil(this.destroy$))
          .subscribe((res: any) => {
            this.callHistoryDetailData = res.data;
            this.getClientActivityLogs();
          });
      }


      getClientActivityLogs(){
        const payload = {
          clientId: this.callHistoryDetailData?.id
        }
        this.callhistoryservice.getClientActivityLogs(payload).pipe(takeUntil(this.destroy$)).subscribe({
          next: (res: any)=>{
            this.callhistoryClientActivityLogs = res.data;

          }
        })
      }
      public selectedIndexChange(event: any) {

        if(event === 0){
          this.getClientActivityLogs();
        }else if(event === 1){
          this.getCallHistoryNotes();
        }
      }


      getCallHistoryNotes(){
        const payload = {
          clientId: this.callHistoryDetailData?.id
        }
        this.callhistoryservice.getCallHistoryNotes(payload).pipe(takeUntil(this.destroy$)).subscribe({
          next: (res: any)=>{
            this.callHistoryNotes = res.data;

          }
        })
      }

      addCallHistoryNote(callHistoryDetailData){
        if(this.addNotes != null && this.addNotes != ''){
          const payload = {
            clientId: callHistoryDetailData.id,
            note: this.addNotes,
            createdBy: callHistoryDetailData.createdBy
          }
          this.callhistoryservice.addCallHistoryNote(payload).pipe(takeUntil(this.destroy$)).subscribe({
            next: (res: any)=>{
              this.addNotes = null;
              this.getCallHistoryNotes();
            }
          })
        }else{
          this.snackBar.openFromComponent(SnackbarComponent,
            {
              duration: 1000,
              horizontalPosition: 'right',
              data: {
                title: "Note is empty !",
                action: 'Dismiss',
                type: 'snackbar-warning',
              },
            }
          );
        }
      }

    close(data) {
      this.sideNavService.close(true);
      this.gridActionService.deselectAllRow();
    }

      }
