import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

type BillingCycle = 'monthly' | '3months' | '6months' | 'annual';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="pricing" class="pricing-section">
      <div class="container">
        <!-- Section Header -->
        <div class="section-header text-center">
          <div class="badge-pill badge-gold mb-3">
            <i class="fa-solid fa-tags"></i>
            {{
              langService.isArabic()
                ? 'خطط اشتراك شفافة ومناسبة'
                : 'Transparent Pricing Tiers'
            }}
          </div>
          <h2 *ngIf="!langService.isArabic()">
            Choose The Plan That <span class="gradient-text-red">Fits Your Goals</span>
          </h2>
          <h2 *ngIf="langService.isArabic()">
            اختر الباقة المناسبة <span class="gradient-text-red">لهدفك الرياضي</span>
          </h2>
          <p class="section-subtitle">
            {{
              langService.isArabic()
                ? 'اختر مدة الاشتراك المناسبة (شهري، 3 شهور، 6 شهور، أو سنة). يمكنك إلغاء الاشتراك واسترداد أموالك خلال 14 يوماً بسهولة.'
                : 'Choose your preferred billing cycle (Monthly, 3 Months, 6 Months, or 1 Year). Cancel anytime with our 14-day refund guarantee.'
            }}
          </p>
        </div>

        <!-- Billing Cycle Tabs (Monthly, 3 Months, 6 Months, Annual) -->
        <div class="billing-tabs-container">
          <div class="billing-tabs glass-card">
            <button 
              class="billing-tab-btn" 
              [class.active]="selectedCycle() === 'monthly'"
              (click)="setCycle('monthly')"
            >
              <i class="fa-regular fa-calendar-days me-1"></i>
              {{ langService.isArabic() ? 'شهرياً' : 'Monthly' }}
            </button>

            <button 
              class="billing-tab-btn" 
              [class.active]="selectedCycle() === '3months'"
              (click)="setCycle('3months')"
            >
              {{ langService.isArabic() ? '3 شهور (وفر 15%)' : '3 Months (Save 15%)' }}
            </button>

            <button 
              class="billing-tab-btn" 
              [class.active]="selectedCycle() === '6months'"
              (click)="setCycle('6months')"
            >
              {{ langService.isArabic() ? '6 شهور (وفر 25%)' : '6 Months (Save 25%)' }}
            </button>

            <button 
              class="billing-tab-btn" 
              [class.active]="selectedCycle() === 'annual'"
              (click)="setCycle('annual')"
            >
              <span>{{ langService.isArabic() ? 'سنة كاملة' : '1 Year' }}</span>
              <span class="save-tag">{{ langService.isArabic() ? 'وفر 40%' : 'Save 40%' }}</span>
            </button>
          </div>
        </div>

        <!-- Pricing Grid -->
        <div class="pricing-grid">
          
          <!-- 1. FREE TIER (المجانية) -->
          <div class="glass-card pricing-card">
            <div class="card-badge-placeholder"></div>
            <div class="plan-header">
              <div class="plan-header-top">
                <div class="plan-icon-box mint">
                  <i class="fa-solid fa-leaf"></i>
                </div>
                <h3>
                  {{
                    langService.isArabic()
                      ? 'الباقة المجانية'
                      : 'Free Starter'
                  }}
                </h3>
              </div>
              <p class="plan-desc">
                {{
                  langService.isArabic()
                    ? 'تتبع الخطوات، شرب المياه، والدخول في لوحة متصدرين أصدقاء فيسبوك مجاناً.'
                    : 'Track steps, water hydration, and access Facebook friends leaderboard for free.'
                }}
              </p>
              
              <div class="price-container">
                <div class="price-box">
                  <span class="currency">{{
                    langService.isArabic() ? 'ج.م' : 'EGP'
                  }}</span>
                  <span class="amount">0</span>
                  <span class="period">{{
                    langService.isArabic() ? '/ مجاناً' : '/ free'
                  }}</span>
                </div>
                <div class="egp-arabic" *ngIf="langService.isArabic()">
                  (0 ج.م مدى الحياة)
                </div>
              </div>
            </div>

            <ul class="plan-features">
              <li>
                <i class="fa-solid fa-check text-mint"></i>
                {{
                  langService.isArabic()
                    ? 'عداد خطوات ومسافات دقيق'
                    : 'Precision Step & Distance Tracker'
                }}
              </li>
              <li>
                <i class="fa-solid fa-check text-mint"></i>
                {{
                  langService.isArabic()
                    ? 'مذكر وتتبع شرب المياه'
                    : 'Water Hydration Tracker & Reminders'
                }}
              </li>
              <li>
                <i class="fa-brands fa-facebook text-mint"></i>
                {{
                  langService.isArabic()
                    ? 'لوحة متصدرين أصدقاء فيسبوك'
                    : 'Facebook Friends Leaderboard'
                }}
              </li>
              <li class="disabled">
                <i class="fa-solid fa-xmark"></i>
                {{
                  langService.isArabic()
                    ? 'إنشاء وتخصيص خطط التمارين'
                    : 'Custom Workout Routine Generator'
                }}
              </li>
              <li class="disabled">
                <i class="fa-solid fa-xmark"></i>
                {{
                  langService.isArabic()
                    ? 'تبديل التمارين وفيديوهات الأداء'
                    : 'Exercise Swapping & Form Videos'
                }}
              </li>
              <li class="disabled">
                <i class="fa-solid fa-xmark"></i>
                {{
                  langService.isArabic()
                    ? 'تبديل أصناف وجبات الدايت'
                    : 'Full Diet Meal Swapping'
                }}
              </li>
              <li class="disabled">
                <i class="fa-solid fa-xmark"></i>
                {{
                  langService.isArabic()
                    ? 'كاميرا الذكاء الاصطناعي لتصوير الأكل'
                    : 'AI Camera Food & Calorie Scanner'
                }}
              </li>
            </ul>

            <a href="#pre-register" class="btn-secondary plan-btn">
              {{
                langService.isArabic() ? 'ابدأ مجاناً الان' : 'Get Started Free'
              }}
            </a>
          </div>

          <!-- 2. SILVER TIER (السيلفر) -->
          <div class="glass-card pricing-card">
            <div class="card-badge-placeholder"></div>
            <div class="plan-header">
              <div class="plan-header-top">
                <div class="plan-icon-box silver">
                  <i class="fa-solid fa-medal"></i>
                </div>
                <h3>
                  {{
                    langService.isArabic() ? 'الباقة الفضية (Silver)' : 'Silver Tier'
                  }}
                </h3>
              </div>
              <p class="plan-desc">
                {{
                  langService.isArabic()
                    ? 'خطتين تمارين أسبوعياً، تبديل التمارين بالفيديوهات، وتخصيص وتبديل وجبات الدايت.'
                    : '2 custom workout plans/week, exercise swaps with videos, and full diet meal swaps.'
                }}
              </p>

              <div class="price-container">
                <div class="price-box">
                  <span class="currency">{{
                    langService.isArabic() ? 'ج.م' : 'EGP'
                  }}</span>
                  <span class="amount">{{ getSilverPrice() }}</span>
                  <span class="period">{{ getSilverPeriod() }}</span>
                </div>
                <div class="egp-arabic" *ngIf="langService.isArabic()">
                  {{ getSilverDetailAr() }}
                </div>
              </div>
            </div>

            <ul class="plan-features">
              <li>
                <i class="fa-solid fa-check text-mint"></i>
                {{
                  langService.isArabic()
                    ? 'كل مميزات الباقة المجانية'
                    : 'Everything in Free Tier'
                }}
              </li>
              <li>
                <i class="fa-solid fa-check text-mint"></i>
                {{
                  langService.isArabic()
                    ? 'إنشاء خطتين تمارين مخصصتين أسبوعياً'
                    : '2 Custom Workout Plans / Week'
                }}
              </li>
              <li>
                <i class="fa-solid fa-check text-mint"></i>
                {{
                  langService.isArabic()
                    ? 'تبديل التمارين وشرح فيديو الأداء الصحيح'
                    : 'Exercise Swapping with Form Videos'
                }}
              </li>
              <li>
                <i class="fa-solid fa-check text-mint"></i>
                {{
                  langService.isArabic()
                    ? 'تبديل أصناف الأكل والوجبات بحرية'
                    : 'Full Diet & Meal Swapping Engine'
                }}
              </li>
              <li>
                <i class="fa-solid fa-check text-mint"></i>
                {{
                  langService.isArabic()
                    ? 'حساب احتياج السعرات والماكروز المخصصة'
                    : 'Custom Macro & Calorie Targets'
                }}
              </li>
              <li class="disabled">
                <i class="fa-solid fa-xmark"></i>
                {{
                  langService.isArabic()
                    ? 'كاميرا الذكاء الاصطناعي لتصوير الأكل'
                    : 'AI Camera Food & Calorie Scanner'
                }}
              </li>
            </ul>

            <a href="#pre-register" class="btn-secondary plan-btn">
              {{
                langService.isArabic()
                  ? 'سجل في باقة السيلفر'
                  : 'Pre-Register Silver'
              }}
            </a>
          </div>

          <!-- 3. GOLD TIER (الجولد - VIP) -->
          <div class="glass-card pricing-card featured">
            <div class="card-badge">
              {{ langService.isArabic() ? 'الباقة الذهبية VIP ⭐' : 'Gold VIP Ultimate ⭐' }}
            </div>
            <div class="plan-header">
              <div class="plan-header-top">
                <div class="plan-icon-box gold">
                  <i class="fa-solid fa-crown"></i>
                </div>
                <h3>
                  {{
                    langService.isArabic() ? 'الباقة الذهبية (Gold)' : 'Gold Tier'
                  }}
                </h3>
              </div>
              <p class="plan-desc">
                {{
                  langService.isArabic()
                    ? 'كل مميزات السيلفر + حصرياً ماسح كاميرا الذكاء الاصطناعي لتصوير الوجبات وتخطيط غير محدود.'
                    : 'Everything in Silver + Exclusive AI Camera Food & Calorie Scanner + Unlimited Plans.'
                }}
              </p>

              <div class="price-container">
                <div class="price-box">
                  <span class="currency">{{
                    langService.isArabic() ? 'ج.م' : 'EGP'
                  }}</span>
                  <span class="amount">{{ getGoldPrice() }}</span>
                  <span class="period">{{ getGoldPeriod() }}</span>
                </div>
                <div class="egp-arabic" *ngIf="langService.isArabic()">
                  {{ getGoldDetailAr() }}
                </div>
              </div>
            </div>

            <ul class="plan-features">
              <li>
                <i class="fa-solid fa-check text-mint"></i>
                {{
                  langService.isArabic()
                    ? 'كل مميزات الباقة الفضية (Silver)'
                    : 'Everything in Silver Tier'
                }}
              </li>
              <li>
                <i class="fa-solid fa-star text-gold"></i>
                <strong style="color: var(--accent-gold);">
                  {{
                    langService.isArabic()
                      ? 'كاميرا الذكاء الاصطناعي لتصوير الأكل وحساب السعرات'
                      : 'AI Photo & Text Food Camera Scanner'
                  }}
                </strong>
              </li>
              <li>
                <i class="fa-solid fa-check text-mint"></i>
                {{
                  langService.isArabic()
                    ? 'جداول تمارين وأنظمة غذائية غير محدودة'
                    : 'Unlimited Workout & Diet Plans'
                }}
              </li>
              <li>
                <i class="fa-solid fa-check text-mint"></i>
                {{
                  langService.isArabic()
                    ? 'تبديل فوري وغير محدود للوجبات والتمارين'
                    : 'Unlimited Meal & Exercise Swaps'
                }}
              </li>
              <li>
                <i class="fa-solid fa-check text-mint"></i>
                {{
                  langService.isArabic()
                    ? 'دعم فني وأولوية خاصة VIP'
                    : 'Priority VIP Customer Support'
                }}
              </li>
              <li>
                <i class="fa-solid fa-check text-mint"></i>
                {{
                  langService.isArabic()
                    ? 'تثبيت السعر مدى الحياة للمشتركين المبكرين'
                    : 'Guaranteed Price Lock For Life'
                }}
              </li>
            </ul>

            <a href="#pre-register" class="btn-primary plan-btn">
              {{
                langService.isArabic()
                  ? 'سجل في الباقة الذهبية VIP'
                  : 'Pre-Register Gold VIP'
              }}
            </a>
          </div>

        </div>

        <!-- Payment Guarantee Bar -->
        <div class="payment-trust-bar glass-card">
          <div class="trust-info">
            <div class="trust-item">
              <i class="fa-solid fa-shield-halved text-mint trust-icon"></i>
              <div>
                <h4>
                  {{
                    langService.isArabic()
                      ? 'ضمان استرداد الأموال خلال 14 يوماً'
                      : '14-Day Money-Back Refund Guarantee'
                  }}
                </h4>
                <p *ngIf="!langService.isArabic()">
                  Not satisfied? Request a full refund within 14 days under our
                  <a (click)="openRefundModal()" class="policy-link"
                    >Refund Policy</a
                  > (Ref Phone: <strong>01069873931</strong>).
                </p>
                <p *ngIf="langService.isArabic()">
                  غير راضٍ عن الخدمة؟ يمكنك طلب استرداد كامل المبلغ خلال 14
                  يوماً وفقاً لـ
                  <a (click)="openRefundModal()" class="policy-link"
                    >سياسة الاسترجاع والرد</a
                  > (الرقم المرجعي: <strong>01069873931</strong>).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Refund Policy Modal -->
    <div
      class="modal-overlay"
      *ngIf="showRefundModal()"
      (click)="closeRefundModal()"
    >
      <div class="modal-card glass-card" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <div class="modal-title">
            <i class="fa-solid fa-rotate-left text-mint"></i>
            <h3>
              {{
                langService.isArabic()
                  ? 'سياسة الاسترجاع والرد الخاصة بتطبيق GetFit'
                  : 'GetFit Refund & Return Policy'
              }}
            </h3>
          </div>
          <button class="close-btn" (click)="closeRefundModal()">
            &times;
          </button>
        </div>

        <div class="modal-body" *ngIf="!langService.isArabic()">
          <div class="policy-section">
            <h4>1. 14-Day Money-Back Guarantee</h4>
            <p>
              We want you to be completely satisfied with GetFit. If you
              purchase a Pro subscription (Silver or Gold) and decide it's
              not for you, you are eligible for a 100% full refund within 14
              days of your initial transaction date.
            </p>
          </div>

          <div class="policy-section">
            <h4>2. How Refunds Are Processed</h4>
            <p>
              All payments and refunds are processed securely. Approved refunds will be
              automatically credited back to your original payment method
              (Credit/Debit Card, Meeza, or Mobile Wallet) within
              <strong>7 to 14 business days</strong> depending on your bank's
              processing times.
            </p>
          </div>

          <div class="policy-section">
            <h4>3. Currency & Charges</h4>
            <p>
              All transactions and refunds are processed strictly in
              <strong>Egyptian Pounds (EGP)</strong>. No administration fees or
              cancellation charges will be deducted for valid refunds requested
              within the 14-day window.
            </p>
          </div>

          <div class="policy-section">
            <h4>4. How to Request a Refund</h4>
            <p>
              To request a refund, please send an email to
              <strong>support&#64;getfit-app.com</strong> with the subject line
              <em>"Refund Request"</em> and include:
            </p>
            <ul>
              <li>Your Registered Account Email</li>
              <li>Transaction Reference ID / Order ID</li>
              <li>Date of Purchase</li>
            </ul>

            <div class="ref-info-box">
              <i class="fa-solid fa-circle-question ref-info-icon"></i>
              <div class="ref-info-text">
                <strong>💡 What is a Transaction Reference ID?</strong>
                <p>
                  A Transaction Reference ID is a
                  <strong
                    >unique payment code (e.g. KASH-987425 or ORD-88102)</strong
                  >
                  sent to your email receipt from payment gateway or your bank.
                  <u>It is not a personal phone number.</u>
                </p>
              </div>
            </div>
          </div>

          <div class="policy-footer-note">
            <p>
              <i class="fa-solid fa-circle-info"></i> For any billing
              assistance, contact customer care at support&#64;getfit-app.com or
              call our Reference Phone: <strong>01069873931</strong> (+20 106 987 3931).
            </p>
          </div>
        </div>

        <div
          class="modal-body"
          *ngIf="langService.isArabic()"
          style="direction: rtl; text-align: right;"
        >
          <div class="policy-section">
            <h4>1. ضمان استرداد الأموال خلال 14 يوماً</h4>
            <p>
              نهتم برضاك الكامل عن تطبيق GetFit. إذا قمت بشراء اشتراك مدفوع
              (سيلفر أو جولد) وقررت أنه غير مناسب لك، يحق لك الحصول على استرداد
              كامل بنسبة 100% لثمن الاشتراك خلال 14 يوماً من تاريخ الشراء.
            </p>
          </div>

          <div class="policy-section">
            <h4>2. طريقة معالجة وتدفق الأموال</h4>
            <p>
              تتم جميع عمليات المدفوعات والاسترجاع بشكل آمن. يتم إعادة
              المبلغ تلقائياً إلى نفس وسيلة الدفع التي استخدمتها (بطاقة ائتمان،
              كارت ميزة، أو المحفظة الإلكترونية) خلال
              <strong>7 إلى 14 يوم عمل</strong> وفقاً لسياسة البنك التابع له.
            </p>
          </div>

          <div class="policy-section">
            <h4>3. العملة والرسوم</h4>
            <p>
              تتم كافة المعاملات والاستردادات بالعملة الرسمية
              <strong>الجنيه المصري (EGP)</strong>. لا يتم خصم أي رسوم إدارية أو
              رسوم إلغاء للطلبات المستوفية للشروط خلال مهلة الـ 14 يوماً.
            </p>
          </div>

          <div class="policy-section">
            <h4>4. كيفية تقديم طلب الاسترجاع</h4>
            <p>
              لتقديم طلب استرجاع المبلغ، يرجى إرسال بريد إلكتروني إلى
              <strong>support&#64;getfit-app.com</strong> بعنوان
              <em>"طلب استرجاع"</em> مع إضافة البيانات التالية:
            </p>
            <ul>
              <li>البريد الإلكتروني المسجل به في التطبيق</li>
              <li>
                الرقم المرجعي للمعاملة / رقم الطلب (Transaction Reference ID)
              </li>
              <li>تاريخ الشراء</li>
            </ul>

            <div class="ref-info-box">
              <i class="fa-solid fa-circle-question ref-info-icon"></i>
              <div class="ref-info-text">
                <strong
                  >💡 ما هو الرقم المرجعي للمعاملة (Transaction Reference
                  ID)؟</strong
                >
                <p>
                  الرقم المرجعي هو
                  <strong
                    >كود فريد للعملية المالية (مثل: KASH-987425 أو
                    ORD-88102)</strong
                  >
                  يتم إرساله إليك في إيميل إيصال الشراء من بوابة الدفع أو
                  البنك. <u>وهو ليس رقم تليفون شخصي.</u>
                </p>
              </div>
            </div>
          </div>

          <div class="policy-footer-note">
            <p>
              <i class="fa-solid fa-circle-info"></i> لأي استفسارات مالية أو طلبات الاسترجاع، تواصل
              مع فريق الدعم عبر البريد support&#64;getfit-app.com أو عبر الرقم المرجعي للدعم: <strong>01069873931</strong> (01069873931 20+).
            </p>
          </div>
        </div>

        <div class="modal-actions">
          <button class="btn-primary modal-ok-btn" (click)="closeRefundModal()">
            {{ langService.isArabic() ? 'فهمت وتأكيد' : 'I Understand' }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .pricing-section {
        padding: 6rem 0;
        background: var(--bg-primary);
        position: relative;
      }

      .section-header {
        max-width: 700px;
        margin: 0 auto 2.5rem auto;
        text-align: center;
      }

      .section-subtitle {
        font-size: 1.1rem;
        color: var(--text-secondary);
        margin-top: 1rem;
      }

      /* Billing Cycle Switcher Tabs */
      .billing-tabs-container {
        display: flex;
        justify-content: center;
        margin-bottom: 3.5rem;
      }

      .billing-tabs {
        display: inline-flex;
        align-items: center;
        background: rgba(20, 23, 36, 0.85);
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 50px;
        padding: 0.4rem;
        gap: 0.4rem;
        flex-wrap: wrap;
        justify-content: center;
      }

      .billing-tab-btn {
        background: transparent;
        border: none;
        color: var(--text-secondary);
        padding: 0.65rem 1.4rem;
        border-radius: 40px;
        font-size: 0.95rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      .billing-tab-btn:hover {
        color: #ffffff;
      }

      .billing-tab-btn.active {
        background: var(--accent-red);
        color: #ffffff;
        box-shadow: var(--shadow-glow-red);
      }

      .save-tag {
        background: #ffd700;
        color: #000000;
        font-size: 0.65rem;
        font-weight: 800;
        padding: 0.15rem 0.5rem;
        border-radius: 20px;
        margin-left: 0.3rem;
      }

      .pricing-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2rem;
        align-items: stretch;
        margin-bottom: 3.5rem;
      }

      .pricing-card {
        position: relative;
        padding: 2.5rem 2rem;
        border-radius: 24px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        transition:
          transform 0.3s ease,
          box-shadow 0.3s ease;
        border: 1px solid rgba(255, 255, 255, 0.08);
      }

      .pricing-card:hover {
        transform: translateY(-8px);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
      }

      .pricing-card.featured {
        border: 2px solid var(--accent-gold);
        background: linear-gradient(
          180deg,
          rgba(255, 215, 0, 0.12) 0%,
          rgba(18, 22, 38, 0.95) 100%
        );
      }

      .card-badge {
        position: absolute;
        top: -14px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #ffd700 0%, #b8860b 100%);
        color: #000000;
        padding: 0.35rem 1.2rem;
        border-radius: 50px;
        font-size: 0.75rem;
        font-weight: 800;
        letter-spacing: 0.5px;
        box-shadow: 0 0 20px rgba(255, 215, 0, 0.4);
        white-space: nowrap;
      }

      /* Card Header Styling */
      .plan-header-top {
        display: flex;
        align-items: center;
        gap: 0.8rem;
        margin-bottom: 0.8rem;
      }

      .plan-icon-box {
        width: 44px;
        height: 44px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        flex-shrink: 0;
      }

      .plan-icon-box.mint {
        background: rgba(6, 214, 160, 0.15);
        color: var(--accent-mint);
      }

      .plan-icon-box.silver {
        background: rgba(224, 225, 221, 0.15);
        color: #e0e1dd;
        border: 1px solid rgba(224, 225, 221, 0.3);
      }

      .plan-icon-box.gold {
        background: rgba(255, 215, 0, 0.15);
        color: var(--accent-gold);
        border: 1px solid rgba(255, 215, 0, 0.3);
      }

      .plan-header h3 {
        font-size: 1.5rem;
        font-weight: 800;
        margin: 0;
      }

      .plan-desc {
        font-size: 0.9rem;
        color: var(--text-muted);
        line-height: 1.5;
        margin-bottom: 1.5rem;
        min-height: 42px;
      }

      /* Price Box Styling Container */
      .price-container {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 16px;
        padding: 1rem 1.25rem;
        margin-bottom: 1.5rem;
      }

      .price-box {
        display: flex;
        align-items: baseline;
        gap: 0.4rem;
        flex-wrap: nowrap;
        white-space: nowrap;
      }

      .price-box .currency {
        font-size: 1.05rem;
        font-weight: 800;
        color: var(--accent-red);
        white-space: nowrap;
      }

      .price-box .amount {
        font-family: var(--font-heading);
        font-size: 2.6rem;
        font-weight: 900;
        color: #ffffff;
        line-height: 1;
        letter-spacing: -1px;
      }

      .price-box .period {
        font-size: 0.85rem;
        color: var(--text-muted);
        font-weight: 600;
        white-space: nowrap;
      }

      .egp-arabic {
        font-size: 0.82rem;
        color: var(--accent-mint);
        margin-top: 0.4rem;
        font-weight: 600;
      }

      .plan-features {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 0.9rem;
        margin-bottom: 2rem;
        border-top: 1px solid rgba(255, 255, 255, 0.08);
        padding-top: 1.5rem;
      }

      .plan-features li {
        font-size: 0.9rem;
        color: var(--text-secondary);
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }

      .plan-features li.disabled {
        color: var(--text-muted);
        opacity: 0.5;
      }

      .plan-btn {
        width: 100%;
        text-align: center;
        padding: 0.85rem;
      }

      /* Trust & Payment Bar */
      .payment-trust-bar {
        padding: 1.8rem 2.5rem;
        border-radius: 24px;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        border: 1px solid rgba(255, 255, 255, 0.1);
      }

      .trust-info {
        display: flex;
        justify-content: center;
      }

      .trust-item {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        max-width: 600px;
      }

      .trust-icon {
        font-size: 1.8rem;
        flex-shrink: 0;
        margin-top: 0.2rem;
      }

      .trust-item h4 {
        font-size: 1.05rem;
        margin-bottom: 0.3rem;
      }

      .trust-item p {
        font-size: 0.9rem;
        color: var(--text-secondary);
      }

      .policy-link {
        color: var(--accent-mint);
        text-decoration: underline;
        cursor: pointer;
      }

      /* Modal Overlay & Styling */
      .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(5, 7, 12, 0.85);
        backdrop-filter: blur(12px);
        z-index: 2000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1.5rem;
      }

      .modal-card {
        background: #111424;
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 24px;
        width: 100%;
        max-width: 680px;
        max-height: 85vh;
        display: flex;
        flex-direction: column;
        box-shadow: 0 25px 60px rgba(0, 0, 0, 0.8);
        overflow: hidden;
      }

      .modal-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1.5rem 2rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      }

      .modal-title {
        display: flex;
        align-items: center;
        gap: 0.8rem;
      }

      .modal-title h3 {
        font-size: 1.2rem;
        font-weight: 700;
      }

      .close-btn {
        background: none;
        border: none;
        color: var(--text-muted);
        font-size: 1.8rem;
        cursor: pointer;
        transition: color 0.2s ease;
      }

      .close-btn:hover {
        color: #ffffff;
      }

      .modal-body {
        padding: 2rem;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }

      .policy-section h4 {
        font-size: 1rem;
        color: #ffffff;
        margin-bottom: 0.5rem;
      }

      .policy-section p {
        font-size: 0.9rem;
        color: var(--text-secondary);
        line-height: 1.6;
      }

      .policy-section ul {
        margin-top: 0.5rem;
        padding-left: 1.5rem;
        color: var(--text-secondary);
        font-size: 0.9rem;
      }

      .ref-info-box {
        margin-top: 1rem;
        background: rgba(155, 93, 229, 0.12);
        border: 1px solid rgba(155, 93, 229, 0.3);
        border-radius: 14px;
        padding: 1rem;
        display: flex;
        gap: 0.8rem;
        align-items: flex-start;
      }

      .ref-info-icon {
        color: var(--accent-purple);
        font-size: 1.2rem;
        margin-top: 0.2rem;
      }

      .ref-info-text strong {
        color: #ffffff;
        font-size: 0.9rem;
        display: block;
        margin-bottom: 0.25rem;
      }

      .ref-info-text p {
        font-size: 0.85rem;
        margin: 0;
      }

      .policy-footer-note {
        background: rgba(255, 255, 255, 0.03);
        padding: 1rem;
        border-radius: 12px;
        border-top: 1px solid rgba(255, 255, 255, 0.06);
      }

      .policy-footer-note p {
        font-size: 0.85rem;
        color: var(--text-muted);
        margin: 0;
      }

      .modal-actions {
        padding: 1.25rem 2rem;
        border-top: 1px solid rgba(255, 255, 255, 0.08);
        display: flex;
        justify-content: flex-end;
      }

      .modal-ok-btn {
        padding: 0.6rem 2rem;
      }

      @media (max-width: 992px) {
        .pricing-grid {
          grid-template-columns: 1fr;
        }
        .billing-tabs {
          width: 100%;
        }
      }
    `,
  ],
})
export class PricingComponent {
  langService = inject(LanguageService);
  showRefundModal = signal<boolean>(false);
  selectedCycle = signal<BillingCycle>('monthly');

  setCycle(cycle: BillingCycle) {
    this.selectedCycle.set(cycle);
  }

  // Silver Tier Amounts (Base 400 EGP)
  getSilverPrice(): string {
    switch (this.selectedCycle()) {
      case 'monthly': return '400';
      case '3months': return '1,020';
      case '6months': return '1,800';
      case 'annual': return '2,880';
    }
  }

  getSilverPeriod(): string {
    const isAr = this.langService.isArabic();
    switch (this.selectedCycle()) {
      case 'monthly': return isAr ? '/ شهرياً' : '/ month';
      case '3months': return isAr ? '/ 3 شهور' : '/ 3 months';
      case '6months': return isAr ? '/ 6 شهور' : '/ 6 months';
      case 'annual': return isAr ? '/ سنوياً' : '/ year';
    }
  }

  getSilverDetailAr(): string {
    switch (this.selectedCycle()) {
      case 'monthly': return '(400 ج.م / شهرياً - ~31 ريال سعودي)';
      case '3months': return '(340 ج.م / شهرياً - إجمالي 1,020 ج.م)';
      case '6months': return '(300 ج.م / شهرياً - إجمالي 1,800 ج.م)';
      case 'annual': return '(240 ج.م / شهرياً - إجمالي 2,880 ج.م)';
    }
  }

  // Gold Tier Amounts (Base 500 EGP)
  getGoldPrice(): string {
    switch (this.selectedCycle()) {
      case 'monthly': return '500';
      case '3months': return '1,275';
      case '6months': return '2,250';
      case 'annual': return '3,600';
    }
  }

  getGoldPeriod(): string {
    const isAr = this.langService.isArabic();
    switch (this.selectedCycle()) {
      case 'monthly': return isAr ? '/ شهرياً' : '/ month';
      case '3months': return isAr ? '/ 3 شهور' : '/ 3 months';
      case '6months': return isAr ? '/ 6 شهور' : '/ 6 months';
      case 'annual': return isAr ? '/ سنوياً' : '/ year';
    }
  }

  getGoldDetailAr(): string {
    switch (this.selectedCycle()) {
      case 'monthly': return '(500 ج.م / شهرياً - ~39 ريال سعودي)';
      case '3months': return '(425 ج.م / شهرياً - إجمالي 1,275 ج.م)';
      case '6months': return '(375 ج.م / شهرياً - إجمالي 2,250 ج.م)';
      case 'annual': return '(300 ج.م / شهرياً - إجمالي 3,600 ج.م)';
    }
  }

  openRefundModal() {
    this.showRefundModal.set(true);
  }

  closeRefundModal() {
    this.showRefundModal.set(false);
  }
}
