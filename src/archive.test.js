import assert from 'node:assert/strict';
import test from 'node:test';
import { pageCount, parseUploads, renderArchive, renderWatch, renderVideoSitemap } from './archive.js';
import { GET, HEAD } from '../api/videos.js';

const item = (id, title, published, privacyStatus = 'public') => ({ snippet: { resourceId: { videoId: id }, title, publishedAt: published, description: 'Join\nhttps://example.com\n\nBuild an agent.' }, status: { privacyStatus }, contentDetails: { videoPublishedAt: published } });

test('keeps public uploads, newest first, across pages', () => {
  const pages = [{ items: [item('old', 'Old', '2025-12-31T10:00:00Z'), item('gone', 'Private video', '2026-03-01T10:00:00Z', 'private')] }, { items: [item('new', 'New', '2026-10-05T12:37:47Z')] }];
  assert.deepEqual(parseUploads(pages).map(video => video.id), ['new', 'old']);
  assert.equal(parseUploads(pages)[0].summary, 'Build an agent.');
});

test('watch pages and video sitemap safely describe the same visible video', () => {
  const video = { id: 'geKngm3sg3w', title: 'Keys & <API>', summary: '</script><script>alert(1)</script>', published: '2026-09-01T00:00:00Z', embeddable: true };
  const html = renderWatch(video);
  const schema = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
  assert.equal(schema.name, video.title);
  assert.equal(schema.description, video.summary);
  assert.equal(schema.uploadDate, video.published);
  assert.match(html, new RegExp(`src="${schema.embedUrl}"`));
  assert.match(html, /<link rel="canonical" href="https:\/\/www\.ai-automation-station\.com\/watch\/geKngm3sg3w">/);
  assert.equal((html.match(/<h1>/g) ?? []).length, 1);
  assert.equal((html.match(/<iframe /g) ?? []).length, 1);
  assert.doesNotMatch(html, /<script>alert|loading="lazy"/);
  assert.match(html, /&lt;\/script&gt;/);
  const sitemap = renderVideoSitemap([video, { ...video, id: 'lbBZ7uLJwbM', embeddable: false }]);
  assert.match(sitemap, /<video:title>Keys &amp; &lt;API&gt;<\/video:title>/);
  assert.ok(sitemap.includes(`<video:player_loc>${schema.embedUrl}</video:player_loc>`));
  assert.ok(sitemap.includes(`<video:thumbnail_loc>${schema.thumbnailUrl}</video:thumbnail_loc>`));
  assert.doesNotMatch(sitemap, /lbBZ7uLJwbM/);
});

test('archive, watch routes and sitemap share verified public upload metadata', async t => {
  const originalKey = process.env.YOUTUBE_API_KEY;
  process.env.YOUTUBE_API_KEY = 'test-only';
  t.after(() => { if (originalKey === undefined) delete process.env.YOUTUBE_API_KEY; else process.env.YOUTUBE_API_KEY = originalKey; });
  const ids = ['geKngm3sg3w', 'lbBZ7uLJwbM', 'TuVL2x6IfDk'];
  let requests = 0;
  t.mock.method(globalThis, 'fetch', async input => {
    requests++;
    if (new URL(input).pathname.endsWith('/playlistItems')) return Response.json({ items: ids.map(id => item(id, `Video ${id}`, '2026-09-01T00:00:00Z')) });
    return Response.json({ items: ids.map((id, index) => ({ id, status: { privacyStatus: index === 2 ? 'private' : 'public', embeddable: index === 0 } })) });
  });
  const request = path => GET(new Request(`https://www.ai-automation-station.com${path}`));
  const watch = await request('/watch/geKngm3sg3w');
  assert.equal(watch.status, 200);
  assert.match(await watch.text(), /youtube-nocookie.com\/embed\/geKngm3sg3w/);
  assert.equal((await request('/api/videos?video=geKngm3sg3w')).status, 200);
  for (const path of ['/watch/nope', '/watch/xxxxxxxxxxx', '/watch/lbBZ7uLJwbM', '/watch/TuVL2x6IfDk']) assert.equal((await request(path)).status, 404, path);
  const archive = await (await request('/videos')).text();
  assert.match(archive, /href="\/watch\/geKngm3sg3w"/);
  assert.match(archive, /href="https:\/\/www.youtube.com\/watch\?v=lbBZ7uLJwbM"/);
  assert.doesNotMatch(archive, /TuVL2x6IfDk/);
  const sitemap = await request('/video-sitemap.xml');
  assert.match(sitemap.headers.get('content-type'), /application\/xml/);
  assert.equal(await sitemap.text(), await (await request('/api/videos?sitemap=videos')).text());
  const head = await HEAD(new Request('https://www.ai-automation-station.com/watch/geKngm3sg3w', { method: 'HEAD' }));
  assert.equal(head.status, 200);
  assert.equal(await head.text(), '');
  assert.equal(requests, 2, 'cached metadata avoids repeat YouTube requests');
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
  const head = await HEAD(new Request('https://www.ai-automation-station.com/videos/abc', { method: 'HEAD' }));
  assert.equal(head.status, 404);
  assert.equal(await head.text(), '');
});
