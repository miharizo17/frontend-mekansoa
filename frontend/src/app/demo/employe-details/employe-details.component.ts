import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeService } from 'src/app/services/Manager/employe.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import { EmployeDetailsService } from 'src/app/services/Manager/employe-details.service';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employe-details',
  imports: [
      HttpClientModule,
      FormsModule,
      CommonModule,
      MatAutocompleteModule,
      MatInputModule,
      MatFormFieldModule,
      RouterModule],
      templateUrl: './employe-details.component.html',
      styleUrl: './employe-details.component.scss',
      providers: [EmployeDetailsService, EmployeService]
})
export class EmployeDetailsComponent implements OnInit {
  employe: any = {};

  constructor(private route: ActivatedRoute, private employeService: EmployeService) {}

  ngOnInit(): void {
    this.getEmployeDetails();
  }

  getEmployeDetails() {
    const id = this.route.snapshot.paramMap.get('id'); // Récupère l'ID dans l'URL
    if (id) {
      this.employeService.getEmployeById(id).subscribe(
        (data) => {
          this.employe = data;
        },
        (error) => {
          console.error("Erreur lors de la récupération des détails :", error);
        }
      );
    }
  }
}
