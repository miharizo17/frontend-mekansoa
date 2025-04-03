import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  
  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error("Erreur détectée :", error);

        // Vérifie si le message d'erreur est "Token expiré"
        if (error.status === 401 || error.error?.message === "Token expiré.") {
          console.warn("Token expiré, suppression du localStorage et redirection");

          // Supprime le token du localStorage
          localStorage.removeItem('token');

          // Redirige vers la page de login
          this.router.navigate(['/login']);
        }

        return throwError(() => error);
      })
    );
  }
}