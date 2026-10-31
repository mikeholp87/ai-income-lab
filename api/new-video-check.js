// Daily Vercel cron (vercel.json). If YouTube's newest long-form upload isn't in this deployment's
// snapshot, call the Vercel deploy hook. The rebuild refreshes the snapshot, rss.xml, the search
// index and the IndexNow ping, so a new video reaches the feed within a day without a git push.
// Needs CRON_SECRET (Vercel sends it as a Bearer token on cron calls) and DEPLOY_HOOK_URL.
// ponytail: Hobby crons run once a day; YouTube WebSub push would make this near-instant.
import { uploads } from '../src/uploads-snapshot.js';
import { longFormPlaylistId } from '../src/youtube.js';

// The public playlist feed costs no API quota; "UULF" lists long-form uploads only, newest first.
const feedUrl = `https://www.youtube.com/feeds/videos.xml?playlist_id=${longFormPlaylistId}`;

export const newestUploadId = xml => xml.match(/<yt:videoId>([\w-]{11})<\/yt:videoId>/)?.[1] ?? null;

export async function GET(request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get('authorization') !== `Bearer ${secret}`) return new Response('Unauthorized', { status: 401 });
  const feed = await fetch(feedUrl, { signal: AbortSignal.timeout(8000) }).catch(() => null);
  if (!feed?.ok) return Response.json({ error: `YouTube feed ${feed?.status ?? 'unreachable'}` }, { status: 502 });
  const newest = newestUploadId(await feed.text());
  if (!newest) return Response.json({ error: 'No video in the YouTube feed' }, { status: 502 });
  if (uploads.some(video => video.id === newest)) return Response.json({ rebuild: false, newest });
  // ponytail: if the build can't fetch uploads it keeps the old snapshot, so this retries the next day.
  if (!process.env.DEPLOY_HOOK_URL) return Response.json({ error: 'DEPLOY_HOOK_URL is not set', newest }, { status: 500 });
  const hook = await fetch(process.env.DEPLOY_HOOK_URL, { method: 'POST', signal: AbortSignal.timeout(8000) }).catch(() => null);
  return Response.json({ rebuild: Boolean(hook?.ok), newest }, { status: hook?.ok ? 202 : 502 });
}
