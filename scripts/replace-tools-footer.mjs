// Swap the "🧩 Recommended Tools (affiliate links):" list in video descriptions for one link to /tools.html, e.g.
//   node scripts/replace-tools-footer.mjs --group=a --dry-run
// --group=a|b splits the catalogue in two by video ID, so each half mixes old and new videos and one half can be
// tested against the other. --before / --after (YYYY-MM-DD, UTC) narrow by publish date; with none, every video.
// Only that block is touched: the heading and its "- Tool → link" lines up to the next blank line. Video-specific
// links ("Get started with …") stay direct. Same sign-in, quota and verification as replace-youtube-link.mjs.
import { longFormPlaylistId, shortsPlaylistId } from '../src/youtube.js';
import { accessToken } from './youtube-oauth.mjs';

const option = name => process.argv.find(arg => arg.startsWith(`--${name}=`))?.split('=')[1];
const dryRun = process.argv.includes('--dry-run');
const before = option('before');
const after = option('after');
const group = option('group');
if (group && !['a', 'b'].includes(group)) { console.error('Usage: node scripts/replace-tools-footer.mjs [--group=a|b] [--before=YYYY-MM-DD] [--after=YYYY-MM-DD] [--dry-run]'); process.exit(1); }
export const groupOf = id => [...id].reduce((sum, char) => sum + char.charCodeAt(0), 0) % 2 ? 'b' : 'a';

const block = /🧩 Recommended Tools \(affiliate links\):\n(?:[ \t]*- [^\n]*\n?)+/;
const footer = id => `🧰 Every tool I use (affiliate links), with the videos that show each one in action:\nhttps://www.ai-automation-station.com/tools.html?utm_source=youtube&utm_medium=description&utm_campaign=tools_footer&utm_content=${id}\n`;
export const replaceFooter = (description, id) => description.replace(block, footer(id));

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

const inRange = (id, published) => (!group || groupOf(id) === group) && (!before || published < before) && (!after || published >= after);
let updated = 0, outside = 0, noBlock = 0, failed = 0, sample = '';
for (const id of ids) {
  if (group && groupOf(id) !== group) { outside++; continue; }
  try {
    const before_ = await snippetOf(id);
    if (!before_) { console.log(`${id}  not found`); failed++; continue; }
    if (!inRange(id, before_.publishedAt.slice(0, 10))) { outside++; continue; }
    const description = replaceFooter(before_.description, id);
    if (description === before_.description) { noBlock++; continue; }
    if (description.length > 5000) throw new Error('description would exceed 5,000 characters');
    if (dryRun) {
      if (!sample) sample = `\n--- sample: ${id} ${before_.title}\n${description}\n---`;
      console.log(`${id}  ${before_.publishedAt.slice(0, 10)}  would replace (${before_.description.length} → ${description.length} chars): ${before_.title.slice(0, 60)}`);
      updated++;
      continue;
    }
    const snippet = Object.fromEntries(kept.filter(key => before_[key] !== undefined).map(key => [key, before_[key]]));
    await call('PUT', '/videos?part=snippet', { id, snippet: { ...snippet, description } });
    let verified = false;
    for (let attempt = 0; attempt < 6 && !verified; attempt++) { // YouTube serves the old snippet for a few seconds
      await new Promise(resolve => setTimeout(resolve, 2500));
      const now = await snippetOf(id);
      verified = now.description === description && kept.every(key => JSON.stringify(now[key]) === JSON.stringify(before_[key]));
    }
    if (!verified) throw new Error('verification mismatch after update (check this video by hand)');
    console.log(`${id}  updated and verified: ${before_.title.slice(0, 60)}`);
    updated++;
  } catch (error) {
    console.log(`${id}  FAILED: ${error.message}`);
    failed++;
    if (/quota|403|401/.test(error.message)) break;
  }
}
console.log(`${sample}\nDone: ${updated} ${dryRun ? 'would be updated' : 'updated'}, ${outside} outside the group or dates, ${noBlock} without the footer, ${failed} failed, of ${ids.length} videos${dryRun ? ' (dry run, nothing written)' : ''}.`);
