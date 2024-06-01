import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-print-report-detail',
  templateUrl: './print-report-detail.component.html',
  styleUrls: ['./print-report-detail.component.scss']
})
export class PrintReportDetailComponent {
  @Input() membersDetails:any;
  @Input() callHistoryNotes:any;
  @Input() clientActivityLogs:any;
}
