import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  rating: number;
  badge: string;
  badgeClass: string;
  comment: string;
  stats: string;
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
            <i class="fa-solid fa-star"></i> Athlete Reviews
          </div>
          <h2>Loved By Over <span class="gradient-text-mint">50,000 Athletes</span></h2>
          <p>Read how GetFit has helped fitness enthusiasts, lifters, and everyday runners transform their daily routine.</p>
        </div>

        <div class="reviews-grid">
          <div *ngFor="let rev of reviews" class="glass-card review-card">
            <div class="rev-header">
              <img [src]="rev.avatar" [alt]="rev.name" class="avatar">
              <div>
                <h4>{{ rev.name }}</h4>
                <p class="role">{{ rev.role }}</p>
              </div>
              <span class="badge-pill" [ngClass]="rev.badgeClass">{{ rev.badge }}</span>
            </div>

            <div class="stars-row">
              <i *ngFor="let s of [1,2,3,4,5]" class="fa-solid fa-star star"></i>
            </div>

            <p class="comment">"{{ rev.comment }}"</p>

            <div class="stat-highlight">
              <i class="fa-solid fa-chart-line text-mint"></i>
              <span>{{ rev.stats }}</span>
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
  reviews: Testimonial[] = [
    {
      name: 'Marcus Vance',
      role: 'CrossFit Athlete & Lifter',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      rating: 5,
      badge: '#1 Leaderboard',
      badgeClass: 'badge-gold',
      comment: 'The offline workout logger is incredible. I lift in a basement gym with no cellular service, and GetFit never loses my sets or timer progress!',
      stats: 'Gained +4.5kg Muscle Mass in 90 Days'
    },
    {
      name: 'Elena Rostova',
      role: 'Marathon Runner',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      rating: 5,
      badge: '10K Steps Daily',
      badgeClass: 'badge-mint',
      comment: 'I love how lightweight the step counter is. Other apps drained my battery by midday, but GetFit runs continuously in the background using minimal power.',
      stats: '1.2M Steps Logged • 850 km Covered'
    },
    {
      name: 'David Chen',
      role: 'Software Engineer',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      rating: 5,
      badge: 'Smart Planner Fan',
      badgeClass: 'badge-purple',
      comment: 'The exercise substitution feature saved my workouts. Whenever a bench is taken, I just hit substitute and keep my intensity high without waiting.',
      stats: 'Consistency Streak: 140 Consecutive Days'
    }
  ];
}
