import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-pcr-summary-pop-up',
  templateUrl: './pcr-summary-pop-up.component.html',
  styleUrls: ['./pcr-summary-pop-up.component.scss'],
})
export class PcrSummaryPopUpComponent implements OnInit {
  title = this.data.isOpenPcr == true ? 'Open PCRs' : 'Completed PCRs';
  showButton;
  spin = false;
  pcrData: any;
  pcrdatetime: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<PcrSummaryPopUpComponent>,
    private dashboardService: DashboardService,
    private datePipe: DatePipe
  ) {
    this.showButton = this.data.isOpenPcr;
    console.log(this.data);
  }
  ngOnInit(): void {
    this.GetOpenCompletedPcrByBadgeNumber();
  }

  action(e) {
    if (e == 'Reminder') {
    } else {
      this.dialogRef.close();
    }
  }

  close() {
    this.dialogRef.close();
  }

  approvePcr() {}

  GetOpenCompletedPcrByBadgeNumber() {
    const payload = {
      badgeNumber: this.data.data.Member,
      isOpenPcr: this.data.isOpenPcr,
    };
    this.dashboardService.GetOpenCompletedPcrByBadgeNumber(payload).subscribe({
      next: (res: any) => {
        this.pcrData = res.Value.data;
        this.pcrData.forEach((item) => {
          const dateString = this.datePipe.transform(
            item.DateTime,
            'dd/MM/yyyy'
          );
          const TimeString = this.datePipe.transform(item.DateTime, 'hh:mm a');
          item.date = dateString;
          item.time = TimeString;
        });
      },
    });
  }
}
