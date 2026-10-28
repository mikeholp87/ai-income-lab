import assert from 'node:assert/strict';
import { afterEach, test } from 'node:test';
import { POST, readContact } from '../api/contact.js';

const savedKey = process.env.RESEND_API_KEY;
const savedFetch = globalThis.fetch;
const valid = { name: 'Ada', email: 'ada@example.com', topic: 'Sponsored video', message: 'Hi there' };
const post = body => POST(new Request('https://x/api/contact', { method: 'POST', body: typeof body === 'string' ? body : JSON.stringify(body) }));

afterEach(() => {
  if (savedKey === undefined) delete process.env.RESEND_API_KEY;
  else process.env.RESEND_API_KEY = savedKey;
  globalThis.fetch = savedFetch;
});

test('readContact trims fields and rejects missing, malformed, or oversized input', () => {
  assert.deepEqual(readContact({ ...valid, name: '  Ada ' }), valid);
  assert.equal(readContact({ ...valid, email: 'not-an-email' }), null);
  assert.equal(readContact({ ...valid, message: '   ' }), null);
  assert.equal(readContact({ ...valid, message: 'x'.repeat(5001) }), null);
  assert.equal(readContact([valid]), null);
});

test('bad JSON and invalid fields get 400; a missing key gets 503', async () => {
  delete process.env.RESEND_API_KEY;
  assert.equal((await post('{')).status, 400);
  assert.equal((await post({ ...valid, email: '' })).status, 400);
  assert.equal((await post(valid)).status, 503);
});

test('the honeypot is accepted without sending', async () => {
  process.env.RESEND_API_KEY = 're_test';
  globalThis.fetch = () => assert.fail('should not send');
  assert.equal((await post({ ...valid, hp: 'spam.example' })).status, 200);
});

test('a valid message is emailed with Reply-To set to the visitor', async () => {
  process.env.RESEND_API_KEY = 're_test';
  let sent;
  globalThis.fetch = async (url, init) => { sent = { url, init }; return new Response('{}'); };
  assert.equal((await post({ ...valid, name: 'Ada\nBcc: x' })).status, 200);
  const email = JSON.parse(sent.init.body);
  assert.equal(sent.url, 'https://api.resend.com/emails');
  assert.equal(sent.init.headers.Authorization, 'Bearer re_test');
  assert.deepEqual(email.to, ['automojic@proton.me']);
  assert.equal(email.reply_to, 'ada@example.com');
  assert.equal(email.subject, 'Website message from Ada Bcc: x: Sponsored video');
});

test('a Resend failure answers 502 so the page can offer mailto', async () => {
  process.env.RESEND_API_KEY = 're_test';
  const logged = console.error;
  console.error = () => {};
  globalThis.fetch = async () => new Response('nope', { status: 422 });
  try { assert.equal((await post(valid)).status, 502); }
  finally { console.error = logged; }
});
