import { Component, LOCALE_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SpinnerComponent } from './theme/shared/components/spinner/spinner.component';
import { HttpClientModule } from '@angular/common/http';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { MatIconModule } from '@angular/material/icon';
registerLocaleData(localeFr, 'fr-FR');
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterOutlet, SpinnerComponent,MatAutocompleteModule ,MatInputModule,MatFormFieldModule,HttpClientModule,BsDatepickerModule,MatIconModule ],
  providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }]
})
export class AppComponent {
  title = 'Garage';
}
