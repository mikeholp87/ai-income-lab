import { channelUrl, summarize } from './youtube.js';

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
    }))
    .sort((a, b) => b.published.localeCompare(a.published));
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

const card = video => `<li><a href="${video.embeddable ? `/watch/${escape(video.id)}` : `https://www.youtube.com/watch?v=${escape(video.id)}`}"${video.embeddable ? '' : ' target="_blank" rel="noreferrer"'}>
<img src="https://i.ytimg.com/vi/${escape(video.id)}/mqdefault.jpg" alt="" width="320" height="180" loading="lazy" decoding="async">
<time datetime="${escape(video.published)}">${dateFormat.format(new Date(video.published))}</time>
<h3>${escape(video.title)}</h3>${video.summary ? `\n<p>${escape(video.summary)}</p>` : ''}</a></li>`;

// One page of the archive, 15 videos per page. Callers check the page is within pageCount(videos).
export function renderArchive(videos, page = 1) {
  const pages = pageCount(videos);
  const years = Map.groupBy(videos.slice((page - 1) * perPage, page * perPage), video => video.published.slice(0, 4));
  const pageNote = page > 1 ? `Page ${page} of ${pages}. ` : '';
  const description = `${pageNote}All ${videos.length} long-form videos from AI Automation Station: new AI models, agents, and automation tools like Claude Code, Codex, OpenCode, and n8n, tested on real builds.`;
  const url = `${site}${pagePath(page)}`;
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
<meta property="og:url" content="${url}">
<meta property="og:title" content="Every video: AI tools tested on real builds">
<meta property="og:description" content="${escape(description)}">
<meta property="og:image" content="${site}/og-card.jpg?v=2">
<meta name="twitter:card" content="summary_large_image">
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
footer a:hover, header a.mono:hover { color: #f5f5f0; }
</style>
</head>
<body>
<a class="skip" href="#content">Skip to videos</a>
<header class="shell"><a class="brand" href="/"><span></span>Mike Holp</a><a class="mono" href="${channelUrl}" target="_blank" rel="noreferrer">YouTube ↗</a></header>
<main class="shell" id="content">
<div class="intro"><p class="mono path">~/videos</p><h1>Every video</h1><p>${videos.length} long-form builds, newest first. ${pageNote}Each one takes a new AI model, agent, or automation tool, builds something real with it, and shows what held up and what broke.</p></div>
<p style="margin-top:24px"><a href="/start-here.html" style="color:#ff6846;text-decoration:underline">New here? Choose your first build</a></p>
${[...years].map(([year, items]) => `<h2>${year}</h2>\n<ul>\n${items.map(card).join('\n')}\n</ul>`).join('\n')}
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
const videoDescription = video => video.summary || `Watch ${video.title} by AI Automation Station.`;

export function renderWatch(video) {
  const description = videoDescription(video);
  const schema = {
    '@context': 'https://schema.org', '@type': 'VideoObject',
    name: video.title, description, thumbnailUrl: thumbnailUrl(video),
    uploadDate: video.published, embedUrl: playerUrl(video), url: watchUrl(video),
    author: { '@type': 'Person', name: 'Mike Holp', url: site },
  };
  return `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escape(video.title)} | AI Automation Station</title>
<meta name="description" content="${escape(description)}">
<link rel="canonical" href="${watchUrl(video)}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="/reading.css">
<meta property="og:type" content="video.other">
<meta property="og:url" content="${watchUrl(video)}">
<meta property="og:title" content="${escape(video.title)}">
<meta property="og:description" content="${escape(description)}">
<meta property="og:image" content="${thumbnailUrl(video)}">
<meta name="twitter:card" content="summary_large_image">
<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>
<style>header,main,footer{width:min(960px,calc(100% - 32px))}main{padding-top:20px}h1{font:700 clamp(24px,4vw,36px)/1.2 system-ui,sans-serif;text-wrap:pretty;overflow-wrap:anywhere;margin:0 0 20px}.player{display:block;width:100%;height:auto;aspect-ratio:16/9;border:2px solid #333;background:#111}.player:hover,.player:focus-visible{border-color:#ff6846;box-shadow:0 0 20px #ff684633}.description{white-space:pre-line;overflow-wrap:anywhere}</style>
</head><body>
<a class="skip" href="#content">Skip to video</a>
<header><a href="/">AI Automation Station</a><a href="/videos">All videos</a></header>
<main id="content">
<h1>${escape(video.title)}</h1>
<iframe class="player" src="${playerUrl(video)}" title="${escape(video.title)}" width="960" height="540" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
<p class="meta">By Mike Holp · <time datetime="${escape(video.published)}">${dateFormat.format(new Date(video.published))}</time></p>
<p class="description">${escape(description)}</p>
<p><a href="https://www.youtube.com/watch?v=${video.id}" target="_blank" rel="noreferrer">Watch on YouTube ↗</a></p>
</main>
<footer><a href="/videos">Browse all videos</a><a href="/start-here.html">Choose your first build</a><a href="/privacy.html">Privacy</a></footer>
</body></html>`;
}

export function renderVideoSitemap(videos) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${videos.filter(video => video.embeddable).map(video => `<url><loc>${watchUrl(video)}</loc><video:video>
<video:thumbnail_loc>${thumbnailUrl(video)}</video:thumbnail_loc>
<video:title>${escape(video.title.slice(0, 100))}</video:title>
<video:description>${escape(videoDescription(video).slice(0, 2048))}</video:description>
<video:player_loc>${playerUrl(video)}</video:player_loc>
<video:publication_date>${escape(video.published)}</video:publication_date>
</video:video></url>`).join('\n')}
</urlset>`;
}
