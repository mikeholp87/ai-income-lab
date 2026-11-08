import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { addGuideVideos } from './archive.js';
import { uploads } from './uploads-snapshot.js';
import { watchNotes } from './watch-notes.js';
import {
  NEW_GUIDE_SLUGS,
  QUICK_ANSWERS,
  VIDEO_IDS_BY_SLUG,
  applyLibraryConventions,
  headingText,
  hubVideosFor,
  rewriteToc,
} from '../scripts/aas-guide-render.mjs';

const read = path => readFile(new URL(`../${path}`, import.meta.url), 'utf8');
const hubCard = (hub, slug) => hub.match(new RegExp(`<li class="guide"><img[^>]*>\\s*<div><h3><a href="/guides/${slug}\\.html">[\\s\\S]*?</li>`))?.[0] || '';

test('TOC labels copy the heading text instead of the slug', () => {
  const html = '<nav class="toc" aria-label="On this page"><h2>On this page</h2><ul><li><a href="#start-with-a-source-prompt">start with a source prompt</a></li></ul></nav><h2 id="start-with-a-source-prompt">Start with a source prompt and a separate project folder</h2>';
  assert.match(rewriteToc(html), />Start with a source prompt and a separate project folder</);
  assert.equal(headingText(html, 'start-with-a-source-prompt'), 'Start with a source prompt and a separate project folder');
});

test('Quick answers are inserted once after the contents list', () => {
  const html = '<h1>Demo</h1>\n<nav class="toc" aria-label="On this page"><h2>On this page</h2></nav>\n<p>Body</p>';
  const once = applyLibraryConventions(html, 'ai-threejs-rocket-demo');
  assert.match(once, /<p><strong>Quick answer:<\/strong> Start from a source prompt/);
  assert.equal(applyLibraryConventions(once, 'ai-threejs-rocket-demo'), once);
});

test('a hub card does not advertise another guide’s exclusive video', () => {
  assert.deepEqual(hubVideosFor('codex-seo-workflow'), ['TuVL2x6IfDk']);
  assert.deepEqual(hubVideosFor('codex-workflow', { ...VIDEO_IDS_BY_SLUG, 'codex-workflow': ['TuVL2x6IfDk'] }), []);
  assert.deepEqual(hubVideosFor('grokbot-vs-dots'), ['vauqktcB6ak', 'uTcTJd5JaZU']);
});

test('the 22 new guides keep sentence-case contents and a Quick answer', async () => {
  assert.equal(NEW_GUIDE_SLUGS.length, 22);
  for (const slug of NEW_GUIDE_SLUGS) {
    const html = await read(`public/guides/${slug}.html`);
    const toc = html.match(/<nav class="toc" aria-label="On this page">(.*?)<\/nav>/s)[1];
    for (const [, id, label] of toc.matchAll(/<a href="#([^"]+)">([^<]*)<\/a>/g)) {
      const heading = headingText(html, id);
      if (heading) assert.equal(label, heading, `${slug} #${id}`);
      assert.notEqual(label, label.toLowerCase(), `${slug} lowercase TOC: ${label}`);
    }
    assert.match(html, /<p><strong>Quick answer:<\/strong> /, slug);
    if (QUICK_ANSWERS[slug]) assert.match(html, new RegExp(QUICK_ANSWERS[slug].slice(0, 40).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), slug);
  }
});

test('the Codex workflow hub card no longer sells the SEO video, and Dots lists both long-form videos', async () => {
  const hub = await read('public/guides.html');
  const workflow = hubCard(hub, 'codex-workflow');
  const seo = hubCard(hub, 'codex-seo-workflow');
  const dots = hubCard(hub, 'grokbot-vs-dots');
  assert.ok(workflow, 'codex-workflow card');
  assert.doesNotMatch(workflow, /TuVL2x6IfDk/);
  assert.match(seo, /TuVL2x6IfDk/);
  assert.match(dots, /vauqktcB6ak/);
  assert.match(dots, /uTcTJd5JaZU/);
});

test('CrowdReply watch notes point at the written guide', () => {
  assert.match(watchNotes['9WPazkEp7VU'].html, /href="\/guides\/crowdreply-mcp-codex.html"/);
  assert.match(watchNotes['9WPazkEp7VU'].html, /samples|marketplace|uplift/i);
});

test('Start here points to GrokBot and Herdr', async () => {
  const html = await read('public/start-here.html');
  assert.match(html, /href="\/guides\/grokbot-for-beginners.html"/);
  assert.match(html, /href="\/guides\/herdr-desktop-app.html"/);
});

test('CI runs npm test and lint on pull requests', async () => {
  const yaml = await read('.github/workflows/ci.yml');
  assert.match(yaml, /npm test/);
  assert.match(yaml, /npm run lint/);
  assert.doesNotMatch(yaml, /refresh-videos/);
});

test('each of the 22 new guides can attach related watch cards', async () => {
  for (const slug of NEW_GUIDE_SLUGS) {
    const html = await read(`public/guides/${slug}.html`);
    const next = addGuideVideos(html, `/guides/${slug}.html`, uploads);
    assert.match(next, /id="you-may-also-like"/, slug);
  }
});
