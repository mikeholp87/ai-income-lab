import assert from 'node:assert/strict';
import test from 'node:test';
import { uploads } from './uploads-snapshot.js';

const known = uploads[0].id;
const feed = id => `<feed><entry><yt:videoId>${id}</yt:videoId></entry><entry><yt:videoId>${known}</yt:videoId></entry></feed>`;
const call = (GET, token = 'test-secret') => GET(new Request('https://x/api/new-video-check', { headers: token ? { authorization: `Bearer ${token}` } : {} }));

async function setup(t, youtubeXml) {
  const saved = { CRON_SECRET: process.env.CRON_SECRET, DEPLOY_HOOK_URL: process.env.DEPLOY_HOOK_URL };
  process.env.CRON_SECRET = 'test-secret';
  process.env.DEPLOY_HOOK_URL = 'https://hooks.test/deploy';
  t.after(() => { for (const [key, value] of Object.entries(saved)) if (value === undefined) delete process.env[key]; else process.env[key] = value; });
  const hooks = [];
  t.mock.method(globalThis, 'fetch', async (input, init = {}) => {
    if (String(input).startsWith('https://hooks.test/')) { hooks.push(init.method); return new Response('{}', { status: 201 }); }
    return new Response(youtubeXml);
  });
  const { GET } = await import(`../api/new-video-check.js?test=${encodeURIComponent(t.name)}`);
  return { GET, hooks };
}

test('a new upload triggers one rebuild through the deploy hook', async t => {
  const { GET, hooks } = await setup(t, feed('zzzzzzzzzzz'));
  const response = await call(GET);
  assert.equal(response.status, 202);
  assert.deepEqual(await response.json(), { rebuild: true, newest: 'zzzzzzzzzzz' });
  assert.deepEqual(hooks, ['POST']);
});

test('no rebuild when the newest upload is already deployed', async t => {
  const { GET, hooks } = await setup(t, `<feed><entry><yt:videoId>${known}</yt:videoId></entry></feed>`);
  assert.deepEqual(await (await call(GET)).json(), { rebuild: false, newest: known });
  assert.equal(hooks.length, 0);
});

test('calls without the cron secret are refused before anything is fetched', async t => {
  const { GET, hooks } = await setup(t, feed('zzzzzzzzzzz'));
  assert.equal((await call(GET, 'wrong')).status, 401);
  assert.equal((await call(GET, null)).status, 401);
  assert.equal(globalThis.fetch.mock.callCount(), 0);
  assert.equal(hooks.length, 0);
});
