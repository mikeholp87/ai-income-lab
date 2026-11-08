# SEO audit: AI Automation Station

Audit date: November 8, 2026. Production: https://www.ai-automation-station.com/. Scope: technical SEO, on-page SEO, content, and internal links. No application changes or deployment were made.

Implementation follow-up: the source fixes and local checks are recorded in [IMPLEMENTATION.md](IMPLEMENTATION.md). The findings below describe the original live audit snapshot.

## Executive summary

**The live site's crawlability and on-page foundations are sound. No critical page-indexation blocker was found in the HTTP crawl.** All 322 sitemap URLs returned 200, with unique titles and descriptions, self-referencing canonicals, one H1, and no noindex directives. This establishes technical accessibility, not that Google has indexed or will rank every page.

The main technical concern is video discovery: all 226 watch pages load the actual iframe only after interaction. This conflicts with Google's video-discovery guidance. Its effect on this site's video indexing is unverified because Search Console rendered-page and video-indexing data were unavailable.

Priorities:

1. **P1: Verify and address click-dependent video loading on watch pages.** Potentially high impact on video features; no demonstrated loss of ordinary text-page indexing.
2. **P2: Strengthen contextual links to ten guides.** Each currently has links from just two other guide pages. They are reachable, not orphaned.
3. **P2: Improve vague watch-page packaging selectively.** Several recent titles describe excitement rather than the actual setup or result. Use page/query data before changing established titles.
4. **P1 measurement: Refresh Search Console evidence.** Determine actual indexing, video detection, impressions, clicks and conversions before choosing larger content changes.

Quick win: add one useful contextual link to each of the ten guides listed below. Do not repeat earlier hero-loading or guide-title fixes: the live crawl shows those are already implemented.

## Coverage and evidence

The crawl ran at approximately 10:04 UTC / 17:04 Bangkok time. Counts describe this snapshot; the video inventory can change independently.

| Check | Result |
|---|---|
| Main sitemap | 96 URLs; HTTP 200 |
| Video sitemap | 226 URLs; HTTP 200 |
| Sitemap pages crawled | 322: 63 guides, 226 watch pages, 26 archive/topic pages, 7 other pages |
| Sitemap URL status | 322/322 HTTP 200 |
| Canonicals | 322/322 one self-referencing canonical |
| Missing or duplicate titles/descriptions | None in the 322-page sample |
| H1 | Exactly one on each sitemap page |
| Index exclusions | No noindex in sampled sitemap-page meta tags or response headers |
| Crawl rules | robots.txt allows crawling and lists both sitemaps |
| Link depth | All sitemap pages reachable within three HTML-link hops from the homepage in the captured graph |
| Additional linked URLs | Three checked; all HTTP 200, including search, which intentionally has noindex |
| Guide-image URLs | 452 distinct src/srcset URLs checked; all HTTP 200 |
| Guide hero loading | 63/63 topic hero images eager-loaded |
| Image attributes | No missing alt attributes in sitemap pages; no missing dimensions in guide images |
| JSON-LD syntax | No JSON parse errors in captured server-delivered blocks |
| Guide structure | Article, BreadcrumbList and FAQPage present in server HTML on all 63 guides |
| Watch structure | VideoObject present in server HTML on all 226 watch pages |

HTTPS and host variants redirect permanently to the preferred HTTPS www host. The HTTP apex variant takes two hops; this is a low-impact cleanup opportunity, not an urgent defect. Extensionless guide URLs and trailing-slash variants redirect to their canonical format. A fabricated path, invalid watch ID and out-of-range archive page each returned a real 404 with noindex. No redirect loop was observed in these probes.

Artifacts:

- [Page metadata export](pages.csv): one record per sitemap URL.
- [Crawl summary](summary.json), [full page evidence](crawl.json), [additional links](linked-extra.json).
- [Route probes](route-probes.json), [guide-image probes](guide-image-probes.json).
- Saved [robots.txt](robots.txt), [page sitemap](sitemap.xml), [video sitemap](video-sitemap.xml).
- Reproducible read-only collectors: [crawl.mjs](crawl.mjs), [probes.mjs](probes.mjs), [export.mjs](export.mjs).

**Limits:** Browser access was unavailable. Keyless mobile PageSpeed requests for home, 9Router guide and Herdr watch page all returned HTTP 429; see `psi-home.json`, `psi-guide.json`, `psi-watch.json`. No fresh Lighthouse score, field LCP/INP/CLS, mobile layout pass, rendered schema validation or Google-selected canonical is claimed. Server JSON-LD presence and syntax are positive evidence only; they do not establish rich-result eligibility or absence of other client-injected markup. Search Console, analytics and backlink datasets were not available through the exposed tools. External links were not comprehensively checked.

## Technical SEO finding

### T1. Watch players require interaction to exist

- **Priority:** P1. **Impact:** Potentially high for video discovery; actual indexing impact unmeasured.
- **Evidence:** All 226 watch-page responses contain a thumbnail link with `data-embed` and zero iframe elements. In `src/archive.js`, `playerScript` creates the iframe through the click/autoplay path; the initial `seek(location.hash, false)` path only updates the stored URL. Example: [/watch/IV6q81wRay4](https://www.ai-automation-station.com/watch/IV6q81wRay4). VideoObject and video-sitemap player URLs are already supplied.
- **Why it matters:** Google recommends a supported embedded video element, checking JavaScript-created players in rendered URL Inspection HTML, and avoiding a click requirement. Metadata helps discovery but does not prove a player is detected. [Google video SEO guidance](https://developers.google.com/search/docs/appearance/video).
- **Fix:** Inspect three representative watch pages in Search Console: the latest Herdr upload, `/watch/miBtL2fVkpg`, and an older indexed recording. Check both the rendered HTML and video-indexing reason. Prototype a primary iframe present without a click, or a viewport-triggered player that appears in Google's rendered HTML. Keep autoplay off and verify existing privacy and page-performance behavior. Apply the same experience to users and crawlers.
- **Acceptance:** A supported player appears in the no-interaction rendered HTML, its stable embed URL matches the video metadata, and subsequent Search Console processing confirms detection. Page indexing and video indexing must be recorded separately.

## On-page SEO findings

### O1. Ten guides have limited contextual support

- **Priority:** P2. **Impact:** Medium opportunity, not a crawlability failure.
- **Evidence:** Each destination below is linked from exactly two distinct other guide pages in the live crawl. Counts include related-guide modules, exclude the hub/home/watch pages, and do not assert an SEO minimum.
- **Fix:** Add a contextual link where it helps a reader take the next step. The suggested source does not currently link to the destination in this crawl. Read the surrounding section before insertion.

All paths below are under `/guides/` and end in `.html`.

| Destination | Suggested source | Reader context |
|---|---|---|
| consent-tracking | build-apps-with-ai-coding-agents | Add consent-aware measurement to a shipped app |
| deepseek-harness-first-test | choosing-ai-models-for-a-task | Distinguish provider failure from model quality |
| ghostty-debian-configuration | codex-on-linux | Configure the terminal used for coding agents |
| grokbot-virtual-office | ai-agent-workflow | Inspect an agent dashboard example |
| grokbot-vs-dots | ai-agent-workflow | Compare onboarding and approval workflows |
| herdr-desktop-app | codex-workflow | Manage coding-agent workspaces |
| muse-code-setup | choosing-ai-models-for-a-task | Review a documented failed setup and working route |
| rea-video-editor-prototype | build-apps-with-ai-coding-agents | Test a prototype through a real editing action |
| runable-audit-website | ai-automation-services-small-business | Turn an audit-service brief into a website MVP |
| trakkr-codex-visibility-workflow | openseo-review | Compare visibility evidence with search evidence |

### O2. Some recent watch titles are vague for search

- **Priority:** P2. **Impact:** Medium opportunity; no CTR diagnosis is established.
- **Evidence:** `/watch/IV6q81wRay4` uses “New HERDR Desktop App Is A Game Changer!”; `/watch/V0PoYhOprBI` uses “3 Open Source Projects I Built That You Need to Try!”. Their chapters identify more specific software and tasks. Titles remain unique and present; this is a relevance/clarity opportunity.
- **Fix:** Review their actual query impressions first. Candidate **website** titles, if supported by query intent: “Herdr Desktop Setup: Workspaces, Themes and Claude Code” and “Tasky, Restic-Studio and Luma-Launcher: Project Demos”. Verify wording against the recording before shipping. These are drafts, not instructions to rename the YouTube videos.
- **Acceptance:** The website title, H1 and summary describe the same recorded task. Log the baseline and change date; compare matched query/device/country cohorts after 3–4 weeks. Google does not require exact title/H1 string equality or a fixed character count. [Google title-link guidance](https://developers.google.com/search/docs/appearance/title-link).

## Content findings

### C1. Four recent watch pages would benefit from useful outcome summaries

- **Priority:** P3. **Impact:** Medium content opportunity; no minimum word count or thin-content penalty is inferred.
- **Evidence:** The four shortest watch pages are `/watch/V0PoYhOprBI`, `/watch/IV6q81wRay4`, `/watch/phVQuQMojA8` and `/watch/0iTOlQjNdhs`, with approximately 273, 287, 310 and 384 words inside main. Some summaries primarily enumerate chapters. Word totals include headings, navigation within main and calls to action, so they are not a count of original editorial copy.
- **Fix:** Add a short recording-specific summary of what was built, prerequisites, observed result, failure/limit, and the next useful guide or repository. Use the recording as evidence. A full transcript is optional; avoid padding or duplicating the complete guide.

The guides themselves show stronger foundations: visible author attribution, dated updates, source links, FAQs, scoped exercises and first-person limits on what was actually tested. The about page connects Mike Holp, the publication and the paid community. Privacy, terms and contact paths are available. These are positive trust signals, not an E-E-A-T score or proof of authority.

### C2. Search-performance evidence is too old to prioritize further rewrites

- **Priority:** P1 measurement. **Impact:** High on prioritization; not a confirmed site defect.
- **Evidence:** This run could not access fresh Search Console data. The November 6 follow-up records 266 impressions, zero clicks and average position 6.46 for `9router-setup.html` over October 9–November 5. That historical aggregate is not a current ranking or proof of a bad title. A targeted public search returned the 9Router guide and other site URLs; search-result samples cannot measure Google's indexed total.
- **Fix:** Export the latest available 28 days and previous 28 days by page/query, device and country, plus 90-day context. Inspect new guides and video indexing. Prioritize commercially relevant query/page pairs at positions 8–20 with meaningful impressions; assess weak CTR against comparable search appearances. Separate newsletter/plan clicks from paid memberships.
- **Acceptance:** A dated baseline links each proposed change to a query, page, search intent and measurable outcome. Keep recently improved titles stable while collecting evidence.

## Prioritized action plan

| Order | Action | Completion evidence |
|---|---|---|
| 1 | Inspect watch-page rendering and video detection; prototype player fix if confirmed | No-interaction rendered player plus Search Console result |
| 2 | Obtain current Search Console and conversion baseline | Dated query/page export and indexing sample |
| 3 | Add the ten relevant internal links | Live links return 200 and fit the surrounding text |
| 4 | Improve selected watch titles and outcome summaries | Recording-backed copy; logged before/after baseline |
| 5 | Measure page experience when quota/browser access is available | Mobile lab measurements and field data reported separately |
| 6 | Build on demonstrated experience and earned references | Reproducible examples and relevant third-party mentions; backlink baseline first |

No urgent changes to robots rules, canonicals, guide titles, hero loading or schema syntax are supported by this crawl. The local untracked workflow estimator returns 404 in production and has no incoming link in the captured live site; that is unfinished local work, not a broken published SEO journey.
