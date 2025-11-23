import { Component, Input } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-adminavbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './adminavbar.component.html',
  styleUrl: './adminavbar.component.css'
})
export class AdminavbarComponent {
  @Input() isOpen: boolean = false;
  constructor(private router: Router) {}
  isActive(fragment: string): boolean {
    return this.router.url.includes(fragment);
  }
}