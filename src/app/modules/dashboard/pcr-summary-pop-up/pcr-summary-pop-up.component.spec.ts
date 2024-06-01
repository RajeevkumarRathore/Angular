import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcrSummaryPopUpComponent } from './pcr-summary-pop-up.component';

describe('PcrSummaryPopUpComponent', () => {
  let component: PcrSummaryPopUpComponent;
  let fixture: ComponentFixture<PcrSummaryPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PcrSummaryPopUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PcrSummaryPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
