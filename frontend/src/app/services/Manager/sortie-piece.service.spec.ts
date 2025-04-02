import { TestBed } from '@angular/core/testing';

import { SortiePieceService } from './sortie-piece.service';

describe('SortiePieceService', () => {
  let service: SortiePieceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SortiePieceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
