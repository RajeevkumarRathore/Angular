import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertHeaderPopUpComponent } from './alert-header-pop-up.component';

describe('AlertHeaderPopUpComponent', () => {
  let component: AlertHeaderPopUpComponent;
  let fixture: ComponentFixture<AlertHeaderPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertHeaderPopUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertHeaderPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
