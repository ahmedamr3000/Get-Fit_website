import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

export interface AdminUser {
  email: string;
  name: string;
  role: string;
  avatar: string;
}

@Injectable({
  providedIn: 'root',
})
export class AdminAuthService {
  private readonly AUTH_KEY = 'getfit_admin_session';
  private readonly PASS_KEY = 'getfit_admin_pass';
  private readonly DEFAULT_EMAIL = 'admin@getfit.com';
  private readonly DEFAULT_PASS = 'GetFit2026!';

  readonly isLoggedIn = signal<boolean>(false);
  readonly currentAdmin = signal<AdminUser | null>(null);

  constructor(private router: Router) {
    this.checkSession();
  }

  private checkSession(): void {
    try {
      const session = sessionStorage.getItem(this.AUTH_KEY);
      if (session) {
        const parsed = JSON.parse(session);
        this.isLoggedIn.set(true);
        this.currentAdmin.set(parsed);
      }
    } catch {
      this.isLoggedIn.set(false);
      this.currentAdmin.set(null);
    }
  }

  login(email: string, pass: string): { success: boolean; message?: string } {
    const cleanEmail = email.trim().toLowerCase();
    const storedPass = localStorage.getItem(this.PASS_KEY) || this.DEFAULT_PASS;

    if (cleanEmail === this.DEFAULT_EMAIL.toLowerCase() && pass === storedPass) {
      const admin: AdminUser = {
        email: cleanEmail,
        name: 'Ahmed Amr',
        role: 'Super Administrator',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      };
      sessionStorage.setItem(this.AUTH_KEY, JSON.stringify(admin));
      this.isLoggedIn.set(true);
      this.currentAdmin.set(admin);
      return { success: true };
    }

    return {
      success: false,
      message: 'Invalid administrator credentials. Please check your email and password.',
    };
  }

  logout(): void {
    sessionStorage.removeItem(this.AUTH_KEY);
    this.isLoggedIn.set(false);
    this.currentAdmin.set(null);
    this.router.navigate(['/']);
  }

  updatePassword(newPass: string): boolean {
    if (!newPass || newPass.length < 6) return false;
    localStorage.setItem(this.PASS_KEY, newPass);
    return true;
  }
}
