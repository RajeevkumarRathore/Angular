import { Component, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-add-member-mapped-radios-pop-up',
  templateUrl: './add-member-mapped-radios-pop-up.component.html',
  styleUrls: ['./add-member-mapped-radios-pop-up.component.scss']
})
export class AddMemberMappedRadiosPopUpComponent implements OnDestroy{
  spin: boolean;
  audioForm: string = '';
  private destroy$ = new Subject<void>();

  constructor(@Inject(MAT_DIALOG_DATA) public data,
  public dialogRef: MatDialogRef<AddMemberMappedRadiosPopUpComponent>,
  private memberService: MemberService){

  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.unsubscribe();
  }

  action(e){
    if(e == 'Create'){
     if(this.audioForm != ''){
        const payload = {
          audioFrom: this.audioForm,
          memberId: this.data.user_id
        }
        this.memberService.addRadioToMember(payload).pipe(takeUntil(this.destroy$)).subscribe({
          next: (res: any) =>{
            if(res.succeeded == true)
            this.dialogRef.close('Saved');
          }
        })
     }
    }else{
      this.dialogRef.close();
    }
  }


  close(){
    this.dialogRef.close();
  }
}
