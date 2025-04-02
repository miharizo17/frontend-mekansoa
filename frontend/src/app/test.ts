import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: '/default',
        pathMatch: 'full'
      },
      {
        path: 'default',
        loadComponent: () => import('./demo/dashboard/default/default.component').then((c) => c.DefaultComponent)
      },
      {
        path: 'typography',
        loadComponent: () => import('./demo/elements/typography/typography.component')
      },
      {
        path: 'color',
        loadComponent: () => import('./demo/elements/element-color/element-color.component')
      },
      {
        path: 'sample-page',
        loadComponent: () => import('./demo/other/sample-page/sample-page.component')
      },
      {
        path: 'marque',
        loadComponent: () => import('./demo/marque-voiture/marque-voiture.component').then(m => m.MarqueVoitureComponent)
      },
      {
        path: 'fournisseur',
        loadComponent: () => import('./demo/fournisseur/fournisseur.component').then(m => m.FournisseurComponent)
      },
      {
        path: 'piece',
        loadComponent: () => import('./demo/piece/piece.component').then(m => m.PieceComponent)
      },

      {
        path: 'annee',
        loadComponent: () => import('./demo/annee-voiture/annee-voiture.component').then(m => m.AnneeVoitureComponent)
      },

      {
        path: 'generation',
        loadComponent: () => import('./demo/generation-voiture/generation-voiture.component').then(m => m.GenerationVoitureComponent)
      },
      {
        path: 'service',
        loadComponent: () => import('./demo/service/service.component').then(m => m.ServiceComponent)
      },
      {
        path: 'entreePiece',
        loadComponent: () => import('./demo/entree-piece/entree-piece.component').then(m => m.EntreePieceComponent)
      },
      {
        path: 'stockPiece',
        loadComponent: () => import('./demo/stock-piece/stock-piece.component').then(m => m.StockPieceComponent)
      },
      {
        path: 'detailEntreePiece/:idEntreePiece',
        loadComponent: () => import('./demo/detail-entree-piece/detail-entree-piece.component').then(m => m.DetailEntreePieceComponent)
      },
      {
        path: 'sortiePiece',
        loadComponent: () => import('./demo/sortie-piece/sortie-piece.component').then(m => m.SortiePieceComponent)
      },

      {
        path: 'categorieService',
        loadComponent: () => import('./demo/categorie-service/categorie-service.component').then(m => m.CategorieServiceComponent)
      },
      {
        path: 'role',
        loadComponent: () => import('./demo/role/role.component').then(m => m.RoleComponent)
      },
      {
        path: 'specialite',
        loadComponent: () => import('./demo/specialite/specialite.component').then(m => m.SpecialiteComponent)
      },
      {
        path: 'modele',
        loadComponent: () => import('./demo/modele-voiture/modele-voiture.component').then(m => m.ModeleVoitureComponent)
      },
      {
        path: 'modePaiement',
        loadComponent: () => import('./demo/mode-paiement/mode-paiement.component').then(m => m.ModePaiementComponent)
      },
      {
        path: 'demandeDevis',
        loadComponent: () => import('./demo/liste-demande-devis/liste-demande-devis.component').then(m => m.ListeDemandeDevisComponent)
      },
      {
        path: 'detailDemandeDevis/:idDemandeDevis',
        loadComponent: () => import('./demo/details-demande-devis/details-demande-devis.component').then(m => m.DetailsDemandeDevisComponent)
      },
      {
        path: 'planningMecanicien',
        loadComponent: () => import('./demo/Mecanicien/planning/planning.component').then(m => m.PlanningComponent)
      },
      {
        path: 'calendrierMecanicien',
        loadComponent: () => import('./demo/Mecanicien/calendrier/calendrier.component').then(m => m.CalendrierComponent)
      }

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
      {
        path: 'love',
        loadComponent: () => import('./demo/test/test.component').then(m => m.TestComponent)
      }

    ]
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
