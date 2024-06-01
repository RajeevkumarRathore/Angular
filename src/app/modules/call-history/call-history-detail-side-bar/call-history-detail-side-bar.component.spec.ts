import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallHistoryDetailSideBarComponent } from './call-history-detail-side-bar.component';

describe('CallHistoryDetailSideBarComponent', () => {
  let component: CallHistoryDetailSideBarComponent;
  let fixture: ComponentFixture<CallHistoryDetailSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallHistoryDetailSideBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallHistoryDetailSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
