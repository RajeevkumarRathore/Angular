import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { MemberService } from 'src/app/services/member.service';
import { AddMemberMappedRadiosPopUpComponent } from '../add-member-mapped-radios-pop-up/add-member-mapped-radios-pop-up.component';

@Component({
  selector: 'app-member-mapped-radios',
  templateUrl: './member-mapped-radios.component.html',
  styleUrls: ['./member-mapped-radios.component.scss']
})
export class MemberMappedRadiosComponent implements OnInit,OnDestroy,OnChanges{
  @Input() params;
  @Input() memberDetail;
  private destroy$ = new Subject<void>();
  mappedRadiosList: any;


  constructor(private memberService: MemberService,
   private dialog: MatDialog){}

  ngOnChanges(changes: SimpleChanges): void {
    this.getMemberMappedRadios();
  }


  ngOnDestroy(): void {}

  ngOnInit(): void {}

  getMemberMappedRadios(){
    const payload = {
      memberId: this.params?.user_id
    }
    this.memberService.getMemberMappedRadios(payload).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any)=>{
        this.mappedRadiosList = res.data;
      }
    })
  }

  deleteMappedRadio(item){
    const payload = {
      memberId: this.params?.user_id,
      radioId: item.radioId
    }
    this.memberService.deleteMemberRadioMapping(payload).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any)=>{
        if(res.succeeded == true)
        this.getMemberMappedRadios();
      }
    })
  }

  addMappedRadio(){
    this.dialog.open(AddMemberMappedRadiosPopUpComponent,{
      autoFocus:false,
      width: '500px',
      data: this.params
    }).afterClosed()
    .subscribe((res) => {
      if(res == 'Saved'){
        this. getMemberMappedRadios();
      }
    })
  }
}
