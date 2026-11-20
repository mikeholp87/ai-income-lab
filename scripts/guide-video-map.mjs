// Writes src/guide-video-map.json: video id → the one guide that embeds it as its only player.
// A watch page whose video has such a guide points its canonical at the guide, which also carries the video in
// the video sitemap. Strict on purpose: the guide's player must be this video, the guide must embed no other
// player, and no other guide may embed it. Guides that only mention or link a video do not count.
// Usage: node scripts/guide-video-map.mjs   (src/guide-video-map.test.js fails until the file matches the guides)
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const title = html => (html.match(/<h1[^>]*>([^]*?)<\/h1>/)?.[1] ?? '').replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').trim();
const playerIds = html => [...new Set([...html.matchAll(/<figure class="video"><a class="player" href="https:\/\/www\.youtube\.com\/watch\?v=([\w-]{11})"/g)].map(match => match[1]))];

// guides: [[path, html]] → { id: [path, guide title] } for strict one-to-one pairs, sorted by id for a stable diff.
export function strictGuideVideos(guides) {
  const byVideo = new Map();
  for (const [path, html] of guides) {
    const ids = playerIds(html);
    for (const id of ids) byVideo.set(id, [...(byVideo.get(id) ?? []), [path, ids.length, title(html)]]);
  }
  const pairs = [...byVideo].filter(([, list]) => list.length === 1 && list[0][1] === 1).map(([id, [[path, , name]]]) => [id, [path, name]]);
  return Object.fromEntries(pairs.sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0)));
}

export const readGuides = (dir = new URL('../public/guides/', import.meta.url)) => readdirSync(dir).filter(file => file.endsWith('.html')).sort()
  .map(file => [`/guides/${file}`, readFileSync(new URL(file, dir), 'utf8')]);

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const map = strictGuideVideos(readGuides());
  writeFileSync(new URL('../src/guide-video-map.json', import.meta.url), `${JSON.stringify(map, null, 1)}\n`);
  console.log(`mapped ${Object.keys(map).length} videos`);
}
