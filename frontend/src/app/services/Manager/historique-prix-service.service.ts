import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistoriquePrixServiceService {

  private apiUrl = `${environment.apiUrl}/historiquePrixService`;
  private headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);

  constructor(private http: HttpClient) { }

  // Liste
  getHistoriquePrixService(): Observable<any> {
    console.log(this.apiUrl);
    console.log("Liste avy any am service :", this.http.get(this.apiUrl));
    return this.http.get(this.apiUrl,{ headers: this.headers });
  }

  // Update
  updateHistoriquePrixServiceService(id: string, historique: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, historique,{ headers: this.headers });
  }
  // Create
  addHistoriquePrixService(historique : any): Observable<any> {
    return this.http.post(this.apiUrl, historique,{ headers: this.headers });
  }

}
