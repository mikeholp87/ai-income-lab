# SXO findings: www.ai-automation-station.com

Audit date: 2026-10-28. Skill: `seo-sxo` v2.3.1 (Search Experience Optimization).
The SXO Gap Score is **separate from the SEO Health Score**. It measures how well a page matches what the search results reward, not technical health.

## Method and evidence

- Page data comes from `evidence/crawl.json` (274 pages: title, H1, headings, word count, schema, images, links) and the repo's HTML in `public/guides/*.html`.
- SERP data comes from 8 live web searches on 2026-10-28. Each search returned 5 organic results, so every consensus figure below uses a sample of 5, not Google's top 10.
- The search tool doesn't expose People Also Ask, ads, AI Overviews or related searches. The user stories and personas are therefore built from result content (headings, tables, pricing language), not from those SERP features.
- Page types follow the `seo-sxo` taxonomy: landing page, hub/collection, how-to/guide, listicle, comparison, service page.

## Summary table

| Page | Inferred target query | SERP dominant type (n=5) | Our page type | Verdict | SXO Gap Score |
|---|---|---|---|---|---|
| `/` | AI automation community / course | Community or course landing page (5/5) | Community landing page | ALIGNED | 83/100 |
| `/start-here.html` | how to start with AI automation / first AI automation project | Beginner how-to guide (5/5) | Hub/router (554 words, 0 images) | MISMATCH (Medium) | 54/100 |
| `/guides.html` | AI automation tutorials / guides | Vendor docs and academies (5/5: n8n Docs, Make Developer Hub, Make Academy, Make Skills) | Collection hub | Type aligned, low chance of winning | not scored (navigational hub) |
| `/guides/make-money-with-ai-fast.html` | how to make money with AI fast | Ranked listicle (4/4 competitors) | Editorial guide with options and FAQ | ALIGNED (format differs); **our page is result #1** | 80/100 |
| `/guides/claude-code-vs-codex.html` | Claude Code vs Codex | Comparison page with a feature, pricing and benchmark matrix (5/5) | Comparison (1 table, experience-led) | ALIGNED, depth gap | 72/100 |
| `/guides/ai-automation-services-small-business.html` | AI automation services for small business | Agency service landing page (4/5) | Seller-side how-to guide | **MISMATCH (High)** | 61/100 for the head term; about 80 for the seller query |

## Per-page analysis

### 1. Homepage `/`: ALIGNED

- **SERP for "AI automation community course":** aiautomationsociety.ai (free plus $129/mo), three Skool `/about` pages (AI Automation (A-Z), free, 171.5k members; AI Launchpad, free, 40.5k; AutomationX, free, 4.4k), and houseofloops.com/course (a syllabus page). All five are community or course landing pages, so consensus is strong.
- **Brand SERPs:**
  - "AI Automation Station Mike Holp": our pages fill 4 of 5 results (`/`, `/videos`, `/guides.html`, `/start-here.html`).
  - "AI Income Lab": our homepage is #1, followed by the Skool `/about` page (twice), checkthecourse.com, and **a different community, skool.com/ai-income-lab by John Coma**.
- **Page:** title "AI Income Lab: AI Automation Courses & Community". It carries the H1, pricing (Standard $29, Premium $49, VIP $89), a classroom list, an FAQ, 10 Skool links and Person/Organization/WebSite schema.
- **Gap:** the heading outline in `crawl.json` puts three separate audiences on one page:
  - the learner (community and plans);
  - the SaaS buyer (TubeAnalytics, VisiScan);
  - the sponsor ("Audience insights.", "99 of every 100 viewers are men.", "What I offer.", "Multi-platform campaign", "Dedicated video", "Sponsored builds.", "Sponsor a video or work together.").

| Dimension | Score | Note |
|---|---|---|
| Page type | 15/15 | Community landing page, matching the SERP |
| Content depth | 12/15 | 1,968 words, with plans, classroom and FAQ |
| UX signals | 10/15 | Clear plan CTAs, but sponsor and SaaS sections dilute the learner path |
| Schema | 11/15 | Person, Organization, WebSite; no Offer markup for the three plans |
| Media | 14/15 | 29 images plus the latest-video embed |
| Authority | 12/15 | 2,900+ members, 533K views, maker timeline since 2013 |
| Freshness | 9/10 | Latest upload is dated Oct 27, 2026 |
| **Total** | **83/100** | |

### 2. `/start-here.html`: MISMATCH (Medium)

- **SERP for "how to start AI automation / first project":** ziplines.com, williamspurlock.com, automatenexus.com, gab.ai, toolbit.ai. All five are long step-by-step beginner guides built around a trigger, an AI step and an action, with time-boxed checklists.
- **Page:** a 554-word router with 4 H2 choices, 0 images, and the title "Choose your first AI build | Mike Holp". The title and H1 never use the words people search ("AI automation" appears only in the H1 phrase "first AI automation project").
- **Missed handoff:** the site already has the page type that SERP rewards, `/guides/ai-automation.html` (2,663 words, "What Is AI Automation? Examples, Tools and a First Build"). But `/start-here.html` **does not link to it**. Its incoming sources are 9 guides, 5 watch pages, `/` and `/guides.html`; start-here isn't one of them.
- **Scores:** page type 7, depth 6, UX 12, schema 10, media 2, authority 8, freshness 9, for a **total of 54/100**.

### 3. `/guides.html`: hub, low chance of ranking

The SERP for tutorial queries is 5/5 first-party vendor documentation and academies. As a collection hub it does its job: it's sectioned by topic, with a CollectionPage schema and a Skool CTA. It shouldn't be treated as a ranking target. Its value is distributing links and authority to the guides.

### 4. `/guides/make-money-with-ai-fast.html`: ALIGNED, format note

- **SERP:** our page is result #1. Four of the competing results are ranked listicles:
  - ClickUp "15 Proven Ways";
  - money-lab.app "10 Ideas That Actually Pay", with a table of buyer rates and time to first dollar;
  - Foundable "6 Real Ways";
  - Wright Mode "10 Ways … Ranked by How Fast You Get Paid".
- **Page:** 2,068 words, an honest-path framing, 4 options as H3s, a scams section, an FAQ (5 questions), Article, FAQPage and BreadcrumbList schema, and 6 images. There's no video and no watch-page link.
- **Format gap:** competitors summarise speed in a scannable table (option → effort → typical time to first payment). Our page deliberately gives no calendar numbers ("I will not give you a calendar number"). That's a defensible trust choice. A qualitative table (effort, who pays, what you can check, main risk) would match the expected format without making income claims.
- **Weak internal support:** the page has only **3 incoming internal sources** (`/`, `/guides.html`, and 1 guide), the fewest of any money guide. See `clusters.md`.
- **Scores:** type 13, depth 13, UX 12, schema 13, media 8, authority 11, freshness 10, for a **total of 80/100**.

### 5. `/guides/claude-code-vs-codex.html`: ALIGNED, depth gap

- **SERP:** Zapier, Superblocks, Artificial Analysis, TechRepublic and GenAI Brief. All five are comparisons, and all five use matrices. Their rows cover entry price ($20 for each), default models, sandbox defaults, context window, MCP and hooks, platforms, and benchmark, cost and time per task.
- **Page:** 1,860 words with one table. Its rows are only "Signed in with", "Kept safe by", "Routed to", "Reviews" and "Where it sits". The HTML contains a single `$` price mention.
- **Strength:** the first-hand routing and safety setup is something no ranking competitor offers. Keep it; it is the E-E-A-T differentiator.
- **Gap:** the table has no factual rows for price, plans, default model, platforms (Linux/Windows), sandbox default or MCP support. There's also no "Which should you choose?" section broken down by persona.
- **Scores:** type 15, depth 9, UX 11, schema 10 (Article and Breadcrumb), media 10, authority 12, freshness 5 (dateModified is 2026-10-22, while competitors are titled "October 2026" and quote current model versions), for a **total of 72/100**.

### 6. `/guides/ai-automation-services-small-business.html`: MISMATCH (High)

- **SERP for the head term:** 4 of 5 results are agency service pages selling to owners (be-genius.com, aisolutionsforsmallbiz.com, automatenexus.com, scalemeai.com). The fifth is an agency pricing article (taskip.net). That's 80% consensus for "service page, buyer intent".
- **Page:** a seller-side how-to on discovery, scope, pricing and handover. Its first H2 hedges toward buyers ("Buying AI automation services: how to judge a provider"), and then H2s 1–10 address the seller.
- **Better query fit:** "how to sell AI automation services to small businesses" returns **5/5 seller how-to guides** (ciela.ai, boostlocalbiz.com, tickd.ai, consultkit.ai, aisynergy.ai). Those cover discovery, scope, pricing and maintenance, which is exactly this page's outline.
- **Head-term scores:** type 3, depth 13, UX 10, schema 12, media 8, authority 10, freshness 5 (dateModified 2026-10-23), for a **total of 61/100**. Against the seller query the type score rises to 15, putting the page at about 80.

## User stories (from SERP content)

1. As an **aspiring AI freelancer**, I want a first paid task I can deliver this month, because competitors promise "first dollar in 1–2 weeks" (money-lab.app), but I'm blocked because I don't know which option fits my skills or how risky it is.
2. As a **beginner automator**, I want to build one trigger → AI → action workflow in under an hour, because every guide in the "how to start" SERP is time-boxed, but I'm blocked when the start page asks me to choose a path before showing me what AI automation is.
3. As a **developer choosing a coding agent**, I want price, models and safety defaults side by side, because every comparison in the SERP leads with a matrix, but I'm blocked because the site's table describes only Mike's own setup.
4. As a **small business owner**, I want to hire someone to automate one workflow at a fixed price, because 4 of 5 results publish prices and offer a free audit, but I'm blocked because the page is written for the person selling the service.
5. As a **viewer weighing the community**, I want to know what's included before I pay, because every competing community in the SERP has a free front door, but I'm blocked because AI Income Lab starts at $29/month with no free tier, and the homepage also pitches sponsors.

## Persona scores (analyst judgement, 25 points per dimension)

Each persona is scored on the page that serves it best.

| Persona | Page scored | Relevance | Clarity | Trust | Action | Total | Weakest point → fix |
|---|---|---|---|---|---|---|---|
| Small business owner (buyer) | `/guides/ai-automation-services-small-business.html` | 8 | 10 | 16 | 4 | **38** | No buyer offer on the site. Retarget the page to sellers (finding SXO-1) instead of chasing this persona. |
| Beginner starting AI automation | `/start-here.html` | 15 | 18 | 14 | 12 | **59** | No link to `/guides/ai-automation.html` and no visuals. Add an "Understand AI automation first" step. |
| Developer comparing coding agents | `/guides/claude-code-vs-codex.html` | 18 | 15 | 20 | 14 | **67** | Missing price, model and platform rows, and no persona verdict. |
| Aspiring AI freelancer / side income | `/guides/make-money-with-ai-fast.html` | 21 | 17 | 23 | 15 | **76** | No scannable options table; the Skool CTA comes only after the Sources section. |
| Viewer weighing the paid community | `/` | 22 | 17 | 20 | 21 | **80** | Sponsor and SaaS sections dilute the page; no free or lower-commitment step except a footer email box. |

## Conversion path to Skool (AI Income Lab)

- **What works:**
  - 271 of 274 pages link to `skool.com/ai-automation-station-7346/plans`: all 24 guides, all 220 watch pages, and every `/videos` page.
  - Watch pages carry a header CTA, "Join AI Income Lab ↗", tagged `data-placement="watch_header"` (`src/archive.js` line 257), so clicks can be attributed.
  - Every guide ends with a "Don't build the next one alone." CTA block.
  - `/start-here.html` deep-links the Skool `/classroom`.
- **Gap 1, paid-only path from cold search:** the competing communities in the SERP (AI Automation Society, AI Automation (A-Z), AI Launchpad, AutomationX) all offer a free tier. The only lower-commitment step here is the "Weekly build notes" email signup. It appears on all 24 guides and the homepage, but **not on the 220 watch pages (80% of URLs), the `/videos` hubs, `/start-here.html` or `/guides.html`**.
- **Gap 2, intent mismatch at the CTA:** guide CTAs point to `/plans` (pricing) rather than to `/about` or `/classroom`, even for top-of-funnel informational readers (the money guides and "what is AI automation").

## Findings

### SXO-1: Small-business services guide targets a buyer SERP but is written for sellers. Severity: **High**

- **Evidence:** 4/5 results for "AI automation services for small business" are agency service pages, while 5/5 results for "how to sell AI automation services to small businesses" are seller guides that match the page's H2 outline. The title, H1 and meta lead with the head term, and the first H2 is "Buying AI automation services: how to judge a provider".
- **Recommendation:**
  - In `public/guides/ai-automation-services-small-business.html`, retitle and re-describe the page for the seller query, e.g. "How to sell AI automation services to small businesses: scope, price, hand over". Keep the URL to avoid a redirect.
  - Move the buyer H2 lower or into an FAQ.
  - Update the matching card and anchors in `public/guides.html` and the linking guides.

### SXO-2: `/start-here.html` doesn't route beginners to the page type Google rewards. Severity: **Medium**

- **Evidence:** the SERP is 5/5 beginner how-tos. Start-here is a 554-word router with 0 images and no link to `/guides/ai-automation.html` (verified in the internal-link graph).
- **Recommendation:** in `public/start-here.html`, add a step 0, "New to this? Read *What is AI automation? Examples, tools and a first build*", with that descriptive anchor, plus one diagram or screenshot per path. Let `/guides/ai-automation.html` own the beginner query.

### SXO-3: Coding-agent comparison table lacks the factual rows every ranking competitor has. Severity: **Medium**

- **Evidence:** the 5/5 SERP matrices cover price, model, sandbox, MCP and platforms. Our table rows are setup-specific only, with one `$` mention in the page.
- **Recommendation:** in `public/guides/claude-code-vs-codex.html`, add rows for entry plan and price, default model, Linux/Windows/macOS support, sandbox default, MCP and instructions file (`CLAUDE.md` vs `AGENTS.md`), each with a source link. Add a short "Which should you pick?" section for beginners, solo developers and people already on Claude or ChatGPT. Refresh `dateModified`.

### SXO-4: Homepage serves three audiences (learners, SaaS buyers, sponsors). Severity: **Medium**

- **Evidence:** the `crawl.json` headings run from "Your next build, with support." to "Two products I built and run." to "Audience insights." ("99 of every 100 viewers are men."), "What I offer." (rate card) and "Sponsored builds." This is the commercial landing page for "AI Income Lab".
- **Recommendation:** move the sponsor media kit (audience insights, packages, sponsored builds, contact form) from the homepage component in `src/main.jsx` to a dedicated `/sponsor` or `/work-with-me` page linked from the footer. Keep the homepage focused on community, classroom, proof and FAQ.

### SXO-5: No email capture on watch pages, video hubs, start-here or the guides hub. Severity: **Medium**

- **Evidence:** "Weekly build notes" appears in 24/24 guides but 0 times in `src/archive.js`, `public/start-here.html` or `public/guides.html`. Watch pages are 220 of 274 URLs. Every competing community in the SERP has a free entry point; AI Income Lab starts at $29.
- **Recommendation:** add the existing notes-signup block to the `renderWatch` and `renderArchive` templates in `src/archive.js`, and to `public/start-here.html`. For informational guides, consider pointing the end-of-guide CTA at Skool `/about` (what's inside) rather than `/plans`.

### SXO-6: "Make money with AI fast" lacks a scannable options table. Severity: **Low**

- **Evidence:** 4/4 competing results are ranked lists, and money-lab.app uses a rate and time table. Our page ranks #1 in this sample, so **protect it rather than rewrite it**.
- **Recommendation:** in `public/guides/make-money-with-ai-fast.html`, add a qualitative comparison table under "Lowest-effort honest options" (effort, who pays, what you can check yourself, main risk) with no income figures.

### SXO-7: Another Skool community named "Ai Income Lab" ranks for the brand. Severity: **Low**

- **Evidence:** the "AI Income Lab" brand SERP returns `skool.com/ai-income-lab` (John Coma) as result #5.
- **Recommendation:** Organization `sameAs` already lists YouTube and Skool in `index.html`. Add Organization `alternateName: "AI Automation Station"`, and pair the brand as "AI Income Lab by Mike Holp" in the homepage title or meta description so the two communities are easy to tell apart.

### SXO-8: Guides hub competes with vendor documentation. Severity: **Info**

- **Evidence:** 5/5 results for tutorial queries are n8n and Make first-party documentation.
- **Recommendation:** none needed. Treat `/guides.html` as a link-distribution hub, not a ranking target.

## What works

- The brand SERP is owned: the site holds 4 of 5 results for "AI Automation Station Mike Holp" and #1 for "AI Income Lab".
- `/guides/make-money-with-ai-fast.html` is the #1 result for its target query in this sample. Its honest framing with no income claims (FTC link, scam section) is a real trust differentiator against listicle competitors.
- The guide types already match their SERPs for coding-agent comparisons and money queries, and the guides carry Article and Breadcrumb schema.
- The Skool CTA reaches 271/274 pages, and watch-page placement is tagged for attribution.

## Limitations

- Each SERP sample is the 5 results from the search tool, not a Google top 10. People Also Ask, ads, AI Overviews and related searches weren't available.
- No search volume data was used (the Keywords Everywhere and DataForSEO keys aren't configured).
- Pages weren't re-rendered with `render_page.py`. The analysis uses the 2026-10-28 crawl (`evidence/crawl.json`) plus the repo HTML.
- Persona scores are analyst judgement grounded in the evidence above. They aren't user-tested.

## Hand-offs to other skills

- `/seo schema`: Offer markup for the homepage plans; Organization `alternateName`.
- `/seo content`: freshness and E-E-A-T for the coding-agent comparison.
- `clusters.md`: internal-link fixes for the money guides and the start-here → pillar link.
