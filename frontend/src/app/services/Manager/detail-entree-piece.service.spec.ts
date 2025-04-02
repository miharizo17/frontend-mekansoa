import { TestBed } from '@angular/core/testing';

import { DetailEntreePieceService } from './detail-entree-piece.service';

describe('DetailEntreePieceService', () => {
  let service: DetailEntreePieceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailEntreePieceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
