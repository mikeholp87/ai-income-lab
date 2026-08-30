const consentKey = 'marketing-consent';

export function getTrackingConsent() {
  try { return localStorage.getItem(consentKey); } catch (_) { return null; }
}

export function setTrackingConsent(value) {
  try { localStorage.setItem(consentKey, value); } catch (_) {}
}

export function loadMarketingTracking() {
  if (typeof window === 'undefined' || window.__marketingTrackingLoaded) return;
  window.__marketingTrackingLoaded = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', 'G-XYRWT4PFN8');
  const googleTag = document.createElement('script');
  googleTag.async = true;
  googleTag.src = 'https://www.googletagmanager.com/gtag/js?id=G-XYRWT4PFN8';
  document.head.appendChild(googleTag);

  if (!window.fbq) {
    const fbq = window.fbq = function fbq() {
      fbq.callMethod ? fbq.callMethod.apply(fbq, arguments) : fbq.queue.push(arguments);
    };
    window._fbq = fbq;
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = '2.0';
    fbq.queue = [];
    const pixel = document.createElement('script');
    pixel.async = true;
    pixel.src = 'https://connect.facebook.net/en_US/fbevents.js';
    document.head.appendChild(pixel);
  }
  window.fbq('init', '2384492104905321');
  window.fbq('consent', 'grant');
  window.fbq('track', 'PageView');
}

export function disableMarketingTracking() {
  if (typeof window === 'undefined') return;
  if (typeof window.gtag === 'function') window.gtag('consent', 'update', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
  if (typeof window.fbq === 'function') window.fbq('consent', 'revoke');
}
