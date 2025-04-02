import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RoleService } from 'src/app/services/Manager/role.service';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';

declare let bootstrap: any;
@Component({
  selector: 'app-role',
  imports: [CardComponent, CommonModule, HttpClientModule, FormsModule],
  templateUrl: './role.component.html',
  styleUrl: './role.component.scss',
  providers: [RoleService]
})
export class RoleComponent implements OnInit {
  roles: any[] = []; // Initialisation correcte
  newRole = { nomRole : ''};
  isEditing = false; // Indicateur de modification
  selectedRole: any = {};
  constructor(private roleService: RoleService) { }

  ngOnInit(): void {
    this.loadRole();
    // throw new Error('Method not implemented.');
  }

  // Liste
  loadRole(): void {
    console.log('ito eeee');
    this.roleService.getRole().subscribe(data => this.roles = data);
  }

  // Ajout
  addRole(): void {
    const formData = new FormData();

    if (this.newRole.nomRole) {
        formData.append('nomRole', this.newRole.nomRole);

        console.log('Contenu de FormData :',formData);
    } else {
        console.log("Une des valeurs est undefined ou null !");
    }

    console.log(formData);
    this.roleService.addRole(this.newRole.nomRole).subscribe(() => {
      this.loadRole(); // Recharge la liste après ajout
      this.newRole = { nomRole: ''}; // Réinitialise le formulaire
    });
  }

  // Suppression
  deleteRole(id: string): void {
    this.roleService.deleteRole(id).subscribe(() => {
      this.loadRole(); // Recharge la liste après suppression
    });
  }

  // Modal
  openUpdateModal(role: any) {
    this.selectedRole = { ...role};
    const modalElement = document.getElementById('editModal');
    if (modalElement) {
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }

  // Update
  updateRole(id: string, nomRole: string): void {
    if(id){
      this.roleService.updateRole(id, nomRole).subscribe(() => {
        this.loadRole();
        this.selectedRole = { };
      });
    }
    else{
      console.log("Tsy hita le id");
    }
  }

  confirmUpdateRole(){
    this.updateRole(this.selectedRole._id, this.selectedRole.nomRole);
  }

  openDeleteModal(role: any) {
    this.selectedRole = { ...role}
    const modalElement = document.getElementById('deleteModal');
    if (modalElement) {
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }

  confirmDeleteRole(){
    this.deleteRole(this.selectedRole._id);
  }
}
