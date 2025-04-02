import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SortiePieceService {

  private apiUrl = `${environment.apiUrl}/sortiePiece`;
  private apiUrlSommeSortie = `${environment.apiUrl}/sortiePiece/totalSortie`;
  private apiUrdetailSortiePiece = `${environment.apiUrl}/detailSortiePiece/detailSortiePieceByPiece`;
  private headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);

  constructor(private http: HttpClient) { }


    addSortiePiece( dateSortie: string, idDevis: string,idModePaiement: string, details: any): Observable<any> {
      const body = { dateSortie, idDevis,idModePaiement, details };
      return this.http.post(this.apiUrl, body,{ headers: this.headers });
    }

    getSortiePiece(): Observable<any> {
      return this.http.get(this.apiUrl,{ headers: this.headers });
    }

    prixTotalByIdSortie(idSortiePiece: string): Observable<any> {
      return this.http.get(`${this.apiUrlSommeSortie}/${idSortiePiece}`,{ headers: this.headers });
    }

    getDetailSortiePieceByPiece(idSortiePiece: string): Observable<any> {
      return this.http.get(`${this.apiUrdetailSortiePiece}/${idSortiePiece}`,{ headers: this.headers });
    }


}
