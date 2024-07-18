import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SkillLevelService {
  private apiUrl = `${environment.apiUrl}/skill-levels-api`;

  constructor(private http: HttpClient) {}

  getSkillLevels(): Observable<any> {
    return this.http.get(`${this.apiUrl}/skill-levels`);
  }

  getSkillLevelById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/skill-level/${id}`);
  }

  createSkillLevel(skillLevel: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/skill-level`, skillLevel);
  }

  updateSkillLevel(id: string, skillLevel: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/skill-level/${id}`, skillLevel);
  }

  deleteSkillLevel(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/skill-level/${id}`);
  }
}