import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

declare var gtag: Function;

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private isDev = !environment.production;
  private isOptedOut = false;

  constructor() {
    this.checkOptOut();
  }

  /**
   * Track a custom event in GA4
   * Respects dev mode, opt-out, and gtag availability
   */
  trackEvent(eventName: string, params: { [key: string]: any } = {}): void {
    if (this.isDev || this.isOptedOut || typeof gtag === 'undefined') {
      return;
    }

    try {
      gtag('event', eventName, params);
    } catch (e) {
      console.error('GA tracking error:', e);
    }
  }

  /**
   * Manual page view for SPA (only if not using auto page view)
   */
  trackPageView(path: string, title: string): void {
    if (this.isDev || this.isOptedOut || typeof gtag === 'undefined') {
      return;
    }

    try {
      gtag('config', 'G-JRXEZF96BY', {
        page_path: path,
        page_location: window.location.href,
        page_title: title
      });
    } catch (e) {
      console.error('GA page view error:', e);
    }
  }

  /**
   * Handle opt-out via URL params and localStorage
   */
  private checkOptOut(): void {
    const params = new URLSearchParams(window.location.search);
    
    if (params.has('notrack')) {
      const notrackValue = params.get('notrack');
      
      if (notrackValue === '1') {
        localStorage.setItem('ga_optout', '1');
        this.disableGA();
      } else if (notrackValue === '0') {
        localStorage.removeItem('ga_optout');
        this.isOptedOut = false;
      }
    }

    if (localStorage.getItem('ga_optout') === '1') {
      this.isOptedOut = true;
      this.disableGA();
    }
  }

  /**
   * Disable GA globally
   */
  private disableGA(): void {
    (window as any)['ga-disable-G-JRXEZF96BY'] = true;
  }
}
