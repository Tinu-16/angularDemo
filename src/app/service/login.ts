import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credentials } from '../shared/models/LoginModel';
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loginUrl = 'https://localhost:7181/api/Auth'; 
  constructor(private http: HttpClient, private router:Router) {}

  login(credentials: Credentials): Observable<any> {
  return this.http.post<any>(`${this.loginUrl}/login`, credentials);
  }

  userlogin(credentials: Credentials): Observable<any> {
    return this.http.post<any>(`${this.loginUrl}/Userlogin`, credentials, {
      withCredentials: true  
    });
  }

  refresh(): Observable<any> {
    return this.http.post<any>(`${this.loginUrl}/refresh`, {}, {
      withCredentials: true   
    });
  }

  logout(): void {
    this.http.post('/api/Auth/logout', {}, { withCredentials: true })
      .subscribe({
        next: () => {
          localStorage.clear();
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error('Logout failed', err);
          localStorage.clear();
          this.router.navigate(['/home']);
        }
      });
  }
}
