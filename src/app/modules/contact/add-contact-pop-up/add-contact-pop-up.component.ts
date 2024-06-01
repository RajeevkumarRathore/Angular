import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';
import { SnackbarComponent } from 'src/app/common-components/snackbar/snackbar.component';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-add-contact-pop-up',
  templateUrl: './add-contact-pop-up.component.html',
  styleUrls: ['./add-contact-pop-up.component.scss']
})
export class AddContactPopUpComponent implements OnInit,OnDestroy{
  private destroy$ = new Subject<void>();
  title = this.data === undefined ? 'Create Contact' : 'Update Contact';
  contactForm: FormGroup;
  flag = {
    submitted: false
  }

  constructor( @Inject(MAT_DIALOG_DATA) public data,
  public dialogRef: MatDialogRef<AddContactPopUpComponent>,
  private fb: FormBuilder,
  private contactService: ContactService,
  private snackBar: MatSnackBar){}

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.unsubscribe();
  }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      id:[this.data === undefined ? 0 : this.data.id],
      Given_Name: [this.data === undefined ? '' : this.data.firstName,Validators.required],
      Family_Name: [this.data === undefined ? '' : this.data.lastName],
      E_mail_1_Value: [this.data === undefined ? '' : this.data.mailAddress,[Validators.required,Validators.email]],
      Phone_1_Value: [this.data === undefined ? '' : this.data.mobile1],
      Phone_2_Value: [this.data === undefined ? '' : this.data.mobile2],
      Phone_3_Value: [this.data === undefined ? '' : this.data.work1],
      Phone_4_Value: [this.data === undefined ? '' : this.data.work2],
      Phone_5_Value: [this.data === undefined ? '' : this.data.home],
      Phone_6_Value: [this.data === undefined ? '' : this.data.other],
      Address_1_Street: [this.data === undefined ? '' : this.data.street],
      Address_1_Region: [this.data === undefined ? '' : this.data.state],
      Address_1_Postal_Code: [this.data === undefined ? '' : this.data.zip],
      Address_1_City: [this.data === undefined ? '' : this.data.city],
    })
  }

  action(e) {
    if(e === 'Create' || e === 'Update'){
      if(this.contactForm.valid){
        const payload = {
          ...this.contactForm.value
        }
        this.contactService.createContact(payload).pipe(takeUntil(this.destroy$)).subscribe({
          next: (res: any)=>{
            if(res.succeeded === true){
            this.snackBar.openFromComponent(SnackbarComponent,
              {
                duration: 3000,
                horizontalPosition: 'center',
                data: {
                  title : 'Contact ' + res.messages + ' Successfully',
                  action: 'Dismiss',
                  type: 'snackbar-success',
                },
              })
            this.dialogRef.close('Saved');
          }else{
            this.snackBar.openFromComponent(SnackbarComponent,
              {
                duration: 3000,
                horizontalPosition: 'center',
                data: {
                  title:  'Contact ' + res.messages + ' Successfully',
                  action: 'Dismiss',
                  type: 'snackbar-warning',
                },
              })
          }
         }
        })
      }else{
        this.flag.submitted = true;
      }
    }
    else{
      this.dialogRef.close();
    }
  }


  close(){
    this.dialogRef.close();
  }
}
