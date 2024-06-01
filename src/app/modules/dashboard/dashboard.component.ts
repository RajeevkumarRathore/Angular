import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DatePickerModel } from 'src/app/common-components/date-picker/date-picker.model';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit ,OnDestroy {
  currentDateFilter: DatePickerModel = {
    to: new Date(),
    from: new Date(new Date().getTime() - this.getDaysAgo(30)),
    label: 'Last 30 Days'
  };
  headerData:any;
  private destroy$ = new Subject<void>();
  constructor( private dashboardService:DashboardService,
    private datePipe:DatePipe){
      this.dashboardService.selectedDate$
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: any) => {
  
        if (res) {
          if(res.dashboardheader){
            this.GetReportDashboardCountsByDate(res)
          }
        }
      });
    }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.unsubscribe();
  }
  ngOnInit(): void {
    let payload: any ={
      startDate: this.currentDateFilter.from,
      endDate: this.currentDateFilter.to
    }
    this.GetReportDashboardCountsByDate(payload)
  } 

  GetReportDashboardCountsByDate(res){
    const startDate = this.datePipe.transform(res.startDate,"MM/dd/yyyy")
    const payload = {
      reportDate: startDate
    }
    this.dashboardService.GetReportDashboardCountsByDate(payload).subscribe({
      next: (res: any)=>{
        
     this.headerData=res.Value.data
      }
    })
    }

    public getDaysAgo(amountOfDays: number): number {
      return amountOfDays * 24 * 60 * 60 * 1000;
    }
}
