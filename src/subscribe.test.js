import assert from 'node:assert/strict';
import { afterEach, test } from 'node:test';
import { POST, welcome } from '../api/subscribe.js';

const savedKey = process.env.RESEND_API_KEY;
const savedFetch = globalThis.fetch;
let ip = 0;
const post = (body, headers = { 'x-forwarded-for': `198.51.100.${++ip}` }) => POST(new Request('https://x/api/subscribe', { method: 'POST', headers, body: JSON.stringify(body) }));

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

test('a new signup adds a subscribed contact and sends the welcome email', async () => {
  process.env.RESEND_API_KEY = 're_full';
  const calls = [];
  globalThis.fetch = async (url, init) => { calls.push([url, JSON.parse(init.body)]); return new Response('{}', { status: 200 }); };
  const response = await post({ email: ' Ada@Example.com ' });
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true, welcomeSent: true });
  assert.deepEqual(calls[0], ['https://api.resend.com/contacts', { email: 'ada@example.com', unsubscribed: false }]);
  const [nUrl, note] = calls[1];
  assert.equal(nUrl, 'https://api.resend.com/emails');
  assert.deepEqual(note.to, ['automojic@proton.me']);
  assert.match(note.subject, /ada@example\.com/);
  const [url, mail] = calls[2];
  assert.equal(url, 'https://api.resend.com/emails');
  assert.deepEqual(mail.to, ['ada@example.com']);
  assert.match(mail.from, /@ai-automation-station\.com>$/);
  assert.equal(mail.subject, welcome.subject);
  assert.match(mail.text, /start-here\.html[\s\S]*guides\.html[\s\S]*\/videos[\s\S]*Reply "unsubscribe"/);
});

test('an address already on the list gets the same answer as a new one and is not welcomed twice', async () => {
  process.env.RESEND_API_KEY = 're_full';
  const urls = [];
  globalThis.fetch = async url => { urls.push(url); return new Response('{}', { status: 409 }); };
  const res = await post({ email: 'ada@example.com' });
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { ok: true, welcomeSent: true });
  assert.deepEqual(urls, ['https://api.resend.com/contacts']);
});

test('a failed welcome email still reports the signup as done', async () => {
  process.env.RESEND_API_KEY = 're_full';
  const logged = console.error;
  console.error = () => {};
  globalThis.fetch = async url => new Response('{}', { status: url.endsWith('/emails') ? 500 : 200 });
  try {
    const response = await post({ email: 'ada@example.com' });
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { ok: true, welcomeSent: false });
  }
  finally { console.error = logged; }
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
  assert.deepEqual(await (await post({ email: 'x@y.co', hp: 'bot' }, headers)).json(), { ok: true });
  for (let i = 0; i < 4; i += 1) assert.equal((await post({ email: 'nope' }, headers)).status, 400);
  const res = await post({ email: 'nope' }, headers);
  assert.equal(res.status, 429);
  assert.ok(Number(res.headers.get('retry-after')) > 0);
  assert.equal((await post({ email: 'nope' }, { 'x-forwarded-for': '203.0.113.78' })).status, 400);
});
