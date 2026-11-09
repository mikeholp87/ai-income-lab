// Replace a bare link in the descriptions of every long-form upload and Short, e.g.
//   node scripts/replace-youtube-link.mjs https://claude.ai https://claude.ai/referral/CODE --dry-run
// Only the bare link (with or without a trailing slash) is replaced: https://claude.ai/design, /download or
// https://claude.ai/referral/... are left alone.
// Same sign-in, quota (about 55 units a write of 10,000 a day) and safety checks as tag-youtube-descriptions.mjs:
// title, tags, category and languages are sent back unchanged and every write is re-read to verify. Reruns are safe.
import { longFormPlaylistId, shortsPlaylistId } from '../src/youtube.js';
import { accessToken } from './youtube-oauth.mjs';

const [from, to] = process.argv.slice(2).filter(arg => !arg.startsWith('--'));
const dryRun = process.argv.includes('--dry-run');
if (!/^https:\/\/\S+$/.test(from ?? '') || !/^https:\/\/\S+$/.test(to ?? '')) { console.error('Usage: node scripts/replace-youtube-link.mjs FROM_URL TO_URL [--dry-run]'); process.exit(1); }
const escaped = from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const bare = new RegExp(`${escaped}/?(?![\\w/.?#=&%-])`, 'g'); // the link or the link plus a slash, but not a path, query or longer host

const api = 'https://www.googleapis.com/youtube/v3';
const token = await accessToken();
const call = async (method, path, body) => {
  const response = await fetch(`${api}${path}`, { method, headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: body && JSON.stringify(body) });
  const json = await response.json();
  if (!response.ok) throw new Error(`${method} ${path.split('?')[0]} ${response.status}: ${json.error?.message}`);
  return json;
};
const snippetOf = async id => (await call('GET', `/videos?part=snippet&id=${id}`)).items?.[0]?.snippet;
const kept = ['title', 'categoryId', 'tags', 'defaultLanguage', 'defaultAudioLanguage'];

const ids = [];
for (const playlistId of [longFormPlaylistId, shortsPlaylistId]) {
  let pageToken = '';
  do {
    const page = await call('GET', `/playlistItems?part=contentDetails&maxResults=50&playlistId=${playlistId}${pageToken ? `&pageToken=${pageToken}` : ''}`);
    ids.push(...page.items.map(item => item.contentDetails.videoId));
    pageToken = page.nextPageToken ?? '';
  } while (pageToken);
}

let updated = 0, skipped = 0, failed = 0;
for (const id of ids) {
  try {
    const before = await snippetOf(id);
    if (!before) { console.log(`${id}  not found`); failed++; continue; }
    const description = before.description.replace(bare, to);
    if (description === before.description) { skipped++; continue; }
    const count = before.description.match(bare).length;
    if (dryRun) { console.log(`${id}  would replace ${count}: ${before.title.slice(0, 60)}`); updated++; continue; }
    const snippet = Object.fromEntries(kept.filter(key => before[key] !== undefined).map(key => [key, before[key]]));
    await call('PUT', '/videos?part=snippet', { id, snippet: { ...snippet, description } });
    let verified = false;
    for (let attempt = 0; attempt < 6 && !verified; attempt++) { // YouTube serves the old snippet for a few seconds
      await new Promise(resolve => setTimeout(resolve, 2500));
      const after = await snippetOf(id);
      verified = after.description === description && kept.every(key => JSON.stringify(after[key]) === JSON.stringify(before[key]));
    }
    if (!verified) throw new Error('verification mismatch after update (check this video by hand)');
    console.log(`${id}  updated and verified (${count}): ${before.title.slice(0, 60)}`);
    updated++;
  } catch (error) {
    console.log(`${id}  FAILED: ${error.message}`);
    failed++;
    if (/quota|403|401/.test(error.message)) break;
  }
}
console.log(`\nDone: ${updated} ${dryRun ? 'would be updated' : 'updated'}, ${skipped} unchanged, ${failed} failed, of ${ids.length} videos${dryRun ? ' (dry run, nothing written)' : ''}.`);
