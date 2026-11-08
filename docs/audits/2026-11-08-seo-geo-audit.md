# SEO/GEO audit — 2026-11-08

Site: https://www.ai-automation-station.com/ · Skill: seo-geo · Framing follows Google's AI optimization guide: GEO is SEO fundamentals applied to AI-search surfaces.

This builds on the 2026-10-11 GEO audit and the 2026-11-08 new-guides keyword audit. It does not repeat their keyword tables; it re-verifies the live site and ranks what is still open. No code was changed.

## Evidence and limits

- Live checks today: homepage, robots.txt, sitemap.xml (96 URLs), video-sitemap.xml (226 URLs), llms.txt, one guide (`grokbot-for-beginners`), one watch page (`IV6q81wRay4`), the about page, and seven bot user agents against the homepage.
- Repo counts across all 63 files in `public/guides/`.
- **Not verified:** Search Console data, AI citation frequency, Reddit/Wikipedia/LinkedIn mentions, field Core Web Vitals. The brand-mention section is therefore a gap statement, not a measurement.

## GEO readiness: 78/100 (estimate)

| Area (weight) | Score | Basis |
|---|---:|---|
| Citability (25%) | 19/25 | Guides open with a quick-answer paragraph, Q&A FAQ blocks, specific build notes. Newer guides lack a "What is X" definition where the SERP wants one. |
| Structure (20%) | 17/20 | One H1, 9–16 H2s, TOC, FAQ on guides. Title, H1 and `headline` differ on every guide. |
| Multi-modal (15%) | 13/15 | Every guide embeds a video and hero image; watch pages carry chapters and Clip markup. |
| Authority/brand (20%) | 14/20 | Person + Organization + sameAs on about page; dates present. Off-site mention presence unmeasured. |
| Technical access (20%) | 15/20 | Fully prerendered, all bots allowed, sitemaps fresh. Hero image is lazy on all 63 guides; new guides miss VideoObject. |

Platform view: Google AI Overviews/AI Mode depend on classic ranking, which is the weak point (the 2026-11-08 audit found none of the site's pages in the top 8 for eight target queries). ChatGPT/Perplexity lean on YouTube and Reddit; the YouTube channel is the site's strongest asset there.

## AI crawler access (checked per bot, per capability)

Robots.txt is `User-agent: * / Allow: /` with both sitemaps listed. No per-bot rules, so everything is allowed. Each returned 200 on the homepage.

| Capability | Bot | Status |
|---|---|---|
| Google Search / AI Overviews / AI Mode | Googlebot | Allowed |
| ChatGPT Search citability | OAI-SearchBot | Allowed |
| Claude search citability | Claude-SearchBot | Allowed |
| Perplexity search | PerplexityBot | Allowed |
| OpenAI training | GPTBot | Allowed |
| Anthropic training | ClaudeBot | Allowed |
| Gemini/Vertex training and grounding | Google-Extended | Allowed |

Training bots being allowed is a licensing choice, not a visibility one. For a creator whose goal is being recommended, leaving them open is reasonable. Not tested: Applebot, Applebot-Extended, CCBot. User-triggered fetchers (ChatGPT-User, Claude-User, Google-Agent) ignore robots.txt by design.

## Server-side rendering

Pass. `build` runs `vite build` then `scripts/prerender.js`. Homepage is 42 KB of HTML with all headings, guide and video titles present in the initial response; the watch page and guide page are complete HTML with JSON-LD. AI crawlers that skip JavaScript see the full content.

## llms.txt

Present, 21 KB, well structured (identity disambiguation, key facts, official pages, topic links). Google says it neither helps nor hurts Search; it may serve other systems. Keep it, do not spend more time on it. The disambiguation line ("AI Income Lab here means…") is the useful part.

## Brand mentions

Not measured today. The site has `sameAs` on the about page (YouTube, GitHub, LinkedIn, X). Per the Ahrefs study in the skill, YouTube mentions are the strongest correlate of AI visibility, which favors this site's structure. Open gap: no evidence of Reddit or third-party discussion of "AI Automation Station" or "AI Income Lab". Check manually before investing.

## Passage-level citability

Strengths: quick-answer paragraphs, 5-question FAQs, first-hand test notes (for example the Muse Code failure write-up) that are unique data no other page has.

Weak spots from the 2026-11-08 SERP review: DeepSeek Harness and Jev SERPs reward a definition; those pages have none near the top. Add a self-contained 40–60 word "X is…" under the quick answer on both.

## Top 5 highest-impact changes

1. **Make the hero image eager on all 63 guides.** Every guide's hero `<img>` has `loading="lazy"` (63 of 63). That is the LCP element, and Lighthouse flagged it on Nov 6. Guides are hand-edited static HTML, so this is one scripted change: first `assets/guides/` image gets `loading="eager" fetchpriority="high"`, nothing else. Check `src/guides.test.js` first; it asserts on the hub images, not hero images.
2. **Add VideoObject schema to guides that embed a video.** Correction after implementation: the first count (49 guides without it) included guides with no video at all. Only `herdr-desktop-app` embedded a video without the markup; the 22 new guides had it added in da22dcf.
3. **Align keyword lead across title, H1 and Article `headline`.** All three are different strings on every sampled guide (for example `grokbot-for-beginners`: title "…First Bot, Access and Approvals", H1 "…Set Up Your First AI Bot"). Google rewrites titles when they disagree with the H1. Do this together with the keyword retitles from the 2026-11-08 audit; `src/aas-new-guides.test.js` hard-codes all 22 titles, descriptions and H1s, so update its table in the same commit.
4. **GrokBot hub.** Head term "grokbot" is 49,500/mo with a weak SERP (Facebook, YouTube, Medium). Use `grokbot-for-beginners` as the hub: add "Grok Bot" in the intro and FAQ, and link to it with "GrokBot" anchor text from the other four GrokBot guides. Highest keyword payoff in the 2026-11-08 data.
5. **Add "What is X" definitions to DeepSeek Harness and Jev guides, and "Meta" to the Muse Code title.** Matches SERP intent; cheap; also the most quotable passage for AI answers.

## Schema recommendations

- Guides: Article, BreadcrumbList, FAQPage, Person author present everywhere. Missing: VideoObject on 49. Note FAQPage no longer produces rich results for most sites; keep it for readers, do not count it as a ranking lever.
- Watch pages: VideoObject with Clip chapters and WatchAction. Good. No change.
- About: Person, Organization, ProfilePage, sameAs. Good. Add `knowsAbout` or `alumniOf` only if true and verifiable.
- Homepage: one JSON-LD block; earlier audits found no parse failures.

## Content reformatting suggestions

- Hero alt text on guides is a caption sentence ("Diagram: Shared box, separate desktops, explicit approval."). Describe the image and name the topic.
- Four descriptions are 158–160 characters (`muse-code-setup`, `jev-skills-router-setup`, `grokbot-for-seo`, `grokbot-vs-dots`). Trim to 155.
- Herdr: two guides target "herdr". Keep the TUI guide as head page; the desktop guide should say it is the desktop variant and link up.
- Three guides have one inbound guide link: `cleanyourtv-claude-code`, `jev-skills-router-setup`, `opendesign-linux-slides`. Add one contextual link each from a related older guide.

## Recency

Sitemap lastmod: 50 URLs on 2026-11-07, 8 on 11-06, 1 on 11-08, 4 older. Publishing cadence is strong; the skill's finding that content under three months old is cited far more often favors this site. Set a refresh pass for the older guides before they cross about 6 months.

## What not to do

- No keyword work for the five zero-demand guides; they serve video viewers.
- Do not chase "ai visibility tracking" (listicle SERP).
- No further llms.txt work.
- Do not claim the optimizations above will lift rankings; the site has little Search Console data to steer on.

## Next measurements

- Search Console: re-inspect the 22 new guides for indexing; re-pull queries in 2–3 weeks.
- Run fresh mobile PageSpeed on one guide after fix 1 to confirm LCP changed.
- Manual check of Reddit and YouTube mentions of the brand names.

## Implementation (2026-11-08, uncommitted)

- Hero image eager with `fetchpriority="high"`: remaining 41 older guides (the 22 new ones were done in da22dcf). 63 of 63 now eager.
- VideoObject added to `herdr-desktop-app` from its live watch-page data. The other 27 guides without it embed no video, so none was added.
- H1, Article `headline` and breadcrumb names now equal the `<title>` text on the 19 guides whose keyword lead differed; hub card text, `llms.txt` and the 22-guide test table updated to match.
- GrokBot hub links and DeepSeek/Jev definitions were already present from da22dcf.
- `npm test`: 267/267 pass; eslint clean.
