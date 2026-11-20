// Adds a VideoObject and a visible chapter list to every guide that embeds a walkthrough video.
// Models read the text around a video, not the video itself, so the chapters go on the page as links.
// Idempotent: run `node scripts/guide-video-schema.mjs` after adding a guide; src/guides.test.js fails until you do.
// Existing guide VideoObjects are rebuilt in place, so thumbnail or duration fixes reach every guide on the next run.
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { uploads } from '../src/uploads-snapshot.js';
import { schemaThumbnails, videoDescription, videoGuide } from '../src/archive.js';
import { durationSeconds } from '../src/youtube.js';

const site = 'https://www.ai-automation-station.com';
const dir = new URL('../public/guides/', import.meta.url);
const byId = new Map(uploads.map(video => [video.id, video]));
const escape = text => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const clock = seconds => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;

// The guide that is this video's canonical page (src/guide-video-map.json) names itself as the video's page.
// Any other guide showing the video points at the self-canonical watch page.
const videoPage = (video, path) => (path && videoGuide(video.id)?.[0] === path ? `${site}${path}` : `${site}/watch/${video.id}`);
const videoSchema = (video, path) => ({
  '@context': 'https://schema.org', '@type': 'VideoObject', '@id': `${videoPage(video, path)}#video`,
  name: video.title, description: videoDescription(video),
  // Same thumbnails as the watch page: maxresdefault only for uploads that have one, then hqdefault.
  thumbnailUrl: schemaThumbnails(video),
  uploadDate: video.published, embedUrl: `https://www.youtube-nocookie.com/embed/${video.id}`, url: videoPage(video, path),
  inLanguage: 'en',
  // ISO 8601 length from the uploads snapshot (e.g. PT11M15S), as on the watch page.
  ...(durationSeconds(video.duration) && { duration: video.duration }),
  author: { '@type': 'Person', '@id': `${site}/#mike`, name: 'Mike Holp', url: `${site}/about.html` },
  publisher: { '@type': 'Organization', '@id': `${site}/#org`, name: 'AI Automation Station', url: `${site}/` },
});
const schemaTag = (video, path) => `<script type="application/ld+json">${JSON.stringify(videoSchema(video, path)).replace(/</g, '\\u003c')}</script>`;
// Existing VideoObjects are found by parsing each JSON-LD block, so key order or whitespace never causes a duplicate.
const jsonLdBlocks = /<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/g;
const parse = text => { try { return JSON.parse(text); } catch { return null; } };
// Matches the video's block under either id, so a guide that becomes the canonical page is rebuilt, not duplicated.
const isVideoSchema = (text, video, path) => {
  const data = parse(text);
  return data?.['@type'] === 'VideoObject' && [`${site}/watch/${video.id}#video`, `${videoPage(video, path)}#video`].includes(data['@id']);
};
// Rebuilds the first matching block in place and drops any further copies; adds one before </head> if none exists.
function upsertSchema(html, video, path) {
  let found = false;
  const next = html.replace(jsonLdBlocks, (block, text) => {
    if (!isVideoSchema(text, video, path)) return block;
    if (found) return '';
    found = true;
    return schemaTag(video, path);
  });
  return found ? next : html.replace('</head>', () => `${schemaTag(video, path)}\n</head>`);
}

const chapterList = video => `<ul class="video-chapters" aria-label="Chapters in ${escape(video.title)}">${video.chapters.map(({ seconds, label }) => `<li><a href="https://www.youtube.com/watch?v=${video.id}&amp;t=${seconds}s">${clock(seconds)}</a> ${escape(label)}</li>`).join('')}</ul>`;

// Pure transform for one guide's HTML: adds or rebuilds each embedded video's VideoObject and adds its chapter list.
// `videos` maps video id to upload (defaults to the uploads snapshot). `path` is the guide's site path
// (/guides/slug.html), used to tell whether this guide is the video's canonical page.
export function patchGuide(html, videos = byId, path) {
  const ids = [...html.matchAll(/<figure class="video"><a class="player" href="https:\/\/www\.youtube\.com\/watch\?v=([\w-]{11})"/g)].map(match => match[1]);
  for (const id of ids) {
    const video = videos.get(id);
    if (!video) continue;
    html = upsertSchema(html, video, path);
    if (video.chapters?.length >= 3 && !html.includes(`aria-label="Chapters in ${escape(video.title)}"`)) {
      // Function replacements throughout, so `$` in a title or label is never read as a pattern.
      html = html.replace(new RegExp(`<figure class="video"><a class="player" href="https://www\\.youtube\\.com/watch\\?v=${id}"[\\s\\S]*?</figure>`), figure => `${figure}\n${chapterList(video)}`);
    }
  }
  return html;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  let changed = 0;
  for (const file of (await readdir(dir)).filter(name => name.endsWith('.html'))) {
    const path = new URL(file, dir);
    const before = await readFile(path, 'utf8');
    const html = patchGuide(before, byId, `/guides/${file}`);
    if (html !== before) { await writeFile(path, html); changed++; }
  }
  console.log(`patched ${changed} guides`);
}
