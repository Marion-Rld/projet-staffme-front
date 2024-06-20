import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.validateToken().pipe(
      map(isValid => {
        if (isValid) {
          return true; // Token valide, autoriser l'accès
        } else {
          this.router.navigate(['/login']); // Rediriger vers la page de login
          return false;
        }
      }),
      catchError(error => {
        console.error('AuthGuard error:', error);
        this.router.navigate(['/login']); // Rediriger vers la page de login en cas d'erreur
        return of(false);
      })
    );
  }
}