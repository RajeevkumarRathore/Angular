import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCellRendererComponent } from './report-cell-renderer.component';

describe('ReportCellRendererComponent', () => {
  let component: ReportCellRendererComponent;
  let fixture: ComponentFixture<ReportCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportCellRendererComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
