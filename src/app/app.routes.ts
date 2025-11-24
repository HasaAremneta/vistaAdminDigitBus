import { Routes } from '@angular/router';
import { UsuariosComponent } from './admin/usuarios/usuarios.component';
import { PerfilUsuarioComponent } from './admin/perfil-usuario/perfil-usuario.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: UsuariosComponent
  },
  {
    path: 'perfil/:id',
    component: PerfilUsuarioComponent
  }
];
