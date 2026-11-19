const consentKey = 'marketing-consent';
export const GA_MEASUREMENT_ID = 'G-XYRWT4PFN8';

const deniedConsent = {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
};

const grantedConsent = {
  analytics_storage: 'granted',
  ad_storage: 'granted',
  ad_user_data: 'granted',
  ad_personalization: 'granted',
};

export function getTrackingConsent() {
  try {
    const value = localStorage.getItem(consentKey);
    return value === 'granted' || value === 'denied' ? value : null;
  } catch (_) { return null; }
}

export function setTrackingConsent(value) {
  try { localStorage.setItem(consentKey, value); } catch (_) { /* Storage may be unavailable. */ }
}

export function landingPageLocation() {
  if (typeof window === 'undefined') return '';
  return window.__landingPageLocation ||= window.location.href;
}

function googleConfig() {
  return { page_location: landingPageLocation() };
}

function loadGoogleTag() {
  if (window.__gaScript || typeof document === 'undefined') return;
  window.__gaScript = true;
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
}

// Capture the landing URL before any later replaceState, then load gtag immediately once consent is already granted.
export function bootGoogleAnalytics() {
  if (typeof window === 'undefined') return;
  landingPageLocation();
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() { window.dataLayer.push(arguments); };
  if (!window.__gaConsentDefaulted) {
    window.__gaConsentDefaulted = true;
    window.gtag('consent', 'default', { ...deniedConsent, wait_for_update: 500 });
  }
  if (getTrackingConsent() !== 'granted' || window.__gaBooted) return;
  window.__gaBooted = true;
  window.gtag('consent', 'update', grantedConsent);
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, googleConfig());
  loadGoogleTag();
}

export function trackGoogleEvent(name, parameters = {}) {
  if (typeof window === 'undefined' || getTrackingConsent() !== 'granted' || typeof window.gtag !== 'function') return false;
  window.gtag('event', name, parameters);
  return true;
}

// A Skool click is interest, not a signup, so it goes to Meta as a custom event rather than the standard Lead.
export function trackMetaOutbound(properties) {
  if (typeof window === 'undefined' || getTrackingConsent() !== 'granted' || !window.__marketingTrackingActive || typeof window.fbq !== 'function') return false;
  window.fbq('trackCustom', 'SkoolOutboundClicked', properties);
  return true;
}

export function loadMarketingTracking() {
  if (typeof window === 'undefined' || getTrackingConsent() !== 'granted') return;
  bootGoogleAnalytics();
  if (window.__marketingTrackingActive) return;
  if (typeof window.clarity === 'function') {
    window.clarity('consentv2', { ad_Storage: 'granted', analytics_Storage: 'granted' });
  } else {
    window.clarity = window.clarity || function (...args) { (window.clarity.q = window.clarity.q || []).push(args); };
    const clarity = document.createElement('script');
    clarity.async = true;
    clarity.src = 'https://www.clarity.ms/tag/z8txdoz9f4?ref=bwt';
    document.head.appendChild(clarity);
    window.clarity('consentv2', { ad_Storage: 'granted', analytics_Storage: 'granted' });
  }
  if (window.__marketingTrackingLoaded) {
    window.__marketingTrackingActive = true;
    window.gtag('consent', 'update', grantedConsent);
    window.gtag('config', GA_MEASUREMENT_ID, googleConfig());
    window.fbq('consent', 'grant');
    window.fbq('track', 'PageView');
    return;
  }
  window.__marketingTrackingLoaded = true;
  window.__marketingTrackingActive = true;

  // Meta still waits for idle time so it doesn't compete with input; gtag.js is already loading from bootGoogleAnalytics.
  const whenIdle = typeof window.requestIdleCallback === 'function' ? task => window.requestIdleCallback(task, { timeout: 3000 }) : task => task();
  if (!window.fbq) {
    const fbq = window.fbq = function fbq() {
      fbq.callMethod ? fbq.callMethod.apply(fbq, arguments) : fbq.queue.push(arguments);
    };
    window._fbq = fbq;
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = '2.0';
    fbq.queue = [];
    whenIdle(() => {
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://connect.facebook.net/en_US/fbevents.js';
      document.head.appendChild(script);
    });
  }
  window.fbq('init', '2384492104905321');
  window.fbq('consent', 'grant');
  window.fbq('track', 'PageView');
}

export function disableMarketingTracking() {
  if (typeof window === 'undefined') return;
  window.__marketingTrackingActive = false;
  if (typeof window.clarity === 'function') window.clarity('consentv2', { ad_Storage: 'denied', analytics_Storage: 'denied' });
  if (typeof window.gtag === 'function') window.gtag('consent', 'update', deniedConsent);
  if (typeof window.fbq === 'function') window.fbq('consent', 'revoke');
}
