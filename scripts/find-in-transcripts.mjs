// Finds the videos and passages where something is said, for writing listing summaries from transcripts:
//   node scripts/find-in-transcripts.mjs "corepack error"
//   node scripts/find-in-transcripts.mjs --guides "port 20128"   include guides too
// Searches the Supermemory namespace filled by scripts/supermemory-sync.mjs.
import { existsSync } from 'node:fs';
import { Supermemory } from 'supermemory';
import { namespace } from '../src/site-memory.js';

for (const file of ['.env.local', '.env']) {
  const path = `${import.meta.dirname}/../${file}`;
  if (existsSync(path)) process.loadEnvFile(path);
}
const withGuides = process.argv.includes('--guides');
const query = process.argv.slice(2).filter(arg => arg !== '--guides').join(' ').trim();
if (!query) throw new Error('Usage: node scripts/find-in-transcripts.mjs [--guides] "what was said"');
if (!process.env.SUPERMEMORY_API_KEY) throw new Error('Set SUPERMEMORY_API_KEY in .env.local first.');

const { results = [] } = await new Supermemory().search(namespace, {
  query,
  searchMode: 'chunks',
  limit: 10,
  ...(withGuides ? {} : { filter: { field: 'kind', operator: 'eq', value: 'video' } }),
});
if (!results.length) console.log(`Nothing found for "${query}".`);
for (const result of results) {
  const { kind, title, url } = result.metadata ?? {};
  console.log(`\n${kind === 'guide' ? 'Guide' : 'Video'}: ${title}\n${url}  (similarity ${Number(result.similarity ?? 0).toFixed(2)})\n${String(result.chunk ?? '').replace(/\s+/g, ' ').trim()}`);
}
