import assert from 'node:assert/strict';
import test from 'node:test';
import { getCampaign, outboundProperties, outboundUrl } from './funnel.js';

test('routes campaign messaging and preserves attribution', () => {
  const campaign = getCampaign('?angle=agency&utm_source=facebook&utm_content=video-a&fbclid=abc', ['default', 'agency']);
  const outbound = new URL(outboundUrl('https://example.com/plans?src=join', campaign, { selected_plan: 'premium' }));

  assert.equal(campaign.angle, 'agency');
  assert.equal(outbound.searchParams.get('utm_source'), 'facebook');
  assert.equal(outbound.searchParams.get('utm_content'), 'video-a');
  assert.equal(outbound.searchParams.get('selected_plan'), 'premium');
  assert.equal(outbound.searchParams.get('fbclid'), 'abc');
});

test('unknown campaign angles fall back and arbitrary parameters are not forwarded', () => {
  const campaign = getCampaign('?angle=unknown&utm_source=mail&email=private@example.com', ['default', 'agency']);
  assert.equal(campaign.angle, 'default');
  assert.equal(new URL(outboundUrl('https://example.com', campaign)).searchParams.has('email'), false);
});

test('outbound metadata keeps campaign and plan attribution without claiming signup', () => {
  const campaign = getCampaign('?angle=agency&utm_source=facebook&utm_campaign=launch&utm_content=demo', ['default', 'agency']);
  const properties = outboundProperties(campaign, { placement: 'pricing', plan: 'VIP', href: 'https://example.com', designVersion: 'v2' });
  assert.equal(properties.plan, 'VIP');
  assert.equal(properties.angle, 'agency');
  assert.equal(properties.campaign, 'launch');
  assert.equal(properties.source, 'facebook');
  assert.equal(properties.action, 'visit_skool');
  assert.equal(outboundProperties(campaign, { placement: 'community' }).plan, 'undecided');
});
