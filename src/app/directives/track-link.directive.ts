import { Directive, HostListener, Input } from '@angular/core';
import { AnalyticsService } from '../services/analytics.service';

/**
 * Directive to track link clicks globally
 * Usage: <a appTrackLink [trackData]="{ eventName: 'project_demo_click', link_name: 'Postify Demo', project: 'Postify' }">
 */
@Directive({
  selector: '[appTrackLink]'
})
export class TrackLinkDirective {
  @Input() trackData?: { eventName: string; [key: string]: any };

  constructor(private analytics: AnalyticsService) {
    console.log('[TrackLink] Directive instantiated');
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    console.log('[TrackLink] Click detected. trackData:', this.trackData);
    
    if (this.trackData?.eventName) {
      console.log('[TrackLink] Calling analytics.trackEvent with:', this.trackData);
      this.analytics.trackEvent(this.trackData.eventName, this.trackData);
    } else {
      console.log('[TrackLink] No eventName in trackData, skipping track');
    }
  }
}
