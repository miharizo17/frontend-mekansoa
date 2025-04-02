import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-test',
  imports: [FormsModule,
    CommonModule
  ],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {
  services = [
    { img: "https://source.unsplash.com/400x300/?car-repair", title: "Réparations", text: "Nous réparons toutes les marques de voitures avec expertise." },
    { img: "https://source.unsplash.com/400x300/?car-maintenance", title: "Entretien", text: "Gardez votre voiture en parfait état avec notre service d'entretien." },
    { img: "https://source.unsplash.com/400x300/?tire", title: "Changement de pneus", text: "Nous proposons un large choix de pneus adaptés à votre véhicule." },
    { img: "https://source.unsplash.com/400x300/?oil", title: "Vidange", text: "Service de vidange rapide et efficace." },
    { img: "https://source.unsplash.com/400x300/?battery", title: "Batteries", text: "Remplacement et vérification des batteries." },
    { img: "https://source.unsplash.com/400x300/?brakes", title: "Freins", text: "Entretien et remplacement des freins." }
  ];

  currentIndex = 0;
  servicesPerPage = 3;

  // Récupère les services pour la page actuelle
  get visibleServices() {
    return this.services.slice(this.currentIndex, this.currentIndex + this.servicesPerPage);
  }

  next() {
    if (this.currentIndex + this.servicesPerPage < this.services.length) {
      this.currentIndex += this.servicesPerPage;
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex -= this.servicesPerPage;
    }
  }
}
