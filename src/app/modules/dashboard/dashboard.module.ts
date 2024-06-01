import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardChartsComponent } from './dashboard-charts/dashboard-charts.component';
import { NightShiftsComponent } from './night-shifts/night-shifts.component';
import { TopListingComponent } from './top-listing/top-listing.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { PcrSummaryPopUpComponent } from './pcr-summary-pop-up/pcr-summary-pop-up.component';
import { CommonComponentsModule } from 'src/app/common-components/common-components.module';
import { DataGridModule } from 'src/app/data-grid/data-grid.module';

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardChartsComponent,
    NightShiftsComponent,
    TopListingComponent,
    PcrSummaryPopUpComponent,

  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    CommonComponentsModule,
    DataGridModule,
    AngularMaterialModule
  ]
})
export class DashboardModule { }
