import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) {
    // Listen for logout in other tabs
    window.addEventListener('storage', (event) => {
      if (event.key === 'token' && !event.newValue) {
        // Token removed from another tab
        console.log('Logged out from another tab');
        this.router.navigateByUrl('/login');
      }
    });
  }

  login(token: string, user: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigateByUrl('/login');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}