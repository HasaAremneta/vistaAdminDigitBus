import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {

  usuarios = [
    { id: '001520', nombre: 'Hassael Sánchez', beneficio: 'Estudiante' },
    { id: '001521', nombre: 'Hugo Chávez', beneficio: 'Tercera edad' },
    { id: '001522', nombre: 'Carlos Camarena', beneficio: 'N/A' }
  ];

  constructor(private router: Router) {}

  verPerfil(id: string) {
    this.router.navigate(['/perfil', id]);
  }

  eliminar(id: string) {
    this.usuarios = this.usuarios.filter(u => u.id !== id);
  }
}
