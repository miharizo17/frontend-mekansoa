import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginClientService{

  private apiUrl = `${environment.apiUrl}/client`;


  constructor(private http: HttpClient, private router : Router) {}

  // Login
  login(email: string, mdp: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, mdp });
  }

  // Vérifier le token
  checkToken(tokenClient: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/checkToken`, { params: { tokenClient } });
  }

  // Déconnexion
  logout(tokenClient: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/logout`, { params: { tokenClient } });
  }

  // Récupérer les tokens valides
  getValidTokens(idClient: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/validTokens`, { params: { idClient } });
  }

  // Mettre invalide les anciens tokens
  unvalidOldToken(idClient: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/unvalidOldToken`, { idClient });
  }

  // Get idclient by token
  getIdClientByToken(tokenClient: String): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${tokenClient}`);
  }

  verifyToken(): Observable<number> {
    const token = localStorage.getItem('token');
    if (!token) {
      return throwError(() => new Error('Aucun token disponible.'));
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(this.apiUrl, { headers, observe: 'response' }).pipe(
      map(response => {
        console.log("Headers de la réponse:", response.headers.keys()); // Debug: voir tous les headers
        const connecteHeader = response.headers.get('X-Connecte');
        console.log('X-Connecte Header:', connecteHeader);

        return connecteHeader !== null ? parseInt(connecteHeader, 10) : 1;
      }),
      catchError((error) => {
        console.error('Erreur de vérification du token:', error);
        localStorage.removeItem('token');
        this.router.navigate(['/loginClient']);
        return of(1);
      })
    );
  }


}
