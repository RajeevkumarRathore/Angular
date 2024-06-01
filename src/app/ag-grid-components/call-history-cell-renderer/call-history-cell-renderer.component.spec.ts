import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallHistoryCellRendererComponent } from './call-history-cell-renderer.component';

describe('CallHistoryCellRendererComponent', () => {
  let component: CallHistoryCellRendererComponent;
  let fixture: ComponentFixture<CallHistoryCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallHistoryCellRendererComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallHistoryCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
