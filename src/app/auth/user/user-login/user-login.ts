import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../../service/login';
import { Router } from '@angular/router';
import { Credentials } from '../../../shared/models/LoginModel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-login',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './user-login.html',
  styleUrl: './user-login.scss',
})
export class UserLogin {
 errorMessage = '';
 loginForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private auth: LoginService, 
    private router: Router ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const credentials: Credentials = this.loginForm.value;
      this.auth.userlogin(credentials).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('expiresAt', response.expiresAt);
          this.router.navigate(['dashboard']);
        },
        error: () => {
          this.errorMessage = 'Invalid email or password.';
        }
      });
    }
  }
}
