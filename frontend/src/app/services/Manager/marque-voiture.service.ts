import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarqueVoitureService {

  private apiUrl = `${environment.apiUrl}/marqueVoiture`;
  private apiUrlSearch = `${environment.apiUrl}/marqueVoiture/chercheMarqueVoiture`;
  private apiUrlById = `${environment.apiUrl}/marqueVoiture/getMarqueId`;
  private headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);

  constructor(private http: HttpClient) { }

  getMarque(): Observable<any> {
    console.log(this.apiUrl);
    return this.http.get(this.apiUrl,{ headers: this.headers });
  }



  addMarque(marque: string, note: string): Observable<any> {
    const body ={ marque,note};
    return this.http.post(this.apiUrl, body,{ headers: this.headers });
  }

  updateMarque(id: string,marque: string, note: string): Observable<any> {
    const body ={marque, note};
    return this.http.put(`${this.apiUrl}/${id}`, body,{ headers: this.headers });
  }

  deleteMarque(id: string): Observable<any> {
    console.log(`${this.apiUrl}/${id}`);
    return this.http.delete(`${this.apiUrl}/${id}`,{ headers: this.headers });
  }


  searchMarque(query: string): Observable<any> {
    return this.http.get(`${this.apiUrlSearch}?q=${query}`,{ headers: this.headers });
  }

  getMarqueById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrlById}/${id}`,{ headers: this.headers });
  }
}
