import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterProfilComponent } from './footer-profil.component';

describe('FooterProfilComponent', () => {
  let component: FooterProfilComponent;
  let fixture: ComponentFixture<FooterProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterProfilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
