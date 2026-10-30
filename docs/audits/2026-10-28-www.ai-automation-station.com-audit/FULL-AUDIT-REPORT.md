# Full SEO Audit: www.ai-automation-station.com

**Date:** 2026-10-28
**Pages crawled:** 274 (all HTTP 200)
**Business type:** creator education and paid Skool community ($29/$49/$89 per month), YouTube channel, written guides
**SEO Health Score: 76 / 100**

## Executive summary

The technical base and the performance are strong. The site is prerendered, clean, fast and well marked up. The score is held back by three things: 220 video pages that are mostly thin, internal links that don't connect the guides, topic hubs and videos into clusters, and a brand entity ("AI Income Lab") that search engines and AI answers can't reliably tell apart from other communities with the same name.

| Category | Weight | Score |
|---|---|---|
| Technical SEO | 22% | 88 |
| Content Quality | 23% | 62 |
| On-Page SEO | 20% | 74 |
| Schema / Structured Data | 10% | 78 |
| Performance (CWV, lab) | 10% | 92 |
| AI Search Readiness | 10% | 74 |
| Images | 5% | 72 |
| **Weighted total** | | **76** |

### Top 5 issues

1. **Thin `/watch/` pages (High).** 173 of 220 have under 300 words (median about 210). Most hold only the YouTube description and a generic CTA. Only 30 have a transcript, and it sits inside a collapsed `<details>` block.
2. **Watch pages compete with guides (High).** `searchTitle` overrides in `src/watch-notes.js` copy guide keywords. HeyGen is an exact duplicate title; OpenCode, 9Router and Vapi are near-duplicates.
3. **Weak brand entity (High).** "AI Income Lab" never appears in the structured data, the Organization has no logo, and other Skool communities use the same name. Observed rankings for the name varied between checks, and AI answers may blend the communities.
4. **Clusters aren't linked (High).** Only 1 of 220 watch pages links a topic hub, and only 3 of 24 guides link their hub. The "earn with AI" topic, the brand's core promise, has no hub or pillar page.
5. **Watch pages load the YouTube player eagerly (High).** That's about 1.1 MB per page and the slowest mobile LCP tested (2.12 s). The homepage already uses a click-to-load facade.

### Top 5 quick wins

1. Add a logo, `alternateName: "AI Income Lab"`, and fix `WebSite.alternateName` (currently "Mike Holp") in `index.html`.
2. Retitle `/watch/pMLyxz6Dyt4` and the other watch pages that copy guide titles.
3. Add the topic level to watch-page breadcrumbs (`src/archive.js`).
4. Write alt text for the 9 guide hero diagrams.
5. Reuse the homepage YouTube facade on watch pages.

### Limitations

- No Google API credentials, so there's no CrUX field data, Search Console indexation data or GA4 traffic.
- The PageSpeed Insights API was rate-limited. All Core Web Vitals figures come from local Lighthouse 13.6 lab runs.
- There are no backlink API keys, and the domain isn't in the Common Crawl web graph yet, so backlinks aren't scored.
- SERP checks used a 5-result web search sample.

## Technical SEO (88)

**What works:**
- **Status codes:** all pages return 200, with no broken internal links.
- **Redirects:** 308 redirects go to `https://www`. Extensionless guide URLs, trailing slashes and `/index.html` are all normalized.
- **404 handling:** unknown paths, video IDs and topics return real 404s with `noindex`.
- **Sitemaps:** both are valid, and the video sitemap has all the required tags. IndexNow pings on production builds.
- **Delivery:** Brotli over HTTP/2, immutable caching for hashed assets, and HSTS plus the standard security headers.

**Issues:**
- The thin watch pages (Medium in technical terms; the content section covers them).
- 23 `/videos` sitemap URLs have no `<lastmod>`.
- The homepage `<lastmod>` is hard-coded and stale.
- A few old URL forms take two redirects instead of one.
- The CSP only reports violations and has no endpoint to send reports to.

Details: [findings/technical.md](findings/technical.md).

## Content quality (62)

**What works:** the guides are exemplary. They have bylines, published and updated dates, primary sources, honest caveats, quick answers, tables and FAQs. The richest watch pages, such as `/watch/TuVL2x6IfDk`, are excellent too, with chapters, build notes, fact-checks and a transcript.

**Issues:**
- **Watch pages:** about 64% of all URLs are thin, templated video pages. The best fixes are transcripts and notes; until a page has one, mark it `noindex,follow`.
- **Author page:** there's no standalone About page. The author link goes to `/#about` on a mixed-purpose homepage.
- **Money guides:** they lack first-hand proof. `make-money-with-ai-no-experience` and `ai-side-hustles` have no outside sources at all.
- **Quick answers:** 14 of 24 guides don't open with one.
- **Transcripts:** they're raw auto-captions with errors like "codeex" and "Versal".

Details: [findings/content.md](findings/content.md).

## On-page SEO (74)

**Issues:**
- **Keyword overlap:** watch pages compete with guides for the same searches.
- **Wrong intent:** `ai-automation-services-small-business` targets a search that mostly returns agency pages. The guide is written for sellers, so it should target the seller's search instead.
- **Topic hubs:** titles like "n8n videos | Mike Holp" (22 characters) and H1s like "n8n" are too short.
- **Guide routing:** one broad pattern in `src/archive.js` sends 13 of 15 Claude Code videos to the Codex guide.

The internal-link gaps and cluster map are in [findings/clusters.md](findings/clusters.md). The search-intent checks are in [findings/sxo.md](findings/sxo.md).

## Schema / structured data (78)

**What works:**
- No invalid JSON-LD.
- A consistent `@id` graph links `#mike`, `#org` and `#website` across pages.
- VideoObject markup is complete on all 220 watch pages, and 195 have chapter markup.
- Article markup is complete on all 24 guides.
- Breadcrumbs appear on 246 pages.

**Issues:**
- No Organization logo (High).
- "AI Income Lab" is missing from the markup (High).
- The community tiers and courses have no Product, Offer or Course markup.
- The Person `url` and `sameAs` differ between pages.
- The `/videos` pages have no breadcrumbs.

Ready-to-paste JSON-LD is in [findings/schema.md](findings/schema.md).

## Performance (92, lab data)

| URL | Mobile LCP | Mobile CLS | Mobile TBT | Mobile perf |
|---|---|---|---|---|
| `/` | 1.84 s | 0 | 117 ms | 98 |
| guide | 0.97 s | 0 | 0 ms | 100 |
| `/videos/n8n` | 1.93 s | 0.001 | 32 ms | 100 |
| `/watch/wL6bjqaUcd8` | 2.12 s | 0.065 | 50 ms | 96 |

**Issues:**
- Watch pages load the YouTube player without a facade.
- After consent, the Meta pixel adds about 300 ms of main-thread blocking. Lighthouse can't see this because it runs before consent.
- There's no real-user monitoring, such as Speed Insights.
- Fonts on guide and watch pages are discovered late, causing a small layout shift.

Details: [findings/performance.md](findings/performance.md).

**Visual:** the value proposition and primary CTA are above the fold on both viewports. On mobile, the guide header stacks into three rows, which pushes the H1 down to about 376 px. Details and screenshots: [findings/visual.md](findings/visual.md), `screenshots/`.

## AI search readiness (74)

**What works:**
- All 15 tested AI and search crawler user agents get identical 200 responses.
- `llms.txt` is good.
- The guides are dated and sourced, and `ai-automation.html` is a model page for being cited.

**Issues:**
- The brand name collides with other communities.
- There are very few independent mentions; the only one found is a checkthecourse.com listing.
- `/about` and `/llms-full.txt` don't exist.

Details: [findings/geo.md](findings/geo.md).

## Images (72)

All 587 images have dimensions, and 563 are lazy-loaded. Empty alt text on about 490 thumbnails and avatars that sit next to text is correct. The 9 informative guide hero diagrams need real alt text.

## Backlinks (not scored)

The domain isn't in the Common Crawl graph (January to March 2026), and the backlink API keys aren't configured. The only link verified on a third-party site is a `nofollow` link from checkthecourse.com. Export the Links report from Search Console, or add a Moz key, before setting link-building targets. Details: [findings/backlinks.md](findings/backlinks.md).

## Notes on conflicting evidence

- **Transcripts:** one specialist reported that no watch page includes a transcript. A live check of `/watch/TuVL2x6IfDk` confirmed a collapsed "Read the full transcript" block, and about 30 of 220 pages have one.
- **Brand name:** "AI Income Lab" rankings differed between specialists' searches. One saw a namesake (Pat Koyi) ranking above this site; another saw this site at #1 with a different namesake (John Coma) below. Either way, the name is shared, so treat disambiguation as necessary.
