# SEO/GEO audit — October 11, 2026

Site: https://www.ai-automation-station.com/ · Skill: seo-geo · Public crawl completed approximately 19:52 Asia/Bangkok.

Follow-up: [implementation and current account evidence](2026-10-11-seo-geo-implementation.md). That report supersedes the access and performance gaps below; this file preserves the original audit checkpoint.

**Assessment: the technical foundation is healthy. The next useful investment is confirming indexing progress and publishing more verifiable, task-specific written material around the strongest videos.** No critical crawl blocker was found. Current search traffic, index coverage, and AI citation frequency could not be established from the available authenticated tools; earlier account data is explicitly dated below.

This is an audit and recommendation report. No application code, deployment, profile, sitemap submission, or indexing request was changed.

**Scope and evidence**

- Crawled all 241 unique live sitemap URLs: 215 watch pages, 15 video archive pages, six guides, guide index, start page, homepage, privacy, and terms.
- Examined 6,214 link occurrences, checked 449 linked image/download assets, and probed 12 URL variants and nonexistent routes. This is not an exhaustive JavaScript/font/media resource waterfall.
- Checked robots rules and HTTP responses for eight bot user agents on the homepage and one watch page: 16 successful requests.
- Checked 25 unique external HTTPS links from the homepage and non-video content pages: 24 returned 200; LinkedIn returned its nonstandard 999 response, which does not establish a broken profile.
- Reviewed live content and JSON-LD, compared the checkout with production, researched current official search documentation, and reused the October 8 keyword and Search Console evidence with its original dates.
- Fresh mobile PageSpeed requests for home, a guide, and a watch page all returned quota-exceeded errors. No connected browser was available for fresh mobile interaction, Search Console, Bing Webmaster Tools, or Rich Results Test checks.

Raw evidence is in [the audit folder](../../jev-seo-reports/ai-automation-station.com-2026-10-11/seo-geo-audit/): `pages.json`, `page-inventory.csv`, `resources.json`, `summary.json`, `reviewed-findings.json`, `assets.json`, `routes.json`, `bot-access.json`, and `external-links.json`. Consult `reviewed-findings.json` alongside the raw summary: the old crawler flags JavaScript timestamp fragments as missing HTML anchors.

**Verified technical results**

| Area | Live result | Interpretation |
|---|---|---|
| HTTP availability | 241/241 sitemap pages return 200 | No page availability blocker detected |
| Robots and indexing directives | Important routes allowed; no sitemap page has detected noindex | Crawl eligibility passes; actual indexing remains separate |
| Canonicals | All 241 self-canonicalize correctly | No detected sitemap canonical mismatch |
| Titles and descriptions | Present and unique on all 241 pages | Earlier metadata cleanup is live |
| Headings | Exactly one H1 on every sitemap page | Basic structure passes |
| Social metadata | OG title, description, image, URL and Twitter card present throughout | Sharing metadata is in place |
| Images | No missing alt attributes; all 449 checked assets return 200 | Alt quality and all visual contexts were not individually inspected |
| JSON-LD | No parse failures | Syntax validity does not prove every rich-result rule passes |
| Video markup | 215 VideoObjects with name, thumbnail and upload date; all watch pages contain an initial-HTML player | Good foundation for video discovery |
| Chapters | 190 videos have Clip markup | Sample `?t=182` URL sets the embedded player to start at 182 seconds |
| Internal discovery | All sitemap pages reachable from home; maximum depth three links | No detected orphan page |
| Invalid URLs | Unknown page, invalid/missing video and archive page 999 return 404 | No sampled soft-404 fallback |
| URL variants | HTTP, apex domain, index.html, archive page 1 and trailing slash resolve to preferred routes | Canonical consolidation works in the tested cases |
| Compression | gzip returned on sampled home/watch bot requests | Verified transport optimization, not a speed score |

The raw crawler found 1,875 `#t=...` references without matching HTML IDs. Every flag is a video timestamp. Live sample code handles initial hashes, chapter clicks and hash changes; structured-data chapter URLs retain working server-side query parameters. These are **not confirmed broken links**. Browser playback was not exercised. Ordinary missing anchor count is zero.

`/api/videos` remains a 200 HTML alias with canonical `/videos`. This is not an urgent duplicate-content defect; internal navigation uses the preferred route. Do not change the API contract solely to remove an alternate URL.

Production contains `/guides.html` and `/guides/claude-code-vs-codex.html`, absent from this checkout. Production also uses chapter hash navigation where the checkout uses query links. **Reconcile the production revision before implementing or deploying recommendations from this workspace**, to avoid reverting live additions.

**Prioritized improvements**

| Priority | Finding | Smallest useful action | Completion evidence |
|---|---|---|---|
| P1 | Current indexing progress is unknown; historical coverage was very small | Inspect a fixed sample of the best pages in GSC and Bing, including the new comparison guide; record crawl dates, selected canonical, page index and video index status | Dated URL-inspection results and sitemap last-read counts; do not equate successful live tests with indexing |
| P1 | Only 10/215 watch pages have dedicated editorial companions, about 4.7%; median video description is 40 words | Add five caption-checked companions chosen for useful tasks and actual demand, with setup, observed result, failure cases, dates and source links | Five substantive additions that answer questions beyond the recording title and membership CTA |
| P1 | The new Claude Code/Codex comparison describes changing models, plans and CLI behavior without links to vendor documentation | Add official sources near the relevant claims, a checked date/version for command examples, and a concrete example of task input and verified output | Readers can verify capabilities and reproduce the scoped example; personal preferences remain explicitly personal |
| P2 | Several remaining titles are short enough but still vague or promotional | Review priority pages for query intent and accurate claims; rewrite based on the recording rather than a character quota | Clear tool + task/outcome titles; no unsupported “free,” “10X,” or universal performance promise |
| P2 | Five of six guide Article objects omit `image` | Add a relevant crawlable image and its schema property when a useful screenshot/diagram is available | Article image is representative and passes the current validator; not required to keep the page indexed |
| P2 | The AI Income Lab / AI Automation Station / Mike Holp relationship can be more explicit | Add one clear visible sentence describing the community, publication and author relationship, and align structured entity descriptions where appropriate | A reader or extractor can identify who publishes the site and what the paid community is |
| P2 | Independent discovery/authority has not been freshly measured | Check existing owner-controlled GitHub, YouTube and product bios for relevant guide links; earn references with useful examples and documented results | Public links verified individually; referral visits tracked without assuming they caused rankings |
| P2 | Watch-page performance remains a measurement gap after deployment changes | Repeat comparable mobile tests on two watch pages, home and a guide; investigate player cost only if it remains material | Repeated lab results plus field data when available; video discovery preserved |
| P3 | Some sitemap dates predate October 10 edits to linked content/navigation | Review lastmod against actual significant page changes and update only when warranted | Accurate substantive-change dates; do not refresh every date daily |

Google recommends relevant Article images but does not make every recommended property an indexing prerequisite. [Article documentation](https://developers.google.com/search/docs/appearance/structured-data/article). Sitemap dates should reflect significant modifications and remain accurate. [Sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).

**Content and AI citation readiness**

The six guides already offer direct introductions, named authors, publication dates, practical steps and internal next steps. Existing enriched watch pages separate what the recording demonstrates from what remains unverified. The new comparison includes a useful table and clearly labels its conclusions as personal experience. Preserve these strengths.

The principal weakness is evidence density across the broader archive. A median watch page contains 239 total extracted words, including navigation, recommendations and membership copy; that is not 239 words of unique instruction. Video content itself has value, so this is an opportunity for better text answers, **not grounds for blanket noindexing or an arbitrary word-count target**.

For the next five companions, start with:

| Existing page | Suggested written angle | Why this belongs in the next batch |
|---|---|---|
| `/watch/Lifl4PC2_3M` | Make.com course: prerequisites, first scenario, checks and failure recovery | Directly supports the existing Make guide and actual course |
| `/watch/9kHdIiobKMA` | VAPI phone-agent setup and first-call verification | Voice path lacks a standalone written exercise; explain account/usage costs accurately |
| `/watch/Ax-v4H9xv50` | Google AI Studio app build: what completed and what still required setup | 10,752 recorded YouTube views at crawl time; replace broad “all for free” wording with verified scope |
| `/watch/MYoA3___zYU` | Emergent SaaS landing-page build: generated output, missing product features and checks | 8,754 recorded views; distinguish a landing page from a working SaaS application |
| `/watch/ys5tJuTFCEo` | Recorded GrokBot integration, with a short link to the updated Claude Code/Codex workflow | Pairs the newly featured recording with the existing substantial guide without duplicating it |

YouTube views are an audience-interest signal, not Google search demand. Prefer GSC query evidence once available. Check captions before writing any first-person result. Link each companion to its matching guide and one meaningful next task. Preserve the prominent video player.

Use short answer paragraphs that state the tool, task, prerequisites and result explicitly. Add screenshots, reproducible examples, test outputs and limitations where they help a reader verify the claim. Cite vendor documentation for changing capabilities. Add measured statistics only when the method and date are available; do not manufacture numbers or quotes to satisfy a GEO checklist.

Example revision brief for the comparison: retain its personal routing table, link official authentication/permission documentation, and explain that the shown `Read Grep` allowlist is for local-file analysis—it does not itself demonstrate live web-fetch access. Show a small task and result, rather than implying the sample command alone performs a live-site audit.

**Keyword and competition assessment**

The saved October 8 DataForSEO Google Ads data used US English and returned monthly observations through August 2026. It reported approximately 880 monthly searches for “ai automation course,” 480 for “codex tutorial,” 320 for “n8n course,” and 30 for “make.com course.” These are historical estimates, **not newly retrieved volumes or organic difficulty scores**. Other queried phrases had unavailable metrics, not proven zero demand. [Saved keyword response](../../jev-seo-reports/ai-automation-station.com-2026-10-08/seo-optimizer-audit/keyword-metrics.json).

| Query group | Destination | Recommendation |
|---|---|---|
| AI automation courses/community | Homepage and start page | Explain curriculum, support, access and outcomes; preserve clear pricing/access rules |
| Claude Code vs Codex | Existing comparison guide | Improve evidence and freshness; do not create another competing comparison URL |
| Codex tutorial / verify an AI code change | Existing Codex guide | Keep the runnable local exercise; add contextual links from matching videos |
| Make Google Sheets filter approved rows | Existing Make guide | Lead with this concrete scenario in search copy; broad “automation” alone is less informative |
| OpenCode model limits / provider setup | Existing OpenCode companion | Explain errors and provider distinctions, with dated official references |
| VAPI beginner setup and test call | Existing watch page, then a guide if sufficient original material exists | Verify demand and recording detail before adding another URL |

Current public search research found substantial official coverage from [n8n education](https://n8n.io/education/), [Make Google Sheets integrations](https://www.make.com/en/integrations/google-sheets), and [OpenCode model documentation](https://dev.opencode.ai/v2/docs/console/models). The opportunity is a specific demonstrated project, debugging evidence, and help applying it. Generic introductory content competes with strong free vendor material. These are competing resources, not claimed Google rank positions.

The limited public `site:` searches did not return a useful inventory for this domain. That is inconclusive and is not an index-count measurement.

**Corrections to the supplied GEO checklist**

- Google says ordinary SEO fundamentals apply to AI Overviews and AI Mode; no special AI schema or new machine-readable file is required. Keep existing `llms.txt` accurate, but do not prioritize expanding it over helpful pages and discovery. [Google AI guidance](https://developers.google.com/search/docs/appearance/ai-features).
- FAQ rich results stopped appearing in Google Search on May 7, 2026. Useful visible FAQs can remain, but adding FAQPage markup is not a credible high-priority ranking fix or a guaranteed 40% citation gain. [Google changelog](https://developers.google.com/search/updates).
- OAI-SearchBot is the relevant OpenAI search crawler; GPTBot controls training use separately. The site currently allows both through its wildcard rule. No need to add redundant named rules. [OpenAI crawler documentation](https://developers.openai.com/api/docs/bots).
- PerplexityBot is a search crawler. The sampled HTTP responses pass, but user-agent simulation does not establish access from real crawler IPs or prove any AI system has indexed/cited the site. [Perplexity crawler documentation](https://docs.perplexity.ai/docs/resources/perplexity-crawlers).
- The original GEO research reports experiment-dependent visibility gains, not universal lifts for this site or every current assistant. Sources, clarity and verifiable results are sound editorial practices; percentage promises are not justified. [Original research](https://arxiv.org/abs/2311.09735).
- Current Core Web Vitals are LCP, INP and CLS. Good thresholds are LCP ≤2.5 s, INP ≤200 ms and CLS ≤0.1 at the 75th percentile. FID and a single HTTP fetch duration are not suitable current substitutes. [Web Vitals](https://web.dev/articles/vitals).

**Indexing, performance and measurement plan**

The October 8 saved GSC page report, last updated October 4, showed one indexed page. Its selected July 6–October 5 performance window showed 36 impressions and zero clicks; the Links report showed no external-link sample. These are historical baselines, not claims about October 11. Earlier checks reported no manual/security issues; this audit did not refresh those account reports. [Previous audit and evidence](../../jev-seo-reports/ai-automation-station.com-2026-10-08/seo-optimizer-audit/FULL-AUDIT.md).

The same earlier audit recorded mobile Lighthouse performance 100 for home/archive/a sampled guide, and watch runs of 55/92 with LCP 6.3/1.8 s and TBT around 300 ms. Current PageSpeed quota failures prevent attributing any new gain or regression to the deployed changes. No current real-user CWV pass is claimed.

1. **Next account review, around October 15:** record sitemap last-read dates and discovered counts; inspect the comparison guide, Codex guide, Make guide, API guide, and watch pages `vauqktcB6ak`, `_8qzOkIWMSk`, `G8u1-hKEqig`, `ys5tJuTFCEo`. Distinguish discovered, crawled, indexed and video-indexed. Confirm Bing discovery separately.
2. **Next editorial batch:** publish five verified companions and improve comparison citations. Request indexing selectively for materially improved priority pages where appropriate; repeated successful sitemap submissions are unnecessary.
3. **Following 4–6 weeks:** compare complete 28-day periods for nonbrand impressions, clicks, queries and landing pages. Track guide/video-to-Skool outbound events, but count paid memberships only with membership data.
4. **AI visibility baseline:** choose a fixed set of task questions, such as “How do I verify a Codex code change?” and “How do I filter approved Google Sheets rows in Make?” Record engine, date, prompt, cited URLs and referral visits. Repeat consistently; one answer or mention does not establish durable visibility.

Skipped: production changes, paid data refreshes, outreach, blanket content generation, and a new analytics system. Current authenticated indexing/backlink reports, browser interactions, exhaustive rich-result validation, and fresh speed/field metrics remain unverified. The main implementation risk is deploying this older checkout over newer production content.
