import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopListingComponent } from './top-listing.component';

describe('TopListingComponent', () => {
  let component: TopListingComponent;
  let fixture: ComponentFixture<TopListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopListingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
