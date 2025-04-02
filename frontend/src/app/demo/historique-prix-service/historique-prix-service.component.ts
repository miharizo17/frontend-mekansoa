import { Component } from '@angular/core';
import { CardComponent } from "../../theme/shared/components/card/card.component";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HistoriquePrixServiceService } from 'src/app/services/Manager/historique-prix-service.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-historique-prix-service',
  imports: [
    HttpClientModule,
    FormsModule,
    CommonModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    RouterModule
  ],
  templateUrl: './historique-prix-service.component.html',
  styleUrls: ['./historique-prix-service.component.scss'],
  providers: [HistoriquePrixServiceService]
})
export class HistoriquePrixServiceComponent {
  historiques: any[] = []; // Liste complète
  filteredHistoriques: any[] = []; // Liste filtrée
  currentPage: number = 1;
  itemsPerPage: number = 2; // Nombre d'éléments par page
  totalPages: number = 0; // Nombre total de pages

  constructor(private historiquePrixService: HistoriquePrixServiceService) {}

  ngOnInit(): void {
    this.loadHistoriques();
  }

  loadHistoriques(): void {
    this.historiquePrixService.getHistoriquePrixService().subscribe((data) => {
      this.historiques = data;
      this.filteredHistoriques = data;
    });
  }

  // recherche avancée
  updateFilter(event: any): void {
    const val = event.target.value.toLowerCase();
    this.filteredHistoriques = this.historiques.filter(historique =>
      (historique.idService?.nomService || "").toLowerCase().includes(val) ||
      historique.prix.toString().includes(val)
    );
    this.currentPage = 1; // Réinitialise à la première page après la recherche
  }

  getPaginatedData(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredHistoriques.slice(startIndex, startIndex + this.itemsPerPage);
  }

  getPages(): number[] {
    // nb total de pages selon la taille des donnees reçues et le nb de donnees par page
    this.totalPages = Math.ceil(this.filteredHistoriques.length / this.itemsPerPage);
    return Array(this.totalPages).fill(0).map((_, i) => i + 1);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
}
