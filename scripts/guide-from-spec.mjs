// Renders written-guide specs (specs/*.mjs) into public/guides/<slug>.html and registers each guide.
// Usage: node scripts/guide-from-spec.mjs <slug> [slug ...]   (spec: docs/guide-specs/<slug>.mjs)
// After it runs: node scripts/guide-cards.mjs <slug>, node scripts/guide-video-schema.mjs, npm test.
// Spec fields: slug, video, alsoWatch?, type (Comparison|Case study|How-to|Review|Tool guide|Explainer),
// title (<=60), short, description (<=155), hub, watchLabel, about[], card{title,steps[3],note},
// quick, who?, intro, sections[{id,h,html}], limits[], done?[], faq[[q,a]], sources[] (>=1 non-YouTube),
// related[5+ [path,title]], next, more, linkFrom[], llms.
// Do not use "the recording" / "in the recording"; write in first person.
import { readFileSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const root = new URL('..', import.meta.url).pathname.replace(/\/$/, '');
const here = `${root}/docs`;
const site = 'https://www.ai-automation-station.com';
const TODAY = '2026-11-19';
const TODAY_LONG = 'November 19, 2026';
const { uploads } = await import(`${root}/src/uploads-snapshot.js`);
const byId = new Map(uploads.map(v => [v.id, v]));
const esc = t => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const rd = p => readFileSync(`${root}/${p}`, 'utf8');
const wr = (p, s) => writeFileSync(`${root}/${p}`, s);
const must = (cond, msg) => { if (!cond) throw new Error(msg); };

const ref = rd('public/guides/google-ai-studio-chat-app.html');
const bodyStart = ref.indexOf('<body>');
const headerBlock = ref.slice(bodyStart, ref.indexOf('<main id="content">')); // body tag through site header
const tail = ref.slice(ref.indexOf('<section class="cta"')); // join card, notes form, footer

const clock = s => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

const TYPES = new Set(['Comparison', 'Case study', 'How-to', 'Review', 'Tool guide', 'Explainer', 'Build guide']);
const recordingPhrase = /\b(the recording|in the recording|this recording|spoken source)\b/i;

function render(s) {
  const v = byId.get(s.video);
  must(v, `${s.slug}: unknown video ${s.video}`);
  must(TYPES.has(s.type), `${s.slug}: type must be one of ${[...TYPES].join(', ')}`);
  must(s.title.length <= 60, `${s.slug}: title is ${s.title.length} chars (max 60)`);
  must(s.description.length <= 155, `${s.slug}: description is ${s.description.length}`);
  must(s.sections.length >= 3, `${s.slug}: need >= 3 sections`);
  must(new Set([...s.related.map(r => r[0]), s.next[0]]).size >= 5, `${s.slug}: need 5 distinct guide links (distinct guide links)`);
  const nonYt = (s.sources ?? []).filter(x => !/youtube\.com\/watch/.test(x));
  must(nonYt.length >= 1, `${s.slug}: Sources need at least one non-YouTube link`);
  const blob = [s.quick, s.intro, ...s.sections.map(x => x.h + x.html), ...(s.limits ?? []), ...(s.done ?? []), ...s.faq.flat(), ...s.sources, s.llms, s.hub, s.card?.note].join('\n');
  must(!recordingPhrase.test(blob), `${s.slug}: avoid "the recording"; write in first person`);
  const done = s.done ?? s.card.steps.map(([, detail]) => detail.replace(/\.$/, ''));
  const url = `${site}/guides/${s.slug}.html`;
  const img = `${site}/assets/guides/${s.slug}.webp`;
  const author = { '@type': 'Person', '@id': `${site}/#mike`, name: 'Mike Holp', url: `${site}/about.html`, sameAs: ['https://www.youtube.com/@ai-automation-station', 'https://github.com/mikeholp87', 'https://www.linkedin.com/in/mikeholp', 'https://x.com/mikeholp', 'https://www.visiscan.app/about'] };
  const article = { '@context': 'https://schema.org', '@type': 'Article', headline: s.title, description: s.description, url, mainEntityOfPage: url, image: img, datePublished: TODAY, dateModified: TODAY, author, publisher: { '@type': 'Organization', '@id': `${site}/#org`, name: 'AI Automation Station', url: `${site}/`, logo: { '@type': 'ImageObject', url: `${site}/logo.png`, width: 512, height: 512 } }, isPartOf: { '@type': 'WebSite', '@id': `${site}/#website`, name: 'AI Automation Station', url: `${site}/` }, inLanguage: 'en', about: s.about.map(name => ({ '@type': 'Thing', name })) };
  const crumbs = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: `${site}/` }, { '@type': 'ListItem', position: 2, name: 'Guides', item: `${site}/guides.html` }, { '@type': 'ListItem', position: 3, name: s.title, item: url }] };
  const faq = { '@context': 'https://schema.org', '@type': 'FAQPage', '@id': `${url}#faq-schema`, url, mainEntity: s.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a.replace(/<[^>]+>/g, '') } })) };
  const toc = [...s.sections.map(x => [x.id, x.h]), ['done', 'Done when'], ...(s.limits ? [['limits', "What I didn't cover"]] : []), ['watch-the-walkthrough', 'Watch the walkthrough'], ['faq', 'FAQ'], ['sources', 'Sources']];
  const chapters = (v.chapters ?? []).map(c => `<li><a href="https://www.youtube.com/watch?v=${v.id}&amp;t=${c.seconds}s">${clock(c.seconds)}</a> ${esc(c.label)}</li>`).join('');
  const related = s.related.map(([p, t]) => `<a href="${p}">${esc(t)}</a>`);
  const relatedText = related.length > 1 ? `${related.slice(0, -1).join(', ')} and ${related.at(-1)}` : related[0];
  const alt = s.alt ?? `Diagram for the ${s.short} guide: ${s.card.steps.map(([a, b]) => `${a.toLowerCase()}: ${b.replace(/\.$/, '')}`).join('; ')}.`;
  const caption = s.card.steps.map(([a]) => a).join(' → ');
  const head = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="theme-color" content="#0a0a0a">
<meta name="robots" content="index,follow">
<title>${esc(s.title)}</title>
<meta name="description" content="${esc(s.description)}">
<link rel="canonical" href="${url}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="/reading.css">
<link rel="stylesheet" href="/consent.css" media="print" onload="this.media='all'">
<noscript><link rel="stylesheet" href="/consent.css"></noscript>
<meta property="og:type" content="article">
<meta property="og:title" content="${esc(s.title)}">
<meta property="og:description" content="${esc(s.description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${img}">
<meta property="og:site_name" content="AI Automation Station">
<meta property="article:published_time" content="${TODAY}">
<meta property="article:modified_time" content="${TODAY}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(s.title)}">
<meta name="twitter:description" content="${esc(s.description)}">
<meta name="twitter:image" content="${img}">
<script>try{if(localStorage.getItem('theme')==='light')document.documentElement.setAttribute('data-theme','light')}catch(e){}</script>
<script src="/theme.js" defer></script>
<script type="module" src="/src/reading.js"></script>
<script type="application/ld+json">${JSON.stringify(article)}</script>
<script type="application/ld+json">${JSON.stringify(crumbs)}</script>
<script type="application/ld+json">${JSON.stringify(faq)}</script>
</head>
`;
  const body = `<main id="content">
<nav class="breadcrumbs" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li><a href="/guides.html">Guides</a></li><li><span aria-current="page">${esc(s.title)}</span></li></ol></nav>
<p class="meta">${esc(s.type)} · By <a href="/about.html" rel="author">Mike Holp</a> · Published <time datetime="${TODAY}">${TODAY_LONG}</time> · Updated <time datetime="${TODAY}">${TODAY_LONG}</time></p>
<h1>${esc(s.title)}</h1>
<figure><img src="/assets/guides/${s.slug}.webp" srcset="/assets/guides/sizes/${s.slug}-640.webp 640w, /assets/guides/${s.slug}.webp 1200w" sizes="(max-width: 1160px) calc(100vw - 40px), 1120px" alt="${esc(alt)}" width="1200" height="630" loading="eager" fetchpriority="high"><figcaption>${esc(caption)}</figcaption></figure>
<nav class="toc" aria-label="On this page"><h2>On this page</h2><ul>${toc.map(([id, h]) => `<li><a href="#${id}">${esc(h)}</a></li>`).join('')}</ul></nav>
<section class="quick-answer" aria-labelledby="quick-answer-heading">
  <h2 id="quick-answer-heading">Quick answer</h2>
  <p>${s.quick}</p>${s.who ? `
  <p><strong>Who this is for:</strong> ${s.who}</p>` : ''}
</section>
${s.intro}
${s.sections.map(x => `<h2 id="${x.id}">${esc(x.h)}</h2>\n${x.html}`).join('\n')}
<h2 id="done">Done when</h2>
<ul>${done.map(item => `<li>${item}</li>`).join('')}</ul>
${s.limits ? `<h2 id="limits">What I didn't cover</h2>\n<ul>${s.limits.map(l => `<li>${l}</li>`).join('')}</ul>${s.limitsAfter ? `<p>${s.limitsAfter}</p>` : ''}` : ''}
<h2 id="watch-the-walkthrough">Watch the walkthrough</h2>
<figure class="video"><a class="player" href="https://www.youtube.com/watch?v=${v.id}" data-embed="https://www.youtube-nocookie.com/embed/${v.id}" aria-label="Play ${esc(v.title)}"><img src="https://i.ytimg.com/vi/${v.id}/maxresdefault.jpg" alt="" width="1280" height="720" loading="lazy" decoding="async"><span class="play" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></span></a><figcaption>Watch on YouTube: ${esc(v.title)}. Also on this site with notes: <a href="/watch/${v.id}">the watch page</a>.</figcaption></figure>
${(v.chapters ?? []).length >= 3 ? `<ul class="video-chapters" aria-label="Chapters in ${esc(v.title)}">${chapters}</ul>` : ''}
<h2 id="faq">FAQ</h2>
<div class="faq-list">
${s.faq.map(([q, a]) => `<details class="faq-item"><summary><h3>${esc(q)}</h3></summary>\n<p>${a}</p>\n</details>`).join('\n')}
</div>
<h2 id="sources">Sources</h2>
<ul>${s.sources.map(x => `<li>${x}</li>`).join('')}</ul>
<p class="related-guides">Related guides: ${relatedText}.</p>
<aside class="note next-steps" aria-labelledby="keep-going"><h2 id="keep-going">Keep going</h2><ul><li>Next guide: <a href="${s.next[0]}">${esc(s.next[1])}</a></li><li>Watch: <a href="/watch/${v.id}">${esc(v.title)}</a></li><li>${s.more}</li></ul></aside>
`;
  return head + headerBlock + body + tail;
}

function insertAfter(text, anchor, add, label) {
  const i = text.indexOf(anchor);
  must(i >= 0, `anchor missing: ${label}`);
  const end = text.indexOf('\n', i) + 1;
  return text.slice(0, end) + add + text.slice(end);
}

function register(s) {
  const v = byId.get(s.video);
  const url = `${site}/guides/${s.slug}.html`;
  // 1. card definition
  let cards = rd('scripts/guide-cards.mjs');
  if (!cards.includes(`'${s.slug}': {`) && !cards.includes(`"${s.slug}": {`)) {
    cards = cards.replace('export const cards = {\n', `export const cards = {\n  '${s.slug}': {\n    title: ${JSON.stringify(s.card.title)},\n    steps: ${JSON.stringify(s.card.steps)},\n    note: ${JSON.stringify(s.card.note)},\n  },\n`);
    wr('scripts/guide-cards.mjs', cards);
  }
  // 2. hub card + ItemList + dates
  let hub = rd('public/guides.html');
  if (!hub.includes(`href="/guides/${s.slug}.html"`)) {
    const li = `<li class="guide"><img src="/assets/guides/hub/${s.slug}.webp" srcset="/assets/guides/hub/${s.slug}-400.webp 400w, /assets/guides/hub/${s.slug}-640.webp 640w, /assets/guides/hub/${s.slug}-800.webp 800w, /assets/guides/hub/${s.slug}.webp 1200w" sizes="(max-width: 735px) calc(100vw - 32px), (max-width: 1099px) calc((100vw - 56px) / 2), (max-width: 1311px) calc((100vw - 80px) / 3), 411px" alt="" width="1200" height="630" loading="lazy"><div><h3><a href="/guides/${s.slug}.html">${esc(s.title)}</a></h3><p>${esc(s.hub)}</p><p class="meta">Video: <a href="/watch/${v.id}">${esc(v.title)}</a></p></div></li>`;
    const anchor = '<li class="guide"><img src="/assets/guides/hub/apify-agent-skills.webp"';
    must(hub.includes(anchor), 'hub anchor');
    hub = hub.replace(anchor, li + anchor);
    const m = hub.match(/"numberOfItems":(\d+)\}/);
    const n = Number(m[1]) + 1;
    hub = hub.replace(m[0], `"numberOfItems":${n}}`).replace(/\],"numberOfItems":/, `,{"@type":"ListItem","position":${n},"name":${JSON.stringify(s.title)},"url":"${url}"}],"numberOfItems":`);
    hub = hub.replace(/"dateModified":"[\d-]+"/, `"dateModified":"${TODAY}"`).replace(/Updated <time datetime="[\d-]+">[^<]*<\/time>/, `Updated <time datetime="${TODAY}">${TODAY_LONG}</time>`);
    wr('public/guides.html', hub);
  }
  // 3. llms.txt + llms-full.txt
  const line = `- [${s.title}](${url}): ${s.description}\n`;
  for (const f of ['public/llms.txt', 'public/llms-full.txt']) {
    let t = rd(f);
    if (!t.includes(`(${url})`)) {
      t = insertAfter(t, '/guides/apify-agent-skills.html): ', line, f);
      if (f.endsWith('full.txt')) {
        const m = t.match(/### [^\n]*\nhttps:\/\/www\.ai-automation-station\.com\/guides\/apify-agent-skills\.html \(updated/);
        must(m, 'llms-full anchor');
        t = t.replace(m[0], `### ${s.title}\n${url} (updated ${TODAY})\n${s.llms}\n\n${m[0]}`);
      }
      wr(f, t);
    }
  }
  // 4. sitemap
  let sm = rd('public/sitemap.xml');
  if (!sm.includes(`<loc>${url}</loc>`)) {
    sm = insertAfter(sm, `<loc>${site}/guides/apify-agent-skills.html</loc>`, `  <url><loc>${url}</loc><lastmod>${TODAY}</lastmod></url>\n`, 'sitemap');
    sm = sm.replace(/(<loc>https:\/\/www\.ai-automation-station\.com\/guides\.html<\/loc><lastmod>)[\d-]+/, `$1${TODAY}`);
    wr('public/sitemap.xml', sm);
  }
  // 5. watch page → guide
  let arch = rd('src/archive.js');
  const entry = `  ${/^[A-Za-z_$][\w$]*$/.test(v.id) ? v.id : `'${v.id}'`}: [['/guides/${s.slug}.html', ${JSON.stringify(s.watchLabel).replace(/^"|"$/g, "'")}]],\n`;
  const existing = new RegExp(`^  '?${v.id.replace(/[-]/g, '\\-')}'?: \\[[^\\n]*\\n`, 'm');
  if (existing.test(arch)) arch = arch.replace(existing, entry);
  else arch = insertAfter(arch, '  mtpX58dNfCE: [', entry, 'archive watchGuideLinks');
  for (const extra of s.alsoWatch ?? []) {
    const e2 = `  ${/^[A-Za-z_$][\w$]*$/.test(extra) ? extra : `'${extra}'`}: [['/guides/${s.slug}.html', ${JSON.stringify(s.watchLabel).replace(/^"|"$/g, "'")}]],\n`;
    if (!arch.includes(`  ${extra}: [['/guides/`)) arch = insertAfter(arch, '  mtpX58dNfCE: [', e2, 'archive extra');
  }
  wr('src/archive.js', arch);
  // 6. test poster map
  let test = rd('src/guides.test.js');
  if (!test.includes(`'${s.slug}.html':`)) {
    test = insertAfter(test, `  'apify-agent-skills.html': 'mtpX58dNfCE',`, `  '${s.slug}.html': '${v.id}',\n`, 'test map');
    wr('src/guides.test.js', test);
  }
  // 7. incoming links from existing guides
  for (const path of s.linkFrom ?? []) {
    const file = `public${path}`;
    let html = rd(file);
    if (html.includes(`href="/guides/${s.slug}.html"`)) continue;
    const m = html.match(/(<p class="related-guides">Related guides: [^\n]*?)(\.<\/p>)/);
    if (m) html = html.replace(m[0], `${m[1]}; also <a href="/guides/${s.slug}.html">${esc(s.title)}</a>${m[2]}`);
    else {
      const k = html.indexOf('</ul></aside>');
      must(k >= 0, `no related block in ${path}`);
      html = html.slice(0, k) + `<li>Related guide: <a href="/guides/${s.slug}.html">${esc(s.title)}</a></li>` + html.slice(k);
    }
    wr(file, html);
  }
}

for (const slug of process.argv.slice(2)) {
  const spec = (await import(pathToFileURL(`${here}/guide-specs/${slug}.mjs`).href)).default;
  must(spec.slug === slug, `slug mismatch ${slug}`);
  writeFileSync(`${root}/public/guides/${slug}.html`, render(spec));
  register(spec);
  console.log('generated', slug);
}
