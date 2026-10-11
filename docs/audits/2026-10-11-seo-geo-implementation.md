# SEO/GEO implementation — October 11, 2026

Live site: https://www.ai-automation-station.com/

Implemented the audit's site changes after fast-forwarding the checkout to production's source revision, `3b642d0`. Existing guide navigation, comparison content, chapter navigation, API fixes, and email integrations were preserved. The release was built and checked on Vercel before promotion.

| Audit action | Implemented result |
|---|---|
| Confirm indexing | Read current Google URL inspections, performance, and sitemap state. Registered and verified the site in Bing, submitted both sitemaps once, and submitted 11 materially improved URLs. Google browser requests are recorded below. |
| Five editorial companions | Added caption-checked Make, VAPI, Google AI Studio, Emergent, and GrokBot companions. Each states the observed result, failures or unverified features, checked date, and a useful next task. Substantive companions increased from 10 to 15 of 215 watch pages. |
| Source the comparison | Linked current vendor authentication, permissions, and CLI documentation. Checked CLI flags against Claude Code 2.1.296 and codex-cli 0.162.1. Added the local API exercise with verified 401/404/200 output and the proposed malformed-JSON 400 check. |
| Improve titles | Added nine accurate search titles for priority recordings. The Make guide's title and heading now describe filtering approved Google Sheets requests. Original video names remain visible with the recording. |
| Guide images | Added five original 1200×630 WebP process diagrams, visible captions and alt text, matching Open Graph images, and Article image properties. |
| Entity clarity | Aligned the homepage, start page, Organization description, and llms.txt: Mike publishes AI Automation Station; AI Income Lab is the paid learning community on Skool. |
| Owner-controlled discovery | Confirmed the public GitHub repository and YouTube's existing site link. Added guide-hub and comparison links to the public README. Checked TubeAnalytics and VisiScan about pages; neither currently links here. |
| Fresh performance | Ran comparable mobile Lighthouse checks on home, a guide, and two watch pages. Fixed a measured mobile header font swap in the shared watch template. The initial-HTML video player and chapter behavior remain intact. |
| Accurate dates | Updated visible guide modification dates, Article dateModified, and the sitemap dates for materially changed static pages. Unchanged pages retain their dates; video publication dates were preserved. |

Also excluded local reports, documentation, environment files, and generated build output from CLI deployments. The inspected source upload fell from 70.4 MB to 4.2 MB without excluding application source or public assets.

## Verification

- Lint, all 13 test files, production build, and whitespace checks pass. Existing companion consistency tests now cover the five additions.
- The post-release public crawl checked 241 sitemap pages and 454 linked assets: all passed. No detected duplicate title/description, canonical mismatch, noindex, missing H1/alt, JSON-LD parse error, broken internal page, or orphan page.
- The old crawler's 1,875 timestamp-fragment flags remain false positives. A real mobile chapter click selected `#t=184` and changed the embedded player to `start=184`. The pages had no horizontal overflow at 390 px.
- All five built diagrams have matching schema references, actual asset files, declared dimensions, and visible captions. Schema.org's public validator reported zero errors and warnings for the sampled Make Article and VAPI VideoObject/BreadcrumbList.
- Checked 27 external reference URLs: 26 returned 200. OpenAI's official key-safety Help Center URL returned a crawler-facing 403; this does not establish a missing article.

## Current Google evidence

Read October 11 from the verified `https://www.ai-automation-station.com/` property. These are nine individual URL inspections, not an overall site index count.

| Page | Index result | Last crawl, UTC |
|---|---|---|
| Homepage | Submitted and indexed; selected canonical matches | October 8, 16:26:51 |
| Claude Code vs Codex | Unknown to Google | Not reported |
| Codex workflow | Submitted and indexed; selected canonical matches | October 10, 04:23:27 |
| Make Google Sheets | Submitted and indexed; selected canonical matches | October 9, 21:34:02 |
| First API request | Submitted and indexed; selected canonical matches | October 10, 04:23:27 |
| Watch `vauqktcB6ak` | Discovered, currently not indexed | Not reported |
| Watch `_8qzOkIWMSk` | Discovered, currently not indexed | Not reported |
| Watch `G8u1-hKEqig` | Discovered, currently not indexed | Not reported |
| Watch `ys5tJuTFCEo` | Discovered, currently not indexed | Not reported |

Google read the video sitemap on October 10 at 04:45:53 UTC and the page sitemap at 04:50:18 UTC. Both report zero errors and warnings. No discovered counts were returned by the API.

The finalized September 11–October 8 web-search window has 31 impressions and zero clicks. The bounded query report returns four named queries with six impressions; it does not reveal every query contributing to the total. Reporting timezone: America/Los_Angeles. Do not attribute these pre-release numbers to today's changes.

## Current Bing evidence

The existing Bing connection initially contained no registration for this site. Added `https://www.ai-automation-station.com/`, published its ownership meta tag, and confirmed `VerifySite` returned true. The first API read showed pending processing. A subsequent signed-in Chrome check confirmed both sitemaps succeeded and were crawled October 11: 215 URLs discovered in the video sitemap and 26 in the page sitemap. Discovery counts do not establish how many pages are indexed.

Submitted the six updated guides and five new companions in one batch; Bing accepted all 11 for submission. Acceptance is not a claim that indexing has completed. The account had a daily allowance of 100 before the batch.

Read the same nine-page sample. Eight had recorded discovery/crawl timestamps; OpenCode watch `_8qzOkIWMSk` returned unset dates. Bing's API returned zero HTTP status and document size for most samples, so these fields are not presented as verified current page fetches or an overall indexed-page count. [Microsoft API reference](https://learn.microsoft.com/en-us/bingwebmaster/).

Bing's signed-in AI Performance report, covering July 11–October 10, displayed zero reported citations/cited pages and no query rows. This is a sampled Microsoft Copilots and Partners report for the newly registered property, not evidence of zero citations across every AI engine.

## Mobile lab results

Lighthouse CLI, Chrome 150, default simulated mobile throttling, cold browser storage. These are lab measurements, not real-user Core Web Vitals or a controlled comparison with the October 8 audit's different environment.

| Page / run | Performance | LCP | TBT | CLS |
|---|---:|---:|---:|---:|
| Homepage | 97 | 2.2 s | 10 ms | 0 |
| Make guide | 100 | 1.0 s | 0 ms | 0 |
| GrokBot watch, before font fix | 84 | 2.0 s | 20 ms | 0.278 |
| Make course watch, before font fix | 84 | 2.0 s | 0 ms | 0.278 |
| GrokBot watch, first retest | 59 | 8.8 s | 0 ms | 0.045 |
| GrokBot watch, repeat retest | 98 | 1.9 s | 0 ms | 0 |
| Make course watch, retest | 98 | 1.9 s | 0 ms | 0 |

Accessibility and SEO score 100 throughout. Best practices score 100 on home/guide and 96 on watch pages because Chrome reports a cookie issue inside the YouTube-nocookie iframe. The watch header now uses a system font, removing the measured Archivo font swap. The slow GrokBot retest had an approximately one-second wait for the small render-blocking reading stylesheet; the repeat was healthy. Retain the variance instead of reporting only the best run. No current real-user CWV pass is claimed.

## Evidence and follow-up

Detailed machine evidence is in the ignored `jev-seo-reports/ai-automation-station.com-2026-10-11/seo-geo-audit/` folder: `gsc-*.json`, sanitized `seo-geo-bing-*.json`, Lighthouse reports, `new-references.json`, and `post-release/`. Credentials and browser profile data are excluded from the repository and deployment.

Recheck Google URL status and Bing sitemap processing around October 15. Compare complete 28-day traffic periods over the next four to six weeks. Existing consent-aware guide/watch events can show outbound interest; paid memberships require membership records. AI citation frequency and referral lift remain unmeasured; use the audit's fixed questions for subsequent observations.

## Chrome completion record

Used the owner's signed-in Chrome session on October 11. Google confirmed **Indexing requested** and addition to a priority crawl queue for all six selected canonical URLs:

| URL | Status before the accepted request |
|---|---|
| `/guides/claude-code-vs-codex.html` | Unknown to Google |
| `/watch/Lifl4PC2_3M` | Unknown to Google |
| `/watch/9kHdIiobKMA` | Discovered, currently not indexed |
| `/watch/Ax-v4H9xv50` | Unknown to Google |
| `/watch/MYoA3___zYU` | Discovered, currently not indexed |
| `/watch/ys5tJuTFCEo` | Discovered, currently not indexed |

No duplicate requests were made for these canonical URLs. The page aggregate still reports one indexed page with an October 4 last-update date; it lags the newer individual inspections above. The video aggregate, updated October 8, reports zero indexed videos and one exclusion: the homepage's `hero-video.mp4` background clip is not on a watch page. That report does not establish an exclusion of a tutorial watch page. Current Manual actions and Security issues reports both show **No issues detected**.

Google's smartphone Rich Results Test crawled both samples successfully. The Make guide has one valid Article with four noncritical warnings about the date-only `datePublished` and `dateModified` values and their absent timezones. The available evidence establishes calendar dates, so precise publication times were not invented to suppress optional warnings. The VAPI page has two valid items, VideoObject and BreadcrumbList, without reported warnings. These tests establish markup eligibility, not indexing or a guaranteed rich-result display.

The final production deployment is `dpl_2AJtmuGycRbK3pN4bnmoH4muYJkr`, [ai-income-3sniym78y-ai-visibility-tool.vercel.app](https://ai-income-3sniym78y-ai-visibility-tool.vercel.app), promoted and verified through the canonical domain. Chrome confirmation screenshots are saved with the local ignored audit evidence. Google indexing confirmation and Bing's successful sitemap results were left open in Chrome.

Skipped: outreach, unrelated product-site publishing, blanket companion generation, paid ranking refreshes, and a new analytics system. Real-user CWV and cross-engine citation lift remain unmeasured. Speed still varies by run; submissions do not guarantee indexing or citations.
