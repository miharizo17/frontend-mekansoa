import { Component } from '@angular/core';
import { CardComponent } from "../../theme/shared/components/card/card.component";
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import { EmployeService } from 'src/app/services/Manager/employe.service';
import { LoginClientService } from 'src/app/services/Client/login-client.service';

declare let bootstrap: any;
@Component({
  selector: 'app-employe',
  imports: [CardComponent,
    HttpClientModule,
    FormsModule,
    CommonModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    RouterModule],
  templateUrl: './employe.component.html',
  styleUrl: './employe.component.scss',
  providers: [EmployeService,LoginClientService]
})
export class EmployeComponent {
  constructor(private employeService: EmployeService, private loginClientService : LoginClientService) { }
  // new Employe
  newEmploye: any = {
    dateEntree: '', // Date hampidirana azy
    idRole: '',
    nom: '',
    dateNaissance: '',
    cin: '',
    sexe: '',
    telephone: '',
    email: '',
    photo: '',
    adresse: '',
    salaireBrut: '',
    salaireNet: '',
    mdp: ''
  };

  employes: any[] = [];
  roles: any[] = [];
  selectedEmploye: any = {};

  // private token: string | null = localStorage.getItem('token');
  connecte: number = 0;
  errorMessage: string = '';

  // Load page
  ngOnInit(): void {
    this.loadEmploye();
    this.loadRoles();
    console.log("selectedEmploye",this.selectedEmploye);
}

  // Liste employe
  loadEmploye(){
    this.employeService.getEmploye().subscribe(
      data => {
        console.log('Données reçues employes:', data);
        this.employes = data},
    );
    console.log("Liste employes : ",this.employes);
  }

  // Liste roles
  loadRoles() {
    this.employeService.getRoles().subscribe(data => {
      this.roles = data;
    });
  }
  // open modal ajout
  openAddModal() {
    const modalElement = document.getElementById('ajoutModal');
    if (modalElement) {
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }

  // Ajout nouvel employe
  addEmploye() {
    this.employeService.addEmploye(this.newEmploye).subscribe(() => {
      this.loadEmploye(); 
      this.newEmploye = {}; 
    });
  }

  // Modal update
  openUpdateModal(employe: any){
    this.selectedEmploye = { ...employe};
    const modalElement = document.getElementById('editModal');
    if (modalElement) {
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }

  // Update employe
  updateEmploye(){
    this.employeService.updateEmploye(this.selectedEmploye).subscribe(() => {
      // Mettre à jour la liste après modification
      this.loadEmploye();
      this.closeEditModal();
    });
  }

  closeEditModal() {
    const modal = bootstrap.Modal.getInstance(document.getElementById('editModal')!);
    modal?.hide();
  }

  // Details modal
  openDetailsModal(id: string) {
    this.employeService.getEmployeById(id).subscribe(
      (data) => {
        this.selectedEmploye = data;
        const modal = document.getElementById('detailsEmployeModal');
        if (modal) {
          (modal as any).style.display = 'block'; // Ouvre le modal
        }
      },
      (error) => {
        console.error("Erreur lors de la récupération des détails :", error);
      }
    );
  }

  // close details modal
  closeDetailsModal() {
    const modal = document.getElementById('detailsEmployeModal');
    if (modal) {
      (modal as any).style.display = 'none'; // Ferme le modal
    }
  }
}
