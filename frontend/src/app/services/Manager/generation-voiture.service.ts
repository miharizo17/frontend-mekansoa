import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenerationVoitureService {

  private apiUrl = `${environment.apiUrl}/generationVoiture`;
  private apiUrlSearch = `${environment.apiUrl}/generationVoiture/chercheGenerationVoiture`;
  private apiUrlById = `${environment.apiUrl}/generationVoiture/getGenerationById`;

  private headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
  
  constructor(private http: HttpClient) { }

  // Liste
  getGeneration(): Observable<any> {
    console.log(this.apiUrl);
    return this.http.get(this.apiUrl,{ headers: this.headers });
  }

  // Create
  addGeneration(generation: string, note: string): Observable<any> {
    const body ={ generation,note};
    return this.http.post(this.apiUrl, body,{ headers: this.headers });
  }

  // Update
  updateGeneration(id: string, generation: string, note: string): Observable<any> {
    const body = {generation, note};
    console.log(`${this.apiUrl}/${id}`);
    return this.http.put(`${this.apiUrl}/${id}`, body,{ headers: this.headers });
  }

  // Delete
  deleteGeneration(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`,{ headers: this.headers });
  }

  searchGeneration(query: string): Observable<any> {
    return this.http.get(`${this.apiUrlSearch}?q=${query}`,{ headers: this.headers });
  }

  getGenerationById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrlById}/${id}`,{ headers: this.headers });
  }
}
