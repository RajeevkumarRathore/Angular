import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditShiftSchedulePopUpComponent } from './edit-shift-schedule-pop-up.component';

describe('EditShiftSchedulePopUpComponent', () => {
  let component: EditShiftSchedulePopUpComponent;
  let fixture: ComponentFixture<EditShiftSchedulePopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditShiftSchedulePopUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditShiftSchedulePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
