import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth.guard';

const routes: Routes = [
  {
    path: 'account',
    loadChildren: () => import('./modules/authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  },
  { path: 'report',
    loadChildren: () => import('./modules/report/report.module').then(m => m.ReportModule),
    canActivate: [AuthGuard]
  },
  { path: 'shift-schedule',
    loadChildren: () => import('./modules/shift-schedule/shift-schedule.module').then(m => m.ShiftScheduleModule),
    canActivate: [AuthGuard]
  },
  { path: 'call-history',
    loadChildren: () => import('./modules/call-history/call-history.module').then(m => m.CallHistoryModule),
    canActivate: [AuthGuard]
  },
  { path: 'members',
    loadChildren: () => import('./modules/members/members.module').then(m => m.MembersModule),
    canActivate: [AuthGuard]
  },
  { path: 'contact',
    loadChildren: () => import('./modules/contact/contact.module').then(m => m.ContactModule),
    canActivate: [AuthGuard]
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
