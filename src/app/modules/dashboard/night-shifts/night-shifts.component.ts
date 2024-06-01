import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-night-shifts',
  templateUrl: './night-shifts.component.html',
  styleUrls: ['./night-shifts.component.scss']
})
export class NightShiftsComponent implements OnInit{
  todayData;
  yesterdayData;
  tomorrowData;

  constructor(private dashboardService: DashboardService,
    private datePipe: DatePipe) { }


  ngOnInit(): void {
    this.GetNightShiftDetails()
  }

  GetNightShiftDetails(){
    const date = new Date();
    const todayDate = this.datePipe.transform(date, 'MM/dd/yyyy');
    const payload = {
      todayDate: todayDate
    }
    this.dashboardService.GetNightShiftDetails(payload).subscribe({
      next: (res: any)=>{
        this.todayData = res.data['today'];
        this.yesterdayData = res.data['yesterday'];
        this.tomorrowData = res.data['tomorrow'];
      }
    })
  }
}
