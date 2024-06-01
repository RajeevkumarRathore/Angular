import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { ShiftScheduleService } from 'src/app/services/shift-schedule.service';
import { ValidationPopComponent } from '../validation-pop/validation-pop.component';

@Component({
  selector: 'app-create-update-shift-schedule',
  templateUrl: './create-update-shift-schedule.component.html',
  styleUrls: ['./create-update-shift-schedule.component.scss']
})
export class CreateUpdateShiftScheduleComponent implements OnInit {
  public calendarForm: FormGroup;
  public title = this.schedule.data ? 'Edit Shift Schedule' : 'Create Shift Schedule';
  private destroy$ = new Subject<void>();
  getRequestShiftTypesResponse: any;
  public spinner = false;

  constructor(private fb: FormBuilder,
     public dialogRef: MatDialogRef<CreateUpdateShiftScheduleComponent>,
     @Inject(MAT_DIALOG_DATA) public schedule: any = null,
     public dialog: MatDialog,
     public shiftScheduleService:ShiftScheduleService ){
      this.shiftScheduleService.isSpinner.subscribe({
        next: (res) => {
          this.spinner = res;
        }
      })
     }

  ngOnInit() {
    this.CreateUpdateScheduleForm();
    this.getRequestShiftTypes();
  }

  private CreateUpdateScheduleForm() {
    this.calendarForm = this.fb.group({
      name: [this.schedule.data != undefined ? this.schedule?.data?.shiftScheduleName : null,[Validators.required]],
      shiftTypeId: [this.schedule.data != undefined ? this.schedule.data.shiftTypeId : null,[Validators.required]],
      startTime: [this.schedule.data != undefined ? this.schedule?.data?.startTime : null,[Validators.required]],
      endTime: [this.schedule.data != undefined ? this.schedule?.data?.endTime : null,[Validators.required]],

    })
  }

  getRequestShiftTypes(){
    this.shiftScheduleService.getRequestShiftTypes().pipe(takeUntil(this.destroy$)).subscribe((res:any)=>{
      this.getRequestShiftTypesResponse=res.data
    })
  }

  public dialogCalendar(e: string) {
    if(this.calendarForm.valid){
      this.spinner = true;
    if (e === "Create") {
          this.schedule.callBackFn(this.dialogRef, this.calendarForm.value, e);
      }
      else if(e=="Edit"){
        this.schedule.callBackFn(this.dialogRef,{...this.calendarForm.value,shiftScheduleId:this.schedule.data.shiftScheduleId},e)
      }
    }
    else{
         this.dialog.open(ValidationPopComponent,{
         width: '400px',
          data: {
          message: 'Please fill all areas',
          },
       })
      }
    }

  public close() {
    this.schedule = null;
    this.dialogRef.close()
  }
}
