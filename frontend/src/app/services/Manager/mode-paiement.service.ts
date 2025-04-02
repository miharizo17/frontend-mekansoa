import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModePaiementService {
   private apiUrl = `${environment.apiUrl}/modePaiement`;

   private headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);

  constructor(private http: HttpClient) { }

   getModePaiement(): Observable<any> {
      return this.http.get(this.apiUrl,{ headers: this.headers });
    }

    addModePaiement(nomMode: string): Observable<any> {
      const body ={ nomMode};
      return this.http.post(this.apiUrl, body,{ headers: this.headers });
    }
}
