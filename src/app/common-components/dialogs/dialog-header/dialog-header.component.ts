import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dialog-header',
  templateUrl: './dialog-header.component.html',
  styleUrls: ['./dialog-header.component.scss']
})
export class DialogHeaderComponent {
  @Input() description: string;
  @Input() hideCloser: boolean;
  @Output() close: EventEmitter<string> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {  }

  emitClose() {
    this.close.emit();
  }
}
