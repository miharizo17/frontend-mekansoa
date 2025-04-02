import { Component } from '@angular/core';
import { CardComponent } from "../../theme/shared/components/card/card.component";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SpecialiteServiceService } from 'src/app/services/Manager/specialite-service.service';
import { RouterModule } from '@angular/router';
import { ServiceService } from 'src/app/services/Manager/service.service';
import { SpecialiteService } from 'src/app/services/Manager/specialite.service';
import { SpecialiteEmployeService } from 'src/app/services/Manager/specialite-employe.service';
import { EmployeService } from 'src/app/services/Manager/employe.service';

declare let bootstrap: any;
@Component({
  selector: 'app-specialite-service-service',
  imports: [CardComponent,
    HttpClientModule,
    FormsModule,
    CommonModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    RouterModule
  ],
  templateUrl: './specialite-employe-ajout.component.html',
  styleUrls: ['./specialite-employe-ajout.component.scss'],
  providers: [SpecialiteEmployeService, ServiceService, SpecialiteService,EmployeService]
})
export class SpecialiteEmployeAjoutComponent {
  employes: any[] = [];
  specialites: any[] = [];
  newSpecialiteEmploye: any = {
    idEmploye: '',
    idSpecialite: ''
  };
  // Liste dynamique des spécialités sélectionnées
  specialitesAjoutes: { idSpecialite: string }[] = [{ idSpecialite: '' }];

  constructor(
    private specialiteEmployeService: SpecialiteEmployeService,
    private employeService : EmployeService,
    private specialiteService : SpecialiteService
  ) {}

  ngOnInit(): void {
    this.getEmployes();
    this.getSpecialites();
  }

  // Liste employes (liste déroulante)
  getEmployes(): void {
    this.employeService.getEmploye().subscribe(data => {
      this.employes = data;
    });
  }

  // Liste spécialités (Liste déroulante)
  getSpecialites(): void {
    this.specialiteService.getSpecialite().subscribe(data => {
      this.specialites = data;
    });
  }

  // Ajout champ specialite(Bouton plus)
  addSpecialite() {
    this.specialitesAjoutes.push({ idSpecialite: '' });
  }

  // Supprimer un champ spécialité
  removeSpecialite(index: number) { // index a recuperer dans boucle front
    this.specialitesAjoutes.splice(index, 1);
  }

  // Ajout specialiteEmploye
  addSpecialiteEmploye(): void{
    // Récupérer les IDs des spécialités sélectionnées
    const specialiteIds: string[] = this.specialitesAjoutes.map(s => s.idSpecialite);

    // Vérifier si un employe est sélectionné
    if (!this.newSpecialiteEmploye.idEmploye) {
      alert("Veuillez choisir un employe !");
      return;
    }

    // Vérifier qu'il y a au moins une spécialité
    if (specialiteIds.length === 0) {
      alert("Veuillez sélectionner au moins une spécialité !");
      return;
    }

    // Boucler sur les IDs des spécialités pour envoyer plusieurs requêtes
    specialiteIds.forEach(idSpecialite => {
      const specialiteEmployeData = {
        idEmploye: this.newSpecialiteEmploye.idEmploye,
        idSpecialite: idSpecialite
      };

      this.specialiteEmployeService.addSpecialiteEmploye(specialiteEmployeData).subscribe(response => {
        console.log("Insertion réussie :", response);
        this.openConfirmModal();
        this.newSpecialiteEmploye = {};
      }, error => {
        console.error("Erreur lors de l'insertion :", error);
      });
    });
  }

  // Modal "Elément(s) ajouté(s)"
  openConfirmModal(): void {
    const modalElement = document.getElementById('confirmModal');
    if (modalElement) {
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }
}
