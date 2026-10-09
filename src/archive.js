import { channelUrl, clock, durationSeconds, longFormPlaylistId, parseChapters, summarize, validChapters } from './youtube.js';
import { videoNotes } from './video-notes.js';
import { videoOffer } from './video-offer.js';
import { watchNotes } from './watch-notes.js';

const site = 'https://www.ai-automation-station.com';
const entities = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
const escape = text => String(text).replace(/[&<>"']/g, char => entities[char]);
const dateFormat = new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

// playlistItems pages (snippet, status, contentDetails) → public long-form uploads, newest first.
export function parseUploads(pages) {
  return pages.flatMap(page => page.items ?? [])
    .filter(item => item.status?.privacyStatus === 'public')
    .map(({ snippet, contentDetails }) => ({
      id: snippet.resourceId.videoId,
      title: snippet.title,
      published: contentDetails?.videoPublishedAt ?? snippet.publishedAt,
      summary: summarize(snippet.description ?? ''),
      chapters: parseChapters(snippet.description ?? ''),
    }))
    .sort((a, b) => b.published.localeCompare(a.published));
}

// Every long-form upload: one playlistItems call (1 quota unit) per 50 videos, then one videos call per 50
// (1 unit whatever parts are requested) for privacy, embedding, length (ISO 8601, e.g. PT13M3S) and views.
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
    const response = await fetch(`${api}/videos?part=status,contentDetails,statistics&id=${batch.map(video => video.id).join(',')}&key=${key}`, { signal });
    if (!response.ok) throw new Error(`video status ${response.status}`);
    const details = new Map(((await response.json()).items ?? []).map(item => [item.id, item]));
    for (const video of batch) {
      const item = details.get(video.id);
      video.public = item?.status?.privacyStatus === 'public';
      video.embeddable = video.public && Boolean(item.status.embeddable);
      video.duration = item?.contentDetails?.duration;
      video.views = Number(item?.statistics?.viewCount ?? 0);
    }
  }
  return videos.filter(video => video.public);
}

export const perPage = 15;
export const pageCount = videos => Math.max(1, Math.ceil(videos.length / perPage));
const pagePath = page => page === 1 ? '/videos' : `/videos/${page}`;

// ponytail: every page number is listed; switch to a windowed list if the archive passes ~40 pages.
function pager(page, pages) {
  if (pages === 1) return '';
  const link = (to, label, rel) => `<a href="${pagePath(to)}"${rel ? ` rel="${rel}"` : ''}>${label}</a>`;
  const numbers = Array.from({ length: pages }, (_, index) => index + 1).map(n => n === page ? `<span aria-current="page">${n}</span>` : link(n, n));
  return `<nav class="pager mono" aria-label="Video pages">${page > 1 ? link(page - 1, '← Newer', 'prev') : ''}${numbers.join('')}${page < pages ? link(page + 1, 'Older →', 'next') : ''}</nav>`;
}

const videoHref = video => video.embeddable ? `/watch/${video.id}` : `https://www.youtube.com/watch?v=${video.id}`;
const jsonLd = data => `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;

const card = (video, eager) => `<li><a href="${escape(videoHref(video))}"${video.embeddable ? '' : ' target="_blank" rel="noreferrer"'}>
<picture data-thumbnail><source type="image/webp" srcset="https://i.ytimg.com/vi_webp/${escape(video.id)}/mqdefault.webp"><img src="https://i.ytimg.com/vi/${escape(video.id)}/mqdefault.jpg" alt="" width="320" height="180" loading="${eager ? 'eager' : 'lazy'}" decoding="async"></picture>
<time datetime="${escape(video.published)}">${dateFormat.format(new Date(video.published))}</time>
<h3>${escape(video.title)}</h3>${video.summary || watchNotes[video.id] || videoNotes[video.id] ? `\n<p>${escape(videoDescription(video))}</p>` : ''}</a></li>`;

// One page of the archive, 15 videos per page. Callers check the page is within pageCount(videos).
export function renderArchive(videos, page = 1) {
  const pages = pageCount(videos);
  const items = videos.slice((page - 1) * perPage, page * perPage);
  const years = Map.groupBy(items, video => video.published.slice(0, 4));
  const pageNote = page > 1 ? `Page ${page} of ${pages}. ` : '';
  const description = `${pageNote}Browse ${videos.length} AI Automation Station tutorials: coding agents, AI tools, and automation workflows tested on real builds.`;
  const url = `${site}${pagePath(page)}`;
  const schema = {
    '@context': 'https://schema.org', '@type': 'CollectionPage', '@id': url, url,
    name: page > 1 ? `Every video, page ${page} of ${pages}` : 'Every video', description,
    isPartOf: { '@id': `${site}/#website` },
    mainEntity: { '@type': 'ItemList', itemListElement: items.map((video, index) => ({ '@type': 'ListItem', position: (page - 1) * perPage + index + 1, url: new URL(videoHref(video), site).href })) },
  };
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${page > 1 ? `Every video, page ${page} of ${pages} | Mike Holp` : 'Every video: AI tools tested on real builds | Mike Holp'}</title>
<meta name="description" content="${escape(description)}">
<link rel="canonical" href="${url}">${page > 1 ? `\n<link rel="prev" href="${site}${pagePath(page - 1)}">` : ''}${page < pages ? `\n<link rel="next" href="${site}${pagePath(page + 1)}">` : ''}
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<meta property="og:type" content="website">
<meta property="og:site_name" content="AI Automation Station">
<meta property="og:url" content="${url}">
<meta property="og:title" content="Every video: AI tools tested on real builds">
<meta property="og:description" content="${escape(description)}">
<meta property="og:image" content="${site}/og-card.jpg?v=2">
<meta name="twitter:card" content="summary_large_image">
<link rel="stylesheet" href="/consent.css">
<script type="module" src="/assets/reading.js"></script>
${jsonLd(schema)}
<style>
@font-face { font-family: 'Archivo Black'; font-display: swap; src: url('/fonts/archivo-black.woff2') format('woff2'); }
@font-face { font-family: 'DM Mono'; font-display: swap; src: url('/fonts/dm-mono.woff2') format('woff2'); }
* { box-sizing: border-box; }
:focus-visible { outline: 2px solid #ff6846; outline-offset: 4px; }
.skip { position: absolute; top: 0; left: 16px; transform: translateY(-150%); background: #111; padding: 12px; }
.skip:focus { transform: none; }
body { margin: 0; background: #0a0a0a; color: #f5f5f0; font: 16px/1.6 system-ui, sans-serif; -webkit-font-smoothing: antialiased; }
a { color: inherit; text-decoration: none; }
h1, h2, h3, p { margin: 0; }
.shell { width: min(1120px, calc(100% - 32px)); margin: 0 auto; }
header { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 24px 0; }
.brand { display: flex; align-items: center; gap: 10px; font: 400 15px 'Archivo Black', sans-serif; text-transform: uppercase; }
.brand span { width: 12px; height: 12px; background: #ff6846; }
.mono { color: #8c8c86; font: 400 13px 'DM Mono', monospace; }
.intro { padding: 56px 0 24px; border-bottom: 1px solid #232323; }
.path { color: #ff6846; }
h1 { margin-top: 12px; font: 400 clamp(36px, 7vw, 72px)/.95 'Archivo Black', sans-serif; text-transform: uppercase; }
.intro p:last-child { max-width: 62ch; margin-top: 20px; color: #8c8c86; }
h2 { margin: 56px 0 24px; font: 400 28px 'Archivo Black', sans-serif; }
ul { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 40px 24px; margin: 0; padding: 0; list-style: none; }
li a { display: grid; gap: 10px; }
li img { display: block; width: 100%; height: auto; aspect-ratio: 16 / 9; object-fit: cover; border: 1px solid #232323; background: #111111; }
time { color: #8c8c86; font: 400 12px 'DM Mono', monospace; }
h3 { font-size: 17px; line-height: 1.3; text-wrap: pretty; }
li a:hover h3 { color: #ff6846; }
li p { color: #8c8c86; font-size: 14px; }
.pager { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 64px; }
.pager a, .pager span { min-width: 44px; min-height: 44px; display: inline-grid; place-items: center; padding: 0 12px; border: 1px solid #232323; }
.pager a:hover { border-color: #8c8c86; color: #f5f5f0; }
.pager [aria-current] { border-color: #ff6846; color: #f5f5f0; }
footer.shell { display: flex; flex-wrap: wrap; gap: 8px 24px; margin-top: 80px; padding: 32px 0; border-top: 1px solid #232323; }
header a, footer a { display: inline-flex; align-items: center; min-height: 44px; }
footer a:hover, header a.mono:hover { color: #f5f5f0; }
</style>
</head>
<body>
<a class="skip" href="#content">Skip to videos</a>
<header class="shell"><a class="brand" href="/"><span></span>Mike Holp</a><a class="mono" href="${channelUrl}" target="_blank" rel="noreferrer">YouTube ↗</a></header>
<main class="shell" id="content">
<div class="intro"><p class="mono path">~/videos</p><h1>Every video</h1><p>${videos.length} long-form builds, newest first. ${pageNote}Each one takes a new AI model, agent, or automation tool, builds something real with it, and shows what held up and what broke.</p></div>
<p style="margin-top:24px"><a href="/start-here.html" style="color:#ff6846;text-decoration:underline">New here? Choose your first build</a></p>
${[...years].map(([year, group]) => `<h2>${year}</h2>\n<ul>\n${group.map(video => card(video, video === items[0])).join('\n')}\n</ul>`).join('\n')}
${pager(page, pages)}
</main>
<footer class="shell mono"><a href="/">Home</a><a href="${channelUrl}?sub_confirmation=1" target="_blank" rel="noreferrer">Subscribe on YouTube ↗</a><a href="/privacy.html">Privacy</a><a href="/terms.html">Terms</a></footer>
<script defer src="/_vercel/insights/script.js"></script>
</body>
</html>`;
}

const watchUrl = video => `${site}/watch/${video.id}`;
const playerUrl = video => `https://www.youtube-nocookie.com/embed/${video.id}`;
const thumbnailUrl = video => `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`;
const videoDescription = video => watchNotes[video.id]?.summary || videoNotes[video.id]?.summary || video.summary || `Watch ${video.title} by AI Automation Station.`;
const number = new Intl.NumberFormat('en');

// Keep snippets concise; search engines choose the final displayed text and length.
export function snippet(text, max = 160) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const sentence = cut.match(/^[\s\S]*[.!?](?=\s)/)?.[0];
  return sentence?.length > 80 ? sentence : `${cut.replace(/\s+\S*$/, '')}…`;
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

// Written guides that cover the same tool as a video.
const guides = [
  [/9router/i, '/guides/first-api-request.html', 'Make your first API request'],
  [/codex|open\s?code|claude code/i, '/guides/codex-workflow.html', 'Make and verify a small code change with Codex'],
  [/make\.com/i, '/guides/make-first-automation.html', 'Build your first Make.com automation'],
];

// `videos` (the whole archive) feeds the related list; `start` (seconds, from ?t=) cues the player to a chapter.
export function renderWatch(video, { videos = [], start = 0 } = {}) {
  const description = videoDescription(video);
  const offer = videoOffer(video.title);
  const seconds = durationSeconds(video.duration);
  const chapters = validChapters(video.chapters, seconds);
  const related = relatedVideos(video, videos);
  const guide = guides.find(([pattern]) => pattern.test(video.title));
  const notes = videoNotes[video.id];
  const chapterUrl = chapter => `${watchUrl(video)}?t=${chapter.seconds}`;
  const schema = {
    '@context': 'https://schema.org', '@type': 'VideoObject', '@id': `${watchUrl(video)}#video`,
    name: video.title, description, thumbnailUrl: thumbnailUrl(video),
    uploadDate: video.published, embedUrl: playerUrl(video), url: watchUrl(video),
    ...(seconds && { duration: video.duration }),
    ...(video.views > 0 && { interactionStatistic: { '@type': 'InteractionCounter', interactionType: { '@type': 'WatchAction' }, userInteractionCount: video.views } }),
    // Key moments: a clip ends where the next starts, so this needs the video's length.
    ...(seconds && chapters.length && { hasPart: chapters.map((chapter, index) => ({ '@type': 'Clip', name: chapter.label, startOffset: chapter.seconds, endOffset: chapters[index + 1]?.seconds ?? seconds, url: chapterUrl(chapter) })) }),
    author: { '@type': 'Person', '@id': `${site}/#mike`, name: 'Mike Holp', url: `${site}/` },
    publisher: { '@type': 'Organization', '@id': `${site}/#org`, name: 'AI Automation Station', url: `${site}/` },
  };
  const breadcrumbs = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [['Home', `${site}/`], ['Videos', `${site}/videos`], [video.title, watchUrl(video)]].map(([name, item], index) => ({ '@type': 'ListItem', position: index + 1, name, item })),
  };
  const meta = [`<time datetime="${escape(video.published)}">${dateFormat.format(new Date(video.published))}</time>`, seconds && clock(seconds), video.views > 0 && `${number.format(video.views)} views`].filter(Boolean).join(' · ');
  return `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escape(watchNotes[video.id]?.searchTitle || notes?.searchTitle || video.title)}</title>
<meta name="description" content="${escape(snippet(description))}">
<link rel="canonical" href="${watchUrl(video)}">
<link rel="preconnect" href="https://www.youtube-nocookie.com">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="/reading.css">
<link rel="stylesheet" href="/consent.css">
<script type="module" src="/assets/reading.js"></script>
<meta property="og:type" content="video.other">
<meta property="og:site_name" content="AI Automation Station">
<meta property="og:url" content="${watchUrl(video)}">
<meta property="og:title" content="${escape(video.title)}">
<meta property="og:description" content="${escape(snippet(description))}">
<meta property="og:image" content="${thumbnailUrl(video)}">
<meta name="twitter:card" content="summary_large_image">
${jsonLd(schema)}
${jsonLd(breadcrumbs)}
<style>header,main,footer{width:min(960px,calc(100% - 32px))}main{padding-top:20px}h1{font:700 clamp(24px,4vw,36px)/1.2 system-ui,sans-serif;text-wrap:pretty;overflow-wrap:anywhere;margin:0 0 20px}.player{display:block;width:100%;height:auto;aspect-ratio:16/9;border:2px solid #333;background:#111}.player:hover,.player:focus-visible{border-color:#ff6846;box-shadow:0 0 20px #ff684633}.description{white-space:pre-line;overflow-wrap:anywhere}.chapters{padding:0;list-style:none}.chapters li{margin:4px 0}.chapters a{display:inline-block;min-width:4.5em;padding:4px 0;font-variant-numeric:tabular-nums}.table{overflow-x:auto}td,th{vertical-align:top}</style>
</head><body>
<a class="skip" href="#content">Skip to video</a>
<header><a href="/">AI Automation Station</a><a href="/videos">All videos</a></header>
<main id="content">
<nav aria-label="Breadcrumb" class="meta"><a href="/">Home</a> / <a href="/videos">Videos</a> / <span aria-current="page">${escape(video.title)}</span></nav>
<h1>${escape(video.title)}</h1>
<iframe class="player" src="${playerUrl(video)}${start ? `?start=${start}` : ''}" title="${escape(video.title)}" width="960" height="540" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
<p class="meta">By <a href="/#about" rel="author">Mike Holp</a> · ${meta}</p>
${watchNotes[video.id]?.notice ? `<p class="note">${escape(watchNotes[video.id].notice)} <a href="https://www.skool.com/ai-automation-station-7346/plans">Check current membership plans</a>.</p>` : ''}
<p class="description">${escape(description)}</p>${notes ? `
<section aria-labelledby="notes">
<h2 id="notes">What I tested</h2>
<p>${escape(notes.tested)}</p>
<div class="table"><table><thead><tr>${notes.columns.map(column => `<th scope="col">${escape(column)}</th>`).join('')}</tr></thead>
<tbody>${notes.rows.map(([label, ...cells]) => `<tr><th scope="row">${escape(label)}</th>${cells.map(cell => `<td>${escape(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>${notes.gaps ? `
<h3>What still needed me</h3>
<ul>${notes.gaps.map(gap => `<li>${escape(gap)}</li>`).join('')}</ul>` : ''}${notes.verdict ? `
<h3>Verdict</h3>
<p>${escape(notes.verdict)}</p>` : ''}
<p class="meta">${escape(notes.note)}</p>
</section>` : ''}${chapters.length ? `
<h2>In this video</h2>
<ol class="chapters">${chapters.map(chapter => `<li><a href="/watch/${video.id}?t=${chapter.seconds}">${clock(chapter.seconds)}</a> ${escape(chapter.label)}</li>`).join('')}</ol>` : ''}${guide && !watchNotes[video.id]?.html?.includes(guide[1]) ? `
<p>Prefer reading? Follow the written guide: <a href="${guide[1]}">${guide[2]}</a>.</p>` : ''}
<p><a class="action" href="https://www.youtube.com/watch?v=${video.id}" target="_blank" rel="noreferrer">Watch on YouTube ↗</a></p>
${watchNotes[video.id]?.html ?? ''}
<aside class="note" aria-labelledby="video-next-step">
<h2 id="video-next-step">${escape(offer.title)}</h2>
<p>${escape(offer.detail)}</p><p class="meta">${escape(offer.access)}</p>
<p><a class="action" href="https://www.skool.com/ai-automation-station-7346/plans" data-placement="watch_video" data-video-id="${video.id}" target="_blank" rel="noreferrer">Explore plans on Skool ↗</a></p>
</aside>${related.length ? `
<h2>More builds</h2>
<ul class="related">${related.map(other => `<li><a href="/watch/${other.id}">${escape(other.title)}</a></li>`).join('')}</ul>` : ''}
</main>
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
  const core = xml.replace(/\s*<url><loc>https:\/\/www\.ai-automation-station\.com\/videos(?:\/\d+)?<\/loc>[\s\S]*?<\/url>/g, '');
  const archive = Array.from({ length: pageCount(videos) }, (_, index) => `  <url><loc>${site}${pagePath(index + 1)}</loc></url>`).join('\n');
  return core.replace('</urlset>', `${archive}\n</urlset>`);
}
