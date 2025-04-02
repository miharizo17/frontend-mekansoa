import { Component } from '@angular/core';
import { HeaderProfilComponent } from "../header-profil/header-profil.component";
import { FooterProfilComponent } from "../footer-profil/footer-profil.component";
import { GenerationVoitureService } from 'src/app/services/Manager/generation-voiture.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AnneeVoitureService } from 'src/app/services/Manager/annee-voiture.service';
import { MarqueVoitureService } from 'src/app/services/Manager/marque-voiture.service';
import { ModeleVoitureService } from 'src/app/services/Manager/modele-voiture.service';
import { VoitureClientService } from 'src/app/services/Client/voiture-client.service';
declare let bootstrap: any;

@Component({
  selector: 'app-profil',
  imports: [HeaderProfilComponent, FooterProfilComponent,
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss',
  providers: [GenerationVoitureService,
    AnneeVoitureService,
    MarqueVoitureService,
    ModeleVoitureService,
    VoitureClientService
  ]
})
export class ProfilComponent {
  constructor(private generationService: GenerationVoitureService,
    private anneeService: AnneeVoitureService,
    private marqueService: MarqueVoitureService,
    private modeleService: ModeleVoitureService,
    private voitureService: VoitureClientService
  ) { }

  clientConnecte: any = null;
  idClienteConnecte: string ='';
  ngOnInit(): void {
    const storedClient = localStorage.getItem('clientconnecte');

    if (storedClient) {
      this.clientConnecte = JSON.parse(storedClient);
      this.idClienteConnecte = this.clientConnecte._id;
    } else {
      console.log("Aucun client connecte.");
    }
    this.loadVoitureByClient();
  }

  numeroSerie: string = '';
  openAjoutVoiture() {
    const modalElement = document.getElementById('ajoutVoiture');
    if (modalElement) {
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }

  motCleGeneration: string = '';
  generationSuggestions: any[] = [];
  idGeneration: string = '';
  searchGeneration() {
    if (this.motCleGeneration.length > 1) {
      this.generationService.searchGeneration(this.motCleGeneration).subscribe(
        (data) => {
          this.generationSuggestions = data;
        },
        (error) => {
          console.error('Erreur lors de la recherche:', error);
        }
      );
    } else {
      this.generationSuggestions = [];
    }
  }


  selectSuggestionGeneration(generation: any) {
    this.motCleGeneration = generation.generation;
    this.idGeneration = generation._id;
    this.generationSuggestions = [];
  }

  motCleAnnee: string = '';
  idAnnee: string = '';
  anneeSuggestions: any[] = [];
  searchAnnee() {
    console.log(this.motCleAnnee);
    if (this.motCleAnnee.length > 1) {
      this.anneeService.searchAnnee(this.motCleAnnee).subscribe(
        (data) => {
          this.anneeSuggestions = data;
        },
        (error) => {
          console.error('Erreur lors de la recherche:', error);
        }
      );
    } else {
      this.anneeSuggestions = [];
    }
  }


  selectSuggestionAnnee(annee: any) {
    this.motCleAnnee = annee.annee;
    this.idAnnee = annee._id;
    this.anneeSuggestions = [];
  }

  motCleMarque: string = '';
  marqueSuggestions: any[] = [];
  idMarque: string = '';
  searchMarque() {
    console.log(this.motCleMarque);
    if (this.motCleMarque.length > 1) {
      this.marqueService.searchMarque(this.motCleMarque).subscribe(
        (data) => {
          this.marqueSuggestions = data;
        },
        (error) => {
          console.error('Erreur lors de la recherche:', error);
        }
      );
    } else {
      this.marqueSuggestions = [];
    }
  }

  selectSuggestionMarque(marque: any) {
    this.motCleMarque = marque.marque;
    this.idMarque = marque._id;
    this.marqueSuggestions = [];
  }

  motCleModele: string = '';
  modeleSuggestions: any[] = [];
  idModele: string = '';
  searchModele() {
    if (this.motCleModele.length > 1) {
      this.modeleService.searchModele(this.motCleModele).subscribe(
        (data) => {
          this.modeleSuggestions = data;
        },
        (error) => {
          console.error('Erreur lors de la recherche:', error);
        }
      );
    } else {
      this.modeleSuggestions = [];
    }
  }


  selectSuggestionModele(modele: any) {
    this.motCleModele = modele.modele;
    this.idModele = modele._id;
    this.modeleSuggestions = [];
  }

  addVoitureClient(): void {
    this.voitureService.addVoitureClient(this.idClienteConnecte, this.idAnnee, this.idGeneration, this.idMarque, this.idModele, this.numeroSerie).subscribe(() => {
      this.numeroSerie = '';
      this.idAnnee = '';
      this.idGeneration = '';
      this.idMarque = '';
      this.idModele = '';
      this.loadVoitureByClient();
      window.location.reload();
    });
  }



  listeVoitures: any[] = [];
  loadVoitureByClient(): void {
    if(this.clientConnecte){
      this.voitureService.getVoitureByClient(this.idClienteConnecte).subscribe(data => this.listeVoitures = data);
    }
  }
}
