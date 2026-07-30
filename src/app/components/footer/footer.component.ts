import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <!-- Brand Column -->
          <div class="brand-col">
            <a href="#" class="logo">
              <div class="logo-icon">
                <img
                  src="./Gemini_Generated_Image_ecet84ecet84ecet.png"
                  alt="logo"
                  width="30px"
                  height="30px"
                  style="object-fit: contain; border-radius: 6px;"
                />
              </div>
              <span class="logo-text"
                >GET<span class="highlight">FIT</span></span
              >
            </a>

            <p class="brand-desc">
              {{ langService.isArabic()
                  ? 'تطبيق لياقة بدنية عالي الأداء للموبايل. مصمم لتتبع الخطوات، التمارين الذكية، التغذية والمكرو، والمنافسة الجماعية.'
                  : 'High-performance mobile fitness app. Built for step tracking, workout programming, macro nutrition, and social leaderboard competition.' }}
            </p>
          </div>

          <!-- Column 2: Navigation -->
          <div class="footer-col">
            <h4>{{ langService.isArabic() ? 'خريطة الموقع' : 'App Navigation' }}</h4>
            <ul>
              <li><a href="#features">{{ langService.isArabic() ? 'المميزات الأساسية' : 'Core Features' }}</a></li>
              <li><a href="#showcase">{{ langService.isArabic() ? 'تفاعلي والتصميم' : 'Interactive Demo' }}</a></li>
              <li><a href="#pricing">{{ langService.isArabic() ? 'الأسعار والخطط' : 'Pricing Plans' }}</a></li>
              <li><a href="#pre-register">{{ langService.isArabic() ? 'احجز مكانك الآن' : 'Pre-Register Now' }}</a></li>
            </ul>
          </div>

          <!-- Column 3: Support & Policies -->
          <div class="footer-col">
            <h4>{{ langService.isArabic() ? 'الاسترجاع والدعم' : 'Refund & Support' }}</h4>
            <ul>
              <li><a href="#pricing">{{ langService.isArabic() ? 'سياسة الاسترجاع والرد' : 'Refund & Return Policy' }}</a></li>
              <li><a href="#pricing">{{ langService.isArabic() ? 'الأسعار والاشتراكات' : 'Pricing & Billing' }}</a></li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom">
          <p>
            {{ langService.isArabic() 
                ? '© 2026 جميع الحقوق محفوظة لشركة GetFit Technologies. مسجلة في جمهورية مصر العربية.' 
                : '© 2026 GetFit Technologies S.A.E. All rights reserved. Registered in Egypt.' }}
          </p>

          <div class="payment-methods-inline">
            <span class="pay-tag"><i class="fa-brands fa-cc-visa"></i> Visa</span>
            <span class="pay-tag"><i class="fa-brands fa-cc-mastercard"></i> Mastercard</span>
            <span class="pay-tag"><i class="fa-solid fa-credit-card"></i> {{ langService.isArabic() ? 'ميزة' : 'Meeza' }}</span>
            <span class="pay-tag"><i class="fa-solid fa-lock"></i> Kashier Secured</span>
          </div>

          <div class="bottom-badge">
            <i class="fa-solid fa-shield-halved text-mint"></i>
            {{ langService.isArabic() ? 'بنية بيانات آمنة ومشفرة' : 'Secure Data Architecture' }}
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [
    `
      .site-footer {
        background: #06070a;
        border-top: 1px solid rgba(255, 255, 255, 0.08);
        padding: 5rem 0 2rem 0;
        color: var(--text-secondary);
      }

      .footer-grid {
        display: grid;
        grid-template-columns: 1.8fr 1fr 1fr;
        gap: 3rem;
        margin-bottom: 3rem;
      }

      .logo {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        font-family: var(--font-heading);
        font-weight: 900;
        font-size: 1.5rem;
        color: #ffffff;
        margin-bottom: 1rem;
      }

      .logo-icon {
        width: 36px;
        height: 36px;
        background: linear-gradient(135deg, var(--accent-red) 0%, #c1121f 100%);
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ffffff;
        overflow: hidden;
      }

      .logo-text .highlight {
        color: var(--accent-red);
      }

      .brand-desc {
        font-size: 0.95rem;
        line-height: 1.6;
        color: var(--text-muted);
        margin-bottom: 1.5rem;
      }

      .footer-col h4 {
        font-size: 1.05rem;
        margin-bottom: 1.25rem;
        color: #ffffff;
      }

      .footer-col ul {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 0.8rem;
        padding: 0;
      }

      .footer-col a {
        font-size: 0.9rem;
        color: var(--text-muted);
      }

      .footer-col a:hover {
        color: var(--accent-red);
      }

      .footer-bottom {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: 2rem;
        border-top: 1px solid rgba(255, 255, 255, 0.06);
        font-size: 0.85rem;
        color: var(--text-muted);
        flex-wrap: wrap;
        gap: 1rem;
      }

      .payment-methods-inline {
        display: flex;
        gap: 0.6rem;
      }

      .pay-tag {
        background: rgba(255, 255, 255, 0.06);
        padding: 0.25rem 0.6rem;
        border-radius: 6px;
        font-size: 0.75rem;
        color: #ffffff;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 0.4rem;
      }

      .bottom-badge {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 600;
        color: var(--text-primary);
      }

      @media (max-width: 992px) {
        .footer-grid {
          grid-template-columns: 1fr 1fr;
        }
      }

      @media (max-width: 576px) {
        .footer-grid {
          grid-template-columns: 1fr;
        }
        .footer-bottom {
          flex-direction: column;
          gap: 1rem;
          text-align: center;
        }
      }
    `,
  ],
})
export class FooterComponent {
  langService = inject(LanguageService);
}
