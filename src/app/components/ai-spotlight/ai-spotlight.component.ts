import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-ai-spotlight',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="ai-spotlight" class="ai-section">
      <div class="container">
        <div class="ai-banner glass-card">
          <div class="ai-content">
            <div class="badge-pill badge-purple mb-3">
              <i class="fa-solid fa-brain"></i>
              {{ langService.isArabic() ? 'المحرك العصبي الرياضي' : 'Neural Fitness Engine' }}
            </div>

            <h2 *ngIf="!langService.isArabic()">
              Powered By <span class="gradient-text-purple">Intelligent AI Engine</span>
            </h2>
            <h2 *ngIf="langService.isArabic()">
              مدعوم بنظام <span class="gradient-text-purple">الذكاء الاصطناعي الفائق</span>
            </h2>

            <p class="ai-desc">
              {{ langService.isArabic() 
                  ? 'تطبيق GetFit لا يسجل الأرقام فقط، بل يفهم تطور جسمك ومستواك. تحلل خوارزمياتنا الذكية الإجهاد والأدوات المتاحة وأهدافك لتقديم توصيات مباشرة.'
                  : "GetFit doesn't just log numbers — it understands your body's progression. Our embedded AI algorithms analyze your workout fatigue, equipment availability, and nutrition goals to deliver real-time recommendations." }}
            </p>

            <div class="ai-features-list">
              <div class="ai-item">
                <div class="ai-icon-box"><i class="fa-solid fa-wand-magic-sparkles"></i></div>
                <div>
                  <h4>{{ langService.isArabic() ? 'تبديل التمارين الذكي' : 'Smart Exercise Substitution' }}</h4>
                  <p>
                    {{ langService.isArabic() 
                        ? 'الجهاز مشغول في الجيم؟ اضغط تبديل واحصل على بديل حيوي مباشر بنفس الكفاءة والعضلة المستهدفة.' 
                        : 'Gym machine occupied? Tap substitute and get instant biomechanically equivalent alternatives.' }}
                  </p>
                </div>
              </div>

              <div class="ai-item">
                <div class="ai-icon-box"><i class="fa-solid fa-bolt"></i></div>
                <div>
                  <h4>{{ langService.isArabic() ? 'مزامنة فائقة السرعة' : 'Instant Data Synchronization' }}</h4>
                  <p>
                    {{ langService.isArabic() 
                        ? 'أداء فائق مع تحديثات لحظية وتفاعل بدون أي تأخير في الشاشة (0ms).' 
                        : 'Lightning-fast performance with real-time updates and 0ms UI latency.' }}
                  </p>
                </div>
              </div>

              <div class="ai-item">
                <div class="ai-icon-box"><i class="fa-solid fa-chart-line"></i></div>
                <div>
                  <h4>{{ langService.isArabic() ? 'زيادة الأحمال التدريجية المتكيفة' : 'Adaptive Progressive Overload' }}</h4>
                  <p>
                    {{ langService.isArabic() 
                        ? 'يحسب زيادة الأوزان والتكرارات تلقائياً بناءً على إنجازك وتقييم الإجهاد في الجلسات السابقة.' 
                        : 'Automatically calculates weight increases based on your RPE and previous set completion.' }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="ai-visual">
            <div class="tech-card">
              <div class="tech-header">
                <i class="fa-solid fa-terminal"></i>
                <span>GETFIT_AI_CORE.engine</span>
              </div>
              <div class="code-box">
                <span class="code-line"><span class="k">const</span> goal = <span class="s">"Muscle Hypertrophy"</span>;</span>
                <span class="code-line"><span class="k">const</span> equipment = [<span class="s">"Dumbbells"</span>, <span class="s">"Pullup Bar"</span>];</span>
                <span class="code-line"><span class="k">const</span> workout = <span class="f">generateAIPlan</span>(&#123; goal, equipment &#125;);</span>
                <span class="code-line text-mint">// Output: 4-Week Custom Split Ready</span>
                <span class="code-line text-purple">// Status: AI Engine Loaded (0ms)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .ai-section {
      padding: 6rem 0;
      background: var(--bg-primary);
    }

    .ai-banner {
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      gap: 3.5rem;
      padding: 4rem;
      align-items: center;
      border: 1px solid rgba(155, 93, 229, 0.25);
      background: linear-gradient(135deg, rgba(18, 20, 32, 0.8) 0%, rgba(35, 20, 50, 0.4) 100%);
    }

    .ai-desc {
      font-size: 1.1rem;
      line-height: 1.7;
      color: var(--text-secondary);
      margin-bottom: 2rem;
    }

    .ai-features-list {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .ai-item {
      display: flex;
      gap: 1.2rem;
      align-items: flex-start;
    }

    .ai-icon-box {
      width: 44px;
      height: 44px;
      border-radius: 12px;
      background: rgba(155, 93, 229, 0.15);
      color: var(--accent-purple);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      flex-shrink: 0;
    }

    .ai-item h4 {
      font-size: 1.1rem;
      margin-bottom: 0.2rem;
    }

    .ai-item p {
      font-size: 0.9rem;
      color: var(--text-muted);
    }

    /* Tech Visual Code Card */
    .tech-card {
      background: #090a12;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 20px;
      padding: 1.5rem;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
      font-family: monospace;
    }

    .tech-header {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      font-size: 0.85rem;
      color: var(--text-muted);
      padding-bottom: 1rem;
      margin-bottom: 1rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }

    .code-box {
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
      font-size: 0.9rem;
      line-height: 1.6;
    }

    .k { color: #f78c6c; }
    .s { color: #c3e88d; }
    .f { color: #82aaff; }
    .text-mint { color: var(--accent-mint); }
    .text-purple { color: var(--accent-purple); }

    @media (max-width: 992px) {
      .ai-banner {
        grid-template-columns: 1fr;
        padding: 2rem;
      }
    }
  `]
})
export class AiSpotlightComponent {
  langService = inject(LanguageService);
}
