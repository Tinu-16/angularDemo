import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

export interface JwtPayload {
  sub?: string;     
  userId?: string;
  email?: string;
  exp?: number;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserId(): number | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      console.log('Decoded token payload:', decoded);

      return decoded.userId ? Number(decoded.userId) : null;
    } catch (err) {
      console.error('Invalid token:', err);
      return null;
    }
  }

  getEmail(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      return decoded.sub || decoded.email || null;
    } catch {
      return null;
    }
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (!decoded.exp) return false;

      const expiry = decoded.exp * 1000; // exp is in seconds
      return Date.now() > expiry;
    } catch {
      return true;
    }
  }
}
