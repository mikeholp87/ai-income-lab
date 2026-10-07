import { readFile, writeFile } from 'node:fs/promises';
import { validFeed } from '../src/youtube.js';

const path = new URL('../src/youtube-snapshot.json', import.meta.url);
try {
  const response = await fetch('https://www.ai-automation-station.com/api/youtube', { signal: AbortSignal.timeout(8000) });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const feed = await response.json();
  if (!validFeed(feed)) throw new Error('Invalid YouTube feed');
  await writeFile(path, `${JSON.stringify(feed, null, 2)}\n`);
  console.log('Updated the latest-video snapshot.');
} catch (error) {
  if (!validFeed(JSON.parse(await readFile(path, 'utf8')))) throw new Error('No usable video snapshot', { cause: error });
  console.warn(`Using the saved video snapshot: ${error.message}`);
}
