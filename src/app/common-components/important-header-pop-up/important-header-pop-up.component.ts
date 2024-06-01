import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { HeaderService } from 'src/app/services/header.service';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
  selector: 'app-important-header-pop-up',
  templateUrl: './important-header-pop-up.component.html',
  styleUrls: ['./important-header-pop-up.component.scss'],
})
export class ImportantHeaderPopUpComponent implements OnInit {
  categoryName: any;
  importantNumbers: any;
  sideBar: string;
  searchText: any;
  messageSidePanelData: any;
  private destroy$ = new Subject<void>();
  userInfo: any;
  tokenInfo: any;
  @ViewChild('messageSidenav') public messageSidenav: MatSidenav;
  importantNumberCategories: any;
  title = 'Important';
  constructor(
    private headerService: HeaderService,
    private sideNavService: SidenavService,
    private authService: AuthService,
    public dialogRef: MatDialogRef<ImportantHeaderPopUpComponent>,
    
  ) {}

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
    this.headerService.getAllImportantNumberCategories().subscribe({
      next: (res: any) => {
        this.importantNumberCategories = res.data;
        this.getAllImportantNumbers(null);
      },
    });
  }

  ngAfterViewInit(): void {
    this.sideNavService.setSidenav(this.messageSidenav);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  close(): void {
    this.sideNavService.close();
  }

  closedialog() {    
    this.dialogRef.close();
  }

  searchAllImportantNumbers(item) {
    if (item?.target.value.trim() === '') {
      return;
    }
    const payload = {
      category: this.categoryName,
      filter: item?.target.value.trim(),
    };
    this.headerService.getAllImportantNumbers(payload).subscribe({
      next: (res: any) => {
        this.importantNumbers = res.data;
      },
    });
  }

  getAllImportantNumbers(item) {
    ;
    this.importantNumbers = [];
    this.categoryName = item?.categoryName ?? null;
    const payload = {
      category: item?.categoryName ?? null,
      filter: item?.filter ?? '',
    };
    this.headerService
      .getAllImportantNumbers(payload)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: any) => {
          this.importantNumbers = res.data;
        },
      });
  }

  getMeassage(item?) { 
   this.dialogRef.close({data: item, e: 'Message'});
  }
}
