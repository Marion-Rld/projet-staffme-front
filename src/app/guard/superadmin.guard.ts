import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SuperAdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.isSuperAdmin().pipe(
      map(isSuperAdmin => {
        if (isSuperAdmin) {
          return true; // L'utilisateur est superadmin, autoriser l'accès
        } else {
          this.router.navigate(['/login']); // Rediriger vers la page de login
          return false;
        }
      }),
      catchError(error => {
        console.error('SuperAdminGuard error:', error);
        this.router.navigate(['/login']); // Rediriger vers la page de login en cas d'erreur
        return of(false);
      })
    );
  }
}