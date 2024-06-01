import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { ShiftScheduleService } from 'src/app/services/shift-schedule.service';
import { ValidationPopComponent } from '../validation-pop/validation-pop.component';

@Component({
  selector: 'app-edit-shift-schedule-pop-up',
  templateUrl: './edit-shift-schedule-pop-up.component.html',
  styleUrls: ['./edit-shift-schedule-pop-up.component.scss']
})
export class EditShiftSchedulePopUpComponent implements OnInit{
  public editSheduleForm: FormGroup;
  private destroy$ = new Subject<void>();
  public title = 'Shift Schedule';
  dispatcherMembers: any;
  showCalendar = false;
  weekDaysDe;
  public spinner = false;

  constructor(public shiftScheduleService:ShiftScheduleService,
    private fb: FormBuilder,
     public dialogRef: MatDialogRef<EditShiftSchedulePopUpComponent>,
     @Inject(MAT_DIALOG_DATA) public editSchedule: any = null,
     public dialog: MatDialog,
    ){
      this.shiftScheduleService.isSpinner.subscribe({
        next: (res) => {
          this.spinner = res;
        }
      })
    }
  ngOnInit(): void {
    this.weekDaysDe = this.shiftScheduleService.weekDaysDe;
    this.editPopUpScheduleForm();
    this.getMembersForShiftSchedule();
    this.subscribeToWeekDaysChanges();
  }


 private editPopUpScheduleForm() {
    this.editSheduleForm = this.fb.group({
      badgeNumber: [this.editSchedule?.data != undefined ? this.editSchedule?.data?.badgeNumber : null,[Validators.required]],
      startDate:[new Date()],
      endDate:[null,],
      weekDays: this.fb.array([
        this.fb.control(false),
        this.fb.control(false),
        this.fb.control(false),
        this.fb.control(false),
        this.fb.control(false),
        this.fb.control(false),
        this.fb.control(false),
        this.fb.control(false),
      ])
    })


  }

  private subscribeToWeekDaysChanges() {
    const weekDaysArray = this.editSheduleForm.get('weekDays') as FormArray;
    weekDaysArray.valueChanges.subscribe(values => {
      const endDateControl = this.editSheduleForm.get('endDate');
      if (values.some(val => val === true)) {
        endDateControl.setValidators([Validators.required]);
      } else {
        endDateControl.clearValidators();
      }
      endDateControl.updateValueAndValidity();
    });
  }
  getMembersForShiftSchedule(){
    this.shiftScheduleService.getMembersForShiftSchedule().pipe(takeUntil(this.destroy$)).subscribe((res:any)=>{
      this.dispatcherMembers=res.data.dispatcherMembers;
    })
  }

  public dialogEditCalendar(e: string) {
    const badgeNumber = this.editSheduleForm.get('badgeNumber').value;

    if (e === 'Save' && this.editSheduleForm.valid) {
      this.spinner = true;
      if (badgeNumber) {
        const memberName = this.dispatcherMembers.findIndex((x) => x.userId == badgeNumber);
        this.editSchedule.callBackFn(
          this.dialogRef,
          { formData: this.editSheduleForm.value, selectedMember: this.dispatcherMembers[memberName].badgeNumber },
          e
        );
       }

    } else if (!badgeNumber) {
      this.dialog.open(ValidationPopComponent, {
        width: '400px',
        data: {
          title: 'Members is empty',
          message: 'Please select a member for the Weekly Shift Schedule.',
        },
      });
    } else {
      this.dialog.open(ValidationPopComponent, {
        width: '400px',
        data: {
          title: 'End date is empty',
          message: 'You Need To Select an end date for Weekly Shift Schedule.',
        },
      });
    }
  }



    get weekDaysArray() : FormArray{
      return this.editSheduleForm.get('weekDays') as FormArray;
    }


    openCalendar() {
      this.showCalendar = !this.showCalendar;
    }

    handleSlideToggleChange(index: number): void {
      const weekDaysArray = this.editSheduleForm.get('weekDays') as FormArray;
      for (let i = 0; i < weekDaysArray.length; i++) {
        if (i !== index) {
          weekDaysArray.at(i).setValue(false);
        }
      }
    }

  public close() {
    this.editSchedule = null;
    this.dialogRef.close()
  }
}
