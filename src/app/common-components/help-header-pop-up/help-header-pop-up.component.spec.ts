import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpHeaderPopUpComponent } from './help-header-pop-up.component';

describe('HelpHeaderPopUpComponent', () => {
  let component: HelpHeaderPopUpComponent;
  let fixture: ComponentFixture<HelpHeaderPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpHeaderPopUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpHeaderPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
