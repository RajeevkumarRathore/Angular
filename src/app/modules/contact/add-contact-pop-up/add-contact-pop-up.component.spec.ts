import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContactPopUpComponent } from './add-contact-pop-up.component';

describe('AddContactPopUpComponent', () => {
  let component: AddContactPopUpComponent;
  let fixture: ComponentFixture<AddContactPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddContactPopUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddContactPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
