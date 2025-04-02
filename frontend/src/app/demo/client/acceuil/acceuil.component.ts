import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServiceService } from 'src/app/services/Manager/service.service';
import { HeaderProfilComponent } from "../header-profil/header-profil.component";
import { FooterProfilComponent } from "../footer-profil/footer-profil.component";
import { CategorieServiceService } from 'src/app/services/Manager/categorie-service.service';
import { VoitureClientService } from 'src/app/services/Client/voiture-client.service';
declare let bootstrap: any;

@Component({
  selector: 'app-acceuil',
  imports: [CommonModule,
    HttpClientModule,
    FormsModule, HeaderProfilComponent, FooterProfilComponent],
  templateUrl: './acceuil.component.html',
  styleUrl: './acceuil.component.scss',
  providers: [ServiceService, CategorieServiceService, VoitureClientService]
})
export class AcceuilComponent {
  constructor(private serviceService: ServiceService,
    private categorieService: CategorieServiceService
  ) { }

  categories: any[] = [];
  clientConnecte: any = null;

  ngOnInit(): void {
    this.loadCategorie();
    this.loadAllServiceDomicile();
    const storedClient = localStorage.getItem('clientconnecte');

    if (storedClient) {
      this.clientConnecte = JSON.parse(storedClient);
    } else {
      console.log("Aucun client connecte.");
    }
  }


  loadCategorie(): void {
    this.categorieService.getCategorieService().subscribe(data => this.categories = data);
  }

  serviceDomicile: any[] = [];
  loadAllServiceDomicile(): void {
    this.serviceService.getAllServiceDomicile().subscribe(data => this.serviceDomicile = data);
  }

  currentIndexService = 0;
  servicesDomicilePerPage = 3;

  get visibleServiceDmicile() {
    return this.serviceDomicile.slice(this.currentIndexService, this.currentIndexService + this.servicesDomicilePerPage);
  }

  nextServiceDomicile() {
    if (this.currentIndexService + this.servicesDomicilePerPage < this.serviceDomicile.length) {
      this.currentIndexService += this.servicesDomicilePerPage;
    }
  }

  prevServiceDomicile() {
    if (this.currentIndexService > 0) {
      this.currentIndexService -= this.servicesDomicilePerPage;
    }
  }

  currentIndex = 0;
  categoriesPerPage = 3;


  get visibleCategorie() {
    return this.categories.slice(this.currentIndex, this.currentIndex + this.categoriesPerPage);
  }

  next() {
    if (this.currentIndex + this.categoriesPerPage < this.categories.length) {
      this.currentIndex += this.categoriesPerPage;
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex -= this.categoriesPerPage;
    }
  }


}
