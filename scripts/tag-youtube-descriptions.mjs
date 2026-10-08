// Tag the site link in YouTube descriptions so visits show which video sent them:
//   https://www.ai-automation-station.com → https://www.ai-automation-station.com/?utm_source=youtube&utm_content=<videoId>
// The ?utm_source=youtube visit also gets the AI Income Lab hero (see wantsCommunity in src/funnel.js).
//
// Usage:
//   node scripts/tag-youtube-descriptions.mjs --latest 5 [--dry-run]    newest long-form uploads
//   node scripts/tag-youtube-descriptions.mjs VIDEO_ID ... [--dry-run]  specific videos
//
// Needs the Desktop OAuth client at ~/.config/yt-oauth/client_secret.json (Google Cloud project ai-income-lab-site-1006).
// At sign-in, choose the AI Automation Station brand account. Already-tagged videos are skipped, so reruns are safe.
// videos.update replaces the whole snippet, so title, tags, category and languages are sent back unchanged.
import { createHash, randomBytes } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { homedir } from 'node:os';
import { spawn } from 'node:child_process';
import { longFormPlaylistId } from '../src/youtube.js';

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const latestAt = args.indexOf('--latest');
const latest = latestAt === -1 ? 0 : Number(args[latestAt + 1]);
const givenIds = args.filter((arg, index) => !arg.startsWith('--') && index !== latestAt + 1);
if (!latest && !givenIds.length) {
  console.log('Usage: node scripts/tag-youtube-descriptions.mjs --latest 5 [--dry-run]\n       node scripts/tag-youtube-descriptions.mjs VIDEO_ID ... [--dry-run]');
  process.exit(1);
}

const dir = `${homedir()}/.config/yt-oauth`;
const { installed } = JSON.parse(readFileSync(`${dir}/client_secret.json`, 'utf8'));
const tokenFile = `${dir}/token.json`;
const api = 'https://www.googleapis.com/youtube/v3';
const bare = /https:\/\/www\.ai-automation-station\.com(?![\/?#\w.-])/;
const tagged = id => `https://www.ai-automation-station.com/?utm_source=youtube&utm_content=${id}`;

// Installed-app loopback flow with PKCE; the access token is cached (owner-only) until it expires.
async function accessToken() {
  if (existsSync(tokenFile)) {
    const cached = JSON.parse(readFileSync(tokenFile, 'utf8'));
    if (cached.expiresAt > Date.now() + 60000) return cached.token;
  }
  const verifier = randomBytes(48).toString('base64url');
  const state = randomBytes(16).toString('hex');
  const server = createServer();
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const redirectUri = `http://127.0.0.1:${server.address().port}`;
  const url = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  Object.entries({ client_id: installed.client_id, redirect_uri: redirectUri, response_type: 'code', scope: 'https://www.googleapis.com/auth/youtube', state, code_challenge: createHash('sha256').update(verifier).digest('base64url'), code_challenge_method: 'S256', prompt: 'consent' }).forEach(([key, value]) => url.searchParams.set(key, value));
  console.log(`Sign in with the AI Automation Station brand account (opening your browser):\n${url}\n`);
  spawn('xdg-open', [url.toString()], { stdio: 'ignore', detached: true }).on('error', () => {}).unref();
  const code = await new Promise((resolve, reject) => server.on('request', (req, res) => {
    const params = new URL(req.url, redirectUri).searchParams;
    if (!params.get('code') && !params.get('error')) return res.end();
    const ok = params.get('code') && params.get('state') === state;
    res.end(ok ? 'Approved. You can close this tab and return to the terminal.' : 'Sign-in did not complete. Check the terminal.');
    server.close();
    ok ? resolve(params.get('code')) : reject(new Error(`OAuth failed: ${params.get('error') ?? 'state mismatch'}`));
  }));
  const response = await fetch('https://oauth2.googleapis.com/token', { method: 'POST', body: new URLSearchParams({ client_id: installed.client_id, client_secret: installed.client_secret, code, code_verifier: verifier, grant_type: 'authorization_code', redirect_uri: redirectUri }) });
  const body = await response.json();
  if (!response.ok) throw new Error(`Token exchange failed: ${body.error}`);
  writeFileSync(tokenFile, JSON.stringify({ token: body.access_token, expiresAt: Date.now() + body.expires_in * 1000 }), { mode: 0o600 });
  return body.access_token;
}

const token = await accessToken();
const call = async (method, path, body) => {
  const response = await fetch(`${api}${path}`, { method, headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: body && JSON.stringify(body) });
  const json = await response.json();
  if (!response.ok) throw new Error(`${method} ${path.split('?')[0]} ${response.status}: ${json.error?.message}`);
  return json;
};
const snippetOf = async id => (await call('GET', `/videos?part=snippet&id=${id}`)).items?.[0]?.snippet;
const kept = ['title', 'categoryId', 'tags', 'defaultLanguage', 'defaultAudioLanguage'];

const ids = latest
  ? (await call('GET', `/playlistItems?part=contentDetails&maxResults=${Math.min(latest, 50)}&playlistId=${longFormPlaylistId}`)).items.map(item => item.contentDetails.videoId)
  : givenIds;

let updated = 0, skipped = 0, failed = 0;
for (const id of ids) {
  try {
    const before = await snippetOf(id);
    if (!before) { console.log(`${id}  not found`); failed++; continue; }
    if (!bare.test(before.description)) { console.log(`${id}  skipped (no untagged link): ${before.title.slice(0, 60)}`); skipped++; continue; }
    const description = before.description.replace(bare, tagged(id));
    if (dryRun) { console.log(`${id}  would update: ${before.title.slice(0, 60)}`); continue; }
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
