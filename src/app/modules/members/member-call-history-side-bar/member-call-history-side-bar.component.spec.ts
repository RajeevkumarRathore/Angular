import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberCallHistorySideBarComponent } from './member-call-history-side-bar.component';

describe('MemberCallHistorySideBarComponent', () => {
  let component: MemberCallHistorySideBarComponent;
  let fixture: ComponentFixture<MemberCallHistorySideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberCallHistorySideBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberCallHistorySideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
