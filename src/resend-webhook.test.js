import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import { afterEach, beforeEach, test } from 'node:test';
import { POST, isAllowedSender, senderDomain } from '../api/resend-webhook.js';

const SECRET = `whsec_${crypto.randomBytes(24).toString('base64')}`;
const ENV_KEYS = ['RESEND_WEBHOOK_SECRET', 'AIRTABLE_PAT', 'AIRTABLE_API_KEY', 'SUPPRESSION_BASE_ID', 'SUPPRESSION_TABLE', 'EVENTS_TABLE'];

let savedEnv;
let savedFetch;
let savedConsoleError;
let savedConsoleWarn;
let warnings;

beforeEach(() => {
  savedEnv = Object.fromEntries(ENV_KEYS.map(key => [key, process.env[key]]));
  savedFetch = globalThis.fetch;
  savedConsoleError = console.error;
  savedConsoleWarn = console.warn;
  for (const key of ENV_KEYS) delete process.env[key];
  process.env.RESEND_WEBHOOK_SECRET = SECRET;
  process.env.AIRTABLE_PAT = 'pat-test';
  process.env.SUPPRESSION_BASE_ID = 'appTestBase';
  warnings = [];
  console.error = () => {};
  console.warn = (...args) => warnings.push(args);
});

afterEach(() => {
  for (const [key, value] of Object.entries(savedEnv)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  globalThis.fetch = savedFetch;
  console.error = savedConsoleError;
  console.warn = savedConsoleWarn;
});

function signedRequest(payload, { id = 'msg_test1', secret = SECRET, ts = Math.floor(Date.now() / 1000) } = {}) {
  const body = JSON.stringify(payload);
  const key = Buffer.from(secret.slice(6), 'base64');
  const sig = crypto.createHmac('sha256', key).update(`${id}.${ts}.${body}`).digest('base64');
  return new Request('https://www.ai-automation-station.com/api/resend-webhook', {
    method: 'POST',
    headers: { 'svix-id': id, 'svix-timestamp': String(ts), 'svix-signature': `v1,${sig}`, 'content-type': 'application/json' },
    body,
  });
}

function bounce(to = ['a@example.com', 'b@example.com'], from = 'hello@mail.beremoteconsulting.com') {
  return {
    type: 'email.bounced',
    created_at: '2026-10-10T00:00:00.000Z',
    data: { email_id: 'em_1', from, to, subject: 'Hi', bounce: { type: 'Permanent' } },
  };
}

// Mock Airtable: records every request; responds with `status` (default 200).
function mockAirtable({ status = 200 } = {}) {
  const calls = [];
  globalThis.fetch = async (url, init = {}) => {
    calls.push({ method: init.method || 'GET', url: new URL(String(url)), headers: init.headers, body: init.body ? JSON.parse(init.body) : null });
    if (status >= 300) return new Response('boom', { status });
    return Response.json({ records: [] });
  };
  return calls;
}

const rowsOf = calls => calls.flatMap(call => call.body.records.map(record => record.fields));

test('bounce upserts one suppression row per recipient with a single PATCH', async () => {
  const calls = mockAirtable();
  const res = await POST(signedRequest(bounce()));
  assert.equal(res.status, 200);
  assert.equal(await res.text(), 'ok');

  assert.equal(calls.length, 1);
  const [call] = calls;
  assert.equal(call.method, 'PATCH');
  assert.equal(call.url.href, 'https://api.airtable.com/v0/appTestBase/Email%20Suppression');
  assert.equal(call.headers.Authorization, 'Bearer pat-test');
  assert.deepEqual(call.body.performUpsert, { fieldsToMergeOn: ['Webhook ID', 'Email'] });
  assert.equal(call.body.typecast, true);

  const rows = rowsOf(calls);
  assert.deepEqual(rows.map(row => row.Email), ['a@example.com', 'b@example.com']);
  assert.deepEqual(rows[0], {
    'Event': 'email.bounced',
    'Resend Email ID': 'em_1',
    'From': 'hello@mail.beremoteconsulting.com',
    'Subject': 'Hi',
    'Event At': '2026-10-10T00:00:00.000Z',
    'Webhook ID': 'msg_test1',
    'Email': 'a@example.com',
    'Reason': 'Bounced',
    'Bounce Detail': '{"type":"Permanent"}',
    'Suppressed': true,
  });
});

test('more than 10 recipients are sent in sequential batches of at most 10', async () => {
  const calls = mockAirtable();
  const to = Array.from({ length: 12 }, (_, i) => `user${i}@example.com`);
  const res = await POST(signedRequest(bounce(to)));
  assert.equal(res.status, 200);
  assert.deepEqual(calls.map(call => call.body.records.length), [10, 2]);
  assert.ok(calls.every(call => call.method === 'PATCH'));
  assert.deepEqual(rowsOf(calls).map(row => row.Email), to);
});

test('a retry with the same svix-id sends the same upsert keys', async () => {
  const keys = async () => {
    const calls = mockAirtable();
    assert.equal((await POST(signedRequest(bounce()))).status, 200);
    return calls.map(call => ({
      merge: call.body.performUpsert.fieldsToMergeOn,
      keys: call.body.records.map(record => [record.fields['Webhook ID'], record.fields.Email]),
    }));
  };
  const first = await keys();
  const retry = await keys();
  assert.deepEqual(retry, first);
  assert.deepEqual(first[0].keys, [['msg_test1', 'a@example.com'], ['msg_test1', 'b@example.com']]);
});

test('email.complained is stored with Reason Complained', async () => {
  const calls = mockAirtable();
  const res = await POST(signedRequest({ ...bounce(['a@example.com']), type: 'email.complained' }));
  assert.equal(res.status, 200);
  const [row] = rowsOf(calls);
  assert.equal(row.Event, 'email.complained');
  assert.equal(row.Reason, 'Complained');
  assert.equal(row.Suppressed, true);
});

test('delivered events upsert into the events table', async () => {
  process.env.EVENTS_TABLE = 'Events Test';
  const calls = mockAirtable();
  const res = await POST(signedRequest({ ...bounce(['a@example.com']), type: 'email.delivered' }));
  assert.equal(res.status, 200);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].method, 'PATCH');
  assert.equal(calls[0].url.pathname, '/v0/appTestBase/Events%20Test');
  assert.deepEqual(calls[0].body.performUpsert.fieldsToMergeOn, ['Webhook ID', 'Email']);
});

test('recipients are lowercased and trimmed', async () => {
  const calls = mockAirtable();
  const res = await POST(signedRequest(bounce(['  A@Example.COM ', 'B@EXAMPLE.com'])));
  assert.equal(res.status, 200);
  assert.deepEqual(rowsOf(calls).map(row => row.Email), ['a@example.com', 'b@example.com']);
});

test('duplicate recipients (after normalising) are sent once, so one request never repeats an upsert key', async () => {
  const calls = mockAirtable();
  const res = await POST(signedRequest(bounce(['a@example.com', ' A@Example.com', 'b@example.com'])));
  assert.equal(res.status, 200);
  assert.deepEqual(rowsOf(calls).map(row => row.Email), ['a@example.com', 'b@example.com']);
});

test('a string data.to is treated as a single recipient', async () => {
  const calls = mockAirtable();
  const res = await POST(signedRequest(bounce('Solo@Example.com')));
  assert.equal(res.status, 200);
  assert.deepEqual(rowsOf(calls).map(row => row.Email), ['solo@example.com']);
});

test('missing data.to makes no Airtable call and returns 200', async () => {
  const calls = mockAirtable();
  const payload = bounce();
  delete payload.data.to;
  const res = await POST(signedRequest(payload));
  assert.equal(res.status, 200);
  assert.equal(calls.length, 0);
});

test('Airtable error returns 500 so Resend retries', async () => {
  mockAirtable({ status: 503 });
  const res = await POST(signedRequest(bounce()));
  assert.equal(res.status, 500);
  assert.equal(await res.text(), 'storage error');
});

test('a failing batch stops the remaining batches and returns 500', async () => {
  const calls = mockAirtable({ status: 500 });
  const to = Array.from({ length: 12 }, (_, i) => `user${i}@example.com`);
  const res = await POST(signedRequest(bounce(to)));
  assert.equal(res.status, 500);
  assert.equal(calls.length, 1);
});

test('missing Airtable env returns 500 without calling fetch', async () => {
  const calls = mockAirtable();
  delete process.env.SUPPRESSION_BASE_ID;
  const res = await POST(signedRequest(bounce()));
  assert.equal(res.status, 500);
  assert.equal(calls.length, 0);

  delete process.env.AIRTABLE_PAT;
  process.env.SUPPRESSION_BASE_ID = 'appTestBase';
  const noToken = await POST(signedRequest(bounce()));
  assert.equal(noToken.status, 500);
  assert.equal(calls.length, 0);
});

test('bad or stale signature returns 401 with no fetch calls', async () => {
  const calls = mockAirtable();
  const wrongSecret = `whsec_${crypto.randomBytes(24).toString('base64')}`;
  const bad = await POST(signedRequest(bounce(), { secret: wrongSecret }));
  assert.equal(bad.status, 401);

  const stale = await POST(signedRequest(bounce(), { ts: Math.floor(Date.now() / 1000) - 600 }));
  assert.equal(stale.status, 401);

  assert.equal(calls.length, 0);
});

test('other event types are acknowledged without storage', async () => {
  const calls = mockAirtable();
  const res = await POST(signedRequest({ ...bounce(), type: 'email.opened' }));
  assert.equal(res.status, 200);
  assert.equal(await res.text(), 'ok');
  assert.equal(calls.length, 0);
});

test('senderDomain and isAllowedSender match the allowlist exactly', () => {
  assert.equal(senderDomain('hello@mail.beremoteconsulting.com'), 'mail.beremoteconsulting.com');
  assert.equal(senderDomain('"Name" <hello@mail.beremoteconsulting.com>'), 'mail.beremoteconsulting.com');
  assert.equal(senderDomain(' Hello@BeRemoteConsulting.com. '), 'beremoteconsulting.com');
  assert.equal(senderDomain('no-address'), '');

  for (const ok of [
    'hello@mail.beremoteconsulting.com',
    'hello@beremoteconsulting.com',
    '"Mike" <hello@mail.beremoteconsulting.com>',
    'Mike <HELLO@BEREMOTECONSULTING.COM.>',
  ]) assert.equal(isAllowedSender(ok), true, ok);

  for (const bad of [
    'x@evil-beremoteconsulting.com',
    'x@beremoteconsulting.com.attacker.io',
    'x@attacker.io?beremoteconsulting.com',
    '"hello@beremoteconsulting.com" <x@attacker.io>',
    'beremoteconsulting.com <x@attacker.io>',
    'x@sub.mail.beremoteconsulting.com',
    '',
    undefined,
  ]) assert.equal(isAllowedSender(bad), false, String(bad));
});

test('signed events from other domains are ignored with 200, no fetch, and a domain-only warning', async () => {
  const cases = [
    ['x@evil-beremoteconsulting.com', 'evil-beremoteconsulting.com'],
    ['x@beremoteconsulting.com.attacker.io', 'beremoteconsulting.com.attacker.io'],
    ['x@attacker.io?beremoteconsulting.com', 'attacker.io?beremoteconsulting.com'],
    ['"hello@beremoteconsulting.com" <x@attacker.io>', 'attacker.io'],
  ];
  for (const [from, domain] of cases) {
    const calls = mockAirtable();
    warnings.length = 0;
    const res = await POST(signedRequest(bounce(['a@example.com'], from), { id: `msg_${domain}` }));
    assert.equal(res.status, 200, from);
    assert.equal(await res.text(), 'ignored (other domain)', from);
    assert.equal(calls.length, 0, from);
    assert.deepEqual(warnings, [['resend-webhook: ignored sender domain', domain]], from);
    assert.ok(!JSON.stringify(warnings).includes('x@'), from);
  }
});
