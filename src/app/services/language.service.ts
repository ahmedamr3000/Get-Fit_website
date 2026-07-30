import { Injectable, signal, effect } from '@angular/core';

export type Language = 'en' | 'ar';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  readonly currentLang = signal<Language>('en');

  constructor() {
    const savedLang = localStorage.getItem('getfit_lang') as Language;
    if (savedLang === 'en' || savedLang === 'ar') {
      this.currentLang.set(savedLang);
    }
    
    // Automatically apply HTML dir attribute and lang whenever language changes
    effect(() => {
      const lang = this.currentLang();
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      localStorage.setItem('getfit_lang', lang);
    });
  }

  toggleLanguage(): void {
    this.currentLang.set(this.currentLang() === 'en' ? 'ar' : 'en');
  }

  setLanguage(lang: Language): void {
    this.currentLang.set(lang);
  }

  isArabic(): boolean {
    return this.currentLang() === 'ar';
  }
}
