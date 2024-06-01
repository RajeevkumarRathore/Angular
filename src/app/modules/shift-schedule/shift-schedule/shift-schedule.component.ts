import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ShiftScheduleService } from 'src/app/services/shift-schedule.service';
import { Subject, takeUntil } from 'rxjs';
import { DatePipe } from '@angular/common';
import { CreateUpdateShiftScheduleComponent } from '../create-update-shift-schedule/create-update-shift-schedule.component';
import { MatDialog } from '@angular/material/dialog';
import { DateAdapter } from '@angular/material/core';
import { ConfirmDialogComponent } from 'src/app/common-components/confirm-dialog/confirm-dialog.component';
import { EditShiftSchedulePopUpComponent } from '../edit-shift-schedule-pop-up/edit-shift-schedule-pop-up.component';
import { AuthService } from 'src/app/services/auth.service';
import { DeleteShiftscheduleTakePopUpComponent } from '../delete-shiftschedule-take-pop-up/delete-shiftschedule-take-pop-up.component';
import { FullCalendarComponent } from '@fullcalendar/angular';
import * as moment from 'moment';
import { MatCalendar } from '@angular/material/datepicker';
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-shift-schedule',
  templateUrl: './shift-schedule.component.html',
  styleUrls: ['./shift-schedule.component.scss'],
  providers: [DatePipe],
})
export class ShiftScheduleComponent implements OnInit, OnDestroy,AfterViewInit {
  @ViewChild('calendarEl') calendarEl: FullCalendarComponent;
  @ViewChild('calendar', { static: false }) calendar: MatCalendar<Date>;
  @ViewChild('arrowUpButton', { static: false }) arrowUpButtonRef!: ElementRef;
  private destroy$ = new Subject<void>();
  getAllColumnStatesResponse: any;
  getShiftSchedulePlansResponse: any;
  getShiftSchedulePlanDataResponse: any;
  getShiftScheduleTakeDataAdminResponse: any;
  getAutoDismissCallSettingsResponse: any;
  getMembersForShiftScheduleResponse: any;
  getRequestShiftTypesResponse: any;
  scheduleDate: any;
  startDate = new Date();
  endDate;
  private shift: any[] = [];
  selectedDate: Date = new Date();
  private _activeTab: string;
  currentTab: string;
  emsMembers: any;
  userInfo: any;
  tokenInfo: any;
  shiftscheduletime: any;
  selectedShiftTime: any;
  previousMonth: any;
  previousTabSelection: string;
  public loading = false;
  selectedView: string = 'dayGridMonth';
  previousWeek: Date;
  previousDay: Date;
  parentElem: string[] = [];
  parentElemContainer: string[] = [];
  nextShiftDate: string = '';
  month: boolean = false;
  week: boolean = false;
  day: boolean = false;
  showPreviousDayData =false
  checked: boolean=false;
  //dayMaxEventRowsCount: number = 5;


  get activeTab() {
    return this._activeTab;
  }

  set activeTab(tab: string) {
    this._activeTab = tab;
    this.selectPage(this._activeTab);
  }

  selectedDays: any[] = [
    { name: 'Sunday', dayOfWeek: 1, isChecked: false },
    { name: 'Monday', dayOfWeek: 2, isChecked: false },
    { name: 'Tuesday', dayOfWeek: 3, isChecked: false },
    { name: 'Wednesday', dayOfWeek: 4, isChecked: false },
    { name: 'Thursday', dayOfWeek: 5, isChecked: false },
    { name: 'Friday', dayOfWeek: 6, isChecked: false },
    { name: 'Saturday', dayOfWeek: 7, isChecked: false },
  ];
  constructor(
    public shiftScheduleService: ShiftScheduleService,
    private datePipe: DatePipe,
    public dialog: MatDialog,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private dateAdapter: DateAdapter<Date>
  ) {
    this.dateAdapter.setLocale('en');
  }

  ngOnInit(): void {
    this.month = true;
    this.userInfo = this.authService.userInfo$.value.data.userInfoDto;
    this.tokenInfo = this.authService.userInfo$.value.data.tokens;
    this.activeTab = 'Dispatch';
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    this.selectedDate = firstDayOfMonth;
    this.getAllColumnStates();
    this.getAutoDismissCallSettings();
    this.getRequestShiftTypes();
    this.getMembersForShiftSchedule();
  }

  ngAfterViewInit(): void {
    if (this.arrowUpButtonRef) {
      const arrowUpButton = this.arrowUpButtonRef.nativeElement as HTMLElement;
      arrowUpButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }


  public tabClicked(e) {

    this.activeTab = e;
  }
  selectPage(page) {
    if (page === 'Dispatch') {
      this.getShiftScheduleData('Dispatch');
    } else if (page === 'Night Unit') {
      this.getShiftScheduleData('Night Unit');
    }
    this.calendarOptions.events = [];
    if (this.currentTab !== page) {
      this.currentTab = page;
    }
    let datePayload: any = {
      startDate: this.datePipe.transform(this.startDate, 'MM/dd/yyyy'),
      endDate: this.datePipe.transform(this.endDate, 'MM/dd/yyyy'),
    };
    if (this.selectedView === 'dayGridMonth') {
      const firstDayOfMonth = new Date(
        this.selectedDate.getFullYear(),
        this.selectedDate.getMonth(),
        1
      );
      const firstDayOfNextMonth = new Date(
        this.selectedDate.getFullYear(),
        this.selectedDate.getMonth() + 1,
        1
      );
      var startDate = firstDayOfMonth;
      var endDate = firstDayOfNextMonth;
      datePayload.startDate = this.datePipe.transform(startDate, 'MM/dd/yyyy');
      datePayload.endDate = this.datePipe.transform(endDate, 'MM/dd/yyyy');
    } else if (this.selectedView === 'timeGridWeek') {
      var startDate = this.selectedDate;
      var endDate = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate() + 7
      );

      datePayload.startDate = this.datePipe.transform(startDate, 'MM/dd/yyyy');
      datePayload.endDate = this.datePipe.transform(endDate, 'MM/dd/yyyy');
    } else if (this.selectedView === 'timeGridDay') {
      var startDate = this.selectedDate;
      var endDate = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate() + 1
      );
      datePayload.startDate = this.datePipe.transform(startDate, 'MM/dd/yyyy');
      datePayload.endDate = this.datePipe.transform(endDate, 'MM/dd/yyyy');
    }
    this.getShiftScheduleTakeDataAdmin(this.currentTab, datePayload);
  }

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    headerToolbar: {
      left: 'prev,title,next',
      center: 'title',
    },
    initialView: 'dayGridMonth',
    events: [],
    weekends: true,
    editable: false,
    selectMirror: true,
    dayMaxEvents: true,
    displayEventTime: false,

    titleFormat: (info) => {
      const tabName =
        this.currentTab === 'Dispatch' ? 'Dispatch' : 'Night Unit';
      const month = moment(info.end.month + 1, 'MM').format('MMMM');
      this.previousDay = info.start.marker;
      this.previousTabSelection = this.currentTab;

      return `${tabName} ${month} ${info.date.year}`;
    },

  };


  refreshCalendarEvents() {
    if (this.calendarEl) {
      this.calendarEl.getApi().refetchEvents();
    }
  }

  dayAbbreviations: { [key: string]: string } = {
    Sunday: 'Sun',
    Monday: 'Mon',
    Tuesday: 'Tue',
    Wednesday: 'Wed',
    Thursday: 'Thu',
    Friday: 'Fri',
    Saturday: 'Sat',
  };

  getAbbreviatedDayName(fullDayName: string): string {
    return this.dayAbbreviations[fullDayName] || fullDayName;
  }

  onSelect(event) {
    this.selectedDate = event;
    this.calendarEl;
  }

  public openAddNewDialog(params?: null) {
    this.dialog.open(CreateUpdateShiftScheduleComponent, {
      autoFocus: false,
      width: `580px`,
      data: {
        data: params,
        callBackFn: (dialogRef: any, e: any, actions: string) => {
          if (actions == 'Create') {
            this.createShiftSchedule(e);
          } else {
            if (actions == 'Edit') this.editShiftSchedule(e);
          }
        },
      },
    });
  }

  public openEditScheduleDialog(params: any, event: any) {
    this.scheduleDate = event.scheduleDate;
    this.selectedShiftTime = event.selectedShiftTime;
    const idx = params.findIndex((x) => x.shiftScheduleName == event);
    this.dialog.open(EditShiftSchedulePopUpComponent, {
      autoFocus: false,
      width: `580px`,
      data: {
        data: params[idx],
        callBackFn: (dialogRef: any, e: any, actions: string) => {
          if (actions == 'Save') {
            this.addShiftScheduleTakeFromWeb(e);
          }
        },
      },
    });
  }

  getMembersForShiftSchedule() {
    this.shiftScheduleService
      .getMembersForShiftSchedule()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: any) => {
        this.emsMembers = res.data.emsMembers;
      });
  }
  getAllColumnStates() {
    this.shiftScheduleService
      .getAllColumnStates()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: any) => {
        this.getAllColumnStatesResponse = res.data;
      });
  }

  getShiftScheduleData(shiftType?): void {
    this.getShiftSchedulePlanDataResponse = null;
    const payload = {
      shiftTypeId: shiftType == 'Dispatch' ? 1 : 3,
    };
    this.shiftScheduleService
      .getShiftSchedulePlanData(payload)
      .subscribe((response: any) => {
        if (
          response &&
          response.messages=="Success" &&
          Array.isArray(response.data)
        ) {
          this.getShiftSchedulePlanDataResponse = response.data;
          this.getShiftSchedulePlanDataResponse.forEach((element) => {
            let selectedDAysCopy = [];
            this.selectedDays.forEach((val) =>
              selectedDAysCopy.push(Object.assign({}, val))
            );
            selectedDAysCopy.forEach((res) => (res.isChecked = false));
            element.shiftSchedulePlans.forEach((elnt) => {
              element.shiftSchedulePlans = element.shiftSchedulePlans.filter(
                (elnt) => elnt.shiftSchedulePlanStatus === 1
              );
              const index = selectedDAysCopy.findIndex(
                (ele) =>
                  ele.name === elnt.dayOfWeekName &&
                  elnt.shiftSchedulePlanStatus == 1
              );
              if (index !== -1) {
                selectedDAysCopy[index].isChecked = true;
              }
            });
            element.selectedDays = selectedDAysCopy;
          });
          this.selectedDays.forEach((ele, i) => {
            this.selectedDays[i].shiftTypeId =
              this.activeTab == 'Dispatch' ? 1 : 3;
          });
          this.calendarOptions.events = [];
        }
      });
  }

  createEventsFromResponse(data: any,checked?): any[] {
    const events = [];
    let event
    data.shiftScheduleTakeDataDto.forEach((item) => {
      var days;
      if (item.dayOfWeek == 1) {
        days = 'Sunday';
      } else if (item.dayOfWeek == 2) {
        days = 'Monday';
      } else if (item.dayOfWeek == 3) {
        days = 'Tuesday';
      } else if (item.dayOfWeek == 4) {
        days = 'Wednesday';
      } else if (item.dayOfWeek == 5) {
        days = 'Thursday';
      } else if (item.dayOfWeek == 6) {
        days = 'Friday';
      } else if (item.dayOfWeek == 7) {
        days = 'Saturday';
      }
      var startTime = '';
      var endTime = '';
      if (item.startTime != null) {
        startTime = item.startTime.replace('AM', ' AM').replace('PM', ' PM');
      }
      if (item.endTime != null) {
        endTime = item.endTime.replace('AM', ' AM').replace('PM', ' PM');
      }
      if(!checked){
       event = {
        title: '',
        start: moment(item.scheduleDate + ' ' + startTime).toISOString(),
        end: moment(item.scheduleDate + ' ' + endTime).toISOString(),
        extendedProps: {
          editableField: item.scheduleName,
          badgeNumber: item.badgeNumber,
          scheduleDate: item.scheduleDate,
          selectedShiftTime: item.shiftScheduleId,
          shiftScheduleTakeId: item.shiftScheduleTakeId,
          dayOfWeekName: days,
        },
      };
    }else{
      const startDate = moment(item.scheduleDate + ' ' + startTime).subtract(1, 'd').toISOString();
      const endDate=moment(item.scheduleDate + ' ' + endTime).subtract(1, 'd').toISOString();
       event = {
         title: '',
         start: startDate,
         end:endDate,
         extendedProps: {
          editableField: item.scheduleName,
          badgeNumber: item.badgeNumber,
          scheduleDate: startDate,
          selectedShiftTime: item.shiftScheduleId,
          shiftScheduleTakeId: item.shiftScheduleTakeId,
          dayOfWeekName: days,
        },
      };

    }
     events.push(event);
    });
    return events;
  }


  showOptions(event){
  this.checked = true
   const updateCalender= this.createEventsFromResponse(this.getShiftScheduleTakeDataAdminResponse,event.checked);
   this.calendarOptions.events =[]
   this.updateCalendarEvents(updateCalender);
   if (this.calendarEl.getApi().view.type == 'dayGridMonth') {
    this.updateCalendarEvents(this.shift);
  }

  }


  // getDayOfWeekDate(dayOfWeekName: string): Date {
  //   const today = new Date();
  //   const currentDayOfWeek = today.getDay();
  //   const days = [
  //     'Sunday',
  //     'Monday',
  //     'Tuesday',
  //     'Wednesday',
  //     'Thursday',
  //     'Friday',
  //     'Saturday',
  //   ];
  //   const targetDay = days.indexOf(dayOfWeekName);
  //   let difference = targetDay - currentDayOfWeek;
  //   if (difference <= 0) {
  //     difference += 7;
  //   }
  //   const startDate = new Date(today);
  //   const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  //   startDate.setDate(firstDayOfMonth.getDate() + difference);
  //   return startDate;
  // }

  public getDaysAgo(amountOfDays: number): number {
    return amountOfDays * 24 * 60 * 60 * 1000;
  }

  updateCalendarEvents(events: any[]) {
    let updatedEvents = [];
      updatedEvents = [
        ...(this.calendarOptions.events as any),
        ...events,
      ];
          this.calendarOptions.events = updatedEvents;
  }


  getShiftScheduleTakeDataAdmin(shiftType?, date?): void {
    this.shift = [];
    this.calendarOptions.events = [];
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const firstDayOfNextMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      1
    );
    let startDate = this.datePipe.transform(firstDayOfMonth, 'MM/dd/yyyy');
    let endDate = this.datePipe.transform(firstDayOfNextMonth, 'MM/dd/yyyy');
    const payload = {
      shiftTypeId: shiftType == 'Dispatch' ? 1 : 3,
      scheduleStartDate: date?.startDate || startDate,
      scheduleEndDate: date?.endDate || endDate,
    };
    this.shiftScheduleService
      .getShiftScheduleTakeDataAdmin(payload).pipe(takeUntil(this.destroy$))
      .subscribe((res: any) => {
          this.getShiftScheduleTakeDataAdminResponse = res.data;
        if (res.data) {
          res.data.hebrewDatesDataDto.forEach((element) => {
            this.dispatchCalendar(element);
          });
          const events = this.createEventsFromResponse(res.data);
          this.updateCalendarEvents(events);
          if (this.calendarEl.getApi().view.type == 'dayGridMonth') {
            this.updateCalendarEvents(this.shift);
          }
        }
      });
  }

  private dispatchCalendar(calendar: any) {

    let occasionDate: any;
    if (calendar.occasionDate) {
      occasionDate = this.datePipe.transform(
        calendar.occasionDate,
        'yyyy-MM-ddT00:01:59'
      );
    } else {
      occasionDate = this.datePipe.transform(
        calendar.occasionDate,
        'yyyy-MM-dd'
      );
    }

    if (calendar.occasion) {
       this.shift.push({ title: calendar.occasion, start:occasionDate });
    }
  }

  getAutoDismissCallSettings() {
    this.shiftScheduleService
      .getAutoDismissCallSettings()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: any) => {
        this.getAutoDismissCallSettingsResponse = res.data;
      });
  }

  getRequestShiftTypes() {
    this.shiftScheduleService
      .getRequestShiftTypes()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: any) => {
        this.getRequestShiftTypesResponse = res.data;
      });
  }

  createShiftSchedule(params: any) {
    const payload = {
      ...params,
      endTime: params.endTime,
      name: params.name,
      shiftTypeId: params.shiftTypeId,
      startTime: params.startTime,
    };
    this.shiftScheduleService
      .createShiftSchedule(payload)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.dialog.closeAll();
          this.getShiftScheduleData(this.activeTab);
          this.getShiftScheduleTakeDataAdmin(this.activeTab);
           this.refreshCalendarEvents();

        },
      });
  }

  updateShiftSchedulePlanData(items) {
    this.loading = true;
    const payload = [];
    items.forEach((item) => {
      item.selectedDays.forEach((day) => {
        if (day.isChecked) {
          payload.push({
            shiftScheduleId: item.shiftScheduleId.toString(),
            dayOfWeek: day.dayOfWeek.toString(),
            shiftTypeId: item.shiftTypeId.toString(),
          });
        }
      });
    });
    this.shiftScheduleService
      .updateShiftSchedulePlanData({ shiftSchedulesDto: payload })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.loading = false;
          this.getShiftScheduleData(this.activeTab);
          this.getShiftScheduleTakeDataAdmin(this.activeTab);
        },
      });
  }

  editShiftSchedule(params: any) {
    const payload = {
      ...params,
      endTime: params.endTime,
      id: params.shiftScheduleId,
      name: params.name,
      startTime: params.startTime,
    };
    this.shiftScheduleService
      .editShiftSchedule(payload)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.getShiftScheduleData(this.activeTab);
          this.getShiftScheduleTakeDataAdmin(this.activeTab);
          this.dialog.closeAll();
        },
      });
  }

  softDeleteShiftSchedule(item) {
    this.dialog
      .open(ConfirmDialogComponent, {
        width: '400px',
        data: {
          message: 'Do you want to delete the shift schedule?',
        },
      })
      .afterClosed()
      .subscribe((res) => {
        if (res === 'Confirm') {
          const payload = {
            shiftScheduleId: item.shiftScheduleId,
          };
          this.shiftScheduleService.softDeleteShiftSchedule(payload).subscribe({
            next: (res: any) => {
              this.getShiftScheduleData(this.activeTab);
              this.getShiftScheduleTakeDataAdmin(this.activeTab);
              this.refreshCalendarEvents();
            },
          });
        }
      });
  }

  addShiftScheduleTakeFromWeb(params: any) {
    let datePayload: any = {
      startDate: this.datePipe.transform(this.startDate, 'MM/dd/yyyy'),
      endDate: this.datePipe.transform(this.endDate, 'MM/dd/yyyy'),
    };
    if (this.selectedView === 'dayGridMonth') {
      const firstDayOfMonth = new Date(
        this.selectedDate.getFullYear(),
        this.selectedDate.getMonth(),
        1
      );
      const firstDayOfNextMonth = new Date(
        this.selectedDate.getFullYear(),
        this.selectedDate.getMonth() + 1,
        1
      );
      var startDate = firstDayOfMonth;
      let endDate = firstDayOfNextMonth;
      datePayload.startDate = this.datePipe.transform(startDate, 'MM/dd/yyyy');
      datePayload.endDate = this.datePipe.transform(endDate, 'MM/dd/yyyy');
    } else if (this.selectedView === 'timeGridWeek') {
      var startDate = this.selectedDate;
      let endDate = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate() + 7
      );
      datePayload.startDate = this.datePipe.transform(startDate, 'MM/dd/yyyy');
      datePayload.endDate = this.datePipe.transform(endDate, 'MM/dd/yyyy');
    } else if (this.selectedView === 'timeGridDay') {
      var startDate = this.selectedDate;
      let endDate = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate() + 1
      );
      datePayload.startDate = this.datePipe.transform(startDate, 'MM/dd/yyyy');
      datePayload.endDate = this.datePipe.transform(endDate, 'MM/dd/yyyy');
    }
    const endDate = this.datePipe.transform(
      params.formData.endDate,
      'yyyy-MM-d'
    );

    const payload = {
      customId: 0,
      endDate: endDate,
      isCustom: true,
      loggedInUserId: this.tokenInfo.userID,
      scheduleDate: this.scheduleDate,
      selectedMember: params.selectedMember,
      selectedMemberId: params.formData.badgeNumber,
      selectedShiftTime: this.selectedShiftTime,
    };

    let days = Object.keys(params.formData.weekDays);
    days.forEach((res) => {
      payload[
        this.shiftScheduleService.weekDaysDe[res].replace(/[^a-zA-Z0-9]/g, '')
      ] = params.formData.weekDays[res];
    });
    this.shiftScheduleService
      .addShiftScheduleTakeFromWeb(payload)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.shiftScheduleService.isSpinner?.next(false);
          this.refreshCalendarEvents();
          this.getShiftScheduleTakeDataAdmin(this.activeTab, datePayload);
          this.dialog.closeAll();
        },
      });
  }

  deleteShiftScheduleFromWeb(item, name?) {
    let shiftScheduleResponse;
    item.shiftScheduleTakeDataDto.forEach((el) => {
      if (el.badgeNumber == name.badgeNumber) {
        shiftScheduleResponse = el;
      }
    });
    this.dialog
      .open(DeleteShiftscheduleTakePopUpComponent, {
        width: '500px',
        data: {
          message: 'Delete Shift ',
          data: name,
        },
      })
      .afterClosed()
      .subscribe((res) => {
        if (res?.e === 'Delete') {
          let datePayload: any = {
            startDate: this.datePipe.transform(this.startDate, 'MM/dd/yyyy'),
            endDate: this.datePipe.transform(this.endDate, 'MM/dd/yyyy'),
          };
          if (this.selectedView === 'dayGridMonth') {
            const firstDayOfMonth = new Date(
              this.selectedDate.getFullYear(),
              this.selectedDate.getMonth(),
              1
            );
            const firstDayOfNextMonth = new Date(
              this.selectedDate.getFullYear(),
              this.selectedDate.getMonth() + 1,
              1
            );
            var startDate = firstDayOfMonth;
            let endDate = firstDayOfNextMonth;
            datePayload.startDate = this.datePipe.transform(
              startDate,
              'MM/dd/yyyy'
            );
            datePayload.endDate = this.datePipe.transform(
              endDate,
              'MM/dd/yyyy'
            );
          } else if (this.selectedView === 'timeGridWeek') {
            var startDate = this.selectedDate;
            let endDate = new Date(
              startDate.getFullYear(),
              startDate.getMonth(),
              startDate.getDate() + 7
            );

            datePayload.startDate = this.datePipe.transform(
              startDate,
              'MM/dd/yyyy'
            );
            datePayload.endDate = this.datePipe.transform(
              endDate,
              'MM/dd/yyyy'
            );
          } else if (this.selectedView === 'timeGridDay') {
            var startDate = this.selectedDate;
            let endDate = new Date(
              startDate.getFullYear(),
              startDate.getMonth(),
              startDate.getDate() + 1
            );
            datePayload.startDate = this.datePipe.transform(
              startDate,
              'MM/dd/yyyy'
            );
            datePayload.endDate = this.datePipe.transform(
              endDate,
              'MM/dd/yyyy'
            );
          }
          const payload = {
            shiftScheduleTakeId: name.shiftScheduleTakeId,
            selectedDeleteType: res.radioFormValue.deleteOption,
            dayOfWeek: shiftScheduleResponse.dayOfWeek,
            loggedInUserId: this.tokenInfo.userID,
          };
          this.shiftScheduleService
            .deleteShiftScheduleFromWeb(payload)
            .subscribe({
              next: (res: any) => {
                this.getShiftScheduleTakeDataAdmin(this.activeTab, datePayload);
                // this.getShiftScheduleData(this.activeTab);
                // this.refreshCalendarEvents();
              },
            });
        }
      });
  }

  onPreviousMonth() {
    let datePayload: any = {
      startDate: this.datePipe.transform(this.startDate, 'MM/dd/yyyy'),
      endDate: this.datePipe.transform(this.endDate, 'MM/dd/yyyy'),
    };
    if (this.calendarEl.getApi().view.type == 'timeGridWeek') {
      this.selectedDate.setDate(this.selectedDate.getDate() - 7);

      var startDate = this.selectedDate;
      var endDate = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate() + 7
      );
      datePayload.startDate = this.datePipe.transform(startDate, 'MM/dd/yyyy');
      datePayload.endDate = this.datePipe.transform(endDate, 'MM/dd/yyyy');
    } else if (this.calendarEl.getApi().view.type == 'timeGridDay') {
      this.selectedDate.setDate(this.selectedDate.getDate() - 1);

      var startDate = this.selectedDate;
      var endDate = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate() + 1
      );
      datePayload.startDate = this.datePipe.transform(startDate, 'MM/dd/yyyy');
      datePayload.endDate = this.datePipe.transform(endDate, 'MM/dd/yyyy');
    } else {
      this.selectedDate.setMonth(this.selectedDate.getMonth() - 1);
      const firstDayOfMonth = new Date(
        this.selectedDate.getFullYear(),
        this.selectedDate.getMonth(),
        1
      );
      const firstDayOfNextMonth = new Date(
        this.selectedDate.getFullYear(),
        this.selectedDate.getMonth() + 1,
        1
      );
      var startDate = firstDayOfMonth;
      var endDate = firstDayOfNextMonth;
      datePayload.startDate = this.datePipe.transform(startDate, 'MM/dd/yyyy');
      datePayload.endDate = this.datePipe.transform(endDate, 'MM/dd/yyyy');
    }

    this.calendar.activeDate = this.selectedDate;
    this.calendar.updateTodaysDate();
    this.calendarEl.getApi().gotoDate(this.selectedDate);
    this.getShiftScheduleTakeDataAdmin(this.currentTab, datePayload);
  }

  onNextMonth() {
    let datePayload: any = {
      startDate: this.datePipe.transform(this.startDate, 'MM/dd/yyyy'),
      endDate: this.datePipe.transform(this.endDate, 'MM/dd/yyyy'),
    };
    if (this.calendarEl.getApi().view.type == 'timeGridWeek') {
      this.selectedDate.setDate(this.selectedDate.getDate() + 7);
      var startDate = this.selectedDate;
      var endDate = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate() + 7
      );
      datePayload.startDate = this.datePipe.transform(startDate, 'MM/dd/yyyy');
      datePayload.endDate = this.datePipe.transform(endDate, 'MM/dd/yyyy');
    } else if (this.calendarEl.getApi().view.type == 'timeGridDay') {
      this.selectedDate.setDate(this.selectedDate.getDate() + 1);
      var startDate = this.selectedDate;
      var endDate = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate() + 1
      );
      datePayload.startDate = this.datePipe.transform(startDate, 'MM/dd/yyyy');
      datePayload.endDate = this.datePipe.transform(endDate, 'MM/dd/yyyy');
    } else {
      this.selectedDate.setMonth(this.selectedDate.getMonth() + 1);
      const firstDayOfMonth = new Date(
        this.selectedDate.getFullYear(),
        this.selectedDate.getMonth(),
        1
      );
      const firstDayOfNextMonth = new Date(
        this.selectedDate.getFullYear(),
        this.selectedDate.getMonth() + 1,
        1
      );
      var startDate = firstDayOfMonth;
      var endDate = firstDayOfNextMonth;
      datePayload.startDate = this.datePipe.transform(startDate, 'MM/dd/yyyy');
      datePayload.endDate = this.datePipe.transform(endDate, 'MM/dd/yyyy');
    }

    this.calendar.activeDate = this.selectedDate;
    this.calendar.updateTodaysDate();
    this.calendarEl.getApi().gotoDate(this.selectedDate);
    this.getShiftScheduleTakeDataAdmin(this.currentTab, datePayload);

  }



  public printCalendar() {
    this.loading = true;
    setTimeout(() => {
      this.printCalendarDetail();
    }, 50);
  }

  public printCalendarDetail() {
    const printElement: any = document.getElementById('printId');
    const printWindow: any = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    printWindow.document.write(document.documentElement.innerHTML);
    setTimeout(() => {
      printWindow.document.body.style.margin = '0';
      printWindow.document.body.innerHTML = printElement.outerHTML;
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
      this.cdr.detectChanges();
      const element = document.getElementById('');
      const options = {
        margin: [0, 0, 0, 0],
        filename: 'Calendar.pdf',
        pagebreak: { avoid: ['div', 'p', 'span', '.page-break'] },
        html2canvas: { dpi: 96, scale: 2, useCORS: true },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait', header: () => {}, footer: () => {} },
      };
      html2pdf()
        .from(element)
        .set(options)
        .toPdf()
        .get('pdf')
        .then((pdf: any) => {
          const totalPages = pdf.internal.getNumberOfPages();
          for (let i = 1; i <= totalPages; i++) {
            if (i === 1) {
              pdf.setPage(i);
              pdf.setFontSize(16);
              pdf.setFontStyle('bold');
              pdf.setTextColor(0);
            }
          }
        });
    }, 100);
  }

  dayGridMonth() {
    if ((this.selectedView = 'timeGridWeek')) {
      var endDate = new Date(
        this.selectedDate.setDate(this.selectedDate.getDate() + 7)
      );
      this.selectedDate = new Date(
        moment(endDate).startOf('month').format('MM/DD/YYYY')
      );
    } else {
      this.selectedDate = new Date(
        moment(this.selectedDate).startOf('month').format('MM/DD/YYYY')
      );
    }
    this.month = true;
    this.week = false;
    this.day = false;
    this.selectedView = 'dayGridMonth';
    this.calendar.activeDate = this.selectedDate;
    this.checked=false

    const firstDayOfMonth = new Date(
      this.selectedDate.getFullYear(),
      this.selectedDate.getMonth(),
      1
    );
    const firstDayOfNextMonth = new Date(
      this.selectedDate.getFullYear(),
      this.selectedDate.getMonth() + 1,
      1
    );

    let datePayload: any = {
      startDate: this.datePipe.transform(firstDayOfMonth, 'MM/dd/yyyy'),
      endDate: this.datePipe.transform(firstDayOfNextMonth, 'MM/dd/yyyy'),
    };
    this.calendar.updateTodaysDate();
    this.calendarEl?.getApi().changeView('dayGridMonth');
    this.calendarEl.getApi().gotoDate(this.selectedDate);
    this.refreshCalendarEvents();
    this.getShiftScheduleTakeDataAdmin(this.currentTab, datePayload);

  }

  timeGridWeek() {
    this.month = false;
    this.week = true;
    this.day = false;
    this.selectedView = 'timeGridWeek';
    this.checked=false;
    this.calendar.updateTodaysDate();
    this.calendarEl?.getApi().changeView('timeGridWeek');
    this.calendarEl.getApi().gotoDate(this.selectedDate);
    this.refreshCalendarEvents();
    if (this.calendarEl.getApi().view.type === 'timeGridWeek')
      var today = this.selectedDate.getDay();
    // const endDate = this.datePipe.transform(this.getDate(today), 'MM/dd/yyyy');
    // const startDate = this.datePipe.transform(this.getDate(today, true), 'MM/dd/yyyy');

    let payload: any = {
      endDate: this.datePipe.transform(this.getDate(today), 'MM/dd/yyyy'),
      startDate: this.datePipe.transform(
        this.getDate(today, true),
        'MM/dd/yyyy'
      ),
    };
    this.calendar.activeDate = new Date(
      this.selectedDate.setDate(this.selectedDate.getDate() - today)
    );

    this.getShiftScheduleTakeDataAdmin(this.currentTab, payload);
  }
  timeGridDay() {

    if ((this.selectedView = 'timeGridWeek')) {
      var endDate = new Date(
        this.selectedDate.setDate(this.selectedDate.getDate() + 7)
      );
      this.selectedDate = new Date(
        moment(endDate).startOf('month').format('MM/DD/YYYY')
      );
    } else {
      this.selectedDate = new Date(
        moment(this.selectedDate).startOf('month').format('MM/DD/YYYY')
      );
    }
    this.month = false;
    this.week = false;
    this.day = true;
    this.checked=false;
    this.selectedView = 'timeGridDay';
    let datePayload: any;
    const firstDayOfMonth = new Date(
      this.selectedDate.getFullYear(),
      this.selectedDate.getMonth(),
      1
    );
    var startDate = firstDayOfMonth;
    var endDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate() + 1
    );
    datePayload = {
      startDate: this.datePipe.transform(startDate, 'MM/dd/yyyy'),
      endDate: this.datePipe.transform(endDate, 'MM/dd/yyyy'),
    };
    this.selectedDate = new Date(datePayload.startDate);
    this.calendar.activeDate = this.selectedDate;
    this.calendar.updateTodaysDate();
    this.calendarEl?.getApi().changeView('timeGridDay');
    this.calendarEl.getApi().gotoDate(this.selectedDate);
    this.refreshCalendarEvents();
    this.getShiftScheduleTakeDataAdmin(this.currentTab, datePayload);
  }


   getDate(days, isStart = false) {
    let date = new Date(this.selectedDate);
    if (isStart) {
      date.setDate(date.getDate() - days);
    } else {
      date.setDate(date.getDate() + (7 - days));
    }
    return date;
  }


  selectBadgeNumber(event) {
    if (!event) {
      this.clearSelectedShifts();
      this.nextShiftDate = '';
      this.refreshCalendarEvents();
      return;
    }

    this.clearSelectedShifts();
    let badgeNumber =
      this.getShiftScheduleTakeDataAdminResponse.shiftScheduleTakeDataDto.find(
        (x) => x.memberId == event
      )?.badgeNumber;
    if (badgeNumber) {
      let allSelectableShifts =
        this.getShiftScheduleTakeDataAdminResponse.shiftScheduleTakeDataDto.filter(
          (x) => x.badgeNumber == badgeNumber
        );
      if (allSelectableShifts?.length > 0) {
        allSelectableShifts.forEach((element) => {
          this.parentElem.push(element.shiftScheduleTakeId);
          this.parentElemContainer.push(element.shiftScheduleTakeId);
        });
        let nextShift = allSelectableShifts.find(
          (x) => new Date(x.scheduleDate) > new Date()
        );
        if (nextShift) {
          let shiftDate = moment(nextShift.scheduleDate).format(
            'MM/DD/YYYY hh:mm A'
          );
          this.nextShiftDate = 'Next shift: ' + shiftDate;
        } else {
          this.nextShiftDate = '';
        }
        this.refreshCalendarEvents();
      }
    }
  }

  clearSelectedShifts() {
    this.parentElem = [];
    this.parentElemContainer = [];
    this.refreshCalendarEvents();
  }

  onTodayButtonClick() {
    const calendarApi = this.calendarEl.getApi();
    const currentView = calendarApi.view.type;
    let datePayload: any = {
      startDate: this.datePipe.transform(this.startDate, 'MM/dd/yyyy'),
      endDate: this.datePipe.transform(this.endDate, 'MM/dd/yyyy'),
    };
      this.selectedDate=new Date();
      this.selectedDate.setDate(1);
      const firstDayOfMonth = new Date(
        this.selectedDate.getFullYear(),
        this.selectedDate.getMonth()
      );
      const firstDayOfNextMonth = new Date(
        this.selectedDate.getFullYear(),
        this.selectedDate.getMonth() + 1,
        1

      );
      var startDate = firstDayOfMonth;
      var endDate = firstDayOfNextMonth;
      datePayload.startDate = this.datePipe.transform(startDate, 'MM/dd/yyyy');
      datePayload.endDate = this.datePipe.transform(endDate, 'MM/dd/yyyy');
      if (currentView === 'timeGridWeek' || currentView === 'timeGridDay') {
          this.dayGridMonth();
           calendarApi.today();
          }
       this.calendar.activeDate = this.selectedDate;
      this.calendar.updateTodaysDate();
      this.calendarEl.getApi().gotoDate(this.selectedDate);
      if(currentView==='dayGridMonth'){
      this.getShiftScheduleTakeDataAdmin(this.activeTab, datePayload);
      }
}

  nextPrevTitle(e) {
    const className = e?.target?.className
    if (className === 'fc-icon fc-icon-chevron-left' || className === 'fc-prev-button fc-button fc-button-primary') {
          this.onPreviousMonth();
    } else if (className === 'fc-icon fc-icon-chevron-right' || className === 'fc-next-button fc-button fc-button-primary') {
        this.onNextMonth();
    }
  }

            /*IN PROGRESS */
//   shiftScheduleTakeDataAdminExpand() {
//     this.dayMaxEventRowsCount = null;



//      this.showOptions(event);

// }
// shiftScheduleTakeDataAdminCollapse() {
//    this. dayMaxEventRowsCount = 5;
//    this.showOptions(event);

//    // this.createEventsFromResponse(event);

// }
}
