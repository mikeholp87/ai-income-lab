import assert from 'node:assert/strict';
import test from 'node:test';
import { formatDuration, longFormPlaylistId, parseApi, parseChannel, parseChapters, parseFeed, validChapters } from './youtube.js';

const entry = (id, link, title, description) => `<entry><yt:videoId>${id}</yt:videoId><title>${title}</title><link rel="alternate" href="${link}"/><published>2026-10-05T12:37:47+00:00</published><media:group><media:description>${description}</media:description><media:community><media:statistics views="9191"/></media:community></media:group></entry>`;

test('parses long-form uploads and skips Shorts', () => {
  const xml = `<feed><title>Channel</title>${entry('abc', 'https://www.youtube.com/watch?v=abc', 'Q&amp;A: Claude &#39;5.5&#39;', 'Join us\nhttps://example.com\n\nHow to build an agent &amp; ship it.\n\nLinks: https://x.ai')}${entry('def', 'https://www.youtube.com/shorts/def', 'Short #shorts', '')}</feed>`;
  assert.deepEqual(parseFeed(xml), [{ id: 'abc', title: "Q&A: Claude '5.5'", published: '2026-10-05T12:37:47+00:00', views: 9191, summary: 'How to build an agent & ship it.' }]);
});

test('returns an empty list for an empty feed', () => {
  assert.deepEqual(parseFeed('<feed></feed>'), []);
});

test('joins Data API playlist items with view counts, lengths and embedding', () => {
  const playlist = { items: [{ snippet: { resourceId: { videoId: 'abc' }, title: 'Claude & Codex', publishedAt: '2026-10-05T12:37:47Z', description: 'Join\nhttps://example.com\n\nBuild an agent.' } }] };
  const details = { items: [{ id: 'abc', statistics: { viewCount: '9191' }, contentDetails: { duration: 'PT12M4S' }, status: { embeddable: false } }] };
  assert.deepEqual(parseApi(playlist, details), [{ id: 'abc', title: 'Claude & Codex', published: '2026-10-05T12:37:47Z', views: 9191, duration: '12:04', summary: 'Build an agent.', embeddable: false }]);
});

test('reads description chapters only when YouTube would show them', () => {
  const description = 'Intro text.\n\n⌚ Timestamps:\n00:00 - Task Rundown\n01:38 – Speaker Pitch Emails\n1:02:25 Page Speed\n\n#grokbot';
  assert.deepEqual(parseChapters(description), [{ seconds: 0, label: 'Task Rundown' }, { seconds: 98, label: 'Speaker Pitch Emails' }, { seconds: 3745, label: 'Page Speed' }]);
  assert.deepEqual(parseChapters('00:00 Intro\n01:00 Setup'), [], 'fewer than three');
  assert.deepEqual(parseChapters('00:10 Intro\n01:00 Setup\n02:00 Test'), [], 'first chapter not at 0:00');
  assert.deepEqual(parseChapters('00:00 Intro\n02:00 Setup\n01:00 Test'), [], 'out-of-order chapters cannot create negative-length clips');
  assert.deepEqual(parseChapters('00:00 Intro\n00:05 Setup\n01:00 Test'), [], 'chapters need at least ten seconds');
});

test('formats ISO 8601 video lengths', () => {
  assert.equal(formatDuration('PT1H2M3S'), '1:02:03');
  assert.equal(formatDuration('PT45S'), '0:45');
  assert.equal(formatDuration('PT10M'), '10:00');
  assert.equal(formatDuration('P0D'), '');
  assert.equal(formatDuration('PT0S'), '');
  assert.equal(formatDuration(undefined), '');
});

test('validates saved chapters against the recording length', () => {
  const chapters = [{ seconds: 0, label: 'Intro' }, { seconds: 10, label: 'Setup' }, { seconds: 20, label: 'Check' }];
  assert.equal(validChapters(chapters, 30), chapters);
  for (const invalid of [null, [], [null, ...chapters], [...chapters, { seconds: 25, label: 'Short' }], [...chapters, { seconds: 10, label: 'Duplicate' }], [...chapters, { seconds: 30, label: '' }], [...chapters, { seconds: -1, label: 'Negative' }]]) {
    assert.deepEqual(validChapters(invalid, 30), []);
  }
  assert.deepEqual(validChapters(chapters, 29), [], 'last chapter must have ten seconds left');
  assert.deepEqual(validChapters(chapters, 15), [], 'chapters cannot extend beyond the recording');
});

test('reads channel counts and skips hidden subscribers', () => {
  assert.equal(longFormPlaylistId, 'UULF8_eYAfJcUgI5BV3hg9U2cw');
  assert.deepEqual(parseChannel({ items: [{ statistics: { subscriberCount: '5120', viewCount: '498055', videoCount: '336', hiddenSubscriberCount: false } }] }), { subscribers: 5120, views: 498055, videos: 336 });
  assert.equal(parseChannel({ items: [{ statistics: { subscriberCount: '0', viewCount: '9', videoCount: '1', hiddenSubscriberCount: true } }] }).subscribers, undefined);
  assert.equal(parseChannel({ items: [] }), null);
});


test('validates rendered feed data before using it as a snapshot', async () => {
  const { validFeed } = await import('./youtube.js');
  const feed = { videos: [{ id: 'Ip8KBwDixJs', title: 'A build', summary: 'Steps', published: '2026-10-05T12:37:47Z', views: 140 }] };
  assert.equal(validFeed(feed), true);
  assert.equal(validFeed({ videos: [] }), false);
  assert.equal(validFeed({ videos: [null] }), false);
  for (const invalid of [{ id: '../bad' }, { published: 'bad date' }, { views: -1 }, { title: null }, { duration: {} }]) {
    assert.equal(validFeed({ videos: [{ ...feed.videos[0], ...invalid }] }), false);
  }
});

test('feed failures log upstream details and return a generic 502', async t => {
  const { GET } = await import('../api/youtube.js');
  const error = t.mock.method(console, 'error', () => {});
  let attempt = 0;
  t.mock.method(globalThis, 'fetch', async () => {
    if (++attempt % 2) throw new Error('upstream failure detail');
    return new Response('upstream body', { status: 503 });
  });
  const response = await GET();
  assert.equal(response.status, 502);
  assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.deepEqual(await response.json(), { error: 'YouTube feed unavailable' });
  assert.equal(error.mock.callCount(), 1);
  const details = error.mock.calls[0].arguments[1];
  assert.ok(details.includes(503));
  assert.ok(details.some(status => String(status).includes('upstream failure detail')));
});
