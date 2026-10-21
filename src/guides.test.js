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
    assert.match(await read(path), /<header><a href="\/">Mike Holp<\/a><nav aria-label="Site"><a href="\/start-here.html"( aria-current="page")?>Start here<\/a><a href="\/guides.html"( aria-current="page")?>Guides<\/a><a href="\/videos">All videos<\/a><\/nav><a class="join" href="https:\/\/www.skool.com\/ai-automation-station-7346\/plans" target="_blank" rel="noreferrer" data-placement="reading_header">Join AI Income Lab ↗<\/a><\/header>/, path);
  }
});

test('/guides redirects once to the hub without catching guide pages', async () => {
  const { redirects } = JSON.parse(await read('vercel.json'));
  const page = redirects.find(rule => rule.destination === '/:page.html');
  const pattern = new RegExp(`^${page.source.replace(':page', '')}$`);
  assert.ok(pattern.test('/guides'));
  for (const path of ['/guides.html', '/guides/codex-workflow', '/guides/codex-workflow.html']) assert.ok(!pattern.test(path), path);
});

test('/blog sends readers to the guides hub', async () => {
  const { redirects } = JSON.parse(await read('vercel.json'));
  assert.ok(redirects.some(rule => rule.source === '/blog' && rule.destination === '/guides.html' && rule.permanent === true));
});

test('guide figures are described once, by their caption', async () => {
  for (const file of guides) {
    const html = await read(`public/guides/${file}`);
    for (const [, alt, caption] of html.matchAll(/<figure><img [^>]*alt="([^"]*)"[^>]*><figcaption>(.*?)<\/figcaption><\/figure>/g)) {
      assert.notEqual(alt, caption, file);
    }
  }
});

test('the hub byline names one brand', async () => {
  assert.match(await read('public/guides.html'), /<p class="meta">By <a href="\/#about" rel="author">Mike Holp<\/a> · Updated/);
});

test('reading pages share the homepage type, link colour and header styles', async () => {
  const css = await read('public/reading.css');
  assert.match(css, /font-family:'Instrument Sans';font-weight:400 700;src:url\('\/fonts\/instrument-sans.woff2'\)/);
  assert.match(css, /font-family:'DM Mono';src:url\('\/fonts\/dm-mono.woff2'\)/);
  assert.match(css, /body\{[^}]*font:18px\/1\.7 'Instrument Sans',system-ui,sans-serif\}/);
  assert.match(css, /a\{color:#ff6846;/);
  // The brand is the header's own first link; nav links have their own style.
  assert.match(css, /header>a:first-child\{font-family:Archivo/);
  assert.doesNotMatch(css, /header a:first-child/);
  assert.match(css, /\.join\{[^}]*background:#ff6846;/);
  assert.match(css, /@media\(max-width:640px\)\{header nav\{order:3;width:100%;margin-left:0\}\}/);
});

test('guides end with the standard next steps and every plans link says Join', async () => {
  const order = ['claude-code-vs-codex', 'codex-workflow', 'make-first-automation', 'first-api-request', 'youtube-feed', 'consent-tracking'];
  for (const [index, slug] of order.entries()) {
    const html = await read(`public/guides/${slug}.html`);
    const next = order[(index + 1) % order.length];
    assert.match(html, new RegExp(`<aside class="note next-steps" aria-labelledby="keep-going"><h2 id="keep-going">Keep going</h2><ul><li>Next guide: <a href="/guides/${next}.html">`), slug);
    assert.equal((html.match(/class="note next-steps"/g) || []).length, 1, slug);
  }
  for (const path of ['public/start-here.html', ...guides.map(file => `public/guides/${file}`)]) {
    const html = await read(path);
    for (const [link] of html.matchAll(/<a [^>]*href="https:\/\/www\.skool\.com\/ai-automation-station-7346\/plans"[^>]*>[^<]*<\/a>/g)) {
      assert.match(link, /target="_blank" rel="noreferrer"[^>]*>Join AI Income Lab ↗<\/a>$/, `${path}: ${link}`);
    }
    for (const [link] of html.matchAll(/<a [^>]*href="https:\/\/www\.skool\.com\/ai-automation-station-7346\/classroom"[^>]*>[^<]*<\/a>/g)) {
      assert.match(link, />members’ classroom<\/a>$/, `${path}: ${link}`);
    }
  }
});
