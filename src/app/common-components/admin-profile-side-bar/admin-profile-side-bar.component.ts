import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { HeaderService } from 'src/app/services/header.service';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
  selector: 'app-admin-profile-side-bar',
  templateUrl: './admin-profile-side-bar.component.html',
  styleUrls: ['./admin-profile-side-bar.component.scss']
})
export class AdminProfileSideBarComponent implements OnInit,OnDestroy {
  userInfo: any;
  @Input() userData: any;
  private destroy$ = new Subject<void>();
  constructor(private authService:AuthService,
    private sideNavService:SidenavService,
    private headerService: HeaderService){}
  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.unsubscribe();
  }

  ngOnInit(): void {
    this.userInfo =  this.authService.userInfo$.value.data.userInfoDto
  }

  signOut(){
    this.authService.logOut();
  }

  close(): void {
    this.sideNavService.close();
  }

  logoutUser(item){
    const userId = [];
    if(item?.length > 0){
      item.forEach(element => {
        userId.push(element.userId)
      });
    }
    const payload = {
      loggedInUserId: item?.userId ? [item.userId] : userId
    }
    this.headerService.updateLogoutTime(payload).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any)=>{
        this.getLoggedInUsers();
      }
    })
  }

  getLoggedInUsers() {
    this.headerService.getLoggedInUsers().pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any)=>{
        this.userData = res.data;
      }
    })

  }
}
