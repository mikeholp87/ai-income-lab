import assert from 'node:assert/strict';
import test from 'node:test';
import { fetchUploads, pageCount, parseUploads, renderArchive, renderWatch, renderVideoSitemap, renderPageSitemap } from './archive.js';
import { uploads } from './uploads-snapshot.js';
import { watchNotes } from './watch-notes.js';
import { videoNotes } from './video-notes.js';
import { durationSeconds } from './youtube.js';
import { GET, HEAD } from '../api/videos.js';
import { videoOffer } from './video-offer.js';

const item = (id, title, published, privacyStatus = 'public') => ({ snippet: { resourceId: { videoId: id }, title, publishedAt: published, description: 'Join\nhttps://example.com\n\nBuild an agent.' }, status: { privacyStatus }, contentDetails: { videoPublishedAt: published } });

test('video next steps name relevant resources without hiding membership access limits', () => {
  const examples = [
    ['Automate AI avatar videos with n8n', /Avatar Video Course/, /Premium and VIP/],
    ['Build a VAPI voice agent', /VAPI/, /level 4 on Standard; immediate access/],
    ['Build with n8n', /Template Library/, /included with VIP/],
    ['Make.com automation tutorial', /Beginner’s Automation Course/, /level 2 on Standard; immediate access/],
    ['Codex on Linux', /coding tutorials/, /course access/],
    ['Claude Opus 5.5 Is Better And 40% Cheaper!', /coding tutorials/, /course access/],
    ['New model review', /AI Income Lab/, /starts at \$29/],
  ];
  for (const [title, resource, access] of examples) {
    const offer = videoOffer(title);
    assert.match(offer.detail, resource);
    assert.match(offer.access, access);
    const html = renderWatch({ id: 'geKngm3sg3w', title, published: '2026-07-08T00:00:00Z', summary: '' });
    assert.match(html, /href="https:\/\/www.skool.com\/ai-automation-station-7346\/plans" data-placement="watch_video" data-video-id="geKngm3sg3w"/);
    assert.ok(html.indexOf('id="video-next-step"') > html.indexOf('</iframe>'));
  }
});

test('keeps public uploads, newest first, across pages', () => {
  const pages = [{ items: [item('old', 'Old', '2025-12-31T10:00:00Z'), item('gone', 'Private video', '2026-03-01T10:00:00Z', 'private')] }, { items: [item('new', 'New', '2026-10-05T12:37:47Z')] }];
  assert.deepEqual(parseUploads(pages).map(video => video.id), ['new', 'old']);
  assert.equal(parseUploads(pages)[0].summary, 'Build an agent.');
  assert.deepEqual(parseUploads(pages)[0].chapters, []);
});

test('watch pages add chapters, length, views, related builds and breadcrumbs', () => {
  const video = { id: 'aaaaaaaaaaa', title: 'How to Use 9Router: Setup & Fallbacks', published: '2026-07-08T00:00:00Z', embeddable: true, duration: 'PT11M15S', views: 23638,
    summary: 'Learn how to install 9Router, connect AI providers, and configure fallback routing to manage model access and costs. Follow the setup, then check token usage in the dashboard.',
    chapters: [{ seconds: 0, label: 'Intro' }, { seconds: 98, label: 'Providers' }, { seconds: 400, label: 'Fallbacks' }] };
  const others = [
    { id: 'tzSGF7gu6EE', title: '9Router Cost Tracking', published: '2026-07-09T00:00:00Z', embeddable: true },
    { id: 'Ip8KBwDixJs', title: 'GrokBot Chief Of Staff', published: '2026-10-05T00:00:00Z', embeddable: true },
    { id: 'lbBZ7uLJwbM', title: '9Router blocked embed', published: '2026-10-06T00:00:00Z', embeddable: false },
  ];
  const html = renderWatch(video, { videos: [video, ...others], start: 98 });
  const [schema, breadcrumbs] = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(match => JSON.parse(match[1]));
  assert.equal(schema.duration, 'PT11M15S');
  assert.equal(schema.interactionStatistic.userInteractionCount, 23638);
  assert.deepEqual(schema.hasPart.map(clip => [clip.startOffset, clip.endOffset]), [[0, 98], [98, 400], [400, 675]]);
  assert.equal(schema.hasPart[1].url, 'https://www.ai-automation-station.com/watch/aaaaaaaaaaa?t=98');
  assert.equal(schema.author['@id'], 'https://www.ai-automation-station.com/#mike');
  assert.deepEqual(breadcrumbs.itemListElement.map(item => item.name), ['Home', 'Videos', video.title]);
  assert.match(html, /embed\/aaaaaaaaaaa\?start=98"/);
  assert.match(html, /<a href="#t=98">1:38<\/a> Providers/);
  assert.match(html, /<header><a href="\/">AI Automation Station<\/a><a href="\/guides.html">Guides<\/a><a href="\/videos">All videos<\/a><\/header>/);
  assert.match(html, /11:15 · 23,638 views/);
  assert.match(html, /href="\/guides\/first-api-request.html"/);
  // The shared "9router" ranks first; a video that blocks embedding is never linked.
  assert.match(html, /More builds<\/h2>\n<ul class="related"><li><a href="\/watch\/tzSGF7gu6EE">/);
  assert.doesNotMatch(html, /lbBZ7uLJwbM/);
  const description = html.match(/<meta name="description" content="([^"]*)"/)[1];
  assert.ok(description.length <= 160 && description.endsWith('costs.'), description);
  assert.match(renderVideoSitemap([video]), /<video:player_loc>[^<]+<\/video:player_loc>\n<video:duration>675<\/video:duration>\n<video:publication_date>/);
});

test('chapter links are fragments, while key-moment clips keep their ?t= URLs', () => {
  const video = { id: 'aaaaaaaaaaa', title: 'Chapters', published: '2026-07-08T00:00:00Z', duration: 'PT11M15S',
    chapters: [{ seconds: 0, label: 'Intro' }, { seconds: 98, label: 'Providers' }, { seconds: 400, label: 'Fallbacks' }] };
  for (const start of [0, 98]) {
    const html = renderWatch(video, { start });
    const schema = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
    assert.deepEqual(schema.hasPart.map(clip => clip.url), [0, 98, 400].map(seconds => `https://www.ai-automation-station.com/watch/aaaaaaaaaaa?t=${seconds}`));
    assert.doesNotMatch(html, /href="[^"]*\/watch\/[^"]*\?t=/);
    assert.deepEqual([...html.matchAll(/<ol class="chapters">(.*?)<\/ol>/gs)].flatMap(([, list]) => [...list.matchAll(/href="([^"]*)"/g)].map(match => match[1])), ['#t=0', '#t=98', '#t=400']);
    // The inline handler re-cues the nocookie player; it must parse and not close its own script tag early.
    const script = html.match(/<script>(.*?)<\/script>/s)[1];
    assert.doesNotThrow(() => new Function(script));
    assert.match(script, /searchParams\.set\('start'/);
  }
});

test('watch pages and video sitemap safely describe the same visible video', () => {
  const video = { id: 'aaaaaaaaaaa', title: 'Keys & <API>', summary: '</script><script>alert(1)</script>', published: '2026-09-01T00:00:00Z', embeddable: true };
  const html = renderWatch(video);
  const schema = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
  assert.equal(schema.name, video.title);
  assert.equal(schema.description, video.summary);
  assert.equal(schema.uploadDate, video.published);
  assert.match(html, new RegExp(`src="${schema.embedUrl}"`));
  assert.match(html, /<link rel="canonical" href="https:\/\/www\.ai-automation-station\.com\/watch\/aaaaaaaaaaa">/);
  assert.equal((html.match(/<h1>/g) ?? []).length, 1);
  assert.equal((html.match(/<iframe /g) ?? []).length, 1);
  assert.doesNotMatch(html, /<script>alert|loading="lazy"/);
  assert.match(html, /<script type="module" src="\/assets\/reading.js"><\/script>/);
  assert.match(html, /&lt;\/script&gt;/);
  const sitemap = renderVideoSitemap([video, { ...video, id: 'lbBZ7uLJwbM', embeddable: false }]);
  assert.match(sitemap, /<video:title>Keys &amp; &lt;API&gt;<\/video:title>/);
  assert.ok(sitemap.includes(`<video:player_loc>${schema.embedUrl}</video:player_loc>`));
  assert.ok(sitemap.includes(`<video:thumbnail_loc>${schema.thumbnailUrl}</video:thumbnail_loc>`));
  assert.doesNotMatch(sitemap, /lbBZ7uLJwbM/);
});

test('archive, watch routes and sitemap share verified public upload metadata', async t => {
  const tomorrow = Date.now() + 86400001;
  t.mock.method(Date, 'now', () => tomorrow);
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
  assert.equal((await request('/watch/nope')).status, 404);
  // Unknown, private or non-embeddable ids go to YouTube (temporary, uncached) instead of a 404.
  for (const id of ['xxxxxxxxxxx', 'lbBZ7uLJwbM', 'TuVL2x6IfDk']) {
    const response = await request(`/watch/${id}`);
    assert.equal(response.status, 302, id);
    assert.equal(response.headers.get('location'), `https://www.youtube.com/watch?v=${id}`);
    assert.equal(response.headers.get('cache-control'), 'no-store');
  }
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

test('an upload newer than the inventory gets its watch page after one early refresh', async t => {
  // Runs after the test above, so the inventory is fresh; 11 minutes later the early-refresh window is open.
  const later = Date.now() + 86400001 + 660000;
  let now = later;
  t.mock.method(Date, 'now', () => now);
  const originalKey = process.env.YOUTUBE_API_KEY;
  process.env.YOUTUBE_API_KEY = 'test-only';
  t.after(() => { if (originalKey === undefined) delete process.env.YOUTUBE_API_KEY; else process.env.YOUTUBE_API_KEY = originalKey; });
  const ids = ['newupload01', 'geKngm3sg3w'];
  let requests = 0;
  t.mock.method(globalThis, 'fetch', async input => {
    requests++;
    if (new URL(input).pathname.endsWith('/playlistItems')) return Response.json({ items: ids.map(id => item(id, `Video ${id}`, '2026-10-09T00:00:00Z')) });
    return Response.json({ items: ids.map(id => ({ id, status: { privacyStatus: 'public', embeddable: true } })) });
  });
  const request = path => GET(new Request(`https://www.ai-automation-station.com${path}`));
  const watch = await request('/watch/newupload01');
  assert.equal(watch.status, 200);
  assert.match(await watch.text(), /youtube-nocookie.com\/embed\/newupload01/);
  assert.equal(requests, 2, 'one early refresh');
  // Within the next 10 minutes another unknown id does not refetch; it goes to YouTube, keeping ?t=.
  now += 60000;
  const unknown = await request('/watch/zzzzzzzzzzz?t=98');
  assert.equal(unknown.status, 302);
  assert.equal(unknown.headers.get('location'), 'https://www.youtube.com/watch?v=zzzzzzzzzzz&t=98s');
  assert.equal(requests, 2, 'early refresh is rate limited');
  const head = await HEAD(new Request('https://www.ai-automation-station.com/watch/zzzzzzzzzzz', { method: 'HEAD' }));
  assert.equal(head.status, 302);
});

test('page sitemap follows inventory growth and preserves core dates', () => {
  const xml = '<urlset><url><loc>https://www.ai-automation-station.com/</loc><lastmod>2026-10-08</lastmod></url><url><loc>https://www.ai-automation-station.com/videos/15</loc></url></urlset>';
  const sitemap = renderPageSitemap(xml, Array(31).fill({}));
  assert.match(sitemap, /<lastmod>2026-10-08<\/lastmod>/);
  assert.match(sitemap, /\/videos<\/loc>/);
  assert.match(sitemap, /\/videos\/3<\/loc>/);
  assert.doesNotMatch(sitemap, /\/videos\/15|\/videos\/1</);
  assert.equal((sitemap.match(/<url>/g) || []).length, 4);
});

test('priority build notes keep corrected summaries consistent across discovery surfaces', () => {
  for (const id of ['geKngm3sg3w', 'lbBZ7uLJwbM', 'TuVL2x6IfDk', '_8qzOkIWMSk', 'G8u1-hKEqig', '5zBHLxXw3tI', '7v_675nO7nM', 'g4BmgmEy_mI']) {
    const video = { id, title: 'A recorded build', summary: 'Outdated promotional summary', published: '2026-07-08T00:00:00Z', embeddable: true };
    const html = renderWatch(video);
    const schema = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
    assert.ok(html.indexOf('id="build-notes"') > html.indexOf('</iframe>'));
    assert.match(html, /href="\/guides\//);
    assert.ok(renderArchive([video]).includes(schema.description));
    assert.ok(renderVideoSitemap([video]).includes(schema.description));
    assert.doesNotMatch(html, /Outdated promotional summary/);
  }
});

test('watch pages show a written companion only where one exists', () => {
  const video = { id: 'vauqktcB6ak', title: 'I Tested Dots vs GrokBot', published: '2026-10-01T00:00:00Z', embeddable: true, summary: 'Which agent is better?' };
  const html = renderWatch(video);
  assert.match(html, /<h2 id="notes">What I tested<\/h2>/);
  assert.match(html, /<th scope="col">Dots<\/th><th scope="col">GrokBot<\/th>/);
  assert.match(html, /<h3>Verdict<\/h3>/);
  assert.ok(html.indexOf('id="notes"') < html.indexOf('id="video-next-step"'));
  assert.doesNotMatch(renderWatch({ ...video, id: 'geKngm3sg3w' }), /id="notes"/);
});

test('guide discovery includes title-only notes and avoids repeated companion links', () => {
  const render = (id, title) => renderWatch({ id, title, published: '2026-10-08T00:00:00Z' });
  assert.match(render('1aG1XbAQj-k', 'Codex workflow'), /href="\/guides\/codex-workflow.html"/);
  assert.match(render('unannotated', 'Make.com tutorial'), /href="\/guides\/make-first-automation.html"/);
  const companion = render('7v_675nO7nM', 'OpenCode desktop');
  assert.equal((companion.match(/href="\/guides\/codex-workflow.html"/g) || []).length, 1);
  assert.match(companion, /<title>Build an Electron habit tracker with OpenCode<\/title>/);
  assert.match(companion, /<link rel="preconnect" href="https:\/\/www.youtube-nocookie.com">/);
  assert.match(companion, /<iframe [^>]*src="https:\/\/www.youtube-nocookie.com\/embed\/7v_675nO7nM"/);
  assert.doesNotMatch(companion, /loading="lazy"/);
});

test('renders year groups and escapes titles', () => {
  const html = renderArchive(parseUploads([{ items: [item('a1', 'Claude <Code> & "n8n"', '2026-10-05T12:37:47Z'), item('b2', 'Older', '2025-06-01T00:00:00Z')] }]));
  assert.match(html, /<h2>2026<\/h2>[\s\S]*<h2>2025<\/h2>/);
  assert.match(html, /Claude &lt;Code&gt; &amp; &quot;n8n&quot;/);
  assert.doesNotMatch(html, /<Code>/);
  assert.match(html, /2 long-form builds/);
  assert.match(html, /<script type="module" src="\/assets\/reading.js"><\/script>/);
  assert.match(html, /href="\/consent.css"/);
  assert.doesNotMatch(html, /class="pager/);
  assert.equal((html.match(/loading="eager"/g) || []).length, 1);
  assert.equal((html.match(/loading="lazy"/g) || []).length, 1);
  assert.match(html, /<picture data-thumbnail><source type="image\/webp" srcset="https:\/\/i.ytimg.com\/vi_webp\/a1\/mqdefault.webp"><img src="https:\/\/i.ytimg.com\/vi\/a1\/mqdefault.jpg"/);
});

test('saved chapter lists produce only valid Clips within video duration', () => {
  for (const video of uploads) {
    const schema = JSON.parse(renderWatch(video).match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
    for (const clip of schema.hasPart || []) {
      assert.ok(clip.startOffset >= 0 && clip.endOffset - clip.startOffset >= 10, video.id);
      assert.ok(clip.endOffset <= durationSeconds(video.duration), video.id);
    }
  }
  const broken = uploads.find(video => video.id === 'oDAKXkIyOHE');
  assert.ok(broken);
  assert.doesNotMatch(renderWatch(broken), /"hasPart"|id="chapters"/);
});

test('priority titles and historical offers stay consistent without renaming recordings', () => {
  for (const id of ['geKngm3sg3w', 'lbBZ7uLJwbM', 'TuVL2x6IfDk', 'vauqktcB6ak', 'Ip8KBwDixJs', 'enKnxKJJFZw', 'dILjZszMZ5o', '1aG1XbAQj-k']) {
    const video = uploads.find(video => video.id === id);
    const notes = watchNotes[id] || videoNotes[id];
    const html = renderWatch({ ...video, summary: 'An obsolete free community promise' });
    const schema = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
    assert.equal(schema.name, video.title);
    assert.equal(schema.description, notes.summary);
    assert.doesNotMatch(html, /An obsolete free community promise/);
    assert.ok(renderArchive([video]).includes(notes.summary));
    assert.ok(renderVideoSitemap([video]).includes(notes.summary));
    if (notes.searchTitle) assert.ok(html.match(/<title>(.*?)<\/title>/)[1].length <= 60);
    if (notes.notice) {
      assert.ok(html.includes(notes.notice));
      assert.match(html, /October 8, 2026|2026-10-08/);
      assert.match(html, /\$29/);
    }
  }
});

test('all upload requests share one cancellation deadline', async t => {
  const controller = new AbortController();
  let calls = 0;
  t.mock.method(globalThis, 'fetch', async (input, { signal }) => {
    assert.equal(signal, controller.signal);
    calls++;
    if (calls === 1) return Response.json({ items: [item('aaaaaaaaaaa', 'Build', '2026-10-08T00:00:00Z')], nextPageToken: 'next' });
    if (calls === 2) return Response.json({ items: [] });
    controller.abort();
    signal.throwIfAborted();
  });
  await assert.rejects(fetchUploads('test-only', controller.signal), { name: 'AbortError' });
  assert.equal(calls, 3);
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
  const list = JSON.parse(last.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
  assert.equal(list['@type'], 'CollectionPage');
  assert.deepEqual(list.mainEntity.itemListElement.map(item => item.position), [31]);
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
