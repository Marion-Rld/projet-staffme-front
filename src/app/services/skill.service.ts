import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { environment } from '../../environments/environment';
import { Skill } from '../models/skill.model';

@Injectable({
  providedIn: 'root',
})
export class SkillService {
  private apiUrl = `${environment.apiUrl}/skills-api`;

  constructor(private http: HttpClient) {}

  getSkills(): Observable<any> {
    return this.http.get(`${this.apiUrl}/skills`);
  }

  getSkillById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/skill/${id}`);
  }

  getSkillsByIds(skillIds: string[]): Observable<Skill[]> {
    const requests = skillIds.map((id) => this.getSkillById(id));
    return forkJoin(requests);
  }
}
