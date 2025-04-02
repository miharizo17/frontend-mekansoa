import { Component } from '@angular/core';
import { DemandeDevisService } from 'src/app/services/Client/demande-devis.service';
import { CardComponent } from "../../theme/shared/components/card/card.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-liste-demande-devis',
  imports: [CardComponent,
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  templateUrl: './liste-demande-devis.component.html',
  styleUrl: './liste-demande-devis.component.scss',
  providers: [DemandeDevisService]
})
export class ListeDemandeDevisComponent {
  constructor(private demandeDevisService: DemandeDevisService) { }
  listeDemandeDevis: any[] = [];
  mode = { nomMode: '' };
  ngOnInit(): void {
    this.loadDemandeDevisClient();
  }

  loadDemandeDevisClient(): void {
    this.demandeDevisService.getDemandeDevis().subscribe(data => this.listeDemandeDevis = data);

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

}
