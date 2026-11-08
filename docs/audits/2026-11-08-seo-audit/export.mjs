import { readFile, writeFile } from 'node:fs/promises';
const out = new URL('./', import.meta.url);
const { pages } = JSON.parse(await readFile(new URL('crawl.json', out), 'utf8'));
const columns = ['url', 'status', 'title', 'title_length', 'description', 'description_length', 'canonical', 'h1', 'main_word_count', 'json_ld_blocks', 'iframe_count', 'click_player'];
const quote = value => `"${String(value ?? '').replaceAll('"', '""')}"`;
const rows = pages.map(p => [p.url, p.status, p.title, p.title.length, p.description, p.description.length, p.canonical.join(' | '), p.headings.filter(h => h.level === 1).map(h => h.text).join(' | '), p.words, p.schemas.length, p.iframeCount, p.clickPlayer]);
await writeFile(new URL('pages.csv', out), `${[columns, ...rows].map(row => row.map(quote).join(',')).join('\n')}\n`);
// Binary response size was not measured; retain only verified status and MIME type.
const imagePath = new URL('guide-image-probes.json', out);
const images = JSON.parse(await readFile(imagePath, 'utf8'));
await writeFile(imagePath, JSON.stringify(images.map(({ bytes: _bytes, ...r }) => r), null, 2));
console.log(`Exported ${rows.length} page records and ${images.length} image probes.`);
