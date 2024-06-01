import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NightShiftsComponent } from './night-shifts.component';

describe('NightShiftsComponent', () => {
  let component: NightShiftsComponent;
  let fixture: ComponentFixture<NightShiftsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NightShiftsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NightShiftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
