import { feedUrl, parseFeed } from '../src/youtube.js';

// GET /api/youtube → latest long-form uploads as JSON.
// The CDN caches for a day, so the page picks up new uploads daily without an API key.
export async function GET() {
  // YouTube's feed endpoint randomly answers 404/500 (~1 in 4 requests); retries almost always land.
  for (let attempt = 0; attempt < 4; attempt++) {
    const response = await fetch(feedUrl).catch(() => null);
    if (response?.ok) return Response.json({ videos: parseFeed(await response.text()).slice(0, 7) }, { headers: { 'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400' } });
  }
  return Response.json({ error: 'YouTube feed unavailable' }, { status: 502, headers: { 'Cache-Control': 'no-store' } });
}
