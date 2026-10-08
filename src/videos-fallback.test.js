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
});
