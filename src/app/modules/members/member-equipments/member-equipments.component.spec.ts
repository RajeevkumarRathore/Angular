import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberEquipmentsComponent } from './member-equipments.component';

describe('MemberEquipmentsComponent', () => {
  let component: MemberEquipmentsComponent;
  let fixture: ComponentFixture<MemberEquipmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberEquipmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberEquipmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
