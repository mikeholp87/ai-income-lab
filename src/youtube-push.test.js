import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import test from 'node:test';
import { uploads } from './uploads-snapshot.js';
import { feedUrl } from './youtube.js';

const callback = 'https://www.ai-automation-station.com/api/youtube-push';
const atom = id => `<feed xmlns:yt="http://www.youtube.com/xml/schemas/2015"><entry><yt:videoId>${id}</yt:videoId><yt:channelId>UC8_eYAfJcUgI5BV3hg9U2cw</yt:channelId></entry></feed>`;
const sign = (body, secret = 'hub-secret') => `sha1=${createHmac('sha1', secret).update(body).digest('hex')}`;
const push = (POST, body, signature = sign(body)) => POST(new Request(callback, { method: 'POST', body, headers: { 'content-type': 'application/atom+xml', 'x-hub-signature': signature } }));

async function setup(t) {
  const saved = { WEBSUB_SECRET: process.env.WEBSUB_SECRET, DEPLOY_HOOK_URL: process.env.DEPLOY_HOOK_URL };
  process.env.WEBSUB_SECRET = 'hub-secret';
  process.env.DEPLOY_HOOK_URL = 'https://hooks.test/deploy';
  t.after(() => { for (const [key, value] of Object.entries(saved)) if (value === undefined) delete process.env[key]; else process.env[key] = value; });
  const hooks = [];
  t.mock.method(globalThis, 'fetch', async (input, init = {}) => { hooks.push([String(input), init.method]); return new Response('{}', { status: 201 }); });
  return { ...(await import(`../api/youtube-push.js?test=${encodeURIComponent(t.name)}`)), hooks };
}

test('the hub verification echoes the challenge for our channel feed only', async t => {
  const { GET } = await setup(t);
  const verify = (topic, mode = 'subscribe') => GET(new Request(`${callback}?${new URLSearchParams({ 'hub.mode': mode, 'hub.topic': topic, 'hub.challenge': 'abc123', 'hub.lease_seconds': '864000' })}`));
  const ok = await verify(feedUrl);
  assert.equal(ok.status, 200);
  assert.equal(await ok.text(), 'abc123');
  assert.equal((await verify('https://www.youtube.com/feeds/videos.xml?channel_id=someone-else')).status, 404);
  assert.equal((await verify(feedUrl, 'publish')).status, 404);
});

test('a signed notification for a new upload triggers one rebuild', async t => {
  const { POST, hooks } = await setup(t);
  const response = await push(POST, atom('zzzzzzzzzzz'));
  assert.deepEqual(await response.json(), { rebuild: true, id: 'zzzzzzzzzzz' });
  assert.deepEqual(hooks, [['https://hooks.test/deploy', 'POST']]);
});

test('unsigned, wrongly signed and already-deployed notifications never rebuild', async t => {
  const { POST, hooks } = await setup(t);
  const body = atom('zzzzzzzzzzz');
  assert.equal((await push(POST, body, sign(body, 'wrong-secret'))).status, 202);
  assert.equal((await push(POST, body, '')).status, 202);
  assert.deepEqual(await (await push(POST, atom(uploads[0].id))).json(), { rebuild: false, id: uploads[0].id });
  assert.deepEqual(await (await push(POST, '<feed><at:deleted-entry ref="yt:video:zzzzzzzzzzz"/></feed>')).json(), { rebuild: false, id: null });
  assert.equal(hooks.length, 0);
});
