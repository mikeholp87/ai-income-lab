import assert from 'node:assert/strict';
import { test } from 'node:test';
import { clientIp, createRateLimiter, tooManyRequests } from './rate-limit.js';

test('allows the limit per key, blocks the next one, and resets after the window', () => {
  let time = 0;
  const check = createRateLimiter({ limit: 2, windowMs: 1000, now: () => time });
  assert.equal(check('a').ok, true);
  assert.equal(check('a').ok, true);
  const blocked = check('a');
  assert.equal(blocked.ok, false);
  assert.equal(blocked.retryAfter, 1);
  assert.equal(check('b').ok, true);
  time = 1000;
  assert.equal(check('a').ok, true);
});

test('memory stays bounded when many addresses arrive', () => {
  const check = createRateLimiter({ limit: 1, windowMs: 60000, maxKeys: 3, now: () => 0 });
  for (const key of ['a', 'b', 'c', 'd']) assert.equal(check(key).ok, true);
  assert.equal(check('a').ok, true, 'the oldest key was evicted');
});

test('the client address comes from the first forwarded hop, and 429 is not cached', async () => {
  assert.equal(clientIp(new Headers({ 'x-forwarded-for': '203.0.113.9, 10.0.0.1' })), '203.0.113.9');
  assert.equal(clientIp(new Headers()), 'unknown');
  const res = tooManyRequests(30);
  assert.equal(res.status, 429);
  assert.equal(res.headers.get('retry-after'), '30');
  assert.equal(res.headers.get('cache-control'), 'no-store');
  assert.deepEqual(await res.json(), { error: 'rate_limited' });
});
