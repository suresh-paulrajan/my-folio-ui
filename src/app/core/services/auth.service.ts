import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TokenService } from './token.service';

export interface LoginRequest {
  username: string;
  password: string;
  client_id?: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  refresh_expires_in: number;
  email?: string;
  name?: string;
}

export interface UserSession {
  email?: string;
  name?: string;
  isAuthenticated: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    private readonly baseUrl = `${environment.apiBaseUrl}/auth`;
    private userSessionSubject = new BehaviorSubject<UserSession>({
        isAuthenticated: false
    });
    
    constructor(
        private readonly http: HttpClient,
        private readonly tokenService: TokenService
    ) {
        this.attemptTokenRestore();
    }

    get userSession$(): Observable<UserSession> {
        return this.userSessionSubject.asObservable();
    }

    get isAuthenticated(): boolean {
        return this.userSessionSubject.value.isAuthenticated;
    }

    private attemptTokenRestore() {
        const refreshToken = this.tokenService.getRefreshToken();
        if (refreshToken) {
            this.refreshToken(refreshToken).subscribe({
                error: () => this.logout()
            });
        }
    }

    public login(request: LoginRequest): Observable<UserSession> {
        return this.http.post<TokenResponse>(`${this.baseUrl}/login`, {
            ...request,
            client_id: this.tokenService.getClientId()
        }).pipe(
            tap(response => this.handleAuthResponse(response)),
            map(() => this.userSessionSubject.value),
            catchError(error => {
                console.error('Login failed', error);
                return throwError(() => new Error('Login failed'));
            })
        );
    }

    public logout(): Observable<void> {
        const refreshToken = this.tokenService.getRefreshToken();
        if (refreshToken) {
            return this.http.post<void>(`${this.baseUrl}/logout`, {
                refresh_token: refreshToken
            }).pipe(
                tap(() => this.clearAuth()),
                catchError(error => {
                    console.error('Logout failed', error);
                    this.clearAuth();
                    return of(void 0);
                })
            );
        }
        this.clearAuth();
        return of(void 0);
    }

    public refreshToken(refreshToken: string): Observable<void> {
        return this.http.post<TokenResponse>(`${this.baseUrl}/refresh`, {
            refresh_token: refreshToken,
            client_id: this.tokenService.getClientId()
        }).pipe(
            tap(response => this.handleAuthResponse(response)),
            map(() => void 0)
        );
    }

    private handleAuthResponse(response: TokenResponse) {
        this.tokenService.setAccessToken(response.access_token);
        this.tokenService.setRefreshToken(response.refresh_token);
        
        this.userSessionSubject.next({
            email: response.email,
            name: response.name,
            isAuthenticated: true
        });

        // Set up automatic token refresh
        this.tokenService.setupRefreshTimer(
            response.expires_in,
            () => {
                const refreshToken = this.tokenService.getRefreshToken();
                if (refreshToken) {
                    this.refreshToken(refreshToken).subscribe();
                }
            }
        );
    }

    private clearAuth() {
        this.tokenService.clearTokens();
        this.userSessionSubject.next({
            isAuthenticated: false
        });
    }
}