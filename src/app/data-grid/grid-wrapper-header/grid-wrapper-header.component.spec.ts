import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridWrapperHeaderComponent } from './grid-wrapper-header.component';

describe('GridWrapperHeaderComponent', () => {
  let component: GridWrapperHeaderComponent;
  let fixture: ComponentFixture<GridWrapperHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridWrapperHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridWrapperHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
