import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'DigitBusAdmin';

  // --- ARRAY DE USUARIOS DE PRUEBA ---
  usuarios = [
    {
      id: '001520',
      nombre: 'Hassael Sánchez',
      beneficio: 'Estudiante'
    },
    {
      id: '001521',
      nombre: 'Hugo Chávez',
      beneficio: 'Tercera edad'
    },
    {
      id: '001522',
      nombre: 'Carlos Camarena',
      beneficio: 'N/A'
    }
  ];

  constructor(private router: Router) {}

  // --- FUNCIÓN PARA IR A PERFIL ---
  verPerfil(id: string) {
    this.router.navigate(['/perfil', id]);
  }

  // --- FUNCIÓN PARA ELIMINAR SOLO DEL ARRAY ---
  eliminar(id: string) {
    this.usuarios = this.usuarios.filter(u => u.id !== id);
  }
}
