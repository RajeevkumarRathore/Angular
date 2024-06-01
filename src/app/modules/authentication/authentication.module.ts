import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationComponent } from './authentication.component';
import { LoginComponent } from './login/login.component';
import { CommonComponentsModule } from 'src/app/common-components/common-components.module';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { NgOtpInputModule } from 'ng-otp-input';

@NgModule({
  declarations: [
    AuthenticationComponent,
    LoginComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    CommonComponentsModule,
    AngularMaterialModule,
    NgOtpInputModule,
  ]
})
export class AuthenticationModule { }
