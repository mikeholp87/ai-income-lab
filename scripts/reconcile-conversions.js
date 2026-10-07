import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

// Offline reconciliation: use provider receipts, never infer a purchase from a click.
export function reconcile(records, from, to) {
  const start = Date.parse(from), end = Date.parse(to);
  if (!Array.isArray(records) || !Number.isFinite(start) || !Number.isFinite(end) || start >= end) throw new Error('Supply records and a valid inclusive-from, exclusive-to date range.');
  const latest = new Map();
  for (const record of records) {
    if (!['cal.com', 'skool'].includes(record.provider) || typeof record.id !== 'string' || !record.id
      || !['click', 'booking', 'purchase'].includes(record.kind) || !Number.isFinite(Date.parse(record.occurredAt))
      || !Number.isFinite(Date.parse(record.updatedAt || record.occurredAt))
      || (record.kind === 'booking' && (record.provider !== 'cal.com' || !['confirmed', 'cancelled'].includes(record.status)))
      || (record.kind === 'purchase' && (record.provider !== 'skool' || !['paid', 'refunded', 'failed'].includes(record.status)))
      || ['source', 'medium', 'campaign'].some(key => record[key] != null && typeof record[key] !== 'string')) throw new Error('Invalid conversion record. See docs/conversion-measurement.md.');
    const key = JSON.stringify([record.provider, record.kind, record.id]);
    const prior = latest.get(key);
    if (!prior || Date.parse(record.updatedAt || record.occurredAt) >= Date.parse(prior.updatedAt || prior.occurredAt)) latest.set(key, record);
  }
  const groups = new Map();
  for (const record of latest.values()) {
    const time = Date.parse(record.occurredAt);
    if (time < start || time >= end) continue;
    const attribution = { provider: record.provider, source: record.source || 'unknown', medium: record.medium || 'unknown', campaign: record.campaign || 'unknown' };
    const key = JSON.stringify(attribution);
    const group = groups.get(key) || { ...attribution, clicks: 0, confirmedBookings: 0, paidMemberships: 0, excludedOutcomes: 0 };
    if (record.kind === 'click') group.clicks++;
    else if (record.kind === 'booking' && record.status === 'confirmed') group.confirmedBookings++;
    else if (record.kind === 'purchase' && record.status === 'paid') group.paidMemberships++;
    else group.excludedOutcomes++;
    groups.set(key, group);
  }
  return { from, to, groups: [...groups.values()] };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const [, , file, from, to] = process.argv;
  try {
    if (!file) throw new Error('Usage: node scripts/reconcile-conversions.js records.json FROM TO');
    console.log(JSON.stringify(reconcile(JSON.parse(await readFile(file, 'utf8')), from, to), null, 2));
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
