import { affiliates, categories, logoSlug, pricesChecked } from './affiliates.js';
import { videoHeading } from './curated-summary.js';
import { gaBootHead } from './ga-boot-html.js';
import { videoSummaries } from './video-summaries.js';
import { videoTools } from './video-tools.js';

const site = 'https://www.ai-automation-station.com';
const entities = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
const escape = text => String(text).replace(/[&<>"']/g, char => entities[char]);
const key = name => name.replace(/\s*\(.*\)\s*$/, '').trim().toLowerCase();
const shownVideos = 3;
const shownGuides = 2;
const topPicks = 5;

export const toolsTitle = 'Choose AI tools for automation and coding';
const description = 'Choose AI tools by job: coding agents, automation, SEO, video, YouTube, email and hosting, each with a checked price and the videos that show it in use.';

// Public uploads whose tool lists name one of the affiliate's tools, newest first. Both lists are read from
// the transcript, so a written summary's list doesn't hide a tool the transcript list caught.
export function videosUsing(affiliate, uploads) {
  const names = new Set(affiliate.tools.map(key));
  return uploads.filter(video => video.public !== false && video.embeddable !== false)
    .filter(video => [...(videoSummaries[video.id]?.toolsUsed ?? []), ...(videoTools[video.id] ?? [])].some(tool => names.has(key(tool))))
    .sort((a, b) => b.published.localeCompare(a.published));
}

const byUse = (used, a, b) => used.get(b).length - used.get(a).length || Number(Boolean(b.recommended)) - Number(Boolean(a.recommended));

// The most-used tools, for the tools page's top picks and the homepage strip.
export function topTools(uploads, count = topPicks) {
  const used = new Map(affiliates.map(affiliate => [affiliate, videosUsing(affiliate, uploads)]));
  return [...affiliates].sort((a, b) => byUse(used, a, b)).slice(0, count).filter(affiliate => used.get(affiliate).length)
    .map(affiliate => ({ name: affiliate.name, slug: logoSlug(affiliate), videos: used.get(affiliate).length, bestFor: affiliate.bestFor }));
}

// Guides with the tool's name in their title, most recently updated first.
export function guidesAbout(affiliate, guides) {
  const pattern = new RegExp(`(^|[^\\w.])${affiliate.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![\\w])`, 'i');
  return guides.filter(guide => pattern.test(guide.title)).sort((a, b) => (b.modified || '').localeCompare(a.modified || ''));
}

const pattern = text => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const shownGuideTools = 4;
const allToolsLink = '<a href="/tools.html" data-placement="guide_tools_all">See every tool I recommend →</a>';
// Sponsored guides and guides that promise plain links get no affiliate links.
const plainLinksOnly = /no (affiliate|referral) (links|codes)|plain links only|no tracking parameters/i;

// A tool's names as written in prose. Model versions such as Gemini 4 aren't the Gemini app, and "Make" alone
// is too often the verb.
const mentionPattern = (affiliate, flags = 'g') => {
  const names = [...new Set([affiliate.name, ...affiliate.tools])].filter(name => name !== 'Make').sort((a, b) => b.length - a.length);
  return new RegExp(`(?<![\\w.-])(?:${names.map(pattern).join('|')})(?![\\w-]|\\.\\w|\\s+\\d)`, flags);
};

// Affiliate tools a guide is about: named in its title, linked from it, or mentioned at least three times
// in the text. The AI Income Lab community link and mentions don't count as Skool. A guide that only uses a tool
// as an example (a scanned site, say) names it in <meta name="affiliate-exclude" content="Hostinger, …">. Strongest first.
export function guideTools(html) {
  const excluded = new Set((html.match(/<meta name="affiliate-exclude" content="([^"]*)">/)?.[1] ?? '').split(',').map(name => name.trim()));
  const main = html.slice(Math.max(0, html.indexOf('<main')), html.includes('</main>') ? html.indexOf('</main>') : undefined);
  const title = main.match(/<h1[^>]*>([^]*?)<\/h1>/)?.[1].replace(/<[^>]+>/g, '') ?? '';
  const links = main.replaceAll(/href="https:\/\/www\.skool\.com\/ai-automation-station[^"]*"/g, '');
  const text = main.replace(/<(script|style|pre|code)\b[^]*?<\/\1>/g, ' ').replace(/<[^>]+>/g, ' ');
  return affiliates.filter(affiliate => !excluded.has(affiliate.name)).map(affiliate => {
    const inTitle = guidesAbout(affiliate, [{ title }]).length > 0;
    const linked = links.match(new RegExp(`href="https?://([a-z0-9-]+\\.)*${pattern(affiliate.site)}[/"?]`, 'g'))?.length ?? 0;
    const mentions = text.match(mentionPattern(affiliate))?.length ?? 0;
    const counts = inTitle || linked || (mentions >= 3 && affiliate.name !== 'Skool');
    return [affiliate, counts ? (inTitle ? 1000 : 0) + linked * 10 + mentions : 0];
  }).filter(([, score]) => score).sort((a, b) => b[1] - a[1]).map(([affiliate]) => affiliate);
}

// Prose that inline links may touch: paragraphs outside headings, links, code, navigation, figures, asides and tables.
const noLinkTags = new Set(['a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code', 'pre', 'script', 'style', 'nav', 'button', 'summary', 'figure', 'aside', 'blockquote', 'table', 'label']);
const affiliateNote = '<p class="meta">Some tool links in this guide are affiliate links, so I may earn a commission or credit.</p>\n';

// Links the first plain mention of each covered tool to its affiliate URL, from the second paragraph after the
// title (the first is the quick answer) up to the sources, with the disclosure before the first such paragraph.
export function linkFirstMentions(html, tools) {
  const start = html.indexOf('</h1>');
  const end = Math.min(...['<h2 id="sources"', '<aside class="note next-steps"', '<form class="notes"', '</main>'].map(marker => html.indexOf(marker, start)).filter(index => index > start));
  if (start === -1 || !Number.isFinite(end)) return html;
  const pending = tools.filter(affiliate => !html.includes(`href="${escape(affiliate.url)}"`));
  const skip = [];
  let paragraphs = 0;
  let inParagraph = false;
  let paragraphAt = -1;
  let noteAt = -1;
  const out = [];
  for (const [token, close, name] of html.slice(start, end).matchAll(/<(\/?)([a-zA-Z][\w-]*)\b[^>]*>|[^<]+|</g)) {
    const tag = name?.toLowerCase();
    if (tag) {
      if (noLinkTags.has(tag)) close ? skip.pop() : skip.push(tag);
      if (tag === 'p' && !skip.length) {
        inParagraph = !close;
        if (!close) { paragraphs++; paragraphAt = out.length; }
      }
      out.push(token);
      continue;
    }
    if (!pending.length || skip.length || !inParagraph || paragraphs < 2 || token === '<') { out.push(token); continue; }
    const found = pending.map(affiliate => [affiliate, mentionPattern(affiliate, '').exec(token)]).filter(([, match]) => match).sort((a, b) => a[1].index - b[1].index);
    let text = '';
    let from = 0;
    for (const [affiliate, match] of found) {
      if (match.index < from) continue;
      text += `${token.slice(from, match.index)}<a href="${escape(affiliate.url)}" target="_blank" rel="sponsored noopener" data-affiliate="${escape(affiliate.name)}" data-placement="guide_inline">${match[0]}</a>`;
      from = match.index + match[0].length;
      pending.splice(pending.indexOf(affiliate), 1);
      if (noteAt === -1) noteAt = paragraphAt;
    }
    out.push(text + token.slice(from));
  }
  if (noteAt !== -1) out.splice(noteAt, 0, affiliateNote);
  return html.slice(0, start) + out.join('') + html.slice(end);
}

// Guides get the first in-text mention of each tool they cover linked to its affiliate URL and, before their
// closing next steps, a box listing those tools with tools-page card and affiliate links (or just a link to the
// tools page when they cover none).
export function addToolsLink(html) {
  if (html.includes('data-placement="guide_tools_all"') || plainLinksOnly.test(html)) return html;
  const tools = guideTools(html).slice(0, shownGuideTools);
  html = linkFirstMentions(html, tools);
  const block = tools.length
    ? `<aside class="note guide-tools" aria-label="Tools in this guide"><p><strong>Tools in this guide</strong></p><ul>${tools.map(affiliate => `<li><a href="/tools.html#${logoSlug(affiliate)}" data-placement="guide_tool_card">${escape(affiliate.name)} pricing and videos</a>: ${escape(affiliate.bestFor)}. <a href="${escape(affiliate.url)}" target="_blank" rel="sponsored noopener" data-affiliate="${escape(affiliate.name)}" data-placement="guide_tools">Try ${escape(affiliate.name)} ↗</a></li>`).join('')}</ul><p class="meta">Try links are affiliate links, so I may earn a commission or credit. ${allToolsLink}</p></aside>\n`
    : `<p class="meta">${allToolsLink}</p>\n`;
  const at = ['<aside class="note next-steps"', '<form class="notes"'].map(marker => html.indexOf(marker)).find(index => index !== -1);
  return at === undefined ? html.replace('</main>', `${block}</main>`) : html.slice(0, at) + block + html.slice(at);
}

const usage = count => count === 1 ? 'Used in one video' : `Used in ${count} videos`;
const logo = affiliate => `<img class="tool-logo" src="/tools/logos/${logoSlug(affiliate)}.webp" alt="" width="48" height="48" loading="lazy" decoding="async">`;
const cta = (affiliate, placement) => `<a class="tool-cta" href="${escape(affiliate.url)}" target="_blank" rel="sponsored noopener" data-affiliate="${escape(affiliate.name)}" data-category="${affiliate.category}" data-placement="${placement}">${escape(affiliate.cta || `Try ${affiliate.name}`)} ↗</a>`;

function card(affiliate, videos, guides) {
  const related = guidesAbout(affiliate, guides).slice(0, shownGuides);
  const badge = videos.length ? usage(videos.length) : affiliate.recommended ? 'On my recommended list' : '';
  const videoList = videos.length ? `<p class="used-in">Watch it in use${videos.length > shownVideos ? ` (${shownVideos} newest)` : ''}:</p><ul>${videos.slice(0, shownVideos).map(video => `<li><a href="/watch/${video.id}">${escape(videoHeading(video))}</a></li>`).join('')}</ul>` : '';
  const guideList = related.length ? `<p class="used-in">Read: ${related.map(guide => `<a href="${escape(guide.url.replace(site, ''))}">${escape(guide.title)}</a>`).join(' · ')}</p>` : '';
  return `<li class="tool-card" id="${logoSlug(affiliate)}"><div class="tool-head">${logo(affiliate)}<div><h3>${escape(affiliate.name)}</h3>${badge ? `<p class="tool-badge">${badge}</p>` : ''}</div></div><p class="best-for"><strong>Best for:</strong> ${escape(affiliate.bestFor)}.</p><p>${escape(affiliate.blurb)}</p>${affiliate.price ? `<p class="tool-price"><strong>Price:</strong> ${escape(affiliate.price)}</p>` : ''}${cta(affiliate, 'tools_page')}${videoList}${guideList}</li>`;
}

function topPick(affiliate, videos) {
  return `<li>${logo(affiliate)}<div><a class="pick-name" href="#${logoSlug(affiliate)}">${escape(affiliate.name)}</a><p>${usage(videos.length)} · ${escape(affiliate.bestFor)}</p></div>${cta(affiliate, 'tools_top_picks')}</li>`;
}

export function renderToolsPage({ uploads, guides = [], updated = new Date() }) {
  const date = updated.toISOString().slice(0, 10);
  const longDate = new Intl.DateTimeFormat('en', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
  const readable = longDate.format(updated);
  const priceDate = longDate.format(new Date(`${pricesChecked}T00:00:00Z`));
  const url = `${site}/tools.html`;
  const used = new Map(affiliates.map(affiliate => [affiliate, videosUsing(affiliate, uploads)]));
  // Most-used first, then the tools in every video description.
  const grouped = categories.map(([id, label, short]) => [id, label, affiliates.filter(affiliate => affiliate.category === id).sort((a, b) => byUse(used, a, b)), short]).filter(([, , items]) => items.length);
  const nav = grouped.map(([id, , , short]) => `<a href="#${id}">${escape(short)}</a>`).join('');
  const picks = topTools(uploads).map(pick => affiliates.find(affiliate => affiliate.name === pick.name));
  const schema = [
    { '@context': 'https://schema.org', '@type': 'CollectionPage', '@id': url, name: toolsTitle, description, url, dateModified: date, author: { '@type': 'Person', '@id': `${site}/#mike`, name: 'Mike Holp', url: `${site}/about.html` }, publisher: { '@id': `${site}/#org` }, isPartOf: { '@id': `${site}/#website` }, inLanguage: 'en',
      mainEntity: { '@type': 'ItemList', numberOfItems: affiliates.length, itemListElement: grouped.flatMap(([, , items]) => items).map((affiliate, index) => ({ '@type': 'ListItem', position: index + 1, name: affiliate.name, description: affiliate.blurb, url: `${url}#${logoSlug(affiliate)}` })) } },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: `${site}/` }, { '@type': 'ListItem', position: 2, name: 'Recommended tools', item: url }] },
  ].map(item => `<script type="application/ld+json">${JSON.stringify(item).replace(/</g, '\\u003c')}</script>`).join('\n');

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#0a0a0a"><meta name="robots" content="index,follow"><title>${escape(toolsTitle)} | Mike Holp</title><meta name="description" content="${escape(description)}"><link rel="canonical" href="${url}"><link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="/reading.css"><link rel="stylesheet" href="/consent.css" media="print" onload="this.media='all'"><noscript><link rel="stylesheet" href="/consent.css"></noscript><meta property="og:type" content="website"><meta property="og:title" content="${escape(toolsTitle)}"><meta property="og:description" content="${escape(description)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${site}/og-card.jpg?v=2"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escape(toolsTitle)}"><meta name="twitter:description" content="${escape(description)}"><script>try{if(localStorage.getItem('theme')==='light')document.documentElement.setAttribute('data-theme','light')}catch(e){}</script>${gaBootHead}<script src="/theme.js" defer></script><script type="module" src="/src/reading.js"></script>${schema}
</head>
<body class="wide"><a class="skip" href="#content">Skip to content</a><header class="single-line-header tools-header"><a href="/">AI Income Lab</a><nav aria-label="Tool categories">${nav}</nav><a class="join" href="https://www.skool.com/ai-automation-station-7346/plans" target="_blank" rel="noreferrer" data-placement="reading_header">Join AI Income Lab ↗</a><details class="nav-mobile"><summary aria-label="Tool categories menu">Categories</summary><nav aria-label="Tool categories menu">${nav}</nav></details></header><main id="content"><p class="meta">By <a href="/about.html" rel="author">Mike Holp</a> · Updated <time datetime="${date}">${readable}</time></p><h1>Tools I recommend for AI automation.</h1><p>The tools linked in my YouTube descriptions, with the ones I use most on camera first. Watch any of them in a real build before you sign up.</p>
<aside class="disclosure" aria-label="Affiliate disclosure"><p><strong>Affiliate links.</strong> I may earn a commission or credit if you sign up through these buttons. Prices are in USD from each tool’s pricing page on ${priceDate}, so check the current price before you pay.</p></aside>
${picks.length ? `<section class="top-picks" aria-labelledby="top-picks-heading"><h2 id="top-picks-heading">Start here: the ${picks.length} tools I use most</h2><ol>${picks.map(affiliate => topPick(affiliate, used.get(affiliate))).join('')}</ol></section>` : ''}
<p class="meta">How this list works: each card counts the videos that use the tool on screen, read from the video transcripts, and the most-used tools come first. A tool marked “On my recommended list” is in every video description but has no build video yet.</p>
${grouped.map(([id, label, items]) => `<section class="tool-group" id="${id}" aria-labelledby="${id}-heading"><h2 id="${id}-heading">${escape(label)}</h2><ul class="tool-cards">${items.map(affiliate => card(affiliate, used.get(affiliate), guides)).join('')}</ul></section>`).join('\n')}
<form class="notes" method="post" data-subscribe data-placement="tools_page"><p><strong>Want to see new tools first?</strong> Get the weekly build notes: new guides and tested builds in one short email.</p><div><label for="notes-email">Email address</label><input id="notes-email" name="email" type="email" autocomplete="email" required maxlength="254" placeholder="you@example.com"><input class="trap" name="hp" tabindex="-1" autocomplete="off" aria-hidden="true"><button type="submit">Subscribe</button></div><p class="notes-status" role="status"></p></form>
<p>New to these tools? <a href="/start-here.html">Choose your first build</a>, or <a href="/guides.html">browse every guide by topic</a>. Making one of these products? <a href="/sponsors.html">Sponsor a build</a>.</p></main><footer><a href="/">Home</a><a href="/privacy.html">Privacy</a><a href="/terms.html">Terms</a><a href="mailto:automojic@proton.me">Email support</a></footer></body></html>
`;
}
