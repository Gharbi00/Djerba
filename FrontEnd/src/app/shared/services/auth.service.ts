
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/auth'; // Update base URL if needed
  private userId: number | null = null;
  private userEmail: string | null = null;
  private userRole: string | null = null;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<{
    authToken: string;
    authValue: boolean;
    userId: number;  // Directly using userId in response
    role: string;    // Assuming the response contains role
    userEmail: string;  // Assuming the response contains email
}> {
    const url = `${this.baseUrl}/login`;
    const body = { email, password };

    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
    });

    return this.http
        .post<{ authToken: string; authValue: boolean; userId: number; role: string; userEmail: string }>(
            url,
            body,
            { headers }
        )
        .pipe(
            tap((response) => {
                console.log('Login response:', response);

                // Save the authToken to localStorage (or cookies)
                if (response.authValue) {
                    localStorage.setItem('authToken', response.authToken);
                }

                // Save the user ID in localStorage and service
                if (response.userId) {
                    localStorage.setItem('userId', response.userId.toString());
                    this.setUserId(response.userId); // Set userId in AuthService's internal state
                }

                // Save email and role in localStorage
                if (response.userEmail) {
                    localStorage.setItem('userEmail', response.userEmail);
                    this.userEmail = response.userEmail; // Save email to service for later use
                }

                if (response.role) {
                    localStorage.setItem('userRole', response.role);
                    this.userRole = response.role; // Save role to service for later use
                }
            }),
            catchError((error) => {
                console.error('Login failed:', error);
                return throwError(() => error);
            })
        );
}


  register(user: any): Observable<{
    authToken: string;
    authValue: boolean;
    userId: number;
    role: string;    // Assuming the response contains role
    userEmail: string;  // Assuming the response contains email
  }> {
    const url = `${this.baseUrl}/register`;

    return this.http
      .post<{ authToken: string; authValue: boolean; userId: number; role: string; userEmail: string }>(
        url,
        user
      )
      .pipe(
        tap((response) => {
          console.log('Registration response:', response);

          // Debugging
          console.log('AuthToken:', response.authToken);
          console.log('AuthValue:', response.authValue);
          console.log('User ID:', response.userId);
          console.log('User Role:', response.role);
          console.log('User Email:', response.userEmail);

          // Save the authToken to localStorage (or cookies)
          if (response.authValue) {
            localStorage.setItem('authToken', response.authToken);
          }

          // Save userId, email, and role to localStorage
          if (response.userId) {
            localStorage.setItem('userId', response.userId.toString());
            this.setUserId(response.userId); // Set userId in AuthService's internal state
          }

          if (response.userEmail) {
            localStorage.setItem('userEmail', response.userEmail);
            this.userEmail = response.userEmail; // Save email to service for later use
          }

          if (response.role) {
            localStorage.setItem('userRole', response.role);
            this.userRole = response.role; // Save role to service for later use
          }
        }),
        catchError((error) => {
          console.error('Registration failed:', error);
          return throwError(() => error);
        })
      );
  }

  // Forgot Password API call
  forgotPassword(email: string): Observable<any> {
    const url = `${this.baseUrl}/forgot-password`;
    const body = { email };

    return this.http.post(url, body).pipe(
      catchError((error) => {
        console.error('Forgot Password error:', error);
        return throwError(() => error);
      })
    );
  }

  setUserId(id: number): void {
    this.userId = id;
  }

  getUserId(): number | null {
    return this.userId;
  }

  getUserEmail(): string | null {
    return this.userEmail;
  }

  getUserRole(): string | null {
    return this.userRole;
  }
}

