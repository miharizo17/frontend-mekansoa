import { TestBed } from '@angular/core/testing';

import { AnneeVoitureService } from './annee-voiture.service';

describe('AnneeVoitureService', () => {
  let service: AnneeVoitureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnneeVoitureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
