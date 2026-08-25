import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AdminAuthService } from '../../../services/admin-auth.service';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="login-wrapper">
      <!-- Ambient Glow Orbs -->
      <div class="glow-orb orb-red"></div>
      <div class="glow-orb orb-purple"></div>
      <div class="glow-orb orb-cyan"></div>

      <div class="login-container">
        <!-- Brand Header -->
        <div class="brand-box">
          <div class="logo-badge">
            <img
              src="./Gemini_Generated_Image_ecet84ecet84ecet.png"
              alt="GetFit Logo"
              class="brand-icon"
            />
          </div>
          <h1 class="login-title">
            GET<span class="highlight">FIT</span>
            <span class="portal-badge">ADMIN</span>
          </h1>
          <p class="login-subtitle">
            {{ langService.isArabic() ? 'لوحة التحكم المركزية والإدارة الشاملة' : 'Mission Control & Enterprise Management' }}
          </p>
        </div>

        <!-- Login Card -->
        <div class="login-card glass-card">
          <div class="card-header">
            <div class="status-indicator">
              <span class="pulse-dot"></span>
              <span class="status-text">
                {{ langService.isArabic() ? 'نظام مشفر آمن' : 'Secured 256-bit Terminal' }}
              </span>
            </div>
            <button
              class="lang-btn"
              (click)="langService.toggleLanguage()"
              type="button"
            >
              <i class="fa-solid fa-globe"></i>
              <span>{{ langService.isArabic() ? 'English' : 'العربية' }}</span>
            </button>
          </div>

          <!-- Error Banner -->
          @if (errorMessage()) {
            <div class="error-banner animate-fade-in">
              <i class="fa-solid fa-triangle-exclamation"></i>
              <span>{{ errorMessage() }}</span>
            </div>
          }

          <form (ngSubmit)="onSubmit()" class="login-form">
            <!-- Email Input -->
            <div class="input-group">
              <label for="email">
                <i class="fa-solid fa-envelope"></i>
                {{ langService.isArabic() ? 'البريد الإلكتروني للإدارة' : 'Admin Email Address' }}
              </label>
              <div class="input-field-wrap">
                <input
                  id="email"
                  type="email"
                  name="email"
                  [(ngModel)]="email"
                  [placeholder]="langService.isArabic() ? 'admin@getfit.com' : 'admin@getfit.com'"
                  required
                  autocomplete="username"
                />
                <i class="field-icon fa-solid fa-user-shield"></i>
              </div>
            </div>

            <!-- Password Input -->
            <div class="input-group">
              <label for="password">
                <i class="fa-solid fa-key"></i>
                {{ langService.isArabic() ? 'كلمة المرور' : 'Master Key / Password' }}
              </label>
              <div class="input-field-wrap">
                <input
                  id="password"
                  [type]="showPassword() ? 'text' : 'password'"
                  name="password"
                  [(ngModel)]="password"
                  placeholder="••••••••••••"
                  required
                  autocomplete="current-password"
                />
                <button
                  type="button"
                  class="toggle-pw-btn"
                  (click)="togglePasswordVisibility()"
                  tabindex="-1"
                >
                  <i [class]="showPassword() ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
                </button>
              </div>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              class="btn-primary login-btn"
              [disabled]="isLoading()"
            >
              @if (isLoading()) {
                <i class="fa-solid fa-circle-notch fa-spin"></i>
                <span>{{ langService.isArabic() ? 'جارِ التحقق...' : 'Authenticating...' }}</span>
              } @else {
                <i class="fa-solid fa-fingerprint"></i>
                <span>{{ langService.isArabic() ? 'تسجيل الدخول للوحة التحكم' : 'Access Dashboard' }}</span>
              }
            </button>
          </form>

          <div class="card-footer">
            <a routerLink="/" class="back-link">
              <i class="fa-solid fa-arrow-left"></i>
              <span>{{ langService.isArabic() ? 'العودة للموقع الرئيسي' : 'Back to Public Site' }}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .login-wrapper {
        min-height: 100vh;
        width: 100%;
        background-color: var(--bg-primary);
        background-image: 
          radial-gradient(circle at 50% 0%, rgba(230, 57, 70, 0.12) 0%, transparent 60%),
          radial-gradient(circle at 100% 100%, rgba(155, 93, 229, 0.1) 0%, transparent 50%);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem 1.5rem;
        position: relative;
        overflow: hidden;
      }

      .glow-orb {
        position: absolute;
        border-radius: 50%;
        filter: blur(100px);
        pointer-events: none;
        opacity: 0.35;
      }
      .orb-red {
        width: 450px;
        height: 450px;
        background: var(--accent-red);
        top: -120px;
        left: 50%;
        transform: translateX(-50%);
      }
      .orb-purple {
        width: 380px;
        height: 380px;
        background: var(--accent-purple);
        bottom: -100px;
        right: -50px;
      }
      .orb-cyan {
        width: 320px;
        height: 320px;
        background: var(--accent-cyan);
        bottom: 10%;
        left: -100px;
      }

      .login-container {
        width: 100%;
        max-width: 480px;
        position: relative;
        z-index: 10;
      }

      .brand-box {
        text-align: center;
        margin-bottom: 2rem;
      }

      .logo-badge {
        width: 72px;
        height: 72px;
        margin: 0 auto 1.25rem;
        border-radius: 20px;
        background: linear-gradient(135deg, rgba(230, 57, 70, 0.25) 0%, rgba(18, 20, 32, 0.8) 100%);
        border: 1px solid rgba(230, 57, 70, 0.4);
        box-shadow: 0 0 35px rgba(230, 57, 70, 0.35);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px;
      }

      .brand-icon {
        width: 100%;
        height: 100%;
        object-fit: contain;
        border-radius: 12px;
      }

      .login-title {
        font-size: 2.2rem;
        font-weight: 900;
        letter-spacing: 0.5px;
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        margin-bottom: 0.5rem;
      }

      .portal-badge {
        font-size: 0.75rem;
        font-weight: 800;
        padding: 0.25rem 0.65rem;
        border-radius: 6px;
        background: rgba(230, 57, 70, 0.2);
        color: #ff6b7a;
        border: 1px solid rgba(230, 57, 70, 0.4);
        letter-spacing: 1px;
      }

      .login-subtitle {
        color: var(--text-secondary);
        font-size: 0.95rem;
      }

      .login-card {
        padding: 2.5rem;
        border: 1px solid rgba(255, 255, 255, 0.12);
        background: rgba(18, 20, 32, 0.85);
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(230, 57, 70, 0.15);
      }

      .card-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1.75rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      }

      .status-indicator {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.8rem;
        font-weight: 600;
        color: var(--accent-mint);
      }

      .pulse-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: var(--accent-mint);
        box-shadow: 0 0 10px var(--accent-mint);
        animation: pulseDot 2s infinite ease-in-out;
      }

      @keyframes pulseDot {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.4; transform: scale(0.85); }
      }

      .lang-btn {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.15);
        color: #ffffff;
        padding: 0.35rem 0.75rem;
        border-radius: 50px;
        font-size: 0.8rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.4rem;
        transition: all 0.2s ease;
      }

      .lang-btn:hover {
        background: rgba(230, 57, 70, 0.2);
        border-color: var(--accent-red);
      }

      .error-banner {
        background: rgba(230, 57, 70, 0.15);
        border: 1px solid rgba(230, 57, 70, 0.4);
        color: #ff8a93;
        padding: 0.85rem 1rem;
        border-radius: 12px;
        font-size: 0.88rem;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 1.5rem;
      }

      .login-form {
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
      }

      .input-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      .input-group label {
        font-size: 0.85rem;
        font-weight: 600;
        color: var(--text-primary);
        display: flex;
        align-items: center;
        gap: 0.45rem;
      }

      .input-group label i {
        color: var(--accent-red);
        font-size: 0.8rem;
      }

      .input-field-wrap {
        position: relative;
        display: flex;
        align-items: center;
      }

      .input-field-wrap input {
        width: 100%;
        padding: 0.9rem 1.2rem;
        padding-left: 2.75rem;
        background: rgba(10, 11, 16, 0.8);
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 14px;
        color: #ffffff;
        font-size: 0.95rem;
        font-family: inherit;
        outline: none;
        transition: all 0.3s ease;
      }

      html[dir="rtl"] .input-field-wrap input {
        padding-left: 1.2rem;
        padding-right: 2.75rem;
      }

      .input-field-wrap input:focus {
        border-color: var(--accent-red);
        background: rgba(10, 11, 16, 0.95);
        box-shadow: 0 0 18px rgba(230, 57, 70, 0.25);
      }

      .field-icon {
        position: absolute;
        left: 1rem;
        color: var(--text-muted);
        font-size: 0.9rem;
        pointer-events: none;
      }

      html[dir="rtl"] .field-icon {
        left: auto;
        right: 1rem;
      }

      .toggle-pw-btn {
        position: absolute;
        right: 1rem;
        background: transparent;
        border: none;
        color: var(--text-muted);
        cursor: pointer;
        font-size: 0.95rem;
        padding: 0.4rem;
        transition: color 0.2s;
      }

      html[dir="rtl"] .toggle-pw-btn {
        right: auto;
        left: 1rem;
      }

      .toggle-pw-btn:hover {
        color: #ffffff;
      }

      .login-btn {
        width: 100%;
        padding: 1rem;
        font-size: 1.05rem;
        border-radius: 14px;
        margin-top: 0.5rem;
      }

      .login-btn:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }

      .card-footer {
        text-align: center;
        margin-top: 1.75rem;
        padding-top: 1.25rem;
        border-top: 1px solid rgba(255, 255, 255, 0.08);
      }

      .back-link {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--text-secondary);
        font-size: 0.88rem;
        transition: all 0.2s;
      }

      .back-link:hover {
        color: #ffffff;
        transform: translateX(-3px);
      }

      html[dir="rtl"] .back-link:hover {
        transform: translateX(3px);
      }

      .animate-fade-in {
        animation: fadeIn 0.3s ease-out;
      }

      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-6px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `,
  ],
})
export class AdminLoginComponent {
  authService = inject(AdminAuthService);
  langService = inject(LanguageService);
  router = inject(Router);

  email = '';
  password = '';
  showPassword = signal(false);
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  togglePasswordVisibility(): void {
    this.showPassword.update((v) => !v);
  }

  onSubmit(): void {
    if (!this.email || !this.password) {
      this.errorMessage.set('Please enter both email and password.');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    // Simulate quick security handshake
    setTimeout(() => {
      const res = this.authService.login(this.email, this.password);
      this.isLoading.set(false);

      if (res.success) {
        this.router.navigate(['/ahmedamr/dashboard']);
      } else {
        this.errorMessage.set(res.message || 'Login failed.');
      }
    }, 600);
  }
}
