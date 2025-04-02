import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FournisseurService } from 'src/app/services/Manager/fournisseur.service';
import { CardComponent } from "../../theme/shared/components/card/card.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
declare let bootstrap: any;

@Component({
  selector: 'app-fournisseur',
  standalone: true,
  imports: [
    CardComponent,
    CommonModule,
    FormsModule,
    HttpClientModule,  // Assurez-vous que HttpClientModule est importé ici.
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './fournisseur.component.html',
  styleUrls: ['./fournisseur.component.scss'],
  providers: [FournisseurService]
})
export class FournisseurComponent implements OnInit {
  paysSuggestions: any[] = [];
  listefournisseur: any[] = [];
  query: string = '';
  idPays: string = '';
  fournisseur = { nom: '', siteweb: '', pays: '', adresse: '', telephone: '', mail: '', etat: '' };
  selectedFournisseur: any = {};
  constructor(private fournisseurService: FournisseurService) { }

  ngOnInit(): void {
    this.loadFournisseur();
    console.log(this.listefournisseur);
  }

  loadFournisseur(): void {
    this.fournisseurService.getFournisseur().subscribe(data => this.listefournisseur = data);
    console.log(this.listefournisseur);
  }

  searchPays() {
    if (this.query.length > 2) {
      this.fournisseurService.searchPays(this.query).subscribe(
        (data) => {
          this.paysSuggestions = data;
        },
        (error) => {
          console.error('Erreur lors de la recherche:', error);
        }
      );
    } else {
      this.paysSuggestions = [];
    }
  }


  selectSuggestion(pays: any) {
    this.query = pays.nom_fr_fr;
    this.idPays = pays._id;
    this.paysSuggestions = [];
  }

  openAddModal() {
    const modalElement = document.getElementById('ajoutModal');
    if (modalElement) {
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }

  addFournisseur(): void {
    this.fournisseur.pays = this.idPays;
    this.fournisseur.etat = "0";
    console.log(this.fournisseur);
    this.fournisseurService.addFournisseur(this.fournisseur.nom, this.fournisseur.siteweb, this.fournisseur.adresse, this.fournisseur.pays, this.fournisseur.telephone, this.fournisseur.mail, this.fournisseur.etat).subscribe(() => {
      this.loadFournisseur();
      this.fournisseur = { nom: '', siteweb: '', pays: '', adresse: '', telephone: '', mail: '', etat: '' };

    });
  }

  openUpdateModal(fournisseur: any) {
    this.selectedFournisseur = { ...fournisseur };
    const modalElement = document.getElementById('editModal');
    if (modalElement) {
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }

  updateFournisseur(id: string, nom: string, siteweb: string, adresse: string, telephone: string, mail: string): void {
    this.fournisseurService.updateFournisseur(id, nom, siteweb, adresse, telephone, mail).subscribe(() => {
      this.loadFournisseur();
      this.selectedFournisseur = {};
    });
  }

  confirmUpdateFournisseur() {
    this.updateFournisseur(this.selectedFournisseur._id,
      this.selectedFournisseur.nom,
      this.selectedFournisseur.siteweb,
      this.selectedFournisseur.adresse,
      this.selectedFournisseur.telephone,
      this.selectedFournisseur.mail
    );
  }

  openDeleteModal(fournisseur: any) {
    this.selectedFournisseur = { ...fournisseur }
    const modalElement = document.getElementById('deleteModal');
    if (modalElement) {
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }






}
