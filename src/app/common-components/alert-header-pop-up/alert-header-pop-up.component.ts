import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { HeaderService } from 'src/app/services/header.service';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-header-pop-up',
  templateUrl: './alert-header-pop-up.component.html',
  styleUrls: ['./alert-header-pop-up.component.scss']
})
export class AlertHeaderPopUpComponent implements OnInit,OnDestroy { 
  alertForm: FormGroup;
  headerAlertdata: any;
  recognition: any;
  isListening:boolean = false;
  title="Alert";
  private destroy$ = new Subject<void>();
  constructor( private fb: FormBuilder,
    private headerService:HeaderService,
    private snackBar:MatSnackBar,
    private authService:AuthService,
    private zone: NgZone,
    public dialogRef: MatDialogRef<AlertHeaderPopUpComponent>){

      this.initializeRecognition()
  }
  ngOnInit(): void {
    this.alertHeader();
      this.alertForm = this.fb.group({
        message: [null, Validators.required],
        selectedExpertises: [],
      });
  }
  alertHeader() {
    this.headerService.GetAll().pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any) => {

        this.headerAlertdata = res.data;
      },
    });
  }

 ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  sendSms() {
    if (this.alertForm.valid) {
    const payload={
      alertMessageType: 1,
      clickedButton: "btnSendAlertNotificationSms",
      loggedInUserId: this.authService.userInfo$.value.data.tokens.userID,
      message: this.alertForm.controls['message'].value,
      selectedExpertises: this.alertForm.controls['selectedExpertises'].value
    }
    this.headerService.getAlert(payload).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any) => {
          this.alertForm.get('message').setValue(null);
          this.snackBar.openFromComponent(SnackbarComponent,
          {
            duration: 3000,
            horizontalPosition: 'start',
            data: {
              title: res.messages,
              action: 'Dismiss',
              type: 'snackbar-success',
            },
          }
        );
      },

    });
    }
    else {
      this.snackBar.openFromComponent(SnackbarComponent,
        {
          duration: 3000,
          horizontalPosition: 'start',
          data: {
            title:'Warning! Alert Message cannot be empty',
            action: 'Dismiss',
            type: 'snackbar-warning',
          },
        }
    );

    }
  }
  closedialog() {    
    this.dialogRef.close();
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
        const currentMessage = this.alertForm.get('message').value || '';
        this.alertForm.get('message').setValue(currentMessage + transcript);
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
}
