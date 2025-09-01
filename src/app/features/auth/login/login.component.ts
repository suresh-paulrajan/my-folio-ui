
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ToastModule, InputTextModule, ButtonModule, FormsModule, HttpClientModule],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username = '';
  password = '';
  loginLoading = false;

  constructor(private readonly messageService: MessageService, 
              private readonly router: Router,
              private readonly authService: AuthService) {}

  onLogin() {
    this.loginLoading = true;
    this.authService.login({username: this.username, password: this.password}).subscribe({
        next: (response) => {
            // Assuming response contains a success flag
            this.loginLoading = false;
            localStorage.setItem('isLoggedIn', 'true');
            this.messageService.add({ severity: 'success', summary: 'Login Success', detail: 'Welcome!' });
            this.router.navigate(['/dashboard']);
        },
        error: (error) => {
            this.loginLoading = false;
            localStorage.setItem('isLoggedIn', 'false');
            this.messageService.add({severity:'error', summary: 'Login Failed', detail: 'Invalid username or password'});
        }
    });
  }
}
