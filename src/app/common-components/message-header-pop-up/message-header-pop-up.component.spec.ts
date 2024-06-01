import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageHeaderPopUpComponent } from './message-header-pop-up.component';

describe('MessageHeaderPopUpComponent', () => {
  let component: MessageHeaderPopUpComponent;
  let fixture: ComponentFixture<MessageHeaderPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageHeaderPopUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageHeaderPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
