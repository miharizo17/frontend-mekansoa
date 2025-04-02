// Angular import
import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';

// project import
import { NavigationItem } from '../../navigation';

@Component({
  selector: 'app-nav-group',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-group.component.html',
  styleUrl: './nav-group.component.scss'
})
export class NavGroupComponent implements OnInit {
  private location = inject(Location);

  // public props
  @Input() item!: NavigationItem;

  current_url!: string;

  // Life cycle events
  ngOnInit() {
    this.current_url = this.location.path();
    //eslint-disable-next-line
    //@ts-ignore
    const baseHref = this.location['_baseHref'] || '';
    this.current_url = baseHref + this.current_url;

    // Use a more reliable way to find and update the active group
    setTimeout(() => {
      const links = document.querySelectorAll('a.nav-link') as NodeListOf<HTMLAnchorElement>;
      links.forEach((link: HTMLAnchorElement) => {
        if (link.getAttribute('href') === this.current_url) {
          let parent = link.parentElement;
          while (parent && parent.classList) {
            if (parent.classList.contains('coded-hasmenu')) {
              parent.classList.add('coded-trigger');
              parent.classList.add('active');
            }
            parent = parent.parentElement;
          }
        }
      });
    }, 0);
  }

  isMenuOpen = false;
  isMenuOpenClient = false;
  isMenuOpenFournisseur = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleMenuClient() {
    this.isMenuOpenClient = !this.isMenuOpenClient;
  }

  toggleMenuMecanicien() {
    this.isMenuOpenFournisseur = !this.isMenuOpenFournisseur;
  }

  handleClick(option: string) {
    console.log('Vous avez cliqué sur :', option);
    // Tu peux rediriger ou exécuter une action selon l'option choisie
  }
}
