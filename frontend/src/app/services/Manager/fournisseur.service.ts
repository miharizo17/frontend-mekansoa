
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {

  private apiUrlPays = `${environment.apiUrl}/pays/search`;
  private apiUrl = `${environment.apiUrl}/fournisseur`;

  private headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);

  constructor(private http: HttpClient) { }


  searchPays(query: string): Observable<any> {
    return this.http.get(`${this.apiUrlPays}?q=${query}`,{ headers: this.headers });
  }

  addFournisseur(nom: string, siteweb: string, adresse: string, pays: string, telephone: string, mail: string, etat: string): Observable<any> {
    const body = { nom, siteweb, adresse, pays, telephone, mail, etat };
    return this.http.post(this.apiUrl, body,{ headers: this.headers });
  }

  getFournisseur(): Observable<any> {
    return this.http.get(this.apiUrl,{ headers: this.headers });
  }

  updateFournisseur(id: string,nom: string, siteweb: string, adresse: string, telephone: string, mail: string): Observable<any> {
    const body = { nom, siteweb, adresse, telephone, mail };
    return this.http.put(`${this.apiUrl}/${id}`, body,{ headers: this.headers });
  }


}
