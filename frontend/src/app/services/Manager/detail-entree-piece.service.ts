import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DetailEntreePieceService {

  private apiUrlEntreePiece = `${environment.apiUrl}/entreePiece/entreePieceById`;
  private apiUrlDetailEntreePiece = `${environment.apiUrl}/detailEntreePiece/detailEntreePieceByPiece`;
  private headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);

  constructor(private http: HttpClient) { }

  getEntreePieceById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrlEntreePiece}/${id}`,{ headers: this.headers });
  }

  getDetailEntreePieceByPiece(idEntreePiece: string): Observable<any> {
    return this.http.get(`${this.apiUrlDetailEntreePiece}/${idEntreePiece}`,{ headers: this.headers });
  }

}
