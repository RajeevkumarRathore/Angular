import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  sidenav: MatSidenav;
  actionSidenav: MatSidenav;
  sidenavData$ = new BehaviorSubject<any>(null);
  actionSidenavData$ = new BehaviorSubject<any>(null);
  constructor(private router: Router) {}

  public setSidenav(sidenav: MatSidenav, isActionSidenav?) {
    if (isActionSidenav) this.actionSidenav = sidenav;
    else this.sidenav = sidenav;
  }

  public close(isActionSidenav?) {
        
    if(isActionSidenav){
      this.actionSidenavData$.next(null);
      this.actionSidenav?.close();
    }else{
      this.sidenavData$.next(null);
      this.sidenav?.close();
    }
    const route = this.router.url.split('/');    
    if (route && route[3]) {
      this.router.navigate([route[1], route[2]]);
    }
  }

  public openSidePanel(data: any): void {
    
    if (data?.isActionSidenav) this.actionSidenavData$.next(data);
    else this.sidenavData$.next(data);
    this.toggle(data?.isActionSidenav);
  }

  public toggle(isActionSidenav): void {
    if (isActionSidenav) this.actionSidenav.toggle();
    else this.sidenav.toggle();
  }
}
