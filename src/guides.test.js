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
  for (const path of ['public/start-here.html', 'public/404.html', ...guides.map(file => `public/guides/${file}`)]) {
    assert.match(await read(path), /<header(?: class="single-line-header")?><a href="\/">AI Income Lab<\/a><nav aria-label="Site"><a href="\/start-here.html"( aria-current="page")?>Start here<\/a><a href="\/guides.html"( aria-current="page")?>Guides<\/a><a href="\/videos">All videos<\/a><a href="\/search.html">Search<\/a><\/nav><a class="join" href="https:\/\/www.skool.com\/ai-automation-station-7346\/plans" target="_blank" rel="noreferrer" data-placement="reading_header">Join AI Income Lab ↗<\/a><details class="nav-mobile"><summary aria-label="Site menu">Menu<\/summary><nav aria-label="Site menu">/, path);
  }
});

test('the fast AI income guide is discoverable and has its own image', async () => {
  const slug = 'make-money-with-ai-fast';
  const link = `/guides/${slug}.html`;
  assert.ok((await read('public/guides.html')).includes(`<a href="${link}">`));
  // guide-seo.test.js checks this lastmod against the page's dateModified.
  assert.match(await read('public/sitemap.xml'), new RegExp(`<loc>https://www\\.ai-automation-station\\.com${link}</loc><lastmod>\\d{4}-\\d{2}-\\d{2}</lastmod>`));
  assert.ok((await read('public/llms.txt')).includes(`](https://www.ai-automation-station.com${link})`));
  const html = await read(`public${link}`);
  assert.ok(html.includes(`<meta property="og:image" content="https://www.ai-automation-station.com/assets/guides/${slug}.webp">`));
  assert.ok(html.includes(`<meta name="twitter:image" content="https://www.ai-automation-station.com/assets/guides/${slug}.webp">`));
  const image = await readFile(new URL(`../public/assets/guides/${slug}.webp`, import.meta.url));
  assert.ok(image.length > 5000 && image.length < 60000, `image is ${image.length} bytes`);
  assert.ok((await read('public/guides/make-money-with-ai-no-experience.html')).includes(`<a href="${link}">`));
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
  assert.match(await read('public/guides.html'), /<p class="meta">By <a href="\/about\.html" rel="author">Mike Holp<\/a> · Updated/);
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
  // Phones: brand left and Join right on the first row, the nav close beneath them.
  assert.match(css, /@media\(max-width:640px\)\{header\{row-gap:4px\}header nav\{order:3;width:100%;margin-left:0\}\.join\{margin-left:auto\}\}/);
  // Instrument Sans has narrow spaces; widen them in bylines so "Name · Date" separators stay readable.
  assert.match(css, /small,\.meta\{font-size:14px;color:#a5a59e;word-spacing:\.15em\}/);
});

test('guides end with the standard next steps and every plans link says Join', async () => {
  const order = ['claude-code-vs-codex', 'codex-workflow', 'make-first-automation', 'first-api-request', 'youtube-feed', 'consent-tracking'];
  for (const [index, slug] of order.entries()) {
    const html = await read(`public/guides/${slug}.html`);
    const next = order[(index + 1) % order.length];
    assert.match(html, new RegExp(`<aside class="note next-steps" aria-labelledby="keep-going"><h2 id="keep-going">Keep going</h2><ul><li>Next guide: <a href="/guides/${next}.html">`), slug);
    assert.equal((html.match(/class="note next-steps"/g) || []).length, 1, slug);
  }
  for (const file of guides) {
    // The join card stands on its own after "Keep going", ending the article.
    assert.match(await read(`public/guides/${file}`), /<\/aside>\n<section class="cta" aria-labelledby="join-lab">[^\n]*data-placement="guide_end">Join AI Income Lab ↗<\/a>[^\n]*<\/section>\n<form class="notes" data-subscribe>[^\n]*<\/form>\n?<\/main>/, file);
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

test('the Claude Code vs Codex guide has its own image and a contents list', async () => {
  const html = await read('public/guides/claude-code-vs-codex.html');
  const image = 'https://www.ai-automation-station.com/assets/guides/claude-code-vs-codex.webp';
  assert.match(html, new RegExp(`<meta property="og:image" content="${image}">`));
  assert.match(html, new RegExp(`"image":"${image}"`));
  assert.doesNotMatch(html, /og-card\.jpg/);
  assert.match(html, /<figure><img src="\/assets\/guides\/claude-code-vs-codex.webp" [^>]*alt="Diagram: [^"]+" width="1200" height="630"[^>]*><figcaption>[^<]+<\/figcaption><\/figure>/);
  const toc = html.match(/<nav class="toc" aria-label="On this page">([\s\S]*?)<\/nav>/)[1];
  const targets = [...toc.matchAll(/href="#([a-z-]+)"/g)].map(match => match[1]);
  assert.equal(targets.length, 9);
  for (const id of targets) assert.match(html, new RegExp(`<h2 id="${id}">`), id);
  const { size } = await import('node:fs/promises').then(fs => fs.stat(new URL('../public/assets/guides/claude-code-vs-codex.webp', import.meta.url)));
  assert.ok(size > 5000 && size < 60000, `image is ${size} bytes`);
});

test('hub entries show an image, what the guide covers and the matching video', async () => {
  const hub = await read('public/guides.html');
  const entries = [...hub.matchAll(/<li class="guide">([\s\S]*?)<\/li>/g)].map(match => match[1]);
  assert.equal(entries.length, guides.length);
  // The first card is the hub's largest above-the-fold image on phones, so it loads eagerly.
  entries.forEach((entry, index) => {
    assert.match(entry, new RegExp(`<img src="/assets/guides/hub/[a-z0-9-]+\\.webp" srcset="[^"]+" sizes="\\(max-width: 735px\\) calc\\(100vw - 32px\\), [^"]+, 411px" alt="" width="1200" height="630" ${index ? 'loading="lazy"' : 'fetchpriority="high"'}>`));
    assert.match(entry, /<h3><a href="\/guides\/[a-z0-9-]+\.html">[^<]+<\/a><\/h3>/);
  });
  assert.match(hub, /<a href="\/videos\/claude-code">Claude Code videos<\/a>/);
  assert.match(hub, /<a href="\/videos\/make-com">Make.com videos<\/a>/);
});

test('topic guides for n8n, AI SEO and AI agents are complete and discoverable', async () => {
  const hub = await read('public/guides.html');
  const sitemap = await read('public/sitemap.xml');
  const llms = await read('public/llms.txt');
  for (const slug of ['self-host-n8n', 'dataforseo-mcp-claude', 'hermes-desktop']) {
    const html = await read(`public/guides/${slug}.html`);
    assert.match(sitemap, new RegExp(`<loc>https://www.ai-automation-station.com/guides/${slug}.html</loc>`), slug);
    assert.match(llms, new RegExp(`/guides/${slug}\\.html\\)`), slug);
    assert.match(html, /"datePublished":"2026-10-22"/, slug);
    assert.match(html, new RegExp(`<meta property="og:image" content="https://www.ai-automation-station.com/assets/guides/${slug}.webp">`), slug);
    assert.match(html, /<aside class="note next-steps" aria-labelledby="keep-going">/, slug);
    assert.ok(html.match(/<meta name="description" content="([^"]*)"/)[1].length <= 158, slug);
    // Every new guide says what it was checked against, and when.
    assert.match(html, /<p class="meta">[^<]*checked October 22, 2026/i, slug);
  }
  assert.match(await read('public/guides/dataforseo-mcp-claude.html'), /DataForSEO sponsored that video/);
  assert.match(hub, /<a href="#ai-agents">AI agents<\/a><a href="#ai-seo">AI SEO<\/a>/);
  assert.match(hub, /<h2 id="ai-agents">AI agents<\/h2>[\s\S]*<h2 id="ai-seo">AI SEO<\/h2>/);
  const collection = JSON.parse(hub.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
  assert.ok(hub.includes(`Updated <time datetime="${collection.dateModified}">`));
});

test('guide titles and sections match what people search for', async () => {
  const ccvc = await read('public/guides/claude-code-vs-codex.html');
  assert.match(ccvc, /<title>Codex vs Claude Code: /);
  assert.match(ccvc, /<h1>Codex vs Claude Code: /);
  assert.match(ccvc, /<h2 id="short-answer">The short answer \(October 2026\)<\/h2>/);
  assert.match(ccvc, /"dateModified":"2026-10-31"/);
  assert.match(ccvc, /Updated <time datetime="2026-10-31">October 31, 2026<\/time>/);
  const hermes = await read('public/guides/hermes-desktop.html');
  assert.match(hermes, /<title>Hermes Desktop: /);
  assert.ok(hermes.match(/<meta name="description" content="([^"]*)"/)[1].length <= 158);
  const n8n = await read('public/guides/self-host-n8n.html');
  assert.match(n8n, /<h3 id="docker">Or run it in Docker<\/h3>/);
  // n8n's own docker run command, copied from its docs.
  assert.match(n8n, /-v n8n_data:\/home\/node\/\.n8n \\\n n8nio\/n8n<\/code><\/pre>/);
  assert.match(await read('public/sitemap.xml'), /guides\/claude-code-vs-codex\.html<\/loc><lastmod>2026-10-31</);
  // Title leads chosen from DataForSEO volumes on 2026-10-27 (docs/audits/2026-10-27-guides-search-data.md).
  for (const [file, lead] of [
    ['claude-code-for-beginners', 'Claude Code tutorial for beginners: install'],
    ['codex-on-linux', 'Codex desktop app for Linux: download Codex'],
    ['codex-usage-limits', 'Codex usage limits: check usage'],
    ['vapi-voice-agent-tutorial', 'Vapi AI tutorial: '],
  ]) {
    const html = await read(`public/guides/${file}.html`);
    assert.ok(html.includes(`<title>${lead}`), file);
    assert.ok(html.includes(`<h1>${lead}`), file);
    assert.ok(html.match(/<title>([^<]*)<\/title>/)[1].length <= 60, file);
    assert.ok(html.match(/<meta name="description" content="([^"]*)"/)[1].length <= 160, file);
  }
});

test('the guides hub uses the /videos page design', async () => {
  const hub = await read('public/guides.html');
  assert.match(hub, /<link rel="stylesheet" href="\/archive.css">/);
  assert.match(hub, /<header class="shell single-line-header"><a class="brand desktop-brand" href="\/">[\s\S]*?<a class="mobile-brand" href="\/">AI Income Lab<\/a><nav class="site-nav" aria-label="Site"><a href="\/start-here.html">Start here<\/a><a href="\/guides.html" aria-current="page">Guides<\/a><a href="\/videos">All videos<\/a>/);
  assert.match(hub, /<div class="intro"><h1>/);
  assert.match(hub, /<nav class="topics" aria-label="Guide topics">/);
  assert.match(await read('src/archive.js'), /<link rel="stylesheet" href="\$\{archiveCss\}">/);
});

test('the guides hub filters its cards with the same search box as /videos', async () => {
  const hub = await read('public/guides.html');
  assert.match(hub, /<\/nav>\n<div class="toolbar"><form class="search-box" id="guide-search" role="search" action="\/search.html"><label for="guide-q">Search the guides<\/label><input id="guide-q" name="q" type="search"/);
  assert.match(hub, /<p class="search-status" id="guide-status" aria-live="polite" hidden><\/p>/);
  assert.match(hub, /<script type="module" src="\/guide-search\.js"><\/script>/);
  const script = await read('public/guide-search.js');
  assert.match(script, /ul\.guide-list/);
  assert.match(script, /\/videos\?q=\$\{encodeURIComponent\(typed\)\}/);
});

test('guide and video cards outline in orange on hover, and a guide image opens its guide', async () => {
  const css = await read('public/archive.css');
  assert.match(css, /li a:hover img, li a:focus-visible img, \.guide:hover img, \.guide:focus-within img \{ border-color: #ff6846;/);
  assert.match(css, /\.guide h3 a::after \{ content: ''; position: absolute; inset: 0; \}/);
  assert.match(css, /\.guide \.meta a \{ position: relative; z-index: 1; \}/);
});

test('search starts with a few results, then pages matches eight at a time', async () => {
  const page = await read('public/search.html');
  assert.match(page, /<button type="button" class="search-more" id="search-more" hidden>Show more results<\/button>/);
  assert.match(page, /const pageSize = 8;/);
  assert.match(page, /rows\.filter\(row => row\[0\] === 'guide'\)\.slice\(0, 3\), \.\.\.rows\.filter\(row => row\[0\] === 'video'\)\.slice\(0, 3\)/);
  assert.match(page, /more\.addEventListener\('click', \(\) => \{ shown \+= pageSize; run\(\); \}\);/);
});

test('every guide image is a card from scripts/guide-cards.mjs, never a video thumbnail', async () => {
  const { cards } = await import('../scripts/guide-cards.mjs');
  const images = (await readdir(new URL('../public/assets/guides/', import.meta.url))).filter(name => name.endsWith('.webp'));
  assert.deepEqual(images.map(name => name.replace(/\.webp$/, '')).sort(), Object.keys(cards).sort());
  for (const [slug, card] of Object.entries(cards)) assert.equal(card.steps.length, 3, slug);
  assert.doesNotMatch(await read('public/guides.html'), /ytimg\.com/);
});

test('the guides hub shows the headline-only cards, which exist for every guide card', async () => {
  const { existsSync } = await import('node:fs');
  const { cards } = await import('../scripts/guide-cards.mjs');
  const hub = await read('public/guides.html');
  const shown = [...hub.matchAll(/<li class="guide"><img src="\/assets\/guides\/hub\/([a-z0-9-]+)\.webp" srcset="\/assets\/guides\/hub\/\1-400\.webp 400w, \/assets\/guides\/hub\/\1-640\.webp 640w, \/assets\/guides\/hub\/\1-800\.webp 800w, \/assets\/guides\/hub\/\1\.webp 1200w"/g)];
  assert.equal(shown.length, hub.split('<li class="guide">').length - 1);
  for (const slug of Object.keys(cards)) {
    for (const file of [`${slug}.webp`, `${slug}-640.webp`, `${slug}-400.webp`, `${slug}-800.webp`]) assert.ok(existsSync(new URL(`../public/assets/guides/hub/${file}`, import.meta.url)), file);
  }
});

test('Start here is as wide as the guides hub and the video archive', async () => {
  assert.match(await read('public/start-here.html'), /<body class="wide">/);
  assert.match(await read('public/reading.css'), /\.wide header,\.wide main,\.wide footer\{width:min\(1280px,calc\(100% - 32px\)\)\}/);
  assert.match(await read('public/archive.css'), /\.shell \{ width: min\(1280px, calc\(100% - 32px\)\); margin: 0 auto; \}/);
});

test('guide cards offer the 640px copy wherever they show, and every copy exists', async () => {
  const { existsSync } = await import('node:fs');
  for (const path of ['public/guides.html', ...guides.map(file => `public/guides/${file}`)]) {
    for (const [tag, slug] of (await read(path)).matchAll(/<img src="\/assets\/guides\/([a-z0-9-]+)\.webp"[^>]*>/g)) {
      assert.match(tag, new RegExp(`srcset="/assets/guides/sizes/${slug}-640\\.webp 640w, /assets/guides/${slug}\\.webp 1200w" sizes="`), `${path}: ${slug}`);
      assert.ok(existsSync(new URL(`../public/assets/guides/sizes/${slug}-640.webp`, import.meta.url)), slug);
    }
  }
});

test('every guide page shows its own branded card and never points at a YouTube thumbnail', async () => {
  for (const file of guides) {
    const slug = file.replace(/\.html$/, '');
    const html = await read(`public/guides/${file}`);
    assert.doesNotMatch(html, /i\.ytimg\.com|img\.youtube\.com/, file);
    assert.match(html, new RegExp(`<img src="/assets/guides/${slug}\\.webp" srcset="/assets/guides/sizes/${slug}-640\\.webp 640w`), file);
    assert.match(html, new RegExp(`<meta property="og:image" content="https://www\\.ai-automation-station\\.com/assets/guides/${slug}\\.webp"`), file);
  }
});

test('every in-page link on a static page points at an element that exists', async () => {
  const pages = [...guides.map(file => `public/guides/${file}`), ...(await readdir(new URL('../public', import.meta.url))).filter(file => file.endsWith('.html')).map(file => `public/${file}`)];
  for (const path of pages) {
    const html = await read(path);
    // A missing space ("<h2id=") makes the browser drop the attribute, so the anchor silently disappears.
    assert.doesNotMatch(html, /<[a-z][a-z0-9]*(?:id|class|href|src)="/, path);
    const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map(match => match[1]));
    // "#top" scrolls to the top of the page without a matching element.
    for (const [, id] of html.matchAll(/href="#([^"]+)"/g)) if (id !== 'top') assert.ok(ids.has(id), `${path}: #${id}`);
  }
});

test('guide FAQs are collapsible and their FAQPage data matches the visible questions and answers', async () => {
  const plain = fragment => fragment.replace(/<p class="meta">[\s\S]*?<\/p>/g, '').replace(/<\/(p|li|ul|ol)>/g, ' ').replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/\s+/g, ' ').trim();
  for (const file of guides) {
    const html = await read(`public/guides/${file}`);
    const items = [...html.matchAll(/<details class="faq-item"><summary><h3>([\s\S]*?)<\/h3><\/summary>\n([\s\S]*?)\n<\/details>/g)];
    assert.ok(items.length >= 2, file);
    assert.doesNotMatch(html.slice(html.indexOf('<div class="faq-list">'), html.indexOf('</div>', html.indexOf('<div class="faq-list">'))), /<h3>(?![\s\S]*?<\/h3><\/summary>)/, file);
    const data = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(match => JSON.parse(match[1])).filter(entry => entry['@type'] === 'FAQPage');
    assert.equal(data.length, 1, file);
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)[1];
    assert.equal(data[0].url, canonical, file);
    assert.deepEqual(data[0].mainEntity, items.map(([, question, answer]) => ({ '@type': 'Question', name: plain(question), acceptedAnswer: { '@type': 'Answer', text: plain(answer) } })), file);
  }
  assert.match(await read('public/reading.css'), /\.faq-item\[open\] summary::after\{content:'−';border-color:#ff6846;color:#ff6846\}/);
});

test('guides have no unverified placeholders and link to at least five other guides', async () => {
  for (const file of guides) {
    const html = await read(`public/guides/${file}`);
    assert.doesNotMatch(html, /TODO/, file);
    const body = html.slice(html.indexOf('<main'), html.indexOf('</main>'));
    const linked = new Set([...body.matchAll(/href="\/guides\/([a-z0-9-]+)\.html/g)].map(([, slug]) => slug).filter(slug => `${slug}.html` !== file));
    assert.ok(linked.size >= 5, `${file}: ${linked.size}`);
  }
});

test('guide Article data names the author profiles and the topics the guide covers', async () => {
  for (const file of guides) {
    const html = await read(`public/guides/${file}`);
    const article = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(match => JSON.parse(match[1])).find(entry => entry['@type'] === 'Article');
    assert.ok(article.author.sameAs.includes('https://www.youtube.com/@ai-automation-station'), file);
    assert.ok(article.about.length >= 1, file);
    for (const entity of [...article.about, ...(article.mentions || [])]) assert.equal(entity['@type'], 'Thing', `${file}: ${entity.name}`);
  }
});

test('site page titles end in the same brand as the guides', async () => {
  for (const page of ['404', 'privacy', 'search', 'start-here', 'terms']) {
    assert.match((await read(`public/${page}.html`)).match(/<title>(.*?)<\/title>/)[1], / \| Mike Holp$/, page);
  }
  assert.match(await read('api/videos.js'), /<title>\$\{title\} \| Mike Holp<\/title>/);
});
