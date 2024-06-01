import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertisesListCellRendererComponent } from './expertises-list-cell-renderer.component';

describe('ExpertisesListCellRendererComponent', () => {
  let component: ExpertisesListCellRendererComponent;
  let fixture: ComponentFixture<ExpertisesListCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpertisesListCellRendererComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpertisesListCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
