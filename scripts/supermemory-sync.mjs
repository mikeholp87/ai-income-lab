// Uploads every guide and every public video transcript to Supermemory for /api/search, skipping
// documents already there. Run after adding guides or transcripts:
//   node scripts/supermemory-sync.mjs            upload what's missing
//   node scripts/supermemory-sync.mjs --dry-run  list what would be uploaded
//   node scripts/supermemory-sync.mjs --limit 2  upload at most two (for a test)
import { existsSync } from 'node:fs';
import { readdir, readFile } from 'node:fs/promises';
import { Supermemory } from 'supermemory';
import { uploads } from '../src/uploads-snapshot.js';
import { memoryDocuments, namespace } from '../src/site-memory.js';

for (const file of ['.env.local', '.env']) {
  const path = `${import.meta.dirname}/../${file}`;
  if (existsSync(path)) process.loadEnvFile(path);
}
const dryRun = process.argv.includes('--dry-run');
const limitAt = process.argv.indexOf('--limit');
const limit = limitAt > 0 ? Number(process.argv[limitAt + 1]) : Infinity;
if (!dryRun && !process.env.SUPERMEMORY_API_KEY) throw new Error('Set SUPERMEMORY_API_KEY in .env.local first.');

const root = new URL('../', import.meta.url);
const guideFiles = (await readdir(new URL('public/guides/', root))).filter(file => file.endsWith('.html'));
const guides = await Promise.all(guideFiles.map(async file => ({ file, html: await readFile(new URL(`public/guides/${file}`, root), 'utf8') })));
const transcripts = JSON.parse(await readFile(new URL('src/transcripts.json', root), 'utf8'));
const documents = memoryDocuments(guides, uploads, transcripts);

const client = new Supermemory();
const existing = new Set();
if (!dryRun) {
  for (let page = 1; ; page++) {
    const { documents: listed, pagination } = await client.list(namespace, 'documents', { page, limit: 100 });
    for (const document of listed) existing.add(document.customId ?? document.id);
    if (!pagination?.hasMore) break;
  }
}
const missing = documents.filter(document => !existing.has(document.id)).slice(0, limit);
console.log(`${documents.length} documents, ${existing.size} already in "${namespace}", ${missing.length} to upload.`);
if (dryRun) {
  for (const document of missing) console.log(`  ${document.id}  ${document.metadata.title} (${document.content.length} chars)`);
  process.exit(0);
}

let done = 0;
const failed = [];
const queue = [...missing];
await Promise.all(Array.from({ length: 4 }, async () => {
  for (let document; (document = queue.shift());) {
    try {
      await client.add(namespace, { id: document.id, content: document.content, metadata: document.metadata, taskType: 'superrag' });
      console.log(`  ${++done}/${missing.length} ${document.id}`);
    } catch (error) {
      failed.push(document.id);
      console.error(`  failed ${document.id}: ${error.statusCode ?? ''} ${error.message}`);
    }
  }
}));
console.log(`Uploaded ${done}${failed.length ? `, ${failed.length} failed: ${failed.join(', ')}` : ''}.`);
if (failed.length) process.exitCode = 1;
