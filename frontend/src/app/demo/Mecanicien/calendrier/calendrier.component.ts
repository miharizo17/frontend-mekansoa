import { Component } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'; // Vue "Semaine/Jour avec heures"
import interactionPlugin from '@fullcalendar/interaction'; // Pour interagir avec le calendrier
import { CalendarOptions } from '@fullcalendar/core';
import { CardComponent } from "../../../theme/shared/components/card/card.component";

@Component({
  selector: 'app-calendrier',
  imports: [FullCalendarModule, CardComponent],
  templateUrl: './calendrier.component.html',
  styleUrl: './calendrier.component.scss'
})
export class CalendrierComponent {
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
