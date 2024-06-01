import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShiftScheduleComponent } from './shift-schedule/shift-schedule.component';

const routes: Routes = [{ path: '', children: [
  { path: '', component: ShiftScheduleComponent, data: { title: "Shift Schedule" } }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShiftScheduleRoutingModule { }
