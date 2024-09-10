import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BidService {
  private readonly API_URL = 'http://localhost:5000/api/bids';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getBids(): Observable<any[]> {
    try {
      const headers = this.getAuthHeaders();
      return this.http.get<any[]>(this.API_URL, { headers }).pipe(
        catchError(this.handleError)
      );
    } catch (error) {
      return throwError(() => new Error('Authentication error'));
    }
  }

  getBid(id: string): Observable<any> {
    try {
      const headers = this.getAuthHeaders();
      return this.http.get<any>(`${this.API_URL}/${id}`, { headers }).pipe(
        catchError(this.handleError)
      );
    } catch (error) {
      return throwError(() => new Error('Authentication error'));
    }
  }

  createBid(bid: any): Observable<any> {
    try {
      const headers = this.getAuthHeaders();
      return this.http.post<any>(this.API_URL, bid, { headers }).pipe(
        catchError(this.handleError)
      );
    } catch (error) {
      return throwError(() => new Error('Authentication error'));
    }
  }

  getBidsByVendor(vendorId: string): Observable<any[]> {
    try {
      const headers = this.getAuthHeaders();
      return this.http.get<any[]>(`${this.API_URL}/vendor/${vendorId}`, { headers }).pipe(
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
