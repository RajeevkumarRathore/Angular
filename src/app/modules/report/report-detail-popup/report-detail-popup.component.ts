import { ChangeDetectorRef, Component, EventEmitter, Inject, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
// @ts-ignore
import * as html2pdf from 'html2pdf.js';
import { Subject, takeUntil } from 'rxjs';
import { SnackbarComponent } from 'src/app/common-components/snackbar/snackbar.component';
import { ReportService } from 'src/app/services/report.service';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
  selector: 'app-report-detail-popup',
  templateUrl: './report-detail-popup.component.html',
  styleUrls: ['./report-detail-popup.component.scss']
})
export class ReportDetailPopupComponent implements OnInit,OnDestroy,OnChanges {
 @Input() membersDetails:any;
 @Output() Close = new EventEmitter();
 private destroy$ = new Subject<void>();
  public loading: boolean;
  clientActivityLogs: any;
  callHistoryNotes: any;
  audio = new Audio();
  addNotes: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data,
  public dialogRef: MatDialogRef<ReportDetailPopupComponent>,
  private reportService: ReportService,
  private sideNavService:SidenavService,
  private snackBar: MatSnackBar,
  private cdr: ChangeDetectorRef){
  }


  ngOnChanges(changes: SimpleChanges): void {
    this.getClientActivityLogs();
    this.getCallHistoryNotes();
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }


  ngOnInit(): void {}

  close(data): void {
    this.sideNavService.close(true);
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
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait',header: () => {}, footer: () => {}  },
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


  getClientActivityLogs(){
    const payload = {
      clientId: this.membersDetails?.id
    }
    this.reportService.getClientActivityLogs(payload).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any)=>{
        this.clientActivityLogs = res.data;

      }
    })
  }

  getCallHistoryNotes(){
    const payload = {
      clientId: this.membersDetails?.id
    }
    this.reportService.getCallHistoryNotes(payload).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any)=>{
        this.callHistoryNotes = res.data;

      }
    })
  }

  addCallHistoryNote(membersDetails){
    if(this.addNotes != null && this.addNotes != ''){
      const payload = {
        clientId: membersDetails.id,
        note: this.addNotes,
        createdBy: membersDetails.createdBy
      }
      this.reportService.addCallHistoryNote(payload).pipe(takeUntil(this.destroy$)).subscribe({
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

  changeMemberType(item: any, type: string){

    const payload = {
      clientId: this.membersDetails?.id,
      memberId: item.memberId,
      type: type,
      isNotificationTemporarySwitchOn: false,
      checkedStatus: false
    }
    this.reportService.changeMemberType(payload).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any)=>{
        if(res.succeeded === true){
        this.GetCallHistoryDetail()
        }else{
          this.snackBar.openFromComponent(SnackbarComponent,
            {
              duration: 3000,
              horizontalPosition: 'center',
              data: {
                title: res.messages.length == 0 ? res.errors[0] : res.messages[0],
                action: 'Dismiss',
                type: 'snackbar-warning',
              },
            }
        );
        }
      }
    })
  }

  GetCallHistoryDetail() {
    const payload = {
      id: this.membersDetails?.id,
    };
    this.reportService
      .GetCallHistoryDetail(payload)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: any) => {
        this.membersDetails = res.data;
        this.getClientActivityLogs();
      });
  }

  public selectedIndexChange(event: any) {

    if(event === 0){
      this.getClientActivityLogs();
    }else if(event === 1){
      this.getCallHistoryNotes();
    }
  }

}
