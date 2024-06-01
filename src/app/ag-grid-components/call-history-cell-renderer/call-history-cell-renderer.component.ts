import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-call-history-cell-renderer',
  templateUrl: './call-history-cell-renderer.component.html',
  styleUrls: ['./call-history-cell-renderer.component.scss']
})
export class CallHistoryCellRendererComponent {
  @Input() params: any;
  rowData: any;
  reports: any[] = [];
  props: any;

constructor(){}

  agInit(params: any): void {
    this.params = params;
   if(params.data){
    this.rowData = params.data;
    this.props = this.params.props.col
    this.rowData.reports
    const reports = this.rowData?.reports?.split(',').filter(function (el) {
      return (el != null && el != " ");
    });
    reports?.forEach((ele: string) => {
      if(ele != " ")
      this.reports?.push(ele);
    });

   }
  }

}
