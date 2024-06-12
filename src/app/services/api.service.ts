import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})

export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  //AUTH 
  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth-api/forgot-password`, { email });
  }

  resetPassword(token: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth-api/reset-password`, { token, password });
  }

  register(userData: any): Observable<any> {
    const { confirmPassword, ...userPayload } = userData;
    console.log(userPayload);
    console.log(this.apiUrl);
    return this.http.post(`${this.apiUrl}/auth-api/signup`, userPayload);
}

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth-api/login`, credentials);
  }

  // Utilitaire pour stocker le token dans le local storage
  setToken(token: string): void {
    localStorage.setItem('jwtToken', token);
  }

  // Utilitaire pour récupérer le token
  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  // Utilitaire pour supprimer le token
  removeToken(): void {
    localStorage.removeItem('jwtToken');
  }

  // USERS
  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users-api/users`);
  }

  addUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users-api/user`, userData);
  }

  updateUser(userId: string, userData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/users-api/user/${userId}`, userData);
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users-api/user/${userId}`);
  }

  // SKILLS
  getSkills(): Observable<any> {
    return this.http.get(`${this.apiUrl}/skills-api`);
  }

  // TEAMS
  getTeams(): Observable<any> {
    return this.http.get(`${this.apiUrl}/teams-api`);
  }

  // PROJECTS
  getProjects(): Observable<any> {
    return this.http.get(`${this.apiUrl}/projects-api`);
  }

  // DOCUMENTS
  getDocuments(): Observable<any> {
    return this.http.get(`${this.apiUrl}/documents-api`);
  }

  // SKILL LEVELS
  getSkillLevels(): Observable<any> {
    return this.http.get(`${this.apiUrl}/skill-levels-api`);
  }
}
