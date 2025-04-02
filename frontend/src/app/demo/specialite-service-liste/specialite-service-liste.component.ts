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
  templateUrl: './specialite-service-liste.component.html',
  styleUrls: ['./specialite-service-liste.component.scss'],
  providers: [SpecialiteServiceService, ServiceService, SpecialiteService]
})
export class SpecialiteServiceListeComponent {
  specialiteServices: any[] = [];
  services: any[] = [];
  specialites: any[] = [];
  idServiceChoisi: any;
  selectedSpecialite: any = {};
  filteredSpecialiteServices: any[] = [];

  constructor(private specialiteServiceService: SpecialiteServiceService,
    private serviceService : ServiceService,
    private specialiteService : SpecialiteService
  ) {}

  ngOnInit(): void {
    this.loadSpecialiteService();
    this.getServices();
    this.getSpecialites();
  }

  // Liste all
  loadSpecialiteService(): void {
    this.specialiteServiceService.getAllSpecialiteService().subscribe((data) => {
      this.specialiteServices = data;
      this.filteredSpecialiteServices = [...this.specialiteServices]; // Afficher toutes les spécialités au début
    });
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

  // openUpdateModal
  openUpdateModal(service: any) {
    this.selectedSpecialite = { ...service};
    const modalElement = document.getElementById('editModal');
    if (modalElement) {
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }

  // Update
  updateSpecialiteService(){
    this.specialiteServiceService.updateSpecialiteService(this.selectedSpecialite).subscribe(() => {
      // Mettre à jour la liste après modification
      this.loadSpecialiteService();
      this.closeEditModal();
    });
  }

  closeEditModal() {
    const modal = bootstrap.Modal.getInstance(document.getElementById('editModal')!);
    modal?.hide();
  }

  openDeleteModal(specialite: any) {
    this.selectedSpecialite = { ...specialite}
    const modalElement = document.getElementById('deleteModal');
    if (modalElement) {
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }

  confirmDeleteSpecialiteService(){
    console.log("Selected specialite : ",this.selectedSpecialite._id);
    this.specialiteServiceService.deleteSpecialiteService(this.selectedSpecialite._id).subscribe(
      () => {
        console.log("Suppression réussie !");
        this.loadSpecialiteService(); // Recharger la liste après suppression
      },
      (error) => {
        console.error("Erreur lors de la suppression :", error);
      }
    );
  }

  // Filtre
  filterByService(): void {
    if (!this.idServiceChoisi) {
      // Si aucun service sélectionné, afficher toutes les spécialités
      this.filteredSpecialiteServices = [...this.specialiteServices];
    } else {
      // Filtrer selon le service choisi
      this.filteredSpecialiteServices = this.specialiteServices.filter(specialiteService =>
        specialiteService.idService?._id === this.idServiceChoisi
      );
    }
  }

}
