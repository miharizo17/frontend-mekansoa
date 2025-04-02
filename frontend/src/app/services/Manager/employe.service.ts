import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {

  private apiUrl = `${environment.apiUrl}/employe`;
  private apiUrlRoles = `${environment.apiUrl}/role`;
  constructor(private http: HttpClient) { }
  private token: string | null = localStorage.getItem('token');

  private headers = new HttpHeaders({
    Authorization: `Bearer ${this.token}`
  });

  // Liste
  getEmploye(): Observable<any> {
    console.log(this.apiUrl);
    console.log("hiiiiiiiii ",this.headers);
    return this.http.get(this.apiUrl,{ headers: this.headers });
  }

  // Create
  addEmploye(employe : any): Observable<any> {
    return this.http.post(this.apiUrl, employe, { headers: this.headers });
  }

  // Update
  updateEmploye(employe: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${employe._id}`, employe, { headers: this.headers });
  }

  // get by id
  getEmployeById(id : string): Observable<any>{
    return this.http.get(`${this.apiUrl}/${id}`, { headers: this.headers });
  }

  // GetRoles pour liste et liste déroulante
  getRoles(): Observable<any>{
    return this.http.get(this.apiUrlRoles, { headers: this.headers });
  }

}
