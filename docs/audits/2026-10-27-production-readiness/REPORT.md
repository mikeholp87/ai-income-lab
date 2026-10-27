# Production readiness audit — October 27, 2026

Fixes are implemented in the working tree and verified locally. The production site was inspected read-only. These changes have **not been deployed or committed**.

## System and scope

The repository is a public education and membership marketing site, built with React 19.2.8, Vite 8, JavaScript, plain CSS, and Vercel functions. The main conversion is joining AI Income Lab on Skool. Free visitors can read guides, browse videos and watch tutorials. Sponsors can book a Cal.com call.

| Surface | Implementation / boundary |
| --- | --- |
| Homepage | `src/main.jsx`, prerendered by `scripts/prerender.js`; hydrated React interactions |
| Guides and learning paths | Static HTML in `public/`, shared `reading.css` and `src/reading.js` |
| Video archive, topics and watch pages | `api/videos.js`, server-rendered `src/archive.js`, saved upload inventory |
| Video feed | `api/youtube.js`, YouTube Data API / RSS, daily cache and client snapshot fallback |
| Analytics | Vercel Analytics; consent-gated Google Analytics and Meta Pixel |
| Email integrations | Public email open pixel with exact-token Airtable lookup; signed Resend webhook for delivery and suppression records |
| Membership / billing / authentication | Hosted by Skool; no local accounts, password reset, protected dashboard, payment collection or tenant database |
| Booking | Cal.com embed on desktop; direct link on mobile and an embed-failure fallback |
| Deployment | Vercel routes, security headers, caching and generated page/video sitemaps |

Reviewed repository structure, README, package and lockfile, configuration, server environment variable usage, API routes, frontend components, static pages, build/operational scripts and tests. Environment variable **names** and client exposure were inspected without recording credentials. There is no TypeScript project, database schema/migration system or configured formatting check.

Existing uncommitted guide SEO edits, sitemap edits and their tests were preserved. Audit additions to existing guide HTML are keyboard-focus attributes on command blocks and tables; shared table CSS was appended to the existing stylesheet.

## Issues fixed

| Area | Reproduction / issue | Resolution |
| --- | --- | --- |
| Dependencies | npm reported high-severity dependency groups for Vite 8.2.2 and transitive Zod 4.6.5 | Vite 8.2.4 and Zod 4.6.7; final advisory count **zero**. These advisories primarily affect development tooling, not a confirmed production exploit. [Vite advisory](https://github.com/advisories/GHSA-9jrq-w75r-8gcw), [Zod advisory](https://github.com/advisories/GHSA-mrhx-c7xc-m3w5). |
| Webhook signature handling | A 44-character non-ASCII signature caused `timingSafeEqual` to throw a RangeError before authentication completed | Validate signature version and Base64 form; compare decoded equal-length byte buffers. Invalid timestamps are rejected. |
| Webhook payload handling | Correctly signed `null`, malformed JSON and invalid event shapes threw uncaught exceptions | Controlled HTTP 400; invalid signatures still return 401 before parsing or storage. |
| Webhook upstream failures | Airtable requests had no timeout and errors included the upstream response body | Eight-second request timeout; HTTP 500 preserves provider retries; logs omit upstream response bodies. Existing batching and retry deduplication remain covered by tests. |
| Feed reliability | HTTP 200 with empty/malformed API or RSS data could bypass fallback or be cached for a day | Validate feeds before accepting them, fall back from malformed API data to RSS, retry malformed RSS and retain the prior valid memo on failure. |
| Mobile tables | Five guides overflowed at 320px; the AI automation guide made the page 627px wide | Wide tables scroll within their own width; prose wraps; comparison columns retain readable word wrapping. Final page width is 320px. |
| Keyboard access | axe identified horizontally scrolling command blocks inaccessible to Safari keyboard users | Focusable command blocks/tables and visible focus outlines. Verified table arrow-key scrolling while the page itself stays within the viewport. |
| Consent controls | Homepage footer reopening did not move focus; policy pages lacked the promised footer privacy control | Move focus into reopened choices and restore it on dismissal. Privacy and terms now share navigation, styling and consent controls; build rewrites their reading entry correctly. Invalid saved consent is treated as undecided. |
| Email metrics | HEAD requests recorded email opens and returned GIF bytes from the handler | HEAD returns headers without a body, logging or Airtable access. Dev/preview forwarding now preserves the incoming HTTP method. |
| Error UX / SEO | Invalid archive/watch routes used a bare, unbranded paragraph | Branded semantic error pages, a heading, language declaration, noindex and useful recovery links; status codes preserved. |
| Booking / media | Mobile booking opened the inline embed; rejected native playback promises could become uncaught errors | Mobile opens Cal.com directly; desktop retains the embed and fallback. Native video controls remain available after a rejected play attempt. Feed fetches are cancelled during effect cleanup. |
| Asset caching | Unhashed guide images inherited one-year immutable caching | Revalidatable guide-image cache rule; fingerprinted assets keep immutable caching. |
| Build operation | Runtime minimum and optional server integration setup were undocumented; other `.env` variants were not ignored | Node >=22.12 declared, `.env.example` added, setup documented and `.env*` ignored except the example. |
| Featured image | A newer live upload used an 87KB remote image until the next build refresh | Refreshed current feed/inventory and generated 480/768/1280px hashed WebP thumbnails. The mobile Lighthouse run fetched the 768px variant at about 37KB. Old fallback assets were retained. |

## Validation

| Check | Result |
| --- | --- |
| `npm run lint`, `npm test`, `npm run build` | Pass. **148 test cases across 18 files** were also executed per file to capture individual case totals. |
| Dependency audit | Zero known npm advisories after updates; no application dependency added. |
| Responsive checks | **94 checks**, no page overflow or broken loaded images. Nine main route types at 320, 375, 390, 430, 768, 1024, 1440 and 1920px; remaining written guides checked at 320px. |
| Accessibility | axe: **zero automated violations across 12 page types**, including legal and error pages. Manual privacy focus, mobile menu Escape, and table keyboard checks pass. |
| HTML / internal links | 272 generated/static documents inspected: 271 content/error documents and one search-engine verification file. No missing local targets or fragment anchors after accounting for the Vercel-served analytics script. 522 JSON-LD blocks parse successfully. |
| Sitemaps | Valid XML: 51 page entries and 219 video entries. |
| External links | 131 documentation/conversion destinations checked; no confirmed 404. 14 automated requests received service blocking responses, including Skool, OpenAI Help, LinkedIn, FTC and Make. Skool's plan picker was verified in the browser with all three plans visible. |
| Main interactions | Featured video opens its titled iframe; desktop calendar renders with fallback; mobile booking opens the correct Cal.com event; privacy choices reopen/save/dismiss with focus restoration; menu closes using Escape. No uncaught browser exceptions observed during these interactions. |
| Production HTTP | Home, archive, watch and analytics script return 200. Unknown URL returns 404. Public archive/watch responses have no noindex header. Security headers and HSTS present. |
| Secrets / server integrations | No configured server credential values found in built client JavaScript. Webhook and Airtable behavior exercised with mocks; no production records written or deleted. |
| Independent review | No critical or important findings. Its local-method-forwarding finding was fixed. |

### Performance measurements

Local production build, Lighthouse mobile simulated throttling and desktop preset; these are lab results, not field measurements.

| Metric | Mobile | Desktop |
| --- | --- | --- |
| Performance | **98** | **100** |
| Accessibility / SEO | **100 / 100** | **100 / 100** |
| FCP | 1.4s | 0.4s |
| LCP | 2.3s | 0.6s |
| Total blocking time | 10ms | 0ms |
| CLS | 0 | 0 |

Best practices scored 96 locally because `/_vercel/insights/script.js` is unavailable from plain Vite preview. Production serves this script with HTTP 200. This platform difference was documented rather than masked. The main client bundle is approximately 75KB gzip; no speculative code splitting or new framework was introduced.

## Verification limits and release state

- Chromium viewport emulation was used. Real Safari/Firefox browsers, physical devices, assistive-technology sessions and production field INP were not available for validation. axe also marked some third-party frames/contrast cases for manual review; a clean automated result is not a WCAG certification.
- Skool signup, paid checkout, cancellations, password recovery and private classroom authorization were not completed. These flows live on Skool; no purchase or account changes were made. Booking submission and live Resend/Airtable writes were not performed.
- Rate limits at the Vercel account/WAF layer and production webhook secrets could not be verified from repository code. The public email pixel is an engagement signal, not proof that a human read an email; email proxy/scanner GETs can still affect counts.
- The existing broad CSP remains report-only. Existing enforced framing, MIME, referrer and permission protections were retained; enforcing the full script policy requires separate live third-party integration validation.
- A nonblocking npm warning about the host's `globalignorefile` setting remains outside repository configuration. Offline build attempts correctly retained saved video data; the network-enabled build refreshed it successfully.
- Changes remain uncommitted and undeployed alongside pre-existing guide edits. Deploy the current source plus the refreshed snapshots and their three matching thumbnail assets together. The cache-rule change takes effect on deployment and cannot retroactively purge an already immutable image from a visitor's browser.

Evidence: [responsive checks](responsive.json), [accessibility](accessibility.json), [test counts](tests.json), [page crawl](page-crawl.json), [external links](external-links.json), [Lighthouse summary](performance.json), [mobile table screenshot](guide-table-320.png).

## Integration before pushing to main

Fetched and preserved upstream commits `da9da08` and `2076e00`, including the Dots/Grok Bot watch notes and the new AI income guide. Resolved the guide hub, no-experience guide and sitemap conflicts by keeping the upstream content, FAQ additions and modification dates alongside the audit's metadata improvements. The new guide now shares the portfolio's typed publisher, author profile, dates and visible breadcrumb contract. Lint, all tests and the production build passed on the combined source. Browser and performance evidence above records the original audit baseline and was not rerun for these upstream editorial additions.
