import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminAuthService } from '../services/admin-auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  loginForm: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AdminAuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      NombreUsuario: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.errorMessage = '';

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { NombreUsuario, password } = this.loginForm.value;
    this.loading = true;

    this.authService.login(NombreUsuario, password).subscribe({
      next: () => {
        this.loading = false;
        // Redirige al dashboard admin
        this.router.navigate(['/admin/dashboard']);
      },
      error: (err) => {
        this.loading = false;
        // 401/403 → mensaje genérico
        if (err.status === 401 || err.status === 403) {
          this.errorMessage = 'Usuario o contraseña incorrectos';
        } else {
          this.errorMessage = 'Ocurrió un error, inténtalo de nuevo.';
        }
      }
    });
  }

  controlHasError(controlName: string, error: string): boolean {
    const control = this.loginForm.get(controlName);
    return !!control && control.hasError(error) && (control.dirty || control.touched);
  }
}
