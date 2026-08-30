import assert from 'node:assert/strict';
import test from 'node:test';
import { disableMarketingTracking, getTrackingConsent, loadMarketingTracking, setTrackingConsent } from './tracking.js';

test('stores consent and loads each marketing tracker once', () => {
  const scripts = [];
  const values = new Map();
  globalThis.localStorage = { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) };
  globalThis.document = { createElement: () => ({}), head: { appendChild: script => scripts.push(script) } };
  globalThis.window = globalThis;

  setTrackingConsent('granted');
  loadMarketingTracking();
  loadMarketingTracking();
  disableMarketingTracking();

  assert.equal(getTrackingConsent(), 'granted');
  assert.deepEqual(scripts.map(script => script.src), ['https://www.googletagmanager.com/gtag/js?id=G-XYRWT4PFN8', 'https://connect.facebook.net/en_US/fbevents.js']);
  assert.equal(window.fbq.queue.some(args => args[0] === 'track' && args[1] === 'PageView'), true);
  assert.equal(window.fbq.queue.some(args => args[0] === 'consent' && args[1] === 'revoke'), true);
});
