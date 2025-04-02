import { Component } from '@angular/core';
import { CardComponent } from "../../theme/shared/components/card/card.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PieceService } from 'src/app/services/Manager/piece.service';
declare let bootstrap: any;

@Component({
  selector: 'app-piece',
  standalone: true,
  imports: [CardComponent,
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  templateUrl: './piece.component.html',
  styleUrl: './piece.component.scss',
  providers: [PieceService]
})
export class PieceComponent {
  constructor(private pieceService: PieceService) { }
  pieces: any[] = [];
  piece = { nomPiece:'', referencePiece: '', typePiece: 'Type piece'};
  selectedPiece: any = {};

  ngOnInit(): void {
    this.loadPiece();
  }

  loadPiece(): void {
    this.pieceService.getPiece().subscribe(data => this.pieces = data);
  }

  addPiece(): void {
    this.pieceService.addPiece(this.piece.nomPiece, this.piece.referencePiece,this.piece.typePiece).subscribe(() => {
      this.loadPiece();
      this.piece = { nomPiece:'', referencePiece: '', typePiece: 'Type piece'};

    });
  }

  openUpdateModal(piece: any) {
    this.selectedPiece = { ...piece };
    const modalElement = document.getElementById('editModal');
    if (modalElement) {
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }

  updatePiece(id: string,nomPiece: string, referencePiece: string, typePiece: string): void {
    this.pieceService.updatePiece(id, nomPiece, referencePiece,typePiece).subscribe(() => {
      this.loadPiece();
      this.selectedPiece = { };
    });
  }

  confirmUpdatePiece(){
    this.updatePiece(this.selectedPiece._id,
      this.selectedPiece.nomPiece,
      this.selectedPiece.referencePiece,
      this.selectedPiece.typePiece
    );
  }



}
