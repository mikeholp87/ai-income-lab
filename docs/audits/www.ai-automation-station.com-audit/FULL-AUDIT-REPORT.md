# Full site audit — October 7, 2026

Audited https://www.ai-automation-station.com and the corresponding local source. This is an audit and recommendation report; application code was not changed.

**Snapshot:** production measurements were captured around 08:59–09:04 UTC, with source revision `da3370d0578de944fd8261f890def440030094ad`. During report preparation, concurrent local edits appeared in `src/main.jsx`, `src/styles.css`, and a new WebP poster. Those edits add responsive/lazy images and remove some hero entry animations, so they may already address parts of finding 3. They were not created or verified by this audit. Source line references below refer to the audited snapshot and can shift in the working tree.

**Recommendation: fix the tracking-token validation and obscured Subscribe button first, then improve mobile performance and offer clarity.** The site has sound technical SEO, working navigation destinations, and excellent desktop performance. Its main weaknesses are visible only through manual inspection or source review, despite automated accessibility and SEO scores of 100.

## Scope and evidence

- Public homepage, community campaign variation, video archive and pagination, privacy and terms, robots, sitemap, llms.txt, redirects, invalid URLs, and YouTube feed.
- Full archive crawl: all 15 pages returned 200 with correct self-canonicals; 213 cards represented 213 unique videos. See [crawl evidence](evidence/archive-crawl.json).
- Live browser inspection at 1440 × 900, 1366 × 768, 390 × 844, and 320 × 740. Mobile archive and legal pages checked at 390px.
- Lighthouse 12.6.1 against production: two mobile homepage runs, one desktop homepage run, and one mobile archive run. Default simulated mobile throttling; isolated fresh Lighthouse browser profiles. No analytics consent was granted.
- Local source review of rendering, interaction, tracking, booking, archive, feed and pixel endpoints. Production credentials and private account data were not inspected.
- Existing tests: all five test files passed. Production build and prerender passed. Local asset hashes match those observed live.
- Dependency advisory check: one high-severity transitive advisory, discussed below.

Raw Lighthouse JSON and a compact summary are in [evidence/](evidence/). Screenshots are in [screenshots/](screenshots/). No aggregate SEO health score is assigned: Lighthouse scores measure their named categories, and this audit did not measure rankings, traffic, or actual index coverage.

## Measurements

| Page / device | Performance | Accessibility | Best practices | SEO | LCP | Blocking time | CLS |
|---|---:|---:|---:|---:|---:|---:|---:|
| Homepage, mobile run 1 | 75 | 100 | 100 | 100 | 2.6 s | 760 ms | 0 |
| Homepage, mobile repeat | 78 | 100 | 100 | 100 | 2.8 s | 610 ms | 0 |
| Homepage, desktop | 100 | 100 | 100 | 100 | 0.6 s | 10 ms | 0 |
| Video archive, mobile | 100 | 100 | 100 | 100 | 1.7 s | 10 ms | 0.001 |

The repeat ran after the build and tests had finished because the first run could have had local CPU contention. Both mobile homepage runs show room for improvement. These are local lab measurements, not Google field data or a directly comparable repeat of a previous PageSpeed score. INP was not measured. Lighthouse results vary with environment; see [Chrome's scoring explanation](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring).

## Fix first

### 1. High — validate email tokens before recording an open

[src/open-pixel.js:173](/home/mikeh/Projects/ai-income-lab/src/open-pixel.js:173) inserts an Opens record before verifying that the token belongs to a Send. Unknown prefixes fall back to the Skool route at line 46. A local mock confirmed an invented token produces `POST Opens → GET Sends`, with an empty Sends result, yet reports that the open was logged.

If production Airtable credentials are configured, arbitrary requests can pollute records and consume API/storage capacity. Production configuration and exploitation were not tested. No production pixel requests were made.

Evidence: [mock output](evidence/pixel-proof.json) and [runnable reproduction](evidence/pixel-check.mjs). The reproduction asserts the current problematic behavior and uses mocked fetch throughout; it is not a regression test for the proposed fix.

**Suggestion:** look up and validate the send before inserting the open. For unknown tokens, return the transparent GIF without an Airtable write. Consider rate limiting and token signing if abuse persists. Preserve the endpoint's graceful GIF response. Add a regression check that an unknown token never causes a write.

### 2. High — keep Subscribe clear of the consent bar

At 1366 × 768, the Subscribe button spans y=690–742 while the fixed consent bar begins at y=699: roughly 43px of its 52px height is covered, including its label. At 320 × 740, the button begins at y=715 and the banner begins at y=577; the first-view portion of the button is obscured. At 390 × 844, Subscribe only just clears the banner. The action remains reachable after scrolling, but first-time visitors lose the primary action in common first views.

Evidence: [laptop](screenshots/laptop.png), [320px phone](screenshots/mobile-320.png), [390px phone](screenshots/mobile.png). Sources: [src/styles.css:61](/home/mikeh/Projects/ai-income-lab/src/styles.css:61), [src/styles.css:78](/home/mikeh/Projects/ai-income-lab/src/styles.css:78), and `.consent-banner` in that stylesheet.

**Suggestion:** shorten the hero paragraph and reduce its vertical spacing for shorter screens; reduce the consent bar's footprint while retaining clear equal-access choices. Verify the entire CTA and keyboard focus remain unobscured with the banner present at all four tested sizes. Adding padding only at the page bottom will not solve first-view overlap.

### 3. High — investigate mobile rendering and main-thread work

The mobile repeat measured 610 ms total blocking time, about 1.9 s in style/layout and 1.1 s in script evaluation. The initial client bundle is approximately 71 kB gzipped. The repeat reports long tasks associated with the document and client bundle. The page's LCP element was hero paragraph text, not a large above-the-fold image.

**Suggestion:** profile a mobile trace around initial layout, font arrival, hydration, and feed replacement. Compare critical hero text rendered immediately with the current entry animations. Test preloading only the fonts used in the first view, and reduce unnecessary initial layout work. These are investigation targets, not proven causal fixes; this audit did not alter the site for an A/B measurement.

Secondary savings: the featured thumbnail downloads a 1280 × 720 image even on phones, the community poster is about 119 kB, and member avatars load eagerly far below the fold. Use responsive thumbnails, a smaller modern-format poster, and lazy avatars. The first run estimated approximately 312 KiB of image-delivery savings; that estimate is not a guaranteed LCP improvement. The YouTube image cache policy is third-party controlled.

Sources: [src/main.jsx:239](/home/mikeh/Projects/ai-income-lab/src/main.jsx:239), [src/main.jsx:318](/home/mikeh/Projects/ai-income-lab/src/main.jsx:318), [src/main.jsx:477](/home/mikeh/Projects/ai-income-lab/src/main.jsx:477), [src/fonts.css](/home/mikeh/Projects/ai-income-lab/src/fonts.css). Avoid a framework rewrite based on this evidence.

### 4. Medium — make consent wording match the tracking enabled

The banner says “Allow analytics,” but [src/tracking.js:24](/home/mikeh/Projects/ai-income-lab/src/tracking.js:24) loads both Google Analytics and Meta Pixel. Regranting consent explicitly grants advertising storage, user data, and personalization. The privacy policy names Meta, but the immediate choice does not describe marketing tracking. Vercel Analytics runs separately regardless of this preference and is disclosed in the policy.

**Suggestion:** explicitly name analytics and marketing measurement in the choice, or give separate controls if these purposes need separate choices. Keep the policy and behavior aligned. This is a clarity finding based on code, not a legal compliance ruling. Fresh-session inspection found no Google or Meta script loaded before a choice.

### 5. Medium — patch the source-map dependency advisory

`npm audit --omit=dev --json` reported one high advisory for `source-map-js@1.2.1`, reached through `vite → postcss`. The [reviewed advisory](https://github.com/advisories/GHSA-68fv-2mgg-jv7q) identifies a denial of service from malicious indexed source maps and lists 1.2.2 as patched.

**Suggestion:** update the resolved transitive version to 1.2.2 or later and rerun build/tests. This is a build-tool dependency in this project; the audit did not demonstrate an exploitable public request path. “High” is the advisory severity, not a claim that visitors can compromise this static site.

## Usability and accessibility

### 6. Medium — stop the decorative cursors or provide a pause control

Cursor labels drift indefinitely over the headline and paragraph, sometimes obscuring letters. [src/styles.css:95](/home/mikeh/Projects/ai-income-lab/src/styles.css:95) uses 28–34 second infinite loops. Reduced-motion users get a static alternative, which is good, but other users have no on-page pause/hide control.

**Suggestion:** the smallest fix is a brief animation that stops within five seconds, or static tags positioned away from text. Retain reduced-motion support. If continuous motion is intentional, provide a pause/hide control. [WCAG's pause/stop/hide criterion](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html) covers automatically moving content continuing alongside other content. Lighthouse 100 does not establish conformance to this manual criterion.

Also disable `html { scroll-behavior: smooth }` for reduced-motion preferences; the current reduction only addresses selected animations.

### 7. Medium — close the mobile menu after a selection

Clicking Contact correctly sets `#work-together` and places the section about 88px below the top. However, the native `<details>` remains open and overlays the section heading. Confirmed in the live DOM and [mobile Contact screenshot](screenshots/mobile-contact.png).

**Suggestion:** close the details after a navigation selection and on Escape. Retain native summary keyboard interaction. Source: [src/main.jsx:392](/home/mikeh/Projects/ai-income-lab/src/main.jsx:392).

### 8. Medium — make the first screen demonstrate the work

At 1366 × 768, the first video begins about 1,083px down the page; the first screen is dominated by the headline and a five-line paragraph. At 390px the same paragraph takes seven lines. This is an editorial opportunity, not a broken feature.

**Suggestion:** shorten the introduction to two sentences and move a real video preview higher. Keep the existing visual identity; a full redesign is unnecessary. Test an outcome such as video-play or subscription-click rate before claiming a conversion gain. Sources: [src/main.jsx:417](/home/mikeh/Projects/ai-income-lab/src/main.jsx:417), [src/styles.css:61](/home/mikeh/Projects/ai-income-lab/src/styles.css:61).

**Verified strengths:** no horizontal overflow at the tested homepage widths; archive/legal pages also fit 390px. The skip link appears on Tab and focuses `#main-content` on Enter. Images have alt attributes and dimensions, icon links have accessible names, FAQ uses native details, the community video has a caption track, and focus styles exist. No homepage JavaScript errors appeared during the inspected session. A full screen-reader or real-device audit was not performed.

## Content, conversion, and measurement

### 9. Medium — explain why someone should choose Premium

The $49 plan's only distinction from the $29 plan is “advanced training.” [src/main.jsx:115](/home/mikeh/Projects/ai-income-lab/src/main.jsx:115) does not name a course, workflow, or example that makes the $20 upgrade tangible.

**Suggestion:** name the actual exclusive training, add one real preview, and describe VIP coaching format and availability. One permissioned member build example would provide stronger evidence than avatars and a member count alone. Do not invent outcomes or revenue claims.

### 10. Medium — reconcile actual conversions across destinations

[src/main.jsx:286](/home/mikeh/Projects/ai-income-lab/src/main.jsx:286) records `Call Booked` through the desktop inline widget. Phones open Cal.com directly, so that listener cannot observe their completion. Skool tracking records outbound interest, not a purchase. An external integration might exist outside this repository.

**Suggestion:** compare actual Cal.com bookings and Skool purchases with campaign traffic, using an existing integration or periodic reconciliation before building more tracking. Keep outbound clicks and completed conversions separate. Desktop calendar rendering and available slots were verified; no booking or purchase was submitted.

### 11. Medium — add a clear support route

Contact leads to sponsorship/collaboration booking. Privacy and terms point to the public Skool About page for questions. That leaves a visitor with a billing, privacy, or membership question without a clear public support route.

**Suggestion:** add a support email or accessible contact destination, and label sponsorship booking specifically. Sources: [src/main.jsx:528](/home/mikeh/Projects/ai-income-lab/src/main.jsx:528), [public/privacy.html:2](/home/mikeh/Projects/ai-income-lab/public/privacy.html:2), [public/terms.html:2](/home/mikeh/Projects/ai-income-lab/public/terms.html:2).

### 12. Low — place the trial condition beside its CTA

TubeAnalytics requires payment details for its seven-day trial. The FAQ states this, but the product card does not. Add “Payment details required” beside the trial CTA to reduce surprise. Sources: [src/main.jsx:90](/home/mikeh/Projects/ai-income-lab/src/main.jsx:90), [src/main.jsx:133](/home/mikeh/Projects/ai-income-lab/src/main.jsx:133).

**Offer verification:** TubeAnalytics and VisiScan public pricing agrees with the homepage. Product and listed demo destinations returned 200. Cached Skool copy appeared to group coaching/software deals with a $29 offer, whereas this page reserves them for VIP; this is an **unverified consistency check**, not a confirmed live defect. Compare actual Skool About/checkout copy before editing prices or promises.

## Search visibility and technical SEO

### 13. Medium — include a cached video snapshot in homepage HTML

The homepage prerenders useful static content, but initial HTML has no YouTube watch links. Its seven latest videos arrive after hydration via `/api/youtube`. The archive already offers crawlable video links, so the videos are not completely hidden from crawlers.

**Suggestion:** consider providing a small cached latest-video snapshot during prerender and refreshing it client-side. This benefits non-JavaScript readers and reduces the loading-placeholder phase. Sources: [src/main.jsx:144](/home/mikeh/Projects/ai-income-lab/src/main.jsx:144), [scripts/prerender.js:13](/home/mikeh/Projects/ai-income-lab/scripts/prerender.js:13). See [Google's JavaScript SEO guidance](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics).

### 14. Opportunity — add a few useful entry points by task

The archive lists 213 long-form videos chronologically across 15 pages. A newcomer cannot readily distinguish the best first build for Claude Code, Codex, or n8n.

**Suggestion:** begin with a short “Start here” collection and a few substantial build guides containing prerequisites, commands, costs, screenshots, resources, and verified results. Dedicated pages can include appropriate video structured data once the visible content supports it. Avoid hundreds of thin transcript pages. Source: [src/archive.js:21](/home/mikeh/Projects/ai-income-lab/src/archive.js:21); [Google's video guidance](https://developers.google.com/search/docs/appearance/video).

**Technical passes:** HTTPS and apex-to-www redirect work. Homepage, archive, legal pages, robots, sitemap, llms.txt, and feed return 200. `/videos/1` redirects to `/videos`; invalid/out-of-range archive routes return 404. Homepage fragment targets exist. Canonicals, title/description and social metadata are present. Person/WebSite JSON-LD parses. Archive text is escaped and pagination is crawlable. Robots permits crawling. The four sitemap entries cover the primary page types; linked archive pagination remains discoverable without listing every page in the sitemap.

No LocalBusiness schema or Google Business Profile recommendation is warranted for this creator/product hub. `llms.txt` is consistent with the site's offer, but its presence alone does not establish AI visibility. Search Console, backlinks, rankings, and real traffic were not measured.

## Lower-priority hardening

- **CSP:** existing responses have HSTS, nosniff, frame denial, referrer policy, permissions policy, and COOP. Consider a report-only Content Security Policy first, accounting for inline scripts, Cal.com, YouTube, Google, and Meta. No XSS was demonstrated. [vercel.json:2](/home/mikeh/Projects/ai-income-lab/vercel.json:2).
- **404 experience:** nonexistent paths correctly return 404, but use Vercel's unbranded error response. A small 404 page with Home and Videos links would provide a better recovery path.
- **Metadata upkeep:** update sitemap lastmod only when the corresponding page meaningfully changes; the homepage/archive entries still say October 6. This is low priority and not an indexing blocker.

## Limits

This audit covers public behavior and the local implementation, not authenticated dashboards, payment completion, real booking submission, deployment settings, or a penetration test. Automated accessibility scores do not replace assistive-technology testing. No production email-tracking requests were sent. No conversion improvement is claimed without outcome data.

Automatic approval review rejected a consent-banner click because it interpreted it as enabling marketing tracking; consent behavior was reviewed from source and existing tests instead. It also rejected granting the browser connector access to Skool because that could expose an existing private session. Public Skool requests returned 403, so live checkout/offer matching remains unverified. The site's public inline Cal.com widget was successfully inspected in the isolated audit browser.

See [ACTION-PLAN.md](ACTION-PLAN.md) for the recommended order and acceptance checks. The Markdown report and evidence can also be exported to PDF if needed.
