import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateComponentRendererComponent } from './date-component-renderer.component';

describe('DateComponentRendererComponent', () => {
  let component: DateComponentRendererComponent;
  let fixture: ComponentFixture<DateComponentRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateComponentRendererComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DateComponentRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
