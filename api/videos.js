import { fetchUploads, pageCount, renderArchive, renderWatch, renderVideoSitemap, sponsoredVideos } from '../src/archive.js';
import { uploads, uploadsUpdatedAt } from '../src/uploads-snapshot.js';
import { channelUrl, longFormPlaylistId } from '../src/youtube.js';
import { topicBySlug } from '../src/topics.js';
import { readingCss } from '../src/asset-version.js';

const day = 86400000;
// Same idea as /api/youtube: the instance keeps the video list for a day, so cache-busting URLs cost no quota.
// A cold instance starts from the build's snapshot, so a YouTube outage serves the last build's list instead of a 503.
let memo = { at: uploadsUpdatedAt, videos: uploads.length ? uploads : null };
let refresh;
let retryAt = 0;
// A brand-new upload can reach the homepage feed (/api/youtube) before this inventory knows it.
// An unknown watch id triggers at most one early refresh per 10 minutes per instance, counted from instance start
// so a flood of junk ids cannot make every cold instance spend ~10 quota units straight away.
const earlyRefreshGap = 600000;
let attemptedAt = Date.now();
// Unknown-id answers (404 or the YouTube redirect) are cached briefly at the CDN so repeats never reach the function.
const unknownCache = 'public, max-age=0, s-maxage=600';
// The homepage feed (/api/youtube) and this archive are separate functions with separate caches. Without a probe the
// archive kept a list up to a day old (plus a day of CDN staleness), so a new upload led the homepage hero but was
// missing from /videos. Once an hour, one playlistItems call (1 quota unit) checks the newest upload; an unknown id
// triggers the full refresh.
const probeGap = 3600000;
let probedAt = Date.now(); // Like attemptedAt: a cold instance serves its snapshot and probes an hour later, so new instances cannot burn quota.
async function newestUploadId(key) {
  const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=1&playlistId=${longFormPlaylistId}&key=${key}`, { signal: AbortSignal.timeout(5000) });
  if (!response.ok) return null;
  return (await response.json()).items?.[0]?.snippet?.resourceId?.videoId ?? null;
}

function refreshUploads() {
  attemptedAt = probedAt = Date.now();
  const key = process.env.YOUTUBE_API_KEY;
  // Share a bounded refresh; retry failed upstream requests after five minutes.
  refresh ??= (key ? fetchUploads(key) : Promise.resolve(null))
    .then(videos => {
      if (videos?.length) memo = { at: Date.now(), videos };
      else retryAt = Date.now() + 300000;
    })
    .catch(error => { console.error('[videos]', error.message); retryAt = Date.now() + 300000; })
    .finally(() => { refresh = null; });
  return refresh;
}

const html = (body, status, cache) => new Response(body, { status, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': cache } });
const nav = '<a href="/start-here.html">Start here</a><a href="/guides.html">Guides</a><a href="/videos">All videos</a><a href="/search.html">Search</a>';
// Same header and footer as public/404.html.
const message = (title, text) => `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#0a0a0a"><meta name="robots" content="noindex,follow"><title>${title} | Mike Holp</title><link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="${readingCss}"></head><body><a class="skip" href="#content">Skip to content</a><header class="single-line-header"><a href="/">AI Income Lab</a><nav aria-label="Site">${nav}</nav><a class="join" href="https://www.skool.com/ai-automation-station-7346/plans" target="_blank" rel="noreferrer" data-placement="reading_header">Join AI Income Lab ↗</a><details class="nav-mobile"><summary aria-label="Site menu">Menu</summary><nav aria-label="Site menu">${nav}</nav></details></header><main id="content"><p class="meta">${title === 'Page not found' ? '404' : 'Temporarily unavailable'}</p><h1>${title}</h1><p>${text}</p><p><a href="/">Go home</a> · <a href="/guides.html">Read the free guides</a> · <a href="/start-here.html">Choose a first build</a></p></main><footer><a href="/">Home</a><a href="/privacy.html">Privacy</a><a href="/terms.html">Terms</a><a href="mailto:automojic@proton.me">Email support</a></footer></body></html>`;
const notFound = (cache = 'no-store') => html(message('Page not found', 'That page of videos doesn’t exist. <a href="/videos">See the newest videos</a>.'), 404, cache);

// Archive, watch pages and video sitemap share the same daily upload cache.
// Keeps the last good list on API errors.
export async function GET(request) {
  const url = new URL(request.url);
  const videoId = url.pathname.match(/^\/watch\/([^/]+)\/?$/)?.[1] ?? url.searchParams.get('video');
  const sitemap = url.pathname === '/video-sitemap.xml' || url.searchParams.get('sitemap') === 'videos';
  const sponsored = url.searchParams.has('sponsored');
  if (videoId !== null && !/^[\w-]{11}$/.test(videoId)) return notFound();
  // The page arrives in the original path or, after the rewrite, as ?page=.
  const requested = url.pathname.match(/^\/videos\/([^/]+)\/?$/)?.[1] ?? url.searchParams.get('page');
  // /videos/<slug> is a topic page; anything else after /videos/ must be a page number.
  const topic = requested === null ? null : topicBySlug(requested) ?? null;
  if (requested !== null && !topic && !/^[1-9]\d{0,3}$/.test(requested)) return notFound();
  const page = topic ? 1 : Number(requested ?? 1);
  if (requested !== null && !topic && page === 1) return Response.redirect(`${url.origin}/videos`, 308);

  if ((!memo.videos || Date.now() - memo.at > day) && Date.now() >= retryAt) await refreshUploads();
  else if (process.env.YOUTUBE_API_KEY && Date.now() - probedAt >= probeGap && Date.now() >= retryAt) {
    probedAt = Date.now();
    const newest = await newestUploadId(process.env.YOUTUBE_API_KEY).catch(() => null);
    if (newest && !memo.videos.some(video => video.id === newest)) await refreshUploads();
  }
  if (!memo.videos) return html(message('Videos unavailable', `The video archive didn’t load. <a href="${channelUrl}/videos">Watch every video on YouTube</a>.`), 503, 'no-store');
  const cache = 'public, max-age=600, s-maxage=3600, stale-while-revalidate=3600';
  // The homepage swaps in this list, so a newly ticked paid-promotion box shows within a day, no rebuild needed.
  if (sponsored) return Response.json(sponsoredVideos(memo.videos), { headers: { 'Cache-Control': cache } });
  if (sitemap) return new Response(renderVideoSitemap(memo.videos), { headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': cache } });
  if (videoId !== null) {
    const find = () => memo.videos.find(video => video.id === videoId);
    let video = find();
    if (!video && Date.now() - attemptedAt >= earlyRefreshGap && Date.now() >= retryAt) {
      await refreshUploads();
      video = find();
    }
    // ?t=98 comes from a chapter link or a Key Moments result; cue the player there.
    const start = /^\d{1,5}$/.test(url.searchParams.get('t') ?? '') ? Number(url.searchParams.get('t')) : 0;
    if (video?.embeddable) return html(renderWatch(video, { videos: memo.videos, start }), 200, cache);
    // The inventory only lists this channel's public videos. If it was refreshed in the last 10 minutes and still lacks
    // the id, the video is deleted, private or someone else's: 404, never a redirect to an arbitrary YouTube video.
    if (!video && Date.now() - memo.at < earlyRefreshGap) return notFound(unknownCache);
    // No refresh was possible (rate limited, backing off, no key or failed) or embedding is off: send the visitor to
    // YouTube instead of a 404. Temporary, so the watch page takes over once the inventory knows the video.
    return new Response(null, { status: 302, headers: { Location: `https://www.youtube.com/watch?v=${videoId}${start ? `&t=${start}s` : ''}`, 'Cache-Control': unknownCache } });
  }
  // An empty topic would be a thin page; 404 it until a matching video exists.
  if (topic && !memo.videos.some(video => topic.pattern.test(video.title))) return notFound();
  if (page > pageCount(memo.videos)) return notFound();
  return html(renderArchive(memo.videos, page, topic), 200, cache);
}

// Link checkers and some crawlers send HEAD; answer with GET's status and headers, no body.
export async function HEAD(request) {
  const response = await GET(request);
  return new Response(null, { status: response.status, headers: response.headers });
}
