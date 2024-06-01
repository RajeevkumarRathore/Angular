import { Component, OnInit } from '@angular/core';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
  selector: 'app-common-side-bar',
  templateUrl: './common-side-bar.component.html',
  styleUrls: ['./common-side-bar.component.scss']
})
export class CommonSideBarComponent implements OnInit{
 menuRoutes = [
    { name: 'Dashboard',icon: 'assets/images/sprite-icons.svg#dashboard-icon', route: '/dashboard'},
    { name: 'Call History',class: 'fas fa-blender-phone', route: '/call-history'},
    { name: 'Members',class: 'fas fa-hands-helping', route: '/members'},
    { name: 'Shift Schedule',class: 'fas fa-calendar', route: '/shift-schedule'},
    { name: 'Contact',class: 'fas fa-phone', route: '/contact'},
    { name: 'Reports',class: 'fa-solid fa-chart-column', route: '/report'},
 ]

constructor(private sideNavService:SidenavService){

}

  ngOnInit(): void {

  }

  close(): void {
    this.sideNavService.close();
  }
}
