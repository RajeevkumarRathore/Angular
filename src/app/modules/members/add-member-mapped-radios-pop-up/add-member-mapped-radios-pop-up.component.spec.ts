import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMemberMappedRadiosPopUpComponent } from './add-member-mapped-radios-pop-up.component';

describe('AddMemberMappedRadiosPopUpComponent', () => {
  let component: AddMemberMappedRadiosPopUpComponent;
  let fixture: ComponentFixture<AddMemberMappedRadiosPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMemberMappedRadiosPopUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMemberMappedRadiosPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
