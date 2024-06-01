import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { CallHistoryRoutingModule } from './call-history-routing.module';
import { CallHistoryComponent } from './call-history/call-history.component';
import { CommonComponentsModule } from 'src/app/common-components/common-components.module';
import { DataGridModule } from 'src/app/data-grid/data-grid.module';
import { CallHistoryDetailSideBarComponent } from './call-history-detail-side-bar/call-history-detail-side-bar.component';
import { PrintCallHistorySideBarComponent } from './print-call-history-side-bar/print-call-history-side-bar.component';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material/angular-material.module';


@NgModule({
  declarations: [
    CallHistoryComponent,
    CallHistoryDetailSideBarComponent,
    PrintCallHistorySideBarComponent
  ],
  imports: [
    CommonModule,
    CommonComponentsModule,
    CallHistoryRoutingModule,
    DataGridModule,
    FormsModule,
    AngularMaterialModule
  ],
    providers: [
    DatePipe
]
})
export class CallHistoryModule { }
