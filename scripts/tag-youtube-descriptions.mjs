// Tag the site link in YouTube descriptions so visits show which video sent them:
//   https://www.ai-automation-station.com → https://www.ai-automation-station.com/?utm_source=youtube&utm_content=<videoId>
// The ?utm_source=youtube visit also gets the AI Income Lab hero (see wantsCommunity in src/funnel.js).
//
// Usage:
//   node scripts/tag-youtube-descriptions.mjs --latest 5 [--dry-run]    newest long-form uploads
//   node scripts/tag-youtube-descriptions.mjs VIDEO_ID ... [--dry-run]  specific videos
//   node scripts/tag-youtube-descriptions.mjs --guide-links [--limit 40] [--dry-run]
//     Add each video's link from docs/youtube-description-links.md (its guide, or its watch page when no
//     guide matches) below the "Work with me → …" line in Useful Links & Resources, in that file's
//     priority order. Videos without that line are skipped. Each write costs about
//     55 quota units of the project's shared 10,000 a day, so run it in batches with --limit.
//
// Needs the Desktop OAuth client at ~/.config/yt-oauth/client_secret.json (Google Cloud project ai-income-lab-site-1006).
// At sign-in, choose the AI Automation Station brand account. Already-tagged videos are skipped, so reruns are safe.
// videos.update replaces the whole snippet, so title, tags, category and languages are sent back unchanged.
import { readFile } from 'node:fs/promises';
import { longFormPlaylistId } from '../src/youtube.js';
import { guideLines, resourceLine, withGuideLine } from './guide-lines.mjs';
import { accessToken } from './youtube-oauth.mjs';

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const guideMode = args.includes('--guide-links');
const latestAt = args.indexOf('--latest');
const latest = latestAt === -1 ? 0 : Number(args[latestAt + 1]);
const limitAt = args.indexOf('--limit');
const limit = limitAt === -1 ? Infinity : Number(args[limitAt + 1]);
const valueAt = new Set([latestAt, limitAt].filter(index => index !== -1).map(index => index + 1));
const givenIds = args.filter((arg, index) => !arg.startsWith('--') && !valueAt.has(index));
if (!guideMode && !latest && !givenIds.length) {
  console.log('Usage: node scripts/tag-youtube-descriptions.mjs --latest 5 [--dry-run]\n       node scripts/tag-youtube-descriptions.mjs VIDEO_ID ... [--dry-run]\n       node scripts/tag-youtube-descriptions.mjs --guide-links [--limit 40] [--dry-run]');
  process.exit(1);
}
const lines = guideMode ? guideLines(await readFile(new URL('../docs/youtube-description-links.md', import.meta.url), 'utf8')) : [];
const lineById = new Map(lines.map(row => [row.id, row.line]));

const api = 'https://www.googleapis.com/youtube/v3';
const bare = /https:\/\/www\.ai-automation-station\.com(?![/?#\w.-])/;
const tagged = id => `https://www.ai-automation-station.com/?utm_source=youtube&utm_content=${id}`;

const token = await accessToken();
const call = async (method, path, body) => {
  const response = await fetch(`${api}${path}`, { method, headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: body && JSON.stringify(body) });
  const json = await response.json();
  if (!response.ok) throw new Error(`${method} ${path.split('?')[0]} ${response.status}: ${json.error?.message}`);
  return json;
};
const snippetOf = async id => (await call('GET', `/videos?part=snippet&id=${id}`)).items?.[0]?.snippet;
const kept = ['title', 'categoryId', 'tags', 'defaultLanguage', 'defaultAudioLanguage'];

const ids = (latest
  ? (await call('GET', `/playlistItems?part=contentDetails&maxResults=${Math.min(latest, 50)}&playlistId=${longFormPlaylistId}`)).items.map(item => item.contentDetails.videoId)
  : givenIds.length ? givenIds : lines.map(row => row.id)).slice(0, limit);

let updated = 0, skipped = 0, failed = 0;
for (const id of ids) {
  try {
    const before = await snippetOf(id);
    if (!before) { console.log(`${id}  not found`); failed++; continue; }
    let description;
    if (guideMode) {
      if (!lineById.has(id)) { console.log(`${id}  skipped (no line in docs/youtube-description-links.md)`); skipped++; continue; }
      const result = withGuideLine(before.description, lineById.get(id));
      if (!result.description) { console.log(`${id}  skipped (${result.reason}): ${before.title.slice(0, 60)}`); skipped++; continue; }
      description = result.description;
    } else {
      if (!bare.test(before.description)) { console.log(`${id}  skipped (no untagged link): ${before.title.slice(0, 60)}`); skipped++; continue; }
      description = before.description.replace(bare, tagged(id));
    }
    if (dryRun) { console.log(`${id}  would update: ${before.title.slice(0, 60)}${guideMode ? `\n    adds below Work with me: ${resourceLine(lineById.get(id))}` : ''}`); continue; }
    const snippet = Object.fromEntries(kept.filter(key => before[key] !== undefined).map(key => [key, before[key]]));
    await call('PUT', '/videos?part=snippet', { id, snippet: { ...snippet, description } });
    // YouTube serves the old snippet for a few seconds after an update, so re-read until it settles.
    let verified = false;
    for (let attempt = 0; attempt < 6 && !verified; attempt++) {
      await new Promise(resolve => setTimeout(resolve, 2500));
      const after = await snippetOf(id);
      verified = after.description === description && kept.every(key => JSON.stringify(after[key]) === JSON.stringify(before[key]));
    }
    if (!verified) throw new Error('verification mismatch after update (check this video by hand)');
    console.log(`${id}  updated and verified: ${before.title.slice(0, 60)}`);
    updated++;
  } catch (error) {
    console.log(`${id}  FAILED: ${error.message}`);
    failed++;
    if (/quota|403|401/.test(error.message)) break;
  }
}
console.log(`\nDone: ${updated} updated, ${skipped} skipped, ${failed} failed${dryRun ? ' (dry run, nothing written)' : ''}.`);
