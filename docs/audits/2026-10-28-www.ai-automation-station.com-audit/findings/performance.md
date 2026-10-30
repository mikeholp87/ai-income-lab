# Performance / Core Web Vitals — www.ai-automation-station.com

Audit date: 2026-10-28 · Tool: local Lighthouse 13.6.0 (headless Chrome; mobile = Moto G Power emulation, 4x CPU, slow 4G; desktop = `--preset=desktop`). PageSpeed Insights API was rate-limited without a key; no CrUX/field data is configured, so **all numbers are lab data**. INP cannot be measured in the lab — TBT is the proxy.

Evidence: `evidence/lighthouse-summary.json` (per-run summary), `evidence/consent-tracking-impact.json` (pre/post-consent Playwright runs, 3x each, 4x CPU + 1.6 Mbps/150 ms).

## Score: Performance (CWV) 92 / 100

Every tested URL passes all lab Core Web Vitals thresholds on mobile and desktop. Points are deducted for the watch-page YouTube iframe (≈1.1 MB of third-party JS loaded before any click), the Meta pixel main-thread cost after consent, no field/RUM CWV data, and small font-swap layout shifts.

## Lab metrics

| URL | Device | Perf | A11y | BP | SEO | FCP | LCP | TBT | CLS | SI | Bytes / reqs |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `/` | Mobile | 98 | 100 | 100 | 100 | 1.28 s | 1.84 s | 117 ms | 0 | 1.28 s | 324 KB / 24 |
| `/` | Desktop | 100 | 100 | 100 | 100 | 0.46 s | 0.53 s | 0 ms | 0 | 0.58 s | 378 KB / 24 |
| `/guides/claude-code-for-beginners.html` | Mobile | 100 | 100 | 100 | 100 | 0.97 s | 0.97 s | 0 ms | 0 | 1.23 s | 81 KB / 10 |
| `/guides/claude-code-for-beginners.html` | Desktop | 100 | 100 | 100 | 100 | 0.27 s | 0.27 s | 0 ms | 0.021 | 0.34 s | 81 KB / 10 |
| `/videos/n8n` | Mobile | 100 | 100 | 100 | 100 | 0.80 s | 1.93 s | 32 ms | 0.001 | 1.20 s | 255 KB / 18 |
| `/videos/n8n` | Desktop | 100 | 100 | 100 | 100 | 0.25 s | 0.74 s | 0 ms | 0.005 | 0.31 s | 369 KB / 24 |
| `/watch/wL6bjqaUcd8` | Mobile | 96 | 100 | 96 | 100 | 2.12 s | 2.12 s | 50 ms | 0.065 | 2.12 s | **1,205 KB** / 24 |
| `/watch/wL6bjqaUcd8` | Desktop | 100 | 100 | 96 | 100 | 0.64 s | 0.64 s | 0 ms | 0.001 | 0.74 s | **1,334 KB** / 24 |

TTFB is 44–56 ms on all pages (Vercel CDN, static/prerendered HTML).

### LCP elements and breakdown (mobile)

| URL | LCP element | TTFB | Load delay | Load duration | Render delay |
|---|---|---|---|---|---|
| `/` | Hero video thumbnail `article.player > div.player-screen > button > img` (`/assets/thumbnails/hero-…-768.webp`, `fetchpriority=high`, preloaded) | 153 ms | 25 ms | 77 ms | 194 ms |
| guide | Text `<p>` (intro paragraph) | 151 ms | — | — | 418 ms (font/CSS) |
| `/videos/n8n` | First card thumbnail `https://i.ytimg.com/vi_webp/oP11zRs6628/hqdefault.webp` (eager, **no fetchpriority**) | 153 ms | 21 ms | 362 ms | 87 ms |
| watch | Text `p.description` (iframe is not an LCP candidate) | 167 ms | — | — | 169 ms |

### Third-party impact

| Third party | Pre-consent | Post-consent / on interaction |
|---|---|---|
| Google tag (gtag.js, G-XYRWT4PFN8) | Not loaded | Loaded after "Allow both" (`src/tracking.js`) |
| Meta Pixel (fbevents.js) | Not loaded | **279 KB** transfer; long-task time rises from ~0–175 ms to ~300–435 ms (4x CPU) on home and guide |
| Cal.com embed | Not loaded | Loaded only when the booking calendar is opened (`src/cal.js`) |
| Vercel Web Analytics | `/_vercel/insights/script.js` 2.3 KB on home + video archive; **absent on guide and watch pages** | — |
| YouTube | Home hero = **facade** (thumbnail button → iframe on click, `src/main.jsx:268`). Topic pages = static `i.ytimg.com` thumbnails (175 KB). Watch pages = **full iframe on load**, ≈1.1 MB (base.js 480 KB, ytembeds 382 KB, player CSS 59 KB, Roboto font 35 KB, botguard 25 KB) | — |

Post-consent measurements (median of 3, Playwright, 4x CPU throttle): home LCP 1.17 s → 1.21 s, total bytes 266 KB → 545 KB, long-task total ~175 ms → ~433 ms; guide LCP unchanged (~0.55 s), bytes 80 KB → 358 KB, long-task total ~0 ms → ~300 ms. GTM/GA bytes report as 0 because those hosts send no `Timing-Allow-Origin`, so the real total is higher.

## What works

- Static/prerendered HTML on Vercel CDN, TTFB < 60 ms everywhere; tiny documents (6–15 KB).
- Homepage LCP image is discoverable in the HTML, preloaded, `fetchpriority="high"`, responsive `srcset` WebP — the Lighthouse LCP-discovery checklist passes fully.
- The homepage hero video is a click-to-load facade; `youtube-nocookie.com` is used for privacy.
- All marketing tags (GA4, Meta) are consent-gated, and Cal.com is interaction-gated — zero third-party JS for visitors who have not chosen yet.
- Guide pages are very lean: 81 KB, 10 requests, no framework JS (≈3 KB of module JS).
- All 587 crawled images have width/height; 563 are `loading="lazy"`, with eager loading reserved for above-the-fold items. 410 of them are YouTube thumbnails served as WebP via `<picture>`; no self-hosted PNG is over 100 KB.
- Self-hosted WOFF2 fonts (72 KB total) with `font-display: swap`; hashed `/assets/*` served `immutable` for 1 year.
- No unused CSS, no legacy-JS polyfills, no bfcache blockers (`no-store`/`unload`), Lighthouse SEO/A11y = 100 on every page.

## Findings

### 1. Watch pages load the full YouTube player on page load (no facade) — High
- **Evidence:** `/watch/wL6bjqaUcd8` transfers 1,205 KB on mobile / 1,334 KB on desktop versus 80–380 KB for other templates; ≈1.1 MB comes from `youtube-nocookie.com` (`base.js` 480 KB, two `ytembeds` bundles 382 KB, `www-player.css` 59 KB) plus Roboto from `fonts.gstatic.com`. Mobile FCP/LCP is 2.12 s, the slowest of the tested pages; Best Practices drops to 96 (third-party cookie issue from the embed). The template in `src/archive.js:261` renders `<iframe class="player" src="https://www.youtube-nocookie.com/embed/…">` directly. Every `/watch/:id` URL (hundreds of pages) uses it.
- **Recommendation:** Reuse the homepage facade pattern (`src/main.jsx:268`): render a `<button>` with the `i.ytimg.com/vi_webp/{id}/hqdefault.webp` (or `sddefault`) thumbnail plus a play icon, swapping in the iframe with `?autoplay=1` on click. Keep `VideoObject` schema with `embedUrl` so video indexing is unaffected. Keep `<link rel="preconnect" href="https://www.youtube-nocookie.com">` (`src/archive.js:240`) and add `preconnect` to `https://i.ytimg.com`. Expected: ≈1 MB less per watch-page view and lower mobile FCP/LCP and TBT.

### 2. Meta Pixel adds ~280 KB and ~250–300 ms of main-thread blocking once consent is granted — Medium
- **Evidence:** `evidence/consent-tracking-impact.json`: after granting `marketing-consent`, `connect.facebook.net` transfers 278,752 bytes per page view; summed long-task time rises from ≈0 ms to ≈300 ms on the guide and from ≈175 ms to ≈433 ms on the homepage (4x CPU). Lighthouse runs without consent, so this cost is invisible in the scores. It is the main INP risk for opted-in visitors (on real phones, the long tasks overlap first interactions).
- **Recommendation:** In `src/tracking.js` (`loadMarketingTracking`), defer injection of `fbevents.js` (and `gtag.js`) until idle, e.g. `requestIdleCallback`, or `setTimeout` after the `load` event. Consider loading Meta only on pages that matter for ads attribution (homepage/landing pages) rather than on every guide. Alternatively, send `SkoolOutboundClicked`/PageView via Meta Conversions API server-side and drop the browser pixel.

### 3. No field (RUM) Core Web Vitals data — Medium
- **Evidence:** No CrUX API key is configured and the origin has no CrUX data available to this audit. `@vercel/speed-insights` is not a dependency (`package.json`). Vercel Web Analytics (`/_vercel/insights/script.js`) only loads on the homepage (React `<Analytics/>` in `src/main.jsx`) and video archive (`src/archive.js:161`), **not on guide pages (`public/guides/*.html`) or watch pages** (template in `src/archive.js` around line 236).
- **Recommendation:** Enable Vercel Speed Insights and add its script (`/_vercel/speed-insights/script.js`) to all templates: `index.html`/`src/main.jsx`, `src/archive.js` (archive + watch templates), and the guide HTML template (`public/guides/*.html` or its generator). Add the Web Analytics script to guide and watch pages too. Configure a Google API key so `pagespeed_check.py`/CrUX can report p75 field data in future audits.

### 4. Article/watch fonts discovered late, causing font-swap layout shift — Low
- **Evidence:** On guide and watch pages, the WOFF2 files are only referenced from `@font-face` inside `public/reading.css` (and `public/archive.css`), so they start downloading after the CSS is parsed. Lighthouse attributes CLS to "Web font loaded": watch mobile CLS 0.065 (`p.description`, `instrument-sans.woff2`), guide desktop CLS 0.021 (`archivo-black.woff2`, `instrument-sans.woff2`). Guide mobile LCP is text with 418 ms render delay. The homepage `index.html` already preloads its two key fonts. All values are still under the 0.1 "good" threshold.
- **Recommendation:** Add `<link rel="preload" href="/fonts/instrument-sans.woff2" as="font" type="font/woff2" crossorigin>` (and `archivo-black.woff2` for headings) to the guide template head (`public/guides/*.html`) and the watch/archive heads in `src/archive.js`. Optionally add metric-matched fallbacks (`size-adjust`/`ascent-override` on a local Arial/Helvetica `@font-face`) in `public/reading.css` to remove the swap shift entirely.

### 5. Topic-page LCP thumbnail lacks `fetchpriority` and a preconnect — Low
- **Evidence:** `/videos/n8n` mobile: LCP = first card thumbnail from `i.ytimg.com`, resource load duration 362 ms; Lighthouse `lcp-discovery-insight` fails "fetchpriority=high should be applied". The card markup in `src/archive.js:104` sets `loading="eager"` for the first card but no `fetchpriority`, and the archive template has no `preconnect` to `i.ytimg.com`.
- **Recommendation:** In `src/archive.js` `card()`, add `fetchpriority="high"` when `eager` is true; add `<link rel="preconnect" href="https://i.ytimg.com" crossorigin>` to the archive and watch heads.

### 6. Homepage main bundle carries ~37 KB unused JS; 117 ms TBT on mobile — Low
- **Evidence:** `assets/main-*.js` is 90 KB transferred, with 37.5 KB unused on first load; bootup 332 ms scripting on mobile (4x CPU), TBT 117 ms, max potential FID 300 ms. LCP element render delay is 194 ms (hydration).
- **Recommendation:** Code-split below-the-fold/interactive sections in `src/main.jsx` (e.g. booking/Cal, media kit, FAQ/accordion, video lists) with `React.lazy`/dynamic `import()` so first-load JS covers only the hero. Check `vite build --mode production` output with `rollup-plugin-visualizer` to confirm the largest modules.

### 7. Short cache lifetimes on unhashed CSS and images — Low
- **Evidence:** `vercel.json` sets `max-age=3600` for `/reading.css` and `/consent.css` (already versioned with `?v=` hashes), and `max-age=86400` for root/members/tools images. Lighthouse cache insight: 34 KB (home), 57–150 KB (watch, mainly YouTube-owned thumbnails, which can't be changed).
- **Recommendation:** Because `reading.css`/`consent.css` are referenced with a content hash query (`src/asset-version.js`), raise their `Cache-Control` in `vercel.json` to `public, max-age=31536000, immutable`. For images in `/` and `/members/`, either hash filenames or extend to ≥7 days with the existing `stale-while-revalidate`.

### 8. Homepage below-the-fold `<video>` poster loads eagerly — Low
- **Evidence:** `hero-video-poster.webp` (38.8 KB) is the second-largest image on the homepage first load. `src/main.jsx:576` uses `<video preload="none" loading="lazy" poster=…>`, but `loading` is not a valid attribute on `<video>`, so the poster is fetched immediately.
- **Recommendation:** Set `poster` only when the element nears the viewport (IntersectionObserver), or render an `<img loading="lazy">` facade that swaps to `<video>` on click.

### 9. No Speculation Rules for likely next navigations — Info
- **Evidence:** `preload_check.py` homepage score 75/100: no `<script type="speculationrules">`, no bfcache blockers, LCP preload correct.
- **Recommendation:** Add a conservative `speculationrules` block (`prefetch` with `eagerness: "moderate"`) for same-origin `/guides/*`, `/videos/*` and `/watch/*` links in `index.html`, the guide template, and `src/archive.js`. This makes guide→guide and archive→watch navigations near-instant.
