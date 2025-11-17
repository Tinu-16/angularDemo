import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credentials } from '../shared/models/LoginModel';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loginUrl = 'http://localhost:5121/api/Auth/login'; 
  constructor(private http: HttpClient) {}

  login(credentials: Credentials): Observable<any> {
  return this.http.post<any>(this.loginUrl, credentials);
}
}
