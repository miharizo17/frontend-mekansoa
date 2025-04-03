import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CardComponent } from "../../theme/shared/components/card/card.component";
import { DemandeDevisService } from 'src/app/services/Client/demande-devis.service';
import { DetailDemandeDevisService } from 'src/app/services/Client/detail-demande-devis.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SpecialiteServiceService } from 'src/app/services/Manager/specialite-service.service';
import { SpecialiteEmployeService } from 'src/app/services/Manager/specialite-employe.service';
import { PlanningEmployeService } from 'src/app/services/Mecanicien/planning-employe.service';
declare let bootstrap: any;
interface ServiceData {
  _id: string;
  idService: { _id: string; nomService: string };
  idSpecialite: { _id: string; nomSpecialite: string };
}

interface GroupedService {
  idService: string;
  nomService: string;
  specialites: { _id: string; nomSpecialite: string }[];
}

@Component({
  selector: 'app-validation-devis',
  imports: [CardComponent,
    FormsModule,
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
  templateUrl: './validation-devis.component.html',
  styleUrl: './validation-devis.component.scss',
  providers: [DemandeDevisService,
    DetailDemandeDevisService,
    SpecialiteServiceService,
    SpecialiteEmployeService,
    PlanningEmployeService
  ]
})
export class ValidationDevisComponent {
  constructor(private route: ActivatedRoute,
    private demandeDevisService: DemandeDevisService,
    private detailDemandeService: DetailDemandeDevisService,
    private specialiteServiceService: SpecialiteServiceService,
    private specialiteEmployeService: SpecialiteEmployeService,
    private planningEmployeService: PlanningEmployeService
  ) { }
  listeService: any[] = [];
  idDemande: string = '';
  listeSpecialiteService: ServiceData[] = [];
  groupedServices: GroupedService[] = [];
  listeEmployeSpecialite: any[] = [];
  dateHeureActuelle: string = '';
  ngOnInit(): void {
    this.idDemande = (this.route.snapshot.paramMap.get('idDemandeDevis'));
    this.loadDemandeDevis();
    this.loadDetailDemandeDevis();
    this.route.queryParams.subscribe(params => {
      this.dateHeureActuelle = params['date'] || '';
    });
    console.log("dateHeureActuellesss ", this.dateHeureActuelle);


  }

  listeDemandedevis: any[] = [];
  heureFini: string = '';
  minuteFini: string = '';
  dateFinale: string = '';
  loadDemandeDevis(): void {
    this.demandeDevisService.getDemandeDevisById(this.idDemande).subscribe(data => {
      this.listeDemandedevis = data;
      this.heureFini = String(this.listeDemandedevis[0]?.heureFini).padStart(2, '0');
      this.minuteFini = String(this.listeDemandedevis[0]?.minuteFini).padStart(2, '0');
      let dateActuelle = new Date(this.dateHeureActuelle);
      let heuresAjoutees = Number(this.listeDemandedevis[0]?.heureFini) || 0;
      let minutesAjoutees = Number(this.listeDemandedevis[0]?.minuteFini) || 0;

      // Ajouter heures et minutes en UTC
      dateActuelle.setUTCHours(dateActuelle.getUTCHours() + heuresAjoutees);
      dateActuelle.setUTCMinutes(dateActuelle.getUTCMinutes() + minutesAjoutees);

      // Formater en UTC pour éviter les décalages
      let options: Intl.DateTimeFormatOptions = {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit', hour12: false,
        timeZone: 'UTC' // Force l'affichage en UTC
      };

      this.dateFinale = new Intl.DateTimeFormat('fr-FR', options).format(dateActuelle);


      console.log("Date après addition :", this.dateFinale);


    });
  }

  loadDetailDemandeDevis(): void {
    this.detailDemandeService.getDetailDemandeDevisById(this.idDemande).subscribe(data => {
      this.listeService = data;
      this.specialiteServiceService.getSpecialiteByService(this.listeService).subscribe(data => {
        this.listeSpecialiteService = data;
        this.groupData();
      });
    });
  }

  listeEmployeGroupee: any[] = [];
  listeEmployeDispo: any[] = [];
  listeEmployeAffecte: any[] = [];
  groupData(): void {
    const serviceMap = new Map<string, GroupedService>();

    this.listeSpecialiteService.forEach(item => {
      const { idService, idSpecialite } = item;
      if (!serviceMap.has(idService._id)) {
        serviceMap.set(idService._id, {
          idService: idService._id,
          nomService: idService.nomService,
          specialites: []
        });
      }
      serviceMap.get(idService._id)!.specialites.push(idSpecialite);
    });

    this.groupedServices = Array.from(serviceMap.values());

    this.specialiteEmployeService.getEmployeBySpecialite(this.groupedServices).subscribe(data => {
      this.listeEmployeSpecialite = data;
      console.log(this.listeEmployeSpecialite);
      const employeMap = new Map<string, { _id: string, nom: string, specialites: string[] }>();
      this.listeEmployeSpecialite.forEach(item => {
        const employeId = item.idEmploye._id;
        const employeNom = item.idEmploye.nom;
        const specialiteNom = item.idSpecialite.nomSpecialite;

        if (!employeMap.has(employeId)) {
          employeMap.set(employeId, {
            _id: employeId,
            nom: employeNom,
            specialites: []
          });
        }
        employeMap.get(employeId)!.specialites.push(specialiteNom);
      });

      this.listeEmployeGroupee = Array.from(employeMap.values());
      this.planningEmployeService.listePlaningSuperieurDate(this.dateHeureActuelle, this.listeEmployeGroupee).subscribe(data => {
        this.listeEmployeDispo = data.employesDisponibles;
        this.listeEmployeAffecte = data.employeUniqueDansPlanning;
      });
    });
  }



  getSpecialitesAsString(service: GroupedService): string {
    return service.specialites.map(s => s.nomSpecialite).join(', ');
  }

  employesSelectionnes: any[] = [];
  toggleSelection(employe: any, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      this.employesSelectionnes.push(employe);
    } else {
      this.employesSelectionnes = this.employesSelectionnes.filter(e => e.nom !== employe.nom);
    }
  }


  ajoutPlanningEmploye(): void {
    this.planningEmployeService.ajoutPlanningEmploye(this.dateHeureActuelle, this.dateFinale, this.listeDemandedevis[0]?._id, this.employesSelectionnes).subscribe(() => {
      const modalElement = document.getElementById('confirmationAssignement');
      if (modalElement) {
        const modalInstance = new bootstrap.Modal(modalElement);
        modalInstance.show();
      }
      this.loadDemandeDevis();

    });
  }







}
