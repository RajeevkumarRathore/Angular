import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportantHeaderPopUpComponent } from './important-header-pop-up.component';

describe('ImportantHeaderPopUpComponent', () => {
  let component: ImportantHeaderPopUpComponent;
  let fixture: ComponentFixture<ImportantHeaderPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportantHeaderPopUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportantHeaderPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
