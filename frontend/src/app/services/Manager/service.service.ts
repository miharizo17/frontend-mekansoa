import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private apiUrl = `${environment.apiUrl}/service`;
  private apiUrlCategories = `${environment.apiUrl}/categorieService`;
  private headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);

  constructor(private http: HttpClient) { }

  // Liste
  getService(): Observable<any> {
    console.log(this.apiUrl);
    return this.http.get(this.apiUrl,{ headers: this.headers });
  }

  // Create
  addService(service: any): Observable<any> {
    return this.http.post(this.apiUrl, service,{ headers: this.headers });
  }

  // Update
  updateService(id: string, service: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, service,{ headers: this.headers });
  }

  // Delete
  deleteService(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`,{ headers: this.headers });
  }

  // GetCategories
  getCategories(): Observable<any>{
    return this.http.get(this.apiUrlCategories,{ headers: this.headers });
  }

  private apiUrlService = `${environment.apiUrl}/service/chercheService`;
  searchService(query: string): Observable<any> {
    return this.http.get(`${this.apiUrlService}?q=${query}`,{ headers: this.headers });
  }

  private apiUrlServiceDomicile = `${environment.apiUrl}/service/serviceADomicile`;
  // Liste a domicile
  getServiceDomicile(query: string): Observable<any> {
    console.log(`${this.apiUrlServiceDomicile}?q=${query}`);
    return this.http.get(`${this.apiUrlServiceDomicile}?q=${query}`,{ headers: this.headers });
  }

  private apiUrAlllServiceDomicile = `${environment.apiUrl}/service/getAllServiceADomicile`;
  // Liste a domicile
  getAllServiceDomicile(): Observable<any> {
    return this.http.get(`${this.apiUrAlllServiceDomicile}`,{ headers: this.headers });
  }
}
