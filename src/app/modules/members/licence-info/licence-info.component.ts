import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-licence-info',
  templateUrl: './licence-info.component.html',
  styleUrls: ['./licence-info.component.scss']
})
export class LicenceInfoComponent implements OnInit,OnDestroy{
  @Input() params;
  private destroy$ = new Subject<void>();

  constructor(private memberService: MemberService){}


  ngOnDestroy(): void {}
  
  ngOnInit(): void {}


}
