import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberBydateSettingPopUpComponent } from './member-bydate-setting-pop-up.component';

describe('MemberBydateSettingPopUpComponent', () => {
  let component: MemberBydateSettingPopUpComponent;
  let fixture: ComponentFixture<MemberBydateSettingPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberBydateSettingPopUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberBydateSettingPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
