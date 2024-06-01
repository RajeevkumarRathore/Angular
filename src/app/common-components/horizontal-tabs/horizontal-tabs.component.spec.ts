import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalTabsComponent } from './horizontal-tabs.component';

describe('HorizontalTabsComponent', () => {
  let component: HorizontalTabsComponent;
  let fixture: ComponentFixture<HorizontalTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorizontalTabsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorizontalTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
