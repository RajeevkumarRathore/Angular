import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { DashboardService } from 'src/app/services/dashboard.service';
import { DatePickerModel } from 'src/app/common-components/date-picker/date-picker.model';
import { Subject, takeUntil } from 'rxjs';
import { color } from 'highcharts';

@Component({
  selector: 'app-dashboard-charts',
  templateUrl: './dashboard-charts.component.html',
  styleUrls: ['./dashboard-charts.component.scss'],
})
export class DashboardChartsComponent implements OnInit {
  @Output() selectedDate: EventEmitter<any> = new EventEmitter();
  private destroy$ = new Subject<void>();
  currentDateFilter: DatePickerModel = {
    to: new Date(),
    from: new Date(new Date().getTime() - this.getDaysAgo(30)),
    label: 'Last 30 Days'
  };
  callVolume1tDateFilter: DatePickerModel = {
    to: new Date(),
    from: new Date(new Date().getTime() - this.getDaysAgo(0)),
    label: 'Today'
  };
  callVolume2tDateFilter: DatePickerModel = {
    to: new Date(),
    from: new Date(new Date().getTime() - this.getDaysAgo(1)),
    label: 'Yesterday'
  };
  natureOfCalls: any;
  natureOfCallsColor: any[] = [
    'green',
    'skyblue',
    'yellow',
    'blue',
    'red',
    'violet',
  ];
  hospitalData: any;
  hospitalDataColor: any[] = [
    'green',
    'skyblue',
    'yellow',
    'blue',
    'red',
    'violet',
  ];
  callType: any;
  callTypeColor: any[] = [
    'green',
    'skyblue',
    'yellow',
    'blue',
    'red',
    'violet',
  ];
  callVolumeDetail1: any;
  callVolumeDetail2: any;
  callVolumeDetailColor1: any = ['green'];
  callVolumeDetailColor2: any = ['red'];
  callVolumeDetailLabels1: any[] = [];
  callVolumeDetailLabels2: any[] = [];
  completedPCRs: any;
  completedPCRsColor: any[] = ['blue', 'red'];
  completedPCRsLabel: any[] = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  datepipe: DatePipe = new DatePipe('en-US');
  natureOfCallsList: any[] = [];
  hospitalDataList: any[] = [];
  callTypeList: any[] = [];
  selectedDateRange: string;
  sum: any;
  totalHospitalCalls: any;
  totalNatureCalls: any;
  totalCallType: any;
  firstLineChartLabel: any;
  secondLineChartLabel: any;
  
  constructor(
    private dashboardService: DashboardService,
    private datePipe: DatePipe
  ) {
    this.dashboardService.selectedDate$
    .pipe(takeUntil(this.destroy$))
    .subscribe((res: any) => {
      if (res) {
        if (res.natureOfCalls) {
          this.getNatureOfCallsDetails(res);
        } else if (res.hospitalData) {
          this.getHospitalsDetails(res);
        } else if (res.callType) {
          this.getCallTypeDetails(res);
        } else if (res.completedPCRs) {
          this.getPCRsDetails(res);
        } else if (res.callVolume1) {
          this.GetCallVolumeDetails1(res);
        } else if (res.callVolume2) {
          this.GetCallVolumeDetails2(res);
        }
      }
    });
  }

  ngOnInit(): void {
    let payload: any ={
      startDate: this.currentDateFilter.from,
      endDate: this.currentDateFilter.to
    }
    this.getNatureOfCallsDetails(payload)
    this.getHospitalsDetails(payload);
    this.getCallTypeDetails(payload);
    this.getPCRsDetails(payload);

    let CallVolume_1: any ={
      startDate: this.callVolume1tDateFilter.from,
      label: this.callVolume1tDateFilter.label,
      endDate: this.callVolume1tDateFilter.to
    }
    this.GetCallVolumeDetails1(CallVolume_1);

    let CallVolume_2: any ={
      startDate: this.callVolume2tDateFilter.from,
      label: this.callVolume2tDateFilter.label,
      endDate: this.callVolume2tDateFilter.to
    }
    this.GetCallVolumeDetails2(CallVolume_2);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  getNatureOfCallsDetails(res) {
    const startDate = this.datePipe.transform(res.startDate, 'MM/dd/yyyy');
    const endDate = this.datePipe.transform(res.endDate, 'MM/dd/yyyy');
    const payload = {
      startDate: startDate,
      endDate: endDate,
    };
    this.dashboardService.natureOfCallsDetails(payload).subscribe({
      next: (res: any) => {
        this.natureOfCallsList = [];
        this.totalNatureCalls = 0;
        this.sum = 0;
        if (res.Value.data.length > 0) {
         ;
          this.natureOfCallsList = res.Value.data;
          this.natureOfCallsList.forEach((a) => (this.sum += a.total));
          this.totalNatureCalls = this.sum;
          for (let i = 0; i < this.natureOfCallsList.length; i++)
            this.natureOfCallsList[i].color = this.natureOfCallsColor[i];
          const natureOfCalls: any[] = [];
          for (let i = 0; i < res.Value.data.length; i++) {
            natureOfCalls.push([
              res.Value.data[i]?.Value.toString(),
              res.Value.data[i]?.total,
            ]);
          }
          this.natureOfCalls = natureOfCalls;
        } else {
          res.Value.data.Value = 'Nature Of Calls';
          res.Value.data.total = 0;
          this.natureOfCallsList.push(res.Value.data);
          this.natureOfCallsList[0].color = 'green';
          this.natureOfCalls = [['Nature Of Calls', 0]];
        }
      },
    });
  }

  getHospitalsDetails(res) {
   ;
    const startDate = this.datePipe.transform(res.startDate, 'MM/dd/yyyy');
    const endDate = this.datePipe.transform(res.endDate, 'MM/dd/yyyy');
    const payload = {
      startDate: startDate,
      endDate: endDate,
    };
    this.dashboardService.hospitalDetails(payload).subscribe({
      next: (res: any) => {
        this.hospitalDataList = [];
        this.totalHospitalCalls = 0;
        this.sum = 0;
        if (res.Value.data.length > 0) {
          this.hospitalDataList = res.Value.data;
          this.hospitalDataList.forEach((a) => (this.sum += a.total));
          this.totalHospitalCalls = this.sum;
          for (let i = 0; i < this.hospitalDataList.length; i++)
            this.hospitalDataList[i].color = this.hospitalDataColor[i];
          const hospitalData: any[] = [];
          for (let i = 0; i < res.Value.data.length; i++) {
            hospitalData.push([
              res.Value.data[i]?.Value.toString(),
              res.Value.data[i]?.total,
            ]);
          }
          this.hospitalData = hospitalData;
        } else {
          res.Value.data.Value = 'Hospital Data';
          res.Value.data.total = 0;
          this.hospitalDataList.push(res.Value.data);
          this.hospitalData = [['Hospital Data', 0]];
        }
      },
    });
  }

  getCallTypeDetails(res) {
   ;
    const startDate = this.datePipe.transform(res.startDate, 'MM/dd/yyyy');
    const endDate = this.datePipe.transform(res.endDate, 'MM/dd/yyyy');
    const payload = {
      startDate: startDate,
      endDate: endDate,
    };
    this.dashboardService.CallsTypeDetails(payload).subscribe({
      next: (res: any) => {
        this.callTypeList = [];
        this.totalCallType = 0;
        this.sum = 0;
        if (res.Value.data.length > 0) {
          this.callTypeList = res.Value.data;
          this.callTypeList.forEach((a) => (this.sum += a.total));
          this.totalCallType = this.sum;
          for (let i = 0; i < this.callTypeList.length; i++)
            this.callTypeList[i].color = this.callTypeColor[i];
          const callType: any[] = [];
          for (let i = 0; i < res.Value.data.length; i++) {
            callType.push([
              res.Value.data[i]?.Value.toString(),
              res.Value.data[i]?.total,
            ]);
          }
          this.callType = callType;
        } else {
          res.Value.data.Value = 'Call Types';
          res.Value.data.total = 0;
          this.callTypeList.push(res.Value.data);
          this.callType = [['Call Types', 0]];
        }
      },
    });
  }

  getPCRsDetails(res) {
    const startDate = this.datePipe.transform(res.startDate, 'MM/dd/yyyy');
    const endDate = this.datePipe.transform(res.endDate, 'MM/dd/yyyy');
    const payload = {
      startDate: startDate,
      endDate: endDate,
    };
    this.dashboardService.pcrDetails(payload).subscribe({
      next: (res: any) => {
        this.completedPCRs = [
          {
            name: 'Completed',
            data: [res.Value.data.COMPLETE],
          },
          {
            name: 'Incompleted',
            data: [res.Value.data.IN_COMPLETE],
          },
        ];
      },
    });
  }

  GetCallVolumeDetails1(res) {
    const startDate = this.datePipe.transform(res.startDate, 'MM/dd/yyyy');
    const endDate = this.datePipe.transform(res.endDate, 'MM/dd/yyyy');
    this.firstLineChartLabel = res.label;
    const payload = {
      startDate: startDate,
      endDate: endDate
    };
    this.dashboardService.GetCallVolumeDetails(payload).subscribe({
      next: (res: any) => {
        let callVolumeDetail1: any[] = [];
        let callVolumeDetailLabels1: any[] = [];
        res.Value.data.forEach((element: any) => {
          callVolumeDetail1.push(element.callvolume);
          callVolumeDetailLabels1.push(
              (element.starttime + '-' + element.endtime).toString()
            );
        });
        this.callVolumeDetail1 = [
          {
            name: '',
            showInLegend: false,
            data: callVolumeDetail1,
          },
        ];
        this.callVolumeDetailLabels1 = callVolumeDetailLabels1;
      },
    });
  }

  GetCallVolumeDetails2(res) {
    const startDate = this.datePipe.transform(res.startDate, 'MM/dd/yyyy');
    const endDate = this.datePipe.transform(res.endDate, 'MM/dd/yyyy');
    this.secondLineChartLabel = res.label;
    const payload = {
      startDate: startDate,
      endDate: endDate
    };
    this.dashboardService.GetCallVolumeDetails(payload).subscribe({
      next: (res: any) => {
        let callVolumeDetail2: any[] = [];
        let callVolumeDetailLabels2: any[] = [];
        res.Value.data.forEach((element: any) => {
          callVolumeDetail2.push(element.callvolume);
          callVolumeDetailLabels2.push(
              (element.starttime + '-' + element.endtime).toString()
            );
        });
        this.callVolumeDetail2 = [
          {
            name: '',
            showInLegend: false,
            data: callVolumeDetail2,
          },
        ];
        this.callVolumeDetailLabels2 = callVolumeDetailLabels2;
      },
    });
  }

  public getDaysAgo(amountOfDays: number): number {
    return amountOfDays * 24 * 60 * 60 * 1000;
  }
}
