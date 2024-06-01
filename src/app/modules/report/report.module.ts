import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report.component';
import { CommonComponentsModule } from 'src/app/common-components/common-components.module';
import { DataGridModule } from 'src/app/data-grid/data-grid.module';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { AgGridModule } from '@ag-grid-community/angular';
import { ReportDetailPopupComponent } from './report-detail-popup/report-detail-popup.component';
import { PrintCallHistoryComponent } from './print-call-history/print-call-history.component';
import { PrintReportDetailComponent } from './print-report-detail/print-report-detail.component';
import { ThanksMessageToAllPopUpComponent } from './thanks-message-to-all-pop-up/thanks-message-to-all-pop-up.component';
import { MemberBydateSettingPopUpComponent } from './member-bydate-setting-pop-up/member-bydate-setting-pop-up.component';
import { ViewThankYouMessagePopUpComponent } from './view-thank-you-message-pop-up/view-thank-you-message-pop-up.component';

@NgModule({
  declarations: [
    ReportComponent,
    ReportDetailPopupComponent,
    PrintCallHistoryComponent,
    PrintReportDetailComponent,
    ThanksMessageToAllPopUpComponent,
    MemberBydateSettingPopUpComponent,
    ViewThankYouMessagePopUpComponent
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    CommonComponentsModule,
    DataGridModule,
    AngularMaterialModule,
    AgGridModule
  ],
  providers: [
    DatePipe
]
})
export class ReportModule { }
