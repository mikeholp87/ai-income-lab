import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';
import { toolLink } from './tool-links.js';
import { affiliates, categories, logoSlug } from './affiliates.js';
import { footerExplore, organizationNode, siteOrigin, skoolPlansUrl, websiteNode } from './site-footer.js';
import { addToolsLink, guideTools, linkFirstMentions, ogImageHeight, ogImageWidth, relatedGuides, renderToolsPage, toolsDocumentTitle, toolsFaqs, toolsSummary, toolsTitle, topTools, videosUsing } from './tools-page.js';
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
  assert.equal(title, toolsDocumentTitle);
  assert.ok(title.length <= 60, title.length);
  assert.ok(description.length <= 160, description.length);
  assert.doesNotMatch(title, /[—;…]/);
  assert.doesNotMatch(description, /[—;…]/);
  assert.match(title, /AI Automation Station$/);
  assert.doesNotMatch(html.match(/<header class="single-line-header tools-header">[^]*?<\/header>/)[0], /AI Automation Station/);
  assert.match(html, /<header class="single-line-header tools-header"><a href="\/">AI Income Lab<\/a>/);
  assert.equal(ogTitle, toolsTitle);
  assert.equal(twitterTitle, toolsTitle);
  assert.match(toolsTitle, /^Choose AI tools/);
  assert.match(description, /^Choose AI tools/);
  assert.equal((html.match(/<h1>/g) || []).length, 1);
  assert.ok(html.indexOf('Affiliate disclosure') < html.indexOf('class="tool-cta"'));
  const ctas = [...html.matchAll(/<a class="tool-cta" href="([^"]+)" target="_blank" rel="sponsored noopener" data-affiliate="([^"]+)" data-category="([a-z]+)" data-placement="(tools_page|tools_top_picks)"/g)].map(([all, url, name, category, placement]) => {
    assert.equal(category, affiliates.find(affiliate => affiliate.name === name).category, name);
    return [all, url, name, placement];
  });
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
  const [collection] = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].map(([, json]) => JSON.parse(json));
  // Each listed tool points at its card, and every card the list names exists on the page.
  assert.equal(collection.mainEntity.itemListElement.length, affiliates.length);
  for (const item of collection.mainEntity.itemListElement) assert.ok(html.includes(`<li class="tool-card" id="${item.url.split('#')[1]}">`), item.url);
  assert.match(html, /How this list works: each card counts the videos that use the tool on screen/);
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
  assert.deepEqual(guideTools(guide.replace('Automate a sheet', 'Claude Code for beginners')).map(affiliate => affiliate.name), ['Make.com']);
  assert.match(addToolsLink('<main><h1>x</h1><a href="https://www.skool.com/ai-automation-station-7346/plans">Join</a></main>'), /<p class="meta"><a href="\/tools\.html" data-placement="guide_tools_all">See every tool I recommend →/);
  // Three plain mentions count; two don't. Claude isn't an affiliate; Gemini 4 isn't the Gemini app and "Make" is a verb.
  assert.deepEqual(guideTools('<main><h1>x</h1><p>HeyGen, HeyGen and HeyGen. Vapi and Vapi. Claude Code, Claude Code, Claude Code. Gemini 4, Gemini 4, Gemini 4. Make it. Make it. Make it.</p></main>').map(affiliate => affiliate.name), ['HeyGen']);
  // The first prose mention after the quick answer links the affiliate, with the disclosure before that paragraph.
  const heygen = affiliates.find(affiliate => affiliate.name === 'HeyGen');
  const inline = linkFirstMentions(`<main><h1>HeyGen tutorial</h1><p>HeyGen quick answer.</p><h2>Set up HeyGen</h2><nav><a href="#x">HeyGen</a></nav><p>Open <code>HeyGen</code>, then HeyGen AI Studio. Later HeyGen again.</p></main>`, [heygen]);
  assert.equal(inline, `<main><h1>HeyGen tutorial</h1><p>HeyGen quick answer.</p><h2>Set up HeyGen</h2><nav><a href="#x">HeyGen</a></nav><p class="meta">Some tool links in this guide are affiliate links, so I may earn a commission or credit.</p>\n<p>Open <code>HeyGen</code>, then <a href="${heygen.url.replace(/&/g, '&amp;')}" target="_blank" rel="sponsored noopener" data-affiliate="HeyGen" data-placement="guide_inline">HeyGen</a> AI Studio. Later HeyGen again.</p></main>`);
  assert.equal(linkFirstMentions(`<main><h1>x</h1><p>a</p><p>HeyGen <a href="${heygen.url.replace(/&/g, '&amp;')}">link</a></p></main>`, [heygen]).includes('guide_inline'), false, 'a guide already linking the affiliate is left alone');
  for (const promise of ['this guide uses plain links only.', 'This page uses the public product site with no tracking parameters.']) {
    const plain = guide.replace('<main>', `<main><p>${promise}</p>`);
    assert.equal(addToolsLink(plain), plain, promise);
  }
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
  assert.ok(footerExplore.some(([href, label]) => href === '/tools.html' && label === 'Recommended tools'));
  assert.match(await read('src/main.jsx'), /footerExplore\.map\(\(\[href, label\]\) => <a key=\{href\} href=\{href\}>\{label\}<\/a>\)/);
  assert.match(await read('src/reading.js'), /trackGoogleEvent\('affiliate_outbound_clicked', event\)/);
});

test('a guide can exclude a tool it only uses as an example', () => {
  const html = '<html><head><meta name="affiliate-exclude" content="Hostinger"></head><body><main><h1>Hostinger scan</h1><p>a</p><p>The Hostinger report.</p></main></body></html>';
  assert.deepEqual(guideTools(html), []);
  assert.doesNotMatch(addToolsLink(html), /data-affiliate="Hostinger"/);
});

test('every section opens with a one-line guide that only names tools from that section', () => {
  const html = renderToolsPage({ uploads, guides: [] });
  for (const [id, , , intro] of categories) {
    assert.ok(intro && intro.length > 40 && intro.length < 260, `${id} intro`);
    assert.match(html, new RegExp(`<h2 id="${id}-heading">[^<]*</h2><p class="meta">${intro.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/&/g, '&amp;')}</p><ul class="tool-cards">`), id);
    for (const affiliate of affiliates) {
      if (new RegExp(`\\b${affiliate.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`).test(intro)) assert.equal(affiliate.category, id, `${id} intro names ${affiliate.name}`);
    }
    // Every tool named in brackets has a card in this section, so a removed tool cannot linger in the intro.
    for (const name of [...intro.matchAll(/\(([^)]+)\)/g)].flatMap(([, list]) => list.split(/,\s*/))) assert.ok(affiliates.some(affiliate => affiliate.category === id && (name === affiliate.name || name.startsWith(`${affiliate.name} `))), `${id} intro names ${name}, which has no card`);
    // Every tool in the section is named, so the intro cannot drift from the cards.
    for (const affiliate of affiliates.filter(item => item.category === id)) assert.match(intro, new RegExp(`\\b${affiliate.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`), `${id} intro omits ${affiliate.name}`);
  }
});

const schemas = html => [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].map(([, json]) => JSON.parse(json));
const definedIds = (node, ids = new Set()) => {
  if (!node || typeof node !== 'object') return ids;
  if (Array.isArray(node)) {
    for (const item of node) definedIds(item, ids);
    return ids;
  }
  if (typeof node['@id'] === 'string' && Object.keys(node).some(key => key !== '@id')) ids.add(node['@id']);
  for (const value of Object.values(node)) definedIds(value, ids);
  return ids;
};
const idRefs = (node, refs = []) => {
  if (!node || typeof node !== 'object') return refs;
  if (Array.isArray(node)) {
    for (const item of node) idRefs(item, refs);
    return refs;
  }
  if (typeof node['@id'] === 'string' && Object.keys(node).every(key => key === '@id')) refs.push(node['@id']);
  for (const [key, value] of Object.entries(node)) {
    if (key !== '@id') idRefs(value, refs);
  }
  return refs;
};

test('the tools page summary, FAQ schema, UTM join link, og tags and @ids stay valid', async () => {
  const html = renderToolsPage({ uploads, updated: new Date('2026-11-12T00:00:00Z') });
  const priceDate = 'November 12, 2026';
  const summary = html.match(/<p class="tools-summary">([^<]*)<\/p>/)[1];
  assert.equal(summary, toolsSummary(affiliates.length, priceDate));
  const words = summary.trim().split(/\s+/).length;
  assert.ok(words >= 40 && words <= 60, words);
  assert.match(summary, new RegExp(`${affiliates.length} AI tools`));
  assert.match(summary, /on-screen video use/);
  assert.match(summary, /November 12, 2026/);
  assert.match(summary, /commission or credit/);
  assert.doesNotMatch(summary, /[—;…]/);

  const faqs = toolsFaqs(affiliates.length, priceDate, 5);
  assert.ok(faqs.length >= 4 && faqs.length <= 6);
  const visible = [...html.matchAll(/<details class="faq-item"><summary><h3>([^<]*)<\/h3><\/summary>\n<p>([^<]*)<\/p>\n<\/details>/g)].map(([, question, answer]) => [question, answer]);
  assert.deepEqual(visible, faqs);
  for (const [question, answer] of faqs) assert.doesNotMatch(`${question} ${answer}`, /[—;…]/);

  const data = schemas(html);
  const faq = data.find(item => item['@type'] === 'FAQPage');
  assert.ok(faq);
  assert.equal(faq['@context'], 'https://schema.org');
  assert.equal(faq.mainEntity.length, faqs.length);
  assert.deepEqual(faq.mainEntity, faqs.map(([question, answer]) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })));

  const org = data.find(item => item['@type'] === 'Organization');
  const website = data.find(item => item['@type'] === 'WebSite');
  assert.equal(org['@id'], organizationNode['@id']);
  assert.equal(org.name, organizationNode.name);
  assert.equal(org.url, organizationNode.url);
  assert.deepEqual(org.logo, organizationNode.logo);
  assert.equal(website['@id'], websiteNode['@id']);
  assert.equal(website.name, websiteNode.name);
  assert.equal(website.url, websiteNode.url);
  const ids = data.reduce((set, item) => definedIds(item, set), new Set());
  for (const ref of data.flatMap(item => idRefs(item))) assert.ok(ids.has(ref), ref);

  const header = html.match(/<header class="single-line-header tools-header">[^]*?<\/header>/)[0];
  const join = `${skoolPlansUrl}?utm_source=website&amp;utm_medium=referral&amp;utm_campaign=tools_page&amp;utm_content=header_join`;
  assert.match(header, new RegExp(`href="${join.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`));
  assert.doesNotMatch(html.slice(html.indexOf('</header>')), /utm_campaign=tools_page/);

  assert.match(html, /<meta property="og:site_name" content="AI Automation Station">/);
  assert.match(html, /<meta property="og:locale" content="en_US">/);
  assert.match(html, new RegExp(`<meta property="og:image:width" content="${ogImageWidth}">`));
  assert.match(html, new RegExp(`<meta property="og:image:height" content="${ogImageHeight}">`));
  assert.match(html, new RegExp(`<meta name="twitter:image" content="${siteOrigin}/og-card.jpg\\?v=2">`));
  assert.equal((html.match(/<form class="notes" method="post" action="\/api\/subscribe" data-subscribe/g) || []).length, 2);
  assert.ok(html.indexOf('id="top-picks-heading"') < html.indexOf('data-placement="tools_page_top"'));
  assert.ok(html.indexOf('data-placement="tools_page_top"') < html.indexOf('class="tool-group"'));
  for (const [href] of footerExplore) assert.match(html, new RegExp(`<footer class="footer site-footer">[^]*href="${href.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`), href);
});

test('og image tags use the real og-card.jpg pixel size', async () => {
  const bytes = await readFile(new URL('../public/og-card.jpg', import.meta.url));
  let width;
  let height;
  for (let index = 2; index < bytes.length - 8;) {
    if (bytes[index] !== 0xff) break;
    const marker = bytes[index + 1];
    if (marker === 0xc0 || marker === 0xc1 || marker === 0xc2) {
      height = bytes.readUInt16BE(index + 5);
      width = bytes.readUInt16BE(index + 7);
      break;
    }
    index += 2 + bytes.readUInt16BE(index + 2);
  }
  assert.equal(width, 1200);
  assert.equal(height, 630);
  assert.equal(ogImageWidth, width);
  assert.equal(ogImageHeight, height);
});

test('OpenCode, Gemini, Hostinger and Apify cards link existing guides', async () => {
  const paths = ['opencode-go.html', 'opencode-vs-claude-code.html', 'opencode-seo-audit-skills.html', 'opencode-stripe-billing-saas.html', 'google-ai-studio-chat-app.html', 'install-openclaw.html', 'apify-agent-skills.html'];
  for (const file of paths) await access(new URL(`../public/guides/${file}`, import.meta.url));
  const guides = [
    { title: 'OpenCode Go: pricing, models, limits and setup', url: `${siteOrigin}/guides/opencode-go.html`, modified: '2026-11-08' },
    { title: 'OpenCode vs Claude Code: pricing, setup and limits', url: `${siteOrigin}/guides/opencode-vs-claude-code.html`, modified: '2026-11-11' },
    { title: 'OpenCode SEO Audit Skills: Site Checks and Files', url: `${siteOrigin}/guides/opencode-seo-audit-skills.html`, modified: '2026-11-12' },
    { title: 'OpenCode Stripe Billing Build: A SaaS Case Study', url: `${siteOrigin}/guides/opencode-stripe-billing-saas.html`, modified: '2026-11-12' },
    { title: 'Build a Chat Web App in Google AI Studio, No Code', url: `${siteOrigin}/guides/google-ai-studio-chat-app.html`, modified: '2026-11-12' },
    { title: 'How to install OpenClaw: local, VPS or hosted, safely', url: `${siteOrigin}/guides/install-openclaw.html`, modified: '2026-11-07' },
    { title: 'Apify agent skills setup in Cursor', url: `${siteOrigin}/guides/apify-agent-skills.html`, modified: '2026-11-12' },
  ];
  const html = renderToolsPage({ uploads, guides });
  const card = name => {
    const start = html.indexOf(`<li class="tool-card" id="${logoSlug(affiliates.find(item => item.name === name))}">`);
    const next = html.indexOf('<li class="tool-card"', start + 1);
    return html.slice(start, next === -1 ? html.length : next);
  };
  const opencode = affiliates.find(affiliate => affiliate.name === 'OpenCode');
  assert.deepEqual(relatedGuides(opencode, guides).map(guide => guide.url.replace(siteOrigin, '')), ['/guides/opencode-go.html', '/guides/opencode-vs-claude-code.html', '/guides/opencode-seo-audit-skills.html', '/guides/opencode-stripe-billing-saas.html']);
  assert.match(card('OpenCode'), /href="\/guides\/opencode-go\.html"/);
  assert.match(card('OpenCode'), /href="\/guides\/opencode-vs-claude-code\.html"/);
  assert.match(card('OpenCode'), /href="\/guides\/opencode-seo-audit-skills\.html"/);
  assert.match(card('Google Gemini'), /href="\/guides\/google-ai-studio-chat-app\.html"/);
  assert.match(card('Hostinger'), /href="\/guides\/install-openclaw\.html"/);
  assert.match(card('Apify'), /href="\/guides\/apify-agent-skills\.html"/);
});
