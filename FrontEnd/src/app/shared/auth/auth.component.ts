import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NATIONALITIES } from '../model/nationalities';
import { AlertService } from '../services/alert.service';
import { CommonModule } from '@angular/common';
import { SwalService } from '../services/swal.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent implements OnInit {
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  nationalities = NATIONALITIES;
  selectedFile: File | null = null;
  photoPreview: string | ArrayBuffer | null = null;
  constructor(private fb: FormBuilder, private authService: AuthService, private swalService: SwalService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(2)]],
      rememberMe: [false],
    });

    this.registerForm = this.fb.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(50),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(50),
        ],
      ],
      userName: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(50),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      confirmPassword: ['', [Validators.required]],
      nationality: [''], // Optional
      photo: [''], // Optional
    });
  }

  onLogin(): void {
    const controls = this.loginForm.controls;
    if (controls['email'].invalid) {
      this.swalService.warning('Email field is required and must be a valid email address.');
      return;
    }
    if (controls['password'].invalid) {
      this.swalService.warning('Password field is required and must be at least 6 characters long.');
      return;
    }

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: (response) => {
        console.log('Login successful:', response);

        const { authToken, authValue, userId, userEmail, role } = response;

        if (authValue) {
          localStorage.setItem('authToken', authToken);
          localStorage.setItem('authValue', JSON.stringify(authValue));
        }
        if (userId) {
          this.authService.setUserId(userId);
          localStorage.setItem('userId', userId.toString());
        }
        if (userEmail) {
          localStorage.setItem('userEmail', userEmail);
        }
        if (role) {
          localStorage.setItem('userRole', role);
        }

        this.swalService
          .success({
            title: 'Login Successful',
            text: 'Welcome back!',
          })
          .then(() => window.location.reload());
      },
      error: (err) => {
        console.error('Login failed:', err);
        this.swalService.error({
          title: 'Login Failed',
          text: err.error?.message || 'Please check your credentials and try again.',
        });
      },
    });
  }
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        this.photoPreview = reader.result;
      };
      reader.readAsDataURL(file);

      // Update form control
      this.registerForm.patchValue({
        photo: file.name
      });
    }
  }

  onRegister(): void {
    const controls = this.registerForm.controls;

    // Check required fields one by one for precise feedback
    if (controls['firstName'].invalid) {
      this.swalService.warning('Please enter a valid first name (min 3 characters).');
      return;
    }
    if (controls['lastName'].invalid) {
      this.swalService.warning('Please enter a valid last name (min 3 characters).');
      return;
    }
    if (controls['userName'].invalid) {
      this.swalService.warning('Please enter a valid username (min 3 characters).');
      return;
    }
    if (controls['email'].invalid) {
      this.swalService.warning('Please enter a valid email address.');
      return;
    }
    if (controls['password'].invalid) {
      this.swalService.warning('Password must be at least 6 characters long.');
      return;
    }
    if (controls['confirmPassword'].invalid) {
      this.swalService.warning('Please confirm your password.');
      return;
    }

    // Extra check: password match
    if (controls['password'].value !== controls['confirmPassword'].value) {
      this.swalService.warning('Passwords do not match. Please try again.');
      return;
    }

    const formData = this.registerForm.value;

    // Remove confirmPassword as it's not needed for backend
    delete formData.confirmPassword;

    // Set a default photo URL to satisfy the @NotBlank constraint
    if (!formData.photo) {
      formData.photo = 'https://via.placeholder.com/150x150?text=User'; // Default photo URL
    }

    // If user uploaded a file, we'll still use default URL for now
    // For actual file upload, you'll need backend support for multipart
    if (this.selectedFile) {
      console.log('File selected but using default photo URL. Backend needs multipart support for file uploads.');
    }

    this.authService.register(formData).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);

        const userId = response.userId;
        if (userId) {
          this.authService.setUserId(userId);
          localStorage.setItem('userId', userId.toString());
        }

        this.swalService
          .success({
            title: 'Registration Successful',
            text: 'Your account has been created successfully!',
          })
          .then(() => window.location.reload());
      },
      error: (err) => {
        console.error('Registration failed:', err);
        this.swalService.error({
          title: 'Registration Failed',
          text: err.error?.message || 'Please try again later.',
        });
      },
    });
  }

  onForgotPassword(): void {
    const email = this.loginForm.get('email')?.value;
    if (!email) {
      this.swalService.warning('Please enter your email address first.');
      return;
    }

    this.authService.forgotPassword(email).subscribe({
      next: (response) => {
        console.log('Password reset email sent:', response);
        this.swalService.success('A password reset email has been sent to your inbox.');
      },
      error: (err) => {
        console.error('Forgot password failed:', err);
        this.swalService.error({
          title: 'Reset Failed',
          text: err.error?.message || 'Unable to send reset email. Please try again later.',
        });
      },
    });
  }

}
