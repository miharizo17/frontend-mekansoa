import { TestBed } from '@angular/core/testing';

import { EmployeDetailsService } from './employe-details.service';

describe('EmployeDetailsService', () => {
  let service: EmployeDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
