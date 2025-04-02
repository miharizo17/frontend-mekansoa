import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { LoginClientService } from '../services/Client/login-client.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private loginClientService: LoginClientService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
): Observable<boolean> {
    return this.loginClientService.verifyToken().pipe(
        map((connecte) => {
            console.log('Connecte ato : ', connecte);

            if (connecte === 0) {
                return true; 
            } else {
                this.router.navigate(['/loginClient']);
                return false;
            }
        }),
        catchError((error) => {
            console.error('Erreur:', error);
            this.router.navigate(['/loginClient']);
            return of(false);
        })
    );
}

}
