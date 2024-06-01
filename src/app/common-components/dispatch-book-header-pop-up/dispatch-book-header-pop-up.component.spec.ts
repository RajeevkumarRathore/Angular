import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatchBookHeaderPopUpComponent } from './dispatch-book-header-pop-up.component';

describe('DispatchBookHeaderPopUpComponent', () => {
  let component: DispatchBookHeaderPopUpComponent;
  let fixture: ComponentFixture<DispatchBookHeaderPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DispatchBookHeaderPopUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DispatchBookHeaderPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
