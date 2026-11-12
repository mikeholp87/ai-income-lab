// Download a logo for each affiliate in src/affiliates.js that doesn't have one yet:
//   node scripts/fetch-tool-logos.mjs [--force]
// Writes public/tools/logos/<slug>.webp at 96x96 (shown at 48px). Needs ImageMagick (`magick`).
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { affiliates, logoSlug } from '../src/affiliates.js';

const dir = 'public/tools/logos';
const force = process.argv.includes('--force');
mkdirSync(dir, { recursive: true });

for (const affiliate of affiliates) {
  const out = `${dir}/${logoSlug(affiliate)}.webp`;
  if (existsSync(out) && !force) continue;
  const response = await fetch(`https://www.google.com/s2/favicons?domain=${affiliate.site}&sz=128`);
  if (!response.ok) { console.log(`${affiliate.name}  FAILED ${response.status}`); continue; }
  const tmp = `${out}.download`;
  writeFileSync(tmp, Buffer.from(await response.arrayBuffer()));
  execFileSync('magick', [tmp, '-background', 'none', '-resize', '96x96', '-gravity', 'center', '-extent', '96x96', '-quality', '90', out]);
  rmSync(tmp);
  console.log(`${affiliate.name}  ${out}`);
}
