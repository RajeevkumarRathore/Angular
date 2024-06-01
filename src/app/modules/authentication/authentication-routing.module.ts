import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [{ path: '',     children: [
  { path: "", pathMatch: "full", redirectTo: "login" },
  { path: "login", component: LoginComponent, data: { title: "Login" } }, 
  { path: "forgot-password", component: ForgotPasswordComponent, data: { title: "forgot-password" } } ,
  ],
 }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
