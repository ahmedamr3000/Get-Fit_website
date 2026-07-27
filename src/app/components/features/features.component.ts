import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FeatureItem {
  icon: string;
  badge: string;
  badgeClass: string;
  title: string;
  description: string;
  highlights: string[];
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
            <i class="fa-solid fa-layer-group"></i> Complete Fitness Ecosystem
          </div>
          <h2>Designed For Maximum <span class="gradient-text-red">Results & Performance</span></h2>
          <p>
            GetFit combines five core tracking engines into a sleek, offline-first mobile app experience engineered to help you conquer your physical potential.
          </p>
        </div>

        <!-- Features Grid -->
        <div class="features-grid">
          <div *ngFor="let feat of features" class="glass-card feature-card">
            <div class="card-header-row">
              <div class="feat-icon-box" [ngClass]="feat.badgeClass">
                <i [class]="feat.icon"></i>
              </div>
              <span class="badge-pill" [ngClass]="feat.badgeClass">{{ feat.badge }}</span>
            </div>

            <h3 class="feat-title">{{ feat.title }}</h3>
            <p class="feat-desc">{{ feat.description }}</p>

            <ul class="feat-checklist">
              <li *ngFor="let point of feat.highlights">
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
  features: FeatureItem[] = [
    {
      icon: 'fa-solid fa-dumbbell',
      badge: 'Smart Engine',
      badgeClass: 'badge-red',
      title: 'Smart Workout Routine & Substitutions',
      description: 'Generates customized gym and home workout routines tailored to your available equipment, goals, and skill level with automatic alternative exercise suggestions.',
      highlights: [
        'Dynamic Exercise Substitutions',
        'Built-in Rest Timers & Audio Cues',
        'Detailed Form Guidelines & Videos'
      ]
    },
    {
      icon: 'fa-solid fa-shoe-prints',
      badge: 'Step Tracker',
      badgeClass: 'badge-mint',
      title: 'Precision Pedometer & Health Sync',
      description: 'Ultra-low battery background step counter using device pedometer hardware and native health services for real-time distance and active calorie estimation.',
      highlights: [
        'Zero Battery Drain Background Tracking',
        'Apple Health & Google Fit Sync',
        'Daily Milestones & Streak Counter'
      ]
    },
    {
      icon: 'fa-solid fa-apple-whole',
      badge: 'Nutrition',
      badgeClass: 'badge-purple',
      title: 'Macro Calorie Counter & Diet Generator',
      description: 'Keep track of your protein, carbs, and fats breakdown. Generate customized meal plans based on your target weight, TDEE, and dietary preferences.',
      highlights: [
        'Custom Macro Breakdown Graphs',
        'Smart Recipe & Meal Replacement Engine',
        'Personalized TDEE & Calorie Target'
      ]
    },
    {
      icon: 'fa-solid fa-droplet',
      badge: 'Hydration',
      badgeClass: 'badge-cyan',
      title: 'Visual Water Tracker & Smart Alerts',
      description: 'Maintain optimal hydration levels with instant visual progress logging, customizable daily water goals, and smart interval notifications.',
      highlights: [
        'Quick-Add Preset Volume Buttons',
        'Visual Hydration Goal Progress',
        'Customizable Reminder Schedule'
      ]
    },
    {
      icon: 'fa-solid fa-trophy',
      badge: 'Social Rank',
      badgeClass: 'badge-gold',
      title: 'Global Community Leaderboard',
      description: 'Earn experience points for workouts, steps, and hydration logs. Rise through global ranks and unlock shiny Gold, Silver, and Bronze achievement badges.',
      highlights: [
        'Real-Time Global & Friend Rankings',
        'Collectible Achievement Medals',
        'Community Weekly Challenges'
      ]
    },
    {
      icon: 'fa-solid fa-shield-halved',
      badge: 'Privacy First',
      badgeClass: 'badge-red',
      title: '100% Offline-First Architecture',
      description: 'Your health data belongs to you. GetFit runs completely offline with instant local SQLite synchronization and zero cloud dependency unless requested.',
      highlights: [
        'Zero Data Sales or Tracking',
        'Instant Local Storage Load Times',
        'Seamless Cloud Backup Option'
      ]
    }
  ];
}
