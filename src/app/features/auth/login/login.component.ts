
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ToastModule, InputTextModule, ButtonModule, FormsModule],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username = '';
  password = '';
  loginLoading = false;

  constructor(private messageService: MessageService, private router: Router) {}

  onLogin() {
    this.loginLoading = true;
    // Simulate login API call
    setTimeout(() => {
      this.loginLoading = false;
      if (this.username === 'admin' && this.password === 'admin') {
        localStorage.setItem('isLoggedIn', 'true');
        this.messageService.add({ severity: 'success', summary: 'Login Success', detail: 'Welcome!' });
        this.router.navigate(['/dashboard']);
      } else {
        localStorage.setItem('isLoggedIn', 'false');
        this.messageService.add({ severity: 'error', summary: 'Login Failed', detail: 'Invalid credentials' });
      }
    }, 1000);
  }
}
