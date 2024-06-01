import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { StorageKeyEnum } from 'src/app/core/StorageKeyEnum';
import { LoginModel } from 'src/app/models/login.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  countdownMinutes: number =3;
  countdownSeconds: number =0;
  countdownInterval: any;
  otpValue:any
  public forgotPassswordForm: FormGroup;
  public newPasswordForm: FormGroup;
  checkUsernameAndPhone: any;
  checkOtp: any;
  newPassword: any;
  confirmpassword: any;
  public errorMessage: string;
  private destroy$ = new Subject<void>();
  public flag = {
    submitted: false
  }

  constructor(  private fb: FormBuilder,
    private authservice:AuthService,
    private router: Router,){

  }

  ngOnInit(): void {
    this.forgotPassswordForm = this.fb.group({
      username: [null, Validators.required],
      phoneNumber: [null, Validators.required],
    });
    this.newPasswordForm = this.fb.group({
      newPassword: [null, Validators.required],
     confirmPassword: [null, Validators.required],

    });

  }



  startCountdown() {
    this.countdownInterval = setInterval(() => {
      this.countdownSeconds--;
      if (this.countdownMinutes === 0 && this.countdownSeconds === 0) {
        clearInterval(this.countdownInterval);
      } else if (this.countdownSeconds === -1) {
        this.countdownMinutes--;
        if (this.countdownMinutes < 0) {
          clearInterval(this.countdownInterval);
          this.countdownMinutes = 0;
          this.countdownSeconds = 0;
        } else {
          this.countdownSeconds = 59;
        }
      }
    }, 1000);
  }


  Submit(){
   this.errorMessage = null;
   if(this.forgotPassswordForm.valid) {
    const payload={
      username:this.forgotPassswordForm.value.username,
      phone:this.forgotPassswordForm.value.phoneNumber
     }
     this.authservice.checkUsernameAndPhone(payload).subscribe({
      next: (res: any) => {
        if(res.succeeded == true){
          this.checkUsernameAndPhone = res.messages[0];
          if(this.checkUsernameAndPhone == "Success"){
            this.startCountdown();
          }
        }else{
          this.errorMessage = res.errors[0];
        }
      }
    });
   }
   else{
    this.flag.submitted = true
   }

  }

  checkOTP(){
    this.errorMessage = null;
    const payload={
      otp:this.otpValue,
      phone:this.forgotPassswordForm.value.phoneNumber,
      username:this.forgotPassswordForm.value.username,
    }
    this.authservice.checkOTP(payload).subscribe({
      next: (res: any) => {
        if(res.succeeded == true){
          this.checkOtp=res.messages[0];
        }else{
          this.errorMessage = res.errors[0];
        }
      }
    });
  }


  updatePassword(){
    this.errorMessage = null;
    const payload={
      confirmPassword:this.newPasswordForm.value.confirmPassword,
      otp:this.otpValue,
      password:this.newPasswordForm.value.newPassword,
      phone:this.forgotPassswordForm.value.phoneNumber,
      username:this.forgotPassswordForm.value.username,
    }
    this.authservice.updatePassword(payload).subscribe({
      next: (res: any) => {
        if(res.succeeded == true)  {
         this.authservice.login(
          this.forgotPassswordForm.value.username,
          this.newPasswordForm.value.newPassword,
          )
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next:(value: LoginModel) => {
              localStorage.setItem(StorageKeyEnum.User, JSON.stringify(value.data.userInfoDto));
              localStorage.setItem(StorageKeyEnum.TokenInfo, JSON.stringify(value.data.tokens));
              this.router.navigate(["/dashboard"]);
            },error:(err) => {
              this.errorMessage = err.error.message;
            }
          });
        }else{
          this.errorMessage = res.errors[0];
        }
      }
    });
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  submitOtp(otp){
  this.otpValue=otp;
  this.checkOTP();
  }

  createNewPassword(){
    if(this.newPasswordForm.valid){
      this.updatePassword();
    }
    else{
      this.flag.submitted = true
     }

  }

  }
