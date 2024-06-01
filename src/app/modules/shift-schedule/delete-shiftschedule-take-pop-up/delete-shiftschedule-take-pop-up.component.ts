import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-shiftschedule-take-pop-up',
  templateUrl: './delete-shiftschedule-take-pop-up.component.html',
  styleUrls: ['./delete-shiftschedule-take-pop-up.component.scss'],
})
export class DeleteShiftscheduleTakePopUpComponent {
  radioForm: FormGroup;
  title = 'Delete Shift Schedule Take';
  data: any;
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DeleteShiftscheduleTakePopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData
  ) {}

  ngOnInit() {
    this.data = this.dialogData.data;
    this.radioForm = this.formBuilder.group({
      deleteOption: ['1'],
    });
  }
  public close() {
    this.dialogRef.close();
  }

  action(e) {
    const radioFormValue = this.radioForm.value;
    if (e === 'Delete') {
      const valuesToPass = {
        e,
        radioFormValue,
      };

      this.dialogRef.close(valuesToPass);
    } else {
      this.dialogRef.close();
    }
  }
}
