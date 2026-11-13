import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import test from 'node:test';
import { addAuthorNote, articleImageObject, optimizeGuide, previewRobots, socialImageMeta } from './guide-seo.js';

const dir = new URL('../public/guides/', import.meta.url);
const files = (await readdir(dir)).filter(file => file.endsWith('.html'));
const read = file => readFile(new URL(file, dir), 'utf8');
const schemas = html => [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(match => JSON.parse(match[1]));

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
