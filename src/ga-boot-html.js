// Shared head tags for consent defaults, landing URL capture, and the deferred GA loader.
// Keep this aligned with public/ga-boot.js and src/tracking.js (measurement ID G-XYRWT4PFN8).
export const gaConsentInline = '<script>window.__landingPageLocation=window.__landingPageLocation||window.location.href;window.dataLayer=window.dataLayer||[];window.gtag=window.gtag||function(){window.dataLayer.push(arguments)};if(!window.__gaConsentDefaulted){window.__gaConsentDefaulted=true;window.gtag(\'consent\',\'default\',{analytics_storage:\'denied\',ad_storage:\'denied\',ad_user_data:\'denied\',ad_personalization:\'denied\',wait_for_update:500})}</script>';

export const gaBootScript = '<script src="/ga-boot.js" defer></script>';

export const gaBootHead = `${gaConsentInline}${gaBootScript}`;
