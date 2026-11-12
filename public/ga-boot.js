// Early GA4 boot for every page type. Keep this aligned with src/tracking.js (measurement ID G-XYRWT4PFN8).
// Captures the landing URL before later scripts rewrite the query string. Loads gtag.js only after stored consent.
(function () {
  if (typeof window === 'undefined' || !window.location) return;
  var id = 'G-XYRWT4PFN8';
  window.__landingPageLocation = window.__landingPageLocation || window.location.href;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() { window.dataLayer.push(arguments); };
  if (!window.__gaConsentDefaulted) {
    window.__gaConsentDefaulted = true;
    window.gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', wait_for_update: 500 });
  }
  var consent = null;
  try { consent = localStorage.getItem('marketing-consent'); } catch (e) { /* private mode */ }
  if (consent !== 'granted' || window.__gaBooted) return;
  window.__gaBooted = true;
  window.gtag('consent', 'update', { analytics_storage: 'granted', ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted' });
  window.gtag('js', new Date());
  window.gtag('config', id, { page_location: window.__landingPageLocation });
  if (window.__gaScript) return;
  window.__gaScript = true;
  var script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + id;
  document.head.appendChild(script);
})();
