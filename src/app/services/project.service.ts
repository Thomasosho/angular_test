import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private readonly API_URL = 'http://localhost:5000/api/projects';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getProjects(): Observable<any[]> {
    try {
      const headers = this.getAuthHeaders();
      return this.http.get<any[]>(this.API_URL, { headers }).pipe(
        catchError(this.handleError)
      );
    } catch (error) {
      return throwError(() => new Error('Authentication error'));
    }
  }

  getProject(id: string): Observable<any> {
    try {
      const headers = this.getAuthHeaders();
      return this.http.get<any>(`${this.API_URL}/${id}`, { headers }).pipe(
        catchError(this.handleError)
      );
    } catch (error) {
      return throwError(() => new Error('Authentication error'));
    }
  }

  createProject(project: any): Observable<any> {
    try {
      const headers = this.getAuthHeaders();
      return this.http.post<any>(this.API_URL, project, { headers }).pipe(
        catchError(this.handleError)
      );
    } catch (error) {
      return throwError(() => new Error('Authentication error'));
    }
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong, please try again.'));
  }
}
