import { Injectable } from '@angular/core';
import { AnalyticsService } from './analytics.service';

/**
 * Track engagement signals: scroll depth, time on site
 */
@Injectable({
  providedIn: 'root'
})
export class EngagementService {
  private scrollThresholdsHit = new Set<number>();
  private timeoutHandle: any;
  private timeOnSiteTracked = false;

  constructor(private analytics: AnalyticsService) {
    this.initScrollTracking();
    this.initTimeOnSiteTracking();
  }

  /**
   * Track scroll depth at 50% and 90%
   */
  private initScrollTracking(): void {
    window.addEventListener('scroll', () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );

      if (scrollPercent >= 50 && !this.scrollThresholdsHit.has(50)) {
        this.scrollThresholdsHit.add(50);
        this.analytics.trackEvent('scroll_depth', { depth_percent: 50 });
      }

      if (scrollPercent >= 90 && !this.scrollThresholdsHit.has(90)) {
        this.scrollThresholdsHit.add(90);
        this.analytics.trackEvent('scroll_depth', { depth_percent: 90 });
      }
    });
  }

  /**
   * Track time on site: fire once after 30 seconds
   */
  private initTimeOnSiteTracking(): void {
    this.timeoutHandle = setTimeout(() => {
      if (!this.timeOnSiteTracked) {
        this.timeOnSiteTracked = true;
        this.analytics.trackEvent('time_on_site_30s', {
          session_start: new Date().toISOString()
        });
      }
    }, 30000);
  }

  ngOnDestroy(): void {
    if (this.timeoutHandle) {
      clearTimeout(this.timeoutHandle);
    }
  }
}
