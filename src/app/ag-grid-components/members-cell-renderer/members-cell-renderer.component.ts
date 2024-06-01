import { Component, Input } from '@angular/core';
import { MemberGridEnum } from 'src/app/common-components/enums/commonEnums';

@Component({
  selector: 'app-members-cell-renderer',
  templateUrl: './members-cell-renderer.component.html',
  styleUrls: ['./members-cell-renderer.component.scss']
})
export class MembersCellRendererComponent {
  @Input() params: any;
  public rowData: any = {};

  constructor() {}

  agInit(params: any): void {
    this.params = params;
    if (params.data) {
      this.rowData = params.data;
      if(this.rowData.emergencyTypeId == 2)
      this.rowData.emergencyTypeId = MemberGridEnum.ems
    }
  }
}
