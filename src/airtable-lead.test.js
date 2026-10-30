import assert from 'node:assert/strict';
import { beforeEach, afterEach, test } from 'node:test';
import { addAirtableLead } from '../api/_lib/airtable-lead.js';
import { POST } from '../api/subscribe.js';

const keys = ['AIRTABLE_API_KEY', 'AIRTABLE_TOKEN', 'AIRTABLE_BASE_ID', 'AIRTABLE_LEADS_TABLE', 'RESEND_API_KEY'];
const savedEnv = Object.fromEntries(keys.map(key => [key, process.env[key]]));
const savedFetch = globalThis.fetch;
const savedError = console.error;
let calls;
let errors;

beforeEach(() => {
  for (const key of keys) delete process.env[key];
  process.env.AIRTABLE_API_KEY = 'airtable-test-key';
  calls = [];
  errors = [];
  console.error = (...args) => errors.push(args);
  globalThis.fetch = async (url, init) => {
    calls.push({ url, init });
    return new Response('{}', { status: 200 });
  };
});

afterEach(() => {
  for (const key of keys) {
    if (savedEnv[key] === undefined) delete process.env[key];
    else process.env[key] = savedEnv[key];
  }
  globalThis.fetch = savedFetch;
  console.error = savedError;
});

test('upserts the lead with the default URL, authorization, fields and timeout', async t => {
  const timeout = t.mock.method(AbortSignal, 'timeout', AbortSignal.timeout);
  process.env.AIRTABLE_TOKEN = 'unused-fallback';
  const start = Date.now();
  assert.equal(await addAirtableLead('ada@example.com', 'https://example.com/guide?a=1'), true);
  assert.equal(calls.length, 1);
  const { url, init } = calls[0];
  assert.equal(url, 'https://api.airtable.com/v0/appQ4kt0lriJEXdFd/tbl7ofTxzQ3tbdFDt');
  assert.equal(init.method, 'PATCH');
  assert.equal(init.headers.Authorization, 'Bearer airtable-test-key');
  assert.equal(init.headers['Content-Type'], 'application/json');
  assert.ok(init.signal instanceof AbortSignal);
  assert.deepEqual(timeout.mock.calls[0].arguments, [8000]);
  const body = JSON.parse(init.body);
  const timestamp = body.records[0].fields['Signed up at'];
  assert.equal(new Date(timestamp).toISOString(), timestamp);
  assert.ok(Date.parse(timestamp) >= start && Date.parse(timestamp) <= Date.now());
  assert.deepEqual(body, {
    performUpsert: { fieldsToMergeOn: ['Email'] },
    typecast: true,
    records: [{ fields: {
      Email: 'ada@example.com',
      'Signed up at': timestamp,
      'Source page': 'https://example.com/guide?a=1',
      Source: 'ai-automation-station.com newsletter',
    } }],
  });
});

test('environment overrides are encoded as separate URL path parts', async () => {
  process.env.AIRTABLE_BASE_ID = 'base/override';
  process.env.AIRTABLE_LEADS_TABLE = 'Newsletter Leads/#?';
  assert.equal(await addAirtableLead('ada@example.com', 'http://example.com'), true);
  assert.equal(calls[0].url, 'https://api.airtable.com/v0/base%2Foverride/Newsletter%20Leads%2F%23%3F');
  assert.equal(JSON.parse(calls[0].init.body).records[0].fields['Source page'], 'http://example.com');
});

test('uses AIRTABLE_TOKEN when AIRTABLE_API_KEY is missing', async () => {
  delete process.env.AIRTABLE_API_KEY;
  process.env.AIRTABLE_TOKEN = 'fallback-token';
  assert.equal(await addAirtableLead('ada@example.com'), true);
  assert.equal(calls[0].init.headers.Authorization, 'Bearer fallback-token');
});

test('omits empty, malformed and non-http referrers', async () => {
  for (const page of [undefined, null, '', '/guide', 'not a URL', 'https://', 'ftp://example.com', 'javascript:alert(1)']) {
    assert.equal(await addAirtableLead('ada@example.com', page), true);
    assert.equal(Object.hasOwn(JSON.parse(calls.at(-1).init.body).records[0].fields, 'Source page'), false);
  }
});

test('missing token logs and returns false without fetching', async () => {
  delete process.env.AIRTABLE_API_KEY;
  assert.equal(await addAirtableLead('ada@example.com'), false);
  assert.equal(calls.length, 0);
  assert.equal(errors.length, 1);
});

test('non-ok Airtable response logs and returns false', async () => {
  globalThis.fetch = async () => new Response('unavailable', { status: 503 });
  assert.equal(await addAirtableLead('ada@example.com'), false);
  assert.equal(errors.length, 1);
});

test('fetch rejection logs and returns false', async () => {
  globalThis.fetch = async () => { throw new Error('network failure'); };
  assert.equal(await addAirtableLead('ada@example.com'), false);
  assert.equal(errors.length, 1);
});

test('signup still succeeds and sends Resend notifications when Airtable fails', async () => {
  process.env.RESEND_API_KEY = 'resend-test-key';
  globalThis.fetch = async (url, init) => {
    calls.push({ url, init });
    if (url.startsWith('https://api.airtable.com/')) throw new Error('Airtable unavailable');
    assert.ok(url === 'https://api.resend.com/contacts' || url === 'https://api.resend.com/emails');
    return new Response('{"id":"resend-id"}', { status: 200 });
  };
  const response = await POST(new Request('https://example.com/api/subscribe', {
    method: 'POST',
    headers: { referer: 'https://example.com/guide' },
    body: JSON.stringify({ email: ' Ada@Example.com ' }),
  }));
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true, welcomeSent: true });
  assert.deepEqual(calls.map(call => new URL(call.url).hostname), [
    'api.resend.com', 'api.airtable.com', 'api.resend.com', 'api.resend.com',
  ]);
  assert.equal(JSON.parse(calls[1].init.body).records[0].fields.Email, 'ada@example.com');
  assert.equal(JSON.parse(calls[1].init.body).records[0].fields['Source page'], 'https://example.com/guide');
  assert.deepEqual(JSON.parse(calls[3].init.body).to, ['ada@example.com']);
  assert.equal(errors.length, 1);
});
