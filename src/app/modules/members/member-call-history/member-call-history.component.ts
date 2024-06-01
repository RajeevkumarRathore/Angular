import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MemberService } from 'src/app/services/member.service';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-member-call-history',
  templateUrl: './member-call-history.component.html',
  styleUrls: ['./member-call-history.component.scss']
})
export class MemberCallHistoryComponent implements OnInit,OnDestroy,OnChanges{
  @Input() params;
  private destroy$ = new Subject<void>();
  @Input() callHistoryList;
  callHistoryDetail: any;

  constructor(private memberService: MemberService,
    private reportService: ReportService,){}


  ngOnChanges(changes: SimpleChanges): void {
    this.callHistoryList?.forEach((element) => {
      if (element.medics) {
        element.medics = element.medics?.split(',').map(el => el.trim()).filter(el => el !== '');
      }
      if (element.buses) {
        element.buses = element.buses?.split(',').map(el => el.trim()).filter(el => el !== '');
      }
      if (element.units)
      {
         element.units = element.units?.split(',').map(el => el.trim()).filter(el => el !== ''); 
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
  }

  ngOnInit(): void {}

  memberCallHistory(item) {
   this.memberService.showCallHistoryDetail$.next({isDetail: true, data: item});
  }


}
