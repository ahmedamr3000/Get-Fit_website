import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { FeaturesComponent } from './components/features/features.component';
import { AppShowcaseComponent } from './components/app-showcase/app-showcase.component';
import { EngineSpotlightComponent } from './components/engine-spotlight/engine-spotlight.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { CtaBannerComponent } from './components/cta-banner/cta-banner.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    HeroComponent,
    FeaturesComponent,
    AppShowcaseComponent,
    EngineSpotlightComponent,
    TestimonialsComponent,
    CtaBannerComponent,
    FooterComponent
  ],
  template: `
    <app-header></app-header>
    <main>
      <app-hero></app-hero>
      <app-features></app-features>
      <app-showcase></app-showcase>
      <app-engine-spotlight></app-engine-spotlight>
      <app-testimonials></app-testimonials>
      <app-cta-banner></app-cta-banner>
    </main>
    <app-footer></app-footer>
  `
})
export class AppComponent {
  title = 'GetFit - High Performance Mobile App';
}
