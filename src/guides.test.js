import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import test from 'node:test';

const read = path => readFile(new URL(`../${path}`, import.meta.url), 'utf8');
const guides = (await readdir(new URL('../public/guides', import.meta.url))).filter(file => file.endsWith('.html'));

test('the guides hub links, lists and describes every guide', async () => {
  const hub = await read('public/guides.html');
  const [collection] = [...hub.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(match => JSON.parse(match[1]));
  assert.ok(guides.length >= 5);
  for (const file of guides) {
    assert.match(hub, new RegExp(`<a href="/guides/${file}">`), file);
    assert.ok(collection.mainEntity.itemListElement.some(item => item.url === `https://www.ai-automation-station.com/guides/${file}`), file);
  }
  assert.ok(hub.match(/<meta name="description" content="([^"]*)"/)[1].length <= 158);
  assert.match(hub, /<link rel="canonical" href="https:\/\/www.ai-automation-station.com\/guides.html">/);
  assert.match(hub, /src="\/src\/reading.js"/, 'scripts/prerender.js rewrites this entry for the build');
  assert.match(await read('scripts/prerender.js'), /'guides.html'/);
  assert.match(await read('public/sitemap.xml'), /<loc>https:\/\/www.ai-automation-station.com\/guides.html<\/loc>/);
});

test('static pages share a header that links the guides hub', async () => {
  for (const path of ['public/start-here.html', 'public/guides.html', 'public/404.html', ...guides.map(file => `public/guides/${file}`)]) {
    assert.match(await read(path), /<header><a href="\/">Mike Holp<\/a><a href="\/start-here.html">Start here<\/a><a href="\/guides.html"( aria-current="page")?>Guides<\/a><a href="\/videos">All videos<\/a><\/header>/, path);
  }
});

test('/guides redirects once to the hub without catching guide pages', async () => {
  const { redirects } = JSON.parse(await read('vercel.json'));
  const page = redirects.find(rule => rule.destination === '/:page.html');
  const pattern = new RegExp(`^${page.source.replace(':page', '')}$`);
  assert.ok(pattern.test('/guides'));
  for (const path of ['/guides.html', '/guides/codex-workflow', '/guides/codex-workflow.html']) assert.ok(!pattern.test(path), path);
});
