import assert from 'node:assert/strict';
import { test } from 'node:test';
import { guideMeta, recentUrls, renderFeed, searchIndex } from './feed.js';

const guide = guideMeta('<title>T | Site</title><meta name="description" content="Fix &amp; ship"><link rel="canonical" href="https://www.ai-automation-station.com/guides/a.html">"datePublished":"2026-10-01","dateModified":"2026-10-20"<meta property="og:title" content="Ship A &amp; B">');
const videos = [{ id: 'abcdefghijk', title: 'New <video>', published: '2026-10-27T14:00:00Z', summary: 'Short.', public: true }, { id: 'zzzzzzzzzzz', title: 'Private', published: '2026-10-28T00:00:00Z', summary: '', public: false }];

test('guide metadata comes from the page head', () => {
  assert.deepEqual(guide, { title: 'Ship A & B', description: 'Fix & ship', url: 'https://www.ai-automation-station.com/guides/a.html', published: '2026-10-01', modified: '2026-10-20' });
});

test('the feed lists public items newest first and escapes titles', () => {
  const xml = renderFeed([guide], videos);
  assert.ok(xml.indexOf('New &lt;video&gt;') < xml.indexOf('Ship A &amp; B'));
  assert.doesNotMatch(xml, /Private/);
  assert.equal(searchIndex([guide], videos).length, 2);
});

test('IndexNow gets only recently changed pages and new videos', () => {
  const sitemap = '<url><loc>https://x/old</loc><lastmod>2026-09-01</lastmod></url><url><loc>https://x/new</loc><lastmod>2026-10-27</lastmod></url>';
  assert.deepEqual(recentUrls(sitemap, videos, Date.parse('2026-10-28T12:00:00Z')), ['https://x/new', 'https://www.ai-automation-station.com/watch/abcdefghijk']);
});

test('search lists the most recently updated guides first, ahead of videos', () => {
  const older = { ...guide, title: 'Older', modified: '2026-10-01' };
  assert.deepEqual(searchIndex([older, guide], videos).map(row => row[1]).slice(0, 2), ['Ship A & B', 'Older']);
});
