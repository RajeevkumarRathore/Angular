import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintReportDetailComponent } from './print-report-detail.component';

describe('PrintReportDetailComponent', () => {
  let component: PrintReportDetailComponent;
  let fixture: ComponentFixture<PrintReportDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintReportDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintReportDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
