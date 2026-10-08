import assert from 'node:assert/strict';
import test from 'node:test';
import { GET } from '../api/videos.js';
import { uploads, uploadsUpdatedAt } from './uploads-snapshot.js';

// Its own file, so the route's in-memory list starts cold, as on a new serverless instance.
test('serves the build snapshot when YouTube is unreachable on a cold start', async t => {
  t.mock.method(Date, 'now', () => uploadsUpdatedAt + 1);
  const originalKey = process.env.YOUTUBE_API_KEY;
  process.env.YOUTUBE_API_KEY = 'test-only';
  t.after(() => { if (originalKey === undefined) delete process.env.YOUTUBE_API_KEY; else process.env.YOUTUBE_API_KEY = originalKey; });
  t.mock.method(globalThis, 'fetch', async () => { throw new Error('network down'); });
  t.mock.method(console, 'error', () => {});
  const video = uploads.find(upload => upload.embeddable);
  const request = path => GET(new Request(`https://www.ai-automation-station.com${path}`));
  const sitemap = await request('/video-sitemap.xml');
  assert.equal(sitemap.status, 200);
  assert.match(await sitemap.text(), new RegExp(`/watch/${video.id}</loc>`));
  assert.equal(globalThis.fetch.mock.callCount(), 0, 'cold requests serve the snapshot without waiting on YouTube');
  const tomorrow = Date.now() + 86400001;
  t.mock.method(Date, 'now', () => tomorrow);
  const watch = await request(`/watch/${video.id}?t=98`);
  assert.equal(watch.status, 200);
  assert.ok(globalThis.fetch.mock.callCount() > 0, 'refresh fails but the saved inventory still serves the watch page');
  assert.match(await watch.text(), new RegExp(`embed/${video.id}\\?start=98"`));
  assert.doesNotMatch(await (await request(`/watch/${video.id}?t=abc`)).text(), /\?start=/);
  assert.equal(globalThis.fetch.mock.callCount(), 1, 'upstream failure is not retried for every visitor');
  t.mock.method(Date, 'now', () => tomorrow + 300001);
  assert.equal((await request('/video-sitemap.xml')).status, 200);
  assert.equal(globalThis.fetch.mock.callCount(), 2, 'retry resumes after the five-minute cooldown');
});

test('expired snapshots refresh on each cold instance and concurrent requests share work', async t => {
  t.mock.method(Date, 'now', () => uploadsUpdatedAt + 86400001);
  const originalKey = process.env.YOUTUBE_API_KEY;
  process.env.YOUTUBE_API_KEY = 'test-only';
  t.after(() => { if (originalKey === undefined) delete process.env.YOUTUBE_API_KEY; else process.env.YOUTUBE_API_KEY = originalKey; });
  let requests = 0;
  let release;
  const gate = new Promise(resolve => { release = resolve; });
  t.mock.method(globalThis, 'fetch', async input => {
    requests++;
    await gate;
    if (new URL(input).pathname.endsWith('/playlistItems')) return Response.json({ items: [{ snippet: { resourceId: { videoId: 'aaaaaaaaaaa' }, title: 'New build', publishedAt: '2026-10-08T00:00:00Z' }, status: { privacyStatus: 'public' } }] });
    return Response.json({ items: [{ id: 'aaaaaaaaaaa', status: { privacyStatus: 'public', embeddable: true } }] });
  });
  const first = await import('../api/videos.js?cold=first');
  const request = () => new Request('https://www.ai-automation-station.com/watch/aaaaaaaaaaa');
  const concurrent = [first.GET(request()), first.GET(request())];
  assert.equal(requests, 1, 'one shared refresh starts');
  release();
  for (const response of await Promise.all(concurrent)) {
    assert.equal(response.status, 200);
    assert.match(await response.text(), /New build/);
  }
  assert.equal(requests, 2, 'one playlist call and one metadata call');
  const second = await import('../api/videos.js?cold=second');
  assert.equal((await second.GET(request())).status, 200);
  assert.equal(requests, 4, 'another cold instance does not reset the saved fetch timestamp');
});
