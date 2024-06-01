import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MemberService } from 'src/app/services/member.service';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-member-settings',
  templateUrl: './member-settings.component.html',
  styleUrls: ['./member-settings.component.scss']
})
export class MemberSettingsComponent implements OnChanges,OnDestroy{
  @Input() params;
  private destroy$ = new Subject<void>();
  selectedExpertieses;
  @Output() selectedIndex = new EventEmitter();
  memberDetail;
  @Input() filterColumnsDataList;
  filteredExpertises: any;
  settingByUserIdResponse: any;

  constructor(private memberService: MemberService,
    private reportService: ReportService,){}

  ngOnChanges(changes: SimpleChanges): void {
    this.getSettingByUserId();
  }


  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.unsubscribe();
  }

  dispatcherUpdate(params){
    const payload = {
      user_id: params.user_id,
      isDispatcher: params.isDispatcher
    }
    this.memberService.updateIsDispatcher(payload).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any)=>{
        if(res.succeeded == true){
          this.getSettingByUserId();
          this.memberService.refreshMemberDetail$.next(true);
        }
      }
    })
  }

  receivingPhoneCallUpdate(params){
    const payload = {
      user_id: params.user_id,
      isReceivingPhoneCalls: params.isReceivingPhoneCallForNUShift
    }
    this.memberService.updateIsReceivingPhoneCalls(payload).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any)=>{
        if(res.succeeded == true){
          this.getSettingByUserId();
          this.memberService.refreshMemberDetail$.next(true);
        }
      }
    })
  }

  busUpdate(params){
    const payload = {
      user_id: params.user_id,
      isBus: params.isBus
    }
    this.memberService.updateIsBus(payload).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any)=>{
        if(res.succeeded == true){
          this.getSettingByUserId();
          this.memberService.refreshMemberDetail$.next(true);
        }
      }
    })
  }

  takingShiftsUpdate(params){
    const payload = {
      user_id: params.user_id,
      isTakingShifts: params.isTakingShifts
    }
    this.memberService.updateIsTakingShifts(payload).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any)=>{
        if(res.succeeded == true){
          this.getSettingByUserId();
          this.memberService.refreshMemberDetail$.next(true);
        }
      }
    })
  }

  applyExpertieses(item){
    const payload = {
      expertisesIds: item,
      memberId: this.params?.user_id
    }
    this.memberService.expertisesUpdate(payload).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any)=>{
        this.getSettingByUserId();
        this.memberService.refreshMemberDetail$.next(true);
      }
    })
  }


  getSettingByUserId(){
    const payload = {
      userId: this.params?.user_id
    }
    this.memberService.getSettingByUserId(payload).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any)=>{
        this.settingByUserIdResponse = res.data;
        this.filteredExpertises = this.filterColumnsDataList;
        this.selectedExpertieses = this.settingByUserIdResponse?.expertisesList.map((res)=>{
          return res.id
        });
      }
    })
  }
}
