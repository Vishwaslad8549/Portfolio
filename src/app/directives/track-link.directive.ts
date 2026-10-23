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

  constructor(private analytics: AnalyticsService) {}

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    if (this.trackData?.eventName) {
      this.analytics.trackEvent(this.trackData.eventName, this.trackData);
    }
  }
}
