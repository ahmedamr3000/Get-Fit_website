import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TabScreen {
  id: string;
  name: string;
  icon: string;
  badge: string;
  title: string;
  description: string;
  metrics: { label: string; value: string }[];
}

@Component({
  selector: 'app-showcase',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="showcase" class="showcase-section">
      <div class="container">
        
        <div class="section-header">
          <div class="badge-pill badge-purple">
            <i class="fa-solid fa-mobile-screen-button"></i> Interactive Experience
          </div>
          <h2>Explore The Mobile Interface <span class="gradient-text-purple">In Action</span></h2>
          <p>
            Experience how seamless fitness tracking feels. Switch between app views to preview GetFit's high-performance user interface.
          </p>
        </div>

        <!-- Interactive Screen Switcher Navigation -->
        <div class="tabs-nav">
          <button 
            *ngFor="let tab of tabs" 
            class="tab-btn" 
            [class.active]="activeTabId() === tab.id"
            (click)="selectTab(tab.id)"
          >
            <i [class]="tab.icon"></i>
            <span>{{ tab.name }}</span>
          </button>
        </div>

        <!-- Showcase Body Grid -->
        <div class="showcase-content glass-card">
          <!-- Text Details Column -->
          <div class="showcase-info">
            <span class="badge-pill badge-red mb-3">{{ currentTab().badge }}</span>
            <h3 class="tab-heading">{{ currentTab().title }}</h3>
            <p class="tab-desc">{{ currentTab().description }}</p>

            <div class="tab-metrics-grid">
              <div *ngFor="let m of currentTab().metrics" class="metric-box">
                <span class="m-val">{{ m.value }}</span>
                <span class="m-lbl">{{ m.label }}</span>
              </div>
            </div>
          </div>

          <!-- Interactive Mobile Phone Preview Screen -->
          <div class="showcase-phone-container">
            <div class="phone-frame">
              <div class="phone-speaker"></div>
              
              <div class="phone-inner-screen">
                
                <!-- 1. WORKOUT SCREEN VIEW -->
                <div *ngIf="activeTabId() === 'workout'" class="screen-view animate-fade">
                  <div class="app-bar">
                    <span class="app-title">Workout Routine</span>
                    <span class="status-badge">Smart Engine</span>
                  </div>
                  
                  <div class="routine-banner">
                    <div class="routine-tag">Day 1 • Push Day</div>
                    <h4>Hypertrophy Chest & Shoulders</h4>
                    <p>6 Exercises • 55 Mins</p>
                  </div>

                  <div class="ex-list">
                    <div class="ex-item">
                      <div class="ex-num">1</div>
                      <div class="ex-details">
                        <h5>Incline Dumbbell Press</h5>
                        <p>4 Sets x 10 Reps • 28 kg</p>
                      </div>
                      <i class="fa-solid fa-circle-check done-icon"></i>
                    </div>

                    <div class="ex-item active">
                      <div class="ex-num">2</div>
                      <div class="ex-details">
                        <h5>Barbell Bench Press</h5>
                        <p>3 Sets x 8 Reps • 80 kg</p>
                      </div>
                      <span class="substitute-pill"><i class="fa-solid fa-shuffle"></i> Swap</span>
                    </div>

                    <div class="ex-item">
                      <div class="ex-num">3</div>
                      <div class="ex-details">
                        <h5>Cable Chest Flyes</h5>
                        <p>3 Sets x 12 Reps • 15 kg</p>
                      </div>
                      <i class="fa-regular fa-circle pending-icon"></i>
                    </div>
                  </div>
                </div>

                <!-- 2. STEPS SCREEN VIEW -->
                <div *ngIf="activeTabId() === 'steps'" class="screen-view animate-fade">
                  <div class="app-bar">
                    <span class="app-title">Step Dashboard</span>
                    <span class="status-badge mint">Pedometer Live</span>
                  </div>

                  <div class="big-step-widget">
                    <div class="step-circle-outer">
                      <div class="step-circle-inner">
                        <i class="fa-solid fa-shoe-prints step-icon"></i>
                        <span class="step-count">10,480</span>
                        <span class="step-target">Goal: 10,000</span>
                      </div>
                    </div>
                  </div>

                  <div class="step-stats-row">
                    <div class="s-box">
                      <i class="fa-solid fa-fire text-red"></i>
                      <span>780 kcal</span>
                      <small>Burned</small>
                    </div>
                    <div class="s-box">
                      <i class="fa-solid fa-route text-cyan"></i>
                      <span>7.8 km</span>
                      <small>Distance</small>
                    </div>
                    <div class="s-box">
                      <i class="fa-solid fa-clock text-gold"></i>
                      <span>85 mins</span>
                      <small>Active</small>
                    </div>
                  </div>
                </div>

                <!-- 3. NUTRITION SCREEN VIEW -->
                <div *ngIf="activeTabId() === 'nutrition'" class="screen-view animate-fade">
                  <div class="app-bar">
                    <span class="app-title">Macro Tracker</span>
                    <span class="status-badge purple">Smart Diet</span>
                  </div>

                  <div class="calorie-summary-card">
                    <div class="c-title">Daily Calorie Target</div>
                    <div class="c-val">2,150 / 2,600 kcal</div>
                    <div class="macro-bars-stack">
                      <div class="m-segment protein" style="width: 40%"></div>
                      <div class="m-segment carbs" style="width: 35%"></div>
                      <div class="m-segment fats" style="width: 25%"></div>
                    </div>
                    <div class="macro-legend">
                      <span><i class="dot protein"></i> Protein 160g</span>
                      <span><i class="dot carbs"></i> Carbs 210g</span>
                      <span><i class="dot fats"></i> Fats 65g</span>
                    </div>
                  </div>

                  <div class="meal-log-item">
                    <div class="m-icon"><i class="fa-solid fa-drumstick-bite"></i></div>
                    <div>
                      <h6>Grilled Chicken & Quinoa Bowl</h6>
                      <p>Lunch • 650 kcal • 52g Protein</p>
                    </div>
                  </div>
                </div>

                <!-- 4. WATER SCREEN VIEW -->
                <div *ngIf="activeTabId() === 'water'" class="screen-view animate-fade">
                  <div class="app-bar">
                    <span class="app-title">Hydration Log</span>
                    <span class="status-badge cyan">Goal 80%</span>
                  </div>

                  <div class="water-glass-widget">
                    <div class="water-level-fill">
                      <div class="wave-animation"></div>
                      <div class="water-val-text">
                        <i class="fa-solid fa-droplet drop-icon"></i>
                        <span>2,400 ml</span>
                        <small>Target: 3,000 ml</small>
                      </div>
                    </div>
                  </div>

                  <div class="quick-add-row">
                    <button class="add-btn">+ 250ml</button>
                    <button class="add-btn">+ 500ml</button>
                    <button class="add-btn">+ 750ml</button>
                  </div>
                </div>

                <!-- 5. LEADERBOARD SCREEN VIEW -->
                <div *ngIf="activeTabId() === 'leaderboard'" class="screen-view animate-fade">
                  <div class="app-bar">
                    <span class="app-title">Global Leaderboard</span>
                    <span class="status-badge gold">Week 30</span>
                  </div>

                  <div class="podium-row">
                    <div class="podium-place p2">
                      <span class="rank-num">2</span>
                      <span class="p-name">Sarah M.</span>
                      <span class="p-pts">14,200 pts</span>
                    </div>
                    <div class="podium-place p1">
                      <i class="fa-solid fa-crown crown-gold"></i>
                      <span class="rank-num">1</span>
                      <span class="p-name">Alex J.</span>
                      <span class="p-pts">16,850 pts</span>
                    </div>
                    <div class="podium-place p3">
                      <span class="rank-num">3</span>
                      <span class="p-name">David K.</span>
                      <span class="p-pts">13,100 pts</span>
                    </div>
                  </div>

                  <div class="rank-list">
                    <div class="rank-row current-user">
                      <span>#1 (You)</span>
                      <span>Alex J.</span>
                      <span class="badge-gold">Gold Medal</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  `,
  styles: [`
    .showcase-section {
      padding: 6rem 0;
      background: var(--bg-surface);
    }

    .tabs-nav {
      display: flex;
      justify-content: center;
      gap: 1rem;
      flex-wrap: wrap;
      margin-bottom: 3rem;
    }

    .tab-btn {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 0.8rem 1.6rem;
      border-radius: 50px;
      color: var(--text-secondary);
      font-size: 0.95rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .tab-btn:hover {
      background: rgba(255, 255, 255, 0.08);
      color: #ffffff;
    }

    .tab-btn.active {
      background: linear-gradient(135deg, var(--accent-red) 0%, #c1121f 100%);
      color: #ffffff;
      border-color: var(--accent-red);
      box-shadow: var(--shadow-glow-red);
    }

    .showcase-content {
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      gap: 3rem;
      padding: 3.5rem;
      align-items: center;
    }

    .tab-heading {
      font-size: 2.2rem;
      margin-bottom: 1.25rem;
    }

    .tab-desc {
      font-size: 1.1rem;
      line-height: 1.7;
      color: var(--text-secondary);
      margin-bottom: 2rem;
    }

    .tab-metrics-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
    }

    .metric-box {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      padding: 1.25rem;
      border-radius: 16px;
      display: flex;
      flex-direction: column;
    }

    .m-val {
      font-family: var(--font-heading);
      font-size: 1.8rem;
      font-weight: 800;
      color: var(--accent-mint);
    }

    .m-lbl {
      font-size: 0.85rem;
      color: var(--text-muted);
    }

    /* Showcase Phone Mockup */
    .showcase-phone-container {
      display: flex;
      justify-content: center;
    }

    .phone-frame {
      width: 290px;
      height: 570px;
      background: #0d0f19;
      border: 8px solid #1e2338;
      border-radius: 40px;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
      padding: 1rem 0.8rem;
      position: relative;
    }

    .phone-speaker {
      width: 60px;
      height: 8px;
      background: #1e2338;
      border-radius: 4px;
      margin: 0 auto 1rem auto;
    }

    .phone-inner-screen {
      height: calc(100% - 24px);
      overflow-y: auto;
    }

    .screen-view {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .animate-fade {
      animation: fadeIn 0.4s ease-in-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .app-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .app-title {
      font-weight: 700;
      font-size: 0.95rem;
    }

    .status-badge {
      font-size: 0.65rem;
      padding: 0.2rem 0.6rem;
      border-radius: 8px;
      background: rgba(230, 57, 70, 0.15);
      color: var(--accent-red);
    }

    .status-badge.mint { background: rgba(6, 214, 160, 0.15); color: var(--accent-mint); }
    .status-badge.purple { background: rgba(155, 93, 229, 0.15); color: var(--accent-purple); }
    .status-badge.cyan { background: rgba(76, 201, 240, 0.15); color: var(--accent-cyan); }
    .status-badge.gold { background: rgba(255, 215, 0, 0.15); color: var(--accent-gold); }

    .routine-banner {
      background: linear-gradient(135deg, rgba(230, 57, 70, 0.2) 0%, rgba(26, 28, 46, 0.8) 100%);
      padding: 1rem;
      border-radius: 14px;
      border: 1px solid rgba(230, 57, 70, 0.3);
    }
    .routine-tag { font-size: 0.65rem; color: var(--accent-red); font-weight: 700; }
    .routine-banner h4 { font-size: 0.9rem; margin: 0.2rem 0; }
    .routine-banner p { font-size: 0.7rem; color: var(--text-muted); }

    .ex-list { display: flex; flex-direction: column; gap: 0.6rem; }
    .ex-item {
      display: flex; align-items: center; gap: 0.6rem;
      background: rgba(255,255,255,0.03); padding: 0.6rem; border-radius: 10px;
    }
    .ex-item.active { border: 1px solid var(--accent-red); background: rgba(230,57,70,0.08); }
    .ex-num { font-weight: 700; font-size: 0.8rem; color: var(--text-muted); }
    .ex-details h5 { font-size: 0.75rem; }
    .ex-details p { font-size: 0.65rem; color: var(--text-muted); }
    .done-icon { color: var(--accent-mint); font-size: 0.9rem; margin-left: auto; }
    .pending-icon { color: var(--text-muted); font-size: 0.9rem; margin-left: auto; }
    .substitute-pill {
      margin-left: auto; font-size: 0.65rem; background: rgba(155,93,229,0.2);
      color: var(--accent-purple); padding: 0.2rem 0.5rem; border-radius: 6px;
    }

    .big-step-widget { display: flex; justify-content: center; margin: 1rem 0; }
    .step-circle-outer {
      width: 140px; height: 140px; border-radius: 50%;
      background: conic-gradient(var(--accent-mint) 0% 85%, rgba(255,255,255,0.08) 85% 100%);
      display: flex; align-items: center; justify-content: center;
    }
    .step-circle-inner {
      width: 115px; height: 115px; background: #0d0f19; border-radius: 50%;
      display: flex; flex-direction: column; align-items: center; justify-content: center;
    }
    .step-icon { color: var(--accent-mint); font-size: 1.2rem; margin-bottom: 0.2rem; }
    .step-count { font-weight: 800; font-size: 1.2rem; }
    .step-target { font-size: 0.65rem; color: var(--text-muted); }

    .step-stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem; }
    .s-box { background: rgba(255,255,255,0.04); padding: 0.5rem; border-radius: 10px; text-align: center; }
    .s-box i { font-size: 0.9rem; display: block; margin-bottom: 0.2rem; }
    .s-box span { font-size: 0.75rem; font-weight: 700; display: block; }
    .s-box small { font-size: 0.6rem; color: var(--text-muted); }

    .calorie-summary-card { background: rgba(255,255,255,0.04); padding: 0.8rem; border-radius: 12px; }
    .c-title { font-size: 0.7rem; color: var(--text-muted); }
    .c-val { font-size: 1rem; font-weight: 800; margin: 0.2rem 0 0.6rem 0; }
    .macro-bars-stack { display: flex; height: 8px; border-radius: 4px; overflow: hidden; margin-bottom: 0.6rem; }
    .m-segment.protein { background: var(--accent-red); }
    .m-segment.carbs { background: var(--accent-mint); }
    .m-segment.fats { background: var(--accent-purple); }
    .macro-legend { display: flex; justify-content: space-between; font-size: 0.6rem; color: var(--text-muted); }

    .meal-log-item { display: flex; gap: 0.6rem; align-items: center; background: rgba(255,255,255,0.03); padding: 0.6rem; border-radius: 10px; }
    .m-icon { width: 32px; height: 32px; background: rgba(155,93,229,0.15); color: var(--accent-purple); border-radius: 8px; display: flex; align-items: center; justify-content: center; }
    .meal-log-item h6 { font-size: 0.75rem; }
    .meal-log-item p { font-size: 0.65rem; color: var(--text-muted); }

    .water-glass-widget { height: 180px; background: rgba(76,201,240,0.05); border-radius: 16px; border: 1px solid rgba(76,201,240,0.2); position: relative; overflow: hidden; display: flex; align-items: flex-end; }
    .water-level-fill { width: 100%; height: 80%; background: linear-gradient(180deg, rgba(76,201,240,0.4) 0%, rgba(76,201,240,0.8) 100%); display: flex; align-items: center; justify-content: center; }
    .water-val-text { text-align: center; color: #ffffff; }
    .drop-icon { font-size: 1.5rem; margin-bottom: 0.2rem; }
    .water-val-text span { display: block; font-weight: 800; font-size: 1.1rem; }
    .water-val-text small { font-size: 0.65rem; }

    .quick-add-row { display: flex; gap: 0.4rem; justify-content: center; }
    .add-btn { background: rgba(76,201,240,0.15); border: 1px solid rgba(76,201,240,0.3); color: var(--accent-cyan); padding: 0.4rem 0.6rem; border-radius: 8px; font-size: 0.7rem; font-weight: 700; cursor: pointer; }

    .podium-row { display: flex; justify-content: center; align-items: flex-end; gap: 0.5rem; margin: 1rem 0; }
    .podium-place { display: flex; flex-direction: column; align-items: center; padding: 0.5rem; border-radius: 10px; background: rgba(255,255,255,0.04); }
    .podium-place.p1 { background: rgba(255,215,0,0.15); border: 1px solid var(--accent-gold); transform: translateY(-10px); }
    .crown-gold { color: var(--accent-gold); font-size: 0.8rem; margin-bottom: 0.2rem; }
    .rank-num { font-weight: 800; font-size: 0.9rem; }
    .p-name { font-size: 0.65rem; }
    .p-pts { font-size: 0.6rem; color: var(--text-muted); }

    .rank-list { margin-top: 0.5rem; }
    .rank-row { display: flex; justify-content: space-between; padding: 0.6rem; background: rgba(255,215,0,0.1); border-radius: 8px; font-size: 0.7rem; font-weight: 700; }

    @media (max-width: 992px) {
      .showcase-content {
        grid-template-columns: 1fr;
        padding: 2rem;
      }
    }
  `]
})
export class AppShowcaseComponent {
  activeTabId = signal<string>('workout');

  tabs: TabScreen[] = [
    {
      id: 'workout',
      name: 'Workout Engine',
      icon: 'fa-solid fa-dumbbell',
      badge: 'Smart Workout Planner',
      title: 'Hyper-Personalized Workout Programs',
      description: 'Generates progressive muscle building, fat loss, or endurance routines. Swap out exercises effortlessly with intelligent substitution algorithms.',
      metrics: [
        { label: 'Built-in Exercises', value: '250+' },
        { label: 'Rest Timer Sync', value: '100%' }
      ]
    },
    {
      id: 'steps',
      name: 'Step Tracker',
      icon: 'fa-solid fa-shoe-prints',
      badge: 'Real-Time Pedometer',
      title: 'Precision Sensor Step Counting',
      description: 'Track daily steps, calories burned, and total distance walked without draining your smartphone battery. Integrates with Google Fit & Apple Health.',
      metrics: [
        { label: 'Battery Overhead', value: '< 1%' },
        { label: 'Sensor Accuracy', value: '99.4%' }
      ]
    },
    {
      id: 'nutrition',
      name: 'Macro Tracker',
      icon: 'fa-solid fa-apple-whole',
      badge: 'Smart Diet Logger',
      title: 'Balanced Nutrition & Calorie Tracking',
      description: 'Track your daily macronutrient ratio with automated target suggestions based on your target weight goals and workout activity level.',
      metrics: [
        { label: 'Nutrient Accuracy', value: 'Macro-Exact' },
        { label: 'Meal Suggestions', value: 'Instant' }
      ]
    },
    {
      id: 'water',
      name: 'Hydration',
      icon: 'fa-solid fa-droplet',
      badge: 'Water Logger',
      title: 'Intelligent Water Intake Reminders',
      description: 'Never forget to hydrate. Log your water intake with one-tap quick action buttons and receive smart reminders timed around your workout schedule.',
      metrics: [
        { label: 'Quick Log Presets', value: '1-Tap' },
        { label: 'Optimal Hydration', value: 'Guaranteed' }
      ]
    },
    {
      id: 'leaderboard',
      name: 'Leaderboard',
      icon: 'fa-solid fa-trophy',
      badge: 'Social Competition',
      title: 'Rank Up & Unlock Achievement Medals',
      description: 'Turn fitness into a sport. Compete against friends and global athletes, climb the ranks, and earn Gold, Silver, and Bronze achievement trophies.',
      metrics: [
        { label: 'Weekly Leagues', value: 'Active' },
        { label: 'Global Rank Update', value: 'Real-Time' }
      ]
    }
  ];

  selectTab(id: string) {
    this.activeTabId.set(id);
  }

  currentTab(): TabScreen {
    return this.tabs.find(t => t.id === this.activeTabId()) || this.tabs[0];
  }
}
