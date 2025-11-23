import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Documento {
  tipo: string;
  nombreArchivo: string;
  url: string;
}

@Component({
  selector: 'app-datosolicitud',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './datosolicitud.component.html',
  styleUrl: './datosolicitud.component.css'
})
export class DatosolicitudComponent {

  solicitudId = '001522';
  nombreUsuario = 'Guillermo Chavez';

  documentos: Documento[] = [
    {
      tipo: 'Acta de nacimiento',
      nombreArchivo: 'ActaNacimiento_GuillermoCh.pdf',
      url: '#'
    },
    {
      tipo: 'CURP',
      nombreArchivo: 'CURP_GuillermoCh.pdf',
      url: '#'
    },
    {
      tipo: 'Comprobante de pago',
      nombreArchivo: 'CompPago_GuillermoCh.pdf',
      url: '#'
    }
  ];

  solicitarCambio(doc: Documento) {
    // Aquí pones la lógica para solicitar cambio/subida del documento
    console.log('Solicitar cambio de:', doc);
  }

  aceptarSolicitud() {
    // Aquí la lógica para aceptar la solicitud
    console.log('Solicitud aceptada');
  }

  regresar() {
    // Si usas router, aquí puedes navegar hacia atrás
    window.history.back();
  }
}