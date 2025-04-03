import { Component } from '@angular/core';
import { LoginClientService } from 'src/app/services/Client/login-client.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { LoginManagerService } from 'src/app/services/login-manager.service';
// import { AuthGuard } from 'src/app/guards/auth.guard';


@Component({
  selector: 'app-login-client',
  imports: [
    HttpClientModule,
    FormsModule,
    CommonModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    RouterModule
  ],
  templateUrl: './login-manager.component.html',
  styleUrl: './login-manager.component.scss',
  providers :[LoginManagerService, Router/*, AuthGuard */]
})
export class LoginManagerComponent {
  email: string = '';
  mdp: string = '';
  connecte: number = 0;
  errorMessage: string = '';

  constructor(
    private loginManagerService: LoginManagerService,
    private router : Router,
    private route: ActivatedRoute
  ) {}

  erreur: string = '';
  ngOnInit(): void {
    this.verifierConnexion();
  }

  verifierConnexion() {
    this.loginManagerService.verifyToken().subscribe({
      next: (connecte) => {
        console.log('Statut connexion:', connecte);
        this.connecte = connecte;
      },
      error: (error) => {
        console.error('Erreur:', error);
        this.connecte = 1;
        this.errorMessage = error.error?.message ;
      }
    });
  }

  // Login
  login() {
    if (this.email && this.mdp) {
      this.loginManagerService.login(this.email, this.mdp).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          // console.log('Client connecté: ', response.client);
          // localStorage.setItem('clientconnecte', JSON.stringify(response.client));
          this.router.navigate(['/employe']);
        },
        error: (err) => {
          this.errorMessage = err.error.error || 'Erreur lors de la connexion';
        }
      });
    } else {
      this.errorMessage = 'Email et mot de passe sont requis';
    }
  }


}
