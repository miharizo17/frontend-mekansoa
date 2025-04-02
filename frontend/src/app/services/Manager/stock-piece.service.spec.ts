import { TestBed } from '@angular/core/testing';

import { StockPieceService } from './stock-piece.service';

describe('StockPieceService', () => {
  let service: StockPieceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockPieceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
