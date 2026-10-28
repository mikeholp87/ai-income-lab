import assert from 'node:assert/strict';
import { afterEach, test } from 'node:test';
import { POST } from '../api/subscribe.js';

const savedKey = process.env.RESEND_API_KEY;
const savedFetch = globalThis.fetch;
const post = body => POST(new Request('https://x/api/subscribe', { method: 'POST', body: JSON.stringify(body) }));

afterEach(() => {
  if (savedKey === undefined) delete process.env.RESEND_API_KEY;
  else process.env.RESEND_API_KEY = savedKey;
  globalThis.fetch = savedFetch;
});

test('bad addresses get 400 and a missing key gets 503', async () => {
  delete process.env.RESEND_API_KEY;
  assert.equal((await post({ email: 'nope' })).status, 400);
  assert.equal((await post({ email: 'a@b.co' })).status, 503);
});

test('a signup adds a subscribed contact; an existing one still counts as done', async () => {
  process.env.RESEND_API_KEY = 're_full';
  let sent;
  globalThis.fetch = async (url, init) => { sent = JSON.parse(init.body); return new Response('{}', { status: 409 }); };
  assert.equal((await post({ email: ' Ada@Example.com ' })).status, 200);
  assert.deepEqual(sent, { email: 'ada@example.com', unsubscribed: false });
});

test('honeypot hits never reach Resend, and Resend failures answer 502', async () => {
  process.env.RESEND_API_KEY = 're_full';
  globalThis.fetch = () => assert.fail('should not call');
  assert.equal((await post({ email: 'a@b.co', website: 'x' })).status, 200);
  const logged = console.error;
  console.error = () => {};
  globalThis.fetch = async () => new Response('bad', { status: 500 });
  try { assert.equal((await post({ email: 'a@b.co' })).status, 502); }
  finally { console.error = logged; }
});
