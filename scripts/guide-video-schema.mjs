// Adds a VideoObject and a visible chapter list to every guide that embeds a walkthrough video.
// Models read the text around a video, not the video itself, so the chapters go on the page as links.
// Idempotent: run `node scripts/guide-video-schema.mjs` after adding a guide; src/guides.test.js fails until you do.
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { uploads } from '../src/uploads-snapshot.js';
import { videoDescription } from '../src/archive.js';

const site = 'https://www.ai-automation-station.com';
const dir = new URL('../public/guides/', import.meta.url);
const byId = new Map(uploads.map(video => [video.id, video]));
const escape = text => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const clock = seconds => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;

const videoSchema = video => ({
  '@context': 'https://schema.org', '@type': 'VideoObject', '@id': `${site}/watch/${video.id}#video`,
  name: video.title, description: videoDescription(video),
  thumbnailUrl: [`https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`],
  uploadDate: video.published, embedUrl: `https://www.youtube-nocookie.com/embed/${video.id}`, url: `${site}/watch/${video.id}`,
  inLanguage: 'en',
  author: { '@type': 'Person', '@id': `${site}/#mike`, name: 'Mike Holp', url: `${site}/about.html` },
  publisher: { '@type': 'Organization', '@id': `${site}/#org`, name: 'AI Automation Station', url: `${site}/` },
});

const chapterList = video => `<ul class="video-chapters" aria-label="Chapters in ${escape(video.title)}">${video.chapters.map(({ seconds, label }) => `<li><a href="https://www.youtube.com/watch?v=${video.id}&amp;t=${seconds}s">${clock(seconds)}</a> ${escape(label)}</li>`).join('')}</ul>`;

let changed = 0;
for (const file of (await readdir(dir)).filter(name => name.endsWith('.html'))) {
  const path = new URL(file, dir);
  let html = await readFile(path, 'utf8');
  const ids = [...html.matchAll(/<figure class="video"><a class="player" href="https:\/\/www\.youtube\.com\/watch\?v=([\w-]{11})"/g)].map(match => match[1]);
  const before = html;
  for (const id of ids) {
    const video = byId.get(id);
    if (!video) continue;
    if (!html.includes(`"@id":"${site}/watch/${id}#video"`)) {
      html = html.replace('</head>', `<script type="application/ld+json">${JSON.stringify(videoSchema(video))}</script>\n</head>`);
    }
    if (video.chapters?.length >= 3 && !html.includes(`aria-label="Chapters in ${escape(video.title)}"`)) {
      html = html.replace(new RegExp(`(<figure class="video"><a class="player" href="https://www\\.youtube\\.com/watch\\?v=${id}"[\\s\\S]*?</figure>)`), `$1\n${chapterList(video)}`);
    }
  }
  if (html !== before) { await writeFile(path, html); changed++; }
}
console.log(`patched ${changed} guides`);
