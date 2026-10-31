import assert from 'node:assert/strict';
import test from 'node:test';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { fetchUploads, guides, pageCount, parseUploads, renderArchive, renderWatch, renderVideoSitemap, renderPageSitemap, sponsoredVideos } from './archive.js';
import { readdir } from 'node:fs/promises';
import { uploads } from './uploads-snapshot.js';
import { watchNotes } from './watch-notes.js';
import { videoNotes } from './video-notes.js';
import { durationSeconds } from './youtube.js';
import { GET, HEAD } from '../api/videos.js';
import { videoOffer } from './video-offer.js';
import { topicBySlug, topics } from './topics.js';

const item = (id, title, published, privacyStatus = 'public') => ({ snippet: { resourceId: { videoId: id }, title, publishedAt: published, description: 'Join\nhttps://example.com\n\nBuild an agent.' }, status: { privacyStatus }, contentDetails: { videoPublishedAt: published } });

const archiveStyles = await readFile(new URL('../public/archive.css', import.meta.url), 'utf8');

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
    assert.ok(html.indexOf('id="video-next-step"') > html.indexOf('<span class="play"'));
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
  const script = [...html.matchAll(/<script>(.*?)<\/script>/gs)].map(match => match[1]).find(code => code.includes('.chapters'));
  assert.match(script, /!\(event\.ctrlKey\|\|event\.metaKey\|\|event\.shiftKey\|\|event\.altKey\|\|event\.button!==0\)/);
  assert.match(script, /addEventListener\('hashchange',\(\)=>seek\(location\.hash,true\)\)/);
  assert.match(script, /history\.replaceState/);
  assert.doesNotThrow(() => new Function(script));
  // Same header as the guides pages (pinned in guides.test.js), so every reading page shares one brand and nav.
  assert.match(html, /<header class="single-line-header"><a href="\/">AI Income Lab<\/a><nav aria-label="Site"><a href="\/start-here.html">Start here<\/a><a href="\/guides.html">Guides<\/a><a href="\/videos">All videos<\/a><a href="\/search.html">Search<\/a><\/nav><a class="join" href="https:\/\/www.skool.com\/ai-automation-station-7346\/plans" target="_blank" rel="noreferrer" data-placement="watch_header">Join AI Income Lab ↗<\/a><details class="nav-mobile"><summary aria-label="Site menu">Menu<\/summary><nav aria-label="Site menu">/);
  assert.doesNotMatch(html, /header a:first-child/);
  // Video titles use the reading pages' Instrument Sans, not the system font.
  // The title takes the shared page-title style from reading.css.
  assert.match(html, /h1\{text-wrap:balance;overflow-wrap:anywhere;margin:0 0 20px\}/);
  // Same Skool label as the homepage and the archive.
  assert.match(html, /data-placement="watch_video"[^>]*>Join AI Income Lab ↗<\/a>/);
  assert.match(html, /11:15 · 23,638 views/);
  assert.match(html, /href="\/guides\/9router-setup.html"/);
  // The shared "9router" ranks first; a video that blocks embedding is never linked.
  assert.match(html, /You may also like<\/h2>\n<ul class="related"><li><a href="\/watch\/tzSGF7gu6EE"><img src="https:\/\/i\.ytimg\.com\/vi\/tzSGF7gu6EE\/mqdefault\.jpg" alt="" width="320" height="180" loading="lazy" decoding="async"><span>[^<]+<\/span><\/a><\/li>/);
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

test('watch and subscribe actions follow the player before metadata and chapters', () => {
  for (const chapters of [[], [{ seconds: 0, label: 'Intro' }, { seconds: 30, label: 'Build' }, { seconds: 60, label: 'Check' }]]) {
    const html = renderWatch({ id: 'aaaaaaaaaaa', title: 'A build', published: '2026-10-20T00:00:00Z', duration: 'PT2M', chapters });
    const playerEnd = html.indexOf('<span class="play"');
    const action = html.indexOf('data-placement="watch_player"');
    assert.ok(action > playerEnd && action < html.indexOf('<p class="meta">By'), 'the YouTube action immediately follows the player');
    assert.equal((html.match(/>Watch on YouTube ↗<\/a>/g) ?? []).length, 1);
    assert.match(html, /href="https:\/\/www.youtube.com\/watch\?v=aaaaaaaaaaa"[^>]*data-placement="watch_player"/);
    assert.match(html, /href="https:\/\/www.youtube.com\/@ai-automation-station\?sub_confirmation=1"[^>]*data-placement="watch_subscribe"/);
  }
});

test('Runable has a reviewed summary across the watch page, card, schema and sitemap', () => {
  const video = { id: 'qQVAnp4-EpI', title: 'Build An AI-Powered Website Using Runable!', published: '2026-10-20T15:43:31Z', embeddable: true, summary: '' };
  const summary = 'Research, build and refine an AI Growth Audit website in Runable. Covers the project brief, market research and homepage revisions; Stripe and email delivery remain unfinished.';
  const html = renderWatch(video);
  const schema = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
  assert.equal(schema.description, summary);
  assert.ok(html.includes(`<p class="description">${summary}</p>`));
  assert.ok(renderArchive([video]).includes(`<p class="summary">${summary}</p>`));
  assert.ok(renderVideoSitemap([video]).includes(`<video:description>${summary}</video:description>`));
  assert.match(html, /<title>Runable tutorial: build an AI Growth Audit website<\/title>/);
  assert.match(html, /Stripe.*email delivery remain unfinished/);
});

test('watch pages and video sitemap safely describe the same visible video', () => {
  const video = { id: 'aaaaaaaaaaa', title: 'Keys & <API>', summary: '</script><script>alert(1)</script>', published: '2026-09-01T00:00:00Z', embeddable: true };
  const html = renderWatch(video);
  const schema = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
  assert.equal(schema.name, video.title);
  assert.equal(schema.description, video.summary);
  assert.equal(schema.uploadDate, video.published);
  assert.match(html, new RegExp(`<iframe class="player" src="${schema.embedUrl}"`));
  assert.match(html, /<link rel="canonical" href="https:\/\/www\.ai-automation-station\.com\/watch\/aaaaaaaaaaa">/);
  assert.equal((html.match(/<h1>/g) ?? []).length, 1);
  // A real embedded player near the top, so the video is the page's main content.
  assert.equal((html.match(/class="player"/g) ?? []).length, 1);
  assert.match(html, /<iframe class="player" src="https:\/\/www\.youtube-nocookie\.com\/embed\/aaaaaaaaaaa" title="[^"]+"[^>]*allowfullscreen><\/iframe>/);
  assert.doesNotMatch(html, /<iframe class="player"[^>]*loading=/);
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
  // The list was just refreshed: unknown and private ids are not this channel's public videos, so 404 (briefly cached).
  for (const id of ['xxxxxxxxxxx', 'TuVL2x6IfDk']) {
    const response = await request(`/watch/${id}`);
    assert.equal(response.status, 404, id);
    assert.equal(response.headers.get('cache-control'), 'public, max-age=0, s-maxage=600');
  }
  // A public video with embedding off goes to YouTube (temporary, briefly cached).
  const blocked = await request('/watch/lbBZ7uLJwbM');
  assert.equal(blocked.status, 302);
  assert.equal(blocked.headers.get('location'), 'https://www.youtube.com/watch?v=lbBZ7uLJwbM');
  assert.equal(blocked.headers.get('cache-control'), 'public, max-age=0, s-maxage=600');
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

// Each scenario gets a clock two days past the previous one (the first is past the test above, which runs a day ahead),
// so the route's module state (inventory age, refresh gate, retry cooldown) left by earlier tests never matters:
// its first request refreshes the stale inventory at that time.
const day = 86400000;
let epoch = Date.now() + day;
async function earlyRefreshHarness(t, ids) {
  let now = (epoch += 2 * day);
  t.mock.method(Date, 'now', () => now);
  const originalKey = process.env.YOUTUBE_API_KEY;
  process.env.YOUTUBE_API_KEY = 'test-only';
  t.after(() => { if (originalKey === undefined) delete process.env.YOUTUBE_API_KEY; else process.env.YOUTUBE_API_KEY = originalKey; });
  t.mock.method(console, 'error', () => {});
  const state = { failing: false };
  const upstream = t.mock.method(globalThis, 'fetch', async input => {
    if (state.failing) return new Response('', { status: 500 });
    if (new URL(input).pathname.endsWith('/playlistItems')) return Response.json({ items: ids.map(id => item(id, `Video ${id}`, '2026-10-09T00:00:00Z')) });
    return Response.json({ items: ids.map(id => ({ id, status: { privacyStatus: 'public', embeddable: true } })) });
  });
  const request = path => GET(new Request(`https://www.ai-automation-station.com${path}`));
  assert.equal((await request('/videos')).status, 200);
  assert.equal(upstream.mock.callCount(), 2, 'stale inventory refreshes once');
  return { state, request, calls: () => upstream.mock.callCount(), advance: ms => { now += ms; } };
}

test('an upload newer than the inventory gets its watch page after one early refresh', async t => {
  const ids = ['geKngm3sg3w'];
  const { request, calls, advance } = await earlyRefreshHarness(t, ids);
  ids.push('newupload01');
  advance(660000);
  const watch = await request('/watch/newupload01');
  assert.equal(watch.status, 200);
  assert.match(await watch.text(), /youtube-nocookie.com\/embed\/newupload01/);
  assert.equal(calls(), 4, 'one early refresh');
});

test('an unknown id after a successful refresh is a briefly cached 404, and repeats do not refetch', async t => {
  const { request, calls, advance } = await earlyRefreshHarness(t, ['geKngm3sg3w']);
  advance(660000);
  const unknown = await request('/watch/zzzzzzzzzzz?t=98');
  assert.equal(unknown.status, 404);
  assert.equal(unknown.headers.get('cache-control'), 'public, max-age=0, s-maxage=600');
  assert.equal(calls(), 4, 'one early refresh');
  advance(60000);
  assert.equal((await request('/watch/yyyyyyyyyyy')).status, 404);
  assert.equal((await request('/watch/zzzzzzzzzzz')).status, 404);
  const head = await HEAD(new Request('https://www.ai-automation-station.com/watch/zzzzzzzzzzz', { method: 'HEAD' }));
  assert.equal(head.status, 404);
  assert.equal(calls(), 4, 'no further refresh within 10 minutes');
  advance(600000);
  assert.equal((await request('/watch/xxxxxxxxxxx')).status, 404);
  assert.equal(calls(), 6, 'the gate reopens after 10 minutes');
});

test('an unknown id goes to YouTube, briefly cached, when no refresh is possible', async t => {
  const { state, request, calls, advance } = await earlyRefreshHarness(t, ['geKngm3sg3w']);
  advance(660000);
  state.failing = true;
  const unknown = await request('/watch/zzzzzzzzzzz?t=98');
  assert.equal(unknown.status, 302);
  assert.equal(unknown.headers.get('location'), 'https://www.youtube.com/watch?v=zzzzzzzzzzz&t=98s');
  assert.equal(unknown.headers.get('cache-control'), 'public, max-age=0, s-maxage=600');
  assert.equal(calls(), 3, 'the failed early refresh stops at the first request');
  advance(60000);
  const again = await request('/watch/yyyyyyyyyyy?t=abc');
  assert.equal(again.status, 302);
  assert.equal(again.headers.get('location'), 'https://www.youtube.com/watch?v=yyyyyyyyyyy');
  const head = await HEAD(new Request('https://www.ai-automation-station.com/watch/zzzzzzzzzzz', { method: 'HEAD' }));
  assert.equal(head.status, 302);
  assert.equal(calls(), 3, 'backing off: no further refresh');
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
  for (const id of ['geKngm3sg3w', 'lbBZ7uLJwbM', 'TuVL2x6IfDk', '_8qzOkIWMSk', 'G8u1-hKEqig', '5zBHLxXw3tI', '7v_675nO7nM', 'g4BmgmEy_mI', 'Lifl4PC2_3M', '9kHdIiobKMA', 'Ax-v4H9xv50', 'MYoA3___zYU', 'ys5tJuTFCEo']) {
    const video = { id, title: 'A recorded build', summary: 'Outdated promotional summary', published: '2026-07-08T00:00:00Z', embeddable: true };
    const html = renderWatch(video);
    const schema = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
    assert.ok(html.indexOf('id="build-notes"') > html.indexOf('<span class="play"'));
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
  assert.match(html, /<title>Dots vs Grok Bot: [^<]+<\/title>/);
  assert.match(html, /<section aria-labelledby="dots-vs-grok-bot-faq">/);
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
  assert.match(companion, /<link rel="preconnect" href="https:\/\/i.ytimg.com">/);
  assert.match(companion, /<iframe class="player" src="https:\/\/www.youtube-nocookie.com\/embed\/7v_675nO7nM"/);
  assert.doesNotMatch(companion, /loading="lazy"/);
});

test('renders year groups and escapes titles', () => {
  const html = renderArchive(parseUploads([{ items: [item('a1', 'Claude <Code> & "n8n"', '2026-10-05T12:37:47Z'), item('b2', 'Older', '2025-06-01T00:00:00Z')] }]));
  assert.match(html, /<h2>2026<\/h2>[\s\S]*<h2>2025<\/h2>/);
  assert.match(html, /Claude &lt;Code&gt; &amp; &quot;n8n&quot;/);
  assert.doesNotMatch(html, /<Code>/);
  assert.match(html, /2 long-form videos/);
  assert.match(html, /<script type="module" src="\/assets\/reading.js"><\/script>/);
  assert.match(html, /href="\/consent.css\?v=[0-9a-f]{8}"/);
  assert.doesNotMatch(html, /class="pager/);
  assert.equal((html.match(/loading="eager"/g) || []).length, 1);
  assert.equal((html.match(/loading="lazy"/g) || []).length, 1);
  assert.match(html, /<picture data-thumbnail><source type="image\/webp" srcset="https:\/\/i.ytimg.com\/vi_webp\/a1\/mqdefault.webp 320w, [^"]+"[^>]*><img src="https:\/\/i.ytimg.com\/vi\/a1\/mqdefault.jpg"/);
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
  // Video cards only; the join card's benefit list also uses <li>.
  const cards = html => html.match(/<li><a /g).length;
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

test('archive cards show sharp thumbnails, duration and views', () => {
  const video = { id: 'a1b2c3d4e5f', title: 'Build', published: '2026-10-20T00:00:00Z', summary: 'Build an agent.', duration: 'PT18M3S', views: 1234, embeddable: true };
  const html = renderArchive([video]);
  assert.match(html, /srcset="https:\/\/i.ytimg.com\/vi_webp\/a1b2c3d4e5f\/mqdefault.webp 320w, https:\/\/i.ytimg.com\/vi_webp\/a1b2c3d4e5f\/hqdefault.webp 480w" sizes="/);
  assert.match(html, /<img src="https:\/\/i.ytimg.com\/vi\/a1b2c3d4e5f\/mqdefault.jpg" srcset="https:\/\/i.ytimg.com\/vi\/a1b2c3d4e5f\/mqdefault.jpg 320w, https:\/\/i.ytimg.com\/vi\/a1b2c3d4e5f\/hqdefault.jpg 480w" sizes="/);
  assert.match(html, /<span class="duration">18:03<\/span>/);
  assert.match(html, /<p class="meta"><time datetime="2026-10-20T00:00:00Z">Oct 20, 2026<\/time><span>1,234 views<\/span><\/p>/);
  assert.match(html, /<p class="summary">Build an agent.<\/p>/);
  const bare = renderArchive([{ id: 'a1b2c3d4e5f', title: 'Build', published: '2026-10-20T00:00:00Z', summary: '' }]);
  assert.doesNotMatch(bare, /class="duration"|views<\/span>/);
});

test('archive type and grid match the homepage and keep cards even', () => {
  const html = renderArchive([{ id: 'a1b2c3d4e5f', title: 'Build', published: '2026-10-20T00:00:00Z', summary: 'Build an agent.' }]);
  assert.ok(existsSync(new URL('../public/fonts/instrument-sans.woff2', import.meta.url)));
  // Preloaded fonts with optional display: a late font keeps the fallback instead of re-wrapping the topic row.
  assert.match(archiveStyles, /@font-face \{ font-family: 'Instrument Sans'; font-weight: 400 700; font-display: optional; src: url\('\/fonts\/instrument-sans.woff2'\) format\('woff2'\); \}/);
  assert.doesNotMatch(archiveStyles, /font-display: swap/);
  assert.match(renderArchive(uploads.slice(0, 3)), /<link rel="preload" href="\/fonts\/instrument-sans\.woff2" as="font" type="font\/woff2" crossorigin>/);
  assert.match(archiveStyles, /body \{[^}]*font: 16px\/1\.6 'Instrument Sans', system-ui, sans-serif;/);
  // 340px minimum gives three columns in the 1280px shell, so 15 cards fill five rows.
  assert.match(archiveStyles, /grid-template-columns: repeat\(auto-fill, minmax\(min\(340px, 100%\), 1fr\)\)/);
  assert.match(archiveStyles, /li \.summary \{[^}]*-webkit-line-clamp: 3;[^}]*line-clamp: 3;/);
  assert.doesNotMatch(html, / style="/);
  assert.match(html, /<p class="start"><a href="\/start-here.html">New here\? Choose your first build<\/a> or <a href="\/guides.html">read the free guides<\/a><\/p>/);
});

test('archives up to 20 pages link every page so each is one hop from any other', () => {
  const videos = Array.from({ length: 225 }, (_, index) => ({ id: `v${index}`, title: `Video ${index}`, published: new Date(Date.UTC(2026, 9, 1) - index * 86400000).toISOString(), summary: '' }));
  const pages = page => renderArchive(videos, page).match(/<nav class="pager[^>]*>(.*?)<\/nav>/)[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  assert.equal(pages(1), '1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 Older →');
  assert.equal(pages(8), '← Newer 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 Older →');
  assert.match(renderArchive(videos, 8), /<span aria-current="page">8<\/span>/);
});

test('longer archives show first, last and nearby pages only', () => {
  const videos = Array.from({ length: 450 }, (_, index) => ({ id: `v${index}`, title: `Video ${index}`, published: new Date(Date.UTC(2026, 9, 1) - index * 86400000).toISOString(), summary: '' }));
  const pages = page => renderArchive(videos, page).match(/<nav class="pager[^>]*>(.*?)<\/nav>/)[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  assert.equal(pages(1), '1 2 … 30 Older →');
  assert.equal(pages(3), '← Newer 1 2 3 4 … 30 Older →');
  assert.equal(pages(4), '← Newer 1 2 3 4 5 … 30 Older →');
  assert.equal(pages(15), '← Newer 1 … 14 15 16 … 30 Older →');
  assert.equal(pages(30), '← Newer 1 … 29 30');
  // Phones: the arrows don't fit beside 44px targets, and the neighbouring pages are always listed.
  assert.match(archiveStyles, /@media \(max-width: 640px\) \{ \.pager a\[rel\] \{ display: none; \} \}/);
});

test('the archive links the reading pages and offers the community', () => {
  const html = renderArchive([{ id: 'a1b2c3d4e5f', title: 'Build', published: '2026-10-20T00:00:00Z', summary: '' }]);
  assert.match(html, /<nav class="site-nav" aria-label="Site"><a href="\/start-here.html">Start here<\/a><a href="\/guides.html">Guides<\/a><a href="\/videos" aria-current="page">All videos<\/a><a href="\/search.html">Search<\/a><\/nav>/);
  assert.match(html, /<a class="join" href="https:\/\/www.skool.com\/ai-automation-station-7346\/plans" target="_blank" rel="noreferrer" data-placement="video_archive_header">Join AI Income Lab ↗<\/a>/);
  assert.match(html, /<aside class="cta" aria-labelledby="join-lab"><h2 id="join-lab">Build the next one with AI Income Lab<\/h2><ul class="cta-list">(<li>[^<]+<\/li>){3}<\/ul><div class="cta-action"><a class="join" [^>]*data-placement="video_archive">Join AI Income Lab ↗<\/a><span>From \$29\/month\. Cancel anytime\.[^<]*<\/span><\/div><\/aside>/);
  assert.ok(html.indexOf('class="cta"') > html.lastIndexOf('<li><a '));
  assert.doesNotMatch(html, /builds something real with it/);
});

test('reading-page cookie bar sits on one centred row and Privacy choices matches the footer', async () => {
  const css = await readFile(new URL('../public/consent.css', import.meta.url), 'utf8');
  assert.match(css, /\.reading-consent\{position:sticky;bottom:0;z-index:10;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:12px 24px;padding:10px 24px;/);
  assert.match(css, /\.reading-consent p\{margin:0\}/);
  assert.match(css, /\.reading-consent>div\{display:flex;gap:8px\}/);
  // Phones: same 16px side gutter as the page content.
  assert.match(css, /@media\(max-width:640px\)\{\.reading-consent\{[^}]*padding:8px 16px;/);
  assert.match(archiveStyles, /footer button \{ min-height: 44px; color: inherit; text-decoration: none; \}/);
});

test('topic pages list only matching videos on one page with their own canonical', () => {
  const videos = [
    { id: 'aaaaaaaaaaa', title: 'Claude Code hooks tutorial', published: '2026-10-02T00:00:00Z', summary: '', embeddable: true },
    { id: 'bbbbbbbbbbb', title: 'n8n agent build', published: '2026-10-01T00:00:00Z', summary: '', embeddable: true },
  ];
  const html = renderArchive(videos, 1, topicBySlug('claude-code'));
  assert.match(html, /<title>Claude Code tutorials: builds, skills and workflows \| Mike Holp<\/title>/);
  assert.match(html, /<link rel="canonical" href="https:\/\/www\.ai-automation-station\.com\/videos\/claude-code">/);
  assert.match(html, /<meta property="og:title" content="Claude Code tutorials and builds">/);
  assert.match(html, /<h1>Claude Code tutorials and builds<\/h1><p>1 videos?, newest first\. Builds, skills and workflows[^<]*<\/p><p>Each video here uses Claude Code/);
  assert.match(html, /aaaaaaaaaaa/);
  assert.doesNotMatch(html, /bbbbbbbbbbb/);
  assert.doesNotMatch(html, /class="pager/);
  assert.match(html, /<a href="\/videos\/claude-code" aria-current="page">Claude Code<\/a>/);
  // The header's All videos link is not the current page on a topic page.
  assert.match(html, /<a href="\/videos">All videos<\/a><a href="\/search.html">Search<\/a><\/nav><a class="join"/);
  const schema = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
  assert.equal(schema.name, 'Claude Code tutorials and builds');
  assert.equal(schema.mainEntity.itemListElement.length, 1);
  // Phones show the pills as one swipeable row; bring the current pill into view without moving the page.
  const script = html.match(/<\/nav>\n<script>(.*?)<\/script>/)[1];
  assert.match(script, /\.topics \[aria-current\]/);
  assert.match(script, /scrollLeft/);
  assert.doesNotMatch(script, /scrollIntoView/);
  assert.doesNotThrow(() => new Function(script));
});

test('the archive shows a topic row with every topic', () => {
  const html = renderArchive([{ id: 'aaaaaaaaaaa', title: 'Claude Code hooks tutorial', published: '2026-10-02T00:00:00Z', summary: '' }]);
  const row = html.match(/<nav class="topics" aria-label="Video topics">([\s\S]*?)<\/nav>/)[1];
  assert.match(row, /^<a href="\/videos" aria-current="page">All videos<\/a>/);
  assert.equal((row.match(/<a /g) || []).length, topics.length + 1);
  for (const topic of topics) assert.ok(row.includes(`href="/videos/${topic.slug}"`), topic.slug);
});

test('the page sitemap lists topic pages that have videos and drops stale ones', () => {
  const xml = '<urlset><url><loc>https://www.ai-automation-station.com/</loc></url><url><loc>https://www.ai-automation-station.com/videos/old-topic</loc></url></urlset>';
  const sitemap = renderPageSitemap(xml, [{ id: 'aaaaaaaaaaa', title: 'Claude Code hooks tutorial', published: '2026-10-02T00:00:00Z' }]);
  assert.match(sitemap, /<loc>https:\/\/www\.ai-automation-station\.com\/videos\/claude-code<\/loc>/);
  assert.doesNotMatch(sitemap, /\/videos\/n8n<|old-topic/);
});

test('topic pages link the written guides on the same subject', () => {
  const videos = [{ id: 'aaaaaaaaaaa', title: 'Claude Code hooks tutorial', published: '2026-10-02T00:00:00Z', summary: '', embeddable: true }];
  const html = renderArchive(videos, 1, topicBySlug('claude-code'));
  assert.match(html, /<p class="start">Written guides: <a href="\/guides\/claude-code-for-beginners.html">Claude Code tutorial for beginners: install and use it<\/a> and <a href="\/guides\/claude-code-vs-codex.html">Codex vs Claude Code: how I use both and route tasks<\/a><\/p>/);
  assert.match(renderArchive(videos, 1, topicBySlug('codex-opencode')), /Written guides: <a [^>]+>[^<]+<\/a>, <a [^>]+>[^<]+<\/a>, <a [^>]+>[^<]+<\/a>, and <a /);
  assert.doesNotMatch(renderArchive(videos, 1, topicBySlug('new-models')), /Written guide/);
  for (const [slug, guide] of [['n8n', 'self-host-n8n'], ['ai-seo', 'dataforseo-mcp-claude'], ['ai-agents', 'hermes-desktop']]) {
    assert.match(renderArchive(videos, 1, topicBySlug(slug)), new RegExp(`Written guides?: <a href="/guides/${guide}.html">`), slug);
  }
});

test('only videos with the paid promotion box ticked reach the sponsored section', () => {
  const videos = [
    { id: 'aaaaaaaaaaa', title: 'Paid', published: '2026-10-20T00:00:00Z', views: 5, duration: 'PT18M3S', embeddable: true, sponsored: true, chapters: [] },
    { id: 'bbbbbbbbbbb', title: 'Unpaid', published: '2026-10-19T00:00:00Z', views: 9, duration: 'PT1M', embeddable: true, sponsored: false },
  ];
  assert.deepEqual(sponsoredVideos(videos), [{ id: 'aaaaaaaaaaa', title: 'Paid', published: '2026-10-20T00:00:00Z', views: 5, duration: '18:03', embeddable: true }]);
});

test('watch page titles never reuse a written guide title or its lead phrase', async () => {
  const dir = new URL('../public/guides/', import.meta.url);
  const guideTitles = await Promise.all((await readdir(dir)).filter(file => file.endsWith('.html')).map(async file => (await readFile(new URL(file, dir), 'utf8')).match(/<title>(.*?)<\/title>/)[1].replace(/ \| Mike Holp$/, '').replace(/&amp;/g, '&')));
  const lead = title => title.split(':')[0].trim().toLowerCase();
  const guideLeads = new Set(guideTitles.map(lead));
  for (const [id, notes] of [...Object.entries(watchNotes), ...Object.entries(videoNotes)]) {
    if (!notes.searchTitle) continue;
    assert.ok(!guideTitles.some(title => title.toLowerCase() === notes.searchTitle.toLowerCase()), `${id} copies a guide title`);
    assert.ok(!guideLeads.has(lead(notes.searchTitle)), `${id} shares a guide's lead phrase: ${notes.searchTitle}`);
  }
});

test('watch pages sit under their topic hub in the breadcrumb and link to it', () => {
  const video = { id: 'aaaaaaaaaaa', title: 'n8n agent build', published: '2026-10-01T00:00:00Z', summary: 'Build an n8n agent.', embeddable: true };
  const html = renderWatch(video);
  const breadcrumbs = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(match => JSON.parse(match[1])).find(item => item['@type'] === 'BreadcrumbList');
  assert.deepEqual(breadcrumbs.itemListElement.map(item => item.item), ['https://www.ai-automation-station.com/', 'https://www.ai-automation-station.com/videos', 'https://www.ai-automation-station.com/videos/n8n', 'https://www.ai-automation-station.com/watch/aaaaaaaaaaa']);
  assert.match(html, /<a href="\/videos">Videos<\/a> \/ <a href="\/videos\/n8n">n8n<\/a> \/ <span aria-current="page">/);
  assert.match(html, /More on this topic: <a href="\/videos\/n8n">/);
  assert.match(html, /Related guides<\/h2>\n<ul><li><a href="\/guides\/self-host-n8n.html">/);
  assert.match(html, /<form class="notes" data-subscribe data-placement="watch_end">/);
});

test('guide routing keeps specific tools ahead of broad coding-agent matches', () => {
  const route = title => guides.find(([pattern]) => pattern.test(title))?.[1];
  assert.equal(route('This Claude Code Hack Saves Token Usage'), '/guides/claude-code-for-beginners.html');
  assert.equal(route('Codex vs Claude Code: Which Should You Use?'), '/guides/claude-code-vs-codex.html');
  assert.equal(route('Why OpenCode Is Better Than Claude Code'), '/guides/opencode-vs-claude-code.html');
  assert.equal(route('Codex on Linux: Official Desktop App Setup'), '/guides/codex-on-linux.html');
  assert.equal(route('How I Built an AI Phone Agent That Actually Works (VAPI)'), '/guides/vapi-voice-agent-tutorial.html');
  const claudeCode = uploads.filter(video => /claude code/i.test(video.title) && !/codex|open\s?code/i.test(video.title));
  assert.ok(claudeCode.length && claudeCode.every(video => route(video.title) !== '/guides/codex-workflow.html'));
});

test('transcripts open with visible paragraphs and fold the rest away', () => {
  const video = uploads.find(item => item.id === 'TuVL2x6IfDk');
  const html = renderWatch(video);
  const section = html.match(/<section aria-labelledby="transcript">([\s\S]*?)<\/section>/)[1];
  assert.match(section, /<h2 id="transcript">Transcript<\/h2>\n<p>[^<]+<\/p><p>[^<]+<\/p>\n<details class="transcript"><summary>Read the rest of the transcript<\/summary><p>/);
});

test('archive pages carry breadcrumbs and named list items, and the sitemap dates them', () => {
  const videos = [
    { id: 'aaaaaaaaaaa', title: 'Claude Code hooks tutorial', published: '2026-10-02T00:00:00Z', summary: '', embeddable: true },
    { id: 'bbbbbbbbbbb', title: 'n8n agent build', published: '2026-09-01T00:00:00Z', summary: '', embeddable: true },
  ];
  const html = renderArchive(videos, 1, topicBySlug('claude-code'));
  const [collection, breadcrumbs] = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(match => JSON.parse(match[1]));
  assert.equal(collection.mainEntity.itemListElement[0].name, 'Claude Code hooks tutorial');
  assert.deepEqual(breadcrumbs.itemListElement.map(item => item.name), ['Home', 'Videos', 'Claude Code tutorials and builds']);
  assert.match(html, /loading="eager" fetchpriority="high"/);
  for (const topic of topics) {
    assert.ok(topic.title.length >= 50 && topic.title.length <= 65, `${topic.slug}: ${topic.title.length}`);
    assert.ok(topic.about.split(/\s+/).length >= 60, topic.slug);
  }
  const xml = '<urlset>\n  <url><loc>https://www.ai-automation-station.com/</loc><lastmod>2026-09-15</lastmod></url>\n</urlset>';
  const sitemap = renderPageSitemap(xml, videos);
  assert.match(sitemap, /<loc>https:\/\/www\.ai-automation-station\.com\/<\/loc><lastmod>2026-10-02<\/lastmod>/);
  assert.match(sitemap, /<loc>https:\/\/www\.ai-automation-station\.com\/videos<\/loc><lastmod>2026-10-02<\/lastmod>/);
  assert.match(sitemap, /<loc>https:\/\/www\.ai-automation-station\.com\/videos\/n8n<\/loc><lastmod>2026-09-01<\/lastmod>/);
});

test('a new upload reaches /videos within an hour via the cheap newest-upload probe', async t => {
  const ids = ['geKngm3sg3w'];
  const { request, calls, advance } = await earlyRefreshHarness(t, ids);
  ids.unshift('newupload02');
  advance(1800000);
  assert.doesNotMatch(await (await request('/videos')).text(), /newupload02/, 'no probe within the hour');
  assert.equal(calls(), 2);
  advance(1800001);
  assert.match(await (await request('/videos')).text(), /href="\/watch\/newupload02"/);
  assert.equal(calls(), 5, 'one probe plus one full refresh');
  advance(3600001);
  await request('/videos');
  assert.equal(calls(), 6, 'probe finds nothing new, no refresh');
});

test('watch headings drop hype and use sentence case, keeping product names', async () => {
  const { watchHeading } = await import('./watch-title.js');
  for (const [title, heading] of [
    ['Building My Own Video Editor Using REA (It\'s Insane!)', 'Building my own video editor using REA'],
    ['I Tested Meta Muse Wonder - Here\'s What Happened', 'I tested Meta Muse Wonder'],
    ['OpenAI Just Released Dots! Here\'s What You Need To Know', 'OpenAI just released Dots: here\'s what you need to know'],
    ['Give Your Hermes Agent A Memory Upgrade!', 'Give your Hermes Agent a memory upgrade'],
    ['This AI Agent Found $81,000 In Brand Deals!', 'This AI agent found $81,000 in brand deals'],
    ['Connect Fillout to Airtable in 15 Minutes (No Code)', 'Connect Fillout to Airtable in 15 minutes (no code)'],
    ['These 20 GPT-6 Astra Demos Are INSANE!', 'These 20 GPT-6 Astra demos are insane'],
    ['I Built My Own OpusClip for FREE! (Step-by-Step)', 'I built my own OpusClip for free (step-by-step)'],
  ]) assert.equal(watchHeading(title), heading);
});

test('transcript summaries render a build section and valid FAQPage data', async () => {
  const { videoSummaries, listingSummaries } = await import('./video-summaries.js');
  const video = uploads.find(upload => upload.id === 'VE66JDHoS6Y');
  const html = renderWatch(video);
  const brief = videoSummaries[video.id];
  assert.match(html, /<h2 id="build-summary">What this video covers<\/h2>/);
  const faq = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].map(match => JSON.parse(match[1])).find(data => data['@type'] === 'FAQPage');
  assert.equal(faq.mainEntity.length, brief.qa.length);
  assert.ok(faq.mainEntity.every(item => item.name && item.acceptedAnswer.text));
  for (const text of [...Object.values(videoSummaries).flatMap(entry => [entry.summary, entry.whatYouBuild, ...entry.toolsUsed, ...entry.keySteps.map(step => step.step), ...entry.notCovered, ...entry.qa.flatMap(({ q, a }) => [q, a])]), ...Object.values(listingSummaries)]) {
    assert.doesNotMatch(text, /[—;…]/, text);
  }
});

test('videos without any summary get a descriptive fallback', () => {
  const html = renderWatch({ id: 'abcdefghijk', title: 'Test n8n build', published: '2026-10-01T00:00:00Z', duration: 'PT7M52S', summary: '', chapters: [] });
  assert.match(html, /Test n8n build is an 8 minute AI Automation Station video on n8n, published October 1, 2026\./);
});
