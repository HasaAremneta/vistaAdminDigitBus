import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-adminheader',
  standalone: true,
  imports: [],
  templateUrl: './adminheader.component.html',
  styleUrl: './adminheader.component.css'
})
export class AdminheaderComponent {
  @Output() toggleSidebar = new EventEmitter<void>();
  onToggleClick() {
    console.log('Botón clickeado - emitiendo evento');
    this.toggleSidebar.emit();
  }
}