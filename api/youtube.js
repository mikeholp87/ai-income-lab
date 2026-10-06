import { feedUrl, longFormPlaylistId, parseApi, parseFeed } from '../src/youtube.js';

const cached = videos => Response.json({ videos }, { headers: { 'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400' } });

// GET /api/youtube → latest long-form uploads as JSON, CDN-cached for a day so the page refreshes daily.
// With YOUTUBE_API_KEY set it uses the Data API (2 quota units per refresh); otherwise the public RSS feed.
export async function GET() {
  const statuses = [];
  const key = process.env.YOUTUBE_API_KEY;
  if (key) {
    const api = 'https://www.googleapis.com/youtube/v3';
    const response = await fetch(`${api}/playlistItems?part=snippet&maxResults=7&playlistId=${longFormPlaylistId}&key=${key}`).catch(error => ({ ok: false, status: error.message }));
    if (response.ok) {
      const playlist = await response.json();
      const ids = playlist.items.map(item => item.snippet.resourceId.videoId).join(',');
      const stats = await fetch(`${api}/videos?part=statistics&id=${ids}&key=${key}`).then(response => response.ok ? response.json() : {}).catch(() => ({}));
      return cached(parseApi(playlist, stats));
    }
    statuses.push(`api ${response.status}`);
  }

  // The RSS endpoint randomly answers 404/500 (~1 in 4 requests) and can refuse cloud IPs; retry a few times.
  for (let attempt = 0; attempt < 4; attempt++) {
    const response = await fetch(feedUrl).catch(error => ({ ok: false, status: error.message }));
    if (response.ok) return cached(parseFeed(await response.text()).slice(0, 7));
    statuses.push(response.status);
  }
  return Response.json({ error: 'YouTube feed unavailable', statuses }, { status: 502, headers: { 'Cache-Control': 'no-store' } });
}
