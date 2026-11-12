// Builds public/llms-full.txt: llms.txt, pricing.md and every guide's title, URL and quick answer in one file.
// Run `node scripts/llms-full.mjs` after adding or editing a guide; src/guides.test.js fails while a guide is missing from it.
import { readdir, readFile, writeFile } from 'node:fs/promises';

const site = 'https://www.ai-automation-station.com';
const root = new URL('../public/', import.meta.url);
const decode = text => text.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const text = html => decode(html.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();

const entries = [];
for (const file of (await readdir(new URL('guides/', root))).filter(name => name.endsWith('.html')).sort()) {
  const html = await readFile(new URL(`guides/${file}`, root), 'utf8');
  const title = decode(html.match(/<h1>(.*?)<\/h1>/s)[1]);
  const updated = html.match(/dateModified":"([^"]+)"/)?.[1];
  const answer = html.match(/<section class="quick-answer"[^>]*>\s*<h2[^>]*>Quick answer<\/h2>\s*<p>(.*?)<\/p>/s)?.[1] ?? html.match(/<p>\s*<strong>Quick answer:<\/strong>(.*?)<\/p>/s)?.[1] ?? html.match(/<meta name="description" content="([^"]*)"/)[1];
  entries.push(`### ${title}\n${site}/guides/${file}${updated ? ` (updated ${updated})` : ''}\n${text(answer)}\n`);
}

const llms = (await readFile(new URL('llms.txt', root), 'utf8')).trimEnd();
const pricing = (await readFile(new URL('pricing.md', root), 'utf8')).trimEnd();
await writeFile(new URL('llms-full.txt', root), `${llms}\n\n---\n\n${pricing}\n\n---\n\n## Every written guide, with its quick answer\n\n${entries.join('\n')}`);
console.log(`wrote ${entries.length} guides`);
