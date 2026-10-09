import assert from 'node:assert/strict';
import test from 'node:test';

const cache = 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400';
const playlist = { items: [{ snippet: { resourceId: { videoId: 'aaaaaaaaaaa' }, title: 'A build', publishedAt: '2026-10-05T12:37:47Z', description: 'Build an agent.' } }] };
const details = { items: [{ id: 'aaaaaaaaaaa', statistics: { viewCount: '9191' }, contentDetails: { duration: 'PT12M4S' }, status: { embeddable: true } }] };
const channel = { items: [{ statistics: { subscriberCount: '5120', viewCount: '498055', videoCount: '336' } }] };
const feed = {
  videos: [{ id: 'aaaaaaaaaaa', title: 'A build', published: '2026-10-05T12:37:47Z', views: 9191, duration: '12:04', summary: 'Build an agent.', embeddable: true }],
  channel: { subscribers: 5120, views: 498055, videos: 336 },
};
const upstream = input => Response.json(new URL(input).pathname.endsWith('/playlistItems') ? playlist : new URL(input).pathname.endsWith('/channels') ? channel : details);
const rss = '<feed><entry><yt:videoId>aaaaaaaaaaa</yt:videoId><title>A build</title><published>2026-10-05T12:37:47Z</published><media:description>Build an agent.</media:description><media:statistics views="9191"/></entry></feed>';
const rssFeed = { videos: [{ id: 'aaaaaaaaaaa', title: 'A build', published: '2026-10-05T12:37:47Z', views: 9191, summary: 'Build an agent.' }], channel: null };

function hangUntilAbort(signal) {
  signal.throwIfAborted();
  return new Promise((resolve, reject) => signal.addEventListener('abort', () => reject(signal.reason), { once: true }));
}

async function setup(t, key = 'test-only') {
  const originalKey = process.env.YOUTUBE_API_KEY;
  if (key) process.env.YOUTUBE_API_KEY = key;
  else delete process.env.YOUTUBE_API_KEY;
  t.after(() => { if (originalKey === undefined) delete process.env.YOUTUBE_API_KEY; else process.env.YOUTUBE_API_KEY = originalKey; });
  return import(`../api/youtube.js?test=${encodeURIComponent(t.name)}`);
}

test('concurrent YouTube GETs share one refresh and preserve the success JSON and headers', async t => {
  const { GET } = await setup(t);
  let release;
  const gate = new Promise(resolve => { release = resolve; });
  t.mock.method(AbortSignal, 'timeout');
  t.mock.method(globalThis, 'fetch', async (input, { signal }) => {
    assert.ok(signal instanceof AbortSignal);
    await gate;
    return upstream(input);
  });
  const requests = [GET(), GET(), GET()];
  assert.equal(globalThis.fetch.mock.callCount(), 2, 'one playlist call and one channel call start');
  release();
  for (const response of await Promise.all(requests)) {
    assert.equal(response.status, 200);
    assert.equal(response.headers.get('Cache-Control'), cache);
    assert.deepEqual(await response.json(), feed);
  }
  assert.deepEqual(await (await GET()).json(), feed);
  assert.equal(globalThis.fetch.mock.callCount(), 3, 'one metadata call completes the shared refresh');
  assert.deepEqual(AbortSignal.timeout.mock.calls.map(call => call.arguments), [[8000], [8000], [8000]]);
  const signals = globalThis.fetch.mock.calls.map(call => call.arguments[1].signal);
  assert.equal(new Set(signals).size, 3, 'each API request has its own timeout');
});

test('a channel timeout leaves the details request live and preserves video metadata', async t => {
  const { GET } = await setup(t);
  const controllers = [];
  t.mock.method(AbortSignal, 'timeout', () => {
    const controller = new AbortController();
    controllers.push(controller);
    return controller.signal;
  });
  let detailsStartedLive = false;
  t.mock.method(globalThis, 'fetch', async (input, { signal }) => {
    const path = new URL(input).pathname;
    if (path.endsWith('/channels')) return hangUntilAbort(signal);
    if (path.endsWith('/videos')) detailsStartedLive = !signal.aborted;
    signal.throwIfAborted();
    return upstream(input);
  });
  const request = GET();
  assert.equal(globalThis.fetch.mock.callCount(), 2);
  controllers[1].abort(new DOMException('timed out', 'TimeoutError'));
  const response = await request;
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('Cache-Control'), cache);
  assert.ok(detailsStartedLive, 'details are fetched after the channel timeout with a live signal');
  assert.deepEqual(await response.json(), { ...feed, channel: null });
  assert.deepEqual(AbortSignal.timeout.mock.calls.map(call => call.arguments), [[8000], [8000], [8000]]);
  const signals = globalThis.fetch.mock.calls.map(call => call.arguments[1].signal);
  assert.equal(new Set(signals).size, 3);
  assert.deepEqual(await (await GET()).json(), { ...feed, channel: null });
  assert.equal(globalThis.fetch.mock.callCount(), 3, 'the memo retains the video metadata');
});

test('API timeouts allow the RSS fallback to start live and succeed', async t => {
  const { GET } = await setup(t);
  t.mock.method(AbortSignal, 'timeout', milliseconds => {
    const controller = new AbortController();
    if (milliseconds === 8000) queueMicrotask(() => controller.abort(new DOMException('timed out', 'TimeoutError')));
    return controller.signal;
  });
  let rssStartedLive = false;
  t.mock.method(globalThis, 'fetch', async (input, { signal }) => {
    if (new URL(input).hostname === 'www.googleapis.com') return hangUntilAbort(signal);
    rssStartedLive = !signal.aborted;
    signal.throwIfAborted();
    return new Response(rss);
  });
  const response = await GET();
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('Cache-Control'), cache);
  assert.ok(rssStartedLive, 'RSS is contacted with a live signal after the API times out');
  assert.deepEqual(await response.json(), rssFeed);
  assert.deepEqual(AbortSignal.timeout.mock.calls.map(call => call.arguments), [[8000], [8000], [5000]]);
  const signals = globalThis.fetch.mock.calls.map(call => call.arguments[1].signal);
  assert.equal(new Set(signals).size, 3);
  assert.deepEqual(await (await GET()).json(), rssFeed);
  assert.equal(globalThis.fetch.mock.callCount(), 3, 'the successful fallback is memoized');
});

test('failed YouTube refreshes retain the 502 for five minutes before retrying', async t => {
  const { GET } = await setup(t);
  let now = 1000000000000;
  t.mock.method(Date, 'now', () => now);
  t.mock.method(globalThis, 'fetch', async () => new Response(null, { status: 503 }));
  const failure = 'YouTube feed unavailable';
  for (const response of await Promise.all([GET(), GET()])) {
    assert.equal(response.status, 502);
    assert.equal(response.headers.get('Cache-Control'), 'no-store');
    assert.equal((await response.json()).error, failure);
  }
  assert.equal(globalThis.fetch.mock.callCount(), 6);
  now += 299999;
  const response = await GET();
  assert.equal(response.status, 502);
  assert.equal((await response.json()).error, failure);
  assert.equal(globalThis.fetch.mock.callCount(), 6, 'the cooldown prevents another upstream call');
  now++;
  assert.equal((await GET()).status, 502);
  assert.equal(globalThis.fetch.mock.callCount(), 12, 'upstream retries resume after five minutes');
});

test('expired YouTube memos share a failed refresh and serve stale JSON throughout the cooldown', async t => {
  const { GET } = await setup(t);
  let now = 1000000000000;
  t.mock.method(Date, 'now', () => now);
  t.mock.method(globalThis, 'fetch', async input => upstream(input));
  assert.deepEqual(await (await GET()).json(), feed);
  now += 86400000;
  let release;
  const gate = new Promise(resolve => { release = resolve; });
  t.mock.method(globalThis, 'fetch', async () => { await gate; return new Response(null, { status: 503 }); });
  const requests = [GET(), GET()];
  assert.equal(globalThis.fetch.mock.callCount(), 2);
  release();
  for (const response of await Promise.all(requests)) {
    assert.equal(response.status, 200);
    assert.equal(response.headers.get('Cache-Control'), cache);
    assert.deepEqual(await response.json(), feed);
  }
  assert.equal(globalThis.fetch.mock.callCount(), 6);
  now += 299999;
  assert.deepEqual(await (await GET()).json(), feed);
  assert.equal(globalThis.fetch.mock.callCount(), 6, 'stale requests do not bypass the cooldown');
});

test('RSS retries have separate five-second timeouts and preserve the RSS success JSON', async t => {
  const { GET } = await setup(t, null);
  let attempts = 0;
  t.mock.method(AbortSignal, 'timeout');
  t.mock.method(globalThis, 'fetch', async (input, { signal }) => {
    assert.ok(signal instanceof AbortSignal);
    signal.throwIfAborted();
    return ++attempts < 4 ? new Response(null, { status: 500 }) : new Response(rss);
  });
  const response = await GET();
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('Cache-Control'), cache);
  assert.deepEqual(await response.json(), rssFeed);
  assert.equal(attempts, 4);
  assert.deepEqual(AbortSignal.timeout.mock.calls.map(call => call.arguments), [[5000], [5000], [5000], [5000]]);
  const signals = globalThis.fetch.mock.calls.map(call => call.arguments[1].signal);
  assert.equal(new Set(signals).size, 4, 'each RSS attempt has its own timeout');
});

test('an aborted YouTube refresh settles and enters the failure cooldown', async t => {
  const { GET } = await setup(t);
  t.mock.method(AbortSignal, 'timeout', () => {
    const controller = new AbortController();
    queueMicrotask(() => controller.abort(new DOMException('timed out', 'TimeoutError')));
    return controller.signal;
  });
  const startedLive = [];
  t.mock.method(globalThis, 'fetch', async (input, { signal }) => {
    startedLive.push(!signal.aborted);
    return hangUntilAbort(signal);
  });
  const requests = [GET(), GET()];
  for (const response of await Promise.all(requests)) {
    assert.equal(response.status, 502);
    assert.equal((await response.json()).error, 'YouTube feed unavailable');
  }
  assert.equal(globalThis.fetch.mock.callCount(), 6);
  assert.deepEqual(startedLive, [true, true, true, true, true, true]);
  assert.deepEqual(AbortSignal.timeout.mock.calls.map(call => call.arguments), [[8000], [8000], [5000], [5000], [5000], [5000]]);
  const signals = globalThis.fetch.mock.calls.map(call => call.arguments[1].signal);
  assert.equal(new Set(signals).size, 6);
  assert.equal((await GET()).status, 502);
  assert.equal(globalThis.fetch.mock.callCount(), 6);
});
