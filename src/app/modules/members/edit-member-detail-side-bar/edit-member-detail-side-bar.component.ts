import { Component, Input, OnChanges, OnDestroy, OnInit,  SimpleChanges, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Subject, takeUntil } from 'rxjs';
import { GridActionsService } from 'src/app/data-grid/grid-actions.service';
import { HeaderService } from 'src/app/services/header.service';
import { MemberService } from 'src/app/services/member.service';
import { ReportService } from 'src/app/services/report.service';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
  selector: 'app-edit-member-detail-side-bar',
  templateUrl: './edit-member-detail-side-bar.component.html',
  styleUrls: ['./edit-member-detail-side-bar.component.scss']
})
export class EditMemberDetailSideBarComponent implements OnInit,OnChanges,OnDestroy{
  @Input() params;
  @ViewChild('memberCallHistorySidenav') memberCallHistorySidenav: MatSidenav;
  private destroy$ = new Subject<void>();
  phoneNumber: string = '';
  isEdit: boolean = false;
  @Input() memberDetail;
  filterColumnsDataList;
  filteredExpertises: any;
  selectedExpertieses: any[] = [];
  callHistoryList: any;
  sidePanelData: any;
  callHistoryDetail: any;
  isCallHistory: boolean = false;
  mappedRadiosList: any[] = [];
  selectedIndex: number = 0;
  memberCallHistoryDetail: any;
  loading: boolean = false;

  constructor(private sideNavService:SidenavService,
    private memberService: MemberService,
    private headerService: HeaderService,
    private gridActionService: GridActionsService){
  }

  ngOnInit(): void {
    this.headerService.GetAll().pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any)=>{
        this.filterColumnsDataList  = res.data;
      }
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.unsubscribe();
  }


  ngOnChanges(changes: SimpleChanges): void {

    this.callHistoryList = null;
    this.getMemberCallHistory();
    this.memberService.showCallHistoryDetail$.pipe(takeUntil(this.destroy$)).subscribe((res)=>{
      if(res.isDetail == true){
        this.isCallHistory = res.isDetail;
        this.memberCallHistoryDetail = res.data;
      }else if(res.isDetail == false){
        this.isCallHistory = res.isDetail;
        this.selectedIndex = 2;
        this.selectedIndexChange(2);
      }
    })
  }

  close(): void {
    this.sideNavService.close(true);
    this.gridActionService.deselectAllRow();
  }

  public selectedIndexChange(event: any) {
    this.selectedIndex = event
    if(event === 2){
      this.getMemberCallHistory();
    }
  }

  getMemberCallHistory(){
    this.loading = true;
    const payload = {
      memberId: this.params?.user_id
    }
    this.memberService.getMemberCallHistory(payload).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any)=>{
        this.callHistoryList = res.data;
        this.loading = false;
      }
    })
  }
}
