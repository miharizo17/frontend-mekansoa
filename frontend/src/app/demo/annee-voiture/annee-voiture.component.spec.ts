import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnneeVoitureComponent } from './annee-voiture.component';

describe('AnneeVoitureComponent', () => {
  let component: AnneeVoitureComponent;
  let fixture: ComponentFixture<AnneeVoitureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnneeVoitureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnneeVoitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
