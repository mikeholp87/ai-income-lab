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

const card = video => `<li><a href="https://www.youtube.com/watch?v=${escape(video.id)}" target="_blank" rel="noreferrer">
<img src="https://i.ytimg.com/vi/${escape(video.id)}/mqdefault.jpg" alt="" width="320" height="180" loading="lazy" decoding="async">
<time datetime="${escape(video.published)}">${dateFormat.format(new Date(video.published))}</time>
<h3>${escape(video.title)}</h3>${video.summary ? `\n<p>${escape(video.summary)}</p>` : ''}</a></li>`;

export function renderArchive(videos) {
  const years = Map.groupBy(videos, video => video.published.slice(0, 4));
  const description = `All ${videos.length} long-form videos from AI Automation Station: new AI models, agents, and automation tools like Claude Code, Codex, OpenCode, and n8n, tested on real builds.`;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Every video: AI tools tested on real builds | Mike Holp</title>
<meta name="description" content="${escape(description)}">
<link rel="canonical" href="${site}/videos">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<meta property="og:type" content="website">
<meta property="og:url" content="${site}/videos">
<meta property="og:title" content="Every video: AI tools tested on real builds">
<meta property="og:description" content="${escape(description)}">
<meta property="og:image" content="${site}/og-card.jpg?v=2">
<meta name="twitter:card" content="summary_large_image">
<style>
@font-face { font-family: 'Archivo Black'; font-display: swap; src: url('/fonts/archivo-black.woff2') format('woff2'); }
@font-face { font-family: 'DM Mono'; font-display: swap; src: url('/fonts/dm-mono.woff2') format('woff2'); }
* { box-sizing: border-box; }
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
footer { display: flex; flex-wrap: wrap; gap: 8px 24px; margin-top: 80px; padding: 32px 0; border-top: 1px solid #232323; }
footer a:hover, header a.mono:hover { color: #f5f5f0; }
</style>
</head>
<body>
<header class="shell"><a class="brand" href="/"><span></span>Mike Holp</a><a class="mono" href="${channelUrl}" target="_blank" rel="noreferrer">YouTube ↗</a></header>
<main class="shell">
<div class="intro"><p class="mono path">~/videos</p><h1>Every video</h1><p>${videos.length} long-form builds, newest first. Each one takes a new AI model, agent, or automation tool, builds something real with it, and shows what held up and what broke.</p></div>
${[...years].map(([year, items]) => `<h2>${year}</h2>\n<ul>\n${items.map(card).join('\n')}\n</ul>`).join('\n')}
</main>
<footer class="shell mono"><a href="/">Home</a><a href="${channelUrl}?sub_confirmation=1" target="_blank" rel="noreferrer">Subscribe on YouTube ↗</a><a href="/privacy.html">Privacy</a><a href="/terms.html">Terms</a></footer>
<script defer src="/_vercel/insights/script.js"></script>
</body>
</html>`;
}
