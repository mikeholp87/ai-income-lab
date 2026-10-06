import { feedUrl, longFormPlaylistId, parseApi, parseFeed } from '../src/youtube.js';

const hour = 3600000;
// Fluid Compute reuses instances, so this survives between requests. Cache-busting query strings
// skip the CDN but not this, which keeps them from draining the API quota.
let memo = { at: 0, videos: null };

const cached = videos => Response.json({ videos }, { headers: { 'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400' } });

// Data API when YOUTUBE_API_KEY is set (2 quota units per call), otherwise the public RSS feed.
async function fetchVideos(statuses) {
  const key = process.env.YOUTUBE_API_KEY;
  if (key) {
    const api = 'https://www.googleapis.com/youtube/v3';
    const response = await fetch(`${api}/playlistItems?part=snippet&maxResults=7&playlistId=${longFormPlaylistId}&key=${key}`).catch(error => ({ ok: false, status: error.message }));
    if (response.ok) {
      const playlist = await response.json();
      const ids = playlist.items.map(item => item.snippet.resourceId.videoId).join(',');
      // videos.list costs 1 unit whatever parts are requested.
      const details = await fetch(`${api}/videos?part=statistics,contentDetails&id=${ids}&key=${key}`).then(response => response.ok ? response.json() : {}).catch(() => ({}));
      return parseApi(playlist, details);
    }
    statuses.push(`api ${response.status}`);
  }

  // The RSS endpoint randomly answers 404/500 (~1 in 4 requests) and can refuse cloud IPs; retry a few times.
  for (let attempt = 0; attempt < 4; attempt++) {
    const response = await fetch(feedUrl).catch(error => ({ ok: false, status: error.message }));
    if (response.ok) return parseFeed(await response.text()).slice(0, 7);
    statuses.push(response.status);
  }
  return null;
}

// GET /api/youtube → latest long-form uploads as JSON, refreshed hourly.
export async function GET() {
  if (memo.videos && Date.now() - memo.at < hour) return cached(memo.videos);
  const statuses = [];
  const videos = await fetchVideos(statuses);
  if (videos) {
    memo = { at: Date.now(), videos };
    return cached(videos);
  }
  // An hour-old list beats an error page when both sources are down.
  if (memo.videos) return cached(memo.videos);
  return Response.json({ error: 'YouTube feed unavailable', statuses }, { status: 502, headers: { 'Cache-Control': 'no-store' } });
}
