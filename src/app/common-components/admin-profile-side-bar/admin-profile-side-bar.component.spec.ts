import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProfileSideBarComponent } from './admin-profile-side-bar.component';

describe('AdminProfileSideBarComponent', () => {
  let component: AdminProfileSideBarComponent;
  let fixture: ComponentFixture<AdminProfileSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProfileSideBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminProfileSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
