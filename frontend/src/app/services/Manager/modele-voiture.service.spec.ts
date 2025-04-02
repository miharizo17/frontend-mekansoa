import { TestBed } from '@angular/core/testing';

import { ModeleVoitureService } from './modele-voiture.service';

describe('ModeleVoitureService', () => {
  let service: ModeleVoitureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModeleVoitureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
