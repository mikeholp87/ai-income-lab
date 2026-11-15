// Remove "Read the written guide →" lines that point at a guide other than the video's dedicated one.
// Usage: node scripts/drop-generic-guide-lines.mjs [--dry-run]   (videos come from docs/guide-specs)
import { readdirSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { accessToken } from './youtube-oauth.mjs';
const dry = process.argv.includes('--dry-run');
const slugOf = new Map();
for (const f of readdirSync(new URL('../docs/guide-specs', import.meta.url).pathname).filter(f => f.endsWith('.mjs'))) { const s = (await import(pathToFileURL(`${new URL('../docs/guide-specs', import.meta.url).pathname}/${f}`).href)).default; for (const id of [s.video, ...(s.alsoWatch ?? [])]) slugOf.set(id, s.slug); }
slugOf.set('_8qzOkIWMSk', 'opencode-vs-claude-code');
const api = 'https://www.googleapis.com/youtube/v3', token = await accessToken();
const call = async (m, p, b) => { const r = await fetch(api + p, { method: m, headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: b && JSON.stringify(b) }); const j = await r.json(); if (!r.ok) throw new Error(`${m} ${p.split('?')[0]} ${r.status}: ${j.error?.message}`); return j; };
const snip = async id => (await call('GET', `/videos?part=snippet&id=${id}`)).items?.[0]?.snippet;
const kept = ['title', 'categoryId', 'tags', 'defaultLanguage', 'defaultAudioLanguage'];
const generic = /^Read the written guide → https:\/\/www\.ai-automation-station\.com\/guides\/([a-z0-9-]+)\.html[^\n]*\n?/gm;
let changed = 0, same = 0, failed = 0;
for (const [id, slug] of slugOf) {
  try {
    const before = await snip(id);
    if (!before) { console.log(`${id} not found`); failed++; continue; }
    if (!before.description.includes(`/guides/${slug}.html`)) { console.log(`${id} SKIP: dedicated line missing`); failed++; continue; }
    const removed = [];
    const description = before.description.replace(generic, (m, s) => s === slug ? m : (removed.push(s), '')).replace(/\n{3,}/g, '\n\n');
    if (!removed.length) { same++; continue; }
    if (!description.includes(`/guides/${slug}.html`)) throw new Error('dedicated line would be lost');
    if (dry) { console.log(`${id} would drop: ${removed.join(', ')}  (${before.description.length} → ${description.length})`); changed++; continue; }
    const snippet = Object.fromEntries(kept.filter(k => before[k] !== undefined).map(k => [k, before[k]]));
    await call('PUT', '/videos?part=snippet', { id, snippet: { ...snippet, description } });
    let ok = false;
    for (let a = 0; a < 6 && !ok; a++) { await new Promise(r => setTimeout(r, 2500)); const now = await snip(id); ok = now.description === description && kept.every(k => JSON.stringify(now[k]) === JSON.stringify(before[k])); }
    if (!ok) throw new Error('verification mismatch (check by hand)');
    console.log(`${id} updated and verified, dropped: ${removed.join(', ')}`); changed++;
  } catch (e) { console.log(`${id} FAILED: ${e.message}`); failed++; if (/quota|403|401/.test(e.message)) break; }
}
console.log(`Done: ${changed} ${dry ? 'would change' : 'changed'}, ${same} unchanged, ${failed} failed${dry ? ' (dry run)' : ''}.`);
