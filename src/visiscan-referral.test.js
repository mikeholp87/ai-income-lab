import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import test from 'node:test';
import { personKnowsAbout, personSameAs } from './site-footer.js';
import { toolLink } from './tool-links.js';
import { visiscanHref, visiscanOrigin, visiscanPaths, visiscanUrl } from './visiscan-links.js';

const read = path => readFile(new URL(`../${path}`, import.meta.url), 'utf8');
const decode = href => href.replace(/&amp;/g, '&');
const allowedPaths = new Set(Object.values(visiscanPaths));
const schemas = html => [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(match => JSON.parse(match[1]));
const htmlHrefs = html => [...html.matchAll(/<a\b([^>]*?)>/gi)].map(([, attrs]) => {
  const href = attrs.match(/\bhref="([^"]+)"/i)?.[1];
  return href ? { href: decode(href), attrs } : null;
}).filter(Boolean);
const markdownHrefs = text => [...text.matchAll(/\[[^\]]+\]\((https?:\/\/[^)\s]+)\)/g)].map(([, href]) => decode(href));

function visiscanClickHrefs(html) {
  return htmlHrefs(html).filter(({ href }) => href.startsWith(visiscanOrigin));
}

function assertReferral(href, pageSlug, label) {
  const url = new URL(href);
  assert.equal(url.origin, visiscanOrigin, label);
  assert.ok(allowedPaths.has(url.pathname), `${label}: ${url.pathname}`);
  assert.equal(url.searchParams.get('utm_source'), 'ai-automation-station', label);
  assert.equal(url.searchParams.get('utm_medium'), 'referral', label);
  assert.equal(url.searchParams.get('utm_content'), pageSlug, label);
}

test('visiscanUrl keeps existing query values and only uses verified paths', () => {
  assert.equal(visiscanUrl(visiscanPaths.tool, 'home'), 'https://www.visiscan.app/tools/ai-visibility-scanner?utm_source=ai-automation-station&utm_medium=referral&utm_content=home');
  assert.equal(visiscanHref(visiscanPaths.pricing, 'about'), 'https://www.visiscan.app/pricing?utm_source=ai-automation-station&amp;utm_medium=referral&amp;utm_content=about');
  assert.equal(visiscanUrl(`${visiscanPaths.pricing}?ref=old#plans`, 'home'), 'https://www.visiscan.app/pricing?ref=old&utm_source=ai-automation-station&utm_medium=referral&utm_content=home#plans');
  assert.throws(() => visiscanUrl('/docs/api', 'home'));
});

test('every clickable visiscan.app link uses a verified path, referral UTMs and no noreferrer', async () => {
  const pages = [
    ['index.html', 'home'],
    ['src/main.jsx', 'home'],
    ['src/tool-links.js', 'watch'],
    ['public/about.html', 'about'],
    ['public/llms.txt', 'llms'],
    ['public/llms-full.txt', 'llms'],
    ... (await readdir(new URL('../public/guides', import.meta.url))).filter(file => file.endsWith('.html')).map(file => [`public/guides/${file}`, file.replace(/\.html$/, '')]),
  ];
  const found = [];
  for (const [path, slug] of pages) {
    const text = await read(path);
    const hrefs = path.endsWith('.txt')
      ? markdownHrefs(text).filter(href => href.startsWith(visiscanOrigin)).map(href => ({ href, attrs: '' }))
      : visiscanClickHrefs(text);
    for (const { href, attrs } of hrefs) {
      found.push(`${path} ${href}`);
      assertReferral(href, slug, `${path} ${href}`);
      assert.doesNotMatch(attrs, /\bnoreferrer\b/, `${path} ${href}`);
      if (/\btarget="_blank"/.test(attrs)) assert.match(attrs, /\brel="noopener"/, `${path} ${href}`);
    }
  }
  assert.ok(found.length >= 10, `expected visiscan click links, got ${found.length}`);
});

test('the eight AI-visibility guides add one disclosed deep link with a descriptive anchor', async () => {
  const expected = [
    ['openseo-review', visiscanPaths.tool, 'free AI visibility checker', 'my own tool VisiScan'],
    ['rank-prompt-ai-search-visibility', visiscanPaths.tool, 'free AI visibility checker', 'my own tool VisiScan'],
    ['ai-visibility-tracker-saas-build', visiscanPaths.pricing, 'VisiScan pricing', 'my own tool VisiScan'],
    ['semrush-mcp-ai-visibility', visiscanPaths.tool, 'free AI visibility checker', 'my own tool VisiScan'],
    ['dataforseo-mcp-claude', visiscanPaths.methodology, 'how VisiScan scores visibility', 'my own tool VisiScan'],
    ['crowdreply-mcp-codex', visiscanPaths.citationGap, 'citation gap worked example', 'my own tool VisiScan'],
    ['grokbot-for-seo', visiscanPaths.tool, 'free AI visibility checker', 'my own tool VisiScan'],
    ['codex-seo-workflow', visiscanPaths.tool, 'free AI visibility checker', 'my own tool VisiScan'],
  ];
  for (const [slug, path, anchor, disclosure] of expected) {
    const html = await read(`public/guides/${slug}.html`);
    const href = visiscanHref(path, slug);
    const link = [...html.matchAll(/<a href="([^"]+)">([^<]+)<\/a>/g)].find(match => match[1] === href);
    assert.ok(link, `${slug} missing ${href}`);
    assert.equal(link[2], anchor, slug);
    assert.match(html, new RegExp(disclosure.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), slug);
    assert.doesNotMatch(html, /sponsor(?:ed|ship)?[^.]{0,80}VisiScan|VisiScan[^.]{0,80}affiliate/i, slug);
    assert.doesNotMatch(link[2], /[—;…]|https?:\/\//, slug);
  }
});

test('the VisiScan guide keeps the dated $79 notes and states the current $49 price', async () => {
  const html = await read('public/guides/visiscan-ai-visibility-audit.html');
  const pricing = visiscanHref(visiscanPaths.pricing, 'visiscan-ai-visibility-audit');
  const methodology = visiscanHref(visiscanPaths.methodology, 'visiscan-ai-visibility-audit');
  assert.match(html, /<p>Current price: full report \$49 one-time\. See <a href="[^"]+">VisiScan pricing<\/a>\.<\/p>/);
  assert.match(html, /<p>On 22 July 2026 this walkthrough said the full report was a \$79 one-time fee, the price at recording on 22 July 2026\. That is what that date showed, not a later site price\. Current price: full report \$49 one-time\. See <a href="[^"]+">VisiScan pricing<\/a>\.<\/p>/);
  assert.ok(html.includes(`<a href="${pricing}">VisiScan pricing</a>`));
  assert.ok(html.includes(`<a href="${methodology}">how VisiScan scores visibility</a>`));
  assert.match(html, /\$79 one-time fee, the price at recording on 22 July 2026/);
  const faq = schemas(html).find(item => item['@type'] === 'FAQPage');
  const answer = faq.mainEntity.find(item => item.name === 'What did the full report cost in my walkthrough?').acceptedAnswer.text;
  assert.match(answer, /Current price: full report \$49 one-time\. See VisiScan pricing\./);
  assert.match(answer, /price at recording on 22 July 2026/);
});

test('the homepage free-scan button and about page point at verified VisiScan URLs', async () => {
  const jsx = await read('src/main.jsx');
  assert.match(jsx, /visiscanUrl\(visiscanPaths\.tool, 'home'\)/);
  assert.match(jsx, /rel: 'noopener'/);
  assert.match(jsx, /rel=\{tool\.rel \?\? 'noreferrer'\}/);
  const about = await read('public/about.html');
  const aboutHref = visiscanHref(visiscanPaths.about, 'about');
  assert.ok(about.includes(`<a href="${aboutHref}" target="_blank" rel="noopener">the VisiScan about page</a>`));
  const graph = schemas(about);
  const person = graph.find(item => item['@type'] === 'ProfilePage').mainEntity;
  assert.deepEqual(person.sameAs, personSameAs);
  assert.deepEqual(person.knowsAbout, personKnowsAbout);
  const org = graph.find(item => item['@id'] === 'https://www.visiscan.app/#organization');
  assert.equal(org['@type'], 'Organization');
  assert.equal(org.name, 'VisiScan');
  assert.equal(org.url, visiscanOrigin);
  assert.deepEqual(org.founder, { '@id': 'https://www.ai-automation-station.com/#mike' });
});

test('the homepage Person node lists VisiScan and AI search topics', async () => {
  const html = await read('index.html');
  const person = schemas(html)[0]['@graph'].find(item => item['@id'] === 'https://www.ai-automation-station.com/#mike');
  assert.deepEqual(person.sameAs, personSameAs);
  assert.deepEqual(person.knowsAbout, personKnowsAbout);
});

test('watch-page VisiScan tool links use the scanner URL, referral UTMs and noopener', () => {
  const link = toolLink('VisiScan');
  assert.equal(link.url, visiscanUrl(visiscanPaths.tool, 'watch'));
  assert.equal(link.affiliate, false);
});
