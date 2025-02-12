import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent implements OnInit {
  loginForm!: FormGroup;
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false],
    });

    this.registerForm = this.fb.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      userName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      nationality: [''], // Optional
      photo: [''], // Optional
    });
  }

  onLogin(): void {
    if (this.loginForm.invalid) {
      console.log('Login form is invalid');
      return;
    }
  
    const { email, password } = this.loginForm.value;
  
    this.authService.login(email, password).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
  
        const authToken = response.authToken;
        const authValue = response.authValue;
        const userId = response.userId;
        const userEmail = response.userEmail;  // Now this will be available
        const userRole = response.role;    // Now this will be available
  
        // Store token and role if available
        if (authValue) {
          localStorage.setItem('authToken', authToken);
          localStorage.setItem('authValue', JSON.stringify(authValue));
        }
  
        // Store userId in local storage
        if (userId) {
          this.authService.setUserId(userId);
          localStorage.setItem('userId', userId.toString());
          console.log('User ID in LocalStorage:', localStorage.getItem('userId'));
        }
  
        // Store the user's email and role in local storage
        if (userEmail) {
          localStorage.setItem('userEmail', userEmail);
          console.log('User email stored in LocalStorage:', localStorage.getItem('userEmail'));
        }
  
        if (userRole) {
          localStorage.setItem('userRole', userRole);
          console.log('User role stored in LocalStorage:', localStorage.getItem('userRole'));
        }
  
        window.location.reload();
      },
      error: (err) => {
        console.error('Login failed:', err);
      },
    });
  }
  
  
  
  

  onRegister(): void {
    if (this.registerForm.invalid) {
      console.log('Register form is invalid');
      return;
    }
  
    const {
      firstName,
      lastName,
      userName,
      email,
      password,
      nationality,
      photo,
    } = this.registerForm.value;
  
    this.authService
      .register({
        firstName,
        lastName,
        userName,
        email,
        password,
        nationality,
        photo,
      })
      .subscribe({
        next: (response) => {
          console.log('Registration successful:', response);
  
          const userId = response.userId; // Directly accessing userId
  
          if (userId) {
            this.authService.setUserId(userId); // Set userId in AuthService's internal state
            localStorage.setItem('userId', userId.toString());
          }
        },
        error: (err) => {
          console.error('Registration failed:', err);
        },
      });
    window.location.reload();
  }
  

  onForgotPassword(): void {
    const email = this.loginForm.get('email')?.value;
    if (!email) {
      console.log('Email is required to reset password');
      return;
    }

    this.authService.forgotPassword(email).subscribe({
      next: (response) => console.log('Password reset email sent:', response),
      error: (err) => console.error('Forgot password failed:', err),
    });
  }
}
