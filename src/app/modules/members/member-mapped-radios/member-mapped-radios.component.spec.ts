import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberMappedRadiosComponent } from './member-mapped-radios.component';

describe('MemberMappedRadiosComponent', () => {
  let component: MemberMappedRadiosComponent;
  let fixture: ComponentFixture<MemberMappedRadiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberMappedRadiosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberMappedRadiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
