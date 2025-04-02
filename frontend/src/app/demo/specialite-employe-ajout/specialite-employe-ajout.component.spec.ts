import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialiteEmployeAjoutComponent } from './specialite-employe-ajout.component';

describe('SpecialiteEmployeAjoutComponent', () => {
  let component: SpecialiteEmployeAjoutComponent;
  let fixture: ComponentFixture<SpecialiteEmployeAjoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialiteEmployeAjoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialiteEmployeAjoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
