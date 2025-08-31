import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
	constructor(private router: Router) {}

	canActivate(): boolean {
		// Simple check: user is authenticated if localStorage has 'isLoggedIn' set to 'true'
		const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
		if (!isLoggedIn) {
			this.router.navigate(['/login']);
			return false;
		}
		return true;
	}
}
