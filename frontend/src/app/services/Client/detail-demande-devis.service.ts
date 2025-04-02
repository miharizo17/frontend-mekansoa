import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetailDemandeDevisService {

  private apiUrl = `${environment.apiUrl}/detailDemandeDevis`;
  private apiUrlDetailDemandeDevisById = `${environment.apiUrl}/detailDemandeDevis/getDetailServiceDemandeDevisById`;
  private apiUrlDetaiPieceDemandeDevisById = `${environment.apiUrl}/detailDemandeDevis/getDetailPieceDemandeDevisById`;
  private headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
  constructor(private http: HttpClient) { }

  getDetailsDemandeDevis(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.headers });
  }

  addDetailsDemandeDevis(idDemandeDevis: string, details: any): Observable<any> {
    const body = { idDemandeDevis, details};
    return this.http.post(this.apiUrl, body, { headers: this.headers });
  }

  getDetailDemandeDevisById(idDemandeDevis: string): Observable<any> {
    return this.http.get(`${this.apiUrlDetailDemandeDevisById}/${idDemandeDevis}`, { headers: this.headers });
  }

  getDetailPieceDemandeDevisById(idDemandeDevis: string): Observable<any> {
    console.log(`${this.apiUrlDetaiPieceDemandeDevisById}/${idDemandeDevis}`);
    return this.http.get(`${this.apiUrlDetaiPieceDemandeDevisById}/${idDemandeDevis}`, { headers: this.headers });
  }
}
