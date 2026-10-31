import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
import { GET, normalizeQuery } from '../api/search.js';
import { memoryDocuments, namespace, pageText, searchRows } from './site-memory.js';

const guideHtml = '<link rel="canonical" href="https://www.ai-automation-station.com/guides/a.html"><meta name="description" content="About A"><meta property="og:title" content="Guide A"><nav>Menu</nav><main><h1>Guide A</h1><p>Run 9router on port 20128 &amp; check it.</p><script>track()</script><aside>Join</aside></main>';
const videos = [
  { id: 'abcdefghijk', title: 'Video one', summary: 'One.', public: true },
  { id: 'privatevid0', title: 'Private', summary: '', public: false },
  { id: 'notranscrip', title: 'No transcript', summary: '', public: true },
];

test('every guide and every public video with a transcript becomes one Supermemory document', () => {
  assert.match(namespace, /^[a-zA-Z0-9_:-]+$/);
  const documents = memoryDocuments([{ file: 'a.html', html: guideHtml }], videos, { abcdefghijk: 'Said in the video.', privatevid0: 'Hidden.' });
  assert.deepEqual(documents.map(document => document.id), ['guide_a', 'video_abcdefghijk']);
  assert.deepEqual(documents[0].metadata, { kind: 'guide', title: 'Guide A', url: '/guides/a.html', description: 'About A' });
  assert.equal(documents[0].content, 'Guide A\n\nGuide A\nRun 9router on port 20128 & check it.');
  assert.deepEqual(documents[1].metadata, { kind: 'video', title: 'Video one', url: '/watch/abcdefghijk', description: 'One.' });
  assert.equal(documents[1].content, 'Video one\n\nSaid in the video.');
  assert.doesNotMatch(pageText(guideHtml), /Menu|track|Join/);
});

test('search results become one search-index row per page, best passage first', () => {
  const guide = { kind: 'guide', title: 'Guide A', url: '/guides/a.html', description: 'About A' };
  const video = { kind: 'video', title: 'Video one', url: '/watch/abcdefghijk', description: 'One.' };
  const rows = searchRows([
    { chunk: 'Port   20128 is the default.', similarity: 0.7, metadata: guide },
    { chunk: 'A weaker passage from the same guide.', similarity: 0.69, metadata: guide },
    { chunk: '', similarity: 0.8, metadata: video },
    { chunk: 'No metadata, skipped.', similarity: 0.9 },
  ], 'default port');
  assert.deepEqual(rows, [['guide', 'Guide A', '/guides/a.html', 'Port 20128 is the default.'], ['video', 'Video one', '/watch/abcdefghijk', 'One.']]);
  // Below the strong-match line, only passages that contain every word of the query count.
  const weak = [{ chunk: 'Run it on port 20128.', similarity: 0.6, metadata: guide }, { chunk: 'Something unrelated.', similarity: 0.6, metadata: video }];
  assert.deepEqual(searchRows(weak, '20128').map(row => row[2]), ['/guides/a.html']);
  assert.deepEqual(searchRows(weak, 'zzqqxx nothing'), []);
});

test('/api/search ignores short queries and says so when the key is missing', async () => {
  assert.equal(normalizeQuery('  Corepack   ERROR '), 'corepack error');
  assert.equal(normalizeQuery('x'.repeat(300)).length, 120);
  const short = await GET(new Request('https://www.ai-automation-station.com/api/search?q=ab'));
  assert.deepEqual(await short.json(), []);
  const key = process.env.SUPERMEMORY_API_KEY;
  delete process.env.SUPERMEMORY_API_KEY;
  try {
    const response = await GET(new Request('https://www.ai-automation-station.com/api/search?q=corepack'));
    assert.equal(response.status, 503);
    assert.equal(response.headers.get('cache-control'), 'no-store');
  } finally {
    if (key) process.env.SUPERMEMORY_API_KEY = key;
  }
});

test('the search pages fall back to searching inside videos and guides', async () => {
  const read = path => readFile(new URL(`../${path}`, import.meta.url), 'utf8');
  for (const path of ['public/search.html', 'public/video-search.js', 'public/guide-search.js']) {
    assert.match(await read(path), /import \{ afterTyping, searchInside \} from '\/inside-search\.js';/, path);
  }
  assert.match(await read('public/search.html'), /<section class="search-inside" id="search-inside" aria-labelledby="inside-heading" hidden>/);
  // The client and the API normalize queries the same way, so the CDN caches repeats.
  assert.match(await read('public/inside-search.js'), /text\.toLowerCase\(\)\.replace\(\/\\s\+\/g, ' '\)\.trim\(\)\.slice\(0, 120\)/);
});

test('search answers 429 once one address makes too many uncached searches', async () => {
  const { GET } = await import('../api/search.js');
  const saved = process.env.SUPERMEMORY_API_KEY;
  delete process.env.SUPERMEMORY_API_KEY;
  try {
    const ask = () => GET(new Request('https://www.ai-automation-station.com/api/search?q=corepack', { headers: { 'x-forwarded-for': '203.0.113.60' } }));
    for (let i = 0; i < 30; i += 1) assert.equal((await ask()).status, 503);
    const res = await ask();
    assert.equal(res.status, 429);
    assert.equal(res.headers.get('cache-control'), 'no-store');
  } finally {
    if (saved !== undefined) process.env.SUPERMEMORY_API_KEY = saved;
  }
});
