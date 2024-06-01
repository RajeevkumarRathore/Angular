import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportSummaryDatePickerComponent } from './report-summary-date-picker.component';

describe('ReportSummaryDatePickerComponent', () => {
  let component: ReportSummaryDatePickerComponent;
  let fixture: ComponentFixture<ReportSummaryDatePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportSummaryDatePickerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportSummaryDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
