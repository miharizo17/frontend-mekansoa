import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DemandeDevisService {

  private apiUrl = `${environment.apiUrl}/demandeDevis`;
  private apiUrlDemandeDevisById = `${environment.apiUrl}/demandeDevis/getDemandeDevisById`;
  private apiUrlPieceDemandeDevisById = `${environment.apiUrl}/demandeDevis/ajoutPieceDemandeDevis`;
  private apiUrlEnvoieMail = `${environment.apiUrl}/demandeDevis/envoieDemandeDevis`;
  private headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
  private apiUrlFiltre = `${environment.apiUrl}/demandeDevis/filtreDemandeDevis`;
  constructor(private http: HttpClient) { }

  getDemandeDevis(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.headers });
  }

  addDemandeDevis(dateDemandeDevis: string, idVoitureClient: string, details: any, isDomicile: number): Observable<any> {
    const body = { dateDemandeDevis, idVoitureClient,details,isDomicile};
    return this.http.post(this.apiUrl, body, { headers: this.headers });
  }

  getDemandeDevisById(idDemande: string): Observable<any> {
    return this.http.get(`${this.apiUrlDemandeDevisById}/${idDemande}`, { headers: this.headers });
  }

  ajoutPieceDemandeDevis(heureFini: string, minuteFini: string, idDemandeDevis: string,details: any, noteVoiture: number, services: any, frais: number, prixServiceSurPlus: any): Observable<any> {
    const body = { heureFini, minuteFini,idDemandeDevis,details,noteVoiture,services,frais,prixServiceSurPlus};
    return this.http.post(this.apiUrlPieceDemandeDevisById, body, { headers: this.headers });
  }

  envoieMail(body: FormData): Observable<any> {
    return this.http.post(this.apiUrlEnvoieMail, body, { headers: this.headers });
  }

  filtreDemande(dateDebut: any, dateFin: any, numeroDev: any): Observable<any> {
    const body = {dateDebut,dateFin, numeroDev};
    return this.http.post(this.apiUrlFiltre, body);
  }
}
