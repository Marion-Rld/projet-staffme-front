import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.validateToken().pipe(
      map(() => true),
      catchError((error) => {
        this.router.navigate(['/login']);
        return new Observable<boolean>((observer) => observer.next(false));
      })
    );
  }
}
