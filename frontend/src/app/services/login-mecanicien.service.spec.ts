import { TestBed } from '@angular/core/testing';

import { LoginMecanicienService } from './login-mecanicien.service';

describe('LoginMecanicienService', () => {
  let service: LoginMecanicienService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginMecanicienService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
