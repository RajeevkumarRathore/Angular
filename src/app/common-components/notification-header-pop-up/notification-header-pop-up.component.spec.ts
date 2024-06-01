import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationHeaderPopUpComponent } from './notification-header-pop-up.component';

describe('NotificationHeaderPopUpComponent', () => {
  let component: NotificationHeaderPopUpComponent;
  let fixture: ComponentFixture<NotificationHeaderPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationHeaderPopUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationHeaderPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
