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
    return this.http.get(`${this.apiUrl}`);
  }
}