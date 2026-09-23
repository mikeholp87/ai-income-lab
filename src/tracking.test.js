import assert from 'node:assert/strict';
import test from 'node:test';
import { disableMarketingTracking, getTrackingConsent, loadMarketingTracking, setTrackingConsent, trackGoogleEvent } from './tracking.js';

test('loads trackers once and restores consent after allow → decline → allow', () => {
  const scripts = [];
  const values = new Map();
  globalThis.localStorage = { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) };
  globalThis.document = { createElement: () => ({}), head: { appendChild: script => scripts.push(script) } };
  globalThis.window = globalThis;

  setTrackingConsent('granted');
  loadMarketingTracking();
  loadMarketingTracking();
  setTrackingConsent('denied');
  disableMarketingTracking();
  setTrackingConsent('granted');
  loadMarketingTracking();

  assert.equal(getTrackingConsent(), 'granted');
  assert.deepEqual(scripts.map(script => script.src), ['https://www.googletagmanager.com/gtag/js?id=G-XYRWT4PFN8', 'https://connect.facebook.net/en_US/fbevents.js']);
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
