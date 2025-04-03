import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FooterProfilComponent } from '../client/footer-profil/footer-profil.component';
import { HeaderProfilComponent } from '../client/header-profil/header-profil.component';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-choix-login',
  imports: [CommonModule,
    HttpClientModule,
    FormsModule, HeaderProfilComponent, FooterProfilComponent, RouterModule],
  templateUrl: './choix-login.component.html',
  styleUrl: './choix-login.component.scss'
})
export class ChoixLoginComponent {

}
