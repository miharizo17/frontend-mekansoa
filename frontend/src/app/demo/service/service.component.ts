import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServiceService } from 'src/app/services/Manager/service.service';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';
import { HistoriquePrixServiceService } from 'src/app/services/Manager/historique-prix-service.service';


declare let bootstrap: any;
@Component({
  selector: 'app-service',
  standalone : true,
  imports: [CardComponent, CommonModule, HttpClientModule, FormsModule],
  templateUrl: './service.component.html',
  styleUrl: './service.component.scss',
  providers: [ServiceService, HistoriquePrixServiceService]
})
export class ServiceComponent implements OnInit {
  categories: any[] = [];
  services: any[] = [];
  newService: any = {idCategorie: '', nomService: '', prixBase: '', isDomicile: ''};
  selectedService: any = {};
  constructor(
    private serviceService: ServiceService,
    private historiquePrixServiceService : HistoriquePrixServiceService
  ) { }

  // ngOnInit(): void {
  //   this.loadService();
  // }
  ngOnInit(): void {
    this.loadCategories();
    this.loadService();
  }

  // Liste
  loadCategories(): void {
    this.serviceService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  loadService(): void {
    this.serviceService.getService().subscribe(data => this.services = data);
  }

  // Ajout
  addService(): void {
    this.serviceService.addService(this.newService).subscribe(
      (savedService) => {
        // Création de l'historique avec l'ID du service ajouté
        const historique = {
          date: new Date(),
          idService: savedService._id, // Récupérer l'ID du service ajouté
          prix: this.newService.prixBase
        };

        // Ajouter l'historique après avoir ajouté le service
        this.historiquePrixServiceService.addHistoriquePrixService(historique).subscribe(() => {
          this.loadService(); // Recharger la liste des services
          this.newService = {}; // Réinitialiser le formulaire
        });
      },
      (error) => {
        console.error("Erreur lors de l'ajout du service :", error);
      }
    );
  }


  // Suppression d'une année
  deleteService(id: string): void {
    this.serviceService.deleteService(id).subscribe(() => {
      this.loadService(); // Recharge la liste après suppression
    });
  }

  // Modal
  openUpdateModal(service: any) {
    this.selectedService = { ...service};
    const modalElement = document.getElementById('editModal');
    if (modalElement) {
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }

  // Update
  updateService(): void {
    if (this.selectedService && this.selectedService._id) {
      this.serviceService.updateService(this.selectedService._id, this.selectedService).subscribe(
        () => {
          console.log("Prix base vaovao : ",this.selectedService.prixBase);
            const historique = {
              date: new Date(),
              idService: this.selectedService._id,
              prix: this.selectedService.prixBase
            };

            // Ajouter une entrée dans l'historique des prix
            this.historiquePrixServiceService.addHistoriquePrixService(historique).subscribe(() => {
              this.loadService(); // Recharger la liste des services
            });

          this.selectedService = {}; // Réinitialiser l'objet après mise à jour
        },
        (error) => {
          console.error("Erreur lors de la mise à jour du service :", error);
        }
      );
    } else {
      console.log("ID du service introuvable !");
    }
  }


  confirmUpdateService(){
    this.updateService();
  }

  openDeleteModal(service: any) {
    this.selectedService = { ...service}
    const modalElement = document.getElementById('deleteModal');
    if (modalElement) {
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }

  confirmDeleteService(){
    this.deleteService(this.selectedService._id);
  }
}
