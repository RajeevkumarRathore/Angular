import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-print-call-history-side-bar',
  templateUrl: './print-call-history-side-bar.component.html',
  styleUrls: ['./print-call-history-side-bar.component.scss']
})
export class PrintCallHistorySideBarComponent implements OnInit {
  @Input()callHistoryDetailData;
  @Input()callHistoryNotes;
  @Input()callhistoryClientActivityLogs;



constructor(){

}

ngOnInit(): void {}


}
