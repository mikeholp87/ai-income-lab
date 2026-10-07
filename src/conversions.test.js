import assert from 'node:assert/strict';
import test from 'node:test';
import { reconcile } from '../scripts/reconcile-conversions.js';

test('reconciles receipts without turning clicks into purchases or counting refunds twice', () => {
  const purchase = { provider: 'skool', kind: 'purchase', id: 'receipt-1', occurredAt: '2026-10-02T00:00:00Z', status: 'paid', campaign: 'launch' };
  const records = [purchase, purchase, { ...purchase, status: 'refunded', updatedAt: '2026-10-03T00:00:00Z' }, { ...purchase, id: 'receipt-2' },
    { provider: 'skool', kind: 'click', id: 'click-1', occurredAt: '2026-10-01T00:00:00Z', campaign: 'launch' },
    { provider: 'cal.com', kind: 'booking', id: 'booking-1', occurredAt: '2026-10-04T00:00:00Z', status: 'confirmed' },
    { ...purchase, id: 'outside-range', occurredAt: '2026-11-01T00:00:00Z' }];
  const result = reconcile(records, '2026-10-01', '2026-11-01');
  assert.deepEqual(result.groups.map(({ clicks, paidMemberships, confirmedBookings, excludedOutcomes }) => ({ clicks, paidMemberships, confirmedBookings, excludedOutcomes })), [
    { clicks: 1, paidMemberships: 1, confirmedBookings: 0, excludedOutcomes: 1 },
    { clicks: 0, paidMemberships: 0, confirmedBookings: 1, excludedOutcomes: 0 },
  ]);
  assert.equal(result.groups[1].campaign, 'unknown');
  assert.throws(() => reconcile([{ ...purchase, status: 'clicked' }], '2026-10-01', '2026-11-01'));
  assert.throws(() => reconcile(records, 'bad-date', '2026-11-01'));
});

test('keeps video-level attribution and missing membership attribution separate', () => {
  const record = { provider: 'skool', kind: 'purchase', id: 'one', occurredAt: '2026-10-08T00:00:00Z', status: 'paid', source: 'youtube', campaign: 'build-guides' };
  const result = reconcile([{ ...record, content: 'video-a' }, { ...record, id: 'two', content: 'video-b' }, { ...record, id: 'three' }], '2026-10-07', '2026-11-04');
  assert.deepEqual(result.groups.map(group => [group.content, group.paidMemberships]), [['video-a', 1], ['video-b', 1], ['unknown', 1]]);
  assert.throws(() => reconcile([{ ...record, content: {} }], '2026-10-07', '2026-11-04'));
});
