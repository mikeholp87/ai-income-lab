import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
import { recordOpen } from '/home/mikeh/Projects/ai-income-lab/src/open-pixel.js';
// Mock every request: this check never connects to Airtable or the deployed site.
const calls = [];
globalThis.fetch = async (url, init = {}) => {
  calls.push({ method: init.method || 'GET', createsToken: init.body ? JSON.parse(init.body).fields?.['Send Token'] : null });
  return Response.json({ records: [] });
};
const result = await recordOpen({ token: 'audit-unknown-send', openedAt: '2026-10-07T00:00:00Z', userAgent: 'local-mock' }, { AIRTABLE_API_KEY: 'dummy-local-only' });
const proof = { mocked: true, calls, logged: result.logged, sendExists: Boolean(result.sendId) };
await writeFile('/tmp/site-audit-pixel-proof.json', JSON.stringify(proof, null, 2) + '\n');
assert.equal(calls[0].method, 'POST');
assert.equal(calls[0].createsToken, 'audit-unknown-send');
assert.equal(proof.sendExists, false);
console.log(JSON.stringify(proof));
