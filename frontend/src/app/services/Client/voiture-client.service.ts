import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VoitureClientService {

  private apiUrl = `${environment.apiUrl}/voitureClient`;
  private apiUrlVoitureByClient = `${environment.apiUrl}/voitureClient/getVoitureClientById`;
  private headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
  constructor(private http: HttpClient) { }

  getVoitureClient(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.headers });
  }

  addVoitureClient(idClient: string, idAnnee: string, idGeneration:string, idMarque:string,idModele: string,numeroService:string): Observable<any> {
    const body = { idClient, idAnnee, idGeneration, idMarque, idModele, numeroService };
    return this.http.post(this.apiUrl, body, { headers: this.headers });
  }

  getVoitureByClient(idClient: string): Observable<any> {
    return this.http.get(`${this.apiUrlVoitureByClient}/${idClient}`, { headers: this.headers });
  }
}
