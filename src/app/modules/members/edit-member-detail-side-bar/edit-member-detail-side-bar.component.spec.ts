import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMemberDetailSideBarComponent } from './edit-member-detail-side-bar.component';

describe('EditMemberDetailSideBarComponent', () => {
  let component: EditMemberDetailSideBarComponent;
  let fixture: ComponentFixture<EditMemberDetailSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMemberDetailSideBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditMemberDetailSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
