import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toggle-cell-renderer',
  templateUrl: './toggle-cell-renderer.component.html',
  styleUrls: ['./toggle-cell-renderer.component.scss']
})
export class ToggleCellRendererComponent {
  @Input() params: any;
  public rowData: any = {};
  props: any;

  constructor() {}

  agInit(params: any): void {
    this.params = params;
    if (params.data) {
      this.rowData = params.data;
      this.props = this.params.props.col
    }
  }

  updateToggle(){
    this.params.updateToggle(this.params);
  }

}
