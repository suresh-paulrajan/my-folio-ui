import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';

// PrimeNg Components
import { SidebarModule } from 'primeng/sidebar';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, FooterComponent, SidebarModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
    sidebarVisible = false;

    toggleSidebar() {
        this.sidebarVisible = !this.sidebarVisible;
    }
}
