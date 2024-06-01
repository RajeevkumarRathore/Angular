import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-horizontal-tabs',
  templateUrl: './horizontal-tabs.component.html',
  styleUrls: ['./horizontal-tabs.component.scss'],
})
export class HorizontalTabsComponent implements OnInit {
  @Input() tabs: string[];
  @Input() activeTab: any;
  @Output() actionEvent: EventEmitter<string> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  actionClicked(e) {
    this.actionEvent.emit(e);
  }
}
