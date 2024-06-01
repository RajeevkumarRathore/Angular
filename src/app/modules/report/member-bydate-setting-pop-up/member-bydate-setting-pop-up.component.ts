import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/common-components/snackbar/snackbar.component';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-member-bydate-setting-pop-up',
  templateUrl: './member-bydate-setting-pop-up.component.html',
  styleUrls: ['./member-bydate-setting-pop-up.component.scss']
})
export class MemberBydateSettingPopUpComponent implements OnInit {
  title="Advanced Setting";
  setttingForm:FormGroup
  dayCallFromtime: any = { hour: 0, minute: 0, meriden: 'AM', format: 12 };
  dayCallTotime: any = { hour: 0, minute: 0, meriden: 'AM', format: 12 };
  nightCallFromtime: any = { hour: 0, minute: 0, meriden: 'AM', format: 12 };
  nightCallTotime: any = { hour: 0, minute: 0, meriden: 'AM', format: 12 };
  dayAndNightSettingTime: any;

  constructor(public dialogRef: MatDialogRef<MemberBydateSettingPopUpComponent>,
    private reportService: ReportService,
    private fb:FormBuilder,
    private snackBar:MatSnackBar){

  }
  ngOnInit(): void {
    this.getNightCallTimesSettings();
    this.setttingForm = this.fb.group({
      dayCallFromtime: [],  
      dayCallTotime: [],    
      nightCallFromtime: [],
      nightCallTotime: [],  
    });
  }
  

  close() {    
    this.dialogRef.close();
  }
  action(e){
      if(e=="Close")
        { this.dialogRef.close()}
        else{
          this.setttingForm.value
        this.updateNightCallTimesSettings()
        this.dialogRef.close()
      }
  }

  updateNightCallTimesSettings(){
    
    const payload = {
      dayCallFromtime: this.setttingForm.value.dayCallFromtime ?? this.dayAndNightSettingTime.dayCallFromtime,
      dayCallTotime: this.setttingForm.value.dayCallTotime ?? this.dayAndNightSettingTime.dayCallTotime,
      nightCallFromtime: this.setttingForm.value.nightCallFromtime ?? this.dayAndNightSettingTime.nightCallFromtime,
      nightCallTotime: this.setttingForm.value.nightCallTotime ?? this.dayAndNightSettingTime.nightCallTotime,
    };
    this.reportService.updateNightCallTimesSettings(payload).subscribe({
      next: (res: any) => {
        if (res.data === true) {
          this.snackBar.openFromComponent(SnackbarComponent, {
            duration: 3000,
            horizontalPosition: 'center',
            data: {
              title: res.message,
              action: 'Dismiss',
              type: 'snackbar-warning',
            },
          });
        }
        this.getNightCallTimesSettings();
      },
    });
  }
   
  getNightCallTimesSettings(){
    this.reportService.getNightCallTimesSettings().subscribe({
      next: (res: any)=>{
        this.dayAndNightSettingTime = res.data
        this.formatDateAndTime();
      }
    })
  }

  formatDateAndTime(){
    let [dayCallFromTimeHours, dayCallFromTimeMinutes] = this.dayAndNightSettingTime.dayCallFromtime.split(':').map(Number);
    if(dayCallFromTimeHours <= 12 && dayCallFromTimeHours != 0){
    this.dayCallFromtime.hour = dayCallFromTimeHours;
    this.dayCallFromtime.minute = dayCallFromTimeMinutes;
    }else{
      this.dayCallFromtime.hour = dayCallFromTimeHours % 12 || 12; 
      this.dayCallFromtime.minute = dayCallFromTimeMinutes;
      this.dayCallFromtime.meriden = dayCallFromTimeHours < 12 ? 'AM' : 'PM';
    }
    let [dayCallTotimeHours, dayCallTotimeMinutes] = this.dayAndNightSettingTime.dayCallTotime.split(':').map(Number);
    if(dayCallTotimeHours <= 12 && dayCallTotimeHours != 0){
    this.dayCallTotime.hour = dayCallTotimeHours;
    this.dayCallTotime.minute = dayCallTotimeMinutes;
    }else{
      this.dayCallTotime.hour = dayCallTotimeHours % 12 || 12; 
      this.dayCallTotime.minute = dayCallTotimeMinutes;
      this.dayCallTotime.meriden = dayCallTotimeHours < 12 ? 'AM' : 'PM';
    }
    let [nightCallFromtimeHours, nightCallFromtimeMinutes] = this.dayAndNightSettingTime.nightCallFromtime.split(':').map(Number);
    if(nightCallFromtimeHours <= 12 && nightCallFromtimeHours != 0){
      this.nightCallFromtime.hour = nightCallFromtimeHours;
       this.nightCallFromtime.minute = nightCallFromtimeMinutes;
    }else{
      this.nightCallFromtime.hour = nightCallFromtimeHours % 12 || 12; 
      this.nightCallFromtime.minute = nightCallFromtimeMinutes;
      this.nightCallFromtime.meriden = nightCallFromtimeHours < 12 ? 'AM' : 'PM';
    }   
    
    let [nightCallTotimeHours, nightCallTotimeMinutes] = this.dayAndNightSettingTime.nightCallTotime.split(':').map(Number);
    if(nightCallTotimeHours <= 12 && nightCallTotimeHours != 0){
      this.nightCallTotime.hour = nightCallTotimeHours;
      this.nightCallTotime.minute = nightCallTotimeMinutes;
    }else{
      this.nightCallTotime.hour = nightCallTotimeHours % 12 || 12; 
      this.nightCallTotime.minute = nightCallTotimeMinutes;
      this.nightCallTotime.meriden = nightCallTotimeHours < 12 ? 'AM' : 'PM';
    }
  }

  onChangeHour(event,type: string) {
   if(event.meriden == 'PM'){
    event.hour = Number(event.hour) + 12;
   }
    switch (type){
      case 'dayCallFromtime':{
        this.setttingForm.patchValue({
          dayCallFromtime: event.hour + ':' + event.minute,
        })
        break;
      }
      case 'dayCallTotime':{
        this.setttingForm.patchValue({
          dayCallTotime: event.hour + ':' + event.minute,
        })
        break;
      }
      case 'nightCallFromtime':{
        this.setttingForm.patchValue({
          nightCallFromtime: event.hour + ':' + event.minute,
        })
        break;
      }
      case 'nightCallTotime':{
        this.setttingForm.patchValue({
          nightCallTotime: event.hour + ':' + event.minute,
        })
        break;
      }
    }
  }
}
