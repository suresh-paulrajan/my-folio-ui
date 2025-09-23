import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';

// PrimeNg Components
import { SidebarModule } from 'primeng/sidebar';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, FooterComponent, SidebarModule, MenubarModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
    constructor(private readonly router: Router) {}
    sidebarVisible = false;
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

    toggleSidebar() {
        this.sidebarVisible = !this.sidebarVisible;
    }
}
