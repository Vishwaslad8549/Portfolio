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
    if (!this.sectionName) {
      console.log('[TrackSection] No sectionName provided');
      return;
    }

    console.log('[TrackSection] Observing section:', this.sectionName);

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          console.log('[TrackSection]', this.sectionName, 'visible:', entry.isIntersecting, 'hasBeenSeen:', this.hasBeenSeen);
          
          // Fire event when section becomes visible for the first time
          if (entry.isIntersecting && !this.hasBeenSeen) {
            this.hasBeenSeen = true;
            console.log('[TrackSection] Firing section_view for:', this.sectionName);
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
