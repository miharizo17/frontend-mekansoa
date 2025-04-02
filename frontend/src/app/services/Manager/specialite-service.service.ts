import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpecialiteServiceService {

  private apiUrl = `${environment.apiUrl}/specialiteService`;
  private headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);

  constructor(private http: HttpClient) { }

  // Liste by idService (Liste)
  getSpecialitesByIdService(idService: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${idService}`,{ headers: this.headers });
  }

  // Liste
  getAllSpecialiteService(): Observable<any>{
    return this.http.get(this.apiUrl,{ headers: this.headers });
  }

  // ajout
  addSpecialiteService(specialiteService: any): Observable<any>{
    return this.http.post(this.apiUrl, specialiteService,{ headers: this.headers });
  }

  // Delete by id de la table
  deleteSpecialiteService(id: string): Observable<any>{
    console.log("id specialiteService a supprimer :", id);
    return this.http.delete(`${this.apiUrl}/${id}`,{ headers: this.headers });
  }

  // Update
  updateSpecialiteService(specialiteService: any): Observable<any>{
    return this.http.put(`${this.apiUrl}/${specialiteService._id}`, specialiteService,{ headers: this.headers });
  }

  private apiUrlByService = `${environment.apiUrl}/specialiteService/getSpecialiteByService`;
  getSpecialiteByService(services: any[]): Observable<any> {
    const body = { services};
    return this.http.post(this.apiUrlByService, body);
  }
}
