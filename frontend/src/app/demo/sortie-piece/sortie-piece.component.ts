import { Component } from '@angular/core';
import { CardComponent } from "../../theme/shared/components/card/card.component";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EntreePieceService } from 'src/app/services/Manager/entree-piece.service';
import { StockPieceService } from 'src/app/services/Manager/stock-piece.service';
import { SortiePieceService } from 'src/app/services/Manager/sortie-piece.service';
import { ModePaiementService } from 'src/app/services/Manager/mode-paiement.service';
declare let bootstrap: any;
@Component({
  selector: 'app-sortie-piece',
  imports: [CardComponent,
    HttpClientModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './sortie-piece.component.html',
  styleUrl: './sortie-piece.component.scss',
  providers: [EntreePieceService, StockPieceService,SortiePieceService,ModePaiementService]
})
export class SortiePieceComponent {
  constructor(private entreeService: EntreePieceService,
    private stockPieceService: StockPieceService,
    private sortieService : SortiePieceService,
    private modePaiementService: ModePaiementService
  ) { }
  pieceSuggestions: any[] = [];
  piece: string = '';
  pieceSelectionnee: any = null;
  idPiece: string = '';
  prixUnitaire: number = 0;
  nombreSortie: number = 1;
  margeBeneficiaire: string = '';
  piecesAjoutees: any[] = [];
  listeSortiePiece: any[] = [];
  listeModePaiement: any[] = [];

  ngOnInit(): void {
    this.loadSortiePiece();
    this.loadModePaiement();
  }

  loadSortiePiece(): void {
    this.sortieService.getSortiePiece().subscribe(data => this.listeSortiePiece = data);
    console.log(this.listeSortiePiece);
  }

  loadModePaiement(): void {
    this.modePaiementService.getModePaiement().subscribe(data => this.listeModePaiement = data);
  }


  openAddModal() {
    const modalElement = document.getElementById('ajoutModal');
    if (modalElement) {
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }

  searchPiece() {
    if (this.piece.length > 1) {
      this.entreeService.searchPiece(this.piece).subscribe(
        (data) => {
          this.pieceSuggestions = data;
        },
        (error) => {
          console.error('Erreur lors de la recherche:', error);
        }
      );
    } else {
      this.pieceSuggestions = [];
    }
  }

  listeStockByPiece: any[] = [];
  nombereStock: number = 0;
  prixTotalPiece: number = 0;
  selectSuggestionPiece(piece1: any) {
    this.piece = piece1.nomPiece + "(" + piece1.referencePiece + ")";
    this.idPiece = piece1._id;
    this.pieceSelectionnee = piece1.nomPiece;
    this.pieceSuggestions = [];

    this.stockPieceService.getStockPieceByPiece(this.idPiece).subscribe(data => {
      this.listeStockByPiece = data;

      if (this.listeStockByPiece.length > 0) {
        this.prixUnitaire = this.listeStockByPiece[0].prixTotal;
        this.nombereStock = this.listeStockByPiece[0].qte;
        // this.prixTotalPiece = (this.prixUnitaire) * (this.nombereStock);
      } else {this
        console.warn("Aucun stock trouvé pour cette pièce.");
      }
    });
  }

  messageErreur: string = '';

  verificationNbStock() {
    if (this.nombreSortie > this.nombereStock) {
      this.messageErreur = 'Stock insuffisant(reste:' + this.nombereStock + ')';
      console.log("i am here 1111");
    } else {
      console.log("i am here 222");
      this.messageErreur = '';
    }
  }


  ajouterPiece() {
    if (!this.piece || !this.prixUnitaire || !this.nombreSortie) {
      alert('Veuillez remplir tous les champs avant d’ajouter.');
      return;
    }
    this.piecesAjoutees.push({
      piece: this.piece,
      idPiece: this.idPiece,
      prixVente: this.prixUnitaire,
      qte: this.nombreSortie,
      prixTotal: this.prixUnitaire *this.nombreSortie
    });

    this.piece = '';
    this.idPiece = '';
    this.prixUnitaire = 0;
    this.nombreSortie = 1;
    this.prixTotalPiece = 0;
  }




  supprimerPiece(index: number) {
    this.piecesAjoutees.splice(index, 1);
  }

  sortiePiece = { dateSortie: '', idDevis: '', idModePaiement: 'Type mode paiement' };
  addSortiePiece(): void {
    console.log( this.piecesAjoutees);
    this.sortieService.addSortiePiece(this.sortiePiece.dateSortie, this.sortiePiece.idDevis,this.sortiePiece.idModePaiement,  this.piecesAjoutees).subscribe(() => {
      this.loadSortiePiece();
      this.piecesAjoutees = [];
      this.piece = '';
      this.idPiece = '';
      this.pieceSelectionnee = null;
      this.prixUnitaire = 0;
      this.nombreSortie = 1;
      this.prixTotalPiece = 0;
      this.sortiePiece = { dateSortie: '', idDevis: '', idModePaiement: '' };
    });
  }

  listeDetailSortie: any[] = [];
  loadDetailSortiePiece(): void {
    this.sortieService.getDetailSortiePieceByPiece(this.idSortie).subscribe(data => this.listeDetailSortie = data);
  }

  selectedSortie: any = {};
  idSortie : string = '';
  openDetailsModal(sortie: any) {
    this.selectedSortie = { ...sortie };
    this.idSortie = sortie._id;
    console.log(this.idSortie);
    this.loadDetailSortiePiece();
    const modalElement = document.getElementById('detailSortieModal');
    if (modalElement) {
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }






}
