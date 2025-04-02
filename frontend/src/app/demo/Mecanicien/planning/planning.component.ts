import { Component } from '@angular/core';
import { CardComponent } from "../../../theme/shared/components/card/card.component";
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-planning',
  imports: [CardComponent,
    MatIconModule
  ],
  templateUrl: './planning.component.html',
  styleUrl: './planning.component.scss'
})
export class PlanningComponent {

}
