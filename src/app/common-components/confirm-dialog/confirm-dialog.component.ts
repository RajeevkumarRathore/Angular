import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
  actions: any[];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<ConfirmDialogComponent>
  ) {}

  ngOnInit(): void {
    this.actions = this.data.actions || [
      { text: "Cancel", buttonSize: 'large' },
      { text: "Confirm", buttonSize: 'large', buttonStyle: "accent" },
    ];
  }

  close(e?) {
    if (this.data.confirmationButton &&
        this.data.confirmationButton === e &&
        this.data.callBackFn) {
      this.actions[1].spin = true;
      this.data.callBackFn(this.dialogRef, this.actions);
    } else {
      this.dialogRef.close(e);
    }
  }
}
