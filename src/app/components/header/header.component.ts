import { Component, HostListener, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { AdminAuthService } from '../../services/admin-auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <header [class.scrolled]="isScrolled()" class="site-header">
      <div class="container header-container">
        <!-- Logo -->
        <a routerLink="/" class="logo">
          <div class="logo-icon">
            <img
              src="./Gemini_Generated_Image_ecet84ecet84ecet.png"
              alt="GetFit Logo"
              width="30px"
              height="30px"
              style="object-fit: contain; border-radius: 6px;"
            />
          </div>
          <span class="logo-text">GET<span class="highlight">FIT</span></span>
        </a>

        <!-- Desktop Navigation -->
        <nav class="desktop-nav">
          <a href="#features" class="nav-link">
            {{ langService.isArabic() ? 'المميزات الأساسية' : 'Core Features' }}
          </a>
          <a href="#showcase" class="nav-link">
            {{ langService.isArabic() ? 'استعراض التطبيق' : 'App Showcase' }}
          </a>
          <a href="#pricing" class="nav-link">
            {{ langService.isArabic() ? 'الأسعار (ج.م)' : 'Pricing (EGP)' }}
          </a>
          <a href="#pre-register" class="nav-link">
            {{ langService.isArabic() ? 'التسجيل المسبق' : 'Pre-Register' }}
          </a>

          <!-- HIDDEN DASHBOARD TAB: Visible ONLY when Admin is authenticated -->
          @if (authService.isLoggedIn()) {
            <a routerLink="/ahmedamr/dashboard" class="nav-link admin-dashboard-link">
              <i class="fa-solid fa-crown"></i>
              <span>{{ langService.isArabic() ? 'لوحة التحكم' : 'Dashboard' }}</span>
              <span class="admin-badge">ADMIN</span>
            </a>
          }
        </nav>

        <!-- CTA Button & Language Switcher -->
        <div class="header-actions">
          <button
            class="lang-switch-btn"
            (click)="langService.toggleLanguage()"
            [attr.title]="langService.isArabic() ? 'Switch to English' : 'التحويل للعربية'"
          >
            <i class="fa-solid fa-globe"></i>
            <span>{{ langService.isArabic() ? 'English' : 'العربية' }}</span>
          </button>

          <!-- Dashboard Direct Quick Button if logged in -->
          @if (authService.isLoggedIn()) {
            <a routerLink="/ahmedamr/dashboard" class="btn-secondary header-btn admin-btn">
              <i class="fa-solid fa-gauge-high"></i>
              {{ langService.isArabic() ? 'لوحة الإدارة' : 'Dashboard' }}
            </a>
          } @else {
            <a href="#pre-register" class="btn-primary header-btn">
              <i class="fa-solid fa-rocket"></i>
              {{ langService.isArabic() ? 'الوصول المبكر' : 'Early Access' }}
            </a>
          }

          <!-- Mobile Menu Button -->
          <button
            class="mobile-toggle"
            (click)="toggleMobileMenu()"
            aria-label="Toggle Menu"
          >
            <i
              [class]="
                isMobileMenuOpen()
                  ? 'fa-solid fa-xmark'
                  : 'fa-solid fa-bars-staggered'
              "
            ></i>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation Drawer -->
      <div class="mobile-drawer" [class.open]="isMobileMenuOpen()">
        <nav class="mobile-nav">
          <a href="#features" (click)="closeMobileMenu()">
            {{ langService.isArabic() ? 'المميزات الأساسية' : 'Core Features' }}
          </a>
          <a href="#showcase" (click)="closeMobileMenu()">
            {{ langService.isArabic() ? 'استعراض التطبيق' : 'App Showcase' }}
          </a>
          <a href="#pricing" (click)="closeMobileMenu()">
            {{ langService.isArabic() ? 'الأسعار (ج.م)' : 'Pricing (EGP)' }}
          </a>

          @if (authService.isLoggedIn()) {
            <a routerLink="/ahmedamr/dashboard" (click)="closeMobileMenu()" class="mobile-admin-link">
              <i class="fa-solid fa-crown text-gold"></i>
              <span>{{ langService.isArabic() ? 'لوحة تحكم الإدارة' : 'Admin Mission Control' }}</span>
            </a>
          }

          <button
            class="lang-switch-btn mobile-lang-btn"
            (click)="langService.toggleLanguage(); closeMobileMenu()"
          >
            <i class="fa-solid fa-globe"></i>
            <span>{{ langService.isArabic() ? 'English' : 'تغيير اللغة إلى العربية' }}</span>
          </button>

          @if (authService.isLoggedIn()) {
            <a
              routerLink="/ahmedamr/dashboard"
              (click)="closeMobileMenu()"
              class="btn-primary drawer-btn"
            >
              <i class="fa-solid fa-gauge-high"></i>
              {{ langService.isArabic() ? 'دخول لوحة التحكم' : 'Go to Dashboard' }}
            </a>
          } @else {
            <a
              href="#pre-register"
              (click)="closeMobileMenu()"
              class="btn-primary drawer-btn"
            >
              {{ langService.isArabic() ? 'سجل الآن في الوصول المبكر' : 'Pre-Register Now' }}
            </a>
          }
        </nav>
      </div>
    </header>
  `,
  styles: [
    `
      .site-header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;
        padding: 1.25rem 0;
        transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
      }

      .site-header.scrolled {
        padding: 0.8rem 0;
        background: rgba(10, 11, 16, 0.85);
        backdrop-filter: blur(18px);
        -webkit-backdrop-filter: blur(18px);
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
      }

      .header-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .logo {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        font-family: var(--font-heading);
        font-weight: 900;
        font-size: 1.5rem;
        letter-spacing: 0.5px;
        color: #ffffff;
      }

      .logo-icon {
        width: 38px;
        height: 38px;
        background: linear-gradient(135deg, var(--accent-red) 0%, #c1121f 100%);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: var(--shadow-glow-red);
        overflow: hidden;
      }

      .logo-text .highlight {
        color: var(--accent-red);
      }

      .desktop-nav {
        display: flex;
        align-items: center;
        gap: 2rem;
      }

      .nav-link {
        font-size: 0.95rem;
        font-weight: 500;
        color: var(--text-secondary);
        position: relative;
        display: flex;
        align-items: center;
        gap: 0.4rem;
      }

      .nav-link::after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 0;
        width: 0%;
        height: 2px;
        background: var(--accent-red);
        transition: width 0.3s ease;
        border-radius: 2px;
      }

      .nav-link:hover {
        color: #ffffff;
      }

      .nav-link:hover::after {
        width: 100%;
      }

      .admin-dashboard-link {
        color: #ffd700 !important;
        font-weight: 700;
      }

      .admin-dashboard-link i {
        color: #ffd700;
      }

      .admin-badge {
        font-size: 0.65rem;
        background: rgba(255, 215, 0, 0.2);
        color: #ffd700;
        border: 1px solid rgba(255, 215, 0, 0.4);
        padding: 0.1rem 0.4rem;
        border-radius: 4px;
        letter-spacing: 0.5px;
      }

      .header-actions {
        display: flex;
        align-items: center;
        gap: 1rem;
      }

      .lang-switch-btn {
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.15);
        color: #ffffff;
        padding: 0.55rem 1rem;
        border-radius: 50px;
        font-size: 0.85rem;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.45rem;
        transition: all 0.3s ease;
      }

      .lang-switch-btn:hover {
        background: rgba(230, 57, 70, 0.2);
        border-color: var(--accent-red);
        color: #ffffff;
      }

      .header-btn {
        padding: 0.65rem 1.4rem;
        font-size: 0.9rem;
      }

      .admin-btn {
        background: rgba(255, 215, 0, 0.15);
        border-color: rgba(255, 215, 0, 0.4);
        color: #ffd700;
      }

      .admin-btn:hover {
        background: rgba(255, 215, 0, 0.25);
        color: #ffffff;
      }

      .mobile-toggle {
        display: none;
        background: transparent;
        border: none;
        color: #ffffff;
        font-size: 1.5rem;
        cursor: pointer;
      }

      .mobile-drawer {
        display: none;
        position: fixed;
        top: 70px;
        left: 0;
        right: 0;
        background: rgba(18, 20, 32, 0.96);
        backdrop-filter: blur(20px);
        padding: 2rem 1.5rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        transform: translateY(-120%);
        transition: transform 0.35s ease;
        z-index: 999;
      }

      .mobile-drawer.open {
        transform: translateY(0);
      }

      .mobile-nav {
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
      }

      .mobile-nav a {
        font-size: 1.1rem;
        font-weight: 600;
        color: var(--text-primary);
      }

      .mobile-admin-link {
        color: #ffd700 !important;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      .mobile-lang-btn {
        justify-content: center;
        padding: 0.8rem;
        margin-top: 0.5rem;
      }

      .drawer-btn {
        margin-top: 0.5rem;
        text-align: center;
      }

      .text-gold {
        color: #ffd700;
      }

      @media (max-width: 992px) {
        .desktop-nav {
          display: none;
        }
        .mobile-toggle {
          display: block;
        }
        .mobile-drawer {
          display: block;
        }
      }
    `,
  ],
})
export class HeaderComponent {
  langService = inject(LanguageService);
  authService = inject(AdminAuthService);
  isScrolled = signal(false);
  isMobileMenuOpen = signal(false);

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled.set(window.scrollY > 30);
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.update((v) => !v);
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
  }
}
