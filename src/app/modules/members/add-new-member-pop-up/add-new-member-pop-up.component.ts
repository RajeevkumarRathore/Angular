import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';
import { SnackbarComponent } from 'src/app/common-components/snackbar/snackbar.component';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-add-new-member-pop-up',
  templateUrl: './add-new-member-pop-up.component.html',
  styleUrls: ['./add-new-member-pop-up.component.scss']
})
export class AddNewMemberPopUpComponent implements OnInit,OnDestroy{
  memberForm: FormGroup;
  private destroy$ = new Subject<void>();
  spin = false;
  flag = {
    submitted: false
  }
  constructor( @Inject(MAT_DIALOG_DATA) public data,
  public dialogRef: MatDialogRef<AddNewMemberPopUpComponent>,
  private fb: FormBuilder,
  private memberService: MemberService,
  private snackBar: MatSnackBar
  ){}

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.unsubscribe();
  }

  ngOnInit(): void {
    this.memberForm = this.fb.group({
      address: [''],
      badge_number: ['',Validators.required],
      email: [''],
      emergencyTypeId: [2],
      expertises: [''],
      first_name: ['',Validators.required],
      isBus: [false],
      isTakingShifts: [false],
      last_name: [''],
      level_service: [''],
      license_type: [''],
      memberShortId: [''],
      memberStatusId: [1],
      phone_number: ['']
    })
  }


  action(e) {
    if(e === "Create"){
      if(this.memberForm.valid){
        const payload = {
          ...this.memberForm.value
        }
        this.memberService.createMember(payload).pipe(takeUntil(this.destroy$)).subscribe({
          next: (res: any)=>{
            if(res.succeeded === true){
            this.snackBar.openFromComponent(SnackbarComponent,
              {
                duration: 3000,
                horizontalPosition: 'center',
                data: {
                  title: 'Member Created successfully',
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
                    title: res.message,
                    action: 'Dismiss',
                    type: 'snackbar-warning',
                  },
                })
            }
          }
        })
      }else{
        this.flag.submitted = true
      }
    }
    else {
      this.dialogRef.close();
    }
  }

  close(){
    this.dialogRef.close();
  }
}
