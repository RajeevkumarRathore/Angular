import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateShiftScheduleComponent } from './create-update-shift-schedule.component';

describe('CreateUpdateShiftScheduleComponent', () => {
  let component: CreateUpdateShiftScheduleComponent;
  let fixture: ComponentFixture<CreateUpdateShiftScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateShiftScheduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUpdateShiftScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
