import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { DatePickerModel } from '../date-picker/date-picker.model';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { DashboardService } from 'src/app/services/dashboard.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-date-component-renderer',
  templateUrl: './date-component-renderer.component.html',
  styleUrls: ['./date-component-renderer.component.scss'],
})
export class DateComponentRendererComponent implements OnDestroy{
  @Input() position: boolean;
  @Input() isDashboardId;
  @Input() natureOfCalls: boolean = false;
  @Input() callType: boolean = false;
  @Input() dashboardheader: boolean = false;
  @Input() completedPCRs: boolean = false;
  @Input() hospitalData: boolean = false;
  @Input() topResponders: boolean = false;
  @Input() callVolume1: boolean = false;
  @Input() callVolume2: boolean = false;
  @Input() pcrSummary: boolean = false;
  @Input() currentTab:string
  @Input() memberByDateSummaryGrid: boolean = false;
  private destroy$ = new Subject<void>();
  @Output() dateFilterOutput: EventEmitter<DatePickerModel> =new EventEmitter();
  private _currentDateFilter: DatePickerModel;

  get currentDateFilter(): DatePickerModel {
    return this._currentDateFilter;
  }

  @Input() set currentDateFilter(date: DatePickerModel) {
    if (date) {
      this._currentDateFilter = date;
      const dateString = `${this.datePipe.transform(
        this.currentDateFilter.from,
        'M/d/yy'
      )} - ${this.datePipe.transform(this.currentDateFilter.to, 'M/d/yy')}`;
      const displayDate =
        date.label && date.label !== 'custom' ? date.label : dateString;
      this.dateFilterButtonText = displayDate;
      this.dashboardService.selectedDate$.next({
        startDate: date.from.toDateString(),
        endDate: date.to.toDateString(),
        label: this.dateFilterButtonText,
        natureOfCalls: this.natureOfCalls,
        hospitalData: this.hospitalData,
        callType: this.callType,
        completedPCRs: this.completedPCRs,
        topResponders: this.topResponders,
        pcrSummary: this.pcrSummary,
        memberByDateSummaryGrid: this.memberByDateSummaryGrid,
        dashboardheader:this.dashboardheader,
        callVolume1: this.callVolume1,
        callVolume2: this.callVolume2
      });
    }
  }
  dateFilterButtonText: string;

  constructor(
    private dialog: MatDialog,
    private datePipe: DatePipe,
    private dashboardService: DashboardService
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  ngOnInit(): void {}

  openDateDialog = (e: MouseEvent) => {
    this.dialog
      .open(DatePickerComponent, {
        width: '450px',
        position: this.getDialogRightPosition(e),
        data: { data: this.currentDateFilter, hideResetbtn: true },
      })
      .afterClosed()
      .subscribe((e: DatePickerModel) => {

        if (e && e !== 'reset') {
          this.currentDateFilter = e;
        } else if (e === 'reset') {
          this.currentDateFilter = null;
        }
        this.dateFilterOutput.emit(this.currentDateFilter);
      });
  };

  getDaysAgo(amountOfDays: number): number {
    return amountOfDays * 24 * 60 * 60 * 1000;
  }

  getDialogRightPosition(e: MouseEvent) {
    const target = e.target as any;
    const targetPosision = target.getBoundingClientRect();
    return {
      bottom:
        targetPosision.bottom < 510 ? targetPosision.bottom + 'px' : '450px',
      left:
        targetPosision.left > 280
          ? targetPosision.left - 300 + 'px'
          : targetPosision.left - 200 + 'px',
      right: targetPosision.right + 'px',
      top: targetPosision.top > 550 ? '500px' : targetPosision.top + 'px',
    };
  }
}
