import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ShiftScheduleRoutingModule } from './shift-schedule-routing.module';
import { ShiftScheduleComponent } from './shift-schedule/shift-schedule.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { CommonComponentsModule } from 'src/app/common-components/common-components.module';
import { CreateUpdateShiftScheduleComponent } from './create-update-shift-schedule/create-update-shift-schedule.component';
import { EditShiftSchedulePopUpComponent } from './edit-shift-schedule-pop-up/edit-shift-schedule-pop-up.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatIconModule } from '@angular/material/icon';
import { DeleteShiftscheduleTakePopUpComponent } from './delete-shiftschedule-take-pop-up/delete-shiftschedule-take-pop-up.component';
import { ValidationPopComponent } from './validation-pop/validation-pop.component';


@NgModule({
  declarations: [
    ShiftScheduleComponent,
    CreateUpdateShiftScheduleComponent,
    EditShiftSchedulePopUpComponent,
    DeleteShiftscheduleTakePopUpComponent,
    ValidationPopComponent,


  ],
  imports: [
    CommonModule,
    CommonComponentsModule,
    ShiftScheduleRoutingModule,
    FullCalendarModule,
    AngularMaterialModule,
    NgSelectModule,
    MatIconModule,
    AngularMaterialModule

  ],

  providers: [
    DatePipe
]
})
export class ShiftScheduleModule { }
