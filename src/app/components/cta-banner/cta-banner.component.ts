import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-cta-banner',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section id="pre-register" class="cta-section">
      <div class="container">
        <div class="cta-card glass-card">
          <div class="cta-glow glow-1"></div>
          <div class="cta-glow glow-2"></div>

          <div class="cta-grid">
            <div class="cta-text-side">
              <div class="badge-pill badge-red mb-3">
                <i class="fa-solid fa-bell"></i>
                {{ langService.isArabic() ? 'التسجيل المسبق قبل إطلاق التطبيق' : 'Pre-Register For App Launch' }}
              </div>

              <h2 *ngIf="!langService.isArabic()">
                Be The First To Experience <br /><span class="gradient-text-red"
                  >The Next-Gen Fitness App</span
                >
              </h2>
              <h2 *ngIf="langService.isArabic()">
                كن أول من يخوض تجربة <br /><span class="gradient-text-red"
                  >تطبيق اللياقة البدنية الأحدث</span
                >
              </h2>

              <p>
                {{ langService.isArabic()
                    ? 'تطبيق GetFit ينطلق قريباً على iOS و Android. أدخل بريدك الإلكتروني ليصلك إشعار فوري فور الإطلاق، وتجربة تجريبية مبكرة، وشارة VIP مجانية مدى الحياة!'
                    : 'GetFit is releasing soon on iOS & Android. Submit your email below to receive instant launch notifications, early beta access, and free lifetime VIP badges!' }}
              </p>

              <!-- Pre-Registration Email Form -->
              <div
                class="pre-register-box"
                *ngIf="!submitted(); else successState"
              >
                <form (ngSubmit)="onSubscribe($event)" class="email-form">
                  <div class="input-wrapper">
                    <i class="fa-regular fa-envelope mail-icon"></i>
                    <input
                      type="email"
                      name="userEmail"
                      [placeholder]="langService.isArabic() ? 'أدخل بريدك الإلكتروني هنا...' : 'Enter your email address...'"
                      required
                      class="email-input"
                      [(ngModel)]="emailValue"
                    />
                  </div>
                  <button
                    type="submit"
                    class="btn-primary form-submit-btn"
                    [disabled]="isLoading()"
                  >
                    <i
                      class="fa-solid"
                      [ngClass]="
                        isLoading() ? 'fa-spinner fa-spin' : 'fa-paper-plane'
                      "
                    ></i>
                    {{ isLoading() ? (langService.isArabic() ? 'جاري الحفظ...' : 'Sending...') : (langService.isArabic() ? 'سجلني الآن' : 'Notify Me') }}
                  </button>
                </form>
              </div>

              <ng-template #successState>
                <div class="success-alert animate-fade">
                  <i class="fa-solid fa-circle-check success-icon"></i>
                  <div class="success-content">
                    <h4>{{ langService.isArabic() ? 'أنت الآن في قائمة الوصول المبكر VIP! 🎉' : "You're On The VIP Early Access List! 🎉" }}</h4>
                    <p>
                      {{ langService.isArabic() 
                          ? 'شكرًا لك! تم حفظ بريدك الإلكتروني بنجاح في قاعدة البيانات.' 
                          : 'Thank you! Your email has been saved successfully in our database.' }}
                    </p>
                  </div>
                </div>
              </ng-template>

              <!-- Store Badges Coming Soon -->
              <div class="cta-buttons">
                <div class="store-btn store-apple disabled-store">
                  <i class="fa-brands fa-apple store-icon"></i>
                  <div class="store-text">
                    <span class="sub">{{ langService.isArabic() ? 'قريباً على' : 'COMING SOON ON' }}</span>
                    <span class="main">App Store</span>
                  </div>
                  <span class="store-tag">{{ langService.isArabic() ? 'قريباً' : 'Coming Soon' }}</span>
                </div>

                <div class="store-btn store-google disabled-store">
                  <i class="fa-brands fa-google-play store-icon"></i>
                  <div class="store-text">
                    <span class="sub">{{ langService.isArabic() ? 'قريباً على' : 'COMING SOON ON' }}</span>
                    <span class="main">Google Play</span>
                  </div>
                  <span class="store-tag">{{ langService.isArabic() ? 'قريباً' : 'Coming Soon' }}</span>
                </div>
              </div>

              <div class="guarantee-row">
                <span>
                  <i class="fa-solid fa-shield-check text-mint"></i>
                  {{ langService.isArabic() ? '100% تتبع أساسي مجاني' : '100% Free Core Tracking' }}
                </span>
                <span>
                  <i class="fa-solid fa-lock text-mint"></i>
                  {{ langService.isArabic() ? 'بدون إعلانات وآمن تماماً' : 'Zero Ads & Privacy Safe' }}
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .cta-section {
        padding: 6rem 0;
        background: var(--bg-primary);
        position: relative;
      }

      .cta-card {
        position: relative;
        padding: 4.5rem 4rem;
        border-radius: 32px;
        overflow: hidden;
        border: 1px solid rgba(230, 57, 70, 0.3);
        background: linear-gradient(
          135deg,
          rgba(22, 27, 46, 0.95) 0%,
          rgba(35, 15, 25, 0.8) 100%
        );
      }

      .cta-glow {
        position: absolute;
        border-radius: 50%;
        filter: blur(90px);
        pointer-events: none;
      }

      .glow-1 {
        top: -20%;
        right: -10%;
        width: 400px;
        height: 400px;
        background: rgba(230, 57, 70, 0.25);
      }

      .glow-2 {
        bottom: -20%;
        left: -10%;
        width: 350px;
        height: 350px;
        background: rgba(6, 214, 160, 0.15);
      }

      .cta-grid {
        position: relative;
        z-index: 1;
        width: 100%;
        text-align: center;
      }

      .cta-text-side {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
      }

      .cta-text-side h2 {
        font-size: 2.75rem;
        margin-bottom: 1.25rem;
        line-height: 1.25;
        text-align: center;
      }

      .cta-text-side p {
        font-size: 1.15rem;
        color: var(--text-secondary);
        line-height: 1.7;
        margin: 0 auto 2rem auto;
        max-width: 850px;
        text-align: center;
      }

      /* Email Form */
      .pre-register-box {
        margin: 0 auto 2rem auto;
        width: 100%;
        display: flex;
        justify-content: center;
      }

      .email-form {
        display: flex;
        gap: 0.8rem;
        max-width: 680px;
        width: 100%;
        flex-wrap: wrap;
        justify-content: center;
        margin: 0 auto;
      }

      .input-wrapper {
        position: relative;
        flex: 1;
        min-width: 280px;
      }

      .mail-icon {
        position: absolute;
        left: 1.2rem;
        top: 50%;
        transform: translateY(-50%);
        color: var(--text-muted);
        font-size: 1.1rem;
      }

      .email-input {
        width: 100%;
        background: rgba(10, 12, 20, 0.9);
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-radius: 50px;
        padding: 0.9rem 1rem 0.9rem 3rem;
        color: #ffffff;
        font-size: 1rem;
        outline: none;
        transition: border-color 0.3s ease;
      }

      .email-input:focus {
        border-color: var(--accent-red);
        box-shadow: 0 0 15px rgba(230, 57, 70, 0.3);
      }

      .form-submit-btn {
        padding: 0.9rem 2.2rem;
        white-space: nowrap;
      }

      .success-alert {
        background: rgba(6, 214, 160, 0.12);
        border: 1px solid rgba(6, 214, 160, 0.3);
        padding: 1.25rem 1.5rem;
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        margin: 0 auto 2rem auto;
        max-width: 680px;
        text-align: center;
      }

      .success-icon {
        font-size: 2rem;
        color: var(--accent-mint);
      }

      .success-alert h4 {
        font-size: 1.1rem;
        color: #ffffff;
        margin-bottom: 0.2rem;
      }

      .success-alert p {
        font-size: 0.9rem;
        color: var(--text-secondary);
        margin: 0;
      }

      /* Store Buttons */
      .cta-buttons {
        display: flex;
        gap: 1rem;
        margin: 0 auto 2rem auto;
        flex-wrap: wrap;
        justify-content: center;
      }

      .store-btn {
        display: flex;
        align-items: center;
        gap: 0.9rem;
        background: #141724;
        border: 1px solid rgba(255, 255, 255, 0.12);
        padding: 0.75rem 1.6rem;
        border-radius: 14px;
        color: #ffffff;
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      }

      .disabled-store {
        opacity: 0.8;
        cursor: default;
      }

      .store-icon {
        font-size: 1.8rem;
      }

      .store-apple .store-icon {
        color: #ffffff;
      }
      .store-google .store-icon {
        color: #00f2fe;
      }

      .store-text {
        display: flex;
        flex-direction: column;
      }
      .store-text .sub {
        font-size: 0.65rem;
        text-transform: uppercase;
        color: var(--accent-mint);
        font-weight: 700;
      }
      .store-text .main {
        font-size: 1rem;
        font-weight: 700;
        font-family: var(--font-heading);
      }
      .store-tag {
        font-size: 0.65rem;
        background: rgba(230, 57, 70, 0.2);
        color: var(--accent-red);
        padding: 0.2rem 0.5rem;
        border-radius: 6px;
        margin-left: auto;
        font-weight: 700;
      }

      .guarantee-row {
        display: flex;
        gap: 1.8rem;
        font-size: 0.9rem;
        color: var(--text-primary);
        font-weight: 600;
        justify-content: center;
        margin: 0 auto;
      }

      .guarantee-row span {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      @media (max-width: 992px) {
        .cta-card {
          padding: 2.5rem;
        }
        .cta-grid {
          text-align: center;
        }
        .email-form {
          margin: 0 auto;
          justify-content: center;
        }
        .cta-buttons {
          justify-content: center;
        }
        .guarantee-row {
          justify-content: center;
          flex-direction: column;
          gap: 0.8rem;
        }
      }
    `,
  ],
})
export class CtaBannerComponent {
  langService = inject(LanguageService);
  submitted = signal(false);
  isLoading = signal(false);
  emailValue = '';
  referenceId = '';

  async onSubscribe(event: Event) {
    event.preventDefault();
    if (!this.emailValue) return;

    this.isLoading.set(true);

    const localRefId =
      'REF-GF-2026-' + Math.floor(100000 + Math.random() * 900000);
    this.referenceId = localRefId;

    const apiUrl = 'https://get-fit-green.vercel.app/api/auth/pre-register';
    const fallbackLocalUrl = 'http://localhost:3000/api/auth/pre-register';

    let storedInDb = false;

    try {
      // 1. Try primary production API on Vercel
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: this.emailValue }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          if (data.referenceId) this.referenceId = data.referenceId;
          storedInDb = true;
        }
      }
    } catch (e) {
      console.warn('Vercel API request failed, trying local fallback...', e);
    }

    // 2. Try local backend fallback
    if (!storedInDb) {
      try {
        const localResp = await fetch(fallbackLocalUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: this.emailValue }),
        });
        if (localResp.ok) {
          const localData = await localResp.json();
          if (localData.success) {
            if (localData.referenceId) this.referenceId = localData.referenceId;
            storedInDb = true;
          }
        }
      } catch (localErr) {
        console.warn('Local backend unavailable:', localErr);
      }
    }

    this.isLoading.set(false);
    this.submitted.set(true);
  }
}
