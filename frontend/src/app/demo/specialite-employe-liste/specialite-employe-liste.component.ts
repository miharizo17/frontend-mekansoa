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
  imports: [
    HttpClientModule,
    FormsModule,
    CommonModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    RouterModule
  ],
  templateUrl: './specialite-employe-liste.component.html',
  styleUrls: ['./specialite-employe-liste.component.scss'],
  providers: [SpecialiteEmployeService, EmployeService, SpecialiteService]
})
export class SpecialiteEmployeListeComponent {
  specialiteEmployes: any[] = [];
  employes: any[] = [];
  specialites: any[] = [];
  idEmployeChoisi: any;
  idSpecialiteChoisi: any;

  selectedSpecialite: any = {};
  filteredSpecialiteEmployes: any[] = [];

  constructor(
    private specialiteEmployeService: SpecialiteEmployeService,
    private employeService : EmployeService,
    private specialiteService : SpecialiteService
  ) {}

  ngOnInit(): void {
    this.loadSpecialiteEmploye();
    this.getEmployes();
    this.getSpecialites();
  }

  // Liste all
  loadSpecialiteEmploye(): void {
    this.specialiteEmployeService.getAllSpecialiteEmploye().subscribe((data) => {
      this.specialiteEmployes = data;
      this.filteredSpecialiteEmployes = [...this.specialiteEmployes]; // Afficher toutes les spécialités au début
    });
  }

  // Liste services (liste déroulante)
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

  // openUpdateModal
  openUpdateModal(specialite: any) {
    this.selectedSpecialite = { ...specialite};
    const modalElement = document.getElementById('editModal');
    if (modalElement) {
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }

  // Update
  updateSpecialiteEmploye(){
    this.specialiteEmployeService.updateSpecialiteEmploye(this.selectedSpecialite).subscribe(() => {
      // Mettre à jour la liste après modification
      this.loadSpecialiteEmploye();
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

  confirmDeleteSpecialiteEmploye(){
    console.log("Selected specialite : ",this.selectedSpecialite._id);
    this.specialiteEmployeService.deleteSpecialiteEmploye(this.selectedSpecialite._id).subscribe(
      () => {
        console.log("Suppression réussie !");
        this.loadSpecialiteEmploye(); // Recharger la liste après suppression
      },
      (error) => {
        console.error("Erreur lors de la suppression :", error);
      }
    );
  }

  // Filtre
  filterByEmployeAndSpecialite(): void {
    this.filteredSpecialiteEmployes = this.specialiteEmployes.filter(specialiteEmploye => {
      const matchEmploye = this.idEmployeChoisi ? specialiteEmploye.idEmploye?._id === this.idEmployeChoisi : true;
      const matchSpecialite = this.idSpecialiteChoisi ? specialiteEmploye.idSpecialite?._id === this.idSpecialiteChoisi : true;

      return matchEmploye && matchSpecialite;
    });
  }

  disableSpecialite: boolean = false;
  disableEmploye: boolean = false;

  onEmployeChange(): void {
    if (this.idEmployeChoisi) {
      this.idSpecialiteChoisi = null;
      this.disableSpecialite = true;
      this.getSpecialites();
    }

    this.filterByEmployeAndSpecialite();
  }

  onSpecialiteChange(): void {
    if (this.idSpecialiteChoisi) {
      this.idEmployeChoisi = null;
      this.disableEmploye = true;
      this.getEmployes();
    }

    this.filterByEmployeAndSpecialite();
  }
}
