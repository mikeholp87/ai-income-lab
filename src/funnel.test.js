import assert from 'node:assert/strict';
import test from 'node:test';
import { getCampaign, nextTabIndex, outboundUrl } from './funnel.js';

test('routes campaign messaging and preserves attribution', () => {
  const campaign = getCampaign('?angle=agency&utm_source=facebook&fbclid=abc', ['default', 'agency']);
  const outbound = new URL(outboundUrl('https://example.com/plans?src=join', campaign));

  assert.equal(campaign.angle, 'agency');
  assert.equal(outbound.searchParams.get('utm_source'), 'facebook');
  assert.equal(outbound.searchParams.get('fbclid'), 'abc');
});

test('moves product tour tabs with arrow and boundary keys', () => {
  assert.equal(nextTabIndex(3, 'ArrowRight', 4), 0);
  assert.equal(nextTabIndex(0, 'ArrowLeft', 4), 3);
  assert.equal(nextTabIndex(2, 'Home', 4), 0);
  assert.equal(nextTabIndex(1, 'End', 4), 3);
});
