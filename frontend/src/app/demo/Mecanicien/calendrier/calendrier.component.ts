import { Component } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'; // Vue "Semaine/Jour avec heures"
import interactionPlugin from '@fullcalendar/interaction'; // Pour interagir avec le calendrier
import { CalendarOptions } from '@fullcalendar/core';
import { CardComponent } from "../../../theme/shared/components/card/card.component";
import { PlanningEmployeService } from 'src/app/services/Mecanicien/planning-employe.service';
import { DemandeDevisService } from 'src/app/services/Client/demande-devis.service';
import { DetailDemandeDevisService } from 'src/app/services/Client/detail-demande-devis.service';

@Component({
  selector: 'app-calendrier',
  imports: [FullCalendarModule, CardComponent],
  templateUrl: './calendrier.component.html',
  styleUrl: './calendrier.component.scss',
  providers: [PlanningEmployeService, DemandeDevisService, DetailDemandeDevisService]
})
export class CalendrierComponent {

  constructor(private planningService: PlanningEmployeService,
    private demandeDevisService: DemandeDevisService,
    private detailDemandeService: DetailDemandeDevisService
  ) { }

  idEmploye: string = "67e98d585720c299dfd41496";
  planningAFaire: any[] = [];
  planningenCours: any[] = [];
  ngOnInit(): void {
    this.loadPlanningAFaireEmploye(this.idEmploye);
    this.loadPlanningEnCoursEmploye(this.idEmploye);
  }

  loadPlanningAFaireEmploye(employeId: string): void {
    this.planningService.listePlaningByEmploye("0", employeId).subscribe(data => {
      this.planningAFaire = data;

      // Assurez-vous que la liste d'événements est bien initialisée
      if (!Array.isArray(this.calendarOptions.events)) {
        this.calendarOptions.events = [];
      }

      // Créez les nouveaux événements avec la couleur appropriée
      const newEvents = this.planningAFaire.map(tache => ({
        title: tache.numeroTache,
        start: tache.dateDebut,
        end: tache.deadline,
        NumeroDevis: tache.idDevis.numeroDevis,
        backgroundColor: 'green',
        borderColor: '#0056b3'
      }));

      // Ajoutez les nouveaux événements à la liste existante
      if (newEvents.length > 0) {
        this.calendarOptions.events = [
          ...this.calendarOptions.events,
          ...newEvents
        ];
      }
    });
  }

  loadPlanningEnCoursEmploye(employeId: string): void {
    this.planningService.listePlaningByEmploye("1", employeId).subscribe(data => {
      this.planningenCours = data;

      // Assurez-vous que la liste d'événements est bien initialisée
      if (!Array.isArray(this.calendarOptions.events)) {
        this.calendarOptions.events = [];
      }

      // Créez les nouveaux événements avec la couleur appropriée
      const newEvents = this.planningenCours.map(tache => ({
        title: tache.numeroTache,
        start: tache.dateDebut,
        end: tache.deadline,
        NumeroDevis: tache.idDevis.numeroDevis,
        backgroundColor: 'red',
        borderColor: '#563d7c'
      }));

      // Ajoutez les nouveaux événements à la liste existante
      if (newEvents.length > 0) {
        this.calendarOptions.events = [
          ...this.calendarOptions.events,
          ...newEvents
        ];
      }
    });
  }



  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    selectable: true,
    editable: true,
    eventClick: (info) => {
      this.openModal(info.event);
    }
  };

  openModal(event) {
    const modal = document.getElementById('eventModal');
    const modalTitle = modal?.querySelector('.modal-title');
    const modalBody = modal?.querySelector('.modal-body');

    if (modal && modalTitle && modalBody) {
      modalTitle.textContent = event.title;
      modalBody.innerHTML = `
        <p><strong>Date début :</strong> ${event.start.toLocaleString()}</p>
        <p><strong>Dealine :</strong> ${event.end.toLocaleString()}</p>
        <p><strong>Numero devis :</strong> ${event.extendedProps.NumeroDevis}</p>
      `;
      modal.style.display = 'block';
    }
  }

  closeModal() {
    const modal = document.getElementById('eventModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }


}
