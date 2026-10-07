import assert from 'node:assert/strict';
import test from 'node:test';
import { pageCount, parseUploads, renderArchive } from './archive.js';
import { GET } from '../api/videos.js';

const item = (id, title, published, privacyStatus = 'public') => ({ snippet: { resourceId: { videoId: id }, title, publishedAt: published, description: 'Join\nhttps://example.com\n\nBuild an agent.' }, status: { privacyStatus }, contentDetails: { videoPublishedAt: published } });

test('keeps public uploads, newest first, across pages', () => {
  const pages = [{ items: [item('old', 'Old', '2025-12-31T10:00:00Z'), item('gone', 'Private video', '2026-03-01T10:00:00Z', 'private')] }, { items: [item('new', 'New', '2026-10-05T12:37:47Z')] }];
  assert.deepEqual(parseUploads(pages).map(video => video.id), ['new', 'old']);
  assert.equal(parseUploads(pages)[0].summary, 'Build an agent.');
});

test('renders year groups and escapes titles', () => {
  const html = renderArchive(parseUploads([{ items: [item('a1', 'Claude <Code> & "n8n"', '2026-10-05T12:37:47Z'), item('b2', 'Older', '2025-06-01T00:00:00Z')] }]));
  assert.match(html, /<h2>2026<\/h2>[\s\S]*<h2>2025<\/h2>/);
  assert.match(html, /Claude &lt;Code&gt; &amp; &quot;n8n&quot;/);
  assert.doesNotMatch(html, /<Code>/);
  assert.match(html, /2 long-form builds/);
  assert.doesNotMatch(html, /class="pager/);
});

test('splits the archive into pages of 15 linked to each other', () => {
  const videos = Array.from({ length: 31 }, (_, index) => ({ id: `v${index}`, title: `Video ${index}`, published: new Date(Date.UTC(2026, 9, 31 - index)).toISOString(), summary: '' }));
  const cards = html => html.match(/<li>/g).length;
  assert.equal(pageCount(videos), 3);
  const first = renderArchive(videos, 1);
  assert.equal(cards(first), 15);
  assert.match(first, /<link rel="canonical" href="https:\/\/www\.ai-automation-station\.com\/videos">/);
  assert.match(first, /<a href="\/videos\/2" rel="next">Older →<\/a>/);
  assert.doesNotMatch(first, /rel="prev"/);
  const last = renderArchive(videos, 3);
  assert.equal(cards(last), 1);
  assert.match(last, /v30/);
  assert.match(last, /<link rel="canonical" href="https:\/\/www\.ai-automation-station\.com\/videos\/3">/);
  assert.match(last, /<a href="\/videos\/2" rel="prev">← Newer<\/a>/);
  assert.match(last, /<span aria-current="page">3<\/span>/);
  assert.match(last, /<title>Every video, page 3 of 3 \| Mike Holp<\/title>/);
});

test('routes page numbers before loading any videos', async () => {
  const one = await GET(new Request('https://www.ai-automation-station.com/videos/1'));
  assert.equal(one.status, 308);
  assert.equal(one.headers.get('location'), 'https://www.ai-automation-station.com/videos');
  for (const bad of ['/videos/0', '/videos/abc', '/videos/02', '/api/videos?page=-1']) {
    assert.equal((await GET(new Request(`https://www.ai-automation-station.com${bad}`))).status, 404, bad);
  }
});
