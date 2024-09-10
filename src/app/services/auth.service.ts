import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'http://localhost:5000/api';
  private tokenSubject: BehaviorSubject<string | null>;
  private vendorIdSubject: BehaviorSubject<string | null>;
  private isBrowser: boolean;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: object) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    const token = this.isBrowser ? localStorage.getItem('token') : null;
    const vendorId = this.isBrowser ? localStorage.getItem('vendorId') : null;
    this.tokenSubject = new BehaviorSubject<string | null>(token);
    this.vendorIdSubject = new BehaviorSubject<string | null>(vendorId);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/vendors/login`, { email, password })
      .pipe(
        tap(response => {
          if (this.isBrowser) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('vendorId', response.vendorId);
          }
          this.tokenSubject.next(response.token);
          this.vendorIdSubject.next(response.vendorId);
        })
      );
  }

  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/vendors/register`, { name, email, password })
      .pipe(
        tap(response => {
          if (this.isBrowser) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('vendorId', response.vendorId);
          }
          this.tokenSubject.next(response.token);
          this.vendorIdSubject.next(response.vendorId);
        })
      );
  }

  logout() {
    if (this.isBrowser) {
      localStorage.removeItem('token');
      localStorage.removeItem('vendorId');
    }
    this.tokenSubject.next(null);
    this.vendorIdSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!this.tokenSubject.value;
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }

  getVendorId(): string | null {
    return this.vendorIdSubject.value;
  }
}
