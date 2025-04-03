import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';
import { AuthGuard } from './guards/auth.guard';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '/choixLogin',
        pathMatch: 'full'
      },
      { path: 'default',
        loadComponent: () => import('./demo/dashboard/default/default.component').then(c => c.DefaultComponent), canActivate: [AuthGuard]
      },
      { path: 'typography',
        loadComponent: () => import('./demo/elements/typography/typography.component'), canActivate: [AuthGuard]
      },
      { path: 'color',
        loadComponent: () => import('./demo/elements/element-color/element-color.component'), canActivate: [AuthGuard]
      },
      { path: 'sample-page',
        loadComponent: () => import('./demo/other/sample-page/sample-page.component'), canActivate: [AuthGuard]
      },
      { path: 'marque',
        loadComponent: () => import('./demo/marque-voiture/marque-voiture.component').then(m => m.MarqueVoitureComponent), canActivate: [AuthGuard]
      },
      { path: 'fournisseur',
        loadComponent: () => import('./demo/fournisseur/fournisseur.component').then(m => m.FournisseurComponent), canActivate: [AuthGuard]
      },
      { path: 'piece',
        loadComponent: () => import('./demo/piece/piece.component').then(m => m.PieceComponent), canActivate: [AuthGuard]
      },
      { path: 'annee',
        loadComponent: () => import('./demo/annee-voiture/annee-voiture.component').then(m => m.AnneeVoitureComponent), canActivate: [AuthGuard]
      },
      { path: 'generation',
        loadComponent: () => import('./demo/generation-voiture/generation-voiture.component').then(m => m.GenerationVoitureComponent), canActivate: [AuthGuard]
      },
      { path: 'service',
        loadComponent: () => import('./demo/service/service.component').then(m => m.ServiceComponent), canActivate: [AuthGuard]
      },
      { path: 'entreePiece',
        loadComponent: () => import('./demo/entree-piece/entree-piece.component').then(m => m.EntreePieceComponent), canActivate: [AuthGuard]
      },
      { path: 'stockPiece',
        loadComponent: () => import('./demo/stock-piece/stock-piece.component').then(m => m.StockPieceComponent), canActivate: [AuthGuard]
      },
      { path: 'detailEntreePiece/:idEntreePiece',
        loadComponent: () => import('./demo/detail-entree-piece/detail-entree-piece.component').then(m => m.DetailEntreePieceComponent), canActivate: [AuthGuard]
      },
      { path: 'sortiePiece',
        loadComponent: () => import('./demo/sortie-piece/sortie-piece.component').then(m => m.SortiePieceComponent), canActivate: [AuthGuard]
      },
      { path: 'categorieService',
        loadComponent: () => import('./demo/categorie-service/categorie-service.component').then(m => m.CategorieServiceComponent), canActivate: [AuthGuard]
      },
      { path: 'role',
        loadComponent: () => import('./demo/role/role.component').then(m => m.RoleComponent), canActivate: [AuthGuard]
      },
      { path: 'specialite',
        loadComponent: () => import('./demo/specialite/specialite.component').then(m => m.SpecialiteComponent), canActivate: [AuthGuard]
      },
      {
        path: 'modele',
        loadComponent: () => import('./demo/modele-voiture/modele-voiture.component').then(m => m.ModeleVoitureComponent), canActivate: [AuthGuard]
      },
      {
        path: 'modePaiement',
        loadComponent: () => import('./demo/mode-paiement/mode-paiement.component').then(m => m.ModePaiementComponent), canActivate: [AuthGuard]
      },
      {
        path: 'demandeDevis',
        loadComponent: () => import('./demo/liste-demande-devis/liste-demande-devis.component').then(m => m.ListeDemandeDevisComponent), canActivate: [AuthGuard]
      },
      {
        path: 'detailDemandeDevis/:idDemandeDevis',
        loadComponent: () => import('./demo/details-demande-devis/details-demande-devis.component').then(m => m.DetailsDemandeDevisComponent), canActivate: [AuthGuard]
      },
      {
        path: 'planningMecanicien',
        loadComponent: () => import('./demo/Mecanicien/planning/planning.component').then(m => m.PlanningComponent), canActivate: [AuthGuard]
      },
      {
        path: 'calendrierMecanicien',
        loadComponent: () => import('./demo/Mecanicien/calendrier/calendrier.component').then(m => m.CalendrierComponent), canActivate: [AuthGuard]
      },
      { path: 'employe',
        loadComponent: () => import('./demo/employe/employe.component').then(m => m.EmployeComponent), canActivate: [AuthGuard]
      },
      { path: 'employe/:id',
        loadComponent: () => import('./demo/employe-details/employe-details.component').then(m => m.EmployeDetailsComponent), canActivate: [AuthGuard]
      },
      { path: 'historiquePrixService',
        loadComponent: () => import('./demo/historique-prix-service/historique-prix-service.component').then(m => m.HistoriquePrixServiceComponent), canActivate: [AuthGuard]
      },
      { path: 'specialiteServiceListe',
        loadComponent: () => import('./demo/specialite-service-liste/specialite-service-liste.component').then(m => m.SpecialiteServiceListeComponent), canActivate: [AuthGuard]
      },
      { path: 'specialiteServiceAjout',
        loadComponent: () => import('./demo/specialite-service-ajout/specialite-service-ajout.component').then(m => m.SpecialiteServiceAjoutComponent), canActivate: [AuthGuard]
      },
      { path: 'specialiteEmployeAjout',
        loadComponent: () => import('./demo/specialite-employe-ajout/specialite-employe-ajout.component').then(m => m.SpecialiteEmployeAjoutComponent), canActivate: [AuthGuard]
      },
      { path: 'specialiteEmployeListe',
        loadComponent: () => import('./demo/specialite-employe-liste/specialite-employe-liste.component').then(m => m.SpecialiteEmployeListeComponent), canActivate: [AuthGuard]
      },
      { path: 'validationDevis/:idDemandeDevis',
        loadComponent: () => import('./demo/validation-devis/validation-devis.component').then(m => m.ValidationDevisComponent), canActivate: [AuthGuard]
      },
      { path: 'historiqueTache',
        loadComponent: () => import('./demo/Mecanicien/historique-tache/historique-tache.component').then(m => m.HistoriqueTacheComponent), canActivate: [AuthGuard]
      },
    ]
  },
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'guest',
        loadChildren: () => import('./demo/pages/authentication/authentication.module').then((m) => m.AuthenticationModule)
      }
    ]
  },
  {
    path: '',
    children: [
      { path: 'love', loadComponent: () => import('./demo/test/test.component').then(m => m.TestComponent), canActivate: [AuthGuard] },
      { path: 'logoutClient', loadComponent: () => import('./demo/logout-client/logout-client.component').then(m => m.LogoutClientComponent), canActivate: [AuthGuard] }
    ]
  },
  {
    path: 'loginClient', // 🚨 Seule route accessible sans connexion
    loadComponent: () => import('./demo/login-client/login-client.component').then(m => m.LoginClientComponent)
  },
  {
    path: '',
    children: [
      {
        path: 'accueilClient',
        loadComponent: () => import('./demo/client/acceuil/acceuil.component').then(m => m.AcceuilComponent)
      }

    ]
  },
  {
    path: '',
    children: [
      {
        path: 'profilClient',
        loadComponent: () => import('./demo/client/profil/profil.component').then(m => m.ProfilComponent)
      }

    ]
  },
  {
    path: '',
    children: [
      {
        path: 'choixLogin',
        loadComponent: () => import('./demo/choix-login/choix-login.component').then(m => m.ChoixLoginComponent),
        // canActivate: [AuthGuard]
      }

    ]
  },
  {
    path: '',
    children: [
      {
        path: 'loginManager',
        loadComponent: () => import('./demo/login/login-manager/login-manager.component').then(m => m.LoginManagerComponent),
        // canActivate: [AuthGuard]
      }

    ]
  },
  {
    path: '',
    children: [
      {
        path: 'loginMecanicien',
        loadComponent: () => import('./demo/login/login-mecanicien/login-mecanicien.component').then(m => m.LoginMecanicienComponent),
        // canActivate: [AuthGuard]
      }

    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule],
  exports: [RouterModule],

})
export class AppRoutingModule { }
