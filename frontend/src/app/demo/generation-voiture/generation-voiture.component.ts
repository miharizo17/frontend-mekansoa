import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GenerationVoitureService } from 'src/app/services/Manager/generation-voiture.service';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';

declare let bootstrap: any;
@Component({
  selector: 'app-generation-voiture',
  imports: [CardComponent, CommonModule, HttpClientModule, FormsModule],
  templateUrl: './generation-voiture.component.html',
  styleUrl: './generation-voiture.component.scss',
  providers: [GenerationVoitureService]
})
export class GenerationVoitureComponent implements OnInit {
  generations: any[] = []; // ✅ Initialisation correcte
  newGeneration = { generation: '', note: '',};
  isEditing = false; // Indicateur de modification
  selectedGeneration: any = {};
  constructor(private generationService: GenerationVoitureService) { }

  ngOnInit(): void {
    this.loadGeneration();
    // throw new Error('Method not implemented.');
  }

  // Liste
  loadGeneration(): void {
    console.log('ito eeee');
    this.generationService.getGeneration().subscribe(data => this.generations = data);
  }

  // Ajout
  addGeneration(): void {
    const formData = new FormData();

    if (this.newGeneration.generation && this.newGeneration.note) {
        formData.append('generation', this.newGeneration.generation);
        formData.append('note', this.newGeneration.note);

        console.log('Contenu de FormData :',formData);
    } else {
        console.log("Une des valeurs est undefined ou null !");
    }

    console.log(formData);
    this.generationService.addGeneration(this.newGeneration.generation,this.newGeneration.note).subscribe(() => {
      this.loadGeneration(); // Recharge la liste après ajout
      this.newGeneration = { generation: '', note: '' }; // Réinitialise le formulaire
    });
  }

  // Suppression d'une année
  deleteGeneration(id: string): void {
    this.generationService.deleteGeneration(id).subscribe(() => {
      this.loadGeneration(); // Recharge la liste après suppression
    });
  }

  // Modal
  openUpdateModal(generation: any) {
    this.selectedGeneration = { ...generation};
    const modalElement = document.getElementById('editModal');
    if (modalElement) {
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }

  // Update
  updateGeneration(id: string, generation: string, note: string): void {
    if(id){
      this.generationService.updateGeneration(id, generation, note).subscribe(() => {
        this.loadGeneration();
        this.selectedGeneration = { };
      });
    }
    else{
      console.log("Tsy hita le id");
    }
  }

  confirmUpdateGeneration(){
    this.updateGeneration(this.selectedGeneration._id, this.selectedGeneration.generation, this.selectedGeneration.note);
  }

  openDeleteModal(generation: any) {
    this.selectedGeneration = { ...generation}
    const modalElement = document.getElementById('deleteModal');
    if (modalElement) {
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }

  confirmDeleteGeneration(){
    this.deleteGeneration(this.selectedGeneration._id);
  }
}
