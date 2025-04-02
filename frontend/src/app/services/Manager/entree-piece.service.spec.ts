import { TestBed } from '@angular/core/testing';

import { EntreePieceService } from './entree-piece.service';

describe('EntreePieceService', () => {
  let service: EntreePieceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntreePieceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
