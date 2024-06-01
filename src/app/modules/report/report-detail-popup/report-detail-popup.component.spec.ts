import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDetailPopupComponent } from './report-detail-popup.component';

describe('ReportDetailPopupComponent', () => {
  let component: ReportDetailPopupComponent;
  let fixture: ComponentFixture<ReportDetailPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportDetailPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportDetailPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
