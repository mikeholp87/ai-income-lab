# Technical SEO + Sitemap Audit: www.ai-automation-station.com

Date: 2026-10-28. Sources: `evidence/crawl.json`, `evidence/crawl-summary.json` (274 HTML pages), `evidence/home-render.json`, and live `curl` checks run on the same day. Repo: `/home/mikeh/Projects/ai-income-lab`. No source files were changed.

## Technical Score: 88/100

| Category | Status | Score | Notes |
|---|---|---|---|
| Crawlability | pass | 95 | robots.txt allows all and declares both sitemaps. Every page returns 200, with 0 broken links and 0 orphans. |
| Indexability | warn | 78 | Canonicals are clean and there are no duplicate URL variants. 173 of 220 `/watch/` pages are thin. |
| Security | pass | 85 | HTTPS, HSTS, XFO, nosniff, Referrer-Policy and Permissions-Policy are all set. CSP is Report-Only. |
| URL Structure | pass | 90 | Clean, consistent URLs with permanent redirects. Two 2-hop chains on edge-case URLs. |
| Mobile | pass | 90 | Viewport meta and `lang` on every page. Not measured on a device. |
| Core Web Vitals | n/a | (not scored) | PageSpeed Insights API quota was exhausted, so no field or lab data was collected. TTFB is fast: crawl median under 300 ms, max 1.24 s, and no page over 1.5 s. |
| Structured Data | pass | 95 | 246 BreadcrumbList, 220 VideoObject, 24 Article, 13 FAQPage. 0 invalid blocks. |
| JS Rendering | pass | 95 | Homepage is prerendered with React SSR (`is_spa: false`). Guides are static HTML. Watch and videos pages are server HTML from a Vercel Function. |
| IndexNow | pass | 90 | Key file is live and pings are sent from `scripts/prerender.js`. |

## What works

- **HTTPS and host canonicalization.** `http://www` → `https://www` is a single 308. `https://apex` → `https://www` is a single 308. HSTS is `max-age=63072000`.
- **No duplicate URL variants.** Extensionless guide URLs (`/guides/x`, `/start-here`, `/guides`) 308 to `.html`. A trailing `/` always 308s to the no-slash URL. `/index.html` → `/`. `/videos/n8n.html` and `/watch/<id>.html` return 404. Query-string variants (`?utm_*`, `?t=`, `?x=`) return 200 with a canonical pointing at the clean URL. Uppercase paths return 404. Config: `vercel.json` (`trailingSlash:false`, `redirects`).
- **Real 404s.** Random paths return 404 with `noindex`. Malformed or unknown watch IDs and unknown topics also return 404 with `noindex`, from `api/videos.js` `notFound()`. Topics with no videos 404 instead of rendering empty, thin pages.
- **Internal endpoints are kept out of the index.** `/api/*` and `/o/*` send `X-Robots-Tag: noindex`. `search.html` is `noindex,follow` and is left out of the sitemap.
- **Clean crawl.** All 274 pages return 200 with self-referencing canonicals, 0 broken internal links and 0 redirects in internal links. Every watch page has at least one internal link, and most have 4 or more. No page is an orphan.
- **Valid sitemaps.** Both sitemaps parse as valid XML (checked with `xmllint`). No sitemap URL is non-200, noindexed or redirected. All URLs use `https://www`. There are no `priority` or `changefreq` tags. Both sitemaps are declared in `public/robots.txt`.
- **Accurate lastmod for guides.** Guide `<lastmod>` values match each page's Article `dateModified`. Spot checks: `claude-code-vs-codex` 2026-10-22, `codex-usage-limits` 2026-10-27, `youtube-feed` 2026-10-11. The values vary from page to page, which is a good sign they are real.
- **Video sitemap has all required tags.** All 220 entries have `thumbnail_loc`, `title`, `description` and `player_loc`, plus `duration` and `publication_date`. None use deprecated tags. The video is a visible `<iframe>` in the initial HTML, and the `VideoObject` JSON-LD matches.
- **Compression and caching.** HTML, JS, CSS and `llms.txt` are served with Brotli over HTTP/2. Hashed `/assets/*` files are `max-age=31536000, immutable`. Images are cached for 1 day with stale-while-revalidate (SWR). Watch, videos and video-sitemap responses get `s-maxage=86400` with SWR, and CDN hits were observed.
- **AI crawlers allowed.** robots.txt is `User-agent: * Allow: /`, so GPTBot, OAI-SearchBot, ClaudeBot, Claude-SearchBot, PerplexityBot and Google-Extended are all allowed. That fits the GEO/visibility goal. `llms.txt` returns 200.
- **IndexNow.** The key `f5acf528749d2b670efeec8c5cd3b8b7.txt` is served at the root. Production builds POST URLs changed in the last 2 days to `api.indexnow.org` (`scripts/prerender.js` and `src/feed.js` `recentUrls`).
- **Bing and Google verification.** `msvalidate.01` meta tag and `public/google4ba0434c1bd6dcff.html` are both present.

## Findings

### 1. Most `/watch/` pages are thin, and their only text duplicates the YouTube description (Medium)
- **Evidence:** Word counts for the 220 watch pages: 87 have 100–199 words and 86 have 200–299, so 173 (79%) are under 300. The shortest is 117 words (`/watch/wL6bjqaUcd8`). On these pages the only unique text is the YouTube description, for example "Learn how to give your Hermes Agent a memory upgrade with this SuperMemory plugin!". The rest is navigation and a CTA. The pages with real content come from `src/transcripts.json` (30 videos) and `src/watch-notes.js` (12 videos). The transcript backfill (`scripts/fetch-transcripts.mjs`, systemd timer `ai-income-lab-transcripts.timer`, next run today) adds about 30 videos a day because of YouTube quota limits. One video-sitemap description is still a template: "Watch Herdr Lets You Run Claude Code And Codex In One Place by AI Automation Station." (`/watch/VE66JDHoS6Y`).
- **Risk:** Google can only index a watch page as a video page if the page itself is indexed. Pages that are an embed plus a copy of the YouTube description often get "Crawled – currently not indexed", or YouTube's own URL ranks instead. This is not a penalty risk. The canonicals are self-referencing, and the page is a legitimate embed of the channel's own video.
- **Fix:** Let the transcript backfill finish (about 6 more days at the current rate). Then check that every watch page has a transcript or notes. In `src/archive.js` (`renderWatch`, around lines 281–284), consider showing the first 2–3 transcript paragraphs or a short summary *outside* the collapsed `<details>`, since content hidden behind expandable sections carries less weight. Prioritize writing `src/watch-notes.js` entries for the top-viewed videos. If some videos will never get captions, fall back to a template description built from chapters and tools in `src/archive.js`. Track progress in GSC's Video indexing report.

### 2. The 23 `/videos` URLs in sitemap.xml have no `<lastmod>` (Low)
- **Evidence:** 52 URLs in `/sitemap.xml`, 29 with `lastmod`. The 23 without it are `/videos`, `/videos/2`–`/videos/15`, and 8 topic pages (`/videos/n8n`, `/videos/claude-code`, …). These are the pages whose content changes most often.
- **Fix:** In `src/archive.js` `renderPageSitemap()` (line 314), set `<lastmod>` for each archive page or topic to the newest `publishedAt` among the videos it lists. For `/videos`, that is the newest upload.

### 3. The homepage `<lastmod>` is stale (Low)
- **Evidence:** Sitemap `<lastmod>` for `/` is `2026-10-16`. The homepage HTML response has `Last-Modified: Wed, 28 Oct 2026 07:15:15 GMT`, and the prerendered "Latest videos" section leads with a video published 2026-10-27. The value is hard-coded in `public/sitemap.xml`.
- **Fix:** In `scripts/prerender.js` or `renderPageSitemap()`, set the homepage `lastmod` to the build's newest upload date when the prerendered latest-video block changes. Only update it on real content changes, not on every deploy.

### 4. Two-hop redirect chains on edge-case URLs (Low)
- **Evidence:**
  - `http://ai-automation-station.com/` → 308 `https://ai-automation-station.com/` → 308 `https://www…/`. This is the Vercel default of HTTPS first, then the host redirect.
  - `/guides/heygen-ai-avatar-tutorial/` → 308 `/guides/heygen-ai-avatar-tutorial` → 308 `…/heygen-ai-avatar-tutorial.html`. Same pattern for `/guides/` → `/guides` → `/guides.html`.
- **Impact:** Small. Internal links don't use these forms. They only matter for old backlinks or typed URLs.
- **Fix:** In `vercel.json` `redirects`, add rules before the `trailingSlash` normalization: `/guides/:slug([a-z0-9-]+)/` → `/guides/:slug.html` and `/:page(start-here|guides|privacy|terms)/` → `/:page.html`. The apex chain could only become one hop with a `has: host` redirect on the apex domain in Vercel. That is optional.

### 5. CSP is Report-Only (Low)
- **Evidence:** The response sends only `Content-Security-Policy-Report-Only` (from `vercel.json` headers). It has no `report-uri`/`report-to`, so violations aren't collected anywhere.
- **Fix:** Add a reporting endpoint, run it for a while, then switch the header key in `vercel.json` to `Content-Security-Policy`. This is not a ranking factor.

### 6. HSTS has no `includeSubDomains` or `preload` (Info)
- **Evidence:** `strict-transport-security: max-age=63072000`.
- **Fix (optional):** Add `; includeSubDomains; preload` once every subdomain serves HTTPS, then submit to hstspreload.org. Vercel sets this header automatically; override it in `vercel.json`.

### 7. `404.html` has a canonical tag and returns 200 when requested directly (Info)
- **Evidence:** `public/404.html` declares `<link rel="canonical" href="…/404.html">`, and `GET /404.html` returns 200. It is also `noindex`, so nothing gets indexed. Real missing URLs correctly get a 404 status.
- **Fix (optional):** Remove the canonical and `og:url` from `public/404.html`.

### 8. Guide and watch page share an exact title (Info, mostly content scope)
- **Evidence:** "HeyGen AI avatar tutorial: create your first video" is used by both `/guides/heygen-ai-avatar-tutorial.html` and `/watch/pMLyxz6Dyt4`.
- **Fix:** Give the watch page a video-specific title, for example "… (video)", or use the YouTube title through `src/watch-notes.js` / `src/archive.js`. Make sure the guide links to the watch page and the watch page links back, so it's clear which page should rank for the query.

### 9. Unknown watch IDs can 302 to YouTube in some cases (Info, by design)
- **Evidence:** In `api/videos.js` (lines 70–75), when the video list can't be refreshed or a video doesn't allow embedding, the watch page returns a 302 to `youtube.com/watch?v=…` with a 10-minute CDN cache. In the live test, unknown IDs correctly returned 404. This is fine as a temporary fallback.
- **Watch for:** GSC reporting watch URLs as "Page with redirect" after a deleted or private video. Those will settle into 404.

### 10. Core Web Vitals not measured (Info)
- The PageSpeed Insights API returned "Quota exceeded", so there is no CrUX or Lighthouse data. Positive signs: prerendered HTML, two preloaded fonts, hashed immutable assets, fixed iframe dimensions (960×540), no third-party scripts at crawl time (`scripts_3p: {}`), and every image has width and height set (`img_no_dims: {}`). Re-run `pagespeed_check.py` or check GSC's Core Web Vitals report.

## Sitemap section

| Check | `/sitemap.xml` | `/video-sitemap.xml` |
|---|---|---|
| Source | `public/sitemap.xml` + `renderPageSitemap()` in `src/archive.js`, written by `scripts/prerender.js` | `renderVideoSitemap()` in `src/archive.js`, served live by `api/videos.js` (rewrite in `vercel.json`) |
| Valid XML | yes | yes |
| URL count | 52 (limit 50k) | 220 (167 KB) |
| Declared in robots.txt | yes | yes |
| Non-200 / noindex / redirected / non-canonical URLs | 0 / 0 / 0 / 0 | 0 / 0 / 0 / 0 |
| `lastmod` | 29 of 52. Guides are accurate; homepage is stale; 23 `/videos*` URLs have none | n/a (`publication_date` on each entry) |
| priority / changefreq | none | none |
| Required video tags | n/a | 220/220 have `thumbnail_loc`, `title`, `description` and `player_loc` (no `content_loc`, which is fine) |
| Description quality | n/a | 1 template description (`/watch/VE66JDHoS6Y`) |
| Caching | static | `public, max-age=3600, s-maxage=86400, swr=86400` |

**Coverage:** All 274 crawled pages are accounted for. 52 are in `sitemap.xml`. The 220 watch pages are only in the video sitemap. `search.html` (noindex) and `404.html` are correctly left out. The crawl summary lists 220 pages as "indexable_not_in_sitemap", but that compared against `sitemap.xml` only. All 220 are in `video-sitemap.xml`, so that item is a false positive. Splitting pages and videos into two files is a good structure. No sitemap index is needed at this size.

**Watch pages reachable from the main sitemap?** Not directly: no `/watch/` URL is listed in `sitemap.xml`. But every `/videos` archive page and topic page in `sitemap.xml` links to watch pages. Watch pages are also linked from the homepage, `start-here.html`, `guides.html`, 19 guides, and each other. Discovery is fine either way.

## Priority summary
1. Medium: thin watch pages. Finish the transcript backfill and show some transcript or summary text outside `<details>` (`src/archive.js`, `src/watch-notes.js`).
2. Low: add `lastmod` to `/videos*` and fix the homepage `lastmod` (`src/archive.js` `renderPageSitemap`, `public/sitemap.xml`).
3. Low: collapse the trailing-slash guide redirect chain (`vercel.json`).
4. Low: enforce CSP once a reporting endpoint confirms nothing breaks (`vercel.json`).
5. Info: HSTS preload, 404 canonical, HeyGen title collision, and measure CWV.
