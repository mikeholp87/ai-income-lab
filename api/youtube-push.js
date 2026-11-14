// YouTube WebSub callback. Google's hub (pubsubhubbub.appspot.com) pushes the channel feed here
// minutes after an upload; a video that isn't in this deployment's snapshot triggers the Vercel
// deploy hook, so rss.xml, search and IndexNow update without waiting for the nightly check.
// api/new-video-check.js renews the subscription daily. Needs WEBSUB_SECRET and DEPLOY_HOOK_URL.
import { createHmac, timingSafeEqual } from 'node:crypto';
import { uploads } from '../src/uploads-snapshot.js';
import { feedUrl } from '../src/youtube.js';

const baseCallbackUrl = 'https://www.ai-automation-station.com/api/youtube-push';
export const hubUrl = 'https://pubsubhubbub.appspot.com/subscribe';
const leaseSeconds = 864000; // 10 days; the daily renewal keeps it alive with room to spare

// The hub accepts subscription requests for any callback from anyone, so a key only we can derive goes in the URL.
// Without it, anyone could get the hub to drop the subscription or swap in their own signing secret.
const callbackKey = secret => createHmac('sha256', secret).update('websub-callback').digest('hex').slice(0, 32);
export const callbackUrl = secret => `${baseCallbackUrl}?k=${callbackKey(secret)}`;

// Ask the hub to (re)subscribe; it confirms asynchronously with a GET to the callback.
export async function subscribe(secret = process.env.WEBSUB_SECRET) {
  if (!secret) return 'WEBSUB_SECRET is not set';
  const body = new URLSearchParams({ 'hub.callback': callbackUrl(secret), 'hub.topic': feedUrl, 'hub.mode': 'subscribe', 'hub.verify': 'async', 'hub.secret': secret, 'hub.lease_seconds': String(leaseSeconds) });
  const response = await fetch(hubUrl, { method: 'POST', body, signal: AbortSignal.timeout(8000) }).catch(() => null);
  return response ? response.status : 'hub unreachable';
}

// The hub verifies a subscription by asking us to echo its challenge: our own subscribe requests for our channel feed only.
export function GET(request) {
  const params = new URL(request.url).searchParams;
  const secret = process.env.WEBSUB_SECRET;
  const challenge = params.get('hub.challenge');
  const keyed = secret && params.get('k') === callbackKey(secret);
  if (!keyed || params.get('hub.topic') !== feedUrl || params.get('hub.mode') !== 'subscribe' || !challenge) return new Response('Not found', { status: 404 });
  return new Response(challenge, { headers: { 'Content-Type': 'text/plain' } });
}

const signed = (body, header, secret) => {
  const expected = Buffer.from(`sha1=${createHmac('sha1', secret).update(body).digest('hex')}`);
  const given = Buffer.from(header ?? '');
  return given.length === expected.length && timingSafeEqual(given, expected);
};

export async function POST(request) {
  const body = await request.text();
  const secret = process.env.WEBSUB_SECRET;
  // WebSub: acknowledge every delivery with 2xx, but act only on correctly signed ones.
  if (!secret || !signed(body, request.headers.get('x-hub-signature'), secret)) return new Response(null, { status: 202 });
  const id = body.match(/<yt:videoId>([\w-]{11})<\/yt:videoId>/)?.[1];
  // Deletions carry no videoId; edits to videos already deployed need no rebuild.
  if (!id || uploads.some(video => video.id === id)) return Response.json({ rebuild: false, id: id ?? null });
  // ponytail: Shorts and repeat notifications for one upload can each start a ~30s build; add a
  // long-form check or a debounce if that ever becomes noisy.
  if (!process.env.DEPLOY_HOOK_URL) return Response.json({ rebuild: false, id, error: 'DEPLOY_HOOK_URL is not set' });
  const hook = await fetch(process.env.DEPLOY_HOOK_URL, { method: 'POST', signal: AbortSignal.timeout(8000) }).catch(() => null);
  return Response.json({ rebuild: Boolean(hook?.ok), id });
}
