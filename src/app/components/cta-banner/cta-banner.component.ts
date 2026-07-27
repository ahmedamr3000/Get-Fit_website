import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cta-banner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="pre-register" class="cta-section">
      <div class="container">
        <div class="cta-card glass-card">
          <div class="cta-glow glow-1"></div>
          <div class="cta-glow glow-2"></div>

          <div class="cta-grid">
            <div class="cta-text-side">
              <div class="badge-pill badge-red mb-3">
                <i class="fa-solid fa-bell"></i> Pre-Register For App Launch
              </div>

              <h2>Be The First To Experience <br><span class="gradient-text-red">The Next-Gen Fitness App</span></h2>
              
              <p>
                GetFit is releasing soon on iOS & Android. Submit your email below to receive instant launch notifications, early beta access, and free lifetime VIP badges!
              </p>

              <!-- Pre-Registration Email Form -->
              <div class="pre-register-box" *ngIf="!submitted(); else successState">
                <form (ngSubmit)="onSubscribe($event)" class="email-form">
                  <div class="input-wrapper">
                    <i class="fa-regular fa-envelope mail-icon"></i>
                    <input 
                      type="email" 
                      placeholder="Enter your email address..." 
                      required 
                      class="email-input"
                      (input)="emailValue = $any($event.target).value"
                    />
                  </div>
                  <button type="submit" class="btn-primary form-submit-btn">
                    <i class="fa-solid fa-paper-plane"></i> Notify Me
                  </button>
                </form>
              </div>

              <ng-template #successState>
                <div class="success-alert animate-fade">
                  <i class="fa-solid fa-circle-check success-icon"></i>
                  <div>
                    <h4>You're On The VIP Early Access List! 🎉</h4>
                    <p>We'll send your exclusive launch invitation as soon as GetFit drops on the App Store & Google Play.</p>
                  </div>
                </div>
              </ng-template>

              <!-- Store Badges Coming Soon -->
              <div class="cta-buttons">
                <div class="store-btn store-apple disabled-store">
                  <i class="fa-brands fa-apple store-icon"></i>
                  <div class="store-text">
                    <span class="sub">COMING SOON ON</span>
                    <span class="main">App Store</span>
                  </div>
                  <span class="store-tag">Coming Soon</span>
                </div>

                <div class="store-btn store-google disabled-store">
                  <i class="fa-brands fa-google-play store-icon"></i>
                  <div class="store-text">
                    <span class="sub">COMING SOON ON</span>
                    <span class="main">Google Play</span>
                  </div>
                  <span class="store-tag">Coming Soon</span>
                </div>
              </div>

              <div class="guarantee-row">
                <span><i class="fa-solid fa-shield-check text-mint"></i> 100% Free Core Tracking</span>
                <span><i class="fa-solid fa-lock text-mint"></i> Zero Ads & Privacy Safe</span>
              </div>
            </div>

            <!-- Mobile Scan QR Code Card -->
            <div class="qr-side">
              <div class="qr-card">
                <div class="qr-box">
                  <svg viewBox="0 0 100 100" class="qr-svg">
                    <path d="M0,0 h30 v30 h-30 z M10,10 h10 v10 h-10 z" fill="#e63946"/>
                    <path d="M70,0 h30 v30 h-30 z M80,10 h10 v10 h-10 z" fill="#e63946"/>
                    <path d="M0,70 h30 v30 h-30 z M10,80 h10 v10 h-10 z" fill="#e63946"/>
                    <path d="M40,10 h10 v10 h-10 z M55,5 h10 v10 h-10 z M40,40 h20 v20 h-20 z M70,50 h10 v20 h-10 z M50,80 h20 v10 h-20 z M80,80 h15 v15 h-15 z" fill="#ffffff"/>
                  </svg>
                </div>
                <div class="qr-caption">
                  <i class="fa-solid fa-camera"></i> Scan to Pre-Register on Mobile
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
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
      background: linear-gradient(135deg, rgba(22, 27, 46, 0.95) 0%, rgba(35, 15, 25, 0.8) 100%);
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
      display: grid;
      grid-template-columns: 1.4fr 1fr;
      gap: 3.5rem;
      align-items: center;
    }

    .cta-text-side h2 {
      font-size: 2.75rem;
      margin-bottom: 1.25rem;
      line-height: 1.25;
    }

    .cta-text-side p {
      font-size: 1.15rem;
      color: var(--text-secondary);
      line-height: 1.7;
      margin-bottom: 2rem;
    }

    /* Email Form */
    .pre-register-box {
      margin-bottom: 2rem;
    }

    .email-form {
      display: flex;
      gap: 0.8rem;
      max-width: 520px;
      flex-wrap: wrap;
    }

    .input-wrapper {
      position: relative;
      flex: 1;
      min-width: 260px;
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
      padding: 0.9rem 1.8rem;
      white-space: nowrap;
    }

    .success-alert {
      background: rgba(6, 214, 160, 0.12);
      border: 1px solid rgba(6, 214, 160, 0.3);
      padding: 1.25rem 1.5rem;
      border-radius: 20px;
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 2rem;
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
      margin-bottom: 2rem;
      flex-wrap: wrap;
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

    .store-apple .store-icon { color: #ffffff; }
    .store-google .store-icon { color: #00f2fe; }

    .store-text { display: flex; flex-direction: column; }
    .store-text .sub { font-size: 0.65rem; text-transform: uppercase; color: var(--accent-mint); font-weight: 700; }
    .store-text .main { font-size: 1rem; font-weight: 700; font-family: var(--font-heading); }
    .store-tag { font-size: 0.65rem; background: rgba(230, 57, 70, 0.2); color: var(--accent-red); padding: 0.2rem 0.5rem; border-radius: 6px; margin-left: auto; font-weight: 700; }

    .guarantee-row {
      display: flex;
      gap: 1.8rem;
      font-size: 0.9rem;
      color: var(--text-primary);
      font-weight: 600;
    }

    .guarantee-row span {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .qr-side {
      display: flex;
      justify-content: center;
    }

    .qr-card {
      background: rgba(10, 12, 20, 0.85);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 24px;
      padding: 1.8rem;
      text-align: center;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
    }

    .qr-box {
      width: 170px;
      height: 170px;
      background: #ffffff;
      padding: 1rem;
      border-radius: 16px;
      margin: 0 auto 1.2rem auto;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .qr-svg {
      width: 100%;
      height: 100%;
    }

    .qr-caption {
      font-size: 0.85rem;
      color: var(--text-muted);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }

    @media (max-width: 992px) {
      .cta-card { padding: 2.5rem; }
      .cta-grid { grid-template-columns: 1fr; text-align: center; }
      .email-form { margin: 0 auto; justify-content: center; }
      .cta-buttons { justify-content: center; }
      .guarantee-row { justify-content: center; flex-direction: column; gap: 0.8rem; }
    }
  `]
})
export class CtaBannerComponent {
  submitted = signal(false);
  emailValue = '';

  onSubscribe(event: Event) {
    event.preventDefault();
    if (this.emailValue) {
      this.submitted.set(true);
    }
  }
}
