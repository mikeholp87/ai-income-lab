import { channelUrl, clock, describe, durationSeconds, formatDuration, longFormPlaylistId, median, parseChapters, summarize, validChapters } from './youtube.js';
import { videoNotes } from './video-notes.js';
import { videoOffer } from './video-offer.js';
import { listingSummaries, videoSummaries } from './video-summaries.js';
import { watchNotes } from './watch-notes.js';
import { watchPageCopy } from './watch-page-copy.js';
import { videoChapters } from './video-chapters.js';
import { toolLink } from './tool-links.js';
import { sponsorDisclosures } from './sponsor-disclosures.js';
import { videoTools } from './video-tools.js';
import { curatedSummary, searchTitle, videoHeading } from './curated-summary.js';
import { archiveCss, consentCss, readingCss } from './asset-version.js';
import { fixTerms, transcriptParagraphs } from './transcript.js';
import transcripts from './transcripts.json' with { type: 'json' };
import { topicFor, topics } from './topics.js';
import { localThumbnail, youtubeSrcSet } from './thumbnail.js';

export { curatedSummary };

const site = 'https://www.ai-automation-station.com';
const entities = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
const escape = text => String(text).replace(/[&<>"']/g, char => entities[char]);
const dateFormat = new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
const listFormat = new Intl.ListFormat('en');
export const fontPreloads = ['instrument-sans', 'archivo-black'].map(font => `<link rel="preload" href="/fonts/${font}.woff2" as="font" type="font/woff2" crossorigin>`).join('\n');

// playlistItems pages (snippet, status, contentDetails) → public long-form uploads, newest first.
export function parseUploads(pages) {
  return pages.flatMap(page => page.items ?? [])
    .filter(item => item.status?.privacyStatus === 'public')
    .map(({ snippet, contentDetails }) => ({
      id: snippet.resourceId.videoId,
      title: snippet.title,
      published: contentDetails?.videoPublishedAt ?? snippet.publishedAt,
      summary: summarize(snippet.description ?? ''),
      details: describe(snippet.description ?? ''),
      chapters: parseChapters(snippet.description ?? ''),
    }))
    .sort((a, b) => b.published.localeCompare(a.published));
}

// Every long-form upload: one playlistItems call (1 quota unit) per 50 videos, then one videos call per 50
// (1 unit whatever parts are requested) for privacy, embedding, length (ISO 8601, e.g. PT13M3S), views, and
// the "Includes paid promotion" box ticked in YouTube Studio.
export async function fetchUploads(key, signal = AbortSignal.timeout(8000)) {
  const api = 'https://www.googleapis.com/youtube/v3';
  const pages = [];
  let pageToken = '';
  do {
    const response = await fetch(`${api}/playlistItems?part=snippet,status,contentDetails&maxResults=50&playlistId=${longFormPlaylistId}&key=${key}${pageToken && `&pageToken=${pageToken}`}`, { signal });
    if (!response.ok) throw new Error(`playlistItems ${response.status}`);
    const page = await response.json();
    pages.push(page);
    pageToken = page.nextPageToken ?? '';
  } while (pageToken && pages.length < 20);
  const videos = parseUploads(pages).filter(video => /^[\w-]{11}$/.test(video.id) && Number.isFinite(Date.parse(video.published)));
  // Confirm embedding is permitted before linking a watch page or listing it in the sitemap.
  for (let index = 0; index < videos.length; index += 50) {
    const batch = videos.slice(index, index + 50);
    const response = await fetch(`${api}/videos?part=status,contentDetails,statistics,paidProductPlacementDetails&id=${batch.map(video => video.id).join(',')}&key=${key}`, { signal });
    if (!response.ok) throw new Error(`video status ${response.status}`);
    const details = new Map(((await response.json()).items ?? []).map(item => [item.id, item]));
    for (const video of batch) {
      const item = details.get(video.id);
      video.public = item?.status?.privacyStatus === 'public';
      video.embeddable = video.public && Boolean(item.status.embeddable);
      video.duration = item?.contentDetails?.duration;
      video.views = Number(item?.statistics?.viewCount ?? 0);
      video.sponsored = Boolean(item?.paidProductPlacementDetails?.hasPaidProductPlacement);
    }
  }
  return videos.filter(video => video.public);
}

// Include reviewed spoken disclosures as well as YouTube's paid-promotion flag; only public uploads are eligible.
export const sponsoredVideos = videos => videos.filter(video => video.public !== false && (video.sponsored || Object.hasOwn(sponsorDisclosures, video.id)))
  .map(video => ({ id: video.id, title: video.title, heading: videoHeading(video), summary: curatedSummary(video) || video.summary || '', published: video.published, views: video.views, duration: formatDuration(video.duration), embeddable: video.embeddable }));

// The sponsors page compares sponsored builds with the other uploads published over the same span, so both have had similar time to collect views.
export function sponsoredBenchmark(videos) {
  const sponsored = sponsoredVideos(videos);
  const ids = new Set(sponsored.map(video => video.id));
  const times = sponsored.map(video => Date.parse(video.published));
  const others = videos.filter(video => video.public !== false && !ids.has(video.id) && Date.parse(video.published) >= Math.min(...times) && Date.parse(video.published) <= Math.max(...times));
  return { medianViews: others.length ? median(others.map(video => video.views ?? 0)) : 0, videos: others.length };
}

export const perPage = 15;
export const pageCount = videos => Math.max(1, Math.ceil(videos.length / perPage));
// The uploads list arrives newest first, so `newest` keeps its order.
export const sorts = {
  newest: { label: 'Newest', order: 'newest first' },
  views: { label: 'Most viewed', order: 'most viewed first', compare: (a, b) => (b.views ?? 0) - (a.views ?? 0) },
  oldest: { label: 'Oldest', order: 'oldest first', compare: (a, b) => a.published.localeCompare(b.published) },
  longest: { label: 'Longest', order: 'longest first', compare: (a, b) => durationSeconds(b.duration) - durationSeconds(a.duration) },
  shortest: { label: 'Shortest', order: 'shortest first', compare: (a, b) => durationSeconds(a.duration) - durationSeconds(b.duration) },
};
const sortQuery = sort => sort === 'newest' ? '' : `?sort=${sort}`;
const pagePath = (page, sort = 'newest') => `${page === 1 ? '/videos' : `/videos/${page}`}${sortQuery(sort)}`;

// Every page while there are few enough to wrap onto two rows, so crawlers reach each one from any page in one hop.
// Past that: first, last and the current page's neighbours; a one-page gap shows that page, longer gaps an ellipsis.
const listAllPages = 20;
function pager(page, pages, sort) {
  if (pages === 1) return '';
  const link = (to, label, rel) => `<a href="${pagePath(to, sort)}"${rel ? ` rel="${rel}"` : ''}>${label}</a>`;
  const shown = Array.from({ length: pages }, (_, index) => index + 1).filter(n => pages <= listAllPages || n === 1 || n === pages || Math.abs(n - page) <= 1);
  const numbers = [];
  let previous = 0;
  for (const n of shown) {
    if (n - previous === 2) numbers.push(link(n - 1, n - 1));
    else if (n - previous > 2) numbers.push('<span class="gap" aria-hidden="true">…</span>');
    numbers.push(n === page ? `<span aria-current="page">${n}</span>` : link(n, n));
    previous = n;
  }
  const [back, forward] = sort === 'newest' ? ['← Newer', 'Older →'] : ['← Previous', 'Next →'];
  return `<nav class="pager mono" aria-label="Video pages">${page > 1 ? link(page - 1, back, 'prev') : ''}${numbers.join('')}${page < pages ? link(page + 1, forward, 'next') : ''}</nav>`;
}

// Sorted lists are reorderings of indexed pages, so the links are nofollow and the pages noindex.
const sortNav = (base, current) => `<nav class="sort" aria-label="Sort videos" data-archive>${Object.entries(sorts).map(([key, { label }]) => `<a href="${base}${sortQuery(key)}" rel="nofollow"${key === current ? ' aria-current="true"' : ''}>${label}</a>`).join('')}</nav>`;

// Phones show the topic row as one swipeable line; start it at the current pill. Only the row scrolls, never the page.
const currentPillScript = `(()=>{const pill=document.querySelector('.topics [aria-current]');if(pill)pill.parentElement.scrollLeft=pill.offsetLeft-pill.parentElement.offsetLeft-16})()`;
// Topic links under the intro; the page being shown is marked.
const topicNav = current => `<nav class="topics" aria-label="Video topics"><a href="/videos"${current ? '' : ' aria-current="page"'}>All videos</a>${topics.map(topic => `<a href="/videos/${topic.slug}"${topic === current ? ' aria-current="page"' : ''}>${escape(topic.name)}</a>`).join('')}</nav>`;

const videoHref = video => video.embeddable ? `/watch/${video.id}` : `https://www.youtube.com/watch?v=${video.id}`;
const jsonLd = data => `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;

// One column below ~655px, otherwise columns of about 300-360px (see the grid rule in renderArchive).
const thumbSizes = '(max-width: 655px) calc(100vw - 32px), 360px';
// WebP with a JPEG fallback; reading.js drops the webp source on error and the missing-maxres candidate on load.
// Our own copy when scripts/watch-thumbnails.js has fetched one; a video newer than the last build uses YouTube's.
const thumbPicture = (id, sizes, attrs) => localThumbnail(id) ? `<img src="${localThumbnail(id).src}" srcset="${localThumbnail(id).srcSet}" sizes="${sizes}" alt="" ${attrs} decoding="async">` : `<picture data-thumbnail><source type="image/webp" srcset="${youtubeSrcSet(id)}" sizes="${sizes}"><img src="https://i.ytimg.com/vi/${id}/sddefault.jpg" srcset="${youtubeSrcSet(id, 'vi', 'jpg')}" sizes="${sizes}" alt="" ${attrs} decoding="async"></picture>`;
const viewCount = video => Number.isFinite(video.views) ? `<span>${number.format(video.views)} ${video.views === 1 ? 'view' : 'views'}</span>` : '';
const card = (video, eager) => {
  const id = escape(video.id);
  const duration = formatDuration(video.duration);
  return `<li><a href="${escape(videoHref(video))}"${video.embeddable ? '' : ' target="_blank" rel="noreferrer"'}>
<span class="thumb">${thumbPicture(id, thumbSizes, `width="640" height="360" ${eager ? 'loading="eager" fetchpriority="high"' : 'loading="lazy"'}`)}${duration ? `<span class="duration">${duration}</span>` : ''}</span>
<p class="meta"><time datetime="${escape(video.published)}">${dateFormat.format(new Date(video.published))}</time>${viewCount(video)}</p>
<h3>${escape(video.title)}</h3>
<p class="summary">${escape(videoDescription(video))}</p></a></li>`;
};

// Rows for the /videos search box, served live at /video-index.json so new uploads are searchable before a rebuild:
// [id, href, title, description, keywords, published, views, duration]. Keywords are the plain search title and tools.
export const videoIndex = videos => videos.map(video => [
  video.id, videoHref(video), video.title, snippet(videoDescription(video), 200),
  [searchTitle(video), ...(videoSummaries[video.id]?.toolsUsed ?? videoTools[video.id] ?? [])].filter(Boolean).join(' '),
  video.published, Number.isFinite(video.views) ? video.views : null, formatDuration(video.duration),
]);

// One page of the archive, 15 videos per page (callers check the page is within pageCount(videos)),
// or with `topic`, every matching video on a single page at /videos/<slug>. `sort` is a key of `sorts`.
export function renderArchive(videos, page = 1, topic = null, sort = 'newest') {
  const matching = topic ? videos.filter(video => topic.pattern.test(video.title)) : videos;
  const { order, compare } = sorts[sort];
  const list = compare ? matching.toSorted(compare) : matching;
  // ponytail: topic pages are unpaginated (largest is 38 videos); add paging if one passes ~60.
  const pages = topic ? 1 : pageCount(list);
  const items = topic ? list : list.slice((page - 1) * perPage, page * perPage);
  // Year headings only make sense while the list runs in date order.
  const groups = sort === 'newest' || sort === 'oldest' ? [...Map.groupBy(items, video => video.published.slice(0, 4))] : [[sorts[sort].label, items]];
  const pageNote = page > 1 ? `Page ${page} of ${pages}. ` : '';
  const count = `${list.length} ${list.length === 1 ? 'video' : 'videos'}`;
  const sorted = sort !== 'newest';
  const description = topic ? `${topic.intro} ${count}, newest first.` : `${pageNote}Browse ${list.length} AI Automation Station tutorials: coding agents, AI tools, and automation workflows tested on real builds.`;
  const url = `${site}${topic ? `/videos/${topic.slug}` : pagePath(page)}`;
  const title = topic ? topic.title : page > 1 ? `Every video, page ${page} of ${pages} | Mike Holp` : 'Every video: AI tools tested on real builds | Mike Holp';
  const name = topic ? topic.heading : page > 1 ? `Every video, page ${page} of ${pages}` : 'Every video';
  const schema = {
    '@context': 'https://schema.org', '@type': 'CollectionPage', '@id': url, url,
    name, description,
    isPartOf: { '@id': `${site}/#website` },
    mainEntity: { '@type': 'ItemList', itemListElement: items.map((video, index) => ({ '@type': 'ListItem', position: (page - 1) * perPage + index + 1, name: video.title, url: new URL(videoHref(video), site).href })) },
  };
  const trail = [['Home', `${site}/`], ['Videos', `${site}/videos`], ...(topic || page > 1 ? [[name, url]] : [])];
  const breadcrumbs = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: trail.map(([label, item], index) => ({ '@type': 'ListItem', position: index + 1, name: label, item })) };
  // Topic pages lead with the videos that carry a written summary, so those links sit near the top.
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escape(title)}</title>
<meta name="description" content="${escape(description)}">
${sorted ? '<meta name="robots" content="noindex,follow">' : `<link rel="canonical" href="${url}">${page > 1 ? `\n<link rel="prev" href="${site}${pagePath(page - 1)}">` : ''}${page < pages ? `\n<link rel="next" href="${site}${pagePath(page + 1)}">` : ''}`}
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<meta property="og:type" content="website">
<meta property="og:site_name" content="AI Automation Station">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${escape(topic ? topic.heading : 'Every video: AI tools tested on real builds')}">
<meta property="og:description" content="${escape(description)}">
<meta property="og:image" content="${site}/og-card.jpg?v=2">
<meta name="twitter:card" content="summary_large_image">
<link rel="preconnect" href="https://i.ytimg.com">
${fontPreloads}
<link rel="stylesheet" href="${consentCss}" media="print" onload="this.media='all'"><noscript><link rel="stylesheet" href="${consentCss}"></noscript>
<script>try{if(localStorage.getItem('theme')==='light')document.documentElement.setAttribute('data-theme','light')}catch(e){}</script>
<script src="/theme.js" defer></script>
<script type="module" src="/assets/reading.js"></script>
${jsonLd(schema)}
${jsonLd(breadcrumbs)}
<link rel="stylesheet" href="${archiveCss}">
</head>
<body>
<a class="skip" href="#content">Skip to videos</a>
<header class="shell single-line-header"><a class="brand desktop-brand" href="/"><span></span>AI Income Lab</a><a class="mobile-brand" href="/">AI Income Lab</a><nav class="site-nav" aria-label="Site"><a href="/start-here.html">Start here</a><a href="/guides.html">Guides</a><a href="/videos"${topic ? '' : ' aria-current="page"'}>All videos</a><a href="/tools.html">Tools</a></nav><a class="join" href="https://www.skool.com/ai-automation-station-7346/plans" target="_blank" rel="noreferrer" data-placement="video_archive_header">Join AI Income Lab ↗</a><details class="nav-mobile"><summary aria-label="Site menu">Menu</summary><nav aria-label="Site menu"><a href="/start-here.html">Start here</a><a href="/guides.html">Guides</a><a href="/videos"${topic ? '' : ' aria-current="page"'}>All videos</a><a href="/tools.html">Tools</a></nav></details></header>
<main class="shell" id="content">
<div class="intro"><h1>${escape(name)}</h1><p>${topic ? `${count}, ${order}. ${escape(topic.intro)}` : `${list.length} long-form videos, ${order}. ${pageNote}Hands-on builds with new AI models, agents and automation tools, plus breakdowns of new releases.`}</p>${topic?.about ? `<p>${escape(topic.about)}</p>` : ''}</div>
${topicNav(topic)}${topic ? `\n<script>${currentPillScript}</script>` : ''}
${topic?.guides ? `<p class="start">Written guide${topic.guides.length > 1 ? 's' : ''}: ${listFormat.format(topic.guides.map(([href, title]) => `<a href="${href}">${escape(title)}</a>`))}</p>\n` : ''}${topic?.supportingGuides ? `<p class="start">Supporting setup: ${listFormat.format(topic.supportingGuides.map(([href, title]) => `<a href="${href}">${escape(title)}</a>`))}</p>\n` : ''}<div class="toolbar"><form class="search-box" id="video-search" role="search" action="/search.html"><label for="video-q">Search all ${videos.length} videos</label><input id="video-q" name="q" type="search" placeholder="Search all ${videos.length} videos" autocomplete="off"></form>${sortNav(topic ? `/videos/${topic.slug}` : '/videos', sort)}</div>
<section id="video-results" aria-live="polite" hidden><p class="search-status mono"></p><ul></ul></section>
<div data-archive>${groups.map(([year, group]) => `<h2>${year}</h2>\n<ul>\n${group.map(video => card(video, video === items[0])).join('\n')}\n</ul>`).join('\n')}</div>
<aside class="cta" aria-labelledby="join-lab"><h2 id="join-lab">Build the next one with AI Income Lab</h2><ul class="cta-list"><li>Step-by-step courses</li><li>Copy-ready templates</li><li>Help when you get stuck</li></ul><div class="cta-action"><a class="join" href="https://www.skool.com/ai-automation-station-7346/plans" target="_blank" rel="noreferrer" data-placement="video_archive">Join AI Income Lab ↗</a><span>From $29/month. Cancel anytime. 2,900+ members.</span></div></aside>
<div data-archive>${pager(page, pages, sort)}</div>
<script type="module" src="/video-search.js"></script>
</main>
<footer class="shell mono"><a href="/">Home</a><a href="${channelUrl}?sub_confirmation=1" target="_blank" rel="noreferrer">Subscribe on YouTube ↗</a><a href="/privacy.html">Privacy</a><a href="/terms.html">Terms</a></footer>
</body>
</html>`;
}

const watchUrl = video => `${site}/watch/${video.id}`;
const playerUrl = video => `https://www.youtube-nocookie.com/embed/${video.id}`;
const thumbnailUrl = video => `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`;
// YouTube serves maxresdefault (true 16:9) only for some uploads; these returned 404 when checked on 2026-11-08.
const noMaxresThumbnail = new Set(['0jzTOUv_B04', 'F5PwcTwtEos', 'w_MoA8lpWTg', 'HlPdlZh0AHM', 'UnnN2i90ALg', 'rZh4zVT2LKY', '1TPm7B5oStw']);
const schemaThumbnails = video => [...(noMaxresThumbnail.has(video.id) ? [] : [`https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`]), thumbnailUrl(video)];
const relatedList = list => `<ul class="related">${list.map(video => `<li><a href="/watch/${video.id}">${thumbPicture(video.id, '(max-width: 640px) calc(50vw - 24px), 270px', 'width="640" height="360" loading="lazy"')}<span>${escape(videoHeading(video))}</span></a></li>`).join('')}</ul>`;
const toolItem = tool => {
  const link = toolLink(tool);
  return link ? `<a href="${escape(link.url)}" target="_blank" rel="${link.affiliate ? 'sponsored noopener' : 'noopener'}">${escape(tool)} ↗</a>` : escape(tool);
};
const toolsPageLink = tools => tools.some(tool => toolLink(tool)?.affiliate) ? '\n<p class="meta"><a href="/tools.html" data-placement="watch_tools_all">See every tool I recommend →</a></p>' : '';
const longDate = new Intl.DateTimeFormat('en', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
const article = minutes => /^(8|11|18|8\d)$/.test(String(minutes)) ? 'an' : 'a';
// Used only when a video has no summary anywhere: length, topic and date, plus the first chapters after the intro.
export const fallbackDescription = video => {
  const seconds = durationSeconds(video.duration);
  const minutes = Math.max(1, Math.round(seconds / 60));
  const topic = topicFor(video.title);
  const parts = validChapters(video.chapters, seconds).slice(1, 4).map(chapter => chapter.label);
  return `${video.title} is ${seconds ? `${article(minutes)} ${minutes} minute` : 'an'} AI Automation Station video${topic ? ` on ${topic.name}` : ''}, published ${longDate.format(new Date(video.published))}.${parts.length ? ` It covers ${listFormat.format(parts)}.` : ''}`;
};
export const videoDescription = video => curatedSummary(video) || video.summary || fallbackDescription(video);
const number = new Intl.NumberFormat('en');

// Keep snippets concise; search engines choose the final displayed text and length.
export function snippet(text, max = 160) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const sentence = cut.match(/^[\s\S]*[.!?](?=\s)/)?.[0];
  return sentence?.length > 60 ? sentence : `${cut.replace(/\s+\S*$/, '')}…`;
}

// ponytail: title-word overlap with a hand-kept stop list; switch to tags or embeddings if matches get noisy.
const stopWords = new Set('ai an and are as at be best better build building built but by can do does for from get has have here how i in into is it its just me my new now of on or our out real so than that the their this to too up us use using video vs was we what when which who why will with without you your'.split(' '));
const titleWords = title => new Set((title.toLowerCase().match(/[a-z0-9][a-z0-9.+-]*/g) ?? []).map(word => word.replace(/[.+-]+$/, '')).filter(word => word.length > 1 && !stopWords.has(word)));

// Other watch pages sharing the most title words, newest first; the newest uploads when nothing matches.
export function relatedVideos(video, videos, count = 4) {
  const own = titleWords(video.title);
  return videos.filter(other => other.id !== video.id && other.embeddable)
    .map(other => ({ other, score: [...titleWords(other.title)].filter(word => own.has(word)).length }))
    .sort((a, b) => b.score - a.score || b.other.published.localeCompare(a.other.published))
    .slice(0, count).map(({ other }) => other);
}

// Written guides that cover the same tool as a video. First match wins, so keep specific patterns above broad ones.
export const guides = [
  [/^3 open source projects i built/i, '/guides/build-apps-with-ai-coding-agents.html', 'Build apps with AI coding agents: a safe first workflow'],
  [/new herdr desktop|herdr desktop app|herdr on windows/i, '/guides/herdr-desktop-app.html', 'Herdr Desktop Guide: Setup, Workspaces and Limits'],
  [/herdr lets you run|herdr/i, '/guides/herdr-guide.html', 'Herdr Terminal Guide: Workspaces and Coding-Agent Sessions'],
  [/cleanyourtv|android tv with claude/i, '/guides/cleanyourtv-claude-code.html', 'CleanYourTV with Claude Code: TCL Setup and Risks'],
  [/task manager in claude code/i, '/guides/claude-code-task-manager.html', 'Claude Code Task Manager: Scope, Checks and Packaging'],
  [/rocket launch simulator/i, '/guides/ai-threejs-rocket-demo.html', 'AI Rocket Demo: Three.js Scene and Camera Controls'],
  [/chatgpt images 2\.5|sketch-to-image/i, '/guides/chatgpt-images-sketch-workflow.html', 'ChatGPT Image Editing: Sketch-to-Scene and Local Edits'],
  [/this is the ai seo strategy you.?re missing|crowd ?reply/i, '/guides/crowdreply-mcp-codex.html', 'CrowdReply MCP with Codex: Citation Data to Review Plans'],
  [/deepseek coding harness|deepseek harness/i, '/guides/deepseek-harness-first-test.html', 'DeepSeek Harness First Test: Setup Errors and Demo Limits'],
  [/ghostty/i, '/guides/ghostty-debian-configuration.html', 'Ghostty Config on Debian: Themes and Reload Checks'],
  [/5 ai agents you need to build with grok/i, '/guides/grokbot-for-beginners.html', 'GrokBot for Beginners: First Bot, Access and Approvals'],
  [/grok ?bot for seo/i, '/guides/grokbot-for-seo.html', 'GrokBot for SEO: Audit Bots, Data and Reviewed Fixes'],
  [/virtual office for my ai agents in grok/i, '/guides/grokbot-virtual-office.html', 'GrokBot Virtual Office: Build a Custom Agent Dashboard'],
  [/dots vs grok|released dots/i, '/guides/grokbot-vs-dots.html', 'GrokBot vs Dots: Onboarding, Job Drafts and Permissions'],
  [/\bjev\b/i, '/guides/jev-skills-router-setup.html', 'Jev AI with Coding Agents: Skills, Access and Routed Tests'],
  [/meta muse wonder|muse code/i, '/guides/muse-code-setup.html', 'Meta Muse Code Setup: API Failure and a Working CLI'],
  [/claude design alternative|open design/i, '/guides/opendesign-linux-slides.html', 'OpenDesign (Open Design) on Linux: Source Setup and Slides'],
  [/\brea\b|reverse engineer anything/i, '/guides/rea-video-editor-prototype.html', 'REA Coding-Agent Case: A Video-Editor Prototype'],
  [/grokbot run my blog/i, '/guides/run-a-blog-with-grokbot.html', 'GrokBot WordPress Workflow: Long-Form Videos to Drafts'],
  [/runable/i, '/guides/runable-audit-website.html', 'Runable AI Audit-Service Website: Research to an MVP'],
  [/ai search ranking blueprint|trakkr/i, '/guides/trakkr-codex-visibility-workflow.html', 'Trakkr and Codex: AI Visibility, Crawlers and Visits'],
  [/treg/i, '/guides/treg-inside-grokbot.html', 'Treg in GrokBot: Connect Data Tools and Control Costs'],
  [/codex to fix my seo strategy/i, '/guides/codex-seo-workflow.html', 'Internal Link Audit with Codex: A Reviewed SEO Workflow'],
  [/^6 N8N Automations Every Entrepreneur Needs Right Now$/i, '/guides/ai-automation.html', 'What Is AI Automation? Examples, Tools and a First Build'],
  [/heygen/i, '/guides/heygen-ai-avatar-tutorial.html', 'HeyGen AI avatar tutorial: create your first video'],
  [/^Get Started with Claude Code in 10 Minutes$/i, '/guides/claude-code-for-beginners.html', 'Claude Code tutorial for beginners: install and use it'],
  [/chatgpt \$200|pro 20x|credit limit on codex/i, '/guides/chatgpt-pro-20x.html', 'ChatGPT Pro 20x vs 5x vs Plus: 2026 Limits and Codex Credits'],
  [/9router/i, '/guides/9router-setup.html', '9Router setup: install, port 20128, updates and providers'],
  [/\bvapi\b/i, '/guides/vapi-voice-agent-tutorial.html', 'Vapi AI tutorial: build a voice agent, test calls, webhooks'],
  [/hermes/i, '/guides/hermes-desktop.html', 'Hermes Desktop: install on Mac, Windows or Linux'],
  [/open ?claw|clawdbot|moltbot|moltbook|kiloclaw/i, '/guides/install-openclaw.html', 'How to install OpenClaw: local, VPS or hosted, safely'],
  [/lovable|base44|replit/i, '/guides/lovable-vs-base44-vs-replit.html', 'Lovable vs Base44 vs Replit: pricing and which to pick'],
  [/openseo/i, '/guides/openseo-review.html', 'OpenSEO review: setup, data costs and practical limits'],
  [/^N8N Email Automation: Save Hours Every Week$/i, '/guides/what-is-n8n-used-for.html', 'What is n8n used for? Real uses and a first workflow'],
  [/^I Automated My LinkedIn Content in 30 Minutes With N8N!$/i, '/guides/what-is-n8n-used-for.html', 'What is n8n used for? Real uses and a first workflow'],
  [/^This N8N Workflow Finds You Jobs So You Don't Have To!$/i, '/guides/what-is-n8n-used-for.html', 'What is n8n used for? Real uses and a first workflow'],
  [/^I Tested OpenAI's New Agent Builder So You Don't Have To$/i, '/guides/no-code-ai-agent-builder.html', 'No-code AI agent builder: compare n8n, Make, Zapier and more'],
  [/^Complete Lindy AI Agent Tutorial - Build Your First Agent Today!$/i, '/guides/no-code-ai-agent-builder.html', 'No-code AI agent builder: compare n8n, Make, Zapier and more'],
  [/\bn8n\b/i, '/guides/what-is-n8n-used-for.html', 'What is n8n used for? Real uses and a first workflow'],
  [/open\s?code\s+go/i, '/guides/opencode-go.html', 'OpenCode Go: pricing, models, limits and setup'],
  [/open\s?code/i, '/guides/opencode-vs-claude-code.html', 'OpenCode vs Claude Code: pricing, setup and limits'],
  [/(?=.*\bcodex\b)(?=.*claude code)/i, '/guides/claude-code-vs-codex.html', 'Codex vs Claude Code: how I use both and route tasks'],
  [/claude code/i, '/guides/claude-code-for-beginners.html', 'Claude Code tutorial for beginners: install and use it'],
  [/claude (opus|sonnet|haiku|fable|mythos)/i, '/guides/claude-models-compared.html', 'Claude Opus vs Sonnet vs Haiku vs Fable: which to use'],
  [/codex.*linux|linux.*codex/i, '/guides/codex-on-linux.html', 'Codex on Linux: install Codex CLI and the desktop app'],
  [/\bcodex\b/i, '/guides/codex-workflow.html', 'Codex tutorial: make and verify a small code change'],
  [/make\.com/i, '/guides/make-first-automation.html', 'Make.com Google Sheets tutorial: filter approved requests'],
  [/voice agent|phone agent/i, '/guides/vapi-voice-agent-tutorial.html', 'Vapi AI tutorial: build a voice agent, test calls, webhooks'],
  [/syllaby|faceless|without showing your face/i, '/guides/heygen-ai-avatar-tutorial.html', 'HeyGen AI avatar tutorial: create your first video'],
  [/gpt-6|gpt 5\.6|chatgpt 5\.6/i, '/guides/chatgpt-pro-20x.html', 'ChatGPT Pro 20x vs 5x vs Plus: 2026 Limits and Codex Credits'],
  [/token usage/i, '/guides/9router-setup.html', '9Router setup: install, port 20128, updates and providers'],
  [/ollama|private ai/i, '/guides/first-api-request.html', 'Make your first AI API request with a local test'],
  [/claude.*\bseo\b|\bseo\b.*claude/i, '/guides/dataforseo-mcp-claude.html', 'DataForSEO MCP: give Claude Code real SEO data'],
  [/\bseo\b|ai visibility|ai search|answer engines|invisible to ai/i, '/guides/openseo-review.html', 'OpenSEO review: setup, data costs and practical limits'],
  [/grok ?bot/i, '/guides/grokbot-for-beginners.html', 'GrokBot for Beginners: First Bot, Access and Approvals'],
  [/grok \d|kimi|\bglm\b|gemini \d|deepseek v\d/i, '/guides/choosing-ai-models-for-a-task.html', 'How to choose an AI model for a task'],
  [/thumbnails?|shorts|opusclip|video editor|edits your videos|tube ?analytics|youtube (automation|transcript|topics|creators)|grow on youtube/i, '/guides/youtube-channel-growth-workflow.html', 'YouTube channel growth workflow: research, publish, learn'],
  [/facebook|messenger|chatbot/i, '/guides/no-code-ai-agent-builder.html', 'No-code AI agent builder: compare n8n, Make, Zapier and more'],
  [/sora|linkedin|social media|repurpos|ebook|infographics|notebooklm|nano ?banana|\bgamma\b|on content/i, '/guides/ai-content-creation-workflows.html', 'AI content creation workflow: images, video and audio'],
  [/coding agent|ai skills you need to install|claude design|antigravity|rocket ai|booking website|\bsaas\b|browseract|operating system|trading bot/i, '/guides/build-apps-with-ai-coding-agents.html', 'Build apps with AI coding agents: a safe first workflow'],
  [/claude routines|second brain|odysseus|ai assistant|apify/i, '/guides/ai-agent-workflow.html', 'AI agent workflow: choose tools, add checks, keep control'],
  [/fillout|airtable/i, '/guides/ai-automation.html', 'What Is AI Automation? Examples, Tools and a First Build'],
  [/\bskool\b|rat race|ai skills you need to master/i, '/guides/make-money-with-ai-no-experience.html', 'Make money with AI with no experience'],
  [/\bleads?\b|agency/i, '/guides/ai-automation-services-small-business.html', 'AI automation agency: sell services to small businesses'],
  [/ai automations?\b|automation tools/i, '/guides/ai-automation.html', 'What Is AI Automation? Examples, Tools and a First Build'],
  [/\bai agents?\b/i, '/guides/no-code-ai-agent-builder.html', 'No-code AI agent builder: compare n8n, Make, Zapier and more'],
  [/\bmoney\b|\bincome\b|side hustle|monetiz|\bclients?\b/i, '/guides/make-money-with-ai-fast.html', 'How to make money with AI fast: the honest path'],
];

// Watch pages expose the primary player in the initial HTML, without autoplay or a click gate.
// Chapter fragments add no crawlable URLs. Opening a shared fragment cues without autoplay;
// choosing a chapter re-cues the same privacy-enhanced player, including the zero-second chapter.
const playerScript = `(()=>{const player=document.querySelector('iframe.player');const cue=(start,autoplay)=>{const url=new URL(player.src);url.searchParams.set('start',start);if(autoplay)url.searchParams.set('autoplay','1');else url.searchParams.delete('autoplay');player.src=url.href;if(autoplay)player.focus();};const plain=event=>!(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey||event.button!==0);const seek=(hash,autoplay)=>{const start=/^#t=(\\d+)$/.exec(hash)?.[1];if(!start)return false;cue(start,autoplay);return true;};seek(location.hash,false);document.querySelector('.chapters')?.addEventListener('click',event=>{if(!plain(event))return;const link=event.target.closest('a');if(link&&seek(link.hash,true)){event.preventDefault();history.replaceState(null,'',link.hash);player.scrollIntoView({block:'center'});}});addEventListener('hashchange',()=>seek(location.hash,true));})()`;

// Reviewed follow-up reading for recordings whose titles do not identify the written guide.
// IDs keep these links stable when a video's title changes.
const watchGuideLinks = {
  bCsSqZp0yVg: ['/guides/youtube-channel-growth-workflow.html', 'Use the YouTube channel growth workflow'],
  ncg6F27PYt0: ['/guides/kilo-code-tutorial.html', 'Install Kilo Code and check your first task'],
  Ip8KBwDixJs: ['/guides/grokbot-for-beginners.html', 'Set up a first GrokBot with bounded access'],
  FBlN3qWR9kg: ['/guides/chatgpt-images-sketch-workflow.html', 'Follow the sketch-to-scene and local-edit workflow', 'Later related walkthrough (ChatGPT Images 2.5)'],
};

// `videos` (the whole archive) feeds the related list; `start` (seconds, from ?t=) cues the player to a chapter.
export function renderWatch(video, { videos = [], start = 0 } = {}) {
  const description = videoDescription(video);
  const metaDescription = watchPageCopy[video.id]?.description || snippet(description);
  const offer = videoOffer(video.title);
  const seconds = durationSeconds(video.duration);
  const chapters = validChapters(videoChapters[video.id] ?? video.chapters, seconds).map(chapter => ({ ...chapter, label: fixTerms(chapter.label) }));
  const related = relatedVideos(video, videos);
  const guide = watchGuideLinks[video.id] ?? guides.find(([pattern]) => pattern.test(video.title))?.slice(1);
  const topic = topicFor(video.title);
  const notes = videoNotes[video.id];
  const transcript = transcripts[video.id] ? transcriptParagraphs(transcripts[video.id]) : [];
  // The opening stays visible so the page carries the video's own words; the rest folds away.
  const openParagraphs = 2;
  // From the YouTube description only, skipping the paragraph already shown above.
  const summaryParagraphs = (video.details ?? []).filter(paragraph => paragraph !== description && !(listingSummaries[video.id] && paragraph === video.summary));
  const brief = videoSummaries[video.id];
  // A written summary lists its own tools inside "What this video covers".
  const tools = brief?.toolsUsed?.length ? null : videoTools[video.id];
  const chapterUrl = chapter => `${watchUrl(video)}?t=${chapter.seconds}`;
  // The topic hub name plus the tools the page lists, which are the terms people search for.
  const keywords = [...new Set([topic?.name, ...(brief?.toolsUsed ?? videoTools[video.id] ?? [])].filter(Boolean).map(name => name.replace(/\s*\(.*\)$/, '')))].slice(0, 8);
  const schema = {
    '@context': 'https://schema.org', '@type': 'VideoObject', '@id': `${watchUrl(video)}#video`,
    name: video.title, description, thumbnailUrl: schemaThumbnails(video),
    uploadDate: video.published, embedUrl: playerUrl(video), url: watchUrl(video),
    inLanguage: 'en',
    ...(keywords.length && { keywords: keywords.join(', ') }),
    ...(seconds && { duration: video.duration }),
    ...(video.views > 0 && { interactionStatistic: { '@type': 'InteractionCounter', interactionType: { '@type': 'WatchAction' }, userInteractionCount: video.views } }),
    // Key moments: a clip ends where the next starts, so this needs the video's length.
    ...(seconds && chapters.length && { hasPart: chapters.map((chapter, index) => ({ '@type': 'Clip', name: chapter.label, startOffset: chapter.seconds, endOffset: chapters[index + 1]?.seconds ?? seconds, url: chapterUrl(chapter) })) }),
    author: { '@type': 'Person', '@id': `${site}/#mike`, name: 'Mike Holp', url: `${site}/about.html` },
    publisher: { '@type': 'Organization', '@id': `${site}/#org`, name: 'AI Automation Station', url: `${site}/`, logo: { '@type': 'ImageObject', url: `${site}/logo.png`, width: 512, height: 512 } },
  };
  const trail = [['Home', `${site}/`], ['Videos', `${site}/videos`], ...(topic ? [[topic.name, `${site}/videos/${topic.slug}`]] : []), [video.title, watchUrl(video)]];
  const breadcrumbs = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: trail.map(([name, item], index) => ({ '@type': 'ListItem', position: index + 1, name, item })),
  };
  const faq = brief?.qa?.length && {
    '@context': 'https://schema.org', '@type': 'FAQPage', '@id': `${watchUrl(video)}#faq-schema`, url: watchUrl(video),
    mainEntity: brief.qa.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  };
  const heading = videoHeading(video);
  const meta = [`<time datetime="${escape(video.published)}">${dateFormat.format(new Date(video.published))}</time>`, seconds && clock(seconds), video.views > 0 && `${number.format(video.views)} views`].filter(Boolean).join(' · ');
  return `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escape(searchTitle(video) || video.title)}</title>
<meta name="description" content="${escape(metaDescription)}">
<link rel="canonical" href="${watchUrl(video)}">
<link rel="preconnect" href="https://i.ytimg.com">
${fontPreloads}
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="${readingCss}">
<link rel="stylesheet" href="${consentCss}" media="print" onload="this.media='all'"><noscript><link rel="stylesheet" href="${consentCss}"></noscript>
<script>try{if(localStorage.getItem('theme')==='light')document.documentElement.setAttribute('data-theme','light')}catch(e){}</script>
<script src="/theme.js" defer></script>
<script type="module" src="/assets/reading.js"></script>
<meta property="og:type" content="video.other">
<meta property="og:site_name" content="AI Automation Station">
<meta property="og:url" content="${watchUrl(video)}">
<meta property="og:title" content="${escape(heading)}">
<meta property="og:description" content="${escape(metaDescription)}">
<meta property="og:image" content="${thumbnailUrl(video)}">
<meta name="twitter:card" content="summary_large_image">
${jsonLd(schema)}
${jsonLd(breadcrumbs)}${faq ? `\n${jsonLd(faq)}` : ''}
<style>header,main,footer{width:min(1120px,calc(100% - 32px))}main{padding-top:20px}h1{text-wrap:balance;overflow-wrap:anywhere;margin:0 0 20px}.player{display:block;width:100%;height:auto;aspect-ratio:16/9;border:2px solid #333;background:#111}.player:hover,.player:focus-visible{border-color:#ff6846;box-shadow:0 0 20px #ff684633}.watch-actions{display:flex;flex-wrap:wrap;column-gap:24px}.description{white-space:pre-line;overflow-wrap:anywhere}.chapters{columns:300px 3;column-gap:48px;padding:0;list-style:none}.chapters li{margin:0;padding:2px 0;break-inside:avoid}.chapters a{display:inline-block;min-width:4.5em;padding:4px 0;font-variant-numeric:tabular-nums}.table{overflow-x:auto}td,th{vertical-align:top}main{font-size:19px}main .meta,main small{font-size:15px}.next-links{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px;margin:20px 0 0;padding:0;list-style:none}.next-links li{margin:0}.next-links a{display:grid;gap:6px;height:100%;padding:18px 22px;border:1px solid #333;border-radius:12px;background:#111;color:#f5f5f0;font-weight:600;line-height:1.4;text-decoration:none}.next-links a:hover,.next-links a:focus-visible{border-color:#ff6846}.next-links small{color:#a5a59e;font-weight:400}.transcript{margin:8px 0 48px}.transcript summary{display:inline-flex;min-height:44px;align-items:center;padding:0 20px;border:1px solid #333;border-radius:999px;font-size:16px;font-weight:600}.transcript summary:hover{border-color:#ff6846}.transcript[open] summary{margin-bottom:16px}@media(max-width:640px){main{font-size:18px}}</style>
<style>section[aria-labelledby="related-guides"]{margin-bottom:48px}</style>
</head><body>
<a class="skip" href="#content">Skip to video</a>
<header class="single-line-header"><a href="/">AI Income Lab</a><nav aria-label="Site"><a href="/start-here.html">Start here</a><a href="/guides.html">Guides</a><a href="/videos">All videos</a><a href="/tools.html">Tools</a></nav><a class="join" href="https://www.skool.com/ai-automation-station-7346/plans" target="_blank" rel="noreferrer" data-placement="watch_header">Join AI Income Lab ↗</a><details class="nav-mobile"><summary aria-label="Site menu">Menu</summary><nav aria-label="Site menu"><a href="/start-here.html">Start here</a><a href="/guides.html">Guides</a><a href="/videos">All videos</a><a href="/tools.html">Tools</a></nav></details></header>
<main id="content">
<nav aria-label="Breadcrumb" class="meta"><a href="/">Home</a> / <a href="/videos">Videos</a> / ${topic ? `<a href="/videos/${topic.slug}">${escape(topic.name)}</a> / ` : ''}<span aria-current="page">${escape(heading)}</span></nav>
<h1>${escape(heading)}</h1>
<iframe class="player" src="${playerUrl(video)}${start ? `?start=${start}` : ''}" title="${escape(heading)}" width="960" height="540" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
${chapters.length ? `<p class="meta"><a href="#chapters">Jump to video chapters</a></p>` : ''}
<p class="watch-actions"><a class="action" href="https://www.youtube.com/watch?v=${video.id}" target="_blank" rel="noreferrer" data-placement="watch_player">Watch on YouTube ↗</a> <a class="action" href="${channelUrl}?sub_confirmation=1" target="_blank" rel="noreferrer" data-placement="watch_subscribe">Subscribe on YouTube ↗</a></p>
<p class="meta">By <a href="/about.html" rel="author">Mike Holp</a> · ${meta}</p>
${watchNotes[video.id]?.notice ? `<p class="note">${escape(watchNotes[video.id].notice)} <a href="https://www.skool.com/ai-automation-station-7346/plans">Check current membership plans</a>.</p>` : ''}
<p class="description">${escape(description)}</p>${summaryParagraphs.length || chapters.length ? `
<section aria-labelledby="video-summary">
<h2 id="video-summary">Video summary</h2>
${summaryParagraphs.map(paragraph => `<p>${escape(paragraph)}</p>`).join('')}${chapters.length ? `
<p>The video covers ${chapters.length} parts: ${escape(listFormat.format(chapters.map(chapter => chapter.label)))}.</p>` : ''}
</section>` : ''}${notes ? `
<section aria-labelledby="notes">
<h2 id="notes">What I tested</h2>
<p>${escape(notes.tested)}</p>
<div class="table"><table tabindex="0"><thead><tr>${notes.columns.map(column => `<th scope="col">${escape(column)}</th>`).join('')}</tr></thead>
<tbody>${notes.rows.map(([label, ...cells]) => `<tr><th scope="row">${escape(label)}</th>${cells.map(cell => `<td>${escape(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>${notes.gaps ? `
<h3>What still needed me</h3>
<ul>${notes.gaps.map(gap => `<li>${escape(gap)}</li>`).join('')}</ul>` : ''}${notes.verdict ? `
<h3>Verdict</h3>
<p>${escape(notes.verdict)}</p>` : ''}
<p class="meta">${escape(notes.note)}</p>
</section>` : ''}${brief ? `
<section aria-labelledby="build-summary">
<h2 id="build-summary">What this video covers</h2>
<h3>What you build</h3>
<p>${escape(brief.whatYouBuild)}</p>${brief.toolsUsed?.length ? `
<h3>Tools used</h3>
<ul>${brief.toolsUsed.map(tool => `<li>${toolItem(tool)}</li>`).join('')}</ul>${toolsPageLink(brief.toolsUsed)}` : ''}${brief.keySteps?.length ? `
<h3>Key steps</h3>
<ol>${brief.keySteps.map(step => `<li>${Number.isFinite(step.seconds) ? `<a href="#t=${step.seconds}">${clock(step.seconds)}</a> ` : ''}${escape(step.step)}</li>`).join('')}</ol>` : ''}${brief.notCovered?.length ? `
<h3>Not covered</h3>
<ul>${brief.notCovered.map(item => `<li>${escape(item)}</li>`).join('')}</ul>` : ''}
${watchPageCopy[video.id]?.disclosure ? `<p class="meta">${escape(watchPageCopy[video.id].disclosure)}</p>
` : ''}<p class="meta">${escape(brief.sourceNote || "Summary written from the video's transcript and chapters.")}</p>
</section>` : ''}${tools?.length ? `
<section aria-labelledby="tools-used">
<h2 id="tools-used">Tools used</h2>
<ul>${tools.map(tool => `<li>${toolItem(tool)}</li>`).join('')}</ul>${toolsPageLink(tools)}
</section>` : ''}${chapters.length ? `
<h2 id="chapters">In this video</h2>
<ol class="chapters">${chapters.map(chapter => `<li><a href="#t=${chapter.seconds}">${clock(chapter.seconds)}</a> ${escape(chapter.label)}</li>`).join('')}</ol>` : ''}${faq ? `
<section aria-labelledby="faq">
<h2 id="faq">Questions and answers</h2>
<div class="faq-list">
${brief.qa.map(({ q, a }) => `<details class="faq-item"><summary><h3>${escape(q)}</h3></summary>\n<p>${escape(a)}</p>\n</details>`).join('\n')}
</div>
</section>` : ''}${guide || topic ? `
<section aria-labelledby="related-guides">
<h2 id="related-guides">Keep learning</h2>
<ul class="next-links">${guide ? `<li><a href="${escape(guide[0])}"><small>${escape(guide[2] ?? 'Written guide')}</small>${escape(guide[1])}</a></li>` : ''}${topic ? `<li><a href="/videos/${topic.slug}"><small>More on this topic</small>${escape(topic.heading)}</a></li>` : ''}</ul>
</section>` : ''}
${watchNotes[video.id]?.html ?? ''}${transcript.length ? `
<section aria-labelledby="transcript">
<h2 id="transcript">Transcript</h2>
${transcript.slice(0, openParagraphs).map(paragraph => `<p>${escape(paragraph)}</p>`).join('')}${transcript.length > openParagraphs ? `
<details class="transcript"><summary>Read the rest of the transcript</summary>${transcript.slice(openParagraphs).map(paragraph => `<p>${escape(paragraph)}</p>`).join('')}</details>` : ''}
</section>` : ''}
<aside class="note" aria-labelledby="video-next-step">
<h2 id="video-next-step">${escape(offer.title)}</h2>
<p>${escape(offer.detail)}</p><p class="meta">${escape(offer.access)}</p>
<p><a class="action" href="https://www.skool.com/ai-automation-station-7346/plans" data-placement="watch_video" data-video-id="${video.id}" target="_blank" rel="noreferrer">Join AI Income Lab ↗</a></p>
</aside>
<form class="notes" method="post" data-subscribe data-placement="watch_end"><p><strong>Not ready to join?</strong> Get the weekly build notes: new guides and tested builds in one short email.</p><div><label for="notes-email">Email address</label><input id="notes-email" name="email" type="email" autocomplete="email" required maxlength="254" placeholder="you@example.com"><input class="trap" name="hp" tabindex="-1" autocomplete="off" aria-hidden="true"><button type="submit">Subscribe</button></div><p class="notes-status" role="status"></p></form>${related.length ? `
<h2>You may also like</h2>
${relatedList(related)}` : ''}
</main>
<script>${playerScript}</script>
<footer><a href="/videos">Browse all videos</a><a href="/start-here.html">Choose your first build</a><a href="/privacy.html">Privacy</a></footer>
</body></html>`;
}

export function renderVideoSitemap(videos) {
  // video:duration sits between player_loc and publication_date, the order the video sitemap schema lists them.
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${videos.filter(video => video.embeddable).map(video => `<url><loc>${watchUrl(video)}</loc><video:video>
<video:thumbnail_loc>${thumbnailUrl(video)}</video:thumbnail_loc>
<video:title>${escape(video.title.slice(0, 100))}</video:title>
<video:description>${escape(videoDescription(video).slice(0, 2048))}</video:description>
<video:player_loc>${playerUrl(video)}</video:player_loc>${durationSeconds(video.duration) ? `
<video:duration>${Math.min(durationSeconds(video.duration), 28800)}</video:duration>` : ''}
<video:publication_date>${escape(video.published)}</video:publication_date>
</video:video></url>`).join('\n')}
</urlset>`;
}

// Preserve the hand-maintained page dates; derive archive pagination from the build inventory.
export function renderPageSitemap(xml, videos) {
  // Drop every /videos URL (numbered and topic) from the base file, then list the current ones.
  const core = xml.replace(/\s*<url><loc>https:\/\/www\.ai-automation-station\.com\/videos(?:\/[\w-]+)?<\/loc>[\s\S]*?<\/url>/g, '');
  // A listing page changes when the newest video on it does.
  const lastmod = list => list.map(video => video.published).sort().at(-1)?.slice(0, 10);
  const entry = (path, list) => `  <url><loc>${site}${path}</loc>${lastmod(list) ? `<lastmod>${lastmod(list)}</lastmod>` : ''}</url>`;
  const archive = Array.from({ length: pageCount(videos) }, (_, index) => entry(pagePath(index + 1), videos.slice(index * perPage, (index + 1) * perPage)));
  const topicPages = topics.map(topic => [topic, videos.filter(video => topic.pattern.test(video.title))]).filter(([, list]) => list.length).map(([topic, list]) => entry(`/videos/${topic.slug}`, list));
  // The homepage lists the latest uploads, so it is at least as fresh as the newest one.
  const home = core.replace(new RegExp(`(<loc>${site}/</loc><lastmod>)([\\d-]+)(</lastmod>)`), (match, open, date, close) => `${open}${[date, lastmod(videos)].filter(Boolean).sort().at(-1)}${close}`);
  return home.replace('</urlset>', `${[...archive, ...topicPages].join('\n')}\n</urlset>`);
}

// Guide path → titles of videos that cover the same job. Videos the guide already embeds or links are skipped.
const guideVideoTopics = {
  '/guides/9router-setup.html': /track token usage|saves token usage|glm 5\.2 inside opencode|kimi k2\.7 code vs deepseek/i,
  '/guides/agentic-ai-vs-traditional-automation.html': /5 ai agents you need to build|10 ai automations you can build|relay\.app|hermes agent: automate/i,
  '/guides/ai-automation-services-small-business.html': /white label automation agency|competition is using ai automations|top 5 ai automations your competitors|5 ai automation tools are scaling/i,
  '/guides/ai-automation.html': /10 ai automations you can build|make\.com tutorial: automate your business|5 ai automation tools are scaling|ai workflow saves me 20\+ hours/i,
  '/guides/ai-side-hustles.html': /automated my lead generation|cold leads into closed deals|saved me 10 hours a week on emails|fillout to airtable/i,
  '/guides/chatgpt-pro-20x.html': /chatgpt 5\.6 is available|gpt 5\.6 is here|gpt-6 sol|new codex cli/i,
  '/guides/claude-code-for-beginners.html': /claude code skills will 10x|build apps using free claude code|claude code hack saves token|complete web app in claude code/i,
  '/guides/claude-code-vs-codex.html': /herdr lets you run claude code and codex|new codex cli|codex just changed how i build|claude code skills will 10x/i,
  '/guides/codex-on-linux.html': /new codex cli|ghostty|codex just changed how i build|herdr lets you run/i,
  '/guides/codex-usage-limits.html': /new codex cli|codex just changed how i build|track token usage|chatgpt 5\.6 is available/i,
  '/guides/codex-workflow.html': /new codex cli|codex just changed how i build|codex on linux: official|herdr lets you run/i,
  '/guides/consent-tracking.html': /deploy a saas with vercel|codex just changed how i build websites|professional website in replit|saas website using only ai/i,
  '/guides/dataforseo-mcp-claude.html': /claude skill replaces your seo team|claude skill writes seo articles|let claude code manage my seo|vidiq claude mcp/i,
  '/guides/first-api-request.html': /private ai made simple|9router setup: providers|9router cost tracking|track token usage/i,
  '/guides/hermes-desktop.html': /hermes agent desktop app is here|desktop app with hermes|cron jobs \(hermes|hermes agent: automate/i,
  '/guides/heygen-ai-avatar-tutorial.html': /syllaby to build a faceless|without showing your face|sora 2 is here|unlimited ai videos with this make\.com/i,
  '/guides/make-first-automation.html': /make\.com tutorial|ai agent in make\.com|make\.com automation saved me 10 hours|fillout to airtable/i,
  '/guides/make-money-with-ai-fast.html': /white label automation agency|more clients for your web agency|find website clients|profitable skool community/i,
  '/guides/make-money-with-ai-no-experience.html': /only ai skills you need to master|10 ai automations you can build|complete ebook in 30 minutes|profitable skool community/i,
  '/guides/make-money-with-chatgpt.html': /chatgpt images 2\.0|chatgpt images 2\.5|complete ebook in 30 minutes|generate linkedin content using ai/i,
  '/guides/n8n-alternatives-open-source.html': /self-host n8n on ubuntu|self host n8n on hostinger|n8n 2\.0|relay\.app/i,
  '/guides/n8n-vs-zapier-vs-make.html': /make\.com tutorial|self-host n8n on ubuntu|relay\.app|n8n 2\.0/i,
  '/guides/no-code-ai-agent-builder.html': /mindstudio|relay\.app|ai agent in make\.com|manus ai agents/i,
  '/guides/opencode-vs-claude-code.html': /opencode better than free claude code|glm 5\.2 inside opencode|desktop app with opencode|opencode makes it easy/i,
  '/guides/openseo-review.html': /dataforseo|replace your seo team|replaces your seo team|grok bot for seo/i,
  '/guides/self-host-n8n.html': /self host n8n on hostinger|n8n 2\.0|private ai made simple|6 n8n automations/i,
  '/guides/vapi-voice-agent-tutorial.html': /facebook ai chatbot|automating my messenger|facebook chatbot in minutes|ai assistant that actually works/i,
  '/guides/what-is-n8n-used-for.html': /whatsapp workflow in n8n|shorts machine in n8n|6 n8n automations|n8n workflow saves me hours weekly on linkedin/i,
  '/guides/youtube-feed.html': /youtube transcript automation|youtube competitor spy tool|deploy a saas with vercel|web apps in minutes with google ai studio/i,
  '/guides/ai-threejs-rocket-demo.html': /gpt-6 astra|video editor using rea|claude design alternative|rocket ai/i,
  '/guides/chatgpt-images-sketch-workflow.html': /chatgpt images 2\.0|sora 2|heygen|syllaby|complete ebook in 30 minutes/i,
  '/guides/claude-code-task-manager.html': /claude code skills|complete web app in claude code|android tv with claude|get started with claude code/i,
  '/guides/cleanyourtv-claude-code.html': /task manager in claude code|claude code skills|get started with claude code|build apps using free claude code/i,
  '/guides/codex-seo-workflow.html': /dataforseo|replace your seo team|grok bot for seo|ai search ranking|openseo/i,
  '/guides/crowdreply-mcp-codex.html': /dataforseo|replace your seo team|grok bot for seo|ai search ranking|openseo/i,
  '/guides/deepseek-harness-first-test.html': /kimi k2\.7|openrouter|9router|muse wonder/i,
  '/guides/ghostty-debian-configuration.html': /codex on linux|herdr lets you run|chatgpt and codex on linux|new codex cli/i,
  '/guides/grokbot-for-beginners.html': /virtual office for my ai agents|grokbot run my blog|treg\.to inside grok|dots vs grok|chief of staff/i,
  '/guides/grokbot-for-seo.html': /treg\.to inside grok|dataforseo|codex to fix my seo|ai search ranking|openseo/i,
  '/guides/grokbot-virtual-office.html': /5 ai agents you need to build with grok|grokbot run my blog|treg\.to inside grok|dots vs grok|chief of staff/i,
  '/guides/grokbot-vs-dots.html': /5 ai agents you need to build with grok|virtual office for my ai agents|chief of staff|hermes agent desktop/i,
  '/guides/herdr-desktop-app.html': /herdr lets you run|new codex cli|codex on linux|ghostty/i,
  '/guides/herdr-guide.html': /new codex cli|codex on linux|ghostty|claude code skills/i,
  '/guides/jev-skills-router-setup.html': /9router|openrouter|kilo code|claude code skills/i,
  '/guides/muse-code-setup.html': /deepseek coding harness|opencode|kimi k2\.7|9router/i,
  '/guides/opendesign-linux-slides.html': /chatgpt images 2\.5|claude design alternative|heygen|sora 2/i,
  '/guides/rea-video-editor-prototype.html': /rocket launch simulator|opusclip|ai video editor|chatgpt images 2\.5/i,
  '/guides/run-a-blog-with-grokbot.html': /5 ai agents you need to build with grok|virtual office for my ai agents|treg\.to inside grok|youtube transcript/i,
  '/guides/runable-audit-website.html': /lovable|base44|replit|deploy a saas with vercel/i,
  '/guides/trakkr-codex-visibility-workflow.html': /dataforseo|grok bot for seo|codex to fix my seo|openseo/i,
  '/guides/treg-inside-grokbot.html': /grok bot for seo|5 ai agents you need to build with grok|dataforseo|virtual office for my ai agents/i,
  '/guides/what-is-an-ai-agent.html': /5 ai agents you need to build|openai's new agent builder|lindy ai agent tutorial|mindstudio ai agents/i,
  '/guides/what-is-mcp.html': /vidiq claude mcp|ai visibility tool nobody|build your own ai seo agent|apify agent skills/i,
};

export function guideVideos(html, path, videos, count = 4) {
  const topic = guideVideoTopics[path];
  if (!topic) return [];
  const featured = new Set([...html.matchAll(/(?:youtube(?:-nocookie)?\.com\/(?:embed\/|watch\?v=)|youtu\.be\/|\/watch\/|i\.ytimg\.com\/vi\/)([\w-]{11})/g)].map(match => match[1]));
  return videos.filter(video => video.embeddable && topic.test(video.title) && !featured.has(video.id)).sort((a, b) => (b.views ?? 0) - (a.views ?? 0)).slice(0, count);
}

export function addGuideVideos(html, path, videos) {
  const list = guideVideos(html, path, videos);
  if (!list.length || html.includes('id="you-may-also-like"')) return html;
  const section = `<section aria-labelledby="you-may-also-like"><h2 id="you-may-also-like">You may also like</h2>${relatedList(list)}</section>\n`;
  const at = html.indexOf('<aside class="note next-steps"');
  return at === -1 ? html.replace('</main>', `${section}</main>`) : html.slice(0, at) + section + html.slice(at);
}
