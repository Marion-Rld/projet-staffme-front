import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Team } from '../models/team.model';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private apiUrl = `${environment.apiUrl}/teams-api`;

  constructor(private http: HttpClient) {}

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.apiUrl}/teams`);
  }

  createTeam(team: Team): Observable<Team[]> {
    return this.http.post<Team[]>(`${this.apiUrl}/team`, team);
  }

  getTeamById(id: string): Observable<Team> {
    return this.http.get<Team>(`${this.apiUrl}/team/${id}`);
  }

  updateTeam(id: string, teamdata: Team): Observable<Team> {
    return this.http.patch<Team>(`${this.apiUrl}/team/${id}`, teamdata);
  }

  deleteTeam(id: string): Observable<Team> {
    return this.http.delete<Team>(`${this.apiUrl}/team/${id}`);
  }
}