import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="hero-section">
      <!-- Background Ambient Glow Effects -->
      <div class="ambient-glow glow-red"></div>
      <div class="ambient-glow glow-mint"></div>
      <div class="ambient-glow glow-purple"></div>

      <div class="container hero-grid">
        <!-- Hero Text Column -->
        <div class="hero-content">
          <div class="badge-pill badge-red hero-badge">
            <i class="fa-solid fa-bolt"></i> Smart Offline-First Fitness Mobile App
          </div>

          <h1 class="hero-title">
            Redefine Your Body With <br>
            <span class="gradient-text-red">Maximum Precision</span> & Discipline
          </h1>

          <p class="hero-subtitle">
            GetFit is your all-in-one mobile companion for intelligent workout routines, precision step tracking, macro nutrition planning, smart hydration, and dynamic social leaderboards.
          </p>

          <!-- Store Buttons (Coming Soon) -->
          <div class="cta-group">
            <a href="#pre-register" class="store-btn store-apple">
              <i class="fa-brands fa-apple store-icon"></i>
              <div class="store-text">
                <span class="sub">COMING SOON ON</span>
                <span class="main">App Store</span>
              </div>
              <span class="store-tag">Pre-Register</span>
            </a>

            <a href="#pre-register" class="store-btn store-google">
              <i class="fa-brands fa-google-play store-icon"></i>
              <div class="store-text">
                <span class="sub">COMING SOON ON</span>
                <span class="main">Google Play</span>
              </div>
              <span class="store-tag">Pre-Register</span>
            </a>
          </div>

          <!-- Social Proof Stats -->
          <div class="hero-stats">
            <div class="stat-item">
              <div class="stat-num">4.9 <i class="fa-solid fa-star star-icon"></i></div>
              <div class="stat-lbl">Beta Testers Rating</div>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <div class="stat-num">50K+</div>
              <div class="stat-lbl">Pre-Registered Athletes</div>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <div class="stat-num">100%</div>
              <div class="stat-lbl">Offline Data Privacy</div>
            </div>
          </div>
        </div>

        <!-- Hero Graphic Column - 3D Realistic Animated Mobile Phone Mockup -->
        <div class="hero-graphic">
          <div class="phone-mockup-wrapper animate-float">
            
            <!-- Floating Decorative Widgets -->
            <div class="float-widget widget-steps">
              <div class="widget-icon mint"><i class="fa-solid fa-shoe-prints"></i></div>
              <div>
                <div class="widget-val">8,420 steps</div>
                <div class="widget-sub">Daily Goal: 84%</div>
              </div>
            </div>

            <div class="float-widget widget-calories">
              <div class="widget-icon red"><i class="fa-solid fa-fire-flame-curved"></i></div>
              <div>
                <div class="widget-val">640 kcal</div>
                <div class="widget-sub">Burned Today</div>
              </div>
            </div>

            <div class="float-widget widget-rank">
              <div class="widget-icon gold"><i class="fa-solid fa-trophy"></i></div>
              <div>
                <div class="widget-val">#1 Leaderboard</div>
                <div class="widget-sub">Weekly Streak 🔥</div>
              </div>
            </div>

            <!-- Phone Frame -->
            <div class="phone-shell">
              <div class="phone-notch"></div>
              <div class="phone-screen">
                
                <!-- Mock App Top Header -->
                <div class="mock-app-header">
                  <div class="app-brand-row">
                    <img src="./Gemini_Generated_Image_ecet84ecet84ecet.png" alt="Logo" class="mock-logo-img">
                    <div>
                      <span class="greeting">Welcome back 👋</span>
                      <h3 class="user-name">Alex Johnson</h3>
                    </div>
                  </div>
                  <div class="user-avatar">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" alt="Avatar">
                  </div>
                </div>

                <!-- Step Tracker Radial Widget -->
                <div class="mock-card step-card">
                  <div class="card-title-row">
                    <span>Daily Activity</span>
                    <span class="tag-mint">Sensors Active</span>
                  </div>
                  <div class="radial-container">
                    <div class="radial-ring">
                      <div class="radial-inner">
                        <span class="radial-num">8,420</span>
                        <span class="radial-unit">/ 10,000 steps</span>
                      </div>
                    </div>
                  </div>
                  <div class="activity-bars">
                    <div class="bar-col"><div class="bar" style="height: 60%"></div><span>M</span></div>
                    <div class="bar-col"><div class="bar" style="height: 85%"></div><span>T</span></div>
                    <div class="bar-col"><div class="bar" style="height: 45%"></div><span>W</span></div>
                    <div class="bar-col"><div class="bar active" style="height: 90%"></div><span>T</span></div>
                    <div class="bar-col"><div class="bar" style="height: 70%"></div><span>F</span></div>
                    <div class="bar-col"><div class="bar" style="height: 50%"></div><span>S</span></div>
                  </div>
                </div>

                <!-- Smart Workout Quick Start Widget -->
                <div class="mock-card workout-card">
                  <div class="workout-info">
                    <div class="w-icon"><i class="fa-solid fa-dumbbell"></i></div>
                    <div>
                      <h4>Chest & Triceps Hypertrophy</h4>
                      <p>Smart Generator • 45 Mins • 6 Exercises</p>
                    </div>
                  </div>
                  <button class="mock-play-btn"><i class="fa-solid fa-play"></i></button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero-section {
      position: relative;
      padding: 10rem 0 6rem 0;
      overflow: hidden;
    }

    /* Ambient Background Glows */
    .ambient-glow {
      position: absolute;
      border-radius: 50%;
      filter: blur(120px);
      z-index: 0;
      pointer-events: none;
    }

    .glow-red {
      top: 10%;
      left: -5%;
      width: 450px;
      height: 450px;
      background: rgba(230, 57, 70, 0.22);
    }

    .glow-mint {
      bottom: 5%;
      right: 5%;
      width: 400px;
      height: 400px;
      background: rgba(6, 214, 160, 0.15);
    }

    .glow-purple {
      top: 40%;
      right: 35%;
      width: 350px;
      height: 350px;
      background: rgba(155, 93, 229, 0.15);
    }

    .hero-grid {
      position: relative;
      z-index: 1;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3.5rem;
      align-items: center;
    }

    .hero-badge {
      margin-bottom: 1.5rem;
    }

    .hero-title {
      font-size: 3.5rem;
      font-weight: 800;
      margin-bottom: 1.25rem;
      letter-spacing: -1px;
    }

    .hero-subtitle {
      font-size: 1.2rem;
      color: var(--text-secondary);
      line-height: 1.7;
      margin-bottom: 2.25rem;
      max-width: 540px;
    }

    /* Store Buttons */
    .cta-group {
      display: flex;
      gap: 1rem;
      margin-bottom: 3rem;
      flex-wrap: wrap;
    }

    .store-btn {
      position: relative;
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

    .store-btn:hover {
      background: #1e2236;
      border-color: rgba(255, 255, 255, 0.3);
      transform: translateY(-3px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
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
      letter-spacing: 0.5px;
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
      border: 1px solid rgba(230, 57, 70, 0.3);
    }

    /* Hero Stats */
    .hero-stats {
      display: flex;
      align-items: center;
      gap: 2rem;
      padding-top: 1.5rem;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
    }

    .stat-item {
      display: flex;
      flex-direction: column;
    }

    .stat-num {
      font-family: var(--font-heading);
      font-size: 1.5rem;
      font-weight: 800;
      color: #ffffff;
      display: flex;
      align-items: center;
      gap: 0.3rem;
    }

    .star-icon {
      color: #ffd700;
      font-size: 1.1rem;
    }

    .stat-lbl {
      font-size: 0.85rem;
      color: var(--text-muted);
    }

    .stat-divider {
      width: 1px;
      height: 35px;
      background: rgba(255, 255, 255, 0.1);
    }

    /* Graphic & Phone Mockup */
    .hero-graphic {
      position: relative;
      display: flex;
      justify-content: center;
    }

    .phone-mockup-wrapper {
      position: relative;
      width: 320px;
    }

    /* Floating Widgets around Phone */
    .float-widget {
      position: absolute;
      background: rgba(18, 22, 38, 0.85);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 16px;
      padding: 0.75rem 1rem;
      display: flex;
      align-items: center;
      gap: 0.8rem;
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
      z-index: 10;
      min-width: 160px;
    }

    .widget-steps {
      top: 15%;
      left: -60px;
    }

    .widget-calories {
      bottom: 25%;
      right: -60px;
    }

    .widget-rank {
      bottom: 5%;
      left: -40px;
    }

    .widget-icon {
      width: 36px;
      height: 36px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1rem;
    }

    .widget-icon.mint {
      background: rgba(6, 214, 160, 0.15);
      color: var(--accent-mint);
    }

    .widget-icon.red {
      background: rgba(230, 57, 70, 0.15);
      color: var(--accent-red);
    }

    .widget-icon.gold {
      background: rgba(255, 215, 0, 0.15);
      color: var(--accent-gold);
    }

    .widget-val {
      font-size: 0.9rem;
      font-weight: 700;
      color: #ffffff;
    }

    .widget-sub {
      font-size: 0.75rem;
      color: var(--text-muted);
    }

    /* Phone Shell Styling */
    .phone-shell {
      position: relative;
      width: 310px;
      height: 620px;
      background: #0d0f19;
      border-radius: 45px;
      border: 10px solid #1e2338;
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.7), inset 0 0 15px rgba(255, 255, 255, 0.05);
      padding: 1rem 0.8rem;
      overflow: hidden;
    }

    .phone-notch {
      position: absolute;
      top: 12px;
      left: 50%;
      transform: translateX(-50%);
      width: 100px;
      height: 18px;
      background: #1e2338;
      border-radius: 10px;
      z-index: 20;
    }

    .phone-screen {
      margin-top: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .mock-app-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.5rem;
    }

    .app-brand-row {
      display: flex;
      align-items: center;
      gap: 0.6rem;
    }

    .mock-logo-img {
      width: 28px;
      height: 28px;
      border-radius: 6px;
      object-fit: contain;
    }

    .greeting {
      font-size: 0.75rem;
      color: var(--text-muted);
    }

    .user-name {
      font-size: 1rem;
      font-weight: 700;
    }

    .user-avatar img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid var(--accent-red);
    }

    .mock-card {
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 18px;
      padding: 1rem;
    }

    .card-title-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.8rem;
      color: var(--text-secondary);
      margin-bottom: 1rem;
    }

    .tag-mint {
      background: rgba(6, 214, 160, 0.15);
      color: var(--accent-mint);
      padding: 0.2rem 0.6rem;
      border-radius: 10px;
      font-size: 0.7rem;
      font-weight: 600;
    }

    .radial-container {
      display: flex;
      justify-content: center;
      margin-bottom: 1rem;
    }

    .radial-ring {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background: conic-gradient(var(--accent-mint) 0% 84%, rgba(255, 255, 255, 0.1) 84% 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 20px rgba(6, 214, 160, 0.2);
    }

    .radial-inner {
      width: 96px;
      height: 96px;
      background: #111424;
      border-radius: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .radial-num {
      font-family: var(--font-heading);
      font-size: 1.1rem;
      font-weight: 800;
      color: #ffffff;
    }

    .radial-unit {
      font-size: 0.65rem;
      color: var(--text-muted);
    }

    .activity-bars {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      height: 50px;
      padding-top: 0.5rem;
    }

    .bar-col {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.3rem;
      height: 100%;
      justify-content: flex-end;
    }

    .bar {
      width: 8px;
      background: rgba(255, 255, 255, 0.12);
      border-radius: 4px;
    }

    .bar.active {
      background: var(--accent-mint);
      box-shadow: 0 0 10px rgba(6, 214, 160, 0.5);
    }

    .bar-col span {
      font-size: 0.65rem;
      color: var(--text-muted);
    }

    .workout-card {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .workout-info {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .w-icon {
      width: 38px;
      height: 38px;
      background: rgba(230, 57, 70, 0.15);
      color: var(--accent-red);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .workout-info h4 {
      font-size: 0.85rem;
      font-weight: 700;
    }

    .workout-info p {
      font-size: 0.7rem;
      color: var(--text-muted);
    }

    .mock-play-btn {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background: var(--accent-red);
      border: none;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 0.8rem;
    }

    @media (max-width: 992px) {
      .hero-grid {
        grid-template-columns: 1fr;
        text-align: center;
        gap: 4rem;
      }
      .hero-subtitle {
        margin-left: auto;
        margin-right: auto;
      }
      .cta-group {
        justify-content: center;
      }
      .hero-stats {
        justify-content: center;
      }
      .float-widget {
        display: none;
      }
      .hero-title {
        font-size: 2.75rem;
      }
    }
  `]
})
export class HeroComponent {}
