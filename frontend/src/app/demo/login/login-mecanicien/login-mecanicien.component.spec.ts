import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginMecanicienComponent } from './login-mecanicien.component';

describe('LoginMecanicienComponent', () => {
  let component: LoginMecanicienComponent;
  let fixture: ComponentFixture<LoginMecanicienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginMecanicienComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginMecanicienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
