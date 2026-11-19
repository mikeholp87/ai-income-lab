// Put the shared site footer (src/site-footer.js, the homepage footer) on every static page in public/.
// Run after editing the footer: node scripts/apply-site-footer.mjs
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { siteFooterHtml } from '../src/site-footer.js';

const files = [];
for (const dir of ['public', 'public/guides']) {
  for (const entry of await readdir(dir, { withFileTypes: true })) if (entry.isFile() && entry.name.endsWith('.html')) files.push(join(dir, entry.name));
}
let changed = 0;
for (const file of files) {
  const html = await readFile(file, 'utf8');
  if (!/<footer[\s>]/.test(html)) continue;
  const footer = siteFooterHtml();
  const next = html.replace(/<footer[\s\S]*?<\/footer>/, () => footer);
  if (next !== html) { await writeFile(file, next); changed += 1; }
}
console.log(`Footer updated on ${changed} of ${files.length} pages`);
