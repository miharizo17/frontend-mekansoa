import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModePaiementService } from 'src/app/services/Manager/mode-paiement.service';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';

@Component({
  selector: 'app-mode-paiement',
  imports: [CardComponent,
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  templateUrl: './mode-paiement.component.html',
  styleUrl: './mode-paiement.component.scss',
  providers: [ModePaiementService]
})
export class ModePaiementComponent {
  constructor(private modePaiement: ModePaiementService) { }
  modes: any[] = [];
  mode = { nomMode: '' };
  ngOnInit(): void {
    this.loadModePaiement();
  }

  loadModePaiement(): void {
    this.modePaiement.getModePaiement().subscribe(data => this.modes = data);
  }

  addModePaiment(): void {
    this.modePaiement.addModePaiement(this.mode.nomMode).subscribe(() => {
      this.loadModePaiement();
      this.mode = { nomMode: '' };

    });
  }

}
