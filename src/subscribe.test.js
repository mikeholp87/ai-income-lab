import assert from 'node:assert/strict';
import { afterEach, test } from 'node:test';
import { GET, POST, signConfirmation, verifyConfirmation, welcome } from '../api/subscribe.js';

const savedKey = process.env.RESEND_API_KEY;
process.env.SUBSCRIBE_SECRET = 'test-secret';
const savedFetch = globalThis.fetch;
let ip = 0;
const post = (body, headers = { 'x-forwarded-for': `198.51.100.${++ip}` }) => POST(new Request('https://x/api/subscribe', { method: 'POST', headers, body: JSON.stringify(body) }));

afterEach(() => {
  if (savedKey === undefined) delete process.env.RESEND_API_KEY;
  else process.env.RESEND_API_KEY = savedKey;
  globalThis.fetch = savedFetch;
});

const confirm = token => GET(new Request(`https://x/api/subscribe?t=${encodeURIComponent(token)}`));

test('bad addresses get 400 and a missing key gets 503', async () => {
  delete process.env.RESEND_API_KEY;
  assert.equal((await post({ email: 'nope' })).status, 400);
  assert.equal((await post({ email: 'a@b.co' })).status, 503);
});

test('a signup only sends a confirmation link, and adds nobody yet', async () => {
  process.env.RESEND_API_KEY = 're_full';
  const calls = [];
  globalThis.fetch = async (url, init) => { calls.push([url, JSON.parse(init.body)]); return new Response('{}', { status: 200 }); };
  const response = await post({ email: ' Ada@Example.com ' });
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true, confirm: true });
  assert.equal(calls.length, 1);
  const [url, mail] = calls[0];
  assert.equal(url, 'https://api.resend.com/emails');
  assert.deepEqual(mail.to, ['ada@example.com']);
  assert.match(mail.subject, /Confirm/);
  const token = decodeURIComponent(mail.text.match(/\/api\/subscribe\?t=(\S+)/)[1]);
  assert.equal((await verifyConfirmation(token)).email, 'ada@example.com');
});

test('the confirmation link adds the contact, tells Mike and sends the unchanged welcome', async () => {
  process.env.RESEND_API_KEY = 're_full';
  const calls = [];
  globalThis.fetch = async (url, init) => { calls.push([url, JSON.parse(init.body)]); return new Response('{}', { status: 200 }); };
  const res = await confirm(await signConfirmation('ada@example.com', 'https://www.ai-automation-station.com/'));
  assert.equal(res.status, 303);
  assert.match(res.headers.get('location'), /subscribe=confirmed/);
  assert.deepEqual(calls[0], ['https://api.resend.com/contacts', { email: 'ada@example.com', unsubscribed: false }]);
  assert.deepEqual(calls[1][1].to, ['automojic@proton.me']);
  assert.match(calls[1][1].text, /Page: https:\/\/www\.ai-automation-station\.com\//);
  const mail = calls[2][1];
  assert.deepEqual(mail.to, ['ada@example.com']);
  assert.equal(mail.subject, welcome.subject);
  assert.equal(mail.text, welcome.text);
});

test('an address already on the list is not welcomed twice', async () => {
  process.env.RESEND_API_KEY = 're_full';
  const urls = [];
  globalThis.fetch = async url => { urls.push(url); return new Response('{}', { status: 409 }); };
  const res = await confirm(await signConfirmation('ada@example.com'));
  assert.match(res.headers.get('location'), /subscribe=confirmed/);
  assert.deepEqual(urls, ['https://api.resend.com/contacts']);
});

test('tampered, expired or unsigned links add nobody', async () => {
  process.env.RESEND_API_KEY = 're_full';
  globalThis.fetch = () => assert.fail('should not call');
  const good = await signConfirmation('ada@example.com');
  const [payload, sig] = good.split('.');
  const forged = `${Buffer.from(JSON.stringify({ e: 'eve@example.com', p: '', x: Date.now() + 1e6 })).toString('base64url')}.${sig}`;
  const expired = await signConfirmation('ada@example.com', null, Date.now() - 49 * 3600 * 1000);
  for (const token of [forged, expired, payload, 'x', `${payload}.${sig}x`]) {
    assert.match((await confirm(token)).headers.get('location'), /subscribe=expired/, token);
  }
});

test('honeypot hits never reach Resend, and Resend failures answer 502', async () => {
  process.env.RESEND_API_KEY = 're_full';
  globalThis.fetch = () => assert.fail('should not call');
  assert.equal((await post({ email: 'a@b.co', hp: 'x' })).status, 200);
  const logged = console.error;
  console.error = () => {};
  globalThis.fetch = async () => new Response('bad', { status: 500 });
  try { assert.equal((await post({ email: 'a@b.co' })).status, 502); }
  finally { console.error = logged; }
});

test('trap fields avoid names that autofill fills, and pages never reveal an existing signup', async () => {
  const { readFile, readdir } = await import('node:fs/promises');
  const guides = (await readdir('public/guides')).map(file => `public/guides/${file}`);
  for (const path of ['src/main.jsx', 'src/archive.js', 'public/start-here.html', ...guides]) {
    assert.doesNotMatch(await readFile(path, 'utf8'), /name="website"/, path);
  }
  for (const path of ['src/reading.js', 'src/main.jsx']) assert.doesNotMatch(await readFile(path, 'utf8'), /already on the list/, path);
});

test('one address that keeps posting gets 429 with Retry-After, and the trap still answers ok', async () => {
  delete process.env.RESEND_API_KEY;
  const headers = { 'x-forwarded-for': '203.0.113.77' };
  assert.deepEqual(await (await post({ email: 'x@y.co', hp: 'bot' }, headers)).json(), { ok: true, confirm: true });
  for (let i = 0; i < 4; i += 1) assert.equal((await post({ email: 'nope' }, headers)).status, 400);
  const res = await post({ email: 'nope' }, headers);
  assert.equal(res.status, 429);
  assert.ok(Number(res.headers.get('retry-after')) > 0);
  assert.equal((await post({ email: 'nope' }, { 'x-forwarded-for': '203.0.113.78' })).status, 400);
});
