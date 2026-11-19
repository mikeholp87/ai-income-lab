// Search-visibility report built on the Supermemory index of guides and transcripts (scripts/supermemory-sync.mjs):
//   1. internal links each guide is missing, 2. guides competing for the same search,
//   3. topics the videos cover that no guide does, 4. Search Console queries a different page answers better.
// Writes Markdown for review; it never edits a page.
//   node scripts/seo-report.mjs --gsc /tmp/seo/gsc-query-page.json --out docs/audits/2026-10-31-supermemory-seo-report.md
// The Search Console file is the JSON from the gsc skill's `search-analytics --dimensions query page`.
// Search results are cached in --cache (default /tmp/seo-report-cache.json) so reruns cost nothing.
import { existsSync } from 'node:fs';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { Supermemory } from 'supermemory';
import { snippet } from '../src/archive.js';
import { guideMeta } from '../src/feed.js';
import { namespace, strongMatch } from '../src/site-memory.js';
import { uploads } from '../src/uploads-snapshot.js';
import { videoSummaries } from '../src/video-summaries.js';
import { videoTools } from '../src/video-tools.js';

for (const file of ['.env.local', '.env']) {
  const path = `${import.meta.dirname}/../${file}`;
  if (existsSync(path)) process.loadEnvFile(path);
}
const arg = (name, fallback) => { const at = process.argv.indexOf(`--${name}`); return at > 0 ? process.argv[at + 1] : fallback; };
const gscPath = arg('gsc');
const outPath = arg('out', 'seo-report.md');
const cachePath = arg('cache', '/tmp/seo-report-cache.json');
if (!process.env.SUPERMEMORY_API_KEY) throw new Error('Set SUPERMEMORY_API_KEY in .env.local first.');

const site = 'https://www.ai-automation-station.com';
const client = new Supermemory();
const cache = existsSync(cachePath) ? JSON.parse(await readFile(cachePath, 'utf8')) : {};
let calls = 0;
async function search(query, kind) {
  const key = `${kind ?? 'all'}|${query.toLowerCase()}`;
  if (!cache[key]) {
    calls++;
    const { results = [] } = await client.search(namespace, { query, searchMode: 'chunks', limit: 25, threshold: 0.5, ...(kind ? { filter: { field: 'kind', operator: 'eq', value: kind } } : {}) });
    // Best score per page, keeping the passage that scored it.
    const pages = new Map();
    for (const result of results) {
      const url = result.metadata?.url;
      if (url && !pages.has(url)) pages.set(url, { url, kind: result.metadata.kind, title: result.metadata.title, score: result.similarity ?? 0, passage: snippet(String(result.chunk ?? '').replace(/\s+/g, ' ').trim(), 160) });
    }
    cache[key] = [...pages.values()];
  }
  return cache[key];
}

const decode = text => text.replace(/&amp;/g, '&').replace(/&#39;|&rsquo;/g, '’').replace(/&quot;/g, '"').replace(/<[^>]+>/g, '').trim();
const skipHeading = /^(on this page|faq|sources|keep going|build the next one|when it fails|related|next steps)/i;
const guideFiles = (await readdir('public/guides')).filter(file => file.endsWith('.html'));
const guides = await Promise.all(guideFiles.map(async file => {
  const html = await readFile(`public/guides/${file}`, 'utf8');
  const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? html;
  const meta = guideMeta(html);
  return {
    url: `/guides/${file}`,
    title: meta.title,
    text: decode(main).toLowerCase(),
    headings: [...main.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)].map(match => decode(match[1]).replace(/^\d+\.\s*/, '')).filter(heading => heading && !skipHeading.test(heading)),
    links: new Set([...main.matchAll(/href="(?:https:\/\/www\.ai-automation-station\.com)?(\/(?:guides|watch)\/[^"#?]+)/g)].map(match => match[1])),
  };
}));
const titleOf = new Map([...guides.map(guide => [guide.url, guide.title]), ...uploads.map(video => [`/watch/${video.id}`, video.title])]);
const label = url => `[${titleOf.get(url) ?? url}](${url})`;
const out = [];

// 1. Internal links: pages that answer a guide's own sections but aren't linked from it yet.
// Each section is searched with the guide's topic in front, and only clear matches count: transcripts
// share a lot of generic phrasing ("limits", "test it") that scores in the high 0.6s.
const linkMatch = 0.72;
const topic = title => title.split(/[:?]/)[0].trim();
out.push('## 1. Internal links each guide is missing', '', `Each suggestion is a guide or video that matches one of the guide's sections (score ${linkMatch} or more) but isn't linked from the guide. Add a sentence that links it where that section is, only where it genuinely helps the reader.`, '');
for (const guide of guides) {
  const found = new Map();
  for (const heading of guide.headings.slice(0, 6)) {
    for (const page of await search(`${topic(guide.title)}: ${heading}`)) {
      if (page.url === guide.url || guide.links.has(page.url) || page.score < linkMatch) continue;
      const best = found.get(page.url);
      if (!best || page.score > best.score) found.set(page.url, { ...page, heading });
    }
  }
  const top = [...found.values()].sort((a, b) => b.score - a.score).slice(0, 4);
  if (!top.length) continue;
  out.push(`### ${label(guide.url)}`, '', '| Link to | From the section | Match | Why |', '|---|---|---|---|');
  for (const page of top) out.push(`| ${label(page.url)} | ${page.heading} | ${page.score.toFixed(2)} | ${page.passage.replace(/\|/g, '/')} |`);
  out.push('');
}

// 2. Guides competing for the same search: another guide matches this guide's title almost as well as it does.
out.push('## 2. Guides competing for the same search', '', 'Searching a guide\'s own title, another guide scores within 0.05 of it (or above it). A pair here either needs a clearer split (different search intent, cross-links with distinct anchor text) or one page merged into the other.', '');
const pairs = new Map();
for (const guide of guides) {
  const results = await search(guide.title, 'guide');
  const own = results.find(page => page.url === guide.url)?.score ?? 0;
  for (const page of results) {
    if (page.url === guide.url || page.score < 0.72 || page.score < own - 0.05) continue;
    const key = [guide.url, page.url].sort().join(' ');
    if (!pairs.has(key) || pairs.get(key).score < page.score) pairs.set(key, { a: guide.url, b: page.url, score: page.score, own });
  }
}
const competing = [...pairs.values()].sort((x, y) => y.score - x.score);
if (competing.length) {
  out.push('| Guide | Competes with | Its own match | Other guide\'s match |', '|---|---|---|---|');
  for (const pair of competing) out.push(`| ${label(pair.a)} | ${label(pair.b)} | ${pair.own.toFixed(2)} | ${pair.score.toFixed(2)} |`);
} else out.push('No two guides match the same title closely.');
out.push('');

// 3. Topics the videos cover that no guide does: tools in at least three videos, ranked by their videos' views.
out.push('## 3. Topics your videos cover that no guide does', '', 'Tools that appear in at least three videos, where no guide has the tool in its title or strongly matches a tutorial search for it. Views are the total for those videos, a rough sign of demand. The videos are the source material for a new guide.', '');
const byTool = new Map();
const views = new Map(uploads.map(video => [video.id, video.views ?? 0]));
for (const [id, tools] of [...Object.entries(videoTools), ...Object.entries(videoSummaries).map(([id, brief]) => [id, brief.toolsUsed ?? []])]) {
  for (const raw of tools) {
    const tool = raw.replace(/\s*\(.*\)$/, '').trim();
    if (!byTool.has(tool)) byTool.set(tool, new Set());
    byTool.get(tool).add(id);
  }
}
const gaps = [];
for (const [tool, ids] of byTool) {
  if (ids.size < 3 || /^(youtube|google|chrome|github|terminal|vs code|linux|windows|macos)$/i.test(tool)) continue;
  const best = (await search(`${tool} tutorial: how to set up and use ${tool}`, 'guide'))[0];
  const named = guides.filter(guide => guide.text.includes(tool.toLowerCase())).length;
  if ((best && best.score >= 0.72) || guides.some(guide => guide.title.toLowerCase().includes(tool.toLowerCase()))) continue;
  const total = [...ids].reduce((sum, id) => sum + (views.get(id) ?? 0), 0);
  gaps.push({ tool, count: ids.size, total, best, named, top: [...ids].sort((a, b) => (views.get(b) ?? 0) - (views.get(a) ?? 0)).slice(0, 3) });
}
gaps.sort((a, b) => b.total - a.total);
if (gaps.length) {
  out.push('| Tool | Videos | Views | Guides that mention it | Closest guide | Best source videos |', '|---|---|---|---|---|---|');
  for (const gap of gaps.slice(0, 20)) out.push(`| ${gap.tool} | ${gap.count} | ${gap.total.toLocaleString('en')} | ${gap.named} | ${gap.best ? `${label(gap.best.url)} (${gap.best.score.toFixed(2)})` : 'none'} | ${gap.top.map(id => label(`/watch/${id}`)).join('<br>')} |`);
} else out.push('Every tool that appears in three or more videos already has a closely matching guide.');
out.push('');

// 4. Search Console: queries where Google shows one page but another page answers the query better.
if (gscPath) {
  const { rows = [] } = JSON.parse(await readFile(gscPath, 'utf8'));
  const byQuery = new Map();
  for (const row of rows) {
    const [query, page] = row.keys;
    const entry = byQuery.get(query) ?? { query, impressions: 0, clicks: 0, pages: [] };
    entry.impressions += row.impressions;
    entry.clicks += row.clicks;
    entry.pages.push({ url: page.replace(site, '') || '/', position: row.position, impressions: row.impressions });
    byQuery.set(query, entry);
  }
  const queries = [...byQuery.values()].filter(entry => entry.impressions >= 2 && !/mike holp/i.test(entry.query)).sort((a, b) => b.impressions - a.impressions).slice(0, 40);
  out.push('## 4. Search Console queries a different page answers better', '', `From ${rows.length} query and page rows. For each query with at least two impressions: the page Google shows, its average position, and the page on this site that best matches the query by content.`, '');
  out.push('| Query | Impressions | Google shows (position) | Best match by content | Suggested fix |', '|---|---|---|---|---|');
  for (const entry of queries) {
    const shown = entry.pages.sort((a, b) => b.impressions - a.impressions)[0];
    const best = (await search(entry.query))[0];
    let fix;
    if (!best || best.score < strongMatch) fix = 'No page answers this well: a gap, or a query to ignore.';
    else if (best.url === shown.url) fix = shown.position > 10 ? 'Right page, ranking low: work the query into its title, description or a section heading.' : 'Right page on page one: improve the title and description for clicks.';
    else fix = `Link ${label(shown.url)} to ${label(best.url)} using the query as anchor text, or make the shown page answer it.`;
    out.push(`| ${entry.query.replace(/\|/g, '/')} | ${entry.impressions} | ${label(shown.url)} (${shown.position.toFixed(0)}) | ${best ? `${label(best.url)} (${best.score.toFixed(2)})` : 'none'} | ${fix} |`);
  }
  out.push('');
}

await writeFile(cachePath, JSON.stringify(cache));
const date = new Date().toISOString().slice(0, 10);
await writeFile(outPath, `# Search visibility report from Supermemory, ${date}\n\nGenerated by \`scripts/seo-report.mjs\` from the Supermemory index of ${guides.length} guides and ${uploads.length} video transcripts. Match scores are semantic similarity (0 to 1); ${strongMatch} or more is a strong match. These are suggestions to review, not edits.\n\n${out.join('\n')}`);
console.log(`Wrote ${outPath}: ${calls} new searches, ${Object.keys(cache).length} cached.`);
