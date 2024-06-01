import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridWrapperComponent } from './grid-wrapper/grid-wrapper.component';
import { AgGridModule } from '@ag-grid-community/angular';
import { AgGridComponentsModule } from '../ag-grid-components/ag-grid-components/ag-grid-components.module';
import { GridWrapperHeaderComponent } from './grid-wrapper-header/grid-wrapper-header.component';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { ReportSummaryDatePickerComponent } from './report-summary-date-picker/report-summary-date-picker.component';


@NgModule({
  declarations: [
    GridWrapperComponent,
    GridWrapperHeaderComponent,
    ReportSummaryDatePickerComponent,
    
  ],
  imports: [
    CommonModule,
    AgGridModule,
    CommonComponentsModule,
    AgGridComponentsModule
  ],
  exports: [
    GridWrapperComponent
  ]
})
export class DataGridModule { }
