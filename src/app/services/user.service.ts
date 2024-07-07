import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/users-api`;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users`);
  }

  createUser(userData: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/user`, userData);
  }

  getUserById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${id}`);
  }

  getUsersByIds(userIds: string[]): Observable<User[]> {
    const requests = userIds.map((id) =>
      this.http.get<User>(`${this.apiUrl}/user/${id}`)
    );
    return forkJoin(requests);
  }

  updateUser(id: string, userData: User): Observable<any> {
    return this.http.patch(`${this.apiUrl}/user/${id}`, userData);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/user/${id}`, {
      responseType: 'text',
    });
  }
}
