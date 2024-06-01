import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { SidenavService } from 'src/app/services/sidenav.service';
import { ImportantHeaderPopUpComponent } from '../important-header-pop-up/important-header-pop-up.component';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-help-header-pop-up',
  templateUrl: './help-header-pop-up.component.html',
  styleUrls: ['./help-header-pop-up.component.scss']
})
export class HelpHeaderPopUpComponent implements OnInit {
  sideBar: string;
  userInfo: any;
  tokenInfo: any;
  @ViewChild('messageSidenav') public messageSidenav: MatSidenav;
  searchText: any;
  messageSidePanelData: any;
  private destroy$ = new Subject<void>();
  helpDetail: any;
  title = 'Help';
  constructor(private sideNavService:SidenavService,
    private authService:AuthService,
    private headerService:HeaderService,
    public dialogRef: MatDialogRef<ImportantHeaderPopUpComponent>,){
      this.sideNavService.sidenavData$
    
  }

  ngOnInit(): void {
    this.userInfo = this.authService.userInfo$.value.data.userInfoDto;
    this.tokenInfo = this.authService.userInfo$.value.data.tokens;
    this.sideNavService.sidenavData$
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (this.sideBar === 'Message') {
          this.messageSidePanelData = res;
        }
      });
   
      this.headerService.getHelpUsers().pipe(takeUntil(this.destroy$)).subscribe({
        next:(res:any)=>{
          this.helpDetail =res.data
        }
      })
  }

  ngAfterViewInit(): void {
    this.sideNavService.setSidenav(this.messageSidenav);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  getMeassage(item?) { 
   this.dialogRef.close({data: item, e: 'Message'});
   
  }

  closedialog() {
    ;
    this.dialogRef.close();
  }

  close(): void {
    this.sideNavService.close();
  }


}
