import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeleVoitureComponent } from './modele-voiture.component';

describe('ModeleVoitureComponent', () => {
  let component: ModeleVoitureComponent;
  let fixture: ComponentFixture<ModeleVoitureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModeleVoitureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModeleVoitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
