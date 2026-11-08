import { mkdir, writeFile } from 'node:fs/promises';

// Read-only crawl of public pages. Run from the repository root.
const base = 'https://www.ai-automation-station.com';
const out = new URL('./', import.meta.url);
await mkdir(out, { recursive: true });
const decode = s => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)));
const clean = s => decode(s.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ')).trim();
const attrs = s => Object.fromEntries([...s.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)].map(m => [m[1].toLowerCase(), decode(m[2] ?? m[3])]));
async function get(url, manual = false) {
  const start = performance.now();
  try {
    const r = await fetch(url, { redirect: manual ? 'manual' : 'follow', signal: AbortSignal.timeout(25000), headers: { 'User-Agent': 'AI-Automation-Station-SEO-Audit/1.0' } });
    const html = await r.text();
    return { url, finalUrl: r.url, status: r.status, ms: Math.round(performance.now() - start), headers: Object.fromEntries(['content-type', 'x-robots-tag', 'cache-control', 'location', 'strict-transport-security', 'content-encoding'].map(k => [k, r.headers.get(k)])), bytes: Buffer.byteLength(html), html };
  } catch (e) { return { url, error: `${e.message}: ${e.cause?.code ?? ''}` }; }
}
async function pool(items, fn, count = 5) {
  let cursor = 0;
  const result = [];
  await Promise.all(Array.from({ length: count }, async () => {
    while (cursor < items.length) { const i = cursor++; result[i] = await fn(items[i]); }
  }));
  return result;
}
function parse(r) {
  if (!r.html) return r;
  const { html, ...rest } = r;
  const meta = [...html.matchAll(/<meta\b[^>]*>/gi)].map(m => attrs(m[0]));
  const links = [...html.matchAll(/<link\b[^>]*>/gi)].map(m => attrs(m[0]));
  const schemas = [];
  const schemaErrors = [];
  for (const m of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    if (attrs(m[1]).type !== 'application/ld+json') continue;
    try { schemas.push(JSON.parse(m[2])); } catch(e) { schemaErrors.push(e.message); }
  }
  const allLinks = [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)].map(m => ({ ...attrs(m[1]), text: clean(m[2]) })).filter(l => l.href);
  const internal = [];
  for (const l of allLinks) {
    try { const u = new URL(l.href, r.finalUrl); if (u.origin === base) internal.push({ ...l, path: u.pathname, hash: u.hash, query: u.search }); } catch { /* invalid href remains in source */ }
  }
  const headings = [...html.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi)].map(m => ({ level: Number(m[1]), text: clean(m[2]) }));
  const main = /<main\b[^>]*>([\s\S]*?)<\/main>/i.exec(html)?.[1] ?? html;
  return { ...rest, title: clean(/<title\b[^>]*>([\s\S]*?)<\/title>/i.exec(html)?.[1] ?? ''), description: meta.find(m => m.name === 'description')?.content ?? '', robots: meta.filter(m => /^(robots|googlebot)$/.test(m.name)).map(m => m.content), canonical: links.filter(l => l.rel === 'canonical').map(l => l.href), lang: attrs(/<html\b[^>]*>/i.exec(html)?.[0] ?? '').lang, viewport: meta.find(m => m.name === 'viewport')?.content, headings, words: clean(main).split(/\s+/).length, excerpt: clean(main).slice(0, 700), images: [...html.matchAll(/<img\b[^>]*>/gi)].map(m => attrs(m[0])), internal, external: allLinks.filter(l => /^https?:/.test(l.href) && !l.href.startsWith(base)).map(l => ({ href: l.href, text: l.text })), schemas, schemaErrors, iframeCount: [...html.matchAll(/<iframe\b/gi)].length, clickPlayer: /data-embed=/.test(html), ids: [...html.matchAll(/\bid=["']([^"']+)["']/g)].map(m => m[1]), mixedContent: [...html.matchAll(/(?:src|href)=["'](http:\/\/[^"']+)/g)].map(m => m[1]) };
}
const manifests = await pool(['/robots.txt', '/sitemap.xml', '/video-sitemap.xml'], p => get(base + p));
for (const r of manifests) await writeFile(new URL(r.url.split('/').at(-1), out), r.html ?? JSON.stringify(r));
const urls = [...new Set(manifests.flatMap(r => [...(r.html ?? '').matchAll(/<loc>(.*?)<\/loc>/g)].map(m => decode(m[1]))))];
console.log(`Crawling ${urls.length} sitemap URLs`);
const pages = await pool(urls, async u => parse(await get(u)));
await writeFile(new URL('crawl.json', out), JSON.stringify({ checkedAt: new Date().toISOString(), manifests: manifests.map(({html, ...r}) => r), pages }, null, 2));
const byPath = new Map(pages.map(p => [new URL(p.url).pathname, p]));
const missing = [...new Set(pages.flatMap(p => p.internal ?? []).filter(l => !l.query && !byPath.has(l.path) && !/\.(?:zip|csv|json|png|webp|jpg|svg|mp4|txt|js|css|xml|pdf)$/.test(l.path)).map(l => l.path))];
const extra = await pool(missing, async p => parse(await get(base + p)));
await writeFile(new URL('linked-extra.json', out), JSON.stringify(extra, null, 2));
for (const p of extra) byPath.set(new URL(p.url).pathname, p);
const depth = new Map([['/', 0]]);
const queue = ['/'];
for (let i = 0; i < queue.length; i++) {
  const from = queue[i];
  for (const l of byPath.get(from)?.internal ?? []) {
    if (l.query || depth.has(l.path)) continue;
    depth.set(l.path, depth.get(from) + 1); queue.push(l.path);
  }
}
const duplicates = field => Object.entries(Object.groupBy(pages.filter(p => p[field]), p => p[field])).filter(([, p]) => p.length > 1).map(([value, p]) => ({ value, urls: p.map(p => p.url) }));
const summary = {
  checkedAt: new Date().toISOString(), sitemapPages: pages.length, extraPages: extra.length,
  statuses: Object.fromEntries(Object.entries(Object.groupBy(pages, p => p.status ?? 'error')).map(([k,v]) => [k,v.length])),
  errors: [...pages, ...extra].filter(p => p.status !== 200),
  noindex: pages.filter(p => /noindex/i.test([...p.robots ?? [], p.headers?.['x-robots-tag']].join(' '))).map(p => p.url),
  canonicalMismatch: pages.filter(p => p.canonical?.length !== 1 || p.canonical[0] !== p.url).map(p => ({url:p.url,canonical:p.canonical})),
  badH1: pages.filter(p => p.headings?.filter(h => h.level === 1).length !== 1).map(p => p.url),
  missingTitle: pages.filter(p => !p.title).map(p=>p.url), missingDescription: pages.filter(p=>!p.description).map(p=>p.url),
  duplicateTitles: duplicates('title'), duplicateDescriptions: duplicates('description'),
  schemaErrors: pages.filter(p=>p.schemaErrors?.length).map(p=>({url:p.url,errors:p.schemaErrors})),
  imagesMissingAlt: pages.flatMap(p=>(p.images??[]).filter(i=>i.alt===undefined).map(i=>({url:p.url,src:i.src}))),
  lazyGuideHeroes: pages.filter(p=>new URL(p.url).pathname.startsWith('/guides/') && p.images?.find(i=>i.src?.startsWith('/assets/guides/') && !i.src.includes('/video/'))?.loading==='lazy').map(p=>p.url),
  deep: pages.filter(p=>(depth.get(new URL(p.url).pathname)??Infinity)>3).map(p=>({url:p.url,depth:depth.get(new URL(p.url).pathname)??null})),
  brokenFragments: pages.flatMap(p=>(p.internal??[]).filter(l=>l.hash&&l.hash!=='#top'&&!l.hash.startsWith('#t=')&&byPath.has(l.path)&&!byPath.get(l.path).ids?.includes(decodeURIComponent(l.hash.slice(1)))).map(l=>({from:p.url,to:l.href}))),
  guides: pages.filter(p=>new URL(p.url).pathname.startsWith('/guides/')).map(p=>({url:p.url,title:p.title,titleLength:p.title?.length,descriptionLength:p.description?.length,words:p.words,h1:p.headings?.find(h=>h.level===1)?.text,inboundGuidePages:pages.filter(q=>q.url!==p.url&&new URL(q.url).pathname.startsWith('/guides/')&&q.internal?.some(l=>l.path===new URL(p.url).pathname)).length})),
  clickOnlyWatchPages: pages.filter(p=>new URL(p.url).pathname.startsWith('/watch/')&&p.clickPlayer&&!p.iframeCount).length,
};
await writeFile(new URL('summary.json', out), JSON.stringify(summary,null,2));
console.log(JSON.stringify({...summary,guides:summary.guides.length,deep:summary.deep.slice(0,10),brokenFragments:summary.brokenFragments.slice(0,10)},null,2));
