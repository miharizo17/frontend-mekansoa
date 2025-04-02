import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialiteEmployeListeComponent } from './specialite-employe-liste.component';

describe('SpecialiteEmployeListeComponent', () => {
  let component: SpecialiteEmployeListeComponent;
  let fixture: ComponentFixture<SpecialiteEmployeListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialiteEmployeListeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialiteEmployeListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
