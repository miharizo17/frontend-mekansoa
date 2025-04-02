import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDemandeDevisComponent } from './liste-demande-devis.component';

describe('ListeDemandeDevisComponent', () => {
  let component: ListeDemandeDevisComponent;
  let fixture: ComponentFixture<ListeDemandeDevisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeDemandeDevisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeDemandeDevisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
