import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dialog-footer',
  templateUrl: './dialog-footer.component.html',
  styleUrls: ['./dialog-footer.component.scss']
})
export class DialogFooterComponent {
  @Output() action: EventEmitter<string> = new EventEmitter();
  @Input() actions: any[];
  constructor() {}

  emitAction(e: string) {
    this.action.emit(e);
  }
}
