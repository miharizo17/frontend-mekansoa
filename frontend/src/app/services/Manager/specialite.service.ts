import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpecialiteService {

  private apiUrl = `${environment.apiUrl}/specialite`;
  private headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);

  constructor(private http: HttpClient) { }

  // Liste
  getSpecialite(): Observable<any> {
    console.log(this.apiUrl);
    return this.http.get(this.apiUrl, { headers: this.headers });
  }

  // Create
  addSpecialite(nomSpecialite: string): Observable<any> {
    const body ={ nomSpecialite};
    return this.http.post(this.apiUrl, body, { headers: this.headers });
  }

  // Update
  updateSpecialite(id: string, nomSpecialite: string): Observable<any> {
    const body = {nomSpecialite};
    console.log(`${this.apiUrl}/${id}`);
    return this.http.put(`${this.apiUrl}/${id}`, body, { headers: this.headers });
  }

  // Delete
  deleteSpecialite(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.headers });
  }
}
