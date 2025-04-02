import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockPieceComponent } from './stock-piece.component';

describe('StockPieceComponent', () => {
  let component: StockPieceComponent;
  let fixture: ComponentFixture<StockPieceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockPieceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockPieceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
