import { channelId, feedUrl, longFormPlaylistId, parseApi, parseChannel, parseFeed } from '../src/youtube.js';

const day = 86400000;
// Fluid Compute reuses instances, so this survives between requests. Cache-busting query strings
// skip the CDN but not this, which keeps them from draining the API quota.
let memo = { at: 0, feed: null };
let refresh;
let retryAt = 0;
let statuses = [];

const cached = feed => Response.json(feed, { headers: { 'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400' } });

// Data API when YOUTUBE_API_KEY is set (3 quota units per call), otherwise the public RSS feed.
// Only the Data API has channel counts; without them the page keeps its built-in numbers.
async function fetchFeed(statuses) {
  const key = process.env.YOUTUBE_API_KEY;
  if (key) {
    const api = 'https://www.googleapis.com/youtube/v3';
    const [response, channel] = await Promise.all([
      fetch(`${api}/playlistItems?part=snippet&maxResults=7&playlistId=${longFormPlaylistId}&key=${key}`, { signal: AbortSignal.timeout(8000) }).catch(error => ({ ok: false, status: error.message })),
      fetch(`${api}/channels?part=statistics&id=${channelId}&key=${key}`, { signal: AbortSignal.timeout(8000) }).then(response => response.ok ? response.json() : null).then(parseChannel).catch(() => null),
    ]);
    if (response.ok) {
      const playlist = await response.json();
      const ids = playlist.items.map(item => item.snippet.resourceId.videoId).join(',');
      // videos.list costs 1 unit whatever parts are requested.
      const details = await fetch(`${api}/videos?part=statistics,contentDetails,status&id=${ids}&key=${key}`, { signal: AbortSignal.timeout(8000) }).then(response => response.ok ? response.json() : {}).catch(() => ({}));
      return { videos: parseApi(playlist, details), channel };
    }
    statuses.push(`api ${response.status}`);
  }

  // The RSS endpoint randomly answers 404/500 (~1 in 4 requests) and can refuse cloud IPs; retry a few times.
  for (let attempt = 0; attempt < 4; attempt++) {
    const response = await fetch(feedUrl, { signal: AbortSignal.timeout(5000) }).catch(error => ({ ok: false, status: error.message }));
    if (response.ok) return { videos: parseFeed(await response.text()).slice(0, 7), channel: null };
    statuses.push(response.status);
  }
  return null;
}

// GET /api/youtube → latest long-form uploads and channel counts as JSON, refreshed once a day to save API quota.
export async function GET() {
  if (memo.feed && Date.now() - memo.at < day) return cached(memo.feed);
  if (Date.now() >= retryAt) {
    refresh ??= fetchFeed(statuses = [])
      .catch(error => { statuses.push(error.message); return null; })
      .then(feed => {
        if (feed) memo = { at: Date.now(), feed };
        else retryAt = Date.now() + 300000;
      })
      .finally(() => { refresh = null; });
    await refresh;
  }
  // A day-old feed beats an error page when both sources are down.
  if (memo.feed) return cached(memo.feed);
  return Response.json({ error: 'YouTube feed unavailable', statuses }, { status: 502, headers: { 'Cache-Control': 'no-store' } });
}
