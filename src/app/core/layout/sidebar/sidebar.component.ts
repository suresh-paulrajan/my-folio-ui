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
        command: () => this.router.navigate(['/dashboard'])
      },
      {
        label: 'Insurance',
        icon: 'pi pi-briefcase',
        command: () => this.router.navigate(['/insurance'])
      }
    ];
  }
}
