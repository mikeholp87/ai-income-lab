import assert from 'node:assert/strict';
import test from 'node:test';
import { bootGoogleAnalytics, disableMarketingTracking, GA_MEASUREMENT_ID, getTrackingConsent, landingPageLocation, loadMarketingTracking, setTrackingConsent, trackGoogleEvent, trackMetaOutbound } from './tracking.js';

const landing = 'https://www.ai-automation-station.com/guides/claude-code-for-beginners.html?utm_source=test_src&utm_medium=test_med&utm_campaign=test_camp';

function resetTracking() {
  for (const key of ['__marketingTrackingLoaded', '__marketingTrackingActive', '__gaBooted', '__gaConsentDefaulted', '__gaScript', '__landingPageLocation', 'clarity', 'fbq', '_fbq', 'gtag', 'dataLayer']) {
    delete globalThis[key];
  }
}

test('invalid or unavailable stored consent is treated as undecided', () => {
  for (const value of [null, '', 'true', 'allow', 'undefined']) {
    globalThis.localStorage = { getItem: () => value };
    assert.equal(getTrackingConsent(), null);
  }
  globalThis.localStorage = { getItem() { throw new Error('Storage disabled'); } };
  assert.equal(getTrackingConsent(), null);
});

test('loads trackers once and restores consent after allow → decline → allow', () => {
  resetTracking();
  const scripts = [];
  const values = new Map();
  globalThis.localStorage = { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) };
  globalThis.document = { createElement: () => ({}), head: { appendChild: script => scripts.push(script) } };
  globalThis.location = { href: landing };
  globalThis.window = globalThis;

  loadMarketingTracking();
  assert.equal(scripts.length, 0);
  setTrackingConsent('denied');
  loadMarketingTracking();
  assert.equal(scripts.length, 0);
  setTrackingConsent('granted');
  loadMarketingTracking();
  loadMarketingTracking();
  setTrackingConsent('denied');
  disableMarketingTracking();
  setTrackingConsent('granted');
  loadMarketingTracking();

  assert.equal(getTrackingConsent(), 'granted');
  assert.deepEqual(scripts.map(script => script.src), [`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`, 'https://www.clarity.ms/tag/z8txdoz9f4?ref=bwt', 'https://connect.facebook.net/en_US/fbevents.js']);
  assert.ok(window.clarity.q.some(([name, consent]) => name === 'consentv2' && consent.analytics_Storage === 'granted'));
  assert.ok(window.clarity.q.some(([name, consent]) => name === 'consentv2' && consent.analytics_Storage === 'denied'));
  assert.equal(window.fbq.queue.filter(args => args[0] === 'track' && args[1] === 'PageView').length, 2);
  assert.equal(window.fbq.queue.some(args => args[0] === 'consent' && args[1] === 'revoke'), true);
  assert.equal(window.fbq.queue.at(-2)[1], 'grant');
  assert.equal(Array.from(window.dataLayer.at(-2))[1], 'update');
  assert.equal(Array.from(window.dataLayer.at(-2))[2].analytics_storage, 'granted');
});

test('sends GA4 events only after analytics consent', () => {
  const events = [];
  const values = new Map();
  globalThis.localStorage = { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) };
  globalThis.window = { gtag: (...args) => events.push(args) };

  assert.equal(trackGoogleEvent('cta_click', { placement: 'hero' }), false);
  setTrackingConsent('granted');
  assert.equal(trackGoogleEvent('cta_click', { placement: 'hero' }), true);
  assert.deepEqual(events, [['event', 'cta_click', { placement: 'hero' }]]);
});

test('sends Skool clicks to Meta only while analytics consent is active', () => {
  const events = [];
  const values = new Map();
  globalThis.localStorage = { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) };
  globalThis.window = { fbq: (...args) => events.push(args), __marketingTrackingActive: true };
  const lead = { plan: 'Premium', placement: 'pricing_card' };

  assert.equal(trackMetaOutbound(lead), false);
  setTrackingConsent('granted');
  assert.equal(trackMetaOutbound(lead), true);
  window.__marketingTrackingActive = false;
  assert.equal(trackMetaOutbound(lead), false);
  assert.deepEqual(events, [['trackCustom', 'SkoolOutboundClicked', lead]]);
});

test('gtag.js loads at once once consent is granted, while Meta still waits for idle time', () => {
  resetTracking();
  const scripts = [];
  const idle = [];
  globalThis.localStorage = { getItem: () => 'granted', setItem() {} };
  globalThis.document = { createElement: () => ({}), head: { appendChild: script => scripts.push(script) } };
  globalThis.location = { href: landing };
  globalThis.window = globalThis;
  globalThis.requestIdleCallback = (task, options) => idle.push([task, options]);
  try {
    loadMarketingTracking();
    assert.deepEqual(scripts.map(script => script.src), [`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`, 'https://www.clarity.ms/tag/z8txdoz9f4?ref=bwt']);
    assert.ok(window.dataLayer.length > 0);
    assert.ok(window.fbq.queue.some(args => args[0] === 'track' && args[1] === 'PageView'));
    assert.ok(idle.every(([, options]) => options.timeout === 3000));
    for (const [task] of idle) task();
    assert.deepEqual(scripts.map(script => script.src), [`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`, 'https://www.clarity.ms/tag/z8txdoz9f4?ref=bwt', 'https://connect.facebook.net/en_US/fbevents.js']);
  } finally {
    delete globalThis.requestIdleCallback;
  }
});

test('first config keeps the landing page_location even after the URL is rewritten', () => {
  resetTracking();
  const scripts = [];
  globalThis.localStorage = { getItem: () => 'granted', setItem() {} };
  globalThis.document = { createElement: () => ({}), head: { appendChild: script => scripts.push(script) } };
  globalThis.location = { href: landing };
  globalThis.window = globalThis;
  bootGoogleAnalytics();
  globalThis.location.href = 'https://www.ai-automation-station.com/guides/claude-code-for-beginners.html';
  bootGoogleAnalytics();
  const config = [...window.dataLayer].find(args => Array.from(args)[0] === 'config');
  assert.equal(Array.from(config)[1], GA_MEASUREMENT_ID);
  assert.equal(Array.from(config)[2].page_location, landing);
  assert.equal(landingPageLocation(), landing);
  assert.equal(scripts.length, 1);
});

test('does not load gtag.js before analytics consent', () => {
  resetTracking();
  const scripts = [];
  globalThis.localStorage = { getItem: () => null, setItem() {} };
  globalThis.document = { createElement: () => ({}), head: { appendChild: script => scripts.push(script) } };
  globalThis.location = { href: landing };
  globalThis.window = globalThis;
  bootGoogleAnalytics();
  assert.equal(scripts.length, 0);
  assert.equal(Array.from(window.dataLayer[0])[0], 'consent');
  assert.equal(Array.from(window.dataLayer[0])[1], 'default');
  assert.equal(Array.from(window.dataLayer[0])[2].analytics_storage, 'denied');
});
