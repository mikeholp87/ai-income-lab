import { channelId, feedUrl, longFormPlaylistId, parseApi, parseChannel, parseFeed } from '../src/youtube.js';

const hour = 3600000;
// Fluid Compute reuses instances, so this survives between requests. Cache-busting query strings
// skip the CDN but not this, which keeps them from draining the API quota.
let memo = { at: 0, feed: null };

const cached = feed => Response.json(feed, { headers: { 'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400' } });

// Data API when YOUTUBE_API_KEY is set (3 quota units per call), otherwise the public RSS feed.
// Only the Data API has channel counts; without them the page keeps its built-in numbers.
async function fetchFeed(statuses) {
  const key = process.env.YOUTUBE_API_KEY;
  if (key) {
    const api = 'https://www.googleapis.com/youtube/v3';
    const [response, channel] = await Promise.all([
      fetch(`${api}/playlistItems?part=snippet&maxResults=7&playlistId=${longFormPlaylistId}&key=${key}`).catch(error => ({ ok: false, status: error.message })),
      fetch(`${api}/channels?part=statistics&id=${channelId}&key=${key}`).then(response => response.ok ? response.json() : null).then(parseChannel).catch(() => null),
    ]);
    if (response.ok) {
      const playlist = await response.json();
      const ids = playlist.items.map(item => item.snippet.resourceId.videoId).join(',');
      // videos.list costs 1 unit whatever parts are requested.
      const details = await fetch(`${api}/videos?part=statistics,contentDetails&id=${ids}&key=${key}`).then(response => response.ok ? response.json() : {}).catch(() => ({}));
      return { videos: parseApi(playlist, details), channel };
    }
    statuses.push(`api ${response.status}`);
  }

  // The RSS endpoint randomly answers 404/500 (~1 in 4 requests) and can refuse cloud IPs; retry a few times.
  for (let attempt = 0; attempt < 4; attempt++) {
    const response = await fetch(feedUrl).catch(error => ({ ok: false, status: error.message }));
    if (response.ok) return { videos: parseFeed(await response.text()).slice(0, 7), channel: null };
    statuses.push(response.status);
  }
  return null;
}

// GET /api/youtube → latest long-form uploads and channel counts as JSON, refreshed hourly.
export async function GET() {
  if (memo.feed && Date.now() - memo.at < hour) return cached(memo.feed);
  const statuses = [];
  const feed = await fetchFeed(statuses);
  if (feed) {
    memo = { at: Date.now(), feed };
    return cached(feed);
  }
  // An hour-old feed beats an error page when both sources are down.
  if (memo.feed) return cached(memo.feed);
  return Response.json({ error: 'YouTube feed unavailable', statuses }, { status: 502, headers: { 'Cache-Control': 'no-store' } });
}
