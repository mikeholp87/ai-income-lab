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
