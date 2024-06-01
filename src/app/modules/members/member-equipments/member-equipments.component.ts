import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-member-equipments',
  templateUrl: './member-equipments.component.html',
  styleUrls: ['./member-equipments.component.scss']
})
export class MemberEquipmentsComponent implements OnInit,OnDestroy{
  @Input() params;
  private destroy$ = new Subject<void>();

  constructor(private memberService: MemberService,
   ){}


  ngOnDestroy(): void {}

  ngOnInit(): void {}
}
