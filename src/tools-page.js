import { affiliates, categories, logoSlug } from './affiliates.js';
import { videoHeading } from './curated-summary.js';
import { videoSummaries } from './video-summaries.js';
import { videoTools } from './video-tools.js';

const site = 'https://www.ai-automation-station.com';
const entities = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
const escape = text => String(text).replace(/[&<>"']/g, char => entities[char]);
const key = name => name.replace(/\s*\(.*\)\s*$/, '').trim().toLowerCase();
const shownVideos = 3;
const shownGuides = 2;
const topPicks = 5;

export const toolsTitle = 'AI tools I recommend for automation, coding and content';
const description = 'The AI tools from my YouTube descriptions, grouped by job: coding agents, automation, SEO, video, YouTube growth, email and hosting. Each links to the videos that use it.';

// Public uploads whose tool lists name one of the affiliate's tools, newest first. Both lists are read from
// the transcript, so a written summary's list doesn't hide a tool the transcript list caught.
export function videosUsing(affiliate, uploads) {
  const names = new Set(affiliate.tools.map(key));
  return uploads.filter(video => video.public !== false && video.embeddable !== false)
    .filter(video => [...(videoSummaries[video.id]?.toolsUsed ?? []), ...(videoTools[video.id] ?? [])].some(tool => names.has(key(tool))))
    .sort((a, b) => b.published.localeCompare(a.published));
}

// Guides with the tool's name in their title, most recently updated first.
export function guidesAbout(affiliate, guides) {
  const pattern = new RegExp(`(^|[^\\w.])${affiliate.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![\\w])`, 'i');
  return guides.filter(guide => pattern.test(guide.title)).sort((a, b) => (b.modified || '').localeCompare(a.modified || ''));
}

// A "see every tool" line at the end of a guide that links one of the tools' sites, before its closing next steps.
// Guides that promise no affiliate or referral links (the sponsored ones) are left alone.
export function addToolsLink(html) {
  if (html.includes('href="/tools.html" data-placement="guide_tools_all"') || /no (affiliate|referral) (links|codes)/i.test(html)) return html;
  if (!affiliates.some(affiliate => new RegExp(`href="https?://([a-z0-9-]+\\.)*${affiliate.site.replace(/\./g, '\\.')}[/"?]`).test(html))) return html;
  const line = '<p class="meta"><a href="/tools.html" data-placement="guide_tools_all">See every tool I recommend →</a></p>\n';
  const at = ['<aside class="note next-steps"', '<form class="notes"'].map(marker => html.indexOf(marker)).find(index => index !== -1);
  return at === undefined ? html.replace('</main>', `${line}</main>`) : html.slice(0, at) + line + html.slice(at);
}

const usage = count => count === 1 ? 'Used in one video' : `Used in ${count} videos`;
const logo = affiliate => `<img class="tool-logo" src="/tools/logos/${logoSlug(affiliate)}.webp" alt="" width="48" height="48" loading="lazy" decoding="async">`;
const cta = (affiliate, placement) => `<a class="tool-cta" href="${escape(affiliate.url)}" target="_blank" rel="sponsored noopener" data-affiliate="${escape(affiliate.name)}" data-placement="${placement}">${escape(affiliate.cta || `Try ${affiliate.name}`)} ↗</a>`;

function card(affiliate, videos, guides) {
  const related = guidesAbout(affiliate, guides).slice(0, shownGuides);
  const badge = videos.length ? usage(videos.length) : affiliate.recommended ? 'On my recommended list' : '';
  const videoList = videos.length ? `<p class="used-in">Watch it in use${videos.length > shownVideos ? ` (${shownVideos} newest)` : ''}:</p><ul>${videos.slice(0, shownVideos).map(video => `<li><a href="/watch/${video.id}">${escape(videoHeading(video))}</a></li>`).join('')}</ul>` : '';
  const guideList = related.length ? `<p class="used-in">Read: ${related.map(guide => `<a href="${escape(guide.url.replace(site, ''))}">${escape(guide.title)}</a>`).join(' · ')}</p>` : '';
  return `<li class="tool-card" id="${logoSlug(affiliate)}"><div class="tool-head">${logo(affiliate)}<div><h3>${escape(affiliate.name)}</h3>${badge ? `<p class="tool-badge">${badge}</p>` : ''}</div></div><p class="best-for"><strong>Best for:</strong> ${escape(affiliate.bestFor)}.</p><p>${escape(affiliate.blurb)}</p>${affiliate.price ? `<p class="tool-price">${escape(affiliate.price)}</p>` : ''}${cta(affiliate, 'tools_page')}${videoList}${guideList}</li>`;
}

function topPick(affiliate, videos) {
  return `<li>${logo(affiliate)}<div><a class="pick-name" href="#${logoSlug(affiliate)}">${escape(affiliate.name)}</a><p>${usage(videos.length)} · ${escape(affiliate.bestFor)}</p></div>${cta(affiliate, 'tools_top_picks')}</li>`;
}

const nav = '<a href="/start-here.html">Start here</a><a href="/guides.html">Guides</a><a href="/videos">All videos</a><a href="/tools.html" aria-current="page">Tools</a>';

export function renderToolsPage({ uploads, guides = [], updated = new Date() }) {
  const date = updated.toISOString().slice(0, 10);
  const readable = new Intl.DateTimeFormat('en', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(updated);
  const url = `${site}/tools.html`;
  const used = new Map(affiliates.map(affiliate => [affiliate, videosUsing(affiliate, uploads)]));
  // Most-used first, then the tools in every video description.
  const byUse = (a, b) => used.get(b).length - used.get(a).length || Number(Boolean(b.recommended)) - Number(Boolean(a.recommended));
  const grouped = categories.map(([id, label]) => [id, label, affiliates.filter(affiliate => affiliate.category === id).sort(byUse)]).filter(([, , items]) => items.length);
  const picks = [...affiliates].sort(byUse).slice(0, topPicks).filter(affiliate => used.get(affiliate).length);
  const schema = [
    { '@context': 'https://schema.org', '@type': 'CollectionPage', '@id': url, name: toolsTitle, description, url, dateModified: date, author: { '@type': 'Person', '@id': `${site}/#mike`, name: 'Mike Holp', url: `${site}/about.html` }, publisher: { '@id': `${site}/#org` }, isPartOf: { '@id': `${site}/#website` }, inLanguage: 'en',
      mainEntity: { '@type': 'ItemList', numberOfItems: affiliates.length, itemListElement: grouped.flatMap(([, , items]) => items).map((affiliate, index) => ({ '@type': 'ListItem', position: index + 1, name: affiliate.name, description: affiliate.blurb })) } },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: `${site}/` }, { '@type': 'ListItem', position: 2, name: 'Recommended tools', item: url }] },
  ].map(item => `<script type="application/ld+json">${JSON.stringify(item).replace(/</g, '\\u003c')}</script>`).join('\n');

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#0a0a0a"><meta name="robots" content="index,follow"><title>${escape(toolsTitle)} | Mike Holp</title><meta name="description" content="${escape(description)}"><link rel="canonical" href="${url}"><link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="/reading.css"><link rel="stylesheet" href="/consent.css" media="print" onload="this.media='all'"><noscript><link rel="stylesheet" href="/consent.css"></noscript><meta property="og:type" content="website"><meta property="og:title" content="${escape(toolsTitle)}"><meta property="og:description" content="${escape(description)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${site}/og-card.jpg?v=2"><meta name="twitter:card" content="summary_large_image"><script>try{if(localStorage.getItem('theme')==='light')document.documentElement.setAttribute('data-theme','light')}catch(e){}</script><script src="/theme.js" defer></script><script type="module" src="/src/reading.js"></script>${schema}
</head>
<body class="wide"><a class="skip" href="#content">Skip to content</a><header class="single-line-header"><a href="/">AI Income Lab</a><nav aria-label="Site">${nav}</nav><a class="join" href="https://www.skool.com/ai-automation-station-7346/plans" target="_blank" rel="noreferrer" data-placement="reading_header">Join AI Income Lab ↗</a><details class="nav-mobile"><summary aria-label="Site menu">Menu</summary><nav aria-label="Site menu">${nav}</nav></details></header><main id="content"><p class="meta">By <a href="/about.html" rel="author">Mike Holp</a> · Updated <time datetime="${date}">${readable}</time></p><h1>Tools I recommend for AI automation.</h1><p>The tools linked in my YouTube descriptions, with the ones I use most on camera first. Watch any of them in a real build before you sign up.</p>
<aside class="disclosure" aria-label="Affiliate disclosure"><p><strong>Affiliate links.</strong> I may earn a commission or credit if you sign up through these buttons. Check current pricing before you pay.</p></aside>
${picks.length ? `<section class="top-picks" aria-labelledby="top-picks-heading"><h2 id="top-picks-heading">Start here: the ${picks.length} tools I use most</h2><ol>${picks.map(affiliate => topPick(affiliate, used.get(affiliate))).join('')}</ol></section>` : ''}
<nav class="tool-nav" aria-label="Tool categories">${grouped.map(([id, label]) => `<a href="#${id}">${escape(label)}</a>`).join('')}</nav>
${grouped.map(([id, label, items]) => `<section class="tool-group" id="${id}" aria-labelledby="${id}-heading"><h2 id="${id}-heading">${escape(label)}</h2><ul class="tool-cards">${items.map(affiliate => card(affiliate, used.get(affiliate), guides)).join('')}</ul></section>`).join('\n')}
<form class="notes" method="post" data-subscribe data-placement="tools_page"><p><strong>Want to see new tools first?</strong> Get the weekly build notes: new guides and tested builds in one short email.</p><div><label for="notes-email">Email address</label><input id="notes-email" name="email" type="email" autocomplete="email" required maxlength="254" placeholder="you@example.com"><input class="trap" name="hp" tabindex="-1" autocomplete="off" aria-hidden="true"><button type="submit">Subscribe</button></div><p class="notes-status" role="status"></p></form>
<p>New to these tools? <a href="/start-here.html">Choose your first build</a>, or <a href="/guides.html">browse every guide by topic</a>. Making one of these products? <a href="/sponsors.html">Sponsor a build</a>.</p></main><footer><a href="/">Home</a><a href="/privacy.html">Privacy</a><a href="/terms.html">Terms</a><a href="mailto:automojic@proton.me">Email support</a></footer></body></html>
`;
}
