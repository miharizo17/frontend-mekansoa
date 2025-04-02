import { TestBed } from '@angular/core/testing';

import { SpecialiteEmployeService } from './specialite-employe.service';

describe('SpecialiteEmployeService', () => {
  let service: SpecialiteEmployeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecialiteEmployeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
