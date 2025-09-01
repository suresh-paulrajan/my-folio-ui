import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Output() toggleSidebar = new EventEmitter<void>();

  constructor(private readonly router: Router) {}

  logout() {
    localStorage.setItem('isLoggedIn', 'false');
    this.router.navigate(['/login']);
  }
}
