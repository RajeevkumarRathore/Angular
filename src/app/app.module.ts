import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonComponentsModule } from './common-components/common-components.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './core/auth.guard';
import { TokenInterceptorService } from './core/token-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActionsCellRendererComponent } from './ag-grid-components/actions-cell-renderer/actions-cell-renderer.component';
import { MembersCellRendererComponent } from './ag-grid-components/members-cell-renderer/members-cell-renderer.component';
import { ToggleCellRendererComponent } from './ag-grid-components/toggle-cell-renderer/toggle-cell-renderer.component';
import { DatePipe } from '@angular/common';
import { CallHistoryCellRendererComponent } from './ag-grid-components/call-history-cell-renderer/call-history-cell-renderer.component';
import { ExpertisesListCellRendererComponent } from './ag-grid-components/expertises-list-cell-renderer/expertises-list-cell-renderer.component';
import { ReportCellRendererComponent } from './ag-grid-components/report-cell-renderer/report-cell-renderer.component';

@NgModule({
  declarations: [
    AppComponent,
    ActionsCellRendererComponent,
    MembersCellRendererComponent,
    ToggleCellRendererComponent,
    CallHistoryCellRendererComponent,
    ExpertisesListCellRendererComponent,
    ReportCellRendererComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonComponentsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
    AuthGuard,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
