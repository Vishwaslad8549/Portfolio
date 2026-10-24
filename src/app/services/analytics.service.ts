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
    this.initDebugMode();
    console.log('[GA] Service initialized');
    console.log('[GA] Production:', environment.production);
    console.log('[GA] gtag available:', typeof gtag !== 'undefined');
  }

  /**
   * Enable debug mode for GA4 DebugView
   */
  private initDebugMode(): void {
    if (typeof gtag !== 'undefined') {
      try {
        gtag('config', 'G-JRXEZF96BY', {
          'debug_mode': true
        });
        console.log('[GA] ✓ Debug mode enabled for DebugView');
      } catch (e) {
        console.error('[GA] Error enabling debug mode:', e);
      }
    } else {
      console.warn('[GA] gtag not available - check if GA script loaded');
    }
  }

  /**
   * Track a custom event in GA4
   */
  trackEvent(eventName: string, params: { [key: string]: any } = {}): void {
    console.log('[GA] Event:', eventName, params);
    
    if (this.isDev) {
      console.log('[GA] Dev mode - blocking event');
      return;
    }
    
    if (this.isOptedOut) {
      console.log('[GA] Opted out - blocking event');
      return;
    }
    
    if (typeof gtag === 'undefined') {
      console.warn('[GA] gtag undefined - event NOT sent');
      return;
    }

    try {
      gtag('event', eventName, params);
      console.log('[GA] ✓ Event sent:', eventName);
    } catch (e) {
      console.error('[GA] Error:', e);
    }
  }

  /**
   * Track page view
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
      console.error('[GA] page view error:', e);
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
        console.log('[GA] Opt-out enabled');
      } else if (notrackValue === '0') {
        localStorage.removeItem('ga_optout');
        this.isOptedOut = false;
        console.log('[GA] Opt-out cleared');
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
