import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  imports: [MenubarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Output() toggleSidebar = new EventEmitter<void>();

  menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'pi pi-home',
      command: () => {
        this.router.navigate(['/dashboard']);
      }
    },
    {
      label: 'Insurance',
      icon: 'pi pi-briefcase',
      command: () => {
        this.router.navigate(['/insurance']);
      }
    },
    {
      label: 'Investments',
      icon: 'pi pi-chart-line',
      items: [
        {
          label: 'Dashboard',
          icon: 'pi pi-chart-bar',
          command: () => {
            this.router.navigate(['/investments/dashboard']);
          }
        },
        {
          label: 'Mutual Funds',
          icon: 'pi pi-wallet',
          command: () => {
            this.router.navigate(['/investments/mf-list']);
          }
        },
        {
          label: 'Stocks',
          icon: 'pi pi-briefcase',
          command: () => {
            this.router.navigate(['/investments/stocks-list']);
          }
        }
      ]
    }
  ];

  constructor(private readonly router: Router) {}

  logout() {
    localStorage.setItem('isLoggedIn', 'false');
    this.router.navigate(['/login']);
  }
}
