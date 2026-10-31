import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

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

test('the content security policy is enforced and allows the consented analytics pings', async () => {
  const config = JSON.parse(await readFile(new URL('../vercel.json', import.meta.url), 'utf8'));
  const headers = config.headers.find(rule => rule.source === '/(.*)').headers;
  assert.ok(!headers.some(header => header.key === 'Content-Security-Policy-Report-Only'));
  const policy = headers.find(header => header.key === 'Content-Security-Policy').value;
  const directive = name => policy.split(';').map(part => part.trim()).find(part => part.startsWith(`${name} `));
  assert.match(directive('frame-ancestors'), /'none'/);
  // Google Analytics and the Meta pixel load these as images once a visitor allows tracking.
  for (const origin of ['https://www.googletagmanager.com', 'https://connect.facebook.net']) assert.ok(directive('img-src').includes(origin), origin);
  for (const origin of ['https://app.cal.com', 'https://www.youtube-nocookie.com']) assert.ok(directive('frame-src').includes(origin), origin);
});
