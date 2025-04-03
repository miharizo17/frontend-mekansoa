import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FactureService {
  private apiUrl = `${environment.apiUrl}/facture`;
  private apiUrlListe = `${environment.apiUrl}/facture/listeFacture`;
  private apiUrlModePaiement = `${environment.apiUrl}/modePaiement`;
  constructor(private http: HttpClient) { }

  getFactureDemande(idDemandeDevis: string): Observable<any> {
    const body = { idDemandeDevis };
    return this.http.post(this.apiUrlListe, body);
  }

  addFactureDemande(dateFacturation: string, idDemandeDevis: string, idModePaiement: string): Observable<any> {
    const body = { dateFacturation, idDemandeDevis, idModePaiement };
    return this.http.post(this.apiUrl, body);
  }

  getModePaiement(): Observable<any> {
    return this.http.get(this.apiUrlModePaiement);
  }



}
