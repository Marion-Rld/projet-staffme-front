import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth-api`;

  constructor(private http: HttpClient) {}

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  }

  resetPassword(token: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, { token, password });
  }

  register(userData: any): Observable<any> {
    const { confirmPassword, ...userPayload } = userData;
    return this.http.post(`${this.apiUrl}/signup`, userPayload);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  setToken(token: string): void {
    localStorage.setItem('jwtToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  removeToken(): void {
    localStorage.removeItem('jwtToken');
  }

  validateToken(): Observable<any> {
    const token = this.getToken();
    if (token) {
      const headers = new HttpHeaders().set('x-auth-token', token);
      return this.http.get(`${this.apiUrl}/validate-token`, { headers });
    }
    return new Observable((observer) => observer.error('No token found'));
  }
}
