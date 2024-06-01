import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-expertises-list-cell-renderer',
  templateUrl: './expertises-list-cell-renderer.component.html',
  styleUrls: ['./expertises-list-cell-renderer.component.scss']
})
export class ExpertisesListCellRendererComponent {
  @Input() params: any;
  public rowData: any = {};
  expertesisList = [];

  constructor() {}

  agInit(params: any): void {
    this.params = params;
    if (params.data) {
      this.rowData = params.data;
      const expertesisList = this.rowData?.expertises?.split(',').filter(function (el) {
        return (el != null && el != " " && el != "");
      });
      expertesisList?.forEach((ele: string) => {
        if(ele != " ")
        this.expertesisList?.push(ele);
      });
      // this.expertesisList = this.rowData.expertisesList.filter(function (el) {
      //   return (el != null && el != '') || (el.name != null && el.name != '');
      // });;
    }
  }
}
