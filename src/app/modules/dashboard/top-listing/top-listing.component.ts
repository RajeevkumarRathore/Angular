import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { DatePickerModel } from 'src/app/common-components/date-picker/date-picker.model';
import { DashboardService } from 'src/app/services/dashboard.service';
import { PcrSummaryPopUpComponent } from '../pcr-summary-pop-up/pcr-summary-pop-up.component';

@Component({
  selector: 'app-top-listing',
  templateUrl: './top-listing.component.html',
  styleUrls: ['./top-listing.component.scss']
})
export class TopListingComponent implements OnInit{
  private destroy$ = new Subject<void>();
  currentDateFilter: DatePickerModel = {
    to: new Date(),
    from: new Date(new Date().getTime() - this.getDaysAgo(30)),
    label: 'Last 30 Days'
  };
  topRespondersList: any;
  pcrSummaryList: any;

  constructor(private dashboardService: DashboardService,private datePipe: DatePipe,private dialog: MatDialog){
    this.dashboardService.selectedDate$
    .pipe(takeUntil(this.destroy$))
    .subscribe((res: any) => {
      if (res) {
        if(res.topResponders){
          this.GetMembersTopResponderReport(res);
        }else if(res.pcrSummary){
          this.GetMembersPCRSummaryReport(res);
        }
      }
    });
  }


  ngOnInit(): void {
    let payload: any ={
      startDate: this.currentDateFilter.from,
      endDate: this.currentDateFilter.to
    }
    this.GetMembersTopResponderReport(payload);
    this.GetMembersPCRSummaryReport(payload);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  GetMembersTopResponderReport(res){
    const fromTime = this.datePipe.transform(res.startDate,"MM/dd/yyyy")
    const toTime = this.datePipe.transform(res.endDate, "MM/dd/yyyy")
    const payload = {
      fromTime: new Date(fromTime),
      toTime: new Date(toTime),
      dayFromTime: '00:00',
      dayToTime :'00:00',
      nightFromTime :'00:00',
      nightToTime : '00:00',
    }
    this.dashboardService.GetMembersTopResponderReport(payload).subscribe({
      next: (res: any)=>{
        this.topRespondersList = res.data.items
      }
    })
  }

  GetMembersPCRSummaryReport(res){
    const startDate = this.datePipe.transform(res.startDate,"MM/dd/yyyy")
    const endDate = this.datePipe.transform(res.endDate, "MM/dd/yyyy")
    const payload = {
      startDate: startDate,
      endDate: endDate
    }
    this.dashboardService.GetPcrSummaryDetails(payload).subscribe({
      next: (res: any)=>{
        this.pcrSummaryList = res.Value.data;
      }
    })
  }
  openPcrDialog(data,isOpenPcr){
    this.dialog.open(PcrSummaryPopUpComponent, {
      width:'500px',
      data: {data,isOpenPcr: isOpenPcr}
    })
    .afterClosed()
    .subscribe((res: any) => {

    });
  }

  public getDaysAgo(amountOfDays: number): number {
    return amountOfDays * 24 * 60 * 60 * 1000;
  }
}
