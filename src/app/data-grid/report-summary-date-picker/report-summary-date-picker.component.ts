import { Component } from '@angular/core';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import * as _moment from 'moment';
import {  Moment } from 'moment';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { DatePickerModel } from '../../common-components/date-picker/date-picker.model';
import { FormControl } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { ReportService } from 'src/app/services/report.service';
const moment =  _moment;
export const MONTH_YEAR_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MM/YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MM/YYYY',
  },
};
@Component({
  selector: 'app-report-summary-date-picker',
  templateUrl: './report-summary-date-picker.component.html',
  styleUrls: ['./report-summary-date-picker.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
     { provide: MAT_DATE_FORMATS, useValue: MONTH_YEAR_FORMATS }, 
  ],
})

export class ReportSummaryDatePickerComponent {
  date2 = new FormControl(moment());
  date: any;
 
  constructor(private reportService:ReportService){

  }

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date2.value ?? moment();
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date2.setValue(ctrlValue);
    datepicker.close();
    this.date=this.date2.value
    this.reportService.selectedMonthAndYear$.next(this.date);
  }
  
}
