import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import test from 'node:test';
import { uploads } from './uploads-snapshot.js';
import { feedUrl } from './youtube.js';

const callback = 'https://www.ai-automation-station.com/api/youtube-push';
const atom = id => `<feed xmlns:yt="http://www.youtube.com/xml/schemas/2015"><entry><yt:videoId>${id}</yt:videoId><yt:channelId>UC8_eYAfJcUgI5BV3hg9U2cw</yt:channelId></entry></feed>`;
const sign = (body, secret = 'hub-secret') => `sha1=${createHmac('sha1', secret).update(body).digest('hex')}`;
// The hub delivers to the keyed callback the daily renewal subscribes (callbackUrl in api/youtube-push.js).
const keyed = `${callback}?k=${createHmac('sha256', 'hub-secret').update('websub-callback').digest('hex').slice(0, 32)}`;
const push = (POST, body, signature = sign(body), url = keyed) => POST(new Request(url, { method: 'POST', body, headers: { 'content-type': 'application/atom+xml', 'x-hub-signature': signature } }));

async function setup(t) {
  const saved = { WEBSUB_SECRET: process.env.WEBSUB_SECRET, DEPLOY_HOOK_URL: process.env.DEPLOY_HOOK_URL };
  process.env.WEBSUB_SECRET = 'hub-secret';
  process.env.DEPLOY_HOOK_URL = 'https://hooks.test/deploy';
  t.after(() => { for (const [key, value] of Object.entries(saved)) if (value === undefined) delete process.env[key]; else process.env[key] = value; });
  const hooks = [];
  t.mock.method(globalThis, 'fetch', async (input, init = {}) => { hooks.push([String(input), init.method]); return new Response('{}', { status: 201 }); });
  return { ...(await import(`../api/youtube-push.js?test=${encodeURIComponent(t.name)}`)), hooks };
}

test('the hub verification echoes the challenge for our own subscription to our channel feed only', async t => {
  const { GET, callbackUrl, subscribe, hooks } = await setup(t);
  assert.equal(callbackUrl('hub-secret'), keyed);
  const verify = (topic, mode = 'subscribe', url = keyed) => GET(new Request(`${url}&${new URLSearchParams({ 'hub.mode': mode, 'hub.topic': topic, 'hub.challenge': 'abc123', 'hub.lease_seconds': '864000' })}`));
  const ok = await verify(feedUrl);
  assert.equal(ok.status, 200);
  assert.equal(await ok.text(), 'abc123');
  assert.equal((await verify('https://www.youtube.com/feeds/videos.xml?channel_id=someone-else')).status, 404);
  assert.equal((await verify(feedUrl, 'publish')).status, 404);
  // Anyone can ask the hub to unsubscribe or resubscribe our callback with their own secret; neither may be confirmed.
  assert.equal((await verify(feedUrl, 'unsubscribe')).status, 404);
  assert.equal((await verify(feedUrl, 'unsubscribe', callbackUrl('attacker-secret'))).status, 404);
  assert.equal((await verify(feedUrl, 'subscribe', `${callback}?k=`)).status, 404);
  assert.equal((await verify(feedUrl, 'subscribe', `${callback}?x=1`)).status, 404);
  assert.equal((await verify(feedUrl, 'subscribe', callbackUrl('attacker-secret'))).status, 404);
  t.mock.method(globalThis, 'fetch', async (input, init = {}) => { hooks.push([String(input), String(init.body)]); return new Response(null, { status: 202 }); });
  assert.equal(await subscribe('hub-secret'), 202);
  assert.equal(new URLSearchParams(hooks.at(-1)[1]).get('hub.callback'), keyed);
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

test('the old unkeyed subscription can be unsubscribed, but never resubscribed', async t => {
  const { GET } = await setup(t);
  const verify = (mode, topic = feedUrl) => GET(new Request(`${callback}?${new URLSearchParams({ 'hub.mode': mode, 'hub.topic': topic, 'hub.challenge': 'legacy1' })}`));
  const ok = await verify('unsubscribe');
  assert.equal(ok.status, 200);
  assert.equal(await ok.text(), 'legacy1');
  assert.equal((await verify('subscribe')).status, 404);
  assert.equal((await verify('unsubscribe', 'https://www.youtube.com/feeds/videos.xml?channel_id=someone-else')).status, 404);
});

test('signed deliveries to the old unkeyed callback, or with a wrong key, are acknowledged without a rebuild', async t => {
  const { POST, callbackUrl, hooks } = await setup(t);
  const body = atom('zzzzzzzzzzz');
  for (const url of [callback, `${callback}?k=`, callbackUrl('attacker-secret')]) assert.equal((await push(POST, body, sign(body), url)).status, 202, url);
  assert.equal(hooks.length, 0);
});

test('a failed deploy hook for a signed new upload answers 503 so the hub retries', async t => {
  const { POST } = await setup(t);
  t.mock.method(globalThis, 'fetch', async () => new Response('down', { status: 500 }));
  const failed = await push(POST, atom('zzzzzzzzzzz'));
  assert.equal(failed.status, 503);
  assert.deepEqual(await failed.json(), { rebuild: false, id: 'zzzzzzzzzzz' });
  t.mock.method(globalThis, 'fetch', async () => { throw new Error('network'); });
  assert.equal((await push(POST, atom('zzzzzzzzzzz'))).status, 503);
});

test('known ids, deletions and a missing deploy hook still answer 200', async t => {
  const { POST, hooks } = await setup(t);
  assert.equal((await push(POST, atom(uploads[0].id))).status, 200);
  assert.equal((await push(POST, '<feed><at:deleted-entry ref="yt:video:zzzzzzzzzzz"/></feed>')).status, 200);
  delete process.env.DEPLOY_HOOK_URL;
  const missing = await push(POST, atom('zzzzzzzzzzz'));
  assert.equal(missing.status, 200);
  assert.deepEqual(await missing.json(), { rebuild: false, id: 'zzzzzzzzzzz', error: 'DEPLOY_HOOK_URL is not set' });
  assert.equal(hooks.length, 0);
});
