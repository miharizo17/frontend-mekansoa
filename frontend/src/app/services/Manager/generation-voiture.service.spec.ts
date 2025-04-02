import { TestBed } from '@angular/core/testing';

import { GenerationVoitureService } from './generation-voiture.service';

describe('GenerationVoitureService', () => {
  let service: GenerationVoitureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerationVoitureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
