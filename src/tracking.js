const consentKey = 'marketing-consent';

export function getTrackingConsent() {
  try {
    const value = localStorage.getItem(consentKey);
    return value === 'granted' || value === 'denied' ? value : null;
  } catch (_) { return null; }
}

export function setTrackingConsent(value) {
  try { localStorage.setItem(consentKey, value); } catch (_) { /* Storage may be unavailable. */ }
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
  if (window.__marketingTrackingActive) return;
  if (window.__marketingTrackingLoaded) {
    window.__marketingTrackingActive = true;
    window.gtag('consent', 'update', { analytics_storage: 'granted', ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted' });
    window.gtag('config', 'G-XYRWT4PFN8');
    window.fbq('consent', 'grant');
    window.fbq('track', 'PageView');
    return;
  }
  window.__marketingTrackingLoaded = true;
  window.__marketingTrackingActive = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', 'G-XYRWT4PFN8');
  // The stubs above queue calls at once; the tag scripts themselves wait for idle time so they don't compete with input.
  const whenIdle = typeof window.requestIdleCallback === 'function' ? task => window.requestIdleCallback(task, { timeout: 3000 }) : task => task();
  const addScript = src => whenIdle(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = src;
    document.head.appendChild(script);
  });
  addScript('https://www.googletagmanager.com/gtag/js?id=G-XYRWT4PFN8');

  if (!window.fbq) {
    const fbq = window.fbq = function fbq() {
      fbq.callMethod ? fbq.callMethod.apply(fbq, arguments) : fbq.queue.push(arguments);
    };
    window._fbq = fbq;
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = '2.0';
    fbq.queue = [];
    addScript('https://connect.facebook.net/en_US/fbevents.js');
  }
  window.fbq('init', '2384492104905321');
  window.fbq('consent', 'grant');
  window.fbq('track', 'PageView');
}

export function disableMarketingTracking() {
  if (typeof window === 'undefined') return;
  window.__marketingTrackingActive = false;
  if (typeof window.gtag === 'function') window.gtag('consent', 'update', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
  if (typeof window.fbq === 'function') window.fbq('consent', 'revoke');
}
