import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpecialiteEmployeService {

  private apiUrl = `${environment.apiUrl}/specialiteEmploye`;
  private headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);

  constructor(private http: HttpClient) { }

  // Liste by idEmploye (Liste)
  getSpecialitesByidEmploye(idEmploye: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${idEmploye}`,{ headers: this.headers });
  }

  // Liste
  getAllSpecialiteEmploye(): Observable<any>{
    return this.http.get(this.apiUrl,{ headers: this.headers });
  }

  // ajout
  addSpecialiteEmploye(specialiteEmploye: any): Observable<any>{
    return this.http.post(this.apiUrl, specialiteEmploye,{ headers: this.headers });
  }

  // Delete by id de la table
  deleteSpecialiteEmploye(id: string): Observable<any>{
    console.log("id specialiteEmploye a supprimer :", id);
    return this.http.delete(`${this.apiUrl}/${id}`,{ headers: this.headers });
  }

  // Update
  updateSpecialiteEmploye(specialiteEmploye: any): Observable<any>{
    return this.http.put(`${this.apiUrl}/${specialiteEmploye._id}`, specialiteEmploye);
  }


  private apiUrlBySpecialite = `${environment.apiUrl}/specialiteEmploye/getEmployeBySpecialite`;
  getEmployeBySpecialite(groupesServiceSpecialtite: any[]): Observable<any> {
    const body = { groupesServiceSpecialtite};
    return this.http.post(this.apiUrlBySpecialite, body);
  }
}
