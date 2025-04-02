import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialiteServiceAjoutComponent } from './specialite-service-ajout.component';

describe('SpecialiteServiceAjoutComponent', () => {
  let component: SpecialiteServiceAjoutComponent;
  let fixture: ComponentFixture<SpecialiteServiceAjoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialiteServiceAjoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialiteServiceAjoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
