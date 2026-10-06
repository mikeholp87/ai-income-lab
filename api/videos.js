import { parseUploads, renderArchive } from '../src/archive.js';
import { channelUrl, longFormPlaylistId } from '../src/youtube.js';

const day = 86400000;
// Same idea as /api/youtube: the instance keeps the page for a day, so cache-busting URLs cost no quota.
let memo = { at: 0, html: null };

// Every long-form upload: one playlistItems call (1 quota unit) per 50 videos.
async function fetchUploads(key) {
  const pages = [];
  let pageToken = '';
  do {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,status,contentDetails&maxResults=50&playlistId=${longFormPlaylistId}&key=${key}${pageToken && `&pageToken=${pageToken}`}`);
    if (!response.ok) throw new Error(`playlistItems ${response.status}`);
    const page = await response.json();
    pages.push(page);
    pageToken = page.nextPageToken ?? '';
  } while (pageToken && pages.length < 20);
  return parseUploads(pages);
}

const html = (body, status, cache) => new Response(body, { status, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': cache } });

// GET /videos (rewritten here) → the full archive as HTML, refreshed once a day. Keeps the last good page on API errors.
export async function GET() {
  if (!memo.html || Date.now() - memo.at > day) {
    const key = process.env.YOUTUBE_API_KEY;
    const videos = key ? await fetchUploads(key).catch(error => { console.error('[videos]', error.message); return null; }) : null;
    if (videos?.length) memo = { at: Date.now(), html: renderArchive(videos) };
  }
  if (memo.html) return html(memo.html, 200, 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400');
  return html(`<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Videos unavailable</title><p style="font:16px system-ui;padding:24px">The video archive didn’t load. <a href="${channelUrl}/videos">Watch every video on YouTube</a>.</p>`, 503, 'no-store');
}
