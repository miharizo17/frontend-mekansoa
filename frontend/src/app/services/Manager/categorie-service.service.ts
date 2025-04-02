import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategorieServiceService {

  private apiUrl = `${environment.apiUrl}/categorieService`;

  private headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);

  constructor(private http: HttpClient) { }

  // Liste
  getCategorieService(): Observable<any> {
    console.log(this.apiUrl);
    return this.http.get(this.apiUrl, { headers: this.headers });
  }

  // Create
  addCategorieService(categorie: FormData): Observable<any> {
    return this.http.post(this.apiUrl, categorie,{ headers: this.headers });
  }

  // Update
  updateCategorieService(id: string, categorie: string): Observable<any> {
    console.log('bonjour');
    return this.http.put(`${this.apiUrl}/${id}`, categorie, { headers: this.headers });
  }

  // Delete
  deleteCategorieService(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.headers });
  }

  // Get by id
  getCategorieServiceById(id:string): Observable<any>{
    return this.http.get(this.apiUrl, { headers: this.headers });
  }

}
