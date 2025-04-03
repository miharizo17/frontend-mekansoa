import { Component } from '@angular/core';
import { PlanningEmployeService } from 'src/app/services/Mecanicien/planning-employe.service';
import { CardComponent } from "../../../theme/shared/components/card/card.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-historique-tache',
  imports: [CardComponent,
    FormsModule,
    CommonModule
  ],
  templateUrl: './historique-tache.component.html',
  styleUrl: './historique-tache.component.scss',
   providers: [PlanningEmployeService]
})
export class HistoriqueTacheComponent {

   constructor(private planningService: PlanningEmployeService
    ) { }
    idEmploye: string = "67e98cea5720c299dfd4148e";

    ngOnInit(): void {
      this.loadHistoriqueTache(this.idEmploye);
    }
  historiquePlanning: any [] = [];
  loadHistoriqueTache(employeId: string): void {
    this.planningService.listePlaningByEmploye("3", employeId).subscribe(data => this.historiquePlanning = data);
  }
}
