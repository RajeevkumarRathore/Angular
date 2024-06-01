import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThanksMessageToAllPopUpComponent } from './thanks-message-to-all-pop-up.component';

describe('ThanksMessageToAllPopUpComponent', () => {
  let component: ThanksMessageToAllPopUpComponent;
  let fixture: ComponentFixture<ThanksMessageToAllPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThanksMessageToAllPopUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThanksMessageToAllPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
