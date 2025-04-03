import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlanningEmployeService {
  private apiUrl = `${environment.apiUrl}/planningEmploye/listePlaningSuperieurDate`;
  private apiUrlAjout = `${environment.apiUrl}/planningEmploye/assignementPlanning`;
  private apiUrlPlanningByEmploye = `${environment.apiUrl}/planningEmploye/listePlanningByEmploye`;
  private apiUrlPlanningGeneral = `${environment.apiUrl}/planningEmploye/listePlanningGeneral`;
  private apiUrlUpdateEtatEnCours = `${environment.apiUrl}/planningEmploye/updateEtatEnCoursPlanningEmploye`;
  private apiUrlUpdateEtatTerminer = `${environment.apiUrl}/planningEmploye/updateEtatTerminerPlanningEmploye`;
  private apiUrlEmployeByDemande = `${environment.apiUrl}/planningEmploye/listeEmployeByDemande`;
  constructor(private http: HttpClient) { }

  listePlaningSuperieurDate(date: string, listeEmploye: any): Observable<any> {
    const body = { date, listeEmploye }
    return this.http.post(this.apiUrl, body);
  }

  ajoutPlanningEmploye(dateDebut: string, deadline: string, idDevis: string, idEmploye: any): Observable<any> {
    const body = { dateDebut, deadline, idDevis,idEmploye }
    return this.http.post(this.apiUrlAjout, body);
  }

  listePlaningByEmploye(etat: string, idEmploye: string): Observable<any> {
    const body = { etat, idEmploye }
    console.log("body ",body)
    return this.http.post(this.apiUrlPlanningByEmploye, body);
  }

  listePlaningGeneral(etat: string): Observable<any> {
    const body = { etat }
    return this.http.post(this.apiUrlPlanningGeneral, body);
  }

  updateEtatEnCoursPlanningEmploye(etat: string,idPlanning: string): Observable<any> {
    const body = { etat,idPlanning }
    return this.http.post(this.apiUrlUpdateEtatEnCours, body);
  }

  updateEtatTerminerPlanningEmploye(etat: string,idPlanning: string): Observable<any> {
    const body = { etat,idPlanning }
    return this.http.post(this.apiUrlUpdateEtatTerminer, body);
  }

  listeEmployeByDemande(idDemande: string): Observable<any> {
    const body = { idDemande }
    return this.http.post(this.apiUrlEmployeByDemande, body);
  }




}
