import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewMemberPopUpComponent } from './add-new-member-pop-up.component';

describe('AddNewMemberPopUpComponent', () => {
  let component: AddNewMemberPopUpComponent;
  let fixture: ComponentFixture<AddNewMemberPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewMemberPopUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewMemberPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
