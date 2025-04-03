import { Component } from '@angular/core';
import { CardComponent } from "../../../theme/shared/components/card/card.component";
import { MatIconModule } from '@angular/material/icon';
import { PlanningEmployeService } from 'src/app/services/Mecanicien/planning-employe.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DemandeDevisService } from 'src/app/services/Client/demande-devis.service';
import { DetailDemandeDevisService } from 'src/app/services/Client/detail-demande-devis.service';
declare let bootstrap: any;
@Component({
  selector: 'app-planning',
  imports: [CardComponent,
    MatIconModule,
    FormsModule,
    CommonModule,
    HttpClientModule
  ],
  templateUrl: './planning.component.html',
  styleUrl: './planning.component.scss',
  providers: [PlanningEmployeService, DemandeDevisService, DetailDemandeDevisService]
})
export class PlanningComponent {
  constructor(private planningService: PlanningEmployeService,
    private demandeDevisService: DemandeDevisService,
    private detailDemandeService: DetailDemandeDevisService
  ) { }
  idEmploye: string = "67e98d585720c299dfd41496";
  planningAFaire: any[] = [];
  planningEnCours: any[] = [];
  planningTerminer: any[] = [];

  ngOnInit(): void {
    this.loadPlanningAFaireEmploye(this.idEmploye);
    this.loadPlanningEnCoursEmploye(this.idEmploye);
    this.loadPlanningTermineEmploye(this.idEmploye);
  }

  getFormattedDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString('fr-FR', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
  }

  loadPlanningAFaireEmploye(employeId: string): void {
    this.planningService.listePlaningByEmploye("0", employeId).subscribe(data => {
      this.planningAFaire = data;
    });
  }


  loadPlanningEnCoursEmploye(employeId: string): void {
    this.planningService.listePlaningByEmploye("1", employeId).subscribe(data => this.planningEnCours = data);
  }

  loadPlanningTermineEmploye(employeId: string): void {
    this.planningService.listePlaningByEmploye("2", employeId).subscribe(data => this.planningTerminer = data);
  }

  idPlanning: string = '';
  numeroTache: string = '';
  confirmationCommencement(idPlanningRecupere: string, tacheRecuperer: string) {
    this.idPlanning = idPlanningRecupere;
    this.numeroTache = tacheRecuperer;
    const modalElement = document.getElementById('confirmationCommencement');
    if (modalElement) {
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }

  mettreTacheEnCours(idPlanningRecupere: string): void {
    this.planningService.updateEtatEnCoursPlanningEmploye("1", idPlanningRecupere).subscribe(data => {
      this.idPlanning = '';
      this.numeroTache = '';
      this.loadPlanningAFaireEmploye(this.idEmploye);
      this.loadPlanningEnCoursEmploye(this.idEmploye);
      this.loadPlanningTermineEmploye(this.idEmploye);
      console.log("planning en cours");
    });
  }

  confirmationAchever(idPlanningRecupere: string, tacheRecuperer: string) {
    this.idPlanning = idPlanningRecupere;
    this.numeroTache = tacheRecuperer;
    const modalElement = document.getElementById('confirmationAchever');
    if (modalElement) {
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }

  mettreTacheTerminer(idPlanningRecupere: string): void {
    this.planningService.updateEtatTerminerPlanningEmploye("2", idPlanningRecupere).subscribe(data => {
      this.idPlanning = '';
      this.numeroTache = '';
      this.loadPlanningAFaireEmploye(this.idEmploye);
      this.loadPlanningEnCoursEmploye(this.idEmploye);
      this.loadPlanningTermineEmploye(this.idEmploye);
    });
  }

  listeDemandedevis: any[] = [];
  loadDemandeDevis(idDemande: string): void {
    this.demandeDevisService.getDemandeDevisById(idDemande).subscribe(data => {
      this.listeDemandedevis = data;
      console.log("listeDemandedevis ",this.listeDemandedevis);
    });
  }

  listeDetailDemandedevis: any[] = [];
  loadDetailDemandeDevis(idDemande: string): void {
    this.detailDemandeService.getDetailDemandeDevisById(idDemande).subscribe(data => {
      this.listeDetailDemandedevis = data;
    });
  }

  listeDetailPieceDemande: any[] = [];
  loadDetailPieceDemandeDevis(idDemande: string): void {
    this.detailDemandeService.getDetailPieceDemandeDevisById(idDemande).subscribe(data => this.listeDetailPieceDemande = data);
  }


  voirDetailDemande(idDemande: string) {
    this.loadDemandeDevis(idDemande);
    this.loadDetailDemandeDevis(idDemande);
    this.loadDetailPieceDemandeDevis(idDemande);
    const modalElement = document.getElementById('detailDemande');
    if (modalElement) {
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }



}
