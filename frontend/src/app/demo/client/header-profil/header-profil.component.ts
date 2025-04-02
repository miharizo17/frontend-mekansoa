import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DemandeDevisService } from 'src/app/services/Client/demande-devis.service';
import { DetailDemandeDevisService } from 'src/app/services/Client/detail-demande-devis.service';
import { LoginClientService } from 'src/app/services/Client/login-client.service';
import { VoitureClientService } from 'src/app/services/Client/voiture-client.service';
import { ServiceService } from 'src/app/services/Manager/service.service';
declare let bootstrap: any;
@Component({
  selector: 'app-header-profil',
  imports: [CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  templateUrl: './header-profil.component.html',
  styleUrl: './header-profil.component.scss',
  providers: [ServiceService,
    VoitureClientService,
    DemandeDevisService,
    DetailDemandeDevisService
  ]
})
export class HeaderProfilComponent {
  constructor(private serviceService: ServiceService,
    private voitureService: VoitureClientService,
    private demandeDevisService: DemandeDevisService,
    private detailDemandeService: DetailDemandeDevisService,
    private loginclientService: LoginClientService,
    private router : Router
  ) { }

  clientConnecte: any = null;
  demandeDevis = { dateDemande: '', idVoitureClient: '' };
  ngOnInit(): void {
    const storedClient = localStorage.getItem('clientconnecte');

    if (storedClient) {
      this.clientConnecte = JSON.parse(storedClient);
    } else {
      console.log("Aucun client connecte.");
    }
    this.demandeDevis.dateDemande = this.getTodayDateTime();
    this.loadVoitureByClient();
  }


  getTodayDateTime(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    const hours = String(today.getHours()).padStart(2, '0');
    const minutes = String(today.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  openDemandeDevis() {
    if(this.clientConnecte){
      const modalElement = document.getElementById('demandeDevisModal');
      if (modalElement) {
        const modalInstance = new bootstrap.Modal(modalElement);
        modalInstance.show();
      }
    }else{
      const modalElement = document.getElementById('demandeConnexion');
      if (modalElement) {
        const modalInstance = new bootstrap.Modal(modalElement);
        modalInstance.show();
      }
    }

  }

  voirProfil() {
    if(this.clientConnecte){
      console.log('inty aho');
      this.router.navigate(['/profilClient']);
    }else{
      const modalElement = document.getElementById('demandeConnexion');
      if (modalElement) {
        const modalInstance = new bootstrap.Modal(modalElement);
        modalInstance.show();
      }
    }

  }

  service: string = '';
  serviceSuggestions: any[] = [];
  nombre: number = 1;
  idService: string = '';
  serviceSelectionnee: any = null;
  idDomicile: number =0;

  rechercheAvecVerification(){
    if(this.idDomicile==0){
      console.log('hey');
      this.searchService();
    }else{
      console.log('bye');
      this.searchServiceDomicile();
    }
  }
  searchService() {
    if (this.service.length > 1) {
      this.serviceService.searchService(this.service).subscribe(
        (data) => {
          this.serviceSuggestions = data;
        },
        (error) => {
          console.error('Erreur lors de la recherche:', error);
        }
      );
      console.log('non domicile');
    } else {
      this.serviceSuggestions = [];
    }
  }

  searchServiceDomicile() {
    if (this.service.length > 1) {
      this.serviceService.getServiceDomicile(this.service).subscribe(
        (data) => {
          this.serviceSuggestions = data;
        },
        (error) => {
          console.error('Erreur lors de la recherche:', error);
        }
      );
      console.log('a domicile');
    } else {
      this.serviceSuggestions = [];
    }
  }

  selectSuggestion(service: any) {
    this.service = service.nomService;
    this.idService = service._id;
    this.serviceSelectionnee = service.nomService;
    this.serviceSuggestions = [];
  }

  serviceAjoutees: any[] = [];
  ajouterService() {
    if (!this.service) {
      alert('Veuillez remplir tous les champs avant d’ajouter.');
      return;
    }
    this.serviceAjoutees.push({
      service: this.service,
      nombre: this.nombre,
      idService: this.idService
    });
    this.service = '';
    this.idService = '';
    this.nombre = 1;
  }


  supprimerService(index: number) {
    this.serviceAjoutees.splice(index, 1);
  }



  listeVoitures: any[] = [];
  loadVoitureByClient(): void {
    if(this.clientConnecte){
      this.voitureService.getVoitureByClient(this.clientConnecte._id).subscribe(data => this.listeVoitures = data);
    }
  }



  addDemandeDevis(): void {
    this.demandeDevisService.addDemandeDevis(this.demandeDevis.dateDemande, this.demandeDevis.idVoitureClient, this.serviceAjoutees,this.idDomicile).subscribe(() => {
      const modalElement = document.getElementById('demandeEnvoye');
      if (modalElement) {
        const modalInstance = new bootstrap.Modal(modalElement);
        modalInstance.show();
      }
      this.demandeDevis = { dateDemande: '', idVoitureClient: '' };
      this.serviceAjoutees = [];

    });
  }

  tokenClient: string = localStorage.getItem('token') || '';

  // logout
  logout() {
    if (this.tokenClient) {
      this.loginclientService.logout(this.tokenClient).subscribe({
        next: (response) => {
          localStorage.removeItem('token'); // Retirer le token du localStorage
          localStorage.setItem('clientconnecte','');
          this.router.navigate(['/loginClient']);
          console.log('Déconnexion réussie');
        },
        error: (err) => {
          console.log('Erreur lors de la déconnexion', err);
        }
      });
    }
  }

}
