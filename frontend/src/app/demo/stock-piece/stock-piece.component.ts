import { Component } from '@angular/core';
import { StockPieceService } from 'src/app/services/Manager/stock-piece.service';
import { CardComponent } from "../../theme/shared/components/card/card.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-stock-piece',
  imports: [CardComponent,
    FormsModule,
    CommonModule,
    HttpClientModule
  ],
  templateUrl: './stock-piece.component.html',
  styleUrl: './stock-piece.component.scss',
  providers: [StockPieceService]
})
export class StockPieceComponent {
  listeStock: any[] = [];
  constructor(private stockPieceService: StockPieceService) { }

  ngOnInit(): void {
    this.loadStockPiece();
    console.log(this.listeStock);
  }

 loadStockPiece(): void {
    this.stockPieceService.getStockPiece().subscribe(data => this.listeStock = data);
  }


}
