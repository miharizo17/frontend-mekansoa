import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SpecialiteService } from 'src/app/services/Manager/specialite.service';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';

declare let bootstrap: any;
@Component({
  selector: 'app-specialite',
  imports: [CardComponent, CommonModule, HttpClientModule, FormsModule],
  templateUrl: './specialite.component.html',
  styleUrl: './specialite.component.scss',
  providers: [SpecialiteService]
})
export class SpecialiteComponent implements OnInit {
  specialites: any[] = []; // Initialisation correcte
  newSpecialite = { nomSpecialite : ''};
  isEditing = false; // Indicateur de modification
  selectedSpecialite: any = {};
  constructor(private specialiteService: SpecialiteService) { }

  ngOnInit(): void {
    this.loadSpecialite();
    // throw new Error('Method not implemented.');
  }

  // Liste
  loadSpecialite(): void {
    console.log('ito eeee');
    this.specialiteService.getSpecialite().subscribe(data => this.specialites = data);
  }

  // Ajout
  addSpecialite(): void {
    const formData = new FormData();

    if (this.newSpecialite.nomSpecialite) {
        formData.append('nomSpecialite', this.newSpecialite.nomSpecialite);

        console.log('Contenu de FormData :',formData);
    } else {
        console.log("Une des valeurs est undefined ou null !");
    }

    console.log(formData);
    this.specialiteService.addSpecialite(this.newSpecialite.nomSpecialite).subscribe(() => {
      this.loadSpecialite(); // Recharge la liste après ajout
      this.newSpecialite = { nomSpecialite: ''}; // Réinitialise le formulaire
    });
  }

  // Suppression
  deleteSpecialite(id: string): void {
    this.specialiteService.deleteSpecialite(id).subscribe(() => {
      this.loadSpecialite(); // Recharge la liste après suppression
    });
  }

  // Modal
  openUpdateModal(specialite: any) {
    this.selectedSpecialite = { ...specialite};
    const modalElement = document.getElementById('editModal');
    if (modalElement) {
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }

  // Update
  updateSpecialite(id: string, nomSpecialite: string): void {
    if(id){
      this.specialiteService.updateSpecialite(id, nomSpecialite).subscribe(() => {
        this.loadSpecialite();
        this.selectedSpecialite = { };
      });
    }
    else{
      console.log("Tsy hita le id");
    }
  }

  confirmUpdateSpecialite(){
    this.updateSpecialite(this.selectedSpecialite._id, this.selectedSpecialite.nomSpecialite);
  }

  openDeleteModal(specialite: any) {
    this.selectedSpecialite = { ...specialite}
    const modalElement = document.getElementById('deleteModal');
    if (modalElement) {
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }

  confirmDeleteSpecialite(){
    this.deleteSpecialite(this.selectedSpecialite._id);
  }
}
