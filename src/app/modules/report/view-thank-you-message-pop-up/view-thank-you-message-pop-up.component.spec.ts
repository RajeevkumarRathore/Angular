import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewThankYouMessagePopUpComponent } from './view-thank-you-message-pop-up.component';

describe('ViewThankYouMessagePopUpComponent', () => {
  let component: ViewThankYouMessagePopUpComponent;
  let fixture: ComponentFixture<ViewThankYouMessagePopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewThankYouMessagePopUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewThankYouMessagePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
