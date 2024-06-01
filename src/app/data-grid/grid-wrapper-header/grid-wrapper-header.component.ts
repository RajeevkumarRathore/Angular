import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GridActionsService } from '../grid-actions.service';
import { Subject } from 'rxjs';
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
const moment =  _moment;
export const YEAR_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};
@Component({
   selector: 'app-grid-wrapper-header',
  templateUrl: './grid-wrapper-header.component.html',
  styleUrls: ['./grid-wrapper-header.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: YEAR_FORMATS}, 
  ],
})

export class GridWrapperHeaderComponent implements OnInit,OnDestroy,OnChanges {
  @Output() selectedDate: EventEmitter<any> = new EventEmitter();
  @Output() callTextType: EventEmitter<any> = new EventEmitter();
  @Output() notificationsType: EventEmitter<any> = new EventEmitter();
  @Output() searchTextData: EventEmitter<any> = new EventEmitter();
  @Output() isDispatch: EventEmitter<any> = new EventEmitter();
  @Output() exportList: EventEmitter<any> = new EventEmitter();
  @Output() sendMessageToAll: EventEmitter<any> = new EventEmitter();
  @Output() openSettingBox: EventEmitter<any> = new EventEmitter();
  @Output() addNew: EventEmitter<any> = new EventEmitter();
  @Output() selectedExpertise: EventEmitter<any> = new EventEmitter();
  private destroy$ = new Subject<void>();
  @Input() currentTab;
  @Input() module;
  @Input() allExperties;
  currentDateFilter: DatePickerModel;
  dateFilterButtonText: string;
  _dateFilter: any;

  @Input() get dateFilter() {
    return this._dateFilter;
  }
  set dateFilter(value) {
    this._dateFilter = value;
    this.currentDateFilter = this._dateFilter;
    if(this._dateFilter) this.selectedDate.emit(this._dateFilter);
  }
  date = new FormControl(moment());
  
  @Input() callTextOnOff;
  @Input() notificationsOnOff;
  isDispatchedOnly:boolean;
  searchText: string = '';


  constructor(private dialog: MatDialog,
    public gridActionsService: GridActionsService,) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes?.currentTab?.currentValue === "Summary" &&
       changes?.currentTab?.currentValue !== changes?.currentTab?.previousValue){
      this.date.setValue(moment());
    }
    this.module
  }
    

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();  
  }

  ngOnInit(): void {
   
  }  

  dateFilterOutput(event){
    this.currentDateFilter = event;
  this.selectedDate.emit(event);
  };

  public getDialogRightPosition(e: MouseEvent) {
    const target = e.target as any;
    const targetPosision = target.getBoundingClientRect();
    return {
      right: window.innerWidth - targetPosision.right + "px",
      top: targetPosision.top + 30 + "px",
    };
  }

  public getDaysAgo(amountOfDays: number): number {
    return amountOfDays * 24 * 60 * 60 * 1000;
  }

   public chosenYearHandler(normalizedYear: Moment, dp: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value ?? moment();
    ctrlValue?.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
    dp.close();
    this.selectedDate.emit(this.date.value);
  }
 
  public textOnOff(callTextOnOff){
    this.callTextType.emit(callTextOnOff);
  }

  public notificationOnOff(notificationsOnOff){
    this.notificationsType.emit(notificationsOnOff);
  }

  public search(searchText){
    this.searchTextData.emit(searchText);
  }

  public dispatched(isDispatchedOnly){
   this.isDispatch.emit(isDispatchedOnly)
  }

  public GetCallListExport(){
    this.exportList.emit()
   }



  public add(){
    this.addNew.emit();
  }

 public sendThanksMessageToAll(){
   this.sendMessageToAll.emit()
 }
 
 public onExpertiseSelectionChange(selectedValue){
    this.selectedExpertise.emit(selectedValue)
 }
 
 public openSettingpopUp(){
  this.openSettingBox.emit();
 }
 
}
