import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private apiUrl = `${environment.apiUrl}/documents-api`;

  constructor(private http: HttpClient) {}

  getDocuments(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }
}