import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TokenService {
    private accessToken: string | null = null;
    private refreshTokenTimeout?: any;
    
    private readonly tokenSubject = new BehaviorSubject<string | null>(null);
    
    get token$(): Observable<string | null> {
        return this.tokenSubject.asObservable();
    }

    getAccessToken(): string | null {
        return this.accessToken;
    }

    setAccessToken(token: string | null) {
        this.accessToken = token;
        this.tokenSubject.next(token);
    }

    getRefreshToken(): string | null {
        return sessionStorage.getItem('refreshToken');
    }

    setRefreshToken(token: string | null) {
        if (token) {
            sessionStorage.setItem('refreshToken', token);
        } else {
            sessionStorage.removeItem('refreshToken');
        }
    }

    getClientId(): string {
        let clientId = sessionStorage.getItem('clientId');
        if (!clientId) {
            clientId = crypto.randomUUID();
            sessionStorage.setItem('clientId', clientId);
        }
        return clientId;
    }

    clearTokens() {
        this.setAccessToken(null);
        this.setRefreshToken(null);
        sessionStorage.removeItem('clientId');
        if (this.refreshTokenTimeout) {
            clearTimeout(this.refreshTokenTimeout);
        }
    }

    setupRefreshTimer(expiresIn: number, refreshCallback: () => void) {
        if (this.refreshTokenTimeout) {
            clearTimeout(this.refreshTokenTimeout);
        }
        
        // Refresh 1 minute before expiry
        const timeout = (expiresIn - 60) * 1000;
        this.refreshTokenTimeout = setTimeout(refreshCallback, timeout);
    }
}