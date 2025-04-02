import { TestBed } from '@angular/core/testing';

import { VoitureClientService } from './voiture-client.service';

describe('VoitureClientService', () => {
  let service: VoitureClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VoitureClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
