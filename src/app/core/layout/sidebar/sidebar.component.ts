import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { PanelMenuModule } from 'primeng/panelmenu';

@Component({
  selector: 'app-sidebar',
  imports: [PanelMenuModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  items: MenuItem[] = [];

  constructor(private readonly router: Router) {}

  ngOnInit() {
    this.items = [
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
        // icon: 'pi pi-chart-line',
        items: [
          {
            label: 'Dashboard',
            icon: 'pi pi-chart-bar',
            routerLink: '/investments/dashboard'
          },
          {
            label: 'Mutual Funds',
            icon: 'pi pi-wallet',
            routerLink: '/investments/mf-list'
          },
          {
            label: 'Stocks',
            icon: 'pi pi-briefcase',
            routerLink: '/investments/stocks-list'
          }
        ]
      }
    ];
  }
}
