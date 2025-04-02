import { TestBed } from '@angular/core/testing';

import { DemandeDevisService } from './demande-devis.service';

describe('DemandeDevisService', () => {
  let service: DemandeDevisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemandeDevisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
