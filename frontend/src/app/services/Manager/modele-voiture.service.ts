import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModeleVoitureService {

  private apiUrl = `${environment.apiUrl}/modeleVoiture`;
  private apiUrlSearch = `${environment.apiUrl}/modeleVoiture/chercheModeleVoiture`;
  private apiUrlById = `${environment.apiUrl}/modeleVoiture/getModeleId`;
  private headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);

  constructor(private http: HttpClient) { }

   getModele(): Observable<any> {
      console.log(this.apiUrl);
      return this.http.get(this.apiUrl,{ headers: this.headers });
    }

    // Create
    addModele(modele: string, note: string): Observable<any> {
      const body ={ modele,note};
      return this.http.post(this.apiUrl, body,{ headers: this.headers });
    }

    // Update
    updateModele(id: string, modele: string, note: string): Observable<any> {
      const body = {modele, note};
      return this.http.put(`${this.apiUrl}/${id}`, body,{ headers: this.headers });
    }

    // Delete
    deleteModele(id: string): Observable<any> {
      return this.http.delete(`${this.apiUrl}/${id}`,{ headers: this.headers });
    }

    searchModele(query: string): Observable<any> {
      return this.http.get(`${this.apiUrlSearch}?q=${query}`,{ headers: this.headers });
    }

    getModeleById(id: string): Observable<any> {
      return this.http.get(`${this.apiUrlById}/${id}`,{ headers: this.headers });
    }
}
