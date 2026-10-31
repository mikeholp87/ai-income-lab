import { Supermemory } from 'supermemory';
import { namespace, searchRows } from '../src/site-memory.js';

export const runtime = 'nodejs';

// Clients send the query lowercased and trimmed, so the CDN serves repeats without another Supermemory call.
export const normalizeQuery = text => String(text ?? '').toLowerCase().replace(/\s+/g, ' ').trim().slice(0, 120);
const noStore = { 'Cache-Control': 'no-store' };

// GET /api/search?q=… searches what's said in the videos and written in the guides.
// Rows match /search-index.json: [kind, title, url, passage].
export async function GET(request) {
  const query = normalizeQuery(new URL(request.url).searchParams.get('q'));
  if (query.length < 3) return Response.json([], { headers: noStore });
  if (!process.env.SUPERMEMORY_API_KEY) return Response.json({ error: 'Search inside videos is not configured.' }, { status: 503, headers: noStore });
  try {
    const { results } = await new Supermemory().search(namespace, { query, searchMode: 'chunks', limit: 20, threshold: 0.5 }, { timeoutInSeconds: 8, maxRetries: 1 });
    return Response.json(searchRows(results ?? [], query).slice(0, 8), { headers: { 'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800' } });
  } catch (error) {
    console.error('Supermemory search failed', error.statusCode ?? '', error.message);
    return Response.json({ error: 'Search inside videos is unavailable right now.' }, { status: 502, headers: noStore });
  }
}
