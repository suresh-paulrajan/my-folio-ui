import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface LoginRequest {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    private readonly apiUrl = `${environment.apiBaseUrl}/auth/login`;
    
    constructor(private readonly http: HttpClient) {}
    
    public login(request: LoginRequest): Observable<any> {
        return this.http.post(this.apiUrl, request, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
        }).pipe(
            tap(response => {
                return response;
            }),
            catchError(error => {
                console.error('Login failed', error);
                throw new Error('Login failed');
            })
        )
    }
}