// Save each video's captions as plain text for its watch page (src/transcripts.json).
//
// Usage: node scripts/fetch-transcripts.mjs [--limit 30] [--publish]
//   --publish  commit and push src/transcripts.json to main (Vercel then deploys it), and once every
//              video is done, turn off the daily timer.
//
// Uses the channel owner's sign-in (scripts/youtube-oauth.mjs, youtube.force-ssl scope): only the owner may
// download captions, auto-generated ones included. Each video costs ~250 of the project's 10,000 daily
// quota units (list 50 + download 200), shared with the site, so run it daily until every video is done.
// Progress is saved after each video and finished videos are skipped, so reruns are safe.
// Runs daily via the systemd user timer ai-income-lab-transcripts.timer (~/.config/systemd/user/).
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { uploads } from '../src/uploads-snapshot.js';
import { captionText } from '../src/transcript.js';
import { accessToken } from './youtube-oauth.mjs';

const limitAt = process.argv.indexOf('--limit');
const limit = limitAt === -1 ? 30 : Number(process.argv[limitAt + 1]);
const file = new URL('../src/transcripts.json', import.meta.url);
const transcripts = JSON.parse(readFileSync(file, 'utf8'));
const token = await accessToken('https://www.googleapis.com/auth/youtube.force-ssl');
const api = 'https://www.googleapis.com/youtube/v3';
const get = async path => {
  const response = await fetch(`${api}${path}`, { headers: { Authorization: `Bearer ${token}` } });
  if (!response.ok) throw Object.assign(new Error(`${path.split('?')[0]} ${response.status}: ${(await response.json().catch(() => ({}))).error?.message}`), { status: response.status });
  return response;
};

// Newest first, so recent uploads get transcripts before the back catalogue.
const todo = uploads.filter(video => video.public && !(video.id in transcripts)).slice(0, limit);
let saved = 0;
for (const video of todo) {
  try {
    const { items = [] } = await (await get(`/captions?part=snippet&videoId=${video.id}`)).json();
    // Prefer a caption track I uploaded, then YouTube's auto-generated English one.
    const track = items.find(item => item.snippet.trackKind !== 'asr' && item.snippet.language?.startsWith('en'))
      ?? items.find(item => item.snippet.language?.startsWith('en'));
    // '' marks "no English captions" so the video isn't retried every run.
    transcripts[video.id] = track ? captionText(await (await get(`/captions/${track.id}?tfmt=srt`)).text()) : '';
    writeFileSync(file, `${JSON.stringify(transcripts, null, 1)}\n`);
    saved += 1;
    console.log(`${video.id} ${track ? `${transcripts[video.id].split(' ').length} words` : 'no English captions'}  ${video.title}`);
  } catch (error) {
    console.error(`${video.id} failed: ${error.message}`);
    if (error.status === 403 || error.status === 401) break; // quota used up or sign-in lacks access: stop for today
  }
}
const left = uploads.filter(video => video.public && !(video.id in transcripts)).length;
console.log(`\nSaved ${saved}. ${left} videos still need a transcript.`);
if (!process.argv.includes('--publish')) process.exit(0);

const git = (...args) => execFileSync('git', args, { encoding: 'utf8' }).trim();
// Push only from a clean main that matches origin, so the job never ships unrelated local commits.
if (saved && git('status', '--porcelain', '--', 'src/transcripts.json')) {
  git('fetch', '--quiet', 'origin', 'main');
  if (git('rev-parse', '--abbrev-ref', 'HEAD') !== 'main' || git('rev-parse', 'HEAD') !== git('rev-parse', 'origin/main')) {
    console.log('Not publishing: main has local commits or differs from origin/main. Commit src/transcripts.json yourself.');
  } else {
    git('commit', '--quiet', '-m', `Add transcripts for ${saved} more videos`, '--', 'src/transcripts.json');
    git('push', '--quiet', 'origin', 'main');
    console.log('Pushed src/transcripts.json; Vercel deploys it.');
  }
}
if (!left) {
  execFileSync('systemctl', ['--user', 'disable', '--now', 'ai-income-lab-transcripts.timer'], { stdio: 'inherit' });
  console.log('Every video has a transcript; the daily timer is now off.');
}
