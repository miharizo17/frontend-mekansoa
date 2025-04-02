import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EntreePieceService {
  private apiUrl = `${environment.apiUrl}/entreePiece`;
  private apiUrlFournisseur = `${environment.apiUrl}/fournisseur/chercheFournisseur`;
  private apiUrlPiece = `${environment.apiUrl}/pieces/cherchePiece`;

  private headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);

  constructor(private http: HttpClient) { }

  getEntreePiece(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addEntreePiece(dateEntree: string, idFournisseur: string, numeroBl: string, commentaire: string, details: any): Observable<any> {
    const body = { dateEntree, idFournisseur, numeroBl,commentaire,details };
    return this.http.post(this.apiUrl, body,{ headers: this.headers });
  }

  updateEntreePiece(id: string,dateEntree: string, idFournisseur: string, numeroBl: string): Observable<any> {
    const body =  { dateEntree, idFournisseur, numeroBl };
    return this.http.put(`${this.apiUrl}/${id}`, body,{ headers: this.headers });
  }

  searchFournisseur(query: string): Observable<any> {
    return this.http.get(`${this.apiUrlFournisseur}?q=${query}`,{ headers: this.headers });
  }

  searchPiece(query: string): Observable<any> {
    return this.http.get(`${this.apiUrlPiece}?q=${query}`,{ headers: this.headers });
  }
}
