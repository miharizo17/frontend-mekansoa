import { Component, OnInit } from '@angular/core';
import { CardComponent } from "../../theme/shared/components/card/card.component";
import { MarqueVoitureService } from 'src/app/services/Manager/marque-voiture.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'; // Vue "Semaine/Jour avec heures"
import interactionPlugin from '@fullcalendar/interaction'; // Pour interagir avec le calendrier
import { CalendarOptions } from '@fullcalendar/core';


declare let bootstrap: any;

@Component({
  selector: 'app-marque-voiture',
  imports: [CardComponent, CommonModule, HttpClientModule, FormsModule, FullCalendarModule],
  templateUrl: './marque-voiture.component.html',
  styleUrl: './marque-voiture.component.scss',
  providers: [MarqueVoitureService]
})
export class MarqueVoitureComponent implements OnInit {

  marques: any[] = [];
  newMarque = { marque: '', note: '' };
  selectedMarque: any = {};
  constructor(private marqueService: MarqueVoitureService) { }

  ngOnInit(): void {
    this.loadMarque();
  }

  loadMarque(): void {
    this.marqueService.getMarque().subscribe(data => this.marques = data);
  }

  addMarque(): void {
    this.marqueService.addMarque(this.newMarque.marque, this.newMarque.note).subscribe(() => {
      this.loadMarque();
      this.newMarque = { marque: '', note: '' };

    });
  }

  openUpdateModal(marque: any) {
    this.selectedMarque = { ...marque };
    const modalElement = document.getElementById('editModal');
    if (modalElement) {
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }

  updateMarque(id: string, marque: string, note: string): void {
    this.marqueService.updateMarque(id, marque, note).subscribe(() => {
      this.loadMarque();
      this.selectedMarque = {};
    });
  }

  confirmUpdateMarque() {
    this.updateMarque(this.selectedMarque._id, this.selectedMarque.marque, this.selectedMarque.note);
  }

  openDeleteModal(marque: any) {
    this.selectedMarque = { ...marque }
    const modalElement = document.getElementById('deleteModal');
    if (modalElement) {
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }

  deleteMarque(id: string): void {
    this.marqueService.deleteMarque(id).subscribe(() => {
      this.loadMarque();
      this.selectedMarque = {};
    });

  }

  confirmDeleteMarque() {
    this.deleteMarque(this.selectedMarque._id);
  }

  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek', // Vue par défaut : Semaine avec heures
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin], // Ajoute les plugins nécessaires
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay' // Ajoute les vues Mois, Semaine et Jour
    },
    selectable: true, // Permet de sélectionner une plage horaire
    editable: true, // Permet de modifier un événement par glisser-déposer
    events: [
      { title: 'Réunion', start: '2025-03-21T12:00:00', end: '22025-03-21T13:00:00', description: 'Réunion importante avec l’équipe' },
      { title: 'Déjeuner', start: '2025-03-21T12:00:00', end: '2025-03-21T13:00:00', description: 'Déjeuner avec le client' },
      { title: 'Projet Angular', start: '2025-03-19T09:00:00', end: '2025-03-19T11:00:00', description: 'Développement du projet Angular' },
    ],
    eventClick: (info) => {
      // Lors du clic sur l'événement, afficher le modal avec les détails
      this.openModal(info.event);
    }
  };

  // Fonction pour ouvrir le modal avec les détails
  openModal(event) {
    const modal = document.getElementById('eventModal');
    const modalTitle = modal?.querySelector('.modal-title');
    const modalBody = modal?.querySelector('.modal-body');

    if (modal && modalTitle && modalBody) {
      modalTitle.textContent = event.title;
      modalBody.innerHTML = `
        <p><strong>Date de début :</strong> ${event.start.toLocaleString()}</p>
        <p><strong>Date de fin :</strong> ${event.end.toLocaleString()}</p>
        <p><strong>Description :</strong> ${event.extendedProps.description}</p>
      `;
      modal.style.display = 'block'; // Affiche le modal
    }
  }

  // Fonction pour fermer le modal
  closeModal() {
    const modal = document.getElementById('eventModal');
    if (modal) {
      modal.style.display = 'none'; // Ferme le modal
    }
  }
}

