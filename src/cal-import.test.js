import assert from 'node:assert/strict';
import test from 'node:test';
import { importCalBookings } from '../scripts/import-cal-bookings.js';
import { reconcile } from '../scripts/reconcile-conversions.js';

test('imports every page, strips personal data, and reconciles current outcomes by creation date', async () => {
  const booking = { uid: 'one', eventTypeId: 1022289, status: 'accepted', createdAt: '2026-10-01T00:00:00Z',
    updatedAt: '2026-10-02T00:00:00Z', start: '2026-11-15T00:00:00Z', attendees: [{ email: 'private@example.com' }],
    metadata: { utm_source: 'unverified' }, bookingFieldsResponses: { notes: 'private' } };
  const pages = [
    { data: [booking, { ...booking, uid: 'pending', status: 'pending' }], pagination: { hasMore: true, nextCursor: 'next' } },
    { data: [{ ...booking, status: 'cancelled', updatedAt: '2026-11-01T00:00:00Z' }, { ...booking, uid: 'confirmed' },
      { ...booking, uid: 'rejected', status: 'rejected' }, { ...booking, uid: 'excluded', createdAt: '2026-11-01T00:00:00Z' }],
    pagination: { hasMore: false, nextCursor: null } },
  ];
  let calls = 0;
  const request = async (url, options) => {
    const parsed = new URL(url);
    assert.equal(parsed.origin, 'https://api.cal.com');
    assert.equal(parsed.searchParams.get('eventTypeId'), '1022289');
    assert.equal(parsed.searchParams.get('afterCreatedAt'), '2026-09-30T23:59:59.999Z');
    assert.equal(parsed.searchParams.get('cursor'), calls ? 'next' : null);
    assert.equal(options.headers.Authorization, 'Bearer test-key');
    assert.equal(options.headers['cal-api-version'], '2026-05-01');
    assert.equal(options.redirect, 'error');
    return { ok: true, json: async () => ({ status: 'success', ...pages[calls++] }) };
  };
  const records = await importCalBookings('test-key', '2026-10-01', '2026-11-01', request);
  assert.equal(calls, 2);
  assert.deepEqual(Object.keys(records[0]).sort(), ['provider', 'kind', 'id', 'occurredAt', 'updatedAt', 'status'].sort());
  const [group] = reconcile(records, '2026-10-01', '2026-11-01').groups;
  assert.equal(group.confirmedBookings, 1);
  assert.equal(group.excludedOutcomes, 3);
  assert.equal(group.source, 'unknown');
});

test('fails closed on missing credentials, failed pages, wrong events and repeated cursors', async () => {
  const run = request => importCalBookings('key', '2026-10-01', '2026-11-01', request);
  await assert.rejects(importCalBookings('', '2026-10-01', '2026-11-01'), /CALCOM_API_KEY/);
  await assert.rejects(run(async () => ({ ok: false, status: 401 })), /HTTP 401/);
  await assert.rejects(run(async () => ({ ok: true, json: async () => ({ status: 'success', data: [] }) })), /Invalid Cal.com response/);
  await assert.rejects(run(async () => ({ ok: true, json: async () => ({ status: 'success', data: [{ eventTypeId: 2664419 }], pagination: { hasMore: false } }) })), /Invalid Cal.com booking/);
  await assert.rejects(run(async () => ({ ok: true, json: async () => ({ status: 'success', data: [], pagination: { hasMore: true, nextCursor: 'same' } }) })), /pagination/);
});
