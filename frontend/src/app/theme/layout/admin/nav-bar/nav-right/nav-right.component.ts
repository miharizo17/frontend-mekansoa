// Angular import
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { LoginClientService } from 'src/app/services/Client/login-client.service';

// third party import
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-nav-right',
  imports: [RouterModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    CommonModule],
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss'],
  providers: [LoginClientService, Router, AuthGuard]
})
export class NavRightComponent {
  constructor(private loginclientService: LoginClientService,
    private router : Router
  ) { }
  tokenClient: string = localStorage.getItem('token') || '';

  // logout
  logout() {
    if (this.tokenClient) {
      this.loginclientService.logout(this.tokenClient).subscribe({
        next: (response) => {
          localStorage.removeItem('token'); // Retirer le token du localStorage
          localStorage.setItem('clientconnecte','');
          this.router.navigate(['/loginClient']);
          console.log('Déconnexion réussie');
        },
        error: (err) => {
          console.log('Erreur lors de la déconnexion', err);
        }
      });
    }
  }

}
