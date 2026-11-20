// "From the video": two to four timestamped lines from a guide's own walkthrough, added to the guide at build time.
// Only a guide that is its video's canonical page (src/guide-video-map.json) gets one, and only when
// src/guide-highlights.json has lines for that video. Each line is taken from the transcript the watch page shows
// (src/transcripts.json after fixTerms), trimmed only of leading filler words and "um"/"uh", and picked because the
// guide does not already say it. Times come from YouTube's word-timed captions for the same video.
import highlights from './guide-highlights.json' with { type: 'json' };
import { videoGuide } from './archive.js';

const escape = text => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const clock = seconds => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
const players = html => [...html.matchAll(/<figure class="video"><a class="player" href="https:\/\/www\.youtube\.com\/watch\?v=([\w-]{11})"/g)].map(match => match[1]);

export const guideHighlights = highlights;

export function highlightSection(id, items) {
  const lines = items.map(({ seconds, quote }) => `<li><a href="https://www.youtube.com/watch?v=${id}&amp;t=${seconds}s">${clock(seconds)}</a> <q>${escape(quote)}</q></li>`).join('');
  return `<section aria-labelledby="from-the-video"><h2 id="from-the-video">From the video</h2>
<p>Lines from the video's transcript that this guide does not cover, lightly trimmed. Each time opens the video at that point. <a href="/watch/${id}#transcript">Read the full transcript</a>.</p>
<ul class="video-quotes">${lines}</ul></section>`;
}

// path is the guide's site path (/guides/slug.html). Placed right after the guide's player and its chapter list.
export function addGuideHighlights(html, path) {
  const ids = players(html);
  if (ids.length !== 1 || html.includes('id="from-the-video"')) return html;
  const [id] = ids;
  const items = highlights[id];
  if (!items?.length || videoGuide(id)?.[0] !== path) return html;
  const figure = new RegExp(`<figure class="video"><a class="player" href="https://www\\.youtube\\.com/watch\\?v=${id}"[\\s\\S]*?</figure>(?:\\s*<ul class="video-chapters"[^>]*>[\\s\\S]*?</ul>)?`);
  return html.replace(figure, block => `${block}\n${highlightSection(id, items)}`);
}
