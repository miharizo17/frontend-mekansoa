import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginManagerService{

  private apiUrl = `${environment.apiUrl}/manager`;
  private apiUrlAuth = `${environment.apiUrl}/auth/checkTokenManager`;


  constructor(private http: HttpClient, private router : Router) {}

  // Login
  login(email: string, mdp: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, mdp });
  }

  // Vérifier le token
  checkToken(tokenManager: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/checkToken`, { params: { tokenManager } });
  }

  // Déconnexion
  logout(tokenManager: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/logout`, { params: { tokenManager } });
  }

  // Récupérer les tokens valides
  getValidTokens(idManager: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/validTokens`, { params: { idManager } });
  }

  // Mettre invalide les anciens tokens
  unvalidOldToken(idManager: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/unvalidOldToken`, { idManager });
  }

  // Get idManager by token
  getIdManagerByToken(tokenManager: String): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${tokenManager}`);
  }

  verifyToken(): Observable<number> {
    const token = localStorage.getItem('token');
    
    if (!token) {
        return of(1); 
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.get(this.apiUrlAuth, { headers, observe: 'response' }).pipe(
        map((response) => {
            console.log("Responseeeee :", response);
            return 0; 
        }),
        catchError((error: HttpErrorResponse) => {
            console.error('Erreur de vérification du token:', error);           
            localStorage.removeItem('token');
            this.router.navigate(['/loginManager']);
            return of(1); 

        })
    );
}
}
