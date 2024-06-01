import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintCallHistoryComponent } from './print-call-history.component';

describe('PrintCallHistoryComponent', () => {
  let component: PrintCallHistoryComponent;
  let fixture: ComponentFixture<PrintCallHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintCallHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintCallHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
