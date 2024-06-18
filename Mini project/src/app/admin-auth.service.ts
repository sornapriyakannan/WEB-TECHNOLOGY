import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {

  constructor(private http: HttpClient) { }

  isLoggedIn(): boolean {
    // Implement your authentication check here (e.g., check localStorage, session, etc.)
    return localStorage.getItem('adminToken') !== null;
  }

  login(username: string, password: string): Observable<boolean> {
    // Implement actual authentication logic (HTTP request to backend)
    // For demo purposes, we assume successful login:
    localStorage.setItem('adminToken', 'dummyToken'); // Store token or session info
    return of(true); // Return observable with success flag
  }

  logout() {
    // Implement logout functionality (clear localStorage, session, etc.)
    localStorage.removeItem('adminToken');
  }
}
