// Transcript and guide search through Supermemory. scripts/supermemory-sync.mjs uploads every public video's
// transcript and every guide into one namespace; api/search.js searches it and returns rows shaped like
// /search-index.json: [kind, title, url, description].
import { snippet } from './archive.js';
import { guideMeta } from './feed.js';

export const namespace = 'ai-income-lab';
const site = 'https://www.ai-automation-station.com';

const entities = { amp: '&', lt: '<', gt: '>', quot: '"', '#39': "'", nbsp: ' ', rsquo: '’', lsquo: '‘', ldquo: '“', rdquo: '”', mdash: '—', ndash: '–', hellip: '…' };
export const pageText = html => (html.match(/<main[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? html)
  .replace(/<(script|style|nav|aside|form|figure)[\s\S]*?<\/\1>/g, ' ')
  .replace(/<\/(p|h[1-6]|li|tr|div|section|pre)>/g, '\n')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&(#?\w+);/g, (match, name) => entities[name] ?? match)
  .replace(/[ \t]+/g, ' ')
  .replace(/\s*\n\s*/g, '\n')
  .trim();

// Document IDs are stable, so a rerun of the sync skips anything already uploaded.
export function memoryDocuments(guides, videos, transcripts) {
  const guideDocs = guides.map(({ file, html }) => {
    const meta = guideMeta(html);
    return { id: `guide_${file.replace(/\.html$/, '')}`, content: `${meta.title}\n\n${pageText(html)}`, metadata: { kind: 'guide', title: meta.title, url: meta.url.replace(site, ''), description: meta.description } };
  });
  const videoDocs = videos.filter(video => video.public !== false && transcripts[video.id])
    .map(video => ({ id: `video_${video.id}`, content: `${video.title}\n\n${transcripts[video.id]}`, metadata: { kind: 'video', title: video.title, url: `/watch/${video.id}`, description: snippet(video.summary || '', 200) } }));
  return [...guideDocs, ...videoDocs];
}

// Embedding similarity alone can't tell a rare exact term from noise: nonsense queries score up to about
// 0.61 against these transcripts, and so do real one-word lookups like a port number. A result counts if it
// is a strong semantic match or its passage contains every word of the query.
export const strongMatch = 0.66;

// One row per document, best match first, with the matching passage as the description so the
// reader sees why it came up.
export function searchRows(results, query = '') {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  const seen = new Set();
  const rows = [];
  for (const result of results) {
    const meta = result.metadata ?? {};
    if (!meta.url || seen.has(meta.url)) continue;
    const passage = String(result.chunk ?? result.content ?? result.text ?? '').replace(/\s+/g, ' ').trim();
    const literal = words.length > 0 && words.every(word => passage.toLowerCase().includes(word));
    if ((result.similarity ?? 0) < strongMatch && !literal) continue;
    seen.add(meta.url);
    rows.push([meta.kind === 'guide' ? 'guide' : 'video', meta.title, meta.url, passage ? snippet(passage, 200) : meta.description ?? '']);
  }
  return rows;
}
