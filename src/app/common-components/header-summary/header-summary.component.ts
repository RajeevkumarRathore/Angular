import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-header-summary',
  templateUrl: './header-summary.component.html',
  styleUrls: ['./header-summary.component.scss'],
})
export class HeaderSummaryComponent implements OnChanges{
  @Input() counts: any;
  @Input() module: any;
  totalCalls: any;

  menuRoutes = [
    { name: 'Total Member',icon: 'assets/images/sprite-icons.svg#siren-icon', route: 'counts?.total_member'},
    { name: 'Units',icon: 'assets/images/sprite-icons.svg#checked-icon', route: '/call-history'},
    { name: 'Medics',icon: 'assets/images/sprite-icons.svg#fire-icon', route: '/members'},
    { name: 'Drivers',icon: 'assets/images/sprite-icons.svg#medical-icon', route: ''},
    { name: 'Other',icon: 'assets/images/sprite-icons.svg#phone-icon', route: ''},
    { name: 'Buses',icon: 'assets/images/sprite-icons.svg#emergency-icon', route: '/report'},
 ]
  constructor(){}

  ngOnChanges(changes: SimpleChanges): void {
    this.counts
  }


}
