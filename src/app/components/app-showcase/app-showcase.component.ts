import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

interface TabScreen {
  id: string;
  name: string;
  nameAr: string;
  icon: string;
  badge: string;
  badgeAr: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  metrics: { label: string; labelAr: string; value: string }[];
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
            <i class="fa-solid fa-mobile-screen-button"></i>
            {{ langService.isArabic() ? 'تجربة تفاعلية مباشرة' : 'Interactive Experience' }}
          </div>
          <h2 *ngIf="!langService.isArabic()">
            Explore The Mobile Interface <span class="gradient-text-purple">In Action</span>
          </h2>
          <h2 *ngIf="langService.isArabic()">
            استكشف واجهة التطبيق <span class="gradient-text-purple">بالفعل والتجربة</span>
          </h2>
          <p>
            {{ langService.isArabic()
                ? 'جرب مدى سهولة تتبع التمارين وتصوير الوجبات بالكاميرا وتبديل الأكل المخصص. تنقل بين الشاشات لمعاينة واجهة GetFit عالية الأداء.'
                : "Experience how seamless fitness tracking feels. Switch between app views to preview GetFit's high-performance user interface." }}
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
            <span>{{ langService.isArabic() ? tab.nameAr : tab.name }}</span>
          </button>
        </div>

        <!-- Showcase Body Grid -->
        <div class="showcase-content glass-card">
          <!-- Text Details Column -->
          <div class="showcase-info">
            <span class="badge-pill badge-red mb-3">
              {{ langService.isArabic() ? currentTab().badgeAr : currentTab().badge }}
            </span>
            <h3 class="tab-heading">
              {{ langService.isArabic() ? currentTab().titleAr : currentTab().title }}
            </h3>
            <p class="tab-desc">
              {{ langService.isArabic() ? currentTab().descriptionAr : currentTab().description }}
            </p>

            <div class="tab-metrics-grid">
              <div *ngFor="let m of currentTab().metrics" class="metric-box">
                <span class="m-val">{{ m.value }}</span>
                <span class="m-lbl">{{ langService.isArabic() ? m.labelAr : m.label }}</span>
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
                    <span class="app-title">{{ langService.isArabic() ? 'جدول التمارين' : 'Workout Routine' }}</span>
                    <span class="status-badge">{{ langService.isArabic() ? 'المحرك الذكي' : 'Smart Engine' }}</span>
                  </div>
                  
                  <div class="routine-banner">
                    <div class="routine-tag">{{ langService.isArabic() ? 'اليوم 1 • تمارين الدفع' : 'Day 1 • Push Day' }}</div>
                    <h4>{{ langService.isArabic() ? 'الصدر والكتف الأمامي' : 'Hypertrophy Chest & Shoulders' }}</h4>
                    <p>{{ langService.isArabic() ? '6 تمارين • 55 دقيقة' : '6 Exercises • 55 Mins' }}</p>
                  </div>

                  <div class="ex-list">
                    <div class="ex-item">
                      <div class="ex-num">1</div>
                      <div class="ex-details">
                        <h5>{{ langService.isArabic() ? 'ضغط بنش مائل بالدنابل' : 'Incline Dumbbell Press' }}</h5>
                        <p>{{ langService.isArabic() ? '4 مجاميع x 10 تكرار • 28 كجم' : '4 Sets x 10 Reps • 28 kg' }}</p>
                      </div>
                      <i class="fa-solid fa-circle-check done-icon"></i>
                    </div>

                    <div class="ex-item active">
                      <div class="ex-num">2</div>
                      <div class="ex-details">
                        <h5>{{ langService.isArabic() ? 'ضغط بنش مستوي بالبار' : 'Barbell Bench Press' }}</h5>
                        <p>{{ langService.isArabic() ? '3 مجاميع x 8 تكرار • 80 كجم' : '3 Sets x 8 Reps • 80 kg' }}</p>
                      </div>
                      <span class="substitute-pill">
                        <i class="fa-solid fa-shuffle"></i> {{ langService.isArabic() ? 'تبديل' : 'Swap' }}
                      </span>
                    </div>

                    <div class="ex-item">
                      <div class="ex-num">3</div>
                      <div class="ex-details">
                        <h5>{{ langService.isArabic() ? 'تفتيح صدر كابل' : 'Cable Chest Flyes' }}</h5>
                        <p>{{ langService.isArabic() ? '3 مجاميع x 12 تكرار • 15 كجم' : '3 Sets x 12 Reps • 15 kg' }}</p>
                      </div>
                      <i class="fa-regular fa-circle pending-icon"></i>
                    </div>
                  </div>
                </div>

                <!-- 2. STEPS SCREEN VIEW -->
                <div *ngIf="activeTabId() === 'steps'" class="screen-view animate-fade">
                  <div class="app-bar">
                    <span class="app-title">{{ langService.isArabic() ? 'لوحة الخطوات' : 'Step Dashboard' }}</span>
                    <span class="status-badge mint">{{ langService.isArabic() ? 'العداد مباشر' : 'Pedometer Live' }}</span>
                  </div>

                  <div class="big-step-widget">
                    <div class="step-circle-outer">
                      <div class="step-circle-inner">
                        <i class="fa-solid fa-shoe-prints step-icon"></i>
                        <span class="step-count">10,480</span>
                        <span class="step-target">{{ langService.isArabic() ? 'الهدف: 10,000' : 'Goal: 10,000' }}</span>
                      </div>
                    </div>
                  </div>

                  <div class="step-stats-row">
                    <div class="s-box">
                      <i class="fa-solid fa-fire text-red"></i>
                      <span>780 {{ langService.isArabic() ? 'سعرة' : 'kcal' }}</span>
                      <small>{{ langService.isArabic() ? 'المحروق' : 'Burned' }}</small>
                    </div>
                    <div class="s-box">
                      <i class="fa-solid fa-route text-cyan"></i>
                      <span>7.8 {{ langService.isArabic() ? 'كم' : 'km' }}</span>
                      <small>{{ langService.isArabic() ? 'المسافة' : 'Distance' }}</small>
                    </div>
                    <div class="s-box">
                      <i class="fa-solid fa-clock text-gold"></i>
                      <span>85 {{ langService.isArabic() ? 'دقيقة' : 'mins' }}</span>
                      <small>{{ langService.isArabic() ? 'نشط' : 'Active' }}</small>
                    </div>
                  </div>
                </div>

                <!-- 3. NUTRITION SCREEN VIEW (AI CAMERA & TEXT SCANNER) -->
                <div *ngIf="activeTabId() === 'nutrition'" class="screen-view animate-fade">
                  <div class="app-bar">
                    <span class="app-title">{{ langService.isArabic() ? 'كاميرا السعرات بالذكاء الاصطناعي' : 'AI Food Camera Scanner' }}</span>
                    <span class="status-badge purple">{{ langService.isArabic() ? 'تصوير الأكل' : 'Camera AI' }}</span>
                  </div>

                  <div class="calorie-summary-card" style="border: 1px solid rgba(155, 93, 229, 0.3); background: rgba(155, 93, 229, 0.08);">
                    <div class="c-title">{{ langService.isArabic() ? 'تحليل الكاميرا / النص التلقائي' : 'AI Camera Scan Result' }}</div>
                    <div class="c-val" style="color: var(--accent-purple);">650 kcal</div>
                    <div class="macro-bars-stack">
                      <div class="m-segment protein" style="width: 45%"></div>
                      <div class="m-segment carbs" style="width: 35%"></div>
                      <div class="m-segment fats" style="width: 20%"></div>
                    </div>
                    <div class="macro-legend">
                      <span><i class="dot protein"></i> {{ langService.isArabic() ? 'بروتين 52ج' : 'Protein 52g' }}</span>
                      <span><i class="dot carbs"></i> {{ langService.isArabic() ? 'نشويات 45ج' : 'Carbs 45g' }}</span>
                      <span><i class="dot fats"></i> {{ langService.isArabic() ? 'دهون 14ج' : 'Fats 14g' }}</span>
                    </div>
                  </div>

                  <div class="meal-log-item">
                    <div class="m-icon"><i class="fa-solid fa-camera"></i></div>
                    <div>
                      <h6>{{ langService.isArabic() ? 'صورة الطبق (دجاج + كينوا)' : 'Plate Photo (Chicken & Quinoa)' }}</h6>
                      <p>{{ langService.isArabic() ? 'تم حساب السعرات والمكرو بالكاميرا' : 'Scanned by AI Vision • 650 kcal' }}</p>
                    </div>
                  </div>
                </div>

                <!-- 4. WATER SCREEN VIEW -->
                <div *ngIf="activeTabId() === 'water'" class="screen-view animate-fade">
                  <div class="app-bar">
                    <span class="app-title">{{ langService.isArabic() ? 'سجل المياه' : 'Hydration Log' }}</span>
                    <span class="status-badge cyan">{{ langService.isArabic() ? 'الهدف 80%' : 'Goal 80%' }}</span>
                  </div>

                  <div class="water-glass-widget">
                    <div class="water-level-fill">
                      <div class="wave-animation"></div>
                      <div class="water-val-text">
                        <i class="fa-solid fa-droplet drop-icon"></i>
                        <span>2,400 {{ langService.isArabic() ? 'مل' : 'ml' }}</span>
                        <small>{{ langService.isArabic() ? 'الهدف: 3,000 مل' : 'Target: 3,000 ml' }}</small>
                      </div>
                    </div>
                  </div>

                  <div class="quick-add-row">
                    <button class="add-btn">+ 250{{ langService.isArabic() ? 'مل' : 'ml' }}</button>
                    <button class="add-btn">+ 500{{ langService.isArabic() ? 'مل' : 'ml' }}</button>
                    <button class="add-btn">+ 750{{ langService.isArabic() ? 'مل' : 'ml' }}</button>
                  </div>
                </div>

                <!-- 5. CUSTOM DIET PLAN SCREEN VIEW -->
                <div *ngIf="activeTabId() === 'diet-plan'" class="screen-view animate-fade">
                  <div class="app-bar">
                    <span class="app-title">{{ langService.isArabic() ? 'نظام تغذية وتبديل الأكل' : 'Custom Diet & Swaps' }}</span>
                    <span class="status-badge gold">{{ langService.isArabic() ? 'تبديل ذكي' : 'Smart Swap' }}</span>
                  </div>

                  <div class="routine-banner" style="background: linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(26, 28, 46, 0.8) 100%); border-color: rgba(255, 215, 0, 0.3);">
                    <div class="routine-tag" style="color: var(--accent-gold);">{{ langService.isArabic() ? 'هدف السعرات: 2,200 سعرة' : 'Calorie Goal: 2,200 kcal' }}</div>
                    <h4 style="font-size: 0.88rem; margin: 0.2rem 0;">{{ langService.isArabic() ? 'دايت مخصص + إمكانية تبديل أي صنف' : 'Custom Diet + Instant Food Swaps' }}</h4>
                    <p>{{ langService.isArabic() ? 'اختيار ما تحبه وتبديل أي وجبة بضغطة زر' : 'Choose liked foods & swap any item easily' }}</p>
                  </div>

                  <div class="ex-list">
                    <div class="ex-item">
                      <div class="ex-num"><i class="fa-solid fa-utensils text-gold" style="font-size: 0.8rem;"></i></div>
                      <div class="ex-details">
                        <h5>{{ langService.isArabic() ? 'وجبة الإفطار (أكل تحبه)' : 'Breakfast (Favorite Food)' }}</h5>
                        <p>{{ langService.isArabic() ? 'بيض مسلوق + شوفان + زبادي' : 'Oats + Eggs + Greek Yogurt' }}</p>
                      </div>
                      <i class="fa-solid fa-heart text-red" style="font-size: 0.85rem; margin-left: auto;"></i>
                    </div>

                    <div class="ex-item active" style="border-color: var(--accent-gold); background: rgba(255, 215, 0, 0.08);">
                      <div class="ex-num"><i class="fa-solid fa-drumstick-bite text-gold" style="font-size: 0.8rem;"></i></div>
                      <div class="ex-details">
                        <h5>{{ langService.isArabic() ? 'وجبة الغداء (تم تبديل الصنف)' : 'Lunch (Swapped Meal)' }}</h5>
                        <p>{{ langService.isArabic() ? 'سمك مشوي بدلاً من الدجاج' : 'Grilled Fish instead of Chicken' }}</p>
                      </div>
                      <span class="substitute-pill" style="background: rgba(255, 215, 0, 0.2); color: var(--accent-gold);">
                        <i class="fa-solid fa-shuffle"></i> {{ langService.isArabic() ? 'تبديل بضغطة' : 'Swapped' }}
                      </span>
                    </div>

                    <div class="ex-item">
                      <div class="ex-num"><i class="fa-solid fa-apple-whole text-mint" style="font-size: 0.8rem;"></i></div>
                      <div class="ex-details">
                        <h5>{{ langService.isArabic() ? 'وجبة العشاء (أكل مخصص)' : 'Dinner (Custom Meal)' }}</h5>
                        <p>{{ langService.isArabic() ? 'سلاطة تونة بجبن قريش' : 'Tuna Salad with Cottage Cheese' }}</p>
                      </div>
                      <i class="fa-solid fa-circle-check done-icon"></i>
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

    @media (max-width: 992px) {
      .showcase-content {
        grid-template-columns: 1fr;
        padding: 2rem;
      }
    }
  `]
})
export class AppShowcaseComponent {
  langService = inject(LanguageService);
  activeTabId = signal<string>('workout');

  tabs: TabScreen[] = [
    {
      id: 'workout',
      name: 'Workout Engine',
      nameAr: 'محرك التمارين',
      icon: 'fa-solid fa-dumbbell',
      badge: 'Smart Workout Planner',
      badgeAr: 'مخطط التمارين الذكي',
      title: 'Hyper-Personalized Workout Programs',
      titleAr: 'برامج تمارين مخصصة بدقة فائقة',
      description: 'Generates progressive muscle building, fat loss, or endurance routines. Swap out exercises effortlessly with intelligent substitution algorithms.',
      descriptionAr: 'يولد جداول بناء عضلات أو خسارة دهون أو لياقة بدنية. يمكنك تبديل التمارين بسهولة بفضل خوارزميات التبديل الذكية.',
      metrics: [
        { label: 'Built-in Exercises', labelAr: 'تمرين مدمج بالخطوات', value: '250+' },
        { label: 'Rest Timer Sync', labelAr: 'مزامنة مؤقت الراحة', value: '100%' }
      ]
    },
    {
      id: 'steps',
      name: 'Step Tracker',
      nameAr: 'تتبع الخطوات',
      icon: 'fa-solid fa-shoe-prints',
      badge: 'Real-Time Pedometer',
      badgeAr: 'عداد خطوات مباشر',
      title: 'Precision Sensor Step Counting',
      titleAr: 'حساب خطوات دقيق بالحساسات',
      description: 'Track daily steps, calories burned, and total distance walked without draining your smartphone battery. Integrates with Google Fit & Apple Health.',
      descriptionAr: 'تتبع الخطوات اليومية، السعرات المحروقة، والمسافات دون استنزاف بطارية الهاتف مع مزامنة كاملة.',
      metrics: [
        { label: 'Battery Overhead', labelAr: 'استهلاك البطارية', value: '< 1%' },
        { label: 'Sensor Accuracy', labelAr: 'دقة الحساسات', value: '99.4%' }
      ]
    },
    {
      id: 'nutrition',
      name: 'AI Calorie Scanner',
      nameAr: 'كاميرا السعرات بالذكاء الاصطناعي',
      icon: 'fa-solid fa-camera-retro',
      badge: 'AI Food Scanner',
      badgeAr: 'ماسح وجبات بالكاميرا والنص',
      title: 'AI Food Camera & Text Calorie Scanner',
      titleAr: 'صوّر وجبتك بالكاميرا أو اكتب مكوناتها نصياً',
      description: 'Snap a photo of your food or write its ingredients in plain text. GetFit’s AI vision engine automatically recognizes all food components, calculates total calories, and breaks down protein, carbs, and fats with high precision.',
      descriptionAr: 'التقط صورة لطبقك بالكاميرا أو اكتب مكونات الوجبة نصياً، وسيقوم الذكاء الاصطناعي فوراً بفك شفرة مكونات الأكل، وحساب إجمالي السعرات الحرارية وتقسيم البروتين والدهون والنشويات بدقة عالية.',
      metrics: [
        { label: 'Photo Recognition', labelAr: 'تعرف فوري بالكاميرا والصور', value: 'Instant' },
        { label: 'Macro Accuracy', labelAr: 'دقة حساب السعرات والماكروز', value: '100%' }
      ]
    },
    {
      id: 'water',
      name: 'Hydration',
      nameAr: 'تتبع المياه',
      icon: 'fa-solid fa-droplet',
      badge: 'Water Logger',
      badgeAr: 'سجل شرب المياه',
      title: 'Intelligent Water Intake Reminders',
      titleAr: 'تنبيهات ذكية لشرب المياه',
      description: 'Never forget to hydrate. Log your water intake with one-tap quick action buttons and receive smart reminders timed around your workout schedule.',
      descriptionAr: 'لا تنسَ شرب المياه أبداً. سجل كميات المياه بضغطة واحدة واحصل على تنبيهات ذكية تناسب مواعيد تمارينك.',
      metrics: [
        { label: 'Quick Log Presets', labelAr: 'إضافة بضغطة واحدة', value: '1-Tap' },
        { label: 'Optimal Hydration', labelAr: 'تروية مثالية', value: 'Guaranteed' }
      ]
    },
    {
      id: 'diet-plan',
      name: 'Custom Diet & Swaps',
      nameAr: 'تغذية مخصصة وتبديل وجبات',
      icon: 'fa-solid fa-utensils',
      badge: 'Customized Diet & Meal Swapping',
      badgeAr: 'نظام غذائي مخصص + تبديل الأكل',
      title: 'Tailored Diet Plans + Instant Meal Swapping',
      titleAr: 'أنظمة تغذية مخصصة + تبديل أي صنف بضغطة زر',
      description: 'Create a fully tailored diet plan designed around your calorie targets and fitness goals. Select foods you love, exclude foods you dislike, and easily swap out any meal item for healthy, equivalent alternatives at any time with a single tap.',
      descriptionAr: 'صمم خطتك الغذائية المخصصة بدقة حسب هدفك البدني وسعراتك اليومية. أضف وجباتك وأطعمتك المفضلة واستبعد الأطعمة التي لا تحبها، مع إمكانية تبديل أي صنف وجبة بأطعمة صحية أخرى متكافئة في أي وقت بضغطة زر واحدة.',
      metrics: [
        { label: 'Food Preferences', labelAr: 'تضمين المفصل واستبعاد الممنوع', value: '100%' },
        { label: 'Flexible Meal Swaps', labelAr: 'تبديل فوري لأي صنف', value: '1-Tap' }
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
