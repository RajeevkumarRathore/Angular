import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberCallHistoryComponent } from './member-call-history.component';

describe('MemberCallHistoryComponent', () => {
  let component: MemberCallHistoryComponent;
  let fixture: ComponentFixture<MemberCallHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberCallHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberCallHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
