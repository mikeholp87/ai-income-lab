import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('legacy AI coding video URLs permanently redirect to the existing coding guide', async () => {
  const config = JSON.parse(await readFile(new URL('../vercel.json', import.meta.url), 'utf8'));
  assert.equal(Object.hasOwn(config, 'trailingSlash'), false);
  const { redirects } = config;
  const strip = redirects.find(rule => rule.source === '/:path(.*)/');
  assert.ok(strip);
  const destination = '/guides/build-apps-with-ai-coding-agents.html';
  for (const path of ['/videos/ai-coding', '/videos/ai-coding/']) {
    const redirect = redirects.find(rule => rule.source === path);
    assert.ok(redirect, path);
    assert.equal(redirect.destination, destination, path);
    assert.equal(redirect.permanent, true, path);
    assert.ok(redirects.indexOf(redirect) < redirects.indexOf(strip), path);
  }
  const html = await readFile(new URL(`../public${destination}`, import.meta.url), 'utf8');
  assert.ok(html.includes(`<link rel="canonical" href="https://www.ai-automation-station.com${destination}">`));
});

test('only fingerprinted assets receive immutable caching', async () => {
  const config = JSON.parse(await readFile(new URL('../vercel.json', import.meta.url), 'utf8'));
  const rule = config.headers.find(rule => rule.source.startsWith('/assets/') && rule.headers.some(header => header.value.includes('immutable')));
  const pattern = new RegExp(`^${rule.source}$`);
  for (const path of ['/assets/main-BTZ291ue.js', '/assets/thumbnails/hero-5fad965082e1-480.webp']) assert.ok(pattern.test(path));
  for (const path of ['/assets/reading.js', '/assets/guides/codex-workflow.webp']) assert.ok(!pattern.test(path));
  const immutable = config.headers.filter(rule => rule.headers.some(header => header.value.includes('immutable')));
  for (const other of immutable.filter(other => other !== rule)) assert.ok(other.has?.some(condition => condition.type === 'query' && condition.key === 'v'), `${other.source} is immutable only when versioned`);
  const guides = config.headers.find(rule => rule.source === '/assets/guides/(.*)');
  assert.ok(guides.headers.some(header => header.key === 'Cache-Control' && !header.value.includes('immutable')));
});

test('machine-readable pricing and llms files are noindexed, without a conflicting canonical', async () => {
  const config = JSON.parse(await readFile(new URL('../vercel.json', import.meta.url), 'utf8'));
  const header = (source, key) => config.headers.find(rule => rule.source === source)?.headers.find(item => item.key === key)?.value;
  assert.equal(header('/pricing.md', 'X-Robots-Tag'), 'noindex');
  // noindex plus a canonical to another URL sends mixed signals; noindex alone keeps it out of search.
  assert.equal(header('/pricing.md', 'Link'), undefined);
  assert.equal(header('/llms.txt', 'X-Robots-Tag'), 'noindex');
  assert.equal(header('/llms-full.txt', 'X-Robots-Tag'), 'noindex');
  const robots = await readFile(new URL('../public/robots.txt', import.meta.url), 'utf8');
  assert.doesNotMatch(robots, /llms/);
  assert.match(robots, /Sitemap: https:\/\/www\.ai-automation-station\.com\/sitemap\.xml/);
  assert.match(robots, /Sitemap: https:\/\/www\.ai-automation-station\.com\/video-sitemap\.xml/);
});

test('the content security policy is enforced and allows the consented analytics pings', async () => {
  const config = JSON.parse(await readFile(new URL('../vercel.json', import.meta.url), 'utf8'));
  const headers = config.headers.find(rule => rule.source === '/(.*)').headers;
  assert.ok(!headers.some(header => header.key === 'Content-Security-Policy-Report-Only'));
  const policy = headers.find(header => header.key === 'Content-Security-Policy').value;
  const directive = name => policy.split(';').map(part => part.trim()).find(part => part.startsWith(`${name} `));
  assert.match(directive('frame-ancestors'), /'none'/);
  // Google Analytics and the Meta pixel load these as images once a visitor allows tracking.
  for (const origin of ['https://www.googletagmanager.com', 'https://connect.facebook.net', 'https://*.clarity.ms']) assert.ok(directive('img-src').includes(origin), origin);
  for (const origin of ['https://app.cal.com', 'https://www.youtube-nocookie.com']) assert.ok(directive('frame-src').includes(origin), origin);
});
