import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardComponent } from "../../theme/shared/components/card/card.component";
import { DemandeDevisService } from 'src/app/services/Client/demande-devis.service';
import { DetailDemandeDevisService } from 'src/app/services/Client/detail-demande-devis.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SpecialiteServiceService } from 'src/app/services/Manager/specialite-service.service';
import { SpecialiteEmployeService } from 'src/app/services/Manager/specialite-employe.service';
import { PlanningEmployeService } from 'src/app/services/Mecanicien/planning-employe.service';
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
    HttpClientModule
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

  ngOnInit(): void {
    this.idDemande = (this.route.snapshot.paramMap.get('idDemandeDevis'));
    this.loadDetailDemandeDevis();

  }

  listeDemandedevis: any[] = [];
  loadDemandeDevis(): void {
    this.demandeDevisService.getDemandeDevisById(this.idDemande).subscribe(data => {
      this.listeDemandedevis = data;
    });
  }

  loadDetailDemandeDevis(): void {
    this.detailDemandeService.getDetailDemandeDevisById(this.idDemande).subscribe(data => {
      this.listeService = data;
      this.specialiteServiceService.getSpecialiteByService(this.listeService).subscribe(data => {
        this.listeSpecialiteService = data;
        console.log(this.listeSpecialiteService);
        this.groupData();
      });
    });
  }

  listeEmployeGroupee: any[] = [];
  listeEmployeDispo: any[]=[];
  listeEmployeAffecte:any[]=[];
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

      // Convertir la Map en un tableau
      this.listeEmployeGroupee = Array.from(employeMap.values());
      console.log('tttuuuu');
      console.log(this.listeEmployeGroupee);
      this.planningEmployeService.listePlaningSuperieurDate("2025-04-01T10:00:00Z",this.listeEmployeGroupee).subscribe(data => {
        console.log("Employe affectee: ", data.employesAffectes);
        this.listeEmployeDispo = data.employesDisponibles;
        this.listeEmployeAffecte = data.employesAffectes;
        console.log("jjjjjjeeeee");
        console.log(this.listeEmployeDispo);
      });
    });
  }






}
