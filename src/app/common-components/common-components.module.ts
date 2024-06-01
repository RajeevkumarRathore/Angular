import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { HeaderComponent } from './header/header.component';
import { HeaderSummaryComponent } from './header-summary/header-summary.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../modules/angular-material/angular-material.module';
import { DoughnutChartComponent } from './charts/doughnut-chart/doughnut-chart.component';
import { LineChartComponent } from './charts/line-chart/line-chart.component';
import { BarChartComponent } from './charts/bar-chart/bar-chart.component';
import { HorizontalTabsComponent } from './horizontal-tabs/horizontal-tabs.component';
import { ButtonComponent } from './button/button.component';
import { DateComponentRendererComponent } from './date-component-renderer/date-component-renderer.component';
import { DialogComponent } from './dialogs/dialog/dialog.component';
import { DialogFooterComponent } from './dialogs/dialog-footer/dialog-footer.component';
import { DialogHeaderComponent } from './dialogs/dialog-header/dialog-header.component';
import { MessageHeaderPopUpComponent } from './message-header-pop-up/message-header-pop-up.component';
import { NotificationHeaderPopUpComponent } from './notification-header-pop-up/notification-header-pop-up.component';
import { AdminProfileSideBarComponent } from './admin-profile-side-bar/admin-profile-side-bar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgSelectModule } from '@ng-select/ng-select';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { CommonSideBarComponent } from './common-side-bar/common-side-bar.component';
import { RouterModule } from '@angular/router';
import { ImportantHeaderPopUpComponent } from './important-header-pop-up/important-header-pop-up.component';
import { HelpHeaderPopUpComponent } from './help-header-pop-up/help-header-pop-up.component';
import { AlertHeaderPopUpComponent } from './alert-header-pop-up/alert-header-pop-up.component';
import { DispatchBookHeaderPopUpComponent } from './dispatch-book-header-pop-up/dispatch-book-header-pop-up.component';


@NgModule({
  declarations: [
    DatePickerComponent,
    HeaderComponent,
    HeaderSummaryComponent,
    DoughnutChartComponent,
    LineChartComponent,
    BarChartComponent,
    HorizontalTabsComponent,
    ButtonComponent,
    DateComponentRendererComponent,
    DialogComponent,
    DialogFooterComponent,
    DialogHeaderComponent,
    MessageHeaderPopUpComponent,
    NotificationHeaderPopUpComponent,
    AdminProfileSideBarComponent,
    SnackbarComponent,
    ConfirmDialogComponent,
    CommonSideBarComponent,
    ImportantHeaderPopUpComponent,
    HelpHeaderPopUpComponent,
    AlertHeaderPopUpComponent,
    DispatchBookHeaderPopUpComponent

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AngularMaterialModule,
    MatSidenavModule,
    NgSelectModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    InfiniteScrollModule,
    RouterModule,
  ],
  exports:[
    DatePickerComponent,
    HeaderComponent,
    HeaderSummaryComponent,
    ReactiveFormsModule,
    FormsModule,
    AngularMaterialModule,
    LineChartComponent,
    DoughnutChartComponent,
    BarChartComponent,
    HorizontalTabsComponent,
    ButtonComponent,
    DateComponentRendererComponent,
    DialogComponent,
    MatSidenavModule,
    SnackbarComponent,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    InfiniteScrollModule,
    CommonSideBarComponent,
    RouterModule,
    NgSelectModule,
  ]
})
export class CommonComponentsModule { }
