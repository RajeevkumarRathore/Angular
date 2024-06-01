import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.scss']
})
export class ContactInfoComponent implements OnChanges,OnDestroy{
@Input() params;
@Input() memberDetail;
private destroy$ = new Subject<void>();
phoneNumber;
  phoneNumberList: any;


constructor(private memberService: MemberService){

}

  ngOnChanges(changes: SimpleChanges): void {
    this.GetContactInfoByUserId();
  }


  ngOnDestroy(): void {
    this.destroy$.next(null);
  }

  GetContactInfoByUserId(){
    const payload ={
      user_id: this.params?.user_id
    }
    this.memberService.GetContactInfoByUserId(payload).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any)=>{
        this.phoneNumberList = res.data;
        this.phoneNumberList.forEach(ele => {
          ele.phoneNumber = ele.phone
        });
      }
    })
  }


deletePhoneNumber(item){
  const payload = {
    memberPhoneId: item
  }
  this.memberService.deleteMemberPhone(payload).pipe(takeUntil(this.destroy$)).subscribe({
    next: (res: any) => {
      this.GetContactInfoByUserId();
      this.memberService.refreshMemberDetail$.next(true);
    }
  });
}

editPhoneFeild(id){
  this.phoneNumberList.forEach(ele => {
    if(ele.id == id){
      ele.phoneNumber = 0;
    }else{
      ele.phoneNumber = ele.phone
    }
  });
}


editPhoneNumber(item){
  if( item.phone != ''){
    const payload ={
      memberPhoneId: item.id,
      phoneNumber: item.phone
    }
    this.memberService.editMemberPhoneNumber(payload).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any) => {
        this.GetContactInfoByUserId();
        this.memberService.refreshMemberDetail$.next(true);
      }
    })
 }
}

switchStatusOfMemberPhone(item,type){
  let payload;
  switch (type){
    case 'active':{
      payload = {
        itemIdToUpdate: item.id,
        phoneSwitch: item.isActive
      }
      break;
    }
    case 'appPermitted':{
      payload = {
        itemIdToUpdate: item.id,
        appSwitch: item.isAppPermitted
      }
      break;
    }
    case 'notification':{
      payload = {
        itemIdToUpdate: item.id,
        notificationSwitch: item.isNotificationsOn
      }
      break;
    }
    case 'primary':{
      payload = {
        itemIdToUpdate: item.id,
        isPrimarySwitch: item.isPrimary
      }
      break;
    }
  }
  this.memberService.updateSwitchStatusOfMemberPhone(payload).pipe(takeUntil(this.destroy$)).subscribe({
    next: (res: any) => {
      this.GetContactInfoByUserId();
      this.memberService.refreshMemberDetail$.next(true);
    }
  });
}

addPhoneNumber(){
  if(this.phoneNumber != ''){
    const payload ={
      MemberId: this.params?.user_id,
      phone: this.phoneNumber
    }
    this.memberService.addPhoneToMember(payload).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any) => {
        this.GetContactInfoByUserId();
        this.memberService.refreshMemberDetail$.next(true);
        this.phoneNumber = ''
      }
    });
  }
}
}
