import { fetchUploads, pageCount, renderArchive, renderWatch, renderVideoSitemap } from '../src/archive.js';
import { uploads, uploadsUpdatedAt } from '../src/uploads-snapshot.js';
import { channelUrl } from '../src/youtube.js';

const day = 86400000;
// Same idea as /api/youtube: the instance keeps the video list for a day, so cache-busting URLs cost no quota.
// A cold instance starts from the build's snapshot, so a YouTube outage serves the last build's list instead of a 503.
let memo = { at: uploadsUpdatedAt, videos: uploads.length ? uploads : null };

const html = (body, status, cache) => new Response(body, { status, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': cache } });
const message = (title, text) => `<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title}</title><p style="font:16px system-ui;padding:24px">${text}</p>`;
const notFound = () => html(message('Page not found', 'That page of videos doesn’t exist. <a href="/videos">See the newest videos</a>.'), 404, 'no-store');

// Archive, watch pages and video sitemap share the same daily upload cache.
// Keeps the last good list on API errors.
export async function GET(request) {
  const url = new URL(request.url);
  const videoId = url.pathname.match(/^\/watch\/([^/]+)\/?$/)?.[1] ?? url.searchParams.get('video');
  const sitemap = url.pathname === '/video-sitemap.xml' || url.searchParams.get('sitemap') === 'videos';
  if (videoId !== null && !/^[\w-]{11}$/.test(videoId)) return notFound();
  // The page arrives in the original path or, after the rewrite, as ?page=.
  const requested = url.pathname.match(/^\/videos\/([^/]+)\/?$/)?.[1] ?? url.searchParams.get('page');
  if (requested !== null && !/^[1-9]\d{0,3}$/.test(requested)) return notFound();
  const page = Number(requested ?? 1);
  if (requested !== null && page === 1) return Response.redirect(`${url.origin}/videos`, 308);

  if (!memo.videos || Date.now() - memo.at > day) {
    const key = process.env.YOUTUBE_API_KEY;
    const videos = key ? await fetchUploads(key).catch(error => { console.error('[videos]', error.message); return null; }) : null;
    if (videos?.length) memo = { at: Date.now(), videos };
  }
  if (!memo.videos) return html(message('Videos unavailable', `The video archive didn’t load. <a href="${channelUrl}/videos">Watch every video on YouTube</a>.`), 503, 'no-store');
  const cache = 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400';
  if (sitemap) return new Response(renderVideoSitemap(memo.videos), { headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': cache } });
  if (videoId !== null) {
    const video = memo.videos.find(video => video.id === videoId && video.embeddable);
    // ?t=98 comes from a chapter link or a Key Moments result; cue the player there.
    const start = /^\d{1,5}$/.test(url.searchParams.get('t') ?? '') ? Number(url.searchParams.get('t')) : 0;
    return video ? html(renderWatch(video, { videos: memo.videos, start }), 200, cache) : notFound();
  }
  if (page > pageCount(memo.videos)) return notFound();
  return html(renderArchive(memo.videos, page), 200, cache);
}

// Link checkers and some crawlers send HEAD; answer with GET's status and headers, no body.
export async function HEAD(request) {
  const response = await GET(request);
  return new Response(null, { status: response.status, headers: response.headers });
}
