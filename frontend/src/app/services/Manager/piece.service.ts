import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PieceService {
  private apiUrl = `${environment.apiUrl}/pieces`;
  private headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);

  constructor(private http: HttpClient) { }

  getPiece(): Observable<any> {
    return this.http.get(this.apiUrl,{ headers: this.headers });
  }

  addPiece(nomPiece: string, referencePiece: string, typePiece: string): Observable<any> {
    const body = { nomPiece, referencePiece, typePiece };
    return this.http.post(this.apiUrl, body,{ headers: this.headers });
  }


  updatePiece(id: string,nomPiece: string, referencePiece: string, typePiece: string): Observable<any> {
    const body = { nomPiece, referencePiece, typePiece };
    return this.http.put(`${this.apiUrl}/${id}`, body,{ headers: this.headers });
  }

}
