import { Component, Inject, NgZone, OnDestroy, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-notification-header-pop-up',
  templateUrl: './notification-header-pop-up.component.html',
  styleUrls: ['./notification-header-pop-up.component.scss']
})
export class NotificationHeaderPopUpComponent implements OnInit,OnDestroy{

  title = 'Add New Dispatcher Notification';
  spin = false
  hospitalData: any;
  selectedHospital: any;
  notificationForm:FormGroup
  selectedHospitalId: any;
  recognition: any;
  isListening: boolean = false;
  private destroy$ = new Subject<void>();
  exportTime: any = { hour: 0, minute: 0, meriden: 'AM', format: 12 };
  flag = {
    submitted: false
  }

  constructor(private headerService:HeaderService,
    private fb: FormBuilder,
    private authService:AuthService,
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<NotificationHeaderPopUpComponent>,
    private snackBar:MatSnackBar,
    private zone:NgZone){

      this.initializeRecognition();
  }

ngOnInit(): void {
  this.notificationForm = this.fb.group({
    dispatcherNotificationDaySelect: [null, Validators.required],
    EffectiveUntill: [ null, Validators.required],
    DispatchNotificationText:[''],
    HospitalId:[],
    isNotifyEveryone:[false]
  });
}

ngOnDestroy(): void {
  this.destroy$.next();
  this.destroy$.unsubscribe();
}
action(e) {
  if(e === "Save"){
    this.saveNotification();
  }
  else {
    this.dialogRef.close();
  }
}

close(){
  this.dialogRef.close();
}

saveNotification(){
  if(this.notificationForm.valid){
    const payload={
      CreatedBy:  this.authService.userInfo$.value.data.tokens.userID,
    DispatchNotificationText: this.notificationForm.controls['DispatchNotificationText'].value,
    EffectiveUntill: this.notificationForm.controls['EffectiveUntill'].value,
    HospitalId: this.selectedHospitalId,
    dispatcherNotificationDaySelect: this.notificationForm.controls['dispatcherNotificationDaySelect'].value,
    isNotifyEveryone: this.notificationForm.controls['isNotifyEveryone'].value,
    }
    this.headerService.saveDispatchNotification(payload).pipe(takeUntil(this.destroy$)).subscribe({
      next:(res:any)=>{
      this.dialogRef.close('Saved');
      }
    })
  }else{
    this.flag.submitted = true
  }
}


searchHospitals(event): void {
  if (event.target.value.trim() === '') {
    return;
  }
  const payload = {
    searchText: event.target.value.trim()
  };

  this.headerService.searchHospitals(payload).pipe(takeUntil(this.destroy$)).subscribe({
    next: (res: any) => {
      this.hospitalData = res.data;
    },
    error: (err: any) => {
      console.error('Error fetching hospital data:', err);
    }
  });
}

onHospitalSelection(selectedValue: any): void {
  this.selectedHospital = selectedValue?.hospital?.name;
  this.selectedHospitalId = selectedValue.hospital.id;
  this.notificationForm.controls['HospitalId'].setValue(this.selectedHospital);
}
initializeRecognition() {
  if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    this.recognition = new (window['SpeechRecognition'] || window['webkitSpeechRecognition'])();
    this.recognition.lang = 'en-US';

    this.recognition.onstart = () => {
      this.zone.run(() => {
        this.isListening = true;
      });
    };

    this.recognition.onresult = (event: any) => {
      this.isListening = false;
      const transcript = event.results[0][0].transcript;
      const currentMessage = this.notificationForm.get('DispatchNotificationText').value || '';
      this.notificationForm.get('DispatchNotificationText').setValue(currentMessage + transcript);
    };

    this.recognition.onend = () => {
      this.zone.run(() => {
        this.isListening = false;
      });
    };
  }
}


toggleSpeechRecognition() {
  if (this.isListening) {
    this.stopSpeechRecognition();
  } else {
    this.startSpeechRecognition();
  }
}

startSpeechRecognition() {
  this.recognition.start();
  this.isListening = true;
}

stopSpeechRecognition() {
  this.recognition.stop();
  this.isListening = false;
}

onChangeHour(event) {
  if(event.hour != 0){
    this.notificationForm.patchValue({
      EffectiveUntill: event.hour + ':' + event.minute + ' ' + event.meriden
    })
  }
}
}
