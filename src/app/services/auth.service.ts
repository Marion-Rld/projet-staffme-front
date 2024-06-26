import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  validateToken(): Observable<boolean> {
    if (isPlatformBrowser(this.platformId)) {
      const token = this.getToken();
      if (!token) {
        return of(false); // Pas de token, rediriger vers login
      }
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.post<any>(`${this.apiUrl}/auth-api/validate-token`, {}, { headers }).pipe(
        map(response => {
          if (response && response.message === 'Token is valid') {
            return true; // Token valide
          } else {
            throw new Error('Invalid token response');
          }
        }),
        catchError(error => {
          console.error('Token validation error:', error);
          this.removeToken(); // Supprimer le token en cas d'erreur
          return of(false); // Rediriger vers la page de login en cas d'erreur
        })
      );
    } else {
      // Gérer le cas où le code s'exécute côté serveur (SSR)
      return new Observable<boolean>(observer => {
        observer.error('Token not found in SSR context');
      });
    }
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('jwtToken');
    }
    return null;
  }

  setToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('jwtToken', token);
    }
  }

  removeToken(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('jwtToken');
    }
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth-api/forgot-password`, { email });
  }

  resetPassword(token: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth-api/reset-password`, { token, password });
  }

  register(userData: any): Observable<any> {
    const { confirmPassword, ...userPayload } = userData;
    return this.http.post(`${this.apiUrl}/auth-api/signup`, userPayload);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth-api/login`, credentials);
  }

  isAdmin(): Observable<boolean> {
    if (isPlatformBrowser(this.platformId)) {
      const token = this.getToken();
      if (!token) {
        return of(false); // Pas de token, rediriger vers login
      }
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get<any>(`${this.apiUrl}/auth-api/is-admin`, { headers }).pipe(
        map(response => {
          if (response && response.isAdmin) {
            return true; // L'utilisateur est un admin
          } else {
            return false; // L'utilisateur n'est pas un admin
          }
        }),
        catchError(error => {
          console.error('Admin validation error:', error);
          return of(false); // Rediriger vers la page de login en cas d'erreur
        })
      );
    } else {
      return of(false);
    }
  }

  isSuperAdmin(): Observable<boolean> {
    if (isPlatformBrowser(this.platformId)) {
      const token = this.getToken();
      if (!token) {
        return of(false); // Pas de token, rediriger vers login
      }
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get<any>(`${this.apiUrl}/auth-api/is-superadmin`, { headers }).pipe(
        map(response => {
          if (response && response.isSuperAdmin) {
            return true; // L'utilisateur est un superadmin
          } else {
            return false; // L'utilisateur n'est pas un superadmin
          }
        }),
        catchError(error => {
          console.error('SuperAdmin validation error:', error);
          return of(false); // Rediriger vers la page de login en cas d'erreur
        })
      );
    } else {
      return of(false);
    }
  }
}

