// Build-time outputs from the guide pages and the upload snapshot: the RSS feed, the search index,
// and the URL list for IndexNow. scripts/prerender.js writes them into dist/.
import { snippet } from './archive.js';

const site = 'https://www.ai-automation-station.com';
const entities = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
const escape = text => String(text).replace(/[&<>"']/g, char => entities[char]);
const decode = text => text.replace(/&(amp|lt|gt|quot|#39|rsquo|lsquo|ldquo|rdquo|mdash|ndash);/g, (_, name) => ({ amp: '&', lt: '<', gt: '>', quot: '"', '#39': "'", rsquo: '’', lsquo: '‘', ldquo: '“', rdquo: '”', mdash: '—', ndash: '–' })[name]);

// Title, description, URL and dates from a guide's own head, so the feed never drifts from the page.
export function guideMeta(html) {
  const pick = pattern => decode(html.match(pattern)?.[1] ?? '');
  return {
    title: pick(/<meta property="og:title" content="([^"]*)"/) || pick(/<h1[^>]*>([^<]*)<\/h1>/),
    description: pick(/<meta name="description" content="([^"]*)"/),
    url: pick(/<link rel="canonical" href="([^"]*)"/),
    published: pick(/"datePublished":"([^"]+)"/),
    modified: pick(/"dateModified":"([^"]+)"/) || pick(/"datePublished":"([^"]+)"/),
  };
}

const videoItems = videos => videos.filter(video => video.public !== false)
  .map(video => ({ title: video.title, description: snippet(video.summary || '', 200), url: `${site}/watch/${video.id}`, published: video.published, kind: 'video' }));

// Newest first: every guide plus the latest videos, capped so feed readers get a small file.
export function renderFeed(guides, videos, limit = 40) {
  const items = [...guides.map(guide => ({ ...guide, kind: 'guide' })), ...videoItems(videos)]
    .sort((a, b) => Date.parse(b.published) - Date.parse(a.published)).slice(0, limit);
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>AI Automation Station</title>
<link>${site}/</link>
<atom:link href="${site}/rss.xml" rel="self" type="application/rss+xml"/>
<description>New AI automation guides and tested builds from Mike Holp.</description>
<language>en</language>
${items.map(item => `<item><title>${escape(item.title)}</title><link>${item.url}</link><guid>${item.url}</guid><pubDate>${new Date(item.published).toUTCString()}</pubDate><category>${item.kind === 'guide' ? 'Guide' : 'Video'}</category><description>${escape(item.description)}</description></item>`).join('\n')}
</channel>
</rss>
`;
}

// Compact rows for /search.html: [kind, title, url, description].
export const searchIndex = (guides, videos) => [
  // Most recently updated guides first, so the search page's starting results are the freshest.
  ...[...guides].sort((a, b) => (b.modified ?? '').localeCompare(a.modified ?? '')).map(guide => ['guide', guide.title, guide.url.replace(site, ''), guide.description]),
  ...videoItems(videos).map(video => ['video', video.title, video.url.replace(site, ''), video.description]),
];

// IndexNow wants changed URLs only: pages whose lastmod or publish date is within the last `days`.
export function recentUrls(sitemapXml, videos, now = Date.now(), days = 2) {
  const fresh = date => now - Date.parse(date) <= days * 86400000;
  const pages = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc><lastmod>([^<]+)<\/lastmod>/g)].filter(([, , lastmod]) => fresh(lastmod)).map(([, loc]) => loc);
  return [...pages, ...videoItems(videos).filter(video => fresh(video.published)).map(video => video.url)];
}
