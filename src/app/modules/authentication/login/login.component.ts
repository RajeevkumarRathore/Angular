import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { StorageKeyEnum } from 'src/app/core/StorageKeyEnum';
import { LoginModel } from 'src/app/models/login.model';
import { AuthService } from 'src/app/services/auth.service';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy{
  public loginForm: FormGroup;
  public showLoader = false;
  private destroy$ = new Subject<void>();
  public errorMessage: string;
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private dialog:MatDialog
  ) {}
  public flag = {
    submitted: false
  }

  ngOnInit(): void {
    this.initialLoad();
  }

  public initialLoad() {
    this.loginForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
    this.loginForm.valueChanges
    .pipe(takeUntil(this.destroy$))
    .subscribe(() => (this.errorMessage = null));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  public login() {
    if(this.loginForm.valid){

      this.showLoader = true;
      this.authService
        .login(
          this.loginForm.get("username").value,
          this.loginForm.get("password").value
        )
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next:(value: any) => {
            if(value.data != null){
              localStorage.setItem(StorageKeyEnum.User, JSON.stringify(value.data.userInfoDto));
              localStorage.setItem(StorageKeyEnum.TokenInfo, JSON.stringify(value.data.tokens));
              this.router.navigate(["/dashboard"]);
            }else{
              this.showLoader = false;
              this.errorMessage = value.errors[0];
            }
          },error:(err) => {
            this.showLoader = false;
            this.errorMessage = err.error.message;
          }
        });
    }
    else{
      this.flag.submitted = true
    }

  }
  forgorPassword(){
    this.dialog
    .open(ForgotPasswordComponent, {
      width: '600px',
      data: {
        thankYou: 'thankYou',


      },
    })
  }
}
