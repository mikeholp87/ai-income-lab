# AI search readiness audit — November 8, 2026

Site: https://www.ai-automation-station.com/ · Skill: ai-seo 2.12.0

The site has a sound technical and editorial foundation for retrieval. The clearest confirmed defect was inconsistent product information: the live homepage marked TubeAnalytics temporarily unavailable, while the live `llms.txt` still advertised a seven-day trial and plans from $19/month. This audit corrects that inconsistency locally and makes the overview discoverable from the homepage. Actual AI citation and recommendation rates remain unknown.

## Scope and evidence

- Read the installed skill, its agent-readiness and content-pattern references, existing audits, site source, and all 63 local guide files. No product-marketing context or applicable AGENTS.md file was found in the checked project and ancestor locations.
- Assumed the goal is citations to free guides and qualified interest in Mike Holp's paid AI Income Lab community. Domain authority, target competitors, and current AI visibility were not supplied or measured.
- Read-only live HTTP requests returned 200 for `/`, `/robots.txt`, `/llms.txt`, `/sitemap.xml`, `/about.html`, and the AI automation, Claude Code vs Codex, and Make starter guides. All five sampled HTML pages contained one H1 and a canonical in their initial HTML, with no X-Robots-Tag response header. The live page sitemap contained 96 URLs. These checks occurred before the local fixes.
- Live monthly membership prices match the [official Skool plan selector](https://www.skool.com/ai-automation-station-7346/plans): Standard $29, Premium $49, VIP $89. Annual prices and detailed course unlocks were checked against the site's published homepage; the fetched plan-selector text did not expose annual prices or unlock levels.
- Local per-guide findings are in [the evidence JSON](2026-11-08-ai-seo-evidence.json). They include pre-existing uncommitted work and are not a claim that every change is deployed.
- Web searches provided a small discovery sample. They were not signed-in ChatGPT, Perplexity, or Google AI Overview tests. No Search Console, referral analytics, crawler logs, or AI monitoring account data was used. No AI visibility score, search volume, citation lift, or revenue forecast is inferred.

## Access and extractability

| Check | Finding | Interpretation |
|---|---|---|
| Live crawler policy | One `User-agent: *` group with `Allow: /`; page and video sitemaps listed | No robots exclusion for discovery or training crawlers; policy left intact |
| Actual crawler access | Ordinary HTTP retrieval worked on eight sampled paths | CDN/WAF access from vendor IPs and crawler execution remain unverified |
| Initial HTML | Meaningful text on homepage, about page, and three sampled guides | Core content can be retrieved without executing JavaScript |
| Local guide discovery | 63/63 linked in both the page sitemap and `llms.txt` | No missing guide entries found in those two surfaces |
| Heading structure | 63/63 have exactly one H1 | Basic document structure passes |
| Attribution | 63/63 Article records have an author URL | Authorship exists; this does not independently verify expertise |
| Structured data | 63/63 have Article, BreadcrumbList, and FAQPage; all examined JSON-LD parses | Presence and syntax pass; full visible-content parity is not certified |
| Answer openings | 42/63 contain the literal “Quick answer:” label | The other 21 require editorial judgment, not automatic insertion of that label |
| Hero loading | 63/63 use eager loading and high fetch priority locally | Existing image-loading improvements are already present; no new field-performance measurement |
| Buyer facts | Prices, course access, extra software costs, and checkout steps are visible on homepage | A separate pricing Markdown mirror is lower priority than maintaining these facts |

Search, retrieval, and training controls are separate. [OpenAI documents OAI-SearchBot for search and GPTBot for potential training](https://developers.openai.com/api/docs/bots). [Anthropic documents distinct training, search, and user retrieval robots](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler), and [Perplexity documents its own crawler controls](https://docs.perplexity.ai/docs/resources/perplexity-crawlers). User-triggered retrieval behavior must be checked per vendor; it is inaccurate to say every such fetcher ignores robots.txt.

## Changes made in this run

1. Corrected TubeAnalytics availability in `public/llms.txt` and pointed readers to the homepage's current product status instead of an unavailable product offer.
2. Matched VisiScan's overview to the published free scan, $49 one-time report, and monitoring from $29/month. These are site-published offers, not an independent operational test of VisiScan.
3. Clarified currency, course unlocks, extra software costs, and the difference between free guides and paid membership; linked the official plan selector. Dated the factual review without changing guide freshness dates.
4. Added a descriptive link in the homepage head and a visible “Site overview” footer link to `/llms.txt`. This supports discovery; no citation or ranking improvement is promised.

Only `public/llms.txt`, `index.html`, and one footer line in `src/main.jsx` were changed for the site. Existing edits were preserved. No deployment, publishing, profile changes, or outreach was performed.

[Google's guidance](https://developers.google.com/search/docs/appearance/ai-features) explicitly says no special AI files or schema are required for AI Overviews or AI Mode. The useful work here is consistent facts, accessible text, internal discovery, and original evidence. There is no demonstrated site-specific benefit that justifies adding OKF, WebMCP, or a second full-text copy during this pass.

## Presence and competitive observations

- Branded searches surfaced the site, Mike's Skool profile, and two directory results: [SkoolRank](https://skoolrank.com/en/c/ai-automation-station-7346) and [Skool Inspector](https://skoolinspector.evyai.com/community/ai-income-lab). Search snippets associate the community with Mike Holp. Direct retrieval of the directory pages failed in the browsing tool, so their prices, accuracy, independence, and review quality were not verified.
- Search also surfaced a [podcast episode naming Mike and linking the channel](https://podcasts.apple.com/lb/podcast/building-a-thriving-online-community-with-mike-hulp/id1670018916?i=1000725969370). Its episode title spells the surname “Hulp”; direct page retrieval failed, so inspect the live listing before proposing a correction. No message was sent.
- A non-branded “Claude Code vs Codex real workflow comparison” search surfaced competing comparison pages from Zapier, Voyager, DataCamp, and other publishers. This is search discovery evidence, not an AI citation leaderboard or a controlled ranking study. Differentiate the existing guide through reproducible tasks, inputs, outputs, versions, failures, and human review rather than another generic feature list.
- The [official n8n education page](https://n8n.io/education/) surfaced for a community/course search. It provides a free learning alternative. The homepage already distinguishes AI Income Lab through course access, community help, and VIP coaching; substantiate those benefits with permissioned examples rather than unsupported success claims.

## Priorities after the local corrections

1. **Establish a citation and recommendation baseline.** Use the prompt portfolio below, three runs per platform initially. Record raw answers and source URLs. An unavailable engine or missing AI Overview is not a zero citation rate.
2. **Verify commercial facts at their owning sources.** Check annual billing, course access, product status, and cancellation wording when offers change. Keep the homepage and overview synchronized; an updated date alone is not a content refresh.
3. **Publish one reproducible build receipt.** Prefer an existing Make or coding-agent workflow with exact inputs, expected outputs, failure cases, run date, versions, costs, and limits. The current Make exercise explicitly does not claim a live Make-account run; retain that distinction until it is actually tested.
4. **Review independent mentions.** Verify directory identity and current offers before correcting anything; preserve the “AI Income Lab by Mike Holp” disambiguation. Measure which outside sources real AI answers use before choosing outreach targets. Directory listings alone do not prove recommendation authority.
5. **Resolve the existing verification failures.** Investigate the tests listed below before claiming the whole repository is green. Some assertions depend on exact source formatting or fixed dates; a failing assertion is not by itself proof of a live SEO defect.

## Prompt portfolio for the baseline

These are proposed business-relevant prompts, not measured demand. Select English and the intended buyer market, keep platform/model/search settings consistent, and record the exact run date. Repeat each prompt three times on ChatGPT Search, Perplexity, and Google Search's AI surface when available.

| Prompt | Owning page / intended outcome |
|---|---|
| What is AI Income Lab by Mike Holp? | Homepage + about; accurate identity |
| How much does Mike Holp's AI Income Lab cost monthly and yearly? | Homepage pricing + Skool plans; correct billing |
| What is the difference between AI Income Lab Standard, Premium and VIP? | Homepage pricing; correct plan fit |
| Does AI Income Lab include weekly coaching and n8n templates? | Homepage pricing/FAQ; correct VIP benefits |
| Is AI Income Lab suitable if I have never built an automation? | Homepage + start here; qualified fit |
| Where can I learn AI automation with courses and help while I build? | Homepage + third-party evidence; recommendation |
| Can I follow AI Automation Station tutorials without paying for the community? | Guides + homepage; free vs paid accuracy |
| What extra tools or API costs should I budget for AI automation training? | Homepage FAQ + workflow cost tool; cost clarity |
| How do I build a Make Google Sheets workflow that filters approved requests? | Make starter guide; practical citation |
| How do I choose between Claude Code and Codex for a real project? | Comparison guide; evidence-based citation |
| How do I sell a small AI automation service to a business? | Small-business services guide; useful citation |
| What is the difference between fixed AI workflows and AI agents? | Agentic AI comparison guide; qualified learning path |

For each run record: prompt, engine, model if exposed, search mode, locale, timestamp, response/source links, own page retrieved (if observable), own page cited, brand mentioned, brand recommended, competing brands recommended, and factual errors. Report citations and recommendations separately as `x/n` for comparable runs. Do not count this audit's web results as those runs. Review monthly; inspect factual errors immediately. Google AI-feature traffic is included in Search Console's Web reporting rather than a separate AI-only report, per [Google's measurement guidance](https://developers.google.com/search/docs/appearance/ai-features).

## Validation and delivery

- `npm.cmd run lint`: passed.
- Production client build with `node node_modules/vite/bin/vite.js build`, followed by `node scripts/prerender.js`: passed, using the saved video snapshot. The network-refresh portion of `npm run build` was not run. Vite emitted dependency `use client` warnings from Vercel analytics packages.
- Inspected built `dist/index.html` and `dist/llms.txt`: verified both overview links, the product-status fragment, official plans link, matching availability, and removal of the obsolete trial/$19 offer.
- Full test suite: **266 passed, 6 failed, 272 total**. Failures: stylesheet hashes (`src/asset-version.test.js:7`); guide next steps (`src/guides.test.js:108`); guide titles/sections (`:181`); hub search markup (`:220`); FAQ extraction/parity (`:306`, first reported guide `9router-setup.html`); fixed sitemap date (`src/seo-improvements.test.js:6`). The relevant guide, CSS, and sitemap files were not edited in this run. No failing assertion was relaxed.
- Local changes are ready for review and have not been deployed. Citation monitoring remains outstanding; no engine-specific visibility improvement has been measured.

## Release validation ? November 8, 2026

Prepared in an isolated checkout of current `main` (`297bedc`), preserving newer published metadata, guide descriptions, and homepage categories. Only the four AI SEO diff hunks and these audit records are included. Lint, production client build, prerender, and built overview checks pass. The updated main branch has 281 tests: 276 pass and 5 fail (the stylesheet-version test and four existing guide checks listed above). The uncommitted fixed-date sitemap test from the original workspace is excluded from this release.
