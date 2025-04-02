import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private apiUrl = `${environment.apiUrl}/role`;
  private headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);

  constructor(private http: HttpClient) { }

  // Liste
  getRole(): Observable<any> {
    console.log(this.apiUrl);
    return this.http.get(this.apiUrl,{ headers: this.headers });
  }

  // Create
  addRole(nomRole: string): Observable<any> {
    const body ={ nomRole};
    return this.http.post(this.apiUrl, body,{ headers: this.headers });
  }

  // Update
  updateRole(id: string, nomRole: string): Observable<any> {
    const body = {nomRole};
    console.log(`${this.apiUrl}/${id}`);
    return this.http.put(`${this.apiUrl}/${id}`, body,{ headers: this.headers });
  }

  // Delete
  deleteRole(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`,{ headers: this.headers });
  }
}
