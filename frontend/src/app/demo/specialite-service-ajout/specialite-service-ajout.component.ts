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
  templateUrl: './specialite-service-ajout.component.html',
  styleUrls: ['./specialite-service-ajout.component.scss'],
  providers: [SpecialiteServiceService, ServiceService, SpecialiteService]
})
export class SpecialiteServiceAjoutComponent {
  services: any[] = [];
  specialites: any[] = [];
  newSpecialiteService: any = {
    idService: '',
    idSpecialite: ''
  };
  // Liste dynamique des spécialités sélectionnées
  specialitesAjoutes: { idSpecialite: string }[] = [{ idSpecialite: '' }];

  constructor(
    private specialiteServiceService: SpecialiteServiceService,
    private serviceService : ServiceService,
    private specialiteService : SpecialiteService
  ) {}

  ngOnInit(): void {
    this.getServices();
    this.getSpecialites();
  }

  // Liste services (liste déroulante)
  getServices(): void {
    this.serviceService.getService().subscribe(data => {
      this.services = data;
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

  // Ajout specialiteService
  addSpecialiteService(): void{
    // Récupérer les IDs des spécialités sélectionnées
    const specialiteIds: string[] = this.specialitesAjoutes.map(s => s.idSpecialite);

    // Vérifier si un service est sélectionné
    if (!this.newSpecialiteService.idService) {
      alert("Veuillez choisir un service !");
      return;
    }

    // Vérifier qu'il y a au moins une spécialité
    if (specialiteIds.length === 0) {
      alert("Veuillez sélectionner au moins une spécialité !");
      return;
    }

    // Boucler sur les IDs des spécialités pour envoyer plusieurs requêtes
    specialiteIds.forEach(idSpecialite => {
      const specialiteServiceData = {
        idService: this.newSpecialiteService.idService,
        idSpecialite: idSpecialite
      };

      this.specialiteServiceService.addSpecialiteService(specialiteServiceData).subscribe(response => {
        console.log("Insertion réussie :", response);
        this.openConfirmModal();
        this.newSpecialiteService = {};
      }, error => {
        console.error("Erreur lors de l'insertion :", error);
      });
    });
    // this.specialiteServiceService.addSpecialiteService(this.newSpecialiteService).subscribe(() => {
    //   this.newSpecialiteService = {}; // Réinitialiser le formulaire
    // });
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
