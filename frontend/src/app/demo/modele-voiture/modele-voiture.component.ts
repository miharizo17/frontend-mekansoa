import { Component } from '@angular/core';
import { ModeleVoitureService } from 'src/app/services/Manager/modele-voiture.service';
import { CardComponent } from "../../theme/shared/components/card/card.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
declare let bootstrap: any;
@Component({
  selector: 'app-modele-voiture',
  imports: [CardComponent,
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  templateUrl: './modele-voiture.component.html',
  styleUrl: './modele-voiture.component.scss',
  providers: [ModeleVoitureService]
})
export class ModeleVoitureComponent {
  constructor(private modeleService: ModeleVoitureService) { }

  ngOnInit(): void {
    this.loadModele();
  }

  modeles: any[] = [];
  newModele = { modele: '', note: '', };
  loadModele(): void {
    this.modeleService.getModele().subscribe(data => this.modeles = data);
  }

  addModele(): void {
    this.modeleService.addModele(this.newModele.modele, this.newModele.note).subscribe(() => {
      this.loadModele();
      this.newModele = { modele: '', note: '' };
    });
  }

  selectedModele: any = {};
  openUpdateModal(modele: any) {
    this.selectedModele = { ...modele };
    const modalElement = document.getElementById('editModal');
    if (modalElement) {
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }

  updateModele(id: string, modele: string, note: string): void {
    this.modeleService.updateModele(id, modele, note).subscribe(() => {
      this.loadModele();
      this.selectedModele = {};
    });

  }

  confirmUpdateModele(){
    this.updateModele(this.selectedModele._id, this.selectedModele.modele, this.selectedModele.note);
  }

}
