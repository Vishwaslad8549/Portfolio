import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { AnalyticsService } from '../services/analytics.service';

/**
 * Track section views using IntersectionObserver
 * Fires once per section per session
 * Usage: <section appTrackSection [sectionName]="'projects'">
 */
@Directive({
  selector: '[appTrackSection]'
})
export class TrackSectionDirective implements OnInit, OnDestroy {
  @Input() sectionName: string = '';
  private observer: IntersectionObserver | null = null;
  private hasBeenSeen = false;

  constructor(
    private el: ElementRef,
    private analytics: AnalyticsService
  ) {}

  ngOnInit(): void {
    if (!this.sectionName) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Fire event when section becomes visible for the first time
          if (entry.isIntersecting && !this.hasBeenSeen) {
            this.hasBeenSeen = true;
            this.analytics.trackEvent('section_view', {
              section_name: this.sectionName,
              timestamp: new Date().toISOString()
            });
          }
        });
      },
      { threshold: 0.25 }
    );

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
