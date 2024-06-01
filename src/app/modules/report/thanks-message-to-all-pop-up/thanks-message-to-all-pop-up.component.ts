import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-thanks-message-to-all-pop-up',
  templateUrl: './thanks-message-to-all-pop-up.component.html',
  styleUrls: ['./thanks-message-to-all-pop-up.component.scss']
})
export class ThanksMessageToAllPopUpComponent {
  actions: any[];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<ThanksMessageToAllPopUpComponent>
  ) {}

  ngOnInit(): void {
    this.data
    if(this.data.sendMessage=='sendMessage'){
      this.actions = this.data.actions || [
        { text: "Cancel", buttonSize: 'large', buttonStyle: "accent" },
        { text: "Yes, send it!", buttonSize: 'large' },
      ];
    }
    else if(this.data.selecteexperties){
      this.actions = this.data.actions || [
        { text: "Ok",buttonSize: 'large', buttonStyle: "primary" },
      ];
    }
    else if(this.data.thankYou){
      this.actions = this.data.actions || [
        { text: "Close",buttonSize: 'large', buttonStyle: "primary" },
      ];
    }
    
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

