import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
email: string | null = null;

  constructor(private router: Router) {
    this.email = localStorage.getItem('email'); 
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); 
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('expiresAt');
    localStorage.removeItem('email');
    this.router.navigate(['/user-login']);
  }
}
