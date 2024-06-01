import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteShiftscheduleTakePopUpComponent } from './delete-shiftschedule-take-pop-up.component';

describe('DeleteShiftscheduleTakePopUpComponent', () => {
  let component: DeleteShiftscheduleTakePopUpComponent;
  let fixture: ComponentFixture<DeleteShiftscheduleTakePopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteShiftscheduleTakePopUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteShiftscheduleTakePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
