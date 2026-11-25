import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

export interface AdminUser {
  email: string;
  name: string;
  role: string;
  avatar: string;
}

interface StoredAdminSession {
  token: string;
  admin: AdminUser;
}

@Injectable({
  providedIn: 'root',
})
export class AdminAuthService {
  private readonly AUTH_KEY = 'getfit_admin_session';
  private readonly LEGACY_PASS_KEY = 'getfit_admin_pass';
  private readonly API_BASE_URL = 'https://get-fit-green.vercel.app/api/auth';

  readonly isLoggedIn = signal<boolean>(false);
  readonly currentAdmin = signal<AdminUser | null>(null);

  constructor(private router: Router) {
    // Purge any legacy plaintext password left in localStorage by older builds
    try {
      localStorage.removeItem(this.LEGACY_PASS_KEY);
    } catch {
      // Ignore storage access errors
    }
    this.checkSession();
  }

  private isJwtUnexpiredAndAdmin(token: string): boolean {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return false;
      const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(atob(base64));
      if (!payload || payload.role !== 'admin' || typeof payload.exp !== 'number') {
        return false;
      }
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }

  private checkSession(): void {
    try {
        const rawSession = sessionStorage.getItem(this.AUTH_KEY);
        if (!rawSession) {
          this.clearSessionState();
          return;
        }

        const parsed: StoredAdminSession = JSON.parse(rawSession);
        if (
          !parsed ||
          typeof parsed.token !== 'string' ||
          !parsed.admin ||
          !this.isJwtUnexpiredAndAdmin(parsed.token)
        ) {
          sessionStorage.removeItem(this.AUTH_KEY);
          this.clearSessionState();
          return;
        }

        this.isLoggedIn.set(true);
        this.currentAdmin.set(parsed.admin);
      } catch {
        sessionStorage.removeItem(this.AUTH_KEY);
        this.clearSessionState();
      }
    }

  private clearSessionState(): void {
    this.isLoggedIn.set(false);
    this.currentAdmin.set(null);
  }

  getAuthToken(): string | null {
    try {
      const rawSession = sessionStorage.getItem(this.AUTH_KEY);
      if (!rawSession) return null;
      const parsed: StoredAdminSession = JSON.parse(rawSession);
      if (!parsed?.token || !this.isJwtUnexpiredAndAdmin(parsed.token)) {
        return null;
      }
      return parsed.token;
    } catch {
      return null;
    }
  }

  async login(
    email: string,
    pass: string
  ): Promise<{ success: boolean; message?: string }> {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !pass) {
      return {
        success: false,
        message: 'Please enter both email and password.',
      };
    }

        try {
          const response = await fetch(`${this.API_BASE_URL}/admin-login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: cleanEmail,
              password: pass,
            }),
          });

          const data = await response.json();
          if(response.ok && data?.success === true && typeof data.token === 'string') {
            const admin: AdminUser = {
              email: data.admin?.email || cleanEmail,
              name: data.admin?.name || 'Administrator',
              role: data.admin?.role || 'Super Administrator',
              avatar:
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
            };
      const sessionPayload: StoredAdminSession = {
        token: data.token,
        admin,
      };
      sessionStorage.setItem(this.AUTH_KEY, JSON.stringify(sessionPayload));
      this.isLoggedIn.set(true);
      this.currentAdmin.set(admin);
      return { success: true };
    }

    return {
      success: false,
      message:
        data?.message ||
        'Invalid administrator credentials. Please check your email and password.',
    };
  } catch {
    return {
      success: false,
      message: 'Unable to reach authentication server. Please try again.',
    };
  }
  }

logout(): void {
  sessionStorage.removeItem(this.AUTH_KEY);
  this.clearSessionState();
  this.router.navigate(['/']);
}

  updatePassword(_newPass: string): boolean {
    // Password rotation is managed server-side via ADMIN_PASSWORD_HASH environment secret.
    return false;
  }
}
