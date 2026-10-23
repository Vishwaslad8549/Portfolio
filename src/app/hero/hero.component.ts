import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AnalyticsService } from '../services/analytics.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  animations: [
    trigger('fadeInUp', [
      state('in', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('void => *', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('700ms cubic-bezier(0.16, 1, 0.3, 1)')
      ])
    ])
  ]
})
export class HeroComponent implements OnInit {
  animationState = 'in';
  githubUrl = 'https://github.com/Vishwaslad8549';
  linkedinUrl = 'https://www.linkedin.com/in/vishwas-lad-a53949156';

  constructor(private analytics: AnalyticsService) {}

  ngOnInit() {
    setTimeout(() => {
      this.animationState = 'in';
    }, 100);
  }

  contactClick() {
    this.analytics.trackEvent('contact_click', { placement: 'hero_cta' });
    document.getElementById('contacts')?.scrollIntoView({ behavior: 'smooth' });
  }
}
