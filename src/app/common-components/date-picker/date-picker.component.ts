import { Component, EventEmitter, Inject, OnInit, ViewChild } from '@angular/core';
import { DateRange, DefaultMatCalendarRangeStrategy, MAT_DATE_RANGE_SELECTION_STRATEGY, MatCalendar } from '@angular/material/datepicker';
import { AvalableDateLabels, DatePickerModel } from "./date-picker.model";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [
    {
      provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
      useClass: DefaultMatCalendarRangeStrategy,
    },
  ],
})
export class DatePickerComponent implements OnInit {
  @ViewChild(MatCalendar) calendar: MatCalendar<Date>;
  selectedRangeValue: DateRange<Date> | undefined;
  selectedRangeValueChange = new EventEmitter<DateRange<Date>>();
  avalableDateLabels = Object.keys(AvalableDateLabels).map(
    (key) => AvalableDateLabels[key]
  );
  selectedDateLabel: AvalableDateLabels | 'custom';
  today = new Date();
  data:DatePickerModel;
  constructor(
    public dialogRef: MatDialogRef<DatePickerComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
  ) { }
  

  ngOnInit(): void {
    this.data=this.dialogData.data;
    if(this.data){
      this.data.from.setHours(0, 0, 0, 0);
      this.data.to.setHours(0, 0, 0, 0);
      if (this.checkIfDateIsOneDayRange(this.data.from, this.data.to)) {
        const newDate = this.convertSingleDateFromFilter(this.data.from, this.data.to);
        this.data.from = newDate.from;
        this.data.to = newDate.to;
      }
      this.selectedRangeValue = new DateRange<Date>(
        this.data?.from,
        this.data?.to
      );
      this.setLabelFromDate();
    }
  }

  setLabelFromDate() {
    this.selectedDateLabel = this.getDateLabel(this.data.from, this.data.to);
  }

  selectedChange(m: any) {
    if (!this.selectedRangeValue?.start || this.selectedRangeValue?.end) {
      this.selectedRangeValue = new DateRange<Date>(m, null);
    } else {
      const start = this.selectedRangeValue.start;
      const end = m;
      if (end < start) {
        this.selectedRangeValue = new DateRange<Date>(end, start);
      } else {
        this.selectedRangeValue = new DateRange<Date>(start, end);
      }
    }
    this.data = {
      from: this.selectedRangeValue.start,
      to: this.selectedRangeValue.end,
    };

    this.setLabelFromDate();
  }

  setLabel(label: AvalableDateLabels) {
    this.selectedDateLabel = label;
  }

  getLabelStartDate(label: AvalableDateLabels): Date {
    const today = new Date().getTime();
    let start;
    switch (label) {
      case AvalableDateLabels.Today:
        start = new Date(today - this.getDaysAgo(0));
        break;
      case AvalableDateLabels.Yesterday:
        start = new Date(today - this.getDaysAgo(1));
        break;
      case AvalableDateLabels.Last7Days:
        start = new Date(today - this.getDaysAgo(7));
        break;
      case AvalableDateLabels.Last14Days:
        start = new Date(today - this.getDaysAgo(14));
        break;
      case AvalableDateLabels.Last30Days:
        start = new Date(today - this.getDaysAgo(30));
        break;
      case AvalableDateLabels.Last90Days:
        start = new Date(today - this.getDaysAgo(90));
        break;
      case AvalableDateLabels.Last180Days:
      start = new Date(today - this.getDaysAgo(180));
      break;
      case AvalableDateLabels.Last365Days:
        start = new Date(today - this.getDaysAgo(365));
        break;
    }
    return start;
  }

  getLabelEndDate(label: AvalableDateLabels): Date {
    const today= new Date().getTime();
    let end;
    switch (label) {
      case AvalableDateLabels.Today:
        end = new Date(today - this.getDaysAgo(0));
        break;
      case AvalableDateLabels.Yesterday:
        end = new Date(today- this.getDaysAgo(1));
        break;
      default:
        end = new Date(today);
        break;
    }
    return end;
  }

  getDateLabel(from: Date, to?:Date): AvalableDateLabels | 'custom' {
    const today = new Date().setHours(0, 0, 0, 0);
    const fromDate = from.setHours(0, 0, 0, 0);
    const toDate = to ? to.setHours(0, 0, 0, 0) : null;
    if (fromDate === today) {
      return AvalableDateLabels.Today;
    } else if (fromDate === today - this.getDaysAgo(1) && (!toDate || toDate === fromDate)) {
      return AvalableDateLabels.Yesterday;
    } else if (fromDate === today - this.getDaysAgo(7) && today === toDate) {
      return AvalableDateLabels.Last7Days;
    } else if (fromDate === today - this.getDaysAgo(14) && today === toDate) {
      return AvalableDateLabels.Last14Days;
    } else if (fromDate === today - this.getDaysAgo(30) && today === toDate) {
      return AvalableDateLabels.Last30Days;
    } else if (fromDate === today - this.getDaysAgo(90) && today === toDate) {
      return AvalableDateLabels.Last90Days;
    } else if (fromDate === today - this.getDaysAgo(180) && today === toDate) {
      return AvalableDateLabels.Last180Days;
    } else if (fromDate === today - this.getDaysAgo(365) && today === toDate) {
      return AvalableDateLabels.Last365Days;
    } else {
      return 'custom';
    }
  }

  getDaysAgo(amountOfDays: number): number {
    return amountOfDays * 24 * 60 * 60 * 1000;
  }

  selectLabel (label: AvalableDateLabels) {
    this.selectedDateLabel = label;
    this.data = {
      from: this.getLabelStartDate(label),
      to: this.getLabelEndDate(label)
    };

    const date = new DateRange<Date>(
      this.data.from,
      this.data.to
    );
    
    this.setCalendarDate(date);
  } 

  save() {
    this.data.label = this.selectedDateLabel;
    if (this.checkIfDateIsSingle(this.data.from, this.data.to)) {
      this.data.from = this.data.from;
      this.data.to = this.data.from;
    }
    this.dialogRef.close(this.data);
  }

  setCalendarDate(date: DateRange<Date>) {
    this.selectedRangeValue = date;
  }

  reset() {
    this.dialogRef.close('reset')
  }

  convertSingleDateForFilter(from: Date, to: Date): DatePickerModel {
    to = to ? new Date(to.getTime() - this.getDaysAgo(-1)) : new Date(from.getTime() - this.getDaysAgo(-1));
    return {
      from: from,
      to: to,
    }
  }

  convertSingleDateFromFilter(from: Date, to: Date): DatePickerModel {
    to = new Date(to.getTime() - this.getDaysAgo(1));
    return {
      from: from,
      to: to,
    }
  }

  checkIfDateIsSingle(from: Date, to: Date): boolean {
    return !to || from.getTime() === to.getTime();
  }

  checkIfDateIsOneDayRange(from: Date, to: Date): boolean {    
    return from.getTime() === to.getTime() - this.getDaysAgo(1);
  } 
}