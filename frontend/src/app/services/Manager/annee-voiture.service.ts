import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnneeVoitureService {

  private apiUrl = `${environment.apiUrl}/anneeVoiture`;
  private apiUrlSearch = `${environment.apiUrl}/anneeVoiture/chercheAnneeVoiture`;
  private apiUrlById = `${environment.apiUrl}/anneeVoiture/getAnneeById`;

  private headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);

  constructor(private http: HttpClient) {}

  // Liste des années
  getAnnee(): Observable<any> {
    console.log("Headers : ", this.headers);
    return this.http.get(this.apiUrl,{   headers: this.headers, observe: 'response' });
  }

  // Créer une nouvelle année
  addAnnee(annee: string, note: string): Observable<any> {
    const body = { annee, note };
    return this.http.post(this.apiUrl, body,{   headers: this.headers, observe: 'response' });
  }

  // Mettre à jour une année
  updateAnnee(id: string, annee: string, note: string): Observable<any> {
    const body = { annee, note };
    return this.http.put(`${this.apiUrl}/${id}`, body,{   headers: this.headers, observe: 'response' });
  }

  // Supprimer une année
  deleteAnnee(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`,{   headers: this.headers, observe: 'response' });
  }

  // Recherche d'une année
  searchAnnee(query: string): Observable<any> {
    return this.http.get(`${this.apiUrlSearch}?q=${query}`,{   headers: this.headers, observe: 'response' });
  }

  // Récupérer une année par ID
  getAnneeById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrlById}/${id}`,{   headers: this.headers, observe: 'response' });
  }
}
