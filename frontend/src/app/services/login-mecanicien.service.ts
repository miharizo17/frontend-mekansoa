import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginMecanicienService{

  private apiUrl = `${environment.apiUrl}/mecanicien`;
  private apiUrlAuth = `${environment.apiUrl}/auth/checkTokenMecanicien`;


  constructor(private http: HttpClient, private router : Router) {}

  // Login
  login(email: string, mdp: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, mdp });
  }

  // Vérifier le token
  checkToken(tokenMecanicien: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/checkToken`, { params: { tokenMecanicien } });
  }

  // Déconnexion
  logout(tokenMecanicien: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/logout`, { params: { tokenMecanicien } });
  }

  // Récupérer les tokens valides
  getValidTokens(idMecanicien: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/validTokens`, { params: { idMecanicien } });
  }

  // Mettre invalide les anciens tokens
  unvalidOldToken(idMecanicien: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/unvalidOldToken`, { idMecanicien });
  }

  // Get idManager by token
  getIdManagerByToken(tokenMecanicien: String): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${tokenMecanicien}`);
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
            this.router.navigate(['/loginMecanicien']);
            return of(1); 

        })
    );
}
}
