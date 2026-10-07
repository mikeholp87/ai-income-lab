import assert from 'node:assert/strict';
import test from 'node:test';
import { campaignProperties, getCampaign, nextTabIndex, outboundUrl, readingLink, wantsCommunity } from './funnel.js';

test('routes campaign messaging and preserves attribution', () => {
  const campaign = getCampaign('?angle=agency&utm_source=facebook&utm_content=video-a&fbclid=abc', ['default', 'agency']);
  const outbound = new URL(outboundUrl('https://example.com/plans?src=join', campaign, { selected_plan: 'premium' }));

  assert.equal(campaign.angle, 'agency');
  assert.equal(outbound.searchParams.get('utm_source'), 'facebook');
  assert.equal(outbound.searchParams.get('utm_content'), 'video-a');
  assert.equal(outbound.searchParams.get('selected_plan'), 'premium');
  assert.equal(outbound.searchParams.get('fbclid'), 'abc');
});

test('moves product tour tabs with arrow and boundary keys', () => {
  assert.equal(nextTabIndex(3, 'ArrowRight', 4), 0);
  assert.equal(nextTabIndex(0, 'ArrowLeft', 4), 3);
  assert.equal(nextTabIndex(2, 'Home', 4), 0);
  assert.equal(nextTabIndex(1, 'End', 4), 3);
});

test('sends YouTube and ?angle=community visitors to the community hero', () => {
  const angles = ['community'];
  assert.equal(wantsCommunity(getCampaign('?utm_source=YouTube&utm_medium=description', angles)), true);
  assert.equal(wantsCommunity(getCampaign('?angle=community', angles)), true);
  assert.equal(wantsCommunity(getCampaign('?utm_source=facebook', angles)), false);
  assert.equal(wantsCommunity(getCampaign('', angles)), false);
});

test('keeps video attribution through a guide, homepage and community without copying unrelated data', () => {
  const landing = 'https://www.ai-automation-station.com/guides/youtube-feed.html?utm_source=youtube&utm_medium=description&utm_campaign=build-guides&utm_content=video-123&email=private&fbclid=private';
  const home = readingLink('/#community', landing);
  const campaign = getCampaign(new URL(home).search, ['community']);
  const skool = new URL(outboundUrl('https://www.skool.com/ai-automation-station-7346/plans', campaign));
  assert.equal(new URL(home).hash, '#community');
  assert.equal(skool.searchParams.get('utm_content'), 'video-123');
  assert.equal(skool.searchParams.has('email'), false);
  assert.equal(skool.searchParams.has('fbclid'), false);
  assert.deepEqual(campaignProperties(campaign), { source: 'youtube', medium: 'description', campaign: 'build-guides', content: 'video-123' });
  assert.equal(readingLink('https://github.com/mikeholp87/ai-income-lab', landing), 'https://github.com/mikeholp87/ai-income-lab');
  assert.equal(readingLink('https://www.skool.com/someone-else', landing), 'https://www.skool.com/someone-else');
  assert.equal(new URL(readingLink('/?utm_content=explicit', landing)).searchParams.get('utm_content'), 'explicit');
  assert.equal(new URL(readingLink('https://www.skool.com/ai-automation-station-7346/plans', landing)).searchParams.get('utm_content'), 'video-123');
});
