import { writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { reconcile } from './reconcile-conversions.js';

// This is the event embedded on the site, verified in Cal.com on October 7, 2026.
const eventTypeId = 1022289;
const statuses = { accepted: 'confirmed', cancelled: 'cancelled', pending: 'pending', rejected: 'rejected' };

export async function importCalBookings(apiKey, from, to, request = fetch) {
  reconcile([], from, to);
  if (!apiKey?.trim()) throw new Error('Set CALCOM_API_KEY in .env.local before importing.');
  const start = Date.parse(from), end = Date.parse(to);
  const url = new URL('https://api.cal.com/v2/bookings');
  url.search = new URLSearchParams({
    eventTypeId: String(eventTypeId), limit: '100',
    afterCreatedAt: new Date(start - 1).toISOString(), beforeCreatedAt: new Date(end).toISOString(),
  });
  const records = [], cursors = new Set();
  while (true) {
    const response = await request(url.toString(), {
      headers: { Authorization: `Bearer ${apiKey}`, 'cal-api-version': '2026-05-01' },
      redirect: 'error', signal: AbortSignal.timeout(30000),
    });
    if (!response.ok) throw new Error(`Cal.com import failed (HTTP ${response.status}); no export written.`);
    const page = await response.json();
    if (page.status !== 'success' || !Array.isArray(page.data) || typeof page.pagination?.hasMore !== 'boolean') {
      throw new Error('Invalid Cal.com response; no export written.');
    }
    for (const booking of page.data) {
      if (!booking || booking.eventTypeId !== eventTypeId || typeof booking.uid !== 'string' || !booking.uid
        || !Object.hasOwn(statuses, booking.status) || !Number.isFinite(Date.parse(booking.createdAt))
        || !Number.isFinite(Date.parse(booking.updatedAt))) throw new Error('Invalid Cal.com booking; no export written.');
      const created = Date.parse(booking.createdAt);
      if (created < start || created >= end) continue;
      // Retain only outcome fields. The documented response does not guarantee UTM fields.
      records.push({ provider: 'cal.com', kind: 'booking', id: booking.uid,
        occurredAt: booking.createdAt, updatedAt: booking.updatedAt, status: statuses[booking.status] });
    }
    if (!page.pagination.hasMore) break;
    const cursor = page.pagination.nextCursor;
    if (typeof cursor !== 'string' || !cursor || cursors.has(cursor)) throw new Error('Invalid Cal.com pagination; no export written.');
    cursors.add(cursor);
    url.searchParams.set('cursor', cursor);
  }
  reconcile(records, from, to);
  return records;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const [, , from, to, output] = process.argv;
  try {
    if (!output) throw new Error('Usage: node --env-file=.env.local scripts/import-cal-bookings.js FROM TO OUTPUT.json');
    const records = await importCalBookings(process.env.CALCOM_API_KEY, from, to);
    await writeFile(output, `${JSON.stringify(records, null, 2)}\n`, { mode: 0o600, flag: 'wx' });
    console.log(`Exported ${records.length} booking records. Existing files are never overwritten.`);
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
