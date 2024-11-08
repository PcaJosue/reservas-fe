import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {

    return this.http.post<{ accessToken: string }>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(response => {
          localStorage.setItem('accessToken', response.accessToken);
        }),
        catchError(this.handleError.bind(this))
      );
  }

  signup(name: string, email: string, password: string) {

    return this.http.post<{ message: string }>(`${this.apiUrl}/signup`, { name, email, password })
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred. Please try again later.';
    if (error.error && error.error.message) {
      errorMessage = error.error.message;
    }
    return throwError(() => new Error(errorMessage));
  }

  logout() {
    localStorage.removeItem('accessToken');
  }
}
