import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailEntreePieceService } from 'src/app/services/Manager/detail-entree-piece.service';
import { CardComponent } from "../../theme/shared/components/card/card.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-entree-piece',
  imports: [
    HttpClientModule,
    CardComponent,
    FormsModule,
    CommonModule
],
  templateUrl: './detail-entree-piece.component.html',
  styleUrl: './detail-entree-piece.component.scss',
   providers: [DetailEntreePieceService]
})
export class DetailEntreePieceComponent {
  id: string = '';
  listeDetailEntree: any[] = [];
  listeEntree: any[] = [];
  constructor(private route: ActivatedRoute,
    private detailService: DetailEntreePieceService
  ) {}

  ngOnInit(): void {
    this.id = (this.route.snapshot.paramMap.get('idEntreePiece'));
    this.loadEntreePiece();
    this.loadDetailEntreePiece();

  }

  loadDetailEntreePiece(): void {
    this.detailService.getDetailEntreePieceByPiece(this.id).subscribe(data => this.listeDetailEntree = data);
  }

  loadEntreePiece(): void {
    this.detailService.getEntreePieceById(this.id).subscribe(data => this.listeEntree = data);
    console.log(this.listeEntree);
  }
}
