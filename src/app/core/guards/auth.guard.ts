import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private readonly router: Router,
        private readonly authService: AuthService
    ) {}

    canActivate(): Observable<boolean | UrlTree> {
        return this.authService.userSession$.pipe(
            map(session => {
                if (!session.isAuthenticated) {
                    // Store the attempted URL for redirecting after login
                    sessionStorage.setItem('returnUrl', this.router.routerState.snapshot.url);
                    return this.router.createUrlTree(['/auth/login']);
                }
                return true;
            })
        );
    }
}
