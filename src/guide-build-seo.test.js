import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import test from 'node:test';
import { addAuthorNote, articleImageObject, optimizeGuide, previewRobots, shareMeta, socialImageMeta } from './guide-seo.js';

const dir = new URL('../public/guides/', import.meta.url);
const files = (await readdir(dir)).filter(file => file.endsWith('.html'));
const read = file => readFile(new URL(file, dir), 'utf8');
const schemas = html => [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(match => JSON.parse(match[1]));

test('about, start-here, privacy and terms get X card tags and og:site_name from their Open Graph tags at build', async () => {
  const meta = (html, attr, name) => [...html.matchAll(new RegExp(`<meta ${attr}="${name}" content="([^"]*)">`, 'g'))].map(match => match[1]);
  for (const file of ['about.html', 'start-here.html', 'privacy.html', 'terms.html']) {
    const source = await readFile(new URL(`../public/${file}`, import.meta.url), 'utf8');
    const html = shareMeta(source);
    assert.deepEqual(meta(html, 'name', 'twitter:title'), meta(source, 'property', 'og:title'), file);
    assert.deepEqual(meta(html, 'name', 'twitter:description'), meta(source, 'property', 'og:description'), file);
    assert.deepEqual(meta(html, 'name', 'twitter:image'), meta(source, 'property', 'og:image'), file);
    assert.deepEqual(meta(html, 'property', 'og:site_name'), ['AI Automation Station'], file);
    assert.equal(shareMeta(html), html, `${file}: idempotent`);
  }
  // Pages that already carry the tags are left alone.
  for (const file of ['guides.html', 'search.html']) {
    const source = await readFile(new URL(`../public/${file}`, import.meta.url), 'utf8');
    assert.equal(shareMeta(source), source, file);
  }
  for (const file of files.slice(0, 10)) assert.equal(shareMeta(await read(file)), await read(file), file);
});

test('indexable pages allow large image previews and full snippets; noindex pages are untouched', () => {
  assert.equal(previewRobots('<meta name="robots" content="index,follow">'), '<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">');
  assert.equal(previewRobots('<meta name="robots" content="noindex,follow">'), '<meta name="robots" content="noindex,follow">');
});

test('every guide, once built, has preview robots, share image size and alt, an Article ImageObject and an author note', async () => {
  for (const file of files) {
    const source = await read(file);
    const html = optimizeGuide(source);
    assert.match(html, /<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">/, file);
    const alt = source.match(/<figure><img src="\/assets\/guides\/[a-z0-9-]+\.webp"[^>]* alt="([^"]+)"/)[1];
    assert.match(html, new RegExp(`<meta property="og:image:width" content="1200">\\n<meta property="og:image:height" content="630">\\n<meta property="og:image:alt" content="${alt.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}">`), file);
    assert.ok(html.includes(`<meta name="twitter:image:alt" content="${alt}">`), file);
    const article = schemas(html).find(item => item['@type'] === 'Article');
    assert.deepEqual(article.image, { '@type': 'ImageObject', url: `https://www.ai-automation-station.com/assets/guides/${file.replace('.html', '')}.webp`, width: 1200, height: 630 }, file);
    assert.equal((html.match(/class="meta author-note"/g) ?? []).length, 1, file);
    assert.ok(html.indexOf('class="meta author-note"') < html.indexOf('<aside class="note next-steps"'), file);
    // The author note promises sources and a date on every guide.
    assert.match(source, /<h2 id="sources">Sources<\/h2>/, file);
    assert.match(source, /Updated <time datetime="\d{4}-\d{2}-\d{2}">/, file);
    assert.equal(optimizeGuide(html), html, `${file}: running twice changes nothing`);
  }
});

test('the author note only makes claims the About page supports', async () => {
  const about = await readFile(new URL('../public/about.html', import.meta.url), 'utf8');
  assert.match(about, /shipping software since 2013/);
  assert.match(about, /youtube\.com\/@ai-automation-station/);
  assert.equal(addAuthorNote('<main><p>x</p></main>'), '<main><p>x</p></main>', 'no next steps, no note');
  assert.equal(socialImageMeta('<p>no card</p>'), '<p>no card</p>');
  assert.equal(articleImageObject('<p>no schema</p>'), '<p>no schema</p>');
});
