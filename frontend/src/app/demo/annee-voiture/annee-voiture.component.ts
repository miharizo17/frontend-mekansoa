import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AnneeVoitureService } from 'src/app/services/Manager/annee-voiture.service';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';

declare let bootstrap: any;
@Component({
  selector: 'app-annee-voiture',
  imports: [CardComponent, CommonModule, HttpClientModule, FormsModule],
  templateUrl: './annee-voiture.component.html',
  styleUrl: './annee-voiture.component.scss',
  providers: [AnneeVoitureService]
})
export class AnneeVoitureComponent implements OnInit {
  annees: any[] = []; // ✅ Initialisation correcte
  newAnnee = { annee: '', note: '',};
  isEditing = false; // Indicateur de modification
  anneeEnCours: any = null; // Stocke l'année à modifier
  selectedAnnee: any = {};
  constructor(private anneeService: AnneeVoitureService) { }

  ngOnInit(): void {
    this.loadAnnee();
    // throw new Error('Method not implemented.');
  }

  // Liste
  loadAnnee(): void {
    console.log('ito eeee');
    this.anneeService.getAnnee().subscribe(data =>{
      console.log('Données reçues:', data);
      this.annees = data
    }
    );
  }

  // Ajout
  addAnnee(): void {
    const formData = new FormData();

    if (this.newAnnee.annee && this.newAnnee.note) {
        formData.append('annee', this.newAnnee.annee);
        formData.append('note', this.newAnnee.note);

        console.log('Contenu de FormData :',formData);
    } else {
        console.log("Une des valeurs est undefined ou null !");
    }

    console.log(formData);
    this.anneeService.addAnnee(this.newAnnee.annee,this.newAnnee.note).subscribe(() => {
      this.loadAnnee();
      this.newAnnee = { annee: '', note: '' }; 
    });
  }

  // Suppression d'une année
  deleteAnnee(id: string): void {
    this.anneeService.deleteAnnee(id).subscribe(() => {
      this.loadAnnee(); // Recharge la liste après suppression
    });
  }

  // Modal
  openUpdateModal(annee: any) {
    this.selectedAnnee = { ...annee};
    const modalElement = document.getElementById('editModal');
    if (modalElement) {
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }

  // Update
  updateAnnee(id: string, annee: string, note: string): void {
    if(id){
      this.anneeService.updateAnnee(id, annee, note).subscribe(() => {
        this.loadAnnee();
        this.selectedAnnee = { };
      });
    }
    else{
      console.log("Tsy hita le id");
    }
  }

  confirmUpdateAnnee(){
    this.updateAnnee(this.selectedAnnee._id, this.selectedAnnee.annee, this.selectedAnnee.note);
  }

  openDeleteModal(annee: any) {
    this.selectedAnnee = { ...annee}
    const modalElement = document.getElementById('deleteModal');
    if (modalElement) {
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }

  confirmDeleteAnnee(){
    this.deleteAnnee(this.selectedAnnee._id);
  }
}
