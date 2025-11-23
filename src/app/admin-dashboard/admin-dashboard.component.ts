import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminAuthService } from '../services/admin-auth.service';   // 👈 importar servicio

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

  constructor(private adminAuthService: AdminAuthService) {}

  onLogout(): void {
    // Opcional: confirmar con el usuario
    const confirmar = confirm('¿Deseas cerrar sesión del panel administrativo?');
    if (!confirmar) return;

    this.adminAuthService.logout(); // 👈 esto limpia el localStorage y navega a /admin/login
  }
}
