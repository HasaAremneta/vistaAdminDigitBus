import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface ReporteIncidente {
  id: string;
  usuario: string;
  tipo: 'Robo' | 'Pérdida';
  status: 'Revisión' | 'Concluida';
}

@Component({
  selector: 'app-solicitudes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './solicitudes.component.html',
  styleUrl: './solicitudes.component.css'
})
export class SolicitudesComponent {

  constructor(private router: Router) {}
  reportes: ReporteIncidente[] = [
    { id: '00045', usuario: 'Hassael Mario',     tipo: 'Robo',     status: 'Revisión' },
    { id: '00223', usuario: 'Hugo Santiago',       tipo: 'Robo',     status: 'Concluida' },
    { id: '00255', usuario: 'Guillermo Chavez',  tipo: 'Pérdida',  status: 'Revisión' },
  ];

  ver(reporte: ReporteIncidente) {
    console.log('Ver', reporte);
  }

  limpiar(reporte: ReporteIncidente) {
    console.log('Limpiar', reporte);
  }
}