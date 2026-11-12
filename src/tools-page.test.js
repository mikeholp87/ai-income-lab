import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { affiliates, categories } from './affiliates.js';
import { toolLink } from './tool-links.js';
import { renderToolsPage, videosUsing } from './tools-page.js';
import { uploads } from './uploads-snapshot.js';

const read = path => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('the affiliate list matches the descriptions’ recommended tools and has one entry per tool', () => {
  assert.deepEqual(affiliates.filter(affiliate => affiliate.recommended).map(affiliate => affiliate.name).sort(),
    ['Apollo', 'Deel', 'Fiverr', 'GetResponse', 'HeyGen', 'Hostinger', 'Lovable', 'Make.com', 'OpusClip', 'Pikzels', 'SendPulse', 'Skool', 'Syllaby', 'TubeBuddy', 'Vapi', 'vidIQ']);
  const ids = new Set(categories.map(([id]) => id));
  assert.equal(new Set(affiliates.map(affiliate => affiliate.name)).size, affiliates.length);
  assert.equal(new Set(affiliates.map(affiliate => affiliate.url)).size, affiliates.length);
  for (const affiliate of affiliates) {
    assert.ok(ids.has(affiliate.category), affiliate.name);
    assert.match(affiliate.url, /^https:\/\//, affiliate.name);
    assert.doesNotMatch(affiliate.blurb, /—|;|…/, affiliate.name);
  }
});

test('watch pages link every affiliate tool name to the same referral link', () => {
  for (const affiliate of affiliates) {
    for (const name of affiliate.tools) assert.deepEqual(toolLink(name), { url: affiliate.url, affiliate: true }, name);
  }
});

test('the tools page discloses affiliate links before the first one and marks every one sponsored', () => {
  const html = renderToolsPage({ uploads, guides: [{ title: 'Make.com Google Sheets tutorial', url: 'https://www.ai-automation-station.com/guides/make-first-automation.html', modified: '2026-11-01' }], updated: new Date('2026-11-12T00:00:00Z') });
  assert.equal((html.match(/<h1>/g) || []).length, 1);
  assert.ok(html.indexOf('Affiliate disclosure') < html.indexOf('class="tool-cta"'));
  const ctas = [...html.matchAll(/<a class="tool-cta" href="([^"]+)" target="_blank" rel="sponsored noopener" data-affiliate="([^"]+)"/g)];
  assert.equal(ctas.length, affiliates.length);
  for (const [, url, name] of ctas) assert.equal(url.replace(/&amp;/g, '&'), affiliates.find(affiliate => affiliate.name === name).url);
  for (const [id] of categories) assert.match(html, new RegExp(`<a href="#${id}">[^]*?<section class="tool-group" id="${id}"`));
  assert.match(html, /<a href="\/guides\/make-first-automation\.html">Make\.com Google Sheets tutorial<\/a>/);
  assert.match(html, /<time datetime="2026-11-12">November 12, 2026<\/time>/);
  for (const [, json] of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)) JSON.parse(json);
  // Only public, embeddable uploads get a watch link, so none of them 404.
  const ids = new Set(uploads.filter(video => video.public !== false && video.embeddable !== false).map(video => video.id));
  for (const [, id] of html.matchAll(/href="\/watch\/([\w-]{11})"/g)) assert.ok(ids.has(id), id);
});

test('a tool is counted in a video whichever of its two tool lists names it', () => {
  const opusClip = affiliates.find(affiliate => affiliate.name === 'OpusClip');
  assert.ok(videosUsing(opusClip, uploads).length > 0);
});

test('the tools page is built, listed and linked', async () => {
  assert.match(await read('scripts/prerender.js'), /writeFile\('dist\/tools\.html', renderToolsPage\(/);
  assert.match(await read('scripts/prerender.js'), /'terms\.html', 'tools\.html'/);
  assert.match(await read('public/sitemap.xml'), /<loc>https:\/\/www\.ai-automation-station\.com\/tools\.html<\/loc>/);
  assert.match(await read('public/llms.txt'), /\[Recommended tools\]\(https:\/\/www\.ai-automation-station\.com\/tools\.html\)/);
  assert.match(await read('vercel.json'), /search\|tools\)"/);
  assert.match(await read('src/main.jsx'), /<a href="\/tools\.html">Recommended tools<\/a>/);
  assert.match(await read('src/reading.js'), /trackGoogleEvent\('affiliate_outbound_clicked', event\)/);
});
