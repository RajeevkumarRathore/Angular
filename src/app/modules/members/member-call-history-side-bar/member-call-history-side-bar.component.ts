import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MemberService } from 'src/app/services/member.service';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-member-call-history-side-bar',
  templateUrl: './member-call-history-side-bar.component.html',
  styleUrls: ['./member-call-history-side-bar.component.scss']
})
export class MemberCallHistorySideBarComponent implements OnChanges,OnDestroy{
  @Output() closeSideNav = new EventEmitter();
  @Input() memberCallHistoryDetail;
  callHistoryDetail;
  private destroy$ = new Subject<void>();

  constructor(private reportService: ReportService,
    private memberService: MemberService){}

  ngOnDestroy(): void {
    this.destroy$.next(null);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.memberCallHistory();
  }

  memberCallHistory() {
    const payload = {
      id: this.memberCallHistoryDetail.id,
    };
    this.reportService
      .GetCallHistoryDetail(payload)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: any) => {
        this.callHistoryDetail = res.data;
      });
  }

  close(){
    this.memberService.showCallHistoryDetail$.next({isDetail: false, data: null});
  }
}
