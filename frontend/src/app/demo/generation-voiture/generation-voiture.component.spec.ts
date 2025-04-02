import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerationVoitureComponent } from './generation-voiture.component';

describe('GenerationVoitureComponent', () => {
  let component: GenerationVoitureComponent;
  let fixture: ComponentFixture<GenerationVoitureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerationVoitureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerationVoitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
