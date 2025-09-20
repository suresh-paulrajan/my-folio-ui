import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { TokenService } from '../services/token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private readonly refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private readonly tokenService: TokenService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Skip auth header for auth endpoints
    if (!request.url.startsWith(environment.apiBaseUrl) || request.url.includes('/auth/')) {
      return next.handle(request);
    }

    return next.handle(this.addToken(request)).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(request, next);
        }
        return throwError(() => error);
      })
    );
  }

  private addToken(request: HttpRequest<any>): HttpRequest<any> {
    const token = this.tokenService.getAccessToken();
    if (token) {
      return request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return request;
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      const refreshToken = this.tokenService.getRefreshToken();
      if (!refreshToken) {
        this.tokenService.clearTokens();
        return throwError(() => new Error('No refresh token available'));
      }

      // Let the token service handle refresh directly with the API
      return this.tokenService.token$.pipe(
        filter(token => token !== null),
        take(1),
        switchMap(() => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(true);
          return next.handle(this.addToken(request));
        }),
        catchError((err) => {
          this.isRefreshing = false;
          this.tokenService.clearTokens();
          return throwError(() => err);
        })
      );
    }

    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap(() => next.handle(this.addToken(request)))
    );
  }
}