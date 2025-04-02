import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsDemandeDevisComponent } from './details-demande-devis.component';

describe('DetailsDemandeDevisComponent', () => {
  let component: DetailsDemandeDevisComponent;
  let fixture: ComponentFixture<DetailsDemandeDevisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsDemandeDevisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsDemandeDevisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
