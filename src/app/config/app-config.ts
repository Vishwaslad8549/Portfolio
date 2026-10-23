/**
 * Central configuration for app URLs and UTM parameters
 */

export const APP_CONFIG = {
  apps: {
    postify: {
      baseUrl: 'https://postify.vishwasladweb.site',
      name: 'Postify'
    },
    transcriber: {
      baseUrl: 'https://transcribe.vishwasladweb.site',
      name: 'Transcriber'
    }
  },

  utm: {
    source: 'portfolio',
    medium: 'website',
    campaign: 'project_showcase'
  }
};

/**
 * Build a URL with UTM parameters for tracking
 * Preserves existing query params
 */
export function buildAppUrl(baseUrl: string, utmContent: string): string {
  const url = new URL(baseUrl);
  
  url.searchParams.append('utm_source', APP_CONFIG.utm.source);
  url.searchParams.append('utm_medium', APP_CONFIG.utm.medium);
  url.searchParams.append('utm_campaign', APP_CONFIG.utm.campaign);
  url.searchParams.append('utm_content', utmContent);

  return url.toString();
}

/**
 * Map placement IDs to projects and apps
 */
export const LINK_PLACEMENTS = {
  hero_cta: { app: 'postify', label: 'Hero CTA' },
  project_card_demo: { app: 'mixed', label: 'Project Card Demo' },
  project_card_title: { app: 'mixed', label: 'Project Title' },
  navbar: { app: 'postify', label: 'Navbar CTA' }
};
