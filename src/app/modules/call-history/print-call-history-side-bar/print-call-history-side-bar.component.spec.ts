import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintCallHistorySideBarComponent } from './print-call-history-side-bar.component';

describe('PrintCallHistorySideBarComponent', () => {
  let component: PrintCallHistorySideBarComponent;
  let fixture: ComponentFixture<PrintCallHistorySideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintCallHistorySideBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintCallHistorySideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
