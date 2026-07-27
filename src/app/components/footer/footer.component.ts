import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

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
              High-performance, offline-first mobile fitness app. Built for step tracking, workout programming, macro nutrition, and social leaderboard competition.
            </p>

            <div class="social-links">
              <a href="#" aria-label="Twitter"
                ><i class="fa-brands fa-x-twitter"></i
              ></a>
              <a href="#" aria-label="Instagram"
                ><i class="fa-brands fa-instagram"></i
              ></a>
              <a href="#" aria-label="YouTube"
                ><i class="fa-brands fa-youtube"></i
              ></a>
              <a href="#" aria-label="GitHub"
                ><i class="fa-brands fa-github"></i
              ></a>
            </div>
          </div>

          <!-- Column 2: Navigation -->
          <div class="footer-col">
            <h4>App Navigation</h4>
            <ul>
              <li><a href="#features">Key Features</a></li>
              <li><a href="#showcase">Interactive Demo</a></li>
              <li><a href="#engine">Smart Engine</a></li>
              <li><a href="#testimonials">User Reviews</a></li>
              <li><a href="#pre-register">Pre-Register Now</a></li>
            </ul>
          </div>

          <!-- Column 3: Features -->
          <div class="footer-col">
            <h4>Core Features</h4>
            <ul>
              <li><a href="#features">Smart Routine Engine</a></li>
              <li><a href="#features">Precision Step Counter</a></li>
              <li><a href="#features">Macro & Calorie Planner</a></li>
              <li><a href="#features">Smart Hydration Tracker</a></li>
              <li><a href="#features">Global Social Leaderboard</a></li>
            </ul>
          </div>

          <!-- Column 4: Support & Legal -->
          <div class="footer-col">
            <h4>Privacy & Legal</h4>
            <ul>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Security & Data Policy</a></li>
              <li><a href="#">Support Help Center</a></li>
              <li><a href="#">Contact Engineering</a></li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom">
          <p>
            © 2026 GetFit App Inc. All rights reserved. Designed for peak human performance.
          </p>
          <div class="bottom-badge">
            <i class="fa-solid fa-shield-halved text-mint"></i> Offline-First Architecture
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
        grid-template-columns: 1.5fr 1fr 1fr 1fr;
        gap: 3rem;
        margin-bottom: 4rem;
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

      .social-links {
        display: flex;
        gap: 0.8rem;
      }

      .social-links a {
        width: 38px;
        height: 38px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--text-primary);
        transition: all 0.3s ease;
      }

      .social-links a:hover {
        background: var(--accent-red);
        border-color: var(--accent-red);
        color: #ffffff;
        transform: translateY(-3px);
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
export class FooterComponent {}
