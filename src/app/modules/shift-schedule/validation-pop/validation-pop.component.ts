import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-validation-pop',
  templateUrl: './validation-pop.component.html',
  styleUrls: ['./validation-pop.component.scss']
})
export class ValidationPopComponent {
  actions: any[];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<ValidationPopComponent>
  ) {}

  ngOnInit(): void {
  }
  close(e?) {
      this.dialogRef.close(e);
  }
}
