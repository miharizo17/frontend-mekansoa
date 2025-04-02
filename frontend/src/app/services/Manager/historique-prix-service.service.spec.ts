import { TestBed } from '@angular/core/testing';

import { HistoriquePrixServiceService } from './historique-prix-service.service';

describe('HistoriquePrixServiceService', () => {
  let service: HistoriquePrixServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoriquePrixServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
