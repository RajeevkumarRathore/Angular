import { Component, Input } from '@angular/core';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-print-call-history',
  templateUrl: './print-call-history.component.html',
  styleUrls: ['./print-call-history.component.scss']
})
export class PrintCallHistoryComponent {
  @Input() callHistoryDetails;
  @Input() selectedRow;
  @Input() startDate;
  @Input() endDate;
  public imageEnvironmentUrl = environment.apiUrl;

}
