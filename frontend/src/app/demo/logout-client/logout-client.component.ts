import { Component } from '@angular/core';
import { CardComponent } from "../../theme/shared/components/card/card.component";
import { LoginClientService } from 'src/app/services/Client/login-client.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, RouterModule } from '@angular/router';
// import { AuthGuard } from 'src/app/guards/auth.guard';

@Component({
  selector: 'app-logout-client',
  imports: [
    HttpClientModule,
    FormsModule,
    CommonModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    RouterModule],
  templateUrl: './logout-client.component.html',
  styleUrl: './logout-client.component.scss',
  providers :[LoginClientService, Router/*, AuthGuard */]
})
export class LogoutClientComponent {
  constructor(private loginclientService: LoginClientService,
    private router : Router
  ) {}
  tokenClient: string = localStorage.getItem('token') || '';

  // logout
  logout() {
    console.log('token : ', this.tokenClient);
    if (this.tokenClient) {
      this.loginclientService.logout(this.tokenClient).subscribe({
        next: (response) => {
          localStorage.removeItem('token'); 
          console.log('Déconnexion réussie');
          this.router.navigate(['/loginClient']);
        },
        error: (err) => {
          console.log('Erreur lors de la déconnexion', err);
        }
      });
    }
  }
}
