import { TestBed } from '@angular/core/testing';

import { PlanningEmployeService } from './planning-employe.service';

describe('PlanningEmployeService', () => {
  let service: PlanningEmployeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanningEmployeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
