import { pageCount, parseUploads, renderArchive, renderWatch, renderVideoSitemap } from '../src/archive.js';
import { channelUrl, longFormPlaylistId } from '../src/youtube.js';

const day = 86400000;
// Same idea as /api/youtube: the instance keeps the video list for a day, so cache-busting URLs cost no quota.
let memo = { at: 0, videos: null };

// Every long-form upload: one playlistItems call (1 quota unit) per 50 videos.
async function fetchUploads(key) {
  const pages = [];
  let pageToken = '';
  do {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,status,contentDetails&maxResults=50&playlistId=${longFormPlaylistId}&key=${key}${pageToken && `&pageToken=${pageToken}`}`, { signal: AbortSignal.timeout(8000) });
    if (!response.ok) throw new Error(`playlistItems ${response.status}`);
    const page = await response.json();
    pages.push(page);
    pageToken = page.nextPageToken ?? '';
  } while (pageToken && pages.length < 20);
  const videos = parseUploads(pages).filter(video => /^[\w-]{11}$/.test(video.id) && Number.isFinite(Date.parse(video.published)));
  // Confirm embedding is permitted before linking a watch page or listing it in the sitemap.
  for (let index = 0; index < videos.length; index += 50) {
    const batch = videos.slice(index, index + 50);
    const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=status&id=${batch.map(video => video.id).join(',')}&key=${key}`, { signal: AbortSignal.timeout(8000) });
    if (!response.ok) throw new Error(`video status ${response.status}`);
    const data = await response.json();
    const publicIds = new Set((data.items ?? []).filter(item => item.status?.privacyStatus === 'public').map(item => item.id));
    const embeddable = new Set((data.items ?? []).filter(item => publicIds.has(item.id) && item.status?.embeddable).map(item => item.id));
    for (const video of batch) {
      video.public = publicIds.has(video.id);
      video.embeddable = embeddable.has(video.id);
    }
  }
  return videos.filter(video => video.public);
}

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
    return video ? html(renderWatch(video), 200, cache) : notFound();
  }
  if (page > pageCount(memo.videos)) return notFound();
  return html(renderArchive(memo.videos, page), 200, cache);
}

// Link checkers and some crawlers send HEAD; answer with GET's status and headers, no body.
export async function HEAD(request) {
  const response = await GET(request);
  return new Response(null, { status: response.status, headers: response.headers });
}
