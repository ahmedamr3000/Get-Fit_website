import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { HeroComponent } from '../hero/hero.component';
import { FeaturesComponent } from '../features/features.component';
import { AppShowcaseComponent } from '../app-showcase/app-showcase.component';
import { PricingComponent } from '../pricing/pricing.component';
import { CtaBannerComponent } from '../cta-banner/cta-banner.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    HeroComponent,
    FeaturesComponent,
    AppShowcaseComponent,
    PricingComponent,
    CtaBannerComponent,
    FooterComponent,
  ],
  template: `
    <app-header></app-header>
    <main>
      <app-hero></app-hero>
      <app-features></app-features>
      <app-showcase></app-showcase>
      <app-pricing></app-pricing>
      <app-cta-banner></app-cta-banner>
    </main>
    <app-footer></app-footer>
  `,
})
export class LandingComponent {}
