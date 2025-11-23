import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';

import { AdminavbarComponent } from './admin/adminavbar/adminavbar.component';
import { AdminheaderComponent } from './admin/adminheader/adminheader.component';
import { UsuarioComponent } from './admin/usuario/usuario.component';

import { SolicitudesComponent } from './admin/solicitudes/solicitudes.component'
import { DatosolicitudComponent } from './admin/datosolicitud/datosolicitud.component'


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule,RouterOutlet, AdminavbarComponent, AdminheaderComponent, UsuarioComponent, SolicitudesComponent, DatosolicitudComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'DigitBusAdmin';
  isSidebarOpen = true;

  ngOnInit(): void {
    initFlowbite();
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}