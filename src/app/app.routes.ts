import { Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'admin/login' },

  // Login de administradores
  { path: 'admin/login', component: AdminLoginComponent },

  // Rutas protegidas del panel administrativo
  {
    path: 'admin',
    canActivate: [adminGuard],
    children: [
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },

      // Más adelante aquí puedes agregar:
      // { path: 'usuarios', component: UsuariosComponent },
      // { path: 'solicitudes', component: SolicitudesComponent },
      // etc.
    ]
  },

  { path: '**', redirectTo: 'admin/login' }
];
