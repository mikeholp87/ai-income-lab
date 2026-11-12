import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';
import { affiliates, categories, logoSlug } from './affiliates.js';
import { toolLink } from './tool-links.js';
import { addToolsLink, guideTools, renderToolsPage, toolsTitle, topTools, videosUsing } from './tools-page.js';
import { uploads } from './uploads-snapshot.js';

const read = path => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('the affiliate list matches the descriptions’ recommended tools and has one entry per tool', () => {
  assert.deepEqual(affiliates.filter(affiliate => affiliate.recommended).map(affiliate => affiliate.name).sort(),
    ['Apollo', 'Deel', 'Fiverr', 'GetResponse', 'HeyGen', 'Hostinger', 'Lovable', 'Make.com', 'OpusClip', 'Pikzels', 'SendPulse', 'Skool', 'Syllaby', 'TubeBuddy', 'Vapi', 'vidIQ']);
  const ids = new Set(categories.map(([id]) => id));
  assert.equal(new Set(affiliates.map(affiliate => affiliate.name)).size, affiliates.length);
  assert.equal(new Set(affiliates.map(affiliate => affiliate.url)).size, affiliates.length);
  for (const affiliate of affiliates) {
    assert.ok(ids.has(affiliate.category), affiliate.name);
    assert.match(affiliate.url, /^https:\/\//, affiliate.name);
    assert.doesNotMatch(affiliate.blurb, /—|;|…/, affiliate.name);
  }
});

test('watch pages link every affiliate tool name to the same referral link', () => {
  for (const affiliate of affiliates) {
    for (const name of affiliate.tools) assert.deepEqual(toolLink(name), { url: affiliate.url, affiliate: true, card: { name: affiliate.name, slug: logoSlug(affiliate) } }, name);
  }
});

test('the tools page discloses affiliate links before the first one and marks every one sponsored', () => {
  const html = renderToolsPage({ uploads, guides: [{ title: 'Make.com Google Sheets tutorial', url: 'https://www.ai-automation-station.com/guides/make-first-automation.html', modified: '2026-11-01' }], updated: new Date('2026-11-12T00:00:00Z') });
  const title = html.match(/<title>([^<]+)<\/title>/)[1];
  const description = html.match(/<meta name="description" content="([^"]+)">/)[1];
  const ogTitle = html.match(/<meta property="og:title" content="([^"]+)">/)[1];
  const twitterTitle = html.match(/<meta name="twitter:title" content="([^"]+)">/)[1];
  assert.equal(title, `${toolsTitle} | Mike Holp`);
  assert.ok(title.length <= 60, title.length);
  assert.ok(description.length <= 160, description.length);
  assert.doesNotMatch(title, /[—;…]/);
  assert.doesNotMatch(description, /[—;…]/);
  assert.equal(ogTitle, toolsTitle);
  assert.equal(twitterTitle, toolsTitle);
  assert.match(toolsTitle, /^Choose AI tools/);
  assert.match(description, /^Choose AI tools/);
  assert.equal((html.match(/<h1>/g) || []).length, 1);
  assert.ok(html.indexOf('Affiliate disclosure') < html.indexOf('class="tool-cta"'));
  const ctas = [...html.matchAll(/<a class="tool-cta" href="([^"]+)" target="_blank" rel="sponsored noopener" data-affiliate="([^"]+)" data-placement="(tools_page|tools_top_picks)"/g)];
  assert.equal(ctas.filter(cta => cta[3] === 'tools_page').length, affiliates.length);
  assert.equal(ctas.filter(cta => cta[3] === 'tools_top_picks').length, 5);
  for (const [, url, name] of ctas) assert.equal(url.replace(/&amp;/g, '&'), affiliates.find(affiliate => affiliate.name === name).url);
  for (const [id] of categories) assert.match(html, new RegExp(`<a href="#${id}">[^]*?<section class="tool-group" id="${id}"`));
  const header = html.match(/<header class="single-line-header tools-header">[^]*?<\/header>/)?.[0] ?? '';
  for (const nav of [/<nav aria-label="Tool categories">([^]*?)<\/nav>/, /<nav aria-label="Tool categories menu">([^]*?)<\/nav>/]) {
    assert.deepEqual([...header.match(nav)[1].matchAll(/<a href="#([a-z]+)">([^<]+)<\/a>/g)].map(([, id, label]) => [id, label]), categories.map(([id, , short]) => [id, short]));
  }
  assert.doesNotMatch(html, /class="tool-nav"/);
  for (const affiliate of affiliates) {
    assert.ok(affiliate.price, `${affiliate.name} has a price from its pricing page`);
    assert.ok(html.includes(`<p class="tool-price"><strong>Price:</strong> ${affiliate.price.replace(/&/g, '&amp;').replace(/'/g, '&#39;')}</p>`), affiliate.name);
  }
  assert.match(html, /Prices are in USD from each tool’s pricing page on November 12, 2026/);
  assert.match(html, /<a href="\/guides\/make-first-automation\.html">Make\.com Google Sheets tutorial<\/a>/);
  assert.match(html, /<time datetime="2026-11-12">November 12, 2026<\/time>/);
  for (const [, json] of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)) JSON.parse(json);
  // Only public, embeddable uploads get a watch link, so none of them 404.
  const ids = new Set(uploads.filter(video => video.public !== false && video.embeddable !== false).map(video => video.id));
  for (const [, id] of html.matchAll(/href="\/watch\/([\w-]{11})"/g)) assert.ok(ids.has(id), id);
});

test('the top picks are the most-used tools, and every card has a logo, a best-for line and its usage', async () => {
  const html = renderToolsPage({ uploads });
  const counts = affiliates.map(affiliate => videosUsing(affiliate, uploads).length).sort((a, b) => b - a);
  const picks = [...html.matchAll(/class="pick-name" href="#[^"]+">[^<]+<\/a><p>Used in (\d+) videos/g)].map(match => Number(match[1]));
  assert.deepEqual(picks, counts.slice(0, 5));
  for (const affiliate of affiliates) {
    await access(new URL(`../public/tools/logos/${logoSlug(affiliate)}.webp`, import.meta.url));
    assert.ok(affiliate.site && affiliate.bestFor && !/[—;]/.test(affiliate.bestFor), affiliate.name);
    const count = videosUsing(affiliate, uploads).length;
    if (count) assert.match(html, new RegExp(`<h3>${affiliate.name.replace('.', '\\.')}</h3><p class="tool-badge">Used in ${count === 1 ? 'one video' : `${count} videos`}</p>`));
  }
});

test('watch pages and guides point to the tools page, except guides that promise no affiliate links', async () => {
  assert.match(await read('src/archive.js'), /href="\/tools\.html" data-placement="watch_tools_all"/);
  const guide = '<main><h1>Automate a sheet</h1><p><a href="https://www.make.com/en/pricing">Make</a> <a href="https://www.skool.com/ai-automation-station-7346/plans">Join</a></p><aside class="note next-steps"></aside></main>';
  const make = affiliates.find(affiliate => affiliate.name === 'Make.com');
  assert.ok(addToolsLink(guide).includes(`<aside class="note guide-tools" aria-label="Tools in this guide"><p><strong>Tools in this guide</strong></p><ul><li><a href="/tools.html#make-com" data-placement="guide_tool_card">Make.com pricing and videos</a>: ${make.bestFor}. <a href="${make.url}" target="_blank" rel="sponsored noopener" data-affiliate="Make.com" data-placement="guide_tools">Try Make.com ↗</a></li></ul><p class="meta">Try links are affiliate links, so I may earn a commission or credit. <a href="/tools.html" data-placement="guide_tools_all">See every tool I recommend →</a></p></aside>\n<aside class="note next-steps"`));
  assert.equal(addToolsLink(addToolsLink(guide)), addToolsLink(guide));
  // A tool in the title comes first, and the AI Income Lab community link doesn't count as Skool.
  assert.deepEqual(guideTools(guide.replace('Automate a sheet', 'Claude Code for beginners')).map(affiliate => affiliate.name), ['Claude', 'Make.com']);
  assert.match(addToolsLink('<main><h1>x</h1><a href="https://www.skool.com/ai-automation-station-7346/plans">Join</a></main>'), /<p class="meta"><a href="\/tools\.html" data-placement="guide_tools_all">See every tool I recommend →/);
  // Three plain mentions count; two don't, and Claude Code isn't Claude.
  assert.deepEqual(guideTools('<main><h1>x</h1><p>HeyGen, HeyGen and HeyGen. Vapi and Vapi. Claude Code, Claude Code, Claude Code. Gemini 4, Gemini 4, Gemini 4.</p></main>').map(affiliate => affiliate.name), ['HeyGen']);
  assert.deepEqual(guideTools('<main><h1>x</h1><pre>Apify Apify Apify</pre></main>'), []);
  const sponsored = guide.replace('<main>', '<main><p>This guide contains no affiliate links.</p>');
  assert.equal(addToolsLink(sponsored), sponsored);
  assert.match(await read('scripts/prerender.js'), /addGuideVideos\(addToolsLink\(html\)/);
});

test('the homepage, Start here, About, 404 and the welcome email link the tools page', async () => {
  assert.deepEqual(JSON.parse(await read('src/top-tools.json')), topTools(uploads, 10));
  const jsx = await read('src/main.jsx');
  assert.match(jsx, /import topTools from '\.\/top-tools\.json'/);
  assert.match(jsx, /<section className="section top-tools" id="tools-i-use">[^]*?href=\{`\/tools\.html#\$\{tool\.slug\}`\}[^]*?href="\/tools\.html"/);
  for (const page of ['public/start-here.html', 'public/about.html', 'public/404.html']) assert.match(await read(page), /<a href="\/tools\.html">/, page);
  const { welcome } = await import('../api/subscribe.js');
  assert.match(welcome.text, /four good places to start:[^]*4\. The tools I use most[^]*\(some are affiliate links\):\nhttps:\/\/www\.ai-automation-station\.com\/tools\.html\n/);
  assert.match(await read('scripts/refresh-videos.js'), /top-tools\.json[^\n]*topTools\(uploads, 10\)/);
});

test('a tool is counted in a video whichever of its two tool lists names it', () => {
  const opusClip = affiliates.find(affiliate => affiliate.name === 'OpusClip');
  assert.ok(videosUsing(opusClip, uploads).length > 0);
});

test('the tools page is built, listed and linked', async () => {
  assert.match(await read('scripts/prerender.js'), /writeFile\('dist\/tools\.html', renderToolsPage\(/);
  assert.match(await read('scripts/prerender.js'), /'terms\.html', 'tools\.html'/);
  assert.match(await read('public/sitemap.xml'), /<loc>https:\/\/www\.ai-automation-station\.com\/tools\.html<\/loc>/);
  assert.match(await read('public/llms.txt'), /\[Recommended tools\]\(https:\/\/www\.ai-automation-station\.com\/tools\.html\)/);
  assert.match(await read('vercel.json'), /search\|tools\)"/);
  assert.match(await read('src/main.jsx'), /<a href="\/tools\.html">Recommended tools<\/a>/);
  assert.match(await read('src/reading.js'), /trackGoogleEvent\('affiliate_outbound_clicked', event\)/);
});
