import { TestBed } from '@angular/core/testing';

import { DetailDemandeDevisService } from './detail-demande-devis.service';

describe('DetailDemandeDevisService', () => {
  let service: DetailDemandeDevisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailDemandeDevisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
