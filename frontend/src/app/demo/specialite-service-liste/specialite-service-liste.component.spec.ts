import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialiteServiceListeComponent } from './specialite-service-liste.component';

describe('SpecialiteServiceListeComponent', () => {
  let component: SpecialiteServiceListeComponent;
  let fixture: ComponentFixture<SpecialiteServiceListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialiteServiceListeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialiteServiceListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
