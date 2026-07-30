import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

interface Testimonial {
  name: string;
  nameAr: string;
  role: string;
  roleAr: string;
  avatar: string;
  rating: number;
  badge: string;
  badgeAr: string;
  badgeClass: string;
  comment: string;
  commentAr: string;
  stats: string;
  statsAr: string;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="testimonials" class="reviews-section">
      <div class="container">
        
        <div class="section-header">
          <div class="badge-pill badge-gold">
            <i class="fa-solid fa-star"></i>
            {{ langService.isArabic() ? 'آراء الرياضيين' : 'Athlete Reviews' }}
          </div>
          <h2 *ngIf="!langService.isArabic()">
            Loved By Over <span class="gradient-text-mint">50,000 Athletes</span>
          </h2>
          <h2 *ngIf="langService.isArabic()">
            محل ثقة أكثر من <span class="gradient-text-mint">50,000 رياضي</span>
          </h2>
          <p>
            {{ langService.isArabic()
                ? 'اقرأ كيف ساعد تطبيق GetFit الرياضيين والمهتمين باللياقة البدنية في تحويل روتينهم اليومي.'
                : 'Read how GetFit has helped fitness enthusiasts, lifters, and everyday runners transform their daily routine.' }}
          </p>
        </div>

        <div class="reviews-grid">
          <div *ngFor="let rev of reviews" class="glass-card review-card">
            <div class="rev-header">
              <img [src]="rev.avatar" [alt]="rev.name" class="avatar">
              <div>
                <h4>{{ langService.isArabic() ? rev.nameAr : rev.name }}</h4>
                <p class="role">{{ langService.isArabic() ? rev.roleAr : rev.role }}</p>
              </div>
              <span class="badge-pill" [ngClass]="rev.badgeClass">
                {{ langService.isArabic() ? rev.badgeAr : rev.badge }}
              </span>
            </div>

            <div class="stars-row">
              <i *ngFor="let s of [1,2,3,4,5]" class="fa-solid fa-star star"></i>
            </div>

            <p class="comment">"{{ langService.isArabic() ? rev.commentAr : rev.comment }}"</p>

            <div class="stat-highlight">
              <i class="fa-solid fa-chart-line text-mint"></i>
              <span>{{ langService.isArabic() ? rev.statsAr : rev.stats }}</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  `,
  styles: [`
    .reviews-section {
      padding: 6rem 0;
      background: var(--bg-surface);
    }

    .reviews-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
      gap: 2rem;
    }

    .review-card {
      padding: 2rem;
      display: flex;
      flex-direction: column;
    }

    .rev-header {
      display: flex;
      align-items: center;
      gap: 0.9rem;
      margin-bottom: 1rem;
    }

    .avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid var(--accent-red);
    }

    .rev-header h4 {
      font-size: 1.05rem;
      font-weight: 700;
    }

    .role {
      font-size: 0.8rem;
      color: var(--text-muted);
    }

    .stars-row {
      display: flex;
      gap: 0.25rem;
      color: #ffd700;
      margin-bottom: 1rem;
      font-size: 0.9rem;
    }

    .comment {
      font-size: 0.98rem;
      color: var(--text-secondary);
      line-height: 1.6;
      font-style: italic;
      margin-bottom: 1.5rem;
    }

    .stat-highlight {
      margin-top: auto;
      background: rgba(255, 255, 255, 0.03);
      border-top: 1px solid rgba(255, 255, 255, 0.06);
      padding-top: 0.8rem;
      display: flex;
      align-items: center;
      gap: 0.6rem;
      font-size: 0.85rem;
      font-weight: 700;
      color: #ffffff;
    }

    @media (max-width: 768px) {
      .reviews-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class TestimonialsComponent {
  langService = inject(LanguageService);

  reviews: Testimonial[] = [
    {
      name: 'Marcus Vance',
      nameAr: 'ماركوس فانس',
      role: 'CrossFit Athlete & Lifter',
      roleAr: 'لاعب كروس فيت وكمال أجسام',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      rating: 5,
      badge: '#1 Leaderboard',
      badgeAr: '#1 المتصدرين',
      badgeClass: 'badge-gold',
      comment: 'The workout logger is incredible. It tracks my sets, rest times, and progressive overload seamlessly with zero lag!',
      commentAr: 'سجل التمارين مذهل حقاً. يتابع المجموعات وأوقات الراحة والزيادة التدريجية للأوزان دون أي تأخير!',
      stats: 'Gained +4.5kg Muscle Mass in 90 Days',
      statsAr: 'زيادة +4.5 كجم كتلة عضلية في 90 يوماً'
    },
    {
      name: 'Elena Rostova',
      nameAr: 'إيلينا روستوفا',
      role: 'Marathon Runner',
      roleAr: 'عداءة ماراثون',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      rating: 5,
      badge: '10K Steps Daily',
      badgeAr: '10 آلاف خطوة يومياً',
      badgeClass: 'badge-mint',
      comment: 'I love how lightweight the step counter is. Other apps drained my battery by midday, but GetFit runs continuously in the background using minimal power.',
      commentAr: 'أعجبني جداً خفة عداد الخطوات. التطبيقات الأخرى كانت تستهلك البطارية بسرعة، ولكن GetFit يعمل في الخلفية بسلاسة دون استهلاك للبطارية.',
      stats: '1.2M Steps Logged • 850 km Covered',
      statsAr: 'سجلت 1.2 مليون خطوة • وقطعت 850 كم'
    },
    {
      name: 'David Chen',
      nameAr: 'ديفيد تشن',
      role: 'Software Engineer',
      roleAr: 'مهندس برمجيات',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      rating: 5,
      badge: 'Smart Planner Fan',
      badgeAr: 'محب للمخطط الذكي',
      badgeClass: 'badge-purple',
      comment: 'The exercise substitution feature saved my workouts. Whenever a bench is taken, I just hit substitute and keep my intensity high without waiting.',
      commentAr: 'خاصية تبديل التمارين أنقذت تشرذم وقتي في الجيم. عندما يكون جهاز ما مشغولاً، أضغط تبديل وأكمل تمريني بكفاءة دون انتظار.',
      stats: 'Consistency Streak: 140 Consecutive Days',
      statsAr: 'سلسلة الالتزام: 140 يوماً متواصلاً'
    }
  ];
}
