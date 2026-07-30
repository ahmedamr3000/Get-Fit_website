import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

interface FeatureItem {
  icon: string;
  badge: string;
  badgeAr: string;
  badgeClass: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  highlights: string[];
  highlightsAr: string[];
}

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="features" class="features-section">
      <div class="container">
        
        <!-- Section Header -->
        <div class="section-header">
          <div class="badge-pill badge-red">
            <i class="fa-solid fa-layer-group"></i>
            {{ langService.isArabic() ? 'منظومة رياضية متكاملة' : 'Complete Fitness Ecosystem' }}
          </div>
          <h2 *ngIf="!langService.isArabic()">
            Designed For Maximum <span class="gradient-text-red">Results & Performance</span>
          </h2>
          <h2 *ngIf="langService.isArabic()">
            مصممة لأعلى <span class="gradient-text-red">نتائج وأداء رياضي</span>
          </h2>
          <p>
            {{ langService.isArabic() 
                ? 'يجمع GetFit بين التمارين الذكية، تصوير الوجبات بالكاميرا، تتبع السعرات، والأنظمة الغذائية المخصصة لمساعدتك في تحقيق أقصى إمكانياتك البدنية.'
                : 'GetFit combines smart routines, camera food scanning, calorie tracking, and customized diet plans into a sleek mobile app experience.' }}
          </p>
        </div>

        <!-- Features Grid -->
        <div class="features-grid">
          <div *ngFor="let feat of features" class="glass-card feature-card">
            <div class="card-header-row">
              <div class="feat-icon-box" [ngClass]="feat.badgeClass">
                <i [class]="feat.icon"></i>
              </div>
              <span class="badge-pill" [ngClass]="feat.badgeClass">
                {{ langService.isArabic() ? feat.badgeAr : feat.badge }}
              </span>
            </div>

            <h3 class="feat-title">
              {{ langService.isArabic() ? feat.titleAr : feat.title }}
            </h3>
            <p class="feat-desc">
              {{ langService.isArabic() ? feat.descriptionAr : feat.description }}
            </p>

            <ul class="feat-checklist">
              <li *ngFor="let point of (langService.isArabic() ? feat.highlightsAr : feat.highlights)">
                <i class="fa-solid fa-circle-check check-icon"></i>
                <span>{{ point }}</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </section>
  `,
  styles: [`
    .features-section {
      padding: 6rem 0;
      position: relative;
      background: linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-surface) 100%);
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 2rem;
    }

    .feature-card {
      padding: 2.25rem;
      position: relative;
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .feature-card:hover {
      transform: translateY(-6px);
      border-color: rgba(230, 57, 70, 0.4);
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5), 0 0 20px rgba(230, 57, 70, 0.15);
    }

    .card-header-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.5rem;
    }

    .feat-icon-box {
      width: 52px;
      height: 52px;
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.4rem;
    }

    .feat-icon-box.badge-red {
      background: rgba(230, 57, 70, 0.15);
      color: var(--accent-red);
    }

    .feat-icon-box.badge-mint {
      background: rgba(6, 214, 160, 0.15);
      color: var(--accent-mint);
    }

    .feat-icon-box.badge-purple {
      background: rgba(155, 93, 229, 0.15);
      color: var(--accent-purple);
    }

    .feat-icon-box.badge-cyan {
      background: rgba(76, 201, 240, 0.15);
      color: var(--accent-cyan);
    }

    .feat-icon-box.badge-gold {
      background: rgba(255, 215, 0, 0.15);
      color: var(--accent-gold);
    }

    .feat-title {
      font-size: 1.4rem;
      font-weight: 700;
      margin-bottom: 0.8rem;
    }

    .feat-desc {
      font-size: 0.98rem;
      color: var(--text-secondary);
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }

    .feat-checklist {
      list-style: none;
      margin-top: auto;
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
      padding-top: 1rem;
      border-top: 1px solid rgba(255, 255, 255, 0.06);
    }

    .feat-checklist li {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      font-size: 0.88rem;
      color: var(--text-primary);
    }

    .check-icon {
      color: var(--accent-mint);
      font-size: 0.95rem;
    }

    @media (max-width: 768px) {
      .features-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class FeaturesComponent {
  langService = inject(LanguageService);

  features: FeatureItem[] = [
    {
      icon: 'fa-solid fa-dumbbell',
      badge: 'Smart Engine',
      badgeAr: 'المحرك الذكي',
      badgeClass: 'badge-red',
      title: 'Smart Workout Routine & Substitutions',
      titleAr: 'تمارين وتعديلات ذكية مخصصة',
      description: 'Generates customized gym and home workout routines tailored to your available equipment, goals, and skill level with automatic alternative exercise suggestions.',
      descriptionAr: 'يولد جداول تمارين مخصصة للمنزل أو الجيم بناءً على أدواتك المتاحة، أهدافك، ومستواك البدني مع اقتراح بدائل تمارين أسهل وأنسب تلقائياً.',
      highlights: [
        'Dynamic Exercise Substitutions',
        'Built-in Rest Timers & Audio Cues',
        'Detailed Form Guidelines & Videos'
      ],
      highlightsAr: [
        'بدائل تمارين مخصصة تلقائية',
        'مؤقت راحة وتنبيهات صوتية مدمجة',
        'شرح فيديو وتوجيهات للأداء الصحيح'
      ]
    },
    {
      icon: 'fa-solid fa-shoe-prints',
      badge: 'Step Tracker',
      badgeAr: 'متتبع الخطوات',
      badgeClass: 'badge-mint',
      title: 'Precision Pedometer & Health Sync',
      titleAr: 'عداد خطوات دقيق ومزامنة صحية',
      description: 'Ultra-low battery background step counter using device pedometer hardware and native health services for real-time distance and active calorie estimation.',
      descriptionAr: 'عداد خطوات خلفي دقيق وموفر للبطارية يتعامل مباشرة مع حساسات الموبايل لحساب المسافة والسعرات المحروقة بدقة.',
      highlights: [
        'Zero Battery Drain Background Tracking',
        'Apple Health & Google Fit Sync',
        'Daily Milestones & Streak Counter'
      ],
      highlightsAr: [
        'تتبع خلفي موفر جداً للبطارية',
        'مزامنة مع Apple Health و Google Fit',
        'حساب الإنجاز اليومي وسلسلة الاستمرارية'
      ]
    },
    {
      icon: 'fa-solid fa-utensils',
      badge: 'Custom Diet & Swaps',
      badgeAr: 'دايت مخصص وتبديل الأكل',
      badgeClass: 'badge-purple',
      title: 'Customized Diet Plans & Instant Meal Swapping',
      titleAr: 'أنظمة تغذية مخصصة + تبديل أي صنف بضغطة زر',
      description: 'Design a diet plan built around your calories and physical goal. Include your favorite foods, exclude foods you dislike, and instantly swap any meal item for a healthy alternative anytime.',
      descriptionAr: 'صمم خطتك الغذائية المخصصة بدقة حسب هدفك البدني وسعراتك اليومية. أضف وجباتك وأطعمتك المفضلة واستبعد الأطعمة التي لا تحبها، مع إمكانية تبديل أي صنف وجبة بأطعمة صحية أخرى متكافئة في أي وقت بضغطة زر واحدة.',
      highlights: [
        'Personalized Calorie & Target Split',
        'Include Favorite Foods & Exclude Hated Foods',
        '1-Tap Instant Healthy Meal Swapping'
      ],
      highlightsAr: [
        'نظام مخصص لسعراتك وهدفك البدني',
        'إضافة أطعمتك المفضلة واستبعاد ما لا تحبه',
        'تبديل فوري لأي صنف بأكل صحي متكافئ'
      ]
    },
    {
      icon: 'fa-solid fa-camera-retro',
      badge: 'AI Food Scanner',
      badgeAr: 'ماكينة السعرات بالذكاء الاصطناعي',
      badgeClass: 'badge-gold',
      title: 'AI Photo & Text Calorie Scanner',
      titleAr: 'صوّر وجبتك بالكاميرا أو اكتب مكوناتها نصياً',
      description: 'Snap a photo of your meal or write its ingredients in plain text. GetFit’s AI vision engine automatically recognizes all food components, calculates total calories, and breaks down protein, carbs, and fats with high precision.',
      descriptionAr: 'التقط صورة لطبقك بالكاميرا أو اكتب مكونات الوجبة نصياً، وسيقوم الذكاء الاصطناعي فوراً بفك شفرة مكونات الأكل، وحساب إجمالي السعرات الحرارية وتقسيم البروتين والدهون والنشويات بدقة عالية.',
      highlights: [
        'Instant Photo Food Recognition',
        'Plain Text Meal Description Scanner',
        'Automatic Calorie & Macro Breakdown'
      ],
      highlightsAr: [
        'تعرف فوري على الأكل بالصور والكاميرا',
        'تحليل السعرات بالوصف النصي للوجبة',
        'حساب تلقائي دقيق للسعرات والمكرو'
      ]
    },
    {
      icon: 'fa-solid fa-droplet',
      badge: 'Hydration',
      badgeAr: 'التروية والمياه',
      badgeClass: 'badge-cyan',
      title: 'Visual Water Tracker & Smart Alerts',
      titleAr: 'متتبع شرب المياه وتنبيهات منتظمة',
      description: 'Maintain optimal hydration levels with instant visual progress logging, customizable daily water goals, and smart interval notifications.',
      descriptionAr: 'حافظ على تروية جسمك مع تسجيل مرئي سريع لشرب المياه، وأهداف يومية وتنبيهات ذكية مذكرة.',
      highlights: [
        'Quick-Add Preset Volume Buttons',
        'Visual Hydration Goal Progress',
        'Customizable Reminder Schedule'
      ],
      highlightsAr: [
        'أزرار سريعة لإضافة كميات المياه',
        'مؤشر مرئي لنسبة الانتهاء من الهدف',
        'جدول تنبيهات مخصص حسب رغبتك'
      ]
    },
    {
      icon: 'fa-solid fa-shield-halved',
      badge: 'Privacy First',
      badgeAr: 'الخصوصية أولاً',
      badgeClass: 'badge-red',
      title: '100% Secure & Private Architecture',
      titleAr: 'بنية آمنة ومشفرة 100%',
      description: 'Your health data belongs to you. GetFit keeps your personal information protected with ultra-fast synchronization and complete privacy control.',
      descriptionAr: 'بياناتك الصحية ملكك وحدك. يحافظ GetFit على خصوصيتك مع مزامنة سريعة للغاية وتشغيل آمن دون أي تتبع.',
      highlights: [
        'Zero Data Sales or Tracking',
        'Instant Local Storage Load Times',
        'Seamless Cloud Backup Option'
      ],
      highlightsAr: [
        'لا يتم بيع أو مشاركة أي بيانات شخصية',
        'سرعة فتح فائقة باستخدام التخزين المحلي',
        'نسخ احتياطي سحابي آمن ومباشر'
      ]
    }
  ];
}
