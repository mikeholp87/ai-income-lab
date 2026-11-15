# AI Automation Station: full site audit

November 9, 2026 · https://www.ai-automation-station.com/

The site's technical foundations are strong. The next useful investment is completing the beginner journey, keeping instructional content accurate, and measuring paid outcomes. This review found no critical crawl blocker or confirmed exploitable vulnerability. It does not establish penetration-test clearance, Google indexation, or accessibility conformance.

Audit scope: live technical crawl, representative content/conversion review, mobile and desktop browser checks, three mobile Lighthouse tests, dependency advisories, and focused source review of subscription, contact, webhook and tracking boundaries. No application code, production data, checkout, subscription or deployment was changed. Source reference: `e5073c9245671628553af8361ea81838418c3f8d`; live responses were collected separately. The business is a free tutorial/video publication with a paid external learning community, owned software and sponsorship services.

**Later follow-up:** code changes and local verification are recorded in [IMPLEMENTATION.md](IMPLEMENTATION.md). After the owner approved private-account access, [SEARCH-CONSOLE-FOLLOWUP.md](SEARCH-CONSOLE-FOLLOWUP.md) added the current search/indexing baseline. The original audit's Search Console access limitations below describe the initial collection, before that approval. The fixes were subsequently deployed as `7b34773`; see [release verification](RELEASE.md).

## Results

| Area | Observed result |
|---|---|
| Crawl | 323 sitemap pages, all HTTP 200: 63 guides, 227 watch pages, 26 archive/topic pages and 7 other pages |
| Metadata | No missing/duplicate titles or descriptions; no canonical mismatches, unexpected noindex or H1-count issues in sitemap pages |
| Discovery | All sitemap pages reachable within three captured HTML-link hops; no broken captured section fragments |
| Structured data | Server JSON-LD parses on all crawled pages; all 227 watch pages have VideoObject and an iframe; no missing required video fields detected by collector |
| Images/assets | No missing alt attributes or dimensions detected; guide heroes are not lazy-loaded. All 407 referenced first-party assets checked returned 200 |
| Routes | Preferred-host redirects and tested real-404 responses behave correctly; HTTP apex takes two hops |
| Browser | Homepage fits 320px and 390px; sampled guide, search and watch pages fit 390px. Desktop checked at 1440px. Light/dark homepage inspected |
| Accessibility checks | Three Lighthouse samples score 100. Manual homepage skip link moves focus to content; menu Escape closes and returns focus |
| Consent | No GA/Meta/Clarity resource URLs detected after Decline in the fresh homepage session; this is a bounded browser check |
| Projects | Nine cards rendered; “View all on GitHub” follows the list and links to the correct profile |
| Dependencies | `npm audit --ignore-scripts --json` reported zero known advisories across 327 dependency entries |

These are technical observations rather than evidence that every page ranks, every image is meaningful to a screen reader, or every schema block qualifies for rich results. `robots.txt` allows crawling and advertises both sitemaps; `llms.txt` is available. The optional `llms-full.txt` is absent, which is not a defect or a reason to create one.

## Mobile performance

Lighthouse 12.6.1, simulated mobile throttling, 412×823 emulation, one run per page on November 9. Scores are tool results, not a combined site-health grade.

| Page | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT |
|---|---:|---:|---:|---:|---:|---:|---:|
| Homepage | 97 | 100 | 100 | 100 | 1.86s | 0 | 112ms |
| 9Router guide | 99 | 100 | 100 | 100 | 1.70s | 0 | 0ms |
| Herdr desktop watch | 100 | 100 | 96 | 100 | 1.24s | 0 | 0ms |

The watch-page best-practices deduction concerns a cookie issue from the third-party YouTube privacy-enhanced embed. Its presence alone does not establish an unlawful cookie or a first-party defect. The homepage back/forward-cache diagnostic points to the Cal.com iframe's service worker and is classified “not actionable” by Lighthouse.

Field INP was not measured. Google assesses Core Web Vitals at the 75th percentile of real visits; good thresholds are LCP ≤2.5s, INP ≤200ms, CLS ≤0.1. These lab samples cannot establish a field pass. [Google Web Vitals guidance](https://web.dev/articles/vitals).

## Improvements in priority order

### 1. Validate the Make starter kit from import to result

**High onboarding priority; moderate effort. Known validation gap.** The homepage promotes this first build, while the [download section](https://www.ai-automation-station.com/guides/make-first-automation.html#starter-kit) accurately says its blueprint has not been run in a live Make account. A working download does not demonstrate a working beginner exercise.

Use an owner-controlled test account and fictional sheet data, scheduling off. Record import success, approved-row output, rejected-row exclusion, repeat-run behavior, and a new approved row. Publish the dated result, relevant module versions and permitted screenshots. Keep the manual fallback. Only remove the unverified note after the tests pass; do not promise exactly-once delivery based on this exercise.

### 2. Make welcome email failures visible and recoverable

**Medium priority; small operational fix or moderate durable fix. Source-defined failure path.** `api/subscribe.js:210` sends welcome mail after contact creation. A failed send returns `{ok:true,welcomeSent:false}`, but the confirmation redirect ignores that flag. A later confirmation of the active contact skips welcome delivery, so retrying the link does not recover the missing welcome.

Start with an alert and a documented manual replay. If delivery volume warrants it, store delivery status and use bounded retries with provider idempotency keys. Acceptance: simulate a failed send with dummy fixtures, recover once, and prove retry does not duplicate delivery. This review did not establish a production delivery incident.

Also resolve the privacy-copy mismatch: [Privacy](https://www.ai-automation-station.com/privacy.html) promises an unsubscribe link in every email; the source welcome template instead says to reply “unsubscribe.” Scope the promise to the correct email classes and supply a direct opt-out in welcome mail where appropriate. Verify delivered mail, since provider-side additions were not observed.

### 3. Add direct source links to the three-project demonstration

**Medium priority; small effort. Confirmed journey gap.** [The Tasky, Restic-Studio and Luma-Launcher watch page](https://www.ai-automation-station.com/watch/V0PoYhOprBI) encourages inspecting project source but has no GitHub links in its server HTML. Tool names render as text.

Reuse the shared tool-link mapping to link [Tasky](https://github.com/mikeholp87/Tasky), [Restic-Studio](https://github.com/mikeholp87/Restic-Studio) and [Luma-Launcher](https://github.com/mikeholp87/Luma-Launcher). Acceptance: each demonstrated project's instructions are one click away from its watch page. No new project directory is needed.

### 4. Correct content that drifted behind the implementation

**Medium priority; small effort. Confirmed mismatches.**

- [YouTube feed tutorial](https://www.ai-automation-station.com/guides/youtube-feed.html): update its checks for `youtube.com/watch?v=` links to distinguish internal `/watch/:id` links from the external non-embeddable fallback. Separate homepage click-to-play behavior from dedicated watch pages. Add a dated follow-up to the historical case study explaining the later unsubscribe mitigation and its remaining limits.
- [n8n topic introduction](https://www.ai-automation-station.com/videos/n8n): use “source-available” consistently with the site's alternatives guide and the vendor's fair-code licensing explanation. This is an accuracy correction; no search penalty is inferred.
- [Newest Windows Herdr watch page](https://www.ai-automation-station.com/watch/YYZSR1p32EQ): review the recording and reuse the existing factual-summary pattern. A candidate website title is “Herdr on Windows: Installation, Themes, Mods and Usage.” Clarify that Herdr manages agent workspaces and link the desktop companion guide. Verify wording against the recording before publishing.

Yesterday's watch-player, internal-link and older watch-summary recommendations have already been implemented. All 227 watch pages now expose an iframe without a click, matching Google's discovery guidance. Google detection itself still needs URL Inspection. [Google video SEO guidance](https://developers.google.com/search/docs/appearance/video).

### 5. Improve search discovery and Make.com relevance

**Medium UX opportunity; small to moderate effort.** The homepage's main/mobile navigation has no Search destination, although the existing search page works. In the tested `make` query, the first result is “Codex tutorial: make and verify a small code change”; the Make.com exercise follows it. The current substring/title-hit ranking explains this ordering.

Add a link to the existing search page where visitors browse free content. If search usage warrants a ranking adjustment, prioritize an exact tool/entity match such as Make.com over the ordinary verb “make,” using the existing index. Check `make`, `n8n`, `Claude Code`, an empty query and a no-result query. In this audit `make` returned 37 results, Show more expanded 8 to 16, and the empty-result message was helpful. This is a relevance opportunity, not a broken search service.

### 6. Establish a current search-to-paid-outcome baseline

**High measurement priority; moderate effort.** Use the existing conversion reconciliation workflow before making a large homepage redesign or more title changes. Compare the latest complete 28 days with the preceding period: landing/query impressions and clicks, starter-kit downloads, confirmed subscriptions, outbound Skool interest, verified new paid memberships and refunds. Keep unknown attribution unknown and consented events separate from total visits. Outbound interest is not a purchase.

Fresh Search Console data could not be retrieved: local credential files exist, but the available Python runtimes lack required helper dependencies. The scoped Vercel custom-events query returned `404: Web Analytics not found`; this is a data-access result, not evidence that the site has no visitors or tracking. Keyless PageSpeed field-data requests returned 429. No current traffic, CTR, ranking, revenue or backlink totals are claimed.

### 7. Resolve bounded subscription-state risks with fixtures

**Medium follow-up priority; provider behavior needs validation.** The 15-minute reactivation window in `api/subscribe.js:180` rejects older confirmation links for opted-out contacts. A recently issued link can still predate a later opt-out within that window. If the desired invariant is “an earlier link must never reverse a later opt-out,” store a state version/timestamp or consumed confirmation claim. Verify with dummy state transitions.

The lookup-then-create path may also allow duplicate welcome/owner notifications when two confirmations run concurrently and the provider accepts both creates. Existing mocked-409 coverage does not resolve that scenario. Validate two successful concurrent fixture requests before choosing an atomic claim/idempotency fix. Neither behavior was tested against real recipients.

### 8. Keep performance work small and evidence-led

**Low priority.** Lighthouse estimates about 71KiB of responsive-image savings on the 9Router guide, mostly its video thumbnail. Check practical mobile-width variants in the existing image pipeline before adding formats. The homepage run estimates about 40KiB of unused main-bundle JavaScript during that visit; some supports later interactions. Profile an actual interaction before splitting bundles. No loading-time improvement is promised from these estimates.

Memory-only API rate limits reset across cold starts/instances. Check provider/platform spending controls first; adopt a shared counter when abuse or spend warrants it. This is an operational boundary, not proof of a current attack. Avoid infrastructure changes solely to improve an audit score.

## Evidence and limits

Evidence: [technical summary](technical/summary.json), [schema/image/route summary](technical/extended-summary.json), [asset probes](technical/asset-probes.json), [route probes](technical/route-probes.json), [content findings](findings/content.md), [homepage browser checks](browser-home.txt), [reading/search checks](browser-reading-final.txt), [keyboard/theme checks](browser-extra.txt), [Lighthouse JSON](performance/), and [screenshots](screenshots/).

An initial search automation attempt typed before the index initialized and timed out waiting for a result label. The completed URL-query and ready-state interaction checks succeeded; that first timeout is retained in `browser-reading.txt` and is not reported as a confirmed production defect.

This is a comprehensive website review with sampled manual journeys and focused security source coverage. It excludes production form submissions, delivered email inspection, checkout completion, private course verification, live Make import, abuse testing, exhaustive external-link checks, every guide's factual claims, full screen-reader testing, and real-user field measurements. Automated accessibility 100 does not establish WCAG conformance. Report artifacts only were added; no application fixes were deployed.
