import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlanningEmployeService {
 private apiUrl = `${environment.apiUrl}/planningEmploye/listePlaningSuperieurDate`;
 constructor(private http: HttpClient) { }

 listePlaningSuperieurDate(date: string, listeEmploye: any): Observable<any> {
  const body = { date , listeEmploye}
  return this.http.post(this.apiUrl, body);
}

}
