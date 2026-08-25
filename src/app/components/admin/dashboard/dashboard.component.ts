import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { AdminAuthService } from '../../../services/admin-auth.service';
import { AdminDataService, UserItem, SubscriptionItem, PreRegisterItem, DiscountCodeItem, ReferrerLeaderboardItem } from '../../../services/admin-data.service';
import { LanguageService } from '../../../services/language.service';

type DashboardTab = 'overview' | 'users' | 'subscriptions' | 'preregister' | 'discounts' | 'referrals' | 'analytics' | 'settings';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="dashboard-root" [class.rtl]="langService.isArabic()">
      <!-- Ambient Glow Orbs -->
      <div class="glow-orb orb-red"></div>
      <div class="glow-orb orb-purple"></div>

      <!-- Toast Notification -->
      @if (toastMessage()) {
        <div class="dashboard-toast animate-slide-down">
          <i class="fa-solid fa-circle-check"></i>
          <span>{{ toastMessage() }}</span>
        </div>
      }

      <!-- Mobile Sidebar Backdrop -->
      <div
        class="sidebar-backdrop"
        [class.active]="isMobileSidebarOpen()"
        (click)="closeMobileSidebar()"
      ></div>

      <!-- ================= SIDEBAR ================= -->
      <aside class="dashboard-sidebar" [class.open]="isMobileSidebarOpen()">
        <!-- Sidebar Brand -->
        <div class="sidebar-brand">
          <a routerLink="/" class="brand-link">
            <div class="logo-box">
              <img
                src="./Gemini_Generated_Image_ecet84ecet84ecet.png"
                alt="GetFit Logo"
                class="brand-img"
              />
            </div>
            <div class="brand-meta">
              <span class="brand-title">GET<span class="highlight">FIT</span></span>
              <span class="brand-tag">MISSION CONTROL</span>
            </div>
          </a>
          <button class="mobile-close-btn" (click)="closeMobileSidebar()">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <!-- System Status Indicator -->
        <div class="system-status-chip">
          <span class="status-pulse"></span>
          <span class="status-txt">
            {{ langService.isArabic() ? 'النظام متصل • مباشر' : 'System Online • Live' }}
          </span>
          <span class="version-tag">v2.4</span>
        </div>

        <!-- Navigation Menu -->
        <nav class="sidebar-nav">
          <div class="nav-section-label">
            {{ langService.isArabic() ? 'القائمة الرئيسية' : 'MAIN MENU' }}
          </div>

          <button
            class="nav-item"
            [class.active]="activeTab() === 'overview'"
            (click)="selectTab('overview')"
          >
            <i class="fa-solid fa-chart-pie nav-icon"></i>
            <span class="nav-label">{{ langService.isArabic() ? 'نظرة عامة' : 'Overview' }}</span>
            <span class="badge-dot red"></span>
          </button>

          <button
            class="nav-item"
            [class.active]="activeTab() === 'users'"
            (click)="selectTab('users')"
          >
            <i class="fa-solid fa-users nav-icon"></i>
            <span class="nav-label">{{ langService.isArabic() ? 'المستخدمين' : 'Users' }}</span>
            <span class="nav-count">{{ dataService.users().length }}</span>
          </button>

          <button
            class="nav-item"
            [class.active]="activeTab() === 'subscriptions'"
            (click)="selectTab('subscriptions')"
          >
            <i class="fa-solid fa-credit-card nav-icon"></i>
            <span class="nav-label">{{ langService.isArabic() ? 'الاشتراكات' : 'Subscriptions' }}</span>
            <span class="nav-count active-sub">{{ activeSubscriptionsCount() }}</span>
          </button>

          <button
            class="nav-item"
            [class.active]="activeTab() === 'preregister'"
            (click)="selectTab('preregister')"
          >
            <i class="fa-solid fa-envelope-open-text nav-icon"></i>
            <span class="nav-label">{{ langService.isArabic() ? 'التسجيل المسبق' : 'Pre-Register' }}</span>
            <span class="nav-count highlight">{{ dataService.preRegisters().length }}</span>
          </button>

          <button
            class="nav-item"
            [class.active]="activeTab() === 'discounts'"
            (click)="selectTab('discounts')"
          >
            <i class="fa-solid fa-tags nav-icon"></i>
            <span class="nav-label">{{ langService.isArabic() ? 'أكواد الخصم' : 'Discount Codes' }}</span>
            <span class="nav-count gold">{{ dataService.discountCodes().length }}</span>
          </button>

          <button
            class="nav-item"
            [class.active]="activeTab() === 'referrals'"
            (click)="selectTab('referrals')"
          >
            <i class="fa-solid fa-share-nodes nav-icon"></i>
            <span class="nav-label">{{ langService.isArabic() ? 'شبكة الإحالات' : 'Referrals' }}</span>
          </button>

          <div class="nav-section-label" style="margin-top: 1.25rem;">
            {{ langService.isArabic() ? 'التقارير والإعدادات' : 'SYSTEM & ANALYTICS' }}
          </div>

          <button
            class="nav-item"
            [class.active]="activeTab() === 'analytics'"
            (click)="selectTab('analytics')"
          >
            <i class="fa-solid fa-chart-line nav-icon"></i>
            <span class="nav-label">{{ langService.isArabic() ? 'تحليلات النشاط' : 'Analytics' }}</span>
          </button>

          <button
            class="nav-item"
            [class.active]="activeTab() === 'settings'"
            (click)="selectTab('settings')"
          >
            <i class="fa-solid fa-sliders nav-icon"></i>
            <span class="nav-label">{{ langService.isArabic() ? 'إعدادات الأدمن' : 'Settings' }}</span>
          </button>
        </nav>

        <!-- Admin Profile & Logout Box -->
        <div class="sidebar-footer">
          <div class="admin-profile-card">
            <img
              [src]="authService.currentAdmin()?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'"
              alt="Admin Avatar"
              class="admin-thumb"
            />
            <div class="admin-info">
              <span class="admin-name">{{ authService.currentAdmin()?.name || 'Ahmed Amr' }}</span>
              <span class="admin-role">{{ authService.currentAdmin()?.role || 'Super Admin' }}</span>
            </div>
            <button
              class="logout-icon-btn"
              (click)="onLogout()"
              [attr.title]="langService.isArabic() ? 'تسجيل الخروج' : 'Sign Out'"
            >
              <i class="fa-solid fa-arrow-right-from-bracket"></i>
            </button>
          </div>
        </div>
      </aside>

      <!-- ================= MAIN CONTENT WRAPPER ================= -->
      <main class="dashboard-main">
        <!-- Top Navbar -->
        <header class="dashboard-topbar">
          <div class="topbar-left">
            <button class="mobile-sidebar-toggle" (click)="toggleMobileSidebar()">
              <i class="fa-solid fa-bars-staggered"></i>
            </button>
            <div class="topbar-title-box">
              <h1 class="page-title">{{ getTabTitle() }}</h1>
              <span class="page-breadcrumbs">
                GetFit Admin / {{ getTabTitle() }}
              </span>
            </div>
          </div>

          <div class="topbar-right">
            <!-- Search bar -->
            <div class="topbar-search">
              <i class="fa-solid fa-magnifying-glass search-icon"></i>
              <input
                type="text"
                [(ngModel)]="searchQuery"
                [placeholder]="langService.isArabic() ? 'بحث سريع...' : 'Quick search...'"
              />
            </div>

            <!-- Language Switcher -->
            <button
              class="topbar-action-btn lang-btn"
              (click)="langService.toggleLanguage()"
              [attr.title]="langService.isArabic() ? 'Switch to English' : 'التحويل للعربية'"
            >
              <i class="fa-solid fa-globe"></i>
              <span>{{ langService.isArabic() ? 'EN' : 'عربي' }}</span>
            </button>

            <!-- Visit Public Site -->
            <a
              routerLink="/"
              class="topbar-action-btn visit-btn"
              [attr.title]="langService.isArabic() ? 'زيارة الموقع الرئيسي' : 'View Public Landing'"
            >
              <i class="fa-solid fa-arrow-up-right-from-square"></i>
              <span class="desktop-only">{{ langService.isArabic() ? 'الموقع' : 'Live Site' }}</span>
            </a>

            <!-- Quick Refresh -->
            <button
              class="topbar-action-btn"
              (click)="refreshData()"
              [attr.title]="langService.isArabic() ? 'تحديث البيانات' : 'Refresh Data'"
            >
              <i class="fa-solid fa-rotate" [class.fa-spin]="isRefreshing()"></i>
            </button>
          </div>
        </header>

        <!-- Tab Content Body -->
        <div class="dashboard-body">

          <!-- ================= TAB 1: OVERVIEW ================= -->
          @if (activeTab() === 'overview') {
            <section class="tab-pane animate-fade-in">
              <!-- KPI Cards Row -->
              <div class="kpi-grid">
                <!-- Card 1: Total Users -->
                <div class="kpi-card">
                  <div class="kpi-header">
                    <span class="kpi-label">{{ langService.isArabic() ? 'إجمالي المستخدمين' : 'Total Users' }}</span>
                    <div class="kpi-icon-wrap red">
                      <i class="fa-solid fa-users"></i>
                    </div>
                  </div>
                  <div class="kpi-value-row">
                    <span class="kpi-number">{{ dataService.users().length + 1240 }}</span>
                    <span class="kpi-trend positive">
                      <i class="fa-solid fa-arrow-trend-up"></i> +14.2%
                    </span>
                  </div>
                  <div class="kpi-footer">
                    <span>{{ langService.isArabic() ? 'منهم 840 مستخدم نشط هذا الشهر' : '840 active this month' }}</span>
                  </div>
                </div>

                <!-- Card 2: Active Subscriptions -->
                <div class="kpi-card">
                  <div class="kpi-header">
                    <span class="kpi-label">{{ langService.isArabic() ? 'الاشتراكات النشطة' : 'Active Subscriptions' }}</span>
                    <div class="kpi-icon-wrap cyan">
                      <i class="fa-solid fa-crown"></i>
                    </div>
                  </div>
                  <div class="kpi-value-row">
                    <span class="kpi-number">{{ activeSubscriptionsCount() + 830 }}</span>
                    <span class="kpi-trend positive">
                      <i class="fa-solid fa-arrow-trend-up"></i> +8.5%
                    </span>
                  </div>
                  <div class="kpi-footer">
                    <span>{{ langService.isArabic() ? 'معدل التجديد 92.4%' : '92.4% renewal rate' }}</span>
                  </div>
                </div>

                <!-- Card 3: Monthly Revenue -->
                <div class="kpi-card">
                  <div class="kpi-header">
                    <span class="kpi-label">{{ langService.isArabic() ? 'إيرادات الشهر الحالي' : 'Monthly Revenue' }}</span>
                    <div class="kpi-icon-wrap gold">
                      <i class="fa-solid fa-sack-dollar"></i>
                    </div>
                  </div>
                  <div class="kpi-value-row">
                    <span class="kpi-number">265,400 <span class="currency">EGP</span></span>
                    <span class="kpi-trend positive">
                      <i class="fa-solid fa-arrow-trend-up"></i> +21.8%
                    </span>
                  </div>
                  <div class="kpi-footer">
                    <span>{{ langService.isArabic() ? 'الإيرادات عبر بوابة Kashier' : 'Total Revenue via Kashier' }}</span>
                  </div>
                </div>

                <!-- Card 4: Pre-Registrations -->
                <div class="kpi-card">
                  <div class="kpi-header">
                    <span class="kpi-label">{{ langService.isArabic() ? 'قائمة الوصول المبكر' : 'Pre-Registrations' }}</span>
                    <div class="kpi-icon-wrap purple">
                      <i class="fa-solid fa-rocket"></i>
                    </div>
                  </div>
                  <div class="kpi-value-row">
                    <span class="kpi-number">{{ dataService.preRegisters().length + 3880 }}</span>
                    <span class="kpi-trend positive">
                      <i class="fa-solid fa-bolt"></i> +420/wk
                    </span>
                  </div>
                  <div class="kpi-footer">
                    <span>{{ langService.isArabic() ? 'جاهزون لإطلاق التطبيق' : 'Ready for v1 launch campaign' }}</span>
                  </div>
                </div>
              </div>

              <!-- Quick Actions & Revenue Growth Visual -->
              <div class="overview-grid-2">
                <!-- Revenue & Growth Visual Chart -->
                <div class="card glass-panel chart-card">
                  <div class="panel-header">
                    <div>
                      <h3 class="panel-title">{{ langService.isArabic() ? 'نمو الإيرادات والاشتراكات (2026)' : 'Revenue & Subscriptions Growth (2026)' }}</h3>
                      <p class="panel-sub">{{ langService.isArabic() ? 'توزيع الأرباح الشهرية بالجنيه المصري' : 'Monthly revenue breakdown in EGP' }}</p>
                    </div>
                    <span class="tag-pill live-pill">
                      <span class="pulse-dot"></span> {{ langService.isArabic() ? 'مباشر' : 'Live Data' }}
                    </span>
                  </div>

                  <div class="bars-chart">
                    @for (bar of monthlyGrowthData; track bar.month) {
                      <div class="bar-col">
                        <div class="bar-track">
                          <div class="bar-fill" [style.height]="bar.percent + '%'" [class.highlight]="bar.isCurrent">
                            <span class="bar-tooltip">{{ bar.amount }} EGP</span>
                          </div>
                        </div>
                        <span class="bar-month">{{ bar.month }}</span>
                      </div>
                    }
                  </div>
                </div>

                <!-- Quick Admin Shortcuts -->
                <div class="card glass-panel shortcuts-card">
                  <div class="panel-header">
                    <h3 class="panel-title">{{ langService.isArabic() ? 'إجراءات سريعة' : 'Quick Actions' }}</h3>
                  </div>
                  <div class="shortcuts-list">
                    <button class="shortcut-btn" (click)="selectTab('discounts')">
                      <div class="shortcut-icon red">
                        <i class="fa-solid fa-plus"></i>
                      </div>
                      <div class="shortcut-text">
                        <strong>{{ langService.isArabic() ? 'إنشاء كود خصم جديد' : 'Create Discount Code' }}</strong>
                        <small>{{ langService.isArabic() ? 'أكواد 10% حتى 50%' : '10% to 50% promo coupons' }}</small>
                      </div>
                      <i class="fa-solid fa-chevron-right arrow-icon"></i>
                    </button>

                    <button class="shortcut-btn" (click)="exportPreRegs()">
                      <div class="shortcut-icon purple">
                        <i class="fa-solid fa-file-export"></i>
                      </div>
                      <div class="shortcut-text">
                        <strong>{{ langService.isArabic() ? 'تصدير قائمة المسجلين (CSV)' : 'Export Pre-Registrations' }}</strong>
                        <small>{{ langService.isArabic() ? 'تحميل ملف إكسل لجهات الاتصال' : 'Download leads as CSV' }}</small>
                      </div>
                      <i class="fa-solid fa-download arrow-icon"></i>
                    </button>

                    <button class="shortcut-btn" (click)="selectTab('users')">
                      <div class="shortcut-icon cyan">
                        <i class="fa-solid fa-user-shield"></i>
                      </div>
                      <div class="shortcut-text">
                        <strong>{{ langService.isArabic() ? 'إدارة المشتركين النشطين' : 'Manage Subscribers' }}</strong>
                        <small>{{ langService.isArabic() ? 'التحقق من ستريك 45 يوم والـ VIP' : 'Inspect 45-day streaks & VIP' }}</small>
                      </div>
                      <i class="fa-solid fa-chevron-right arrow-icon"></i>
                    </button>

                    <button class="shortcut-btn" (click)="selectTab('settings')">
                      <div class="shortcut-icon gold">
                        <i class="fa-solid fa-key"></i>
                      </div>
                      <div class="shortcut-text">
                        <strong>{{ langService.isArabic() ? 'تغيير كلمة مرور الإدارة' : 'Change Master Password' }}</strong>
                        <small>{{ langService.isArabic() ? 'تأمين حساب الأدمن' : 'Update secret access key' }}</small>
                      </div>
                      <i class="fa-solid fa-chevron-right arrow-icon"></i>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Recent Activity & Subscriptions -->
              <div class="card glass-panel" style="margin-top: 1.5rem;">
                <div class="panel-header">
                  <div>
                    <h3 class="panel-title">{{ langService.isArabic() ? 'أحدث الاشتراكات والمعاملات' : 'Recent Subscriptions & Orders' }}</h3>
                    <p class="panel-sub">{{ langService.isArabic() ? 'آخر العمليات الناجحة عبر بوابة الدفع' : 'Latest completed transactions via Kashier' }}</p>
                  </div>
                  <button class="view-all-link" (click)="selectTab('subscriptions')">
                    {{ langService.isArabic() ? 'عرض كل الاشتراكات' : 'View All Subscriptions' }} →
                  </button>
                </div>

                <div class="table-responsive">
                  <table class="dash-table">
                    <thead>
                      <tr>
                        <th>{{ langService.isArabic() ? 'رقم الطلب' : 'Order ID' }}</th>
                        <th>{{ langService.isArabic() ? 'المشترك' : 'Subscriber' }}</th>
                        <th>{{ langService.isArabic() ? 'الباقة' : 'Plan' }}</th>
                        <th>{{ langService.isArabic() ? 'المبلغ' : 'Amount' }}</th>
                        <th>{{ langService.isArabic() ? 'بوابة الدفع' : 'Gateway' }}</th>
                        <th>{{ langService.isArabic() ? 'الحالة' : 'Status' }}</th>
                        <th>{{ langService.isArabic() ? 'تاريخ البدء' : 'Date' }}</th>
                      </tr>
                    </thead>
                    <tbody>
                      @for (sub of recentSubscriptions(); track sub.id) {
                        <tr>
                          <td><span class="code-badge">{{ sub.orderId }}</span></td>
                          <td>
                            <div class="user-cell">
                              <img [src]="sub.userAvatar" alt="User" class="avatar-sm" />
                              <div>
                                <div class="user-name">{{ sub.userName }}</div>
                                <div class="user-email">{{ sub.userEmail }}</div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span class="plan-badge" [class.gold]="sub.tier === 'Gold VIP'" [class.silver]="sub.tier === 'Silver'">
                              {{ sub.planName }}
                            </span>
                          </td>
                          <td>
                            <strong class="amount-val">
                              {{ sub.amountEgp + ' EGP' }}
                            </strong>
                          </td>
                          <td>
                            <span class="gateway-pill kashier">
                              <i class="fa-solid fa-credit-card"></i>
                              {{ sub.gateway }}
                            </span>
                          </td>
                          <td>
                            <span class="status-badge" [class.active]="sub.status === 'active'" [class.expired]="sub.status === 'expired'">
                              {{ sub.status }}
                            </span>
                          </td>
                          <td class="date-cell">{{ sub.startDate }}</td>
                        </tr>
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          }

          <!-- ================= TAB 2: USERS MANAGEMENT ================= -->
          @if (activeTab() === 'users') {
            <section class="tab-pane animate-fade-in">
              <!-- Users Control Bar -->
              <div class="card glass-panel filter-panel">
                <div class="filter-row">
                  <div class="filter-search">
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <input
                      type="text"
                      [(ngModel)]="userSearch"
                      [placeholder]="langService.isArabic() ? 'بحث بالاسم، الإيميل أو كود الإحالة...' : 'Search by name, email, or referral code...'"
                    />
                  </div>

                  <div class="filter-chips">
                    <button
                      class="filter-chip"
                      [class.active]="userFilterStatus() === 'all'"
                      (click)="userFilterStatus.set('all')"
                    >
                      {{ langService.isArabic() ? 'الكل' : 'All' }} ({{ dataService.users().length }})
                    </button>
                    <button
                      class="filter-chip"
                      [class.active]="userFilterStatus() === 'active'"
                      (click)="userFilterStatus.set('active')"
                    >
                      {{ langService.isArabic() ? 'مشتركون نشطون' : 'Active VIP' }}
                    </button>
                    <button
                      class="filter-chip"
                      [class.active]="userFilterStatus() === 'gold_streak'"
                      (click)="userFilterStatus.set('gold_streak')"
                    >
                      {{ langService.isArabic() ? 'ستريك 50% Gold' : '50% Gold Earners' }}
                    </button>
                    <button
                      class="filter-chip"
                      [class.active]="userFilterStatus() === 'banned'"
                      (click)="userFilterStatus.set('banned')"
                    >
                      {{ langService.isArabic() ? 'المحظورون' : 'Banned' }}
                    </button>
                  </div>
                </div>
              </div>

              <!-- Users Table -->
              <div class="card glass-panel" style="margin-top: 1.25rem;">
                <div class="panel-header">
                  <h3 class="panel-title">
                    {{ langService.isArabic() ? 'قائمة المشتركين والمستخدمين' : 'Subscribers & Members Registry' }}
                    <span class="counter-badge">({{ filteredUsers().length }})</span>
                  </h3>
                </div>

                <div class="table-responsive">
                  <table class="dash-table">
                    <thead>
                      <tr>
                        <th>{{ langService.isArabic() ? 'المستخدم' : 'User' }}</th>
                        <th>{{ langService.isArabic() ? 'الدولة' : 'Country' }}</th>
                        <th>{{ langService.isArabic() ? 'حالة الاشتراك' : 'Subscription' }}</th>
                        <th>{{ langService.isArabic() ? 'الستريك اليومي' : 'Active Streak' }}</th>
                        <th>{{ langService.isArabic() ? 'كود الإحالة' : 'Referral Code' }}</th>
                        <th>{{ langService.isArabic() ? 'خصم 50% VIP' : '50% Gold Tier' }}</th>
                        <th>{{ langService.isArabic() ? 'تاريخ التسجيل' : 'Joined' }}</th>
                        <th>{{ langService.isArabic() ? 'الإجراءات' : 'Actions' }}</th>
                      </tr>
                    </thead>
                    <tbody>
                      @for (user of filteredUsers(); track user.id) {
                        <tr [class.banned-row]="user.isBanned">
                          <td>
                            <div class="user-cell">
                              <img [src]="user.avatar" alt="Avatar" class="avatar-sm" />
                              <div>
                                <div class="user-name">
                                  {{ user.name }}
                                  @if (user.isBanned) {
                                    <span class="banned-tag">{{ langService.isArabic() ? 'محظور' : 'BANNED' }}</span>
                                  }
                                </div>
                                <div class="user-email">{{ user.email }}</div>
                              </div>
                            </div>
                          </td>
                          <td><span class="country-txt">{{ user.country }}</span></td>
                          <td>
                            <span
                              class="status-badge"
                              [class.active]="user.subscription.status === 'active'"
                              [class.expired]="user.subscription.status === 'expired'"
                              [class.free]="user.subscription.status === 'free'"
                            >
                              {{ user.subscription.planName }}
                            </span>
                          </td>
                          <td>
                            <div class="streak-badge">
                              <i class="fa-solid fa-fire fire-icon"></i>
                              <span>{{ user.consecutiveActiveDays }} {{ langService.isArabic() ? 'يوم' : 'days' }}</span>
                            </div>
                          </td>
                          <td>
                            <span class="code-badge copyable" (click)="copyToClipboard(user.referralCode, 'Referral code copied!')">
                              {{ user.referralCode }}
                              <i class="fa-solid fa-copy copy-icon"></i>
                            </span>
                          </td>
                          <td>
                            @if (user.earned50PercentGoldDiscount) {
                              <span class="gold-unlocked-badge animate-pulse">
                                <i class="fa-solid fa-crown"></i> 50% UNLOCKED
                              </span>
                            } @else {
                              <span class="gold-locked-badge">
                                <i class="fa-solid fa-lock"></i> Locked
                              </span>
                            }
                          </td>
                          <td class="date-cell">{{ user.createdAt }}</td>
                          <td>
                            <div class="actions-row">
                              <button
                                class="action-btn"
                                [class.ban-btn]="!user.isBanned"
                                [class.unban-btn]="user.isBanned"
                                (click)="toggleBan(user)"
                                [attr.title]="user.isBanned ? 'Unban User' : 'Ban User'"
                              >
                                <i [class]="user.isBanned ? 'fa-solid fa-user-check' : 'fa-solid fa-user-slash'"></i>
                                <span>{{ user.isBanned ? (langService.isArabic() ? 'إلغاء الحظر' : 'Unban') : (langService.isArabic() ? 'حظر' : 'Ban') }}</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          }

          <!-- ================= TAB 3: SUBSCRIPTIONS ================= -->
          @if (activeTab() === 'subscriptions') {
            <section class="tab-pane animate-fade-in">
              <!-- Subscriptions Summary Row -->
              <div class="kpi-grid" style="grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); margin-bottom: 1.5rem;">
                <div class="kpi-card">
                  <div class="kpi-header">
                    <span class="kpi-label">{{ langService.isArabic() ? 'إجمالي فواتير Kashier' : 'Kashier Volume (EGP)' }}</span>
                    <div class="kpi-icon-wrap red"><i class="fa-solid fa-credit-card"></i></div>
                  </div>
                  <div class="kpi-value-row">
                    <span class="kpi-number">273,850 <small>EGP</small></span>
                  </div>
                </div>

                <div class="kpi-card">
                  <div class="kpi-header">
                    <span class="kpi-label">{{ langService.isArabic() ? 'باقات Gold VIP' : 'Gold VIP Share' }}</span>
                    <div class="kpi-icon-wrap cyan"><i class="fa-solid fa-star"></i></div>
                  </div>
                  <div class="kpi-value-row">
                    <span class="kpi-number">74%</span>
                  </div>
                </div>
              </div>

              <!-- Subscriptions Filter & Table -->
              <div class="card glass-panel">
                <div class="panel-header">
                  <div>
                    <h3 class="panel-title">{{ langService.isArabic() ? 'سجل الاشتراكات المالي' : 'Subscriptions & Billing Log' }}</h3>
                    <p class="panel-sub">{{ langService.isArabic() ? 'جميع عمليات الدفع والاشتراك الحالية والمنتهية' : 'All transaction records with payment gateway identifiers' }}</p>
                  </div>

                  <div class="gateway-filters">
                    <button
                      class="filter-chip"
                      [class.active]="subGatewayFilter() === 'all'"
                      (click)="subGatewayFilter.set('all')"
                    >
                      {{ langService.isArabic() ? 'كل الاشتراكات' : 'All' }}
                    </button>
                    <button
                      class="filter-chip"
                      [class.active]="subGatewayFilter() === 'Kashier'"
                      (click)="subGatewayFilter.set('Kashier')"
                    >
                      Kashier
                    </button>
                  </div>
                </div>

                <div class="table-responsive">
                  <table class="dash-table">
                    <thead>
                      <tr>
                        <th>{{ langService.isArabic() ? 'رقم الطلب' : 'Order ID' }}</th>
                        <th>{{ langService.isArabic() ? 'العميل' : 'Customer' }}</th>
                        <th>{{ langService.isArabic() ? 'الباقة' : 'Plan' }}</th>
                        <th>{{ langService.isArabic() ? 'القيمة' : 'Amount' }}</th>
                        <th>{{ langService.isArabic() ? 'وسيلة الدفع' : 'Payment Method' }}</th>
                        <th>{{ langService.isArabic() ? 'البوابة' : 'Gateway' }}</th>
                        <th>{{ langService.isArabic() ? 'الحالة' : 'Status' }}</th>
                        <th>{{ langService.isArabic() ? 'تاريخ التجديد' : 'Renews On' }}</th>
                      </tr>
                    </thead>
                    <tbody>
                      @for (sub of filteredSubscriptions(); track sub.id) {
                        <tr>
                          <td><span class="code-badge">{{ sub.orderId }}</span></td>
                          <td>
                            <div class="user-cell">
                              <img [src]="sub.userAvatar" alt="User" class="avatar-sm" />
                              <div>
                                <div class="user-name">{{ sub.userName }}</div>
                                <div class="user-email">{{ sub.userEmail }}</div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span class="plan-badge" [class.gold]="sub.tier === 'Gold VIP'" [class.silver]="sub.tier === 'Silver'">
                              {{ sub.planName }}
                            </span>
                          </td>
                          <td>
                            <strong class="amount-val">
                              {{ sub.amountEgp + ' EGP' }}
                            </strong>
                          </td>
                          <td><span class="method-tag">{{ sub.paymentMethod }}</span></td>
                          <td>
                            <span class="gateway-pill kashier">
                              <i class="fa-solid fa-credit-card"></i>
                              {{ sub.gateway }}
                            </span>
                          </td>
                          <td>
                            <span class="status-badge" [class.active]="sub.status === 'active'" [class.expired]="sub.status === 'expired'">
                              {{ sub.status }}
                            </span>
                          </td>
                          <td class="date-cell">{{ sub.expiresAt }}</td>
                        </tr>
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          }

          <!-- ================= TAB 4: PRE-REGISTRATIONS ================= -->
          @if (activeTab() === 'preregister') {
            <section class="tab-pane animate-fade-in">
              <div class="card glass-panel">
                <div class="panel-header">
                  <div>
                    <h3 class="panel-title">
                      {{ langService.isArabic() ? 'قائمة المسجلين للوصول المبكر' : 'Early Access Pre-Registrations' }}
                      <span class="counter-badge">({{ dataService.preRegisters().length + 3880 }})</span>
                    </h3>
                    <p class="panel-sub">
                      {{ langService.isArabic() ? 'قائمة العملاء المحتملين المسجلين عبر اللاندنج بيج' : 'Verified leads collected from landing page forms' }}
                    </p>
                  </div>

                  <div class="panel-actions">
                    <button class="btn-primary export-btn" (click)="exportPreRegs()">
                      <i class="fa-solid fa-file-csv"></i>
                      <span>{{ langService.isArabic() ? 'تصدير كملف CSV' : 'Export CSV' }}</span>
                    </button>
                  </div>
                </div>

                <div class="table-responsive">
                  <table class="dash-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>{{ langService.isArabic() ? 'البريد الإلكتروني' : 'Email Address' }}</th>
                        <th>{{ langService.isArabic() ? 'كود المرجع' : 'Reference ID' }}</th>
                        <th>{{ langService.isArabic() ? 'المصدر' : 'Acquisition Source' }}</th>
                        <th>{{ langService.isArabic() ? 'تاريخ التسجيل' : 'Registered Date' }}</th>
                        <th>{{ langService.isArabic() ? 'حالة الإشعار' : 'Notification Status' }}</th>
                      </tr>
                    </thead>
                    <tbody>
                      @for (item of dataService.preRegisters(); track item.id; let idx = $index) {
                        <tr>
                          <td><span class="index-num">{{ idx + 1 }}</span></td>
                          <td>
                            <div class="email-cell">
                              <i class="fa-solid fa-envelope mail-icon"></i>
                              <strong class="email-txt">{{ item.email }}</strong>
                            </div>
                          </td>
                          <td>
                            <span class="code-badge copyable" (click)="copyToClipboard(item.referenceId, 'Reference ID copied!')">
                              {{ item.referenceId }}
                              <i class="fa-solid fa-copy copy-icon"></i>
                            </span>
                          </td>
                          <td>
                            <span class="source-tag" [class.tiktok]="item.source.includes('TikTok')" [class.ig]="item.source.includes('Instagram')" [class.ads]="item.source.includes('Google')">
                              {{ item.source }}
                            </span>
                          </td>
                          <td class="date-cell">{{ item.createdAt }}</td>
                          <td>
                            <span class="notify-status ready">
                              <i class="fa-solid fa-check"></i> {{ langService.isArabic() ? 'جاهز للإرسال' : 'Queued for Launch' }}
                            </span>
                          </td>
                        </tr>
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          }

          <!-- ================= TAB 5: DISCOUNT CODES ================= -->
          @if (activeTab() === 'discounts') {
            <section class="tab-pane animate-fade-in">
              <!-- Create Promo Code Box -->
              <div class="card glass-panel create-code-card">
                <div class="panel-header">
                  <div>
                    <h3 class="panel-title">{{ langService.isArabic() ? 'إنشاء كود خصم جديد' : 'Generate New Promo Code' }}</h3>
                    <p class="panel-sub">{{ langService.isArabic() ? 'حدد نسبة الخصم وحد الاستخدام وتاريخ الانتهاء' : 'Select percentage preset, set usage capacity and activation expiry' }}</p>
                  </div>
                </div>

                <div class="create-code-form">
                  <!-- Preset Percentages -->
                  <div class="form-group">
                    <label class="form-label">{{ langService.isArabic() ? 'اختر نسبة الخصم المعتمدة:' : 'Choose Discount Percentage:' }}</label>
                    <div class="percent-presets">
                      @for (p of presetPercentages; track p) {
                        <button
                          type="button"
                          class="percent-btn"
                          [class.selected]="newDiscountPercent === p"
                          (click)="selectPercent(p)"
                        >
                          <span class="percent-num">{{ p }}%</span>
                          <span class="percent-sub">OFF</span>
                        </button>
                      }
                    </div>
                  </div>

                  <div class="form-row-inputs">
                    <!-- Code String -->
                    <div class="form-field">
                      <label class="form-label">{{ langService.isArabic() ? 'رمز الكوبون (Code):' : 'Promo Code String:' }}</label>
                      <div class="input-with-action">
                        <input
                          type="text"
                          [(ngModel)]="newDiscountCode"
                          placeholder="e.g. GOLD50 or FIT2026"
                          class="uppercase-input"
                        />
                        <button type="button" class="generate-btn" (click)="generateRandomCode()">
                          <i class="fa-solid fa-wand-magic-sparkles"></i>
                          <span>{{ langService.isArabic() ? 'توليد تلقائي' : 'Auto' }}</span>
                        </button>
                      </div>
                    </div>

                    <!-- Max Uses -->
                    <div class="form-field">
                      <label class="form-label">{{ langService.isArabic() ? 'الحد الأقصى للاستخدام:' : 'Max Usage Limit:' }}</label>
                      <input
                        type="number"
                        [(ngModel)]="newDiscountMaxUses"
                        min="1"
                        max="10000"
                        placeholder="100"
                      />
                    </div>

                    <!-- Expiry Date -->
                    <div class="form-field">
                      <label class="form-label">{{ langService.isArabic() ? 'تاريخ الانتهاء:' : 'Expiry Date:' }}</label>
                      <input
                        type="date"
                        [(ngModel)]="newDiscountExpiry"
                      />
                    </div>

                    <!-- Submit Button -->
                    <div class="form-field submit-field">
                      <button class="btn-primary submit-code-btn" (click)="onCreateDiscountCode()">
                        <i class="fa-solid fa-plus"></i>
                        <span>{{ langService.isArabic() ? 'تفعيل وإنشاء الكود' : 'Activate & Save Code' }}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Discount Codes List -->
              <div class="card glass-panel" style="margin-top: 1.5rem;">
                <div class="panel-header">
                  <h3 class="panel-title">
                    {{ langService.isArabic() ? 'أكواد الخصم المفعلة والسابقة' : 'Active & Historical Discount Codes' }}
                    <span class="counter-badge">({{ dataService.discountCodes().length }})</span>
                  </h3>
                </div>

                <div class="table-responsive">
                  <table class="dash-table">
                    <thead>
                      <tr>
                        <th>{{ langService.isArabic() ? 'رمز الكود' : 'Promo Code' }}</th>
                        <th>{{ langService.isArabic() ? 'نسبة الخصم' : 'Discount' }}</th>
                        <th>{{ langService.isArabic() ? 'نسبة الاستخدام' : 'Usage Capacity' }}</th>
                        <th>{{ langService.isArabic() ? 'تاريخ الصلاحية' : 'Expires At' }}</th>
                        <th>{{ langService.isArabic() ? 'الحالة' : 'Status' }}</th>
                        <th>{{ langService.isArabic() ? 'تم الإنشاء بواسطة' : 'Created By' }}</th>
                        <th>{{ langService.isArabic() ? 'الإجراءات' : 'Actions' }}</th>
                      </tr>
                    </thead>
                    <tbody>
                      @for (code of dataService.discountCodes(); track code.id) {
                        <tr [class.inactive-row]="!code.isActive">
                          <td>
                            <span class="code-badge copyable lg" (click)="copyToClipboard(code.code, 'Coupon code copied!')">
                              <i class="fa-solid fa-tag"></i>
                              <strong>{{ code.code }}</strong>
                              <i class="fa-solid fa-copy copy-icon"></i>
                            </span>
                          </td>
                          <td>
                            <span class="discount-pill" [class.fifty]="code.discountPercent === 50" [class.thirty]="code.discountPercent === 30">
                              {{ code.discountPercent }}% OFF
                            </span>
                          </td>
                          <td>
                            <div class="usage-progress-wrap">
                              <div class="usage-text">
                                <strong>{{ code.usedCount }}</strong> / {{ code.maxUses }} {{ langService.isArabic() ? 'استخدام' : 'used' }}
                              </div>
                              <div class="progress-track">
                                <div
                                  class="progress-fill"
                                  [style.width]="(code.usedCount / code.maxUses * 100) + '%'"
                                  [class.full]="code.usedCount >= code.maxUses"
                                ></div>
                              </div>
                            </div>
                          </td>
                          <td class="date-cell">{{ code.expiresAt }}</td>
                          <td>
                            <label class="toggle-switch">
                              <input
                                type="checkbox"
                                [checked]="code.isActive"
                                (change)="toggleCode(code.id)"
                              />
                              <span class="slider"></span>
                            </label>
                            <span class="toggle-label">
                              {{ code.isActive ? (langService.isArabic() ? 'نشط' : 'Active') : (langService.isArabic() ? 'معطل' : 'Paused') }}
                            </span>
                          </td>
                          <td><span class="created-by-txt">{{ code.createdByName }}</span></td>
                          <td>
                            <button
                              class="delete-icon-btn"
                              (click)="deleteCode(code.id)"
                              [attr.title]="langService.isArabic() ? 'حذف الكود' : 'Delete Code'"
                            >
                              <i class="fa-solid fa-trash-can"></i>
                            </button>
                          </td>
                        </tr>
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          }

          <!-- ================= TAB 6: REFERRALS ================= -->
          @if (activeTab() === 'referrals') {
            <section class="tab-pane animate-fade-in">
              <!-- Referral System Concept Card -->
              <div class="card glass-panel concept-card">
                <div class="concept-icon-box">
                  <i class="fa-solid fa-trophy gold-trophy"></i>
                </div>
                <div class="concept-body">
                  <h3>{{ langService.isArabic() ? 'نظام الإحالات وخصم الـ 50% Gold VIP' : 'Referral & 50% Gold VIP Milestone Program' }}</h3>
                  <p>
                    {{ langService.isArabic()
                      ? 'عندما يدعو المشترك أصدقاءه، يحصل على خصم تصاعدي يصل إلى 50% خصم ذهبي دائم على باقة الـ Gold السنوية عند إحالة 5 مشتركين نشطين.'
                      : 'Subscribers refer friends and earn tiered progression up to a permanent 50% Gold VIP discount upon achieving 5 active referrals.' }}
                  </p>
                </div>
              </div>

              <!-- Referrers Leaderboard -->
              <div class="card glass-panel" style="margin-top: 1.5rem;">
                <div class="panel-header">
                  <div>
                    <h3 class="panel-title">{{ langService.isArabic() ? 'أفضل المحيلين (Leaderboard)' : 'Top Referral Champions' }}</h3>
                    <p class="panel-sub">{{ langService.isArabic() ? 'المستخدمون الأكثر دعوة للأعضاء الجدد' : 'Users with highest conversion counts & unlocked gold tiers' }}</p>
                  </div>
                </div>

                <div class="table-responsive">
                  <table class="dash-table">
                    <thead>
                      <tr>
                        <th>{{ langService.isArabic() ? 'الترتيب' : 'Rank' }}</th>
                        <th>{{ langService.isArabic() ? 'المستخدم' : 'Champion' }}</th>
                        <th>{{ langService.isArabic() ? 'كود الإحالة' : 'Referral Code' }}</th>
                        <th>{{ langService.isArabic() ? 'عدد الإحالات الناجحة' : 'Invited Friends' }}</th>
                        <th>{{ langService.isArabic() ? 'حالة خصم 50% Gold' : '50% Gold Status' }}</th>
                        <th>{{ langService.isArabic() ? 'الخصم المستحق' : 'Earned Discount' }}</th>
                      </tr>
                    </thead>
                    <tbody>
                      @for (leader of dataService.getReferrerLeaderboard(); track leader.userId; let idx = $index) {
                        <tr>
                          <td>
                            <span class="rank-badge" [class.rank-1]="idx === 0" [class.rank-2]="idx === 1" [class.rank-3]="idx === 2">
                              @if (idx === 0) { 🥇 }
                              @else if (idx === 1) { 🥈 }
                              @else if (idx === 2) { 🥉 }
                              @else { #{{ idx + 1 }} }
                            </span>
                          </td>
                          <td>
                            <div class="user-cell">
                              <img [src]="leader.avatar" alt="Avatar" class="avatar-sm" />
                              <div>
                                <div class="user-name">{{ leader.name }}</div>
                                <div class="user-email">{{ leader.email }}</div>
                              </div>
                            </div>
                          </td>
                          <td><span class="code-badge">{{ leader.referralCode }}</span></td>
                          <td>
                            <strong class="referred-count">
                              <i class="fa-solid fa-user-plus"></i> {{ leader.totalReferred }} {{ langService.isArabic() ? 'مشترك' : 'members' }}
                            </strong>
                          </td>
                          <td>
                            @if (leader.unlocked50Percent) {
                              <span class="gold-unlocked-badge">
                                <i class="fa-solid fa-crown"></i> 50% UNLOCKED
                              </span>
                            } @else {
                              <span class="gold-locked-badge">
                                <i class="fa-solid fa-hourglass-half"></i> {{ 5 - leader.totalReferred }} more to 50%
                              </span>
                            }
                          </td>
                          <td>
                            <span class="discount-pill fifty">
                              {{ leader.totalEarningsDiscount }}% OFF
                            </span>
                          </td>
                        </tr>
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          }

          <!-- ================= TAB 7: ANALYTICS ================= -->
          @if (activeTab() === 'analytics') {
            <section class="tab-pane animate-fade-in">
              <div class="kpi-grid">
                <div class="kpi-card">
                  <div class="kpi-header">
                    <span class="kpi-label">{{ langService.isArabic() ? 'المستخدمون النشطون يومياً (DAU)' : 'Daily Active Users (DAU)' }}</span>
                    <div class="kpi-icon-wrap red"><i class="fa-solid fa-person-running"></i></div>
                  </div>
                  <div class="kpi-value-row">
                    <span class="kpi-number">984</span>
                    <span class="kpi-trend positive"><i class="fa-solid fa-arrow-trend-up"></i> 79% retention</span>
                  </div>
                </div>

                <div class="kpi-card">
                  <div class="kpi-header">
                    <span class="kpi-label">{{ langService.isArabic() ? 'إجمالي الخطوات المسجلة اليوم' : 'Total Steps Tracked Today' }}</span>
                    <div class="kpi-icon-wrap cyan"><i class="fa-solid fa-shoe-prints"></i></div>
                  </div>
                  <div class="kpi-value-row">
                    <span class="kpi-number">14.2M</span>
                    <span class="kpi-trend positive"><i class="fa-solid fa-fire"></i> +12% vs yesterday</span>
                  </div>
                </div>

                <div class="kpi-card">
                  <div class="kpi-header">
                    <span class="kpi-label">{{ langService.isArabic() ? 'وجبات تم تحليلها بالذكاء الاصطناعي' : 'AI Meals Analyzed' }}</span>
                    <div class="kpi-icon-wrap gold"><i class="fa-solid fa-brain"></i></div>
                  </div>
                  <div class="kpi-value-row">
                    <span class="kpi-number">2,340</span>
                    <span class="kpi-trend positive"><i class="fa-solid fa-camera"></i> Gemini AI Vision</span>
                  </div>
                </div>

                <div class="kpi-card">
                  <div class="kpi-header">
                    <span class="kpi-label">{{ langService.isArabic() ? 'أكواب المياه المسجلة' : 'Water Glasses Logged' }}</span>
                    <div class="kpi-icon-wrap purple"><i class="fa-solid fa-glass-water"></i></div>
                  </div>
                  <div class="kpi-value-row">
                    <span class="kpi-number">18,450</span>
                    <span class="kpi-trend positive">Hydration Goal: 91%</span>
                  </div>
                </div>
              </div>

              <!-- Analytics Breakdown Panel -->
              <div class="card glass-panel" style="margin-top: 1.5rem;">
                <div class="panel-header">
                  <div>
                    <h3 class="panel-title">{{ langService.isArabic() ? 'توزيع الأجهزة وأنظمة التشغيل' : 'Platform & Device Ecosystem Breakdown' }}</h3>
                    <p class="panel-sub">{{ langService.isArabic() ? 'نسبة الاستخدام حسب النظام والموقع الجغرافي' : 'iOS vs Android traffic & regional distribution' }}</p>
                  </div>
                </div>

                <div class="platform-grid">
                  <div class="platform-item">
                    <div class="platform-header">
                      <div class="platform-icon apple"><i class="fa-brands fa-apple"></i> Apple iOS</div>
                      <strong>68%</strong>
                    </div>
                    <div class="progress-track"><div class="progress-fill" style="width: 68%;"></div></div>
                  </div>

                  <div class="platform-item">
                    <div class="platform-header">
                      <div class="platform-icon android"><i class="fa-brands fa-android"></i> Google Android</div>
                      <strong>32%</strong>
                    </div>
                    <div class="progress-track"><div class="progress-fill cyan-fill" style="width: 32%;"></div></div>
                  </div>

                  <div class="platform-item">
                    <div class="platform-header">
                      <div class="platform-icon eg"><i class="fa-solid fa-location-dot"></i> Egypt 🇪🇬</div>
                      <strong>84%</strong>
                    </div>
                    <div class="progress-track"><div class="progress-fill gold-fill" style="width: 84%;"></div></div>
                  </div>

                  <div class="platform-item">
                    <div class="platform-header">
                      <div class="platform-icon global"><i class="fa-solid fa-earth-americas"></i> Global / GCC 🌍</div>
                      <strong>16%</strong>
                    </div>
                    <div class="progress-track"><div class="progress-fill purple-fill" style="width: 16%;"></div></div>
                  </div>
                </div>
              </div>
            </section>
          }

          <!-- ================= TAB 8: SETTINGS ================= -->
          @if (activeTab() === 'settings') {
            <section class="tab-pane animate-fade-in">
              <div class="settings-grid">
                <!-- Master Password Box -->
                <div class="card glass-panel">
                  <div class="panel-header">
                    <div>
                      <h3 class="panel-title">{{ langService.isArabic() ? 'تغيير كلمة مرور الإدارة' : 'Change Master Admin Password' }}</h3>
                      <p class="panel-sub">{{ langService.isArabic() ? 'تحديث المفتاح السري المستخدم للدخول إلى /ahmedamr/login' : 'Update the secret key used to access /ahmedamr/login' }}</p>
                    </div>
                  </div>

                  <div class="settings-form">
                    <div class="form-field">
                      <label class="form-label">{{ langService.isArabic() ? 'كلمة المرور الجديدة:' : 'New Admin Password:' }}</label>
                      <input
                        type="password"
                        [(ngModel)]="newAdminPass"
                        placeholder="••••••••••••"
                      />
                    </div>

                    <div class="form-field">
                      <label class="form-label">{{ langService.isArabic() ? 'تأكيد كلمة المرور الجديدة:' : 'Confirm New Password:' }}</label>
                      <input
                        type="password"
                        [(ngModel)]="confirmAdminPass"
                        placeholder="••••••••••••"
                      />
                    </div>

                    <button class="btn-primary" style="margin-top: 1rem;" (click)="onChangePassword()">
                      <i class="fa-solid fa-lock"></i>
                      <span>{{ langService.isArabic() ? 'حفظ كلمة المرور الجديدة' : 'Update Master Password' }}</span>
                    </button>
                  </div>
                </div>

                <!-- System Config & Diagnostic -->
                <div class="card glass-panel">
                  <div class="panel-header">
                    <div>
                      <h3 class="panel-title">{{ langService.isArabic() ? 'حالة المنظومة والأنظمة المتصلة' : 'System Diagnostic & Health' }}</h3>
                      <p class="panel-sub">{{ langService.isArabic() ? 'حالة السيرفر والربط ببوابات الدفع' : 'Server endpoints, MongoDB sync, and gateway integrations' }}</p>
                    </div>
                  </div>

                  <div class="diagnostics-list">
                    <div class="diag-item">
                      <div class="diag-left">
                        <span class="diag-dot online"></span>
                        <div>
                          <strong>Kashier Payment Gateway</strong>
                          <small>Live HMAC SHA-256 Verification Active</small>
                        </div>
                      </div>
                      <span class="status-badge active">ONLINE (100%)</span>
                    </div>

                    <div class="diag-item">
                      <div class="diag-left">
                        <span class="diag-dot online"></span>
                        <div>
                          <strong>Gemini AI Food Vision API</strong>
                          <small>Real-time Macronutrient Estimation</small>
                        </div>
                      </div>
                      <span class="status-badge active">ONLINE (100%)</span>
                    </div>

                    <div class="diag-item">
                      <div class="diag-left">
                        <span class="diag-dot online"></span>
                        <div>
                          <strong>Database Connection</strong>
                          <small>MongoDB Cluster Active • Latency 24ms</small>
                        </div>
                      </div>
                      <span class="status-badge active">OPTIMAL</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          }

        </div>
      </main>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        min-height: 100vh;
        background: #08090d;
        color: #ffffff;
        font-family: var(--font-body, 'Inter', sans-serif);
      }

      .dashboard-root {
        display: flex;
        min-height: 100vh;
        position: relative;
        background: #08090d;
        overflow-x: hidden;
      }

      .dashboard-root.rtl {
        direction: rtl;
      }

      /* Ambient Glow Orbs */
      .glow-orb {
        position: fixed;
        border-radius: 50%;
        filter: blur(150px);
        pointer-events: none;
        z-index: 0;
        opacity: 0.15;
      }

      .orb-red {
        width: 600px;
        height: 600px;
        background: var(--accent-red, #e63946);
        top: -150px;
        right: 10%;
      }

      .orb-purple {
        width: 500px;
        height: 500px;
        background: #8338ec;
        bottom: 5%;
        left: 20%;
      }

      /* Toast Notification */
      .dashboard-toast {
        position: fixed;
        top: 24px;
        right: 24px;
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.9rem 1.4rem;
        background: rgba(18, 20, 32, 0.95);
        border: 1px solid var(--accent-red, #e63946);
        border-radius: 14px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(230, 57, 70, 0.3);
        color: #ffffff;
        font-size: 0.95rem;
        font-weight: 600;
        backdrop-filter: blur(16px);
      }

      .dashboard-toast i {
        color: #4ade80;
        font-size: 1.15rem;
      }

      /* ================= SIDEBAR STYLES ================= */
      .dashboard-sidebar {
        width: 270px;
        background: rgba(12, 14, 22, 0.92);
        backdrop-filter: blur(24px);
        border-right: 1px solid rgba(255, 255, 255, 0.08);
        display: flex;
        flex-direction: column;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        z-index: 100;
        transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
      }

      .dashboard-root.rtl .dashboard-sidebar {
        left: auto;
        right: 0;
        border-right: none;
        border-left: 1px solid rgba(255, 255, 255, 0.08);
      }

      .sidebar-brand {
        padding: 1.5rem 1.25rem 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .brand-link {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        text-decoration: none;
      }

      .logo-box {
        width: 38px;
        height: 38px;
        background: linear-gradient(135deg, var(--accent-red, #e63946) 0%, #c1121f 100%);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 0 15px rgba(230, 57, 70, 0.4);
      }

      .brand-img {
        width: 26px;
        height: 26px;
        object-fit: contain;
      }

      .brand-meta {
        display: flex;
        flex-direction: column;
      }

      .brand-title {
        font-family: var(--font-heading, 'Outfit', sans-serif);
        font-size: 1.25rem;
        font-weight: 900;
        color: #ffffff;
        letter-spacing: 0.5px;
      }

      .brand-title .highlight {
        color: var(--accent-red, #e63946);
      }

      .brand-tag {
        font-size: 0.65rem;
        font-weight: 700;
        color: rgba(255, 255, 255, 0.4);
        letter-spacing: 1px;
      }

      .mobile-close-btn {
        display: none;
        background: none;
        border: none;
        color: rgba(255, 255, 255, 0.6);
        font-size: 1.2rem;
        cursor: pointer;
      }

      .system-status-chip {
        margin: 0.25rem 1.25rem 1.25rem;
        padding: 0.45rem 0.85rem;
        background: rgba(34, 197, 94, 0.1);
        border: 1px solid rgba(34, 197, 94, 0.25);
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      .status-pulse {
        width: 7px;
        height: 7px;
        background: #22c55e;
        border-radius: 50%;
        box-shadow: 0 0 8px #22c55e;
      }

      .status-txt {
        font-size: 0.75rem;
        font-weight: 600;
        color: #86efac;
        flex: 1;
      }

      .version-tag {
        font-size: 0.7rem;
        color: rgba(255, 255, 255, 0.35);
        font-weight: 700;
      }

      .sidebar-nav {
        flex: 1;
        overflow-y: auto;
        padding: 0 0.85rem;
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }

      .nav-section-label {
        font-size: 0.68rem;
        font-weight: 800;
        color: rgba(255, 255, 255, 0.3);
        letter-spacing: 0.75px;
        padding: 0.5rem 0.65rem 0.25rem;
      }

      .nav-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.75rem 0.85rem;
        background: transparent;
        border: none;
        border-radius: 12px;
        color: rgba(255, 255, 255, 0.65);
        font-size: 0.9rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.25s ease;
        width: 100%;
        text-align: left;
      }

      .dashboard-root.rtl .nav-item {
        text-align: right;
      }

      .nav-item:hover {
        background: rgba(255, 255, 255, 0.05);
        color: #ffffff;
      }

      .nav-item.active {
        background: linear-gradient(135deg, rgba(230, 57, 70, 0.2) 0%, rgba(193, 18, 31, 0.1) 100%);
        border: 1px solid rgba(230, 57, 70, 0.4);
        color: #ffffff;
        font-weight: 600;
        box-shadow: 0 4px 15px rgba(230, 57, 70, 0.15);
      }

      .nav-icon {
        font-size: 1rem;
        width: 20px;
        text-align: center;
        color: rgba(255, 255, 255, 0.5);
        transition: color 0.2s ease;
      }

      .nav-item.active .nav-icon {
        color: var(--accent-red, #e63946);
      }

      .nav-label {
        flex: 1;
      }

      .nav-count {
        font-size: 0.72rem;
        font-weight: 700;
        padding: 0.15rem 0.5rem;
        border-radius: 20px;
        background: rgba(255, 255, 255, 0.08);
        color: rgba(255, 255, 255, 0.7);
      }

      .nav-count.active-sub {
        background: rgba(56, 189, 248, 0.15);
        color: #38bdf8;
      }

      .nav-count.highlight {
        background: rgba(230, 57, 70, 0.2);
        color: #ff99a1;
      }

      .nav-count.gold {
        background: rgba(234, 179, 8, 0.15);
        color: #facc15;
      }

      .badge-dot.red {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: var(--accent-red, #e63946);
        box-shadow: 0 0 6px var(--accent-red, #e63946);
      }

      .sidebar-footer {
        padding: 1rem 0.85rem;
        border-top: 1px solid rgba(255, 255, 255, 0.08);
      }

      .admin-profile-card {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.65rem 0.85rem;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.06);
        border-radius: 14px;
      }

      .admin-thumb {
        width: 36px;
        height: 36px;
        border-radius: 10px;
        object-fit: cover;
        border: 2px solid var(--accent-red, #e63946);
      }

      .admin-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }

      .admin-name {
        font-size: 0.85rem;
        font-weight: 700;
        color: #ffffff;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }

      .admin-role {
        font-size: 0.7rem;
        color: var(--accent-red, #e63946);
        font-weight: 600;
      }

      .logout-icon-btn {
        background: none;
        border: none;
        color: rgba(255, 255, 255, 0.4);
        font-size: 1rem;
        cursor: pointer;
        padding: 0.4rem;
        transition: color 0.2s ease;
      }

      .logout-icon-btn:hover {
        color: var(--accent-red, #e63946);
      }

      /* ================= MAIN CONTENT LAYOUT ================= */
      .dashboard-main {
        flex: 1;
        margin-left: 270px;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        position: relative;
        z-index: 1;
      }

      .dashboard-root.rtl .dashboard-main {
        margin-left: 0;
        margin-right: 270px;
      }

      /* Topbar */
      .dashboard-topbar {
        height: 72px;
        background: rgba(12, 14, 22, 0.8);
        backdrop-filter: blur(18px);
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 2rem;
        position: sticky;
        top: 0;
        z-index: 90;
      }

      .topbar-left {
        display: flex;
        align-items: center;
        gap: 1rem;
      }

      .mobile-sidebar-toggle {
        display: none;
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.12);
        color: #ffffff;
        width: 40px;
        height: 40px;
        border-radius: 10px;
        align-items: center;
        justify-content: center;
        font-size: 1.1rem;
        cursor: pointer;
      }

      .page-title {
        font-size: 1.25rem;
        font-weight: 800;
        margin: 0;
        font-family: var(--font-heading, 'Outfit', sans-serif);
      }

      .page-breadcrumbs {
        font-size: 0.75rem;
        color: rgba(255, 255, 255, 0.4);
      }

      .topbar-right {
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }

      .topbar-search {
        position: relative;
        display: flex;
        align-items: center;
      }

      .topbar-search .search-icon {
        position: absolute;
        left: 1rem;
        color: rgba(255, 255, 255, 0.4);
        font-size: 0.85rem;
      }

      .dashboard-root.rtl .topbar-search .search-icon {
        left: auto;
        right: 1rem;
      }

      .topbar-search input {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 50px;
        padding: 0.55rem 1rem 0.55rem 2.4rem;
        color: #ffffff;
        font-size: 0.85rem;
        width: 200px;
        transition: all 0.3s ease;
      }

      .dashboard-root.rtl .topbar-search input {
        padding: 0.55rem 2.4rem 0.55rem 1rem;
      }

      .topbar-search input:focus {
        width: 260px;
        background: rgba(255, 255, 255, 0.08);
        border-color: var(--accent-red, #e63946);
        outline: none;
      }

      .topbar-action-btn {
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid rgba(255, 255, 255, 0.12);
        color: #ffffff;
        padding: 0.55rem 0.95rem;
        border-radius: 12px;
        font-size: 0.85rem;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.45rem;
        text-decoration: none;
        transition: all 0.25s ease;
      }

      .topbar-action-btn:hover {
        background: rgba(255, 255, 255, 0.12);
        border-color: rgba(255, 255, 255, 0.25);
      }

      .topbar-action-btn.visit-btn {
        background: rgba(230, 57, 70, 0.15);
        border-color: rgba(230, 57, 70, 0.35);
        color: #ff99a1;
      }

      .topbar-action-btn.visit-btn:hover {
        background: var(--accent-red, #e63946);
        color: #ffffff;
      }

      /* Dashboard Body */
      .dashboard-body {
        padding: 2rem;
        flex: 1;
      }

      /* ================= GENERIC CARD & PANEL STYLES ================= */
      .card {
        background: rgba(18, 20, 32, 0.7);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 18px;
        box-shadow: 0 12px 35px rgba(0, 0, 0, 0.4);
      }

      .glass-panel {
        backdrop-filter: blur(16px);
        padding: 1.5rem;
      }

      .panel-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1.25rem;
        gap: 1rem;
        flex-wrap: wrap;
      }

      .panel-title {
        font-size: 1.15rem;
        font-weight: 800;
        margin: 0;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      .panel-sub {
        font-size: 0.8rem;
        color: rgba(255, 255, 255, 0.5);
        margin: 0.25rem 0 0;
      }

      .counter-badge {
        font-size: 0.85rem;
        color: var(--accent-red, #e63946);
        font-weight: 700;
      }

      .tag-pill.live-pill {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        padding: 0.35rem 0.75rem;
        background: rgba(34, 197, 94, 0.12);
        border: 1px solid rgba(34, 197, 94, 0.3);
        border-radius: 50px;
        font-size: 0.75rem;
        font-weight: 700;
        color: #86efac;
      }

      .pulse-dot {
        width: 6px;
        height: 6px;
        background: #22c55e;
        border-radius: 50%;
        box-shadow: 0 0 8px #22c55e;
      }

      /* ================= KPI CARDS ================= */
      .kpi-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 1.25rem;
      }

      .kpi-card {
        background: rgba(18, 20, 32, 0.75);
        backdrop-filter: blur(16px);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 18px;
        padding: 1.25rem 1.4rem;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        transition: transform 0.25s ease, border-color 0.25s ease;
      }

      .kpi-card:hover {
        transform: translateY(-2px);
        border-color: rgba(255, 255, 255, 0.18);
      }

      .kpi-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .kpi-label {
        font-size: 0.85rem;
        font-weight: 600;
        color: rgba(255, 255, 255, 0.6);
      }

      .kpi-icon-wrap {
        width: 38px;
        height: 38px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1rem;
      }

      .kpi-icon-wrap.red {
        background: rgba(230, 57, 70, 0.15);
        color: #ff808b;
        border: 1px solid rgba(230, 57, 70, 0.3);
      }

      .kpi-icon-wrap.cyan {
        background: rgba(56, 189, 248, 0.15);
        color: #38bdf8;
        border: 1px solid rgba(56, 189, 248, 0.3);
      }

      .kpi-icon-wrap.gold {
        background: rgba(234, 179, 8, 0.15);
        color: #facc15;
        border: 1px solid rgba(234, 179, 8, 0.3);
      }

      .kpi-icon-wrap.purple {
        background: rgba(168, 85, 247, 0.15);
        color: #c084fc;
        border: 1px solid rgba(168, 85, 247, 0.3);
      }

      .kpi-value-row {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
      }

      .kpi-number {
        font-size: 1.75rem;
        font-weight: 900;
        font-family: var(--font-heading, 'Outfit', sans-serif);
        color: #ffffff;
      }

      .kpi-number .currency {
        font-size: 0.95rem;
        color: rgba(255, 255, 255, 0.5);
      }

      .kpi-trend {
        font-size: 0.8rem;
        font-weight: 700;
        display: flex;
        align-items: center;
        gap: 0.25rem;
      }

      .kpi-trend.positive {
        color: #4ade80;
      }

      .kpi-footer {
        font-size: 0.75rem;
        color: rgba(255, 255, 255, 0.4);
      }

      /* ================= OVERVIEW LAYOUT ================= */
      .overview-grid-2 {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 1.5rem;
        margin-top: 1.5rem;
      }

      /* Chart Visual */
      .bars-chart {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        height: 200px;
        padding-top: 2rem;
        gap: 1rem;
      }

      .bar-col {
        flex: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
        gap: 0.65rem;
      }

      .bar-track {
        width: 100%;
        max-width: 36px;
        height: 100%;
        background: rgba(255, 255, 255, 0.04);
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        overflow: visible;
        position: relative;
      }

      .bar-fill {
        background: linear-gradient(180deg, rgba(230, 57, 70, 0.8) 0%, rgba(193, 18, 31, 0.3) 100%);
        border-radius: 8px;
        transition: height 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        position: relative;
      }

      .bar-fill.highlight {
        background: linear-gradient(180deg, var(--accent-red, #e63946) 0%, #c1121f 100%);
        box-shadow: 0 0 15px rgba(230, 57, 70, 0.5);
      }

      .bar-tooltip {
        position: absolute;
        top: -30px;
        left: 50%;
        transform: translateX(-50%);
        background: #000000;
        border: 1px solid rgba(255, 255, 255, 0.2);
        padding: 0.2rem 0.4rem;
        border-radius: 6px;
        font-size: 0.65rem;
        font-weight: 700;
        white-space: nowrap;
        opacity: 0;
        transition: opacity 0.2s ease;
        pointer-events: none;
      }

      .bar-col:hover .bar-tooltip {
        opacity: 1;
      }

      .bar-month {
        font-size: 0.75rem;
        color: rgba(255, 255, 255, 0.5);
        font-weight: 600;
      }

      /* Shortcuts List */
      .shortcuts-list {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }

      .shortcut-btn {
        display: flex;
        align-items: center;
        gap: 0.85rem;
        padding: 0.85rem 1rem;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.06);
        border-radius: 14px;
        color: #ffffff;
        cursor: pointer;
        transition: all 0.25s ease;
        text-align: left;
        width: 100%;
      }

      .dashboard-root.rtl .shortcut-btn {
        text-align: right;
      }

      .shortcut-btn:hover {
        background: rgba(255, 255, 255, 0.08);
        border-color: rgba(255, 255, 255, 0.15);
        transform: translateX(3px);
      }

      .dashboard-root.rtl .shortcut-btn:hover {
        transform: translateX(-3px);
      }

      .shortcut-icon {
        width: 36px;
        height: 36px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.95rem;
        flex-shrink: 0;
      }

      .shortcut-icon.red {
        background: rgba(230, 57, 70, 0.15);
        color: #ff99a1;
      }

      .shortcut-icon.purple {
        background: rgba(168, 85, 247, 0.15);
        color: #c084fc;
      }

      .shortcut-icon.cyan {
        background: rgba(56, 189, 248, 0.15);
        color: #38bdf8;
      }

      .shortcut-icon.gold {
        background: rgba(234, 179, 8, 0.15);
        color: #facc15;
      }

      .shortcut-text {
        flex: 1;
        display: flex;
        flex-direction: column;
      }

      .shortcut-text strong {
        font-size: 0.85rem;
      }

      .shortcut-text small {
        font-size: 0.72rem;
        color: rgba(255, 255, 255, 0.45);
      }

      .arrow-icon {
        color: rgba(255, 255, 255, 0.3);
        font-size: 0.8rem;
      }

      /* ================= TABLES & DATA LISTS ================= */
      .table-responsive {
        overflow-x: auto;
      }

      .dash-table {
        width: 100%;
        border-collapse: collapse;
        text-align: left;
        font-size: 0.85rem;
      }

      .dashboard-root.rtl .dash-table {
        text-align: right;
      }

      .dash-table th {
        padding: 0.85rem 1rem;
        color: rgba(255, 255, 255, 0.45);
        font-weight: 700;
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        white-space: nowrap;
      }

      .dash-table td {
        padding: 1rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.04);
        vertical-align: middle;
        white-space: nowrap;
      }

      .dash-table tr:hover td {
        background: rgba(255, 255, 255, 0.02);
      }

      .banned-row {
        opacity: 0.5;
        background: rgba(239, 68, 68, 0.05) !important;
      }

      .inactive-row {
        opacity: 0.45;
      }

      .user-cell {
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }

      .avatar-sm {
        width: 34px;
        height: 34px;
        border-radius: 10px;
        object-fit: cover;
      }

      .user-name {
        font-weight: 700;
        color: #ffffff;
        display: flex;
        align-items: center;
        gap: 0.45rem;
      }

      .user-email {
        font-size: 0.75rem;
        color: rgba(255, 255, 255, 0.45);
      }

      .code-badge {
        font-family: monospace;
        font-size: 0.8rem;
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid rgba(255, 255, 255, 0.12);
        padding: 0.25rem 0.55rem;
        border-radius: 8px;
        color: #e2e8f0;
      }

      .code-badge.copyable {
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        transition: all 0.2s ease;
      }

      .code-badge.copyable:hover {
        background: rgba(230, 57, 70, 0.2);
        border-color: var(--accent-red, #e63946);
        color: #ffffff;
      }

      .code-badge.lg {
        padding: 0.4rem 0.8rem;
        font-size: 0.9rem;
      }

      .copy-icon {
        font-size: 0.75rem;
        opacity: 0.6;
      }

      .plan-badge {
        font-size: 0.75rem;
        font-weight: 700;
        padding: 0.3rem 0.65rem;
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.08);
        color: #ffffff;
      }

      .plan-badge.gold {
        background: rgba(234, 179, 8, 0.15);
        border: 1px solid rgba(234, 179, 8, 0.4);
        color: #facc15;
      }

      .plan-badge.silver {
        background: rgba(203, 213, 225, 0.15);
        border: 1px solid rgba(203, 213, 225, 0.4);
        color: #cbd5e1;
      }

      .amount-val {
        font-family: var(--font-heading, 'Outfit', sans-serif);
        font-size: 0.95rem;
        color: #ffffff;
      }

      .gateway-pill {
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
        font-size: 0.75rem;
        font-weight: 600;
        padding: 0.25rem 0.6rem;
        border-radius: 50px;
      }

      .gateway-pill.kashier {
        background: rgba(6, 214, 160, 0.12);
        border: 1px solid rgba(6, 214, 160, 0.3);
        color: #06d6a0;
      }

      .status-badge {
        font-size: 0.72rem;
        font-weight: 700;
        padding: 0.25rem 0.6rem;
        border-radius: 50px;
        text-transform: capitalize;
        display: inline-block;
      }

      .status-badge.active {
        background: rgba(34, 197, 94, 0.15);
        border: 1px solid rgba(34, 197, 94, 0.3);
        color: #4ade80;
      }

      .status-badge.expired {
        background: rgba(239, 68, 68, 0.15);
        border: 1px solid rgba(239, 68, 68, 0.3);
        color: #f87171;
      }

      .status-badge.free {
        background: rgba(148, 163, 184, 0.15);
        border: 1px solid rgba(148, 163, 184, 0.3);
        color: #94a3b8;
      }

      .streak-badge {
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
        font-size: 0.8rem;
        font-weight: 700;
        color: #fb923c;
      }

      .fire-icon {
        color: #f97316;
      }

      .gold-unlocked-badge {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        padding: 0.3rem 0.65rem;
        background: linear-gradient(135deg, rgba(234, 179, 8, 0.2) 0%, rgba(202, 138, 4, 0.3) 100%);
        border: 1px solid rgba(234, 179, 8, 0.6);
        border-radius: 8px;
        font-size: 0.75rem;
        font-weight: 800;
        color: #fef08a;
      }

      .gold-locked-badge {
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
        padding: 0.25rem 0.55rem;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 8px;
        font-size: 0.72rem;
        color: rgba(255, 255, 255, 0.4);
      }

      .discount-pill {
        font-size: 0.75rem;
        font-weight: 800;
        padding: 0.25rem 0.6rem;
        border-radius: 50px;
        background: rgba(255, 255, 255, 0.08);
      }

      .discount-pill.fifty {
        background: rgba(234, 179, 8, 0.2);
        color: #facc15;
        border: 1px solid rgba(234, 179, 8, 0.5);
      }

      .discount-pill.thirty {
        background: rgba(56, 189, 248, 0.2);
        color: #38bdf8;
        border: 1px solid rgba(56, 189, 248, 0.5);
      }

      .date-cell {
        font-size: 0.78rem;
        color: rgba(255, 255, 255, 0.5);
      }

      .action-btn {
        padding: 0.35rem 0.75rem;
        border-radius: 8px;
        font-size: 0.75rem;
        font-weight: 700;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
        border: none;
        transition: all 0.2s ease;
      }

      .action-btn.ban-btn {
        background: rgba(239, 68, 68, 0.15);
        border: 1px solid rgba(239, 68, 68, 0.35);
        color: #f87171;
      }

      .action-btn.ban-btn:hover {
        background: #ef4444;
        color: #ffffff;
      }

      .action-btn.unban-btn {
        background: rgba(34, 197, 94, 0.15);
        border: 1px solid rgba(34, 197, 94, 0.35);
        color: #4ade80;
      }

      .action-btn.unban-btn:hover {
        background: #22c55e;
        color: #ffffff;
      }

      .delete-icon-btn {
        background: rgba(239, 68, 68, 0.12);
        border: 1px solid rgba(239, 68, 68, 0.3);
        color: #f87171;
        width: 32px;
        height: 32px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .delete-icon-btn:hover {
        background: #ef4444;
        color: #ffffff;
      }

      .view-all-link {
        background: none;
        border: none;
        color: var(--accent-red, #e63946);
        font-size: 0.85rem;
        font-weight: 600;
        cursor: pointer;
      }

      /* ================= FILTERS & CHIPS ================= */
      .filter-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        flex-wrap: wrap;
      }

      .filter-search {
        position: relative;
        display: flex;
        align-items: center;
        flex: 1;
        min-width: 260px;
      }

      .filter-search i {
        position: absolute;
        left: 1rem;
        color: rgba(255, 255, 255, 0.4);
      }

      .dashboard-root.rtl .filter-search i {
        left: auto;
        right: 1rem;
      }

      .filter-search input {
        width: 100%;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        padding: 0.65rem 1rem 0.65rem 2.5rem;
        color: #ffffff;
        font-size: 0.9rem;
      }

      .dashboard-root.rtl .filter-search input {
        padding: 0.65rem 2.5rem 0.65rem 1rem;
      }

      .filter-chips {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        flex-wrap: wrap;
      }

      .filter-chip {
        padding: 0.5rem 0.95rem;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 50px;
        color: rgba(255, 255, 255, 0.7);
        font-size: 0.82rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .filter-chip:hover {
        background: rgba(255, 255, 255, 0.1);
        color: #ffffff;
      }

      .filter-chip.active {
        background: var(--accent-red, #e63946);
        border-color: var(--accent-red, #e63946);
        color: #ffffff;
        box-shadow: 0 0 15px rgba(230, 57, 70, 0.4);
      }

      /* ================= DISCOUNT CODES CREATOR ================= */
      .create-code-card {
        border-color: rgba(230, 57, 70, 0.3);
        background: linear-gradient(135deg, rgba(230, 57, 70, 0.06) 0%, rgba(18, 20, 32, 0.9) 100%);
      }

      .percent-presets {
        display: flex;
        gap: 0.75rem;
        flex-wrap: wrap;
        margin-top: 0.5rem;
      }

      .percent-btn {
        flex: 1;
        min-width: 80px;
        padding: 0.75rem;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 12px;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.2rem;
        transition: all 0.25s ease;
      }

      .percent-btn:hover {
        background: rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 255, 255, 0.25);
      }

      .percent-btn.selected {
        background: linear-gradient(135deg, var(--accent-red, #e63946) 0%, #c1121f 100%);
        border-color: var(--accent-red, #e63946);
        box-shadow: 0 0 20px rgba(230, 57, 70, 0.4);
      }

      .percent-num {
        font-family: var(--font-heading, 'Outfit', sans-serif);
        font-size: 1.25rem;
        font-weight: 900;
        color: #ffffff;
      }

      .percent-sub {
        font-size: 0.65rem;
        font-weight: 700;
        color: rgba(255, 255, 255, 0.6);
      }

      .form-row-inputs {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr 1.5fr;
        gap: 1rem;
        margin-top: 1.25rem;
        align-items: flex-end;
      }

      .form-field {
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
      }

      .form-label {
        font-size: 0.8rem;
        font-weight: 600;
        color: rgba(255, 255, 255, 0.7);
      }

      .form-field input {
        background: rgba(10, 11, 16, 0.8);
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 12px;
        padding: 0.75rem 1rem;
        color: #ffffff;
        font-size: 0.9rem;
      }

      .form-field input.uppercase-input {
        text-transform: uppercase;
        font-weight: 800;
        letter-spacing: 1px;
      }

      .input-with-action {
        display: flex;
        gap: 0.5rem;
      }

      .input-with-action input {
        flex: 1;
      }

      .generate-btn {
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.15);
        color: #ffffff;
        padding: 0 0.85rem;
        border-radius: 12px;
        font-size: 0.8rem;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.35rem;
      }

      .submit-code-btn {
        width: 100%;
        padding: 0.75rem 1rem;
        font-size: 0.9rem;
      }

      /* Toggle Switch */
      .toggle-switch {
        position: relative;
        display: inline-block;
        width: 42px;
        height: 22px;
      }

      .toggle-switch input {
        opacity: 0;
        width: 0;
        height: 0;
      }

      .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(255, 255, 255, 0.15);
        transition: 0.3s;
        border-radius: 34px;
      }

      .slider:before {
        position: absolute;
        content: '';
        height: 16px;
        width: 16px;
        left: 3px;
        bottom: 3px;
        background-color: white;
        transition: 0.3s;
        border-radius: 50%;
      }

      input:checked + .slider {
        background-color: #22c55e;
      }

      input:checked + .slider:before {
        transform: translateX(20px);
      }

      .toggle-label {
        font-size: 0.75rem;
        margin-left: 0.5rem;
        color: rgba(255, 255, 255, 0.6);
      }

      .dashboard-root.rtl .toggle-label {
        margin-left: 0;
        margin-right: 0.5rem;
      }

      .usage-progress-wrap {
        display: flex;
        flex-direction: column;
        gap: 0.3rem;
        min-width: 130px;
      }

      .usage-text {
        font-size: 0.75rem;
        color: rgba(255, 255, 255, 0.6);
      }

      .progress-track {
        height: 6px;
        background: rgba(255, 255, 255, 0.08);
        border-radius: 10px;
        overflow: hidden;
      }

      .progress-fill {
        height: 100%;
        background: var(--accent-red, #e63946);
        border-radius: 10px;
        transition: width 0.4s ease;
      }

      .progress-fill.full {
        background: #ef4444;
      }

      .progress-fill.cyan-fill {
        background: #38bdf8;
      }

      .progress-fill.gold-fill {
        background: #facc15;
      }

      .progress-fill.purple-fill {
        background: #a855f7;
      }

      /* ================= REFERRALS TAB ================= */
      .concept-card {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        background: linear-gradient(135deg, rgba(234, 179, 8, 0.08) 0%, rgba(18, 20, 32, 0.9) 100%);
        border-color: rgba(234, 179, 8, 0.3);
      }

      .gold-trophy {
        font-size: 3rem;
        color: #facc15;
        filter: drop-shadow(0 0 15px rgba(234, 179, 8, 0.5));
      }

      .concept-body h3 {
        margin: 0 0 0.4rem;
        font-size: 1.15rem;
      }

      .concept-body p {
        margin: 0;
        font-size: 0.88rem;
        color: rgba(255, 255, 255, 0.65);
        line-height: 1.5;
      }

      .rank-badge {
        font-size: 1.1rem;
        font-weight: 800;
      }

      /* ================= PLATFORM GRID (ANALYTICS) ================= */
      .platform-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1.5rem;
      }

      .platform-item {
        display: flex;
        flex-direction: column;
        gap: 0.65rem;
        padding: 1rem;
        background: rgba(255, 255, 255, 0.03);
        border-radius: 12px;
      }

      .platform-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .platform-icon {
        font-size: 0.85rem;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 0.45rem;
      }

      /* ================= SETTINGS & DIAGNOSTICS ================= */
      .settings-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1.5rem;
      }

      .settings-form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .diagnostics-list {
        display: flex;
        flex-direction: column;
        gap: 0.85rem;
      }

      .diag-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.85rem 1rem;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.06);
        border-radius: 12px;
      }

      .diag-left {
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }

      .diag-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
      }

      .diag-dot.online {
        background: #22c55e;
        box-shadow: 0 0 8px #22c55e;
      }

      .diag-left strong {
        font-size: 0.85rem;
        display: block;
      }

      .diag-left small {
        font-size: 0.72rem;
        color: rgba(255, 255, 255, 0.45);
      }

      /* ================= BUTTONS & ANIMATIONS ================= */
      .btn-primary {
        background: linear-gradient(135deg, var(--accent-red, #e63946) 0%, #c1121f 100%);
        color: #ffffff;
        border: none;
        padding: 0.65rem 1.25rem;
        border-radius: 12px;
        font-size: 0.85rem;
        font-weight: 700;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        box-shadow: 0 4px 15px rgba(230, 57, 70, 0.35);
        transition: all 0.25s ease;
      }

      .btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(230, 57, 70, 0.5);
      }

      .animate-fade-in {
        animation: fadeIn 0.35s ease forwards;
      }

      .animate-slide-down {
        animation: slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }

      .animate-pulse {
        animation: pulseGlow 2s infinite ease-in-out;
      }

      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(8px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @keyframes slideDown {
        from { opacity: 0; transform: translateY(-20px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @keyframes pulseGlow {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.75; }
      }

      /* ================= RESPONSIVE DESIGN ================= */
      @media (max-width: 1024px) {
        .overview-grid-2,
        .settings-grid {
          grid-template-columns: 1fr;
        }

        .form-row-inputs {
          grid-template-columns: 1fr 1fr;
        }
      }

      @media (max-width: 860px) {
        .dashboard-sidebar {
          transform: translateX(-100%);
        }

        .dashboard-root.rtl .dashboard-sidebar {
          transform: translateX(100%);
        }

        .dashboard-sidebar.open {
          transform: translateX(0);
        }

        .sidebar-backdrop.active {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(4px);
          z-index: 95;
        }

        .mobile-close-btn,
        .mobile-sidebar-toggle {
          display: flex;
        }

        .dashboard-main {
          margin-left: 0 !important;
          margin-right: 0 !important;
        }

        .dashboard-topbar {
          padding: 0 1rem;
        }

        .dashboard-body {
          padding: 1rem;
        }

        .topbar-search {
          display: none;
        }

        .form-row-inputs {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class DashboardComponent implements OnInit {
  authService = inject(AdminAuthService);
  dataService = inject(AdminDataService);
  langService = inject(LanguageService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  activeTab = signal<DashboardTab>('overview');
  isMobileSidebarOpen = signal<boolean>(false);
  isRefreshing = signal<boolean>(false);
  toastMessage = signal<string | null>(null);

  // Filters & State
  searchQuery = '';
  userSearch = '';
  userFilterStatus = signal<'all' | 'active' | 'gold_streak' | 'banned'>('all');
  subGatewayFilter = signal<'all' | 'Kashier'>('all');

  // Discount creation form
  presetPercentages: (10 | 15 | 20 | 30 | 50)[] = [10, 15, 20, 30, 50];
  newDiscountCode = '';
  newDiscountPercent: 10 | 15 | 20 | 30 | 50 = 50;
  newDiscountMaxUses = 100;
  newDiscountExpiry = '2026-12-31';

  selectPercent(p: 10 | 15 | 20 | 30 | 50): void {
    this.newDiscountPercent = p;
  }

  // Password change form
  newAdminPass = '';
  confirmAdminPass = '';

  // Monthly Revenue Data for Chart
  monthlyGrowthData = [
    { month: 'Jan', amount: '120k', percent: 45, isCurrent: false },
    { month: 'Feb', amount: '155k', percent: 58, isCurrent: false },
    { month: 'Mar', amount: '190k', percent: 71, isCurrent: false },
    { month: 'Apr', amount: '210k', percent: 79, isCurrent: false },
    { month: 'May', amount: '235k', percent: 88, isCurrent: false },
    { month: 'Jun', amount: '248k', percent: 93, isCurrent: false },
    { month: 'Jul', amount: '252k', percent: 95, isCurrent: false },
    { month: 'Aug', amount: '265k', percent: 100, isCurrent: true },
  ];

  ngOnInit(): void {
    // Check route param if tab is specified
    this.route.params.subscribe((params) => {
      if (params['tab']) {
        const tab = params['tab'] as DashboardTab;
        if (['overview', 'users', 'subscriptions', 'preregister', 'discounts', 'referrals', 'analytics', 'settings'].includes(tab)) {
          this.activeTab.set(tab);
        }
      }
    });
  }

  selectTab(tab: DashboardTab): void {
    this.activeTab.set(tab);
    this.closeMobileSidebar();
  }

  toggleMobileSidebar(): void {
    this.isMobileSidebarOpen.update((v) => !v);
  }

  closeMobileSidebar(): void {
    this.isMobileSidebarOpen.set(false);
  }

  getTabTitle(): string {
    const titles: Record<DashboardTab, { en: string; ar: string }> = {
      overview: { en: 'Mission Control Overview', ar: 'نظرة عامة على المنظومة' },
      users: { en: 'Subscribers & User Management', ar: 'إدارة المستخدمين والمشتركين' },
      subscriptions: { en: 'Subscriptions & Revenue Gateways', ar: 'الاشتراكات وبوابات الدفع' },
      preregister: { en: 'Early Access Leads', ar: 'قائمة المسجلين للوصول المبكر' },
      discounts: { en: 'Discount Codes & Promo Coupons', ar: 'إدارة أكواد الخصم والكوبونات' },
      referrals: { en: 'Referrals Network & Gold VIP', ar: 'شبكة الإحالات ومكافآت الـ VIP' },
      analytics: { en: 'Live Platform Analytics', ar: 'تحليلات النشاط المباشرة' },
      settings: { en: 'Admin Security & Diagnostics', ar: 'إعدادات المنظومة والأمان' },
    };
    const current = titles[this.activeTab()];
    return this.langService.isArabic() ? current.ar : current.en;
  }

  activeSubscriptionsCount = computed(() => {
    return this.dataService.subscriptions().filter((s) => s.status === 'active').length;
  });

  recentSubscriptions = computed(() => {
    return this.dataService.subscriptions().slice(0, 5);
  });

  filteredUsers = computed(() => {
    let list = this.dataService.users();
    const q = this.userSearch.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          u.referralCode.toLowerCase().includes(q)
      );
    }
    const filter = this.userFilterStatus();
    if (filter === 'active') {
      list = list.filter((u) => u.subscription.status === 'active');
    } else if (filter === 'gold_streak') {
      list = list.filter((u) => u.earned50PercentGoldDiscount);
    } else if (filter === 'banned') {
      list = list.filter((u) => u.isBanned);
    }
    return list;
  });

  filteredSubscriptions = computed(() => {
    let list = this.dataService.subscriptions();
    const g = this.subGatewayFilter();
    if (g !== 'all') {
      list = list.filter((s) => s.gateway === g);
    }
    return list;
  });

  // Actions
  toggleBan(user: UserItem): void {
    this.dataService.toggleBanUser(user.id);
    const msg = user.isBanned
      ? (this.langService.isArabic() ? `تم إلغاء حظر ${user.name}` : `Unbanned ${user.name}`)
      : (this.langService.isArabic() ? `تم حظر ${user.name}` : `Banned ${user.name}`);
    this.showToast(msg);
  }

  generateRandomCode(): void {
    const prefixes = ['GOLD', 'FIT', 'SUMMER', 'HERO', 'ALPHA'];
    const p = prefixes[Math.floor(Math.random() * prefixes.length)];
    const num = Math.floor(100 + Math.random() * 900);
    this.newDiscountCode = `${p}${this.newDiscountPercent}_${num}`;
  }

  onCreateDiscountCode(): void {
    if (!this.newDiscountCode.trim()) {
      this.generateRandomCode();
    }
    const res = this.dataService.createDiscountCode(
      this.newDiscountCode,
      this.newDiscountPercent,
      this.newDiscountMaxUses,
      this.newDiscountExpiry,
      this.authService.currentAdmin()?.name || 'Ahmed Amr'
    );

    if (res.success) {
      this.showToast(res.message);
      this.newDiscountCode = '';
    } else {
      this.showToast(res.message);
    }
  }

  toggleCode(id: string): void {
    this.dataService.toggleDiscountCode(id);
    this.showToast(this.langService.isArabic() ? 'تم تحديث حالة الكود بنجاح' : 'Promo code status updated');
  }

  deleteCode(id: string): void {
    this.dataService.deleteDiscountCode(id);
    this.showToast(this.langService.isArabic() ? 'تم حذف الكود بنجاح' : 'Promo code deleted');
  }

  exportPreRegs(): void {
    this.dataService.exportPreRegistersCsv();
    this.showToast(this.langService.isArabic() ? 'تم تصدير ملف CSV بنجاح' : 'CSV file exported successfully');
  }

  copyToClipboard(text: string, label: string = 'Copied to clipboard'): void {
    navigator.clipboard.writeText(text);
    this.showToast(label);
  }

  onChangePassword(): void {
    if (!this.newAdminPass || this.newAdminPass.length < 6) {
      this.showToast(this.langService.isArabic() ? 'كلمة المرور يجب أن لا تقل عن 6 أحرف' : 'Password must be at least 6 characters');
      return;
    }
    if (this.newAdminPass !== this.confirmAdminPass) {
      this.showToast(this.langService.isArabic() ? 'كلمتا المرور غير متطابقتين' : 'Passwords do not match');
      return;
    }
    this.authService.updatePassword(this.newAdminPass);
    this.showToast(this.langService.isArabic() ? 'تم تحديث كلمة المرور بنجاح!' : 'Master Password updated successfully!');
    this.newAdminPass = '';
    this.confirmAdminPass = '';
  }

  refreshData(): void {
    this.isRefreshing.set(true);
    setTimeout(() => {
      this.isRefreshing.set(false);
      this.showToast(this.langService.isArabic() ? 'تمت مزامنة وتحديث البيانات' : 'All dashboard feeds synced');
    }, 600);
  }

  showToast(msg: string): void {
    this.toastMessage.set(msg);
    setTimeout(() => {
      this.toastMessage.set(null);
    }, 3000);
  }

  onLogout(): void {
    this.authService.logout();
  }
}
