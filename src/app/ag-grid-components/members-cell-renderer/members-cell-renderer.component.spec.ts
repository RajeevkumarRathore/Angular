import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersCellRendererComponent } from './members-cell-renderer.component';

describe('MembersCellRendererComponent', () => {
  let component: MembersCellRendererComponent;
  let fixture: ComponentFixture<MembersCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembersCellRendererComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembersCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
