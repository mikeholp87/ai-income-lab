import assert from 'node:assert/strict';
import { afterEach, test } from 'node:test';
import { GET, POST, addSubscriber, sendWelcome, signConfirmation, verifyConfirmation, welcome } from '../api/subscribe.js';

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

const confirmLink = token => GET(new Request(`https://x/api/subscribe?t=${encodeURIComponent(token)}`));
const confirm = token => POST(new Request('https://x/api/subscribe', {
  method: 'POST',
  headers: { 'content-type': 'application/x-www-form-urlencoded', 'x-forwarded-for': `198.51.100.${++ip}` },
  body: `t=${encodeURIComponent(token)}`,
}));

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

test('opening the confirmation link does not add the contact until the button is pressed', async () => {
  process.env.RESEND_API_KEY = 're_full';
  globalThis.fetch = () => assert.fail('prefetch must not call Resend');
  const token = await signConfirmation('ada@example.com');
  const preview = await confirmLink(token);
  assert.equal(preview.status, 200);
  assert.equal(preview.headers.get('x-robots-tag'), 'noindex');
  const html = await preview.text();
  assert.match(html, /<button class="join" type="submit">Confirm signup<\/button>/);
  assert.match(html, new RegExp(`name="t" value="${token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`));
  assert.doesNotMatch(html, /ada@example.com/);
});

test('the confirmation link adds the contact, tells Mike and sends the unchanged welcome', async () => {
  process.env.RESEND_API_KEY = 're_full';
  const calls = [];
  globalThis.fetch = async (url, init = {}) => {
    calls.push([init.method ?? 'GET', url, init.body && JSON.parse(init.body)]);
    return init.method ? new Response('{}', { status: 200 }) : new Response('{"name":"not_found"}', { status: 404 });
  };
  const res = await confirm(await signConfirmation('ada@example.com', 'https://www.ai-automation-station.com/'));
  assert.equal(res.status, 303);
  assert.match(res.headers.get('location'), /subscribe=confirmed/);
  assert.deepEqual(calls[0], ['GET', 'https://api.resend.com/contacts/ada%40example.com', undefined]);
  assert.deepEqual(calls[1], ['POST', 'https://api.resend.com/contacts', { email: 'ada@example.com', unsubscribed: false }]);
  assert.deepEqual(calls[3][2].to, ['automojic@proton.me']);
  assert.match(calls[3][2].text, /Page: https:\/\/www\.ai-automation-station\.com\//);
  assert.match(calls[3][2].text, /Welcome accepted by Resend: yes/);
  const mail = calls[2][2];
  assert.deepEqual(mail.to, ['ada@example.com']);
  assert.equal(mail.subject, welcome.subject);
  assert.equal(mail.text, welcome.text);
});

test('an address already on the list is not welcomed twice and Mike is not told again', async () => {
  process.env.RESEND_API_KEY = 're_full';
  const calls = [];
  globalThis.fetch = async (url, init = {}) => {
    calls.push([init.method ?? 'GET', url]);
    return new Response('{"object":"contact","email":"ada@example.com","unsubscribed":false}', { status: 200 });
  };
  const res = await confirm(await signConfirmation('ada@example.com'));
  assert.match(res.headers.get('location'), /subscribe=confirmed/);
  assert.deepEqual(calls, [['GET', 'https://api.resend.com/contacts/ada%40example.com']]);
});

test('a contact created between the lookup and the add is not welcomed twice', async () => {
  process.env.RESEND_API_KEY = 're_full';
  const calls = [];
  globalThis.fetch = async (url, init = {}) => {
    calls.push(init.method ?? 'GET');
    return new Response('{}', { status: init.method ? 409 : 404 });
  };
  const res = await confirm(await signConfirmation('ada@example.com'));
  assert.match(res.headers.get('location'), /subscribe=confirmed/);
  assert.deepEqual(calls, ['GET', 'POST']);
});

test('an address that unsubscribed earlier is resubscribed and welcomed', async () => {
  process.env.RESEND_API_KEY = 're_full';
  const calls = [];
  globalThis.fetch = async (url, init = {}) => {
    calls.push([init.method ?? 'GET', url, init.body && JSON.parse(init.body)]);
    return new Response(init.method ? '{}' : '{"object":"contact","unsubscribed":true}', { status: 200 });
  };
  const res = await confirm(await signConfirmation('ada@example.com'));
  assert.match(res.headers.get('location'), /subscribe=confirmed/);
  assert.deepEqual(calls[1], ['PATCH', 'https://api.resend.com/contacts/ada%40example.com', { unsubscribed: false }]);
  assert.deepEqual(calls[3][2].to, ['automojic@proton.me']);
  assert.equal(calls[2][2].subject, welcome.subject);
});

test('an old confirmation link cannot resubscribe someone who unsubscribed after it was sent', async () => {
  process.env.RESEND_API_KEY = 're_full';
  const calls = [];
  globalThis.fetch = async (url, init = {}) => {
    calls.push(init.method ?? 'GET');
    return new Response('{"object":"contact","unsubscribed":true}', { status: 200 });
  };
  const twoHoursAgo = Date.now() - 2 * 60 * 60 * 1000;
  const res = await confirm(await signConfirmation('ada@example.com', null, twoHoursAgo));
  assert.match(res.headers.get('location'), /subscribe=expired/);
  assert.deepEqual(calls, ['GET']);
});

test('an old link still adds a new address and leaves a subscribed one alone', async () => {
  process.env.RESEND_API_KEY = 're_full';
  const twoHoursAgo = Date.now() - 2 * 60 * 60 * 1000;
  const token = await signConfirmation('ada@example.com', null, twoHoursAgo);
  let calls = [];
  globalThis.fetch = async (url, init = {}) => {
    calls.push(init.method ?? 'GET');
    return new Response('{}', { status: init.method ? 200 : 404 });
  };
  assert.match((await confirm(token)).headers.get('location'), /subscribe=confirmed/);
  assert.equal(calls[1], 'POST');
  calls = [];
  globalThis.fetch = async (url, init = {}) => {
    calls.push(init.method ?? 'GET');
    return new Response('{"object":"contact","unsubscribed":false}', { status: 200 });
  };
  assert.match((await confirm(token)).headers.get('location'), /subscribe=confirmed/);
  assert.deepEqual(calls, ['GET']);
});

test('a failed contact lookup adds nobody and sends nothing', async () => {
  process.env.RESEND_API_KEY = 're_full';
  const calls = [];
  globalThis.fetch = async (url, init = {}) => { calls.push(init.method ?? 'GET'); return new Response('down', { status: 500 }); };
  const logged = console.error;
  console.error = () => {};
  try { assert.match((await confirm(await signConfirmation('ada@example.com'))).headers.get('location'), /subscribe=failed/); }
  finally { console.error = logged; }
  assert.deepEqual(calls, ['GET']);
});

test('tampered, expired or unsigned links add nobody', async () => {
  process.env.RESEND_API_KEY = 're_full';
  globalThis.fetch = () => assert.fail('should not call');
  const good = await signConfirmation('ada@example.com');
  const [payload, sig] = good.split('.');
  const forged = `${Buffer.from(JSON.stringify({ e: 'eve@example.com', p: '', x: Date.now() + 1e6 })).toString('base64url')}.${sig}`;
  const expired = await signConfirmation('ada@example.com', null, Date.now() - 49 * 3600 * 1000);
  for (const token of [forged, expired, payload, 'x', `${payload}.${sig}x`]) {
    assert.match((await confirmLink(token)).headers.get('location'), /subscribe=expired/, token);
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

test('temporary welcome failures retry the identical message with a private idempotency key', async () => {
  process.env.RESEND_API_KEY = 're_full';
  for (const failure of ['server', 'network']) {
    const calls = [];
    globalThis.fetch = async (url, init) => {
      calls.push(init);
      if (calls.length === 1) {
        if (failure === 'network') throw new Error('connection lost');
        return new Response('{}', { status: 503 });
      }
      return Response.json({ id: 'welcome-id' });
    };
    assert.equal(await sendWelcome('ada@example.com'), true);
    assert.equal(calls.length, 2);
    assert.equal(calls[0].headers['Idempotency-Key'], calls[1].headers['Idempotency-Key']);
    assert.doesNotMatch(calls[0].headers['Idempotency-Key'], /ada|example/);
    assert.equal(calls[0].body, calls[1].body);
  }
});

test('a persistent welcome failure keeps the signup active and alerts the owner', async () => {
  process.env.RESEND_API_KEY = 're_full';
  const mails = [];
  globalThis.fetch = async (url, init = {}) => {
    if (!init.method) return new Response('{}', { status: 404 });
    if (url.endsWith('/contacts')) return Response.json({ id: 'contact-id' });
    const body = JSON.parse(init.body);
    mails.push(body);
    return new Response('{}', { status: body.to[0] === 'ada@example.com' ? 503 : 200 });
  };
  const logged = console.error;
  console.error = () => {};
  try {
    const response = await confirm(await signConfirmation('ada@example.com'));
    assert.match(response.headers.get('location'), /subscribe=confirmed/);
    assert.equal(mails.length, 3);
    assert.match(mails[2].subject, /Welcome delivery needs attention/);
    assert.match(mails[2].text, /newsletter-recovery\.md/);
  } finally { console.error = logged; }
});

test('welcome validation and rate-limit errors are not retried immediately', async () => {
  process.env.RESEND_API_KEY = 're_full';
  const logged = console.error;
  console.error = () => {};
  try {
    for (const status of [400, 401, 409, 422, 429]) {
      let calls = 0;
      globalThis.fetch = async () => { calls += 1; return new Response('{}', { status }); };
      assert.equal(await sendWelcome('ada@example.com'), false);
      assert.equal(calls, 1);
    }
  } finally { console.error = logged; }
});

test('two successful concurrent contact creates reuse one welcome idempotency key', async () => {
  process.env.RESEND_API_KEY = 're_full';
  const deliveries = new Map();
  let createCalls = 0;
  globalThis.fetch = async (url, init = {}) => {
    if (!init.method) return new Response('{}', { status: 404 });
    if (url.endsWith('/contacts')) { createCalls += 1; return Response.json({ id: 'same-contact' }); }
    const key = init.headers['Idempotency-Key'];
    assert.ok(key);
    if (deliveries.has(key)) assert.equal(deliveries.get(key), init.body);
    deliveries.set(key, init.body);
    return Response.json({ id: key });
  };
  const token = await signConfirmation('ada@example.com', 'https://www.ai-automation-station.com/');
  const responses = await Promise.all([confirm(token), confirm(token)]);
  assert.equal(createCalls, 2);
  assert.ok(responses.every(response => response.headers.get('location').endsWith('subscribe=confirmed')));
  assert.equal(deliveries.size, 2, 'one welcome and one owner notification');
});


test('an owner delivery alert cannot collide with a concurrent success notification', async () => {
  process.env.RESEND_API_KEY = 're_full';
  const notices = [];
  let welcomeAttempts = 0;
  globalThis.fetch = async (url, init = {}) => {
    if (!init.method) return new Response('{}', { status: 404 });
    if (url.endsWith('/contacts')) return Response.json({ id: 'contact-id' });
    const mail = JSON.parse(init.body);
    if (mail.to[0] === 'ada@example.com') {
      welcomeAttempts += 1;
      return new Response('{}', { status: welcomeAttempts <= 2 ? 503 : 200 });
    }
    notices.push([init.headers['Idempotency-Key'], mail]);
    return Response.json({ id: 'notice-id' });
  };
  const logged = console.error;
  console.error = () => {};
  try {
    assert.equal((await addSubscriber('ada@example.com', '/first')).welcomeSent, false);
    assert.equal((await addSubscriber('ada@example.com', '/first')).welcomeSent, true);
    assert.notEqual(notices[0][0], notices[1][0]);
    assert.match(notices[0][1].subject, /needs attention/);
    assert.match(notices[1][1].subject, /New build notes signup/);
  } finally { console.error = logged; }
});
