// Daily Vercel cron (vercel.json): calls the Vercel deploy hook every day. The rebuild refreshes the
// YouTube subscriber, view and video counts baked into the pages, plus the uploads snapshot, rss.xml,
// the search index and the IndexNow ping, so a new video reaches the feed within a day without a git push.
// `newUpload` reports whether YouTube's newest long-form upload was missing from this deployment.
// Needs CRON_SECRET (Vercel sends it as a Bearer token on cron calls) and DEPLOY_HOOK_URL.
// ponytail: Hobby crons run once a day; YouTube WebSub push would make new uploads near-instant.
// Each run also renews the YouTube WebSub subscription (api/youtube-push.js), the fast path.
import { uploads } from '../src/uploads-snapshot.js';
import { longFormPlaylistId } from '../src/youtube.js';
import { subscribe } from './youtube-push.js';

// The public playlist feed costs no API quota; "UULF" lists long-form uploads only, newest first.
const feedUrl = `https://www.youtube.com/feeds/videos.xml?playlist_id=${longFormPlaylistId}`;

export const newestUploadId = xml => xml.match(/<yt:videoId>([\w-]{11})<\/yt:videoId>/)?.[1] ?? null;

export async function GET(request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get('authorization') !== `Bearer ${secret}`) return new Response('Unauthorized', { status: 401 });
  // The hub answers 202 when it accepts the request; it then verifies with a GET to the callback.
  const websub = await subscribe();
  const reply = (data, status = 200) => Response.json({ ...data, websub }, { status });
  // The feed only labels the run; the channel counts need the rebuild even when it is down.
  const feed = await fetch(feedUrl, { signal: AbortSignal.timeout(8000) }).catch(() => null);
  const newest = feed?.ok ? newestUploadId(await feed.text()) : null;
  const newUpload = newest ? !uploads.some(video => video.id === newest) : null;
  if (!process.env.DEPLOY_HOOK_URL) return reply({ error: 'DEPLOY_HOOK_URL is not set', newest, newUpload }, 500);
  const hook = await fetch(process.env.DEPLOY_HOOK_URL, { method: 'POST', signal: AbortSignal.timeout(8000) }).catch(() => null);
  return reply({ rebuild: Boolean(hook?.ok), newest, newUpload }, hook?.ok ? 202 : 502);
}
