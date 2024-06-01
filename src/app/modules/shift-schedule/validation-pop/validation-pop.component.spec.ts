import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationPopComponent } from './validation-pop.component';

describe('ValidationPopComponent', () => {
  let component: ValidationPopComponent;
  let fixture: ComponentFixture<ValidationPopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidationPopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidationPopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
