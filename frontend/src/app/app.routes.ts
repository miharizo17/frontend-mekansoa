import { Routes } from '@angular/router';
import { MarqueVoitureComponent } from './demo/marque-voiture/marque-voiture.component';
import { AnneeVoitureComponent } from './demo/annee-voiture/annee-voiture.component';
export const routes: Routes = [
 { path: 'marqueVoiture', component: MarqueVoitureComponent },
 { path: 'anneeVoiture', component: AnneeVoitureComponent },
 { path: '', redirectTo: 'articles', pathMatch: 'full' } // Redirectipar défaut
];
