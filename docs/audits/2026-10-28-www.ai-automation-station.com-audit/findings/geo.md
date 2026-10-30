# GEO / AI Search Readiness — www.ai-automation-station.com

Audit date: 2026-10-28. Method: live `curl` checks (robots.txt, llms.txt, 15 user agents), local source in `public/`, crawl evidence (`evidence/crawl.json`, 274 pages), and web searches for brand mentions. No site files were modified.

Framing: Google treats GEO as ordinary SEO applied to AI search surfaces. `llms.txt` carries no weight with Google, so it is scored here only for non-Google systems.

## AI Search Readiness score: 74 / 100

| Dimension (weight) | Score | Basis |
|---|---|---|
| Citability (25) | 19 | Guides open with direct answers and definitions, link to primary sources, and include first-hand testing. The income guides are weaker. |
| Structural readability (20) | 15 | Clean H1/H2/H3 hierarchy, FAQ blocks on 13 of 24 guides, tables on 11 of 24. Question-style headings are uneven. |
| Multi-modal (15) | 12 | Images and video links on guides, plus VideoObject markup on watch pages. Watch pages have no transcript text. |
| Authority and brand (20) | 10 | Byline and visible published/updated dates on every guide. Third-party mentions are thin, the brand name collides with another community, and entity markup is inconsistent. |
| Technical access (20) | 18 | Static, server-rendered HTML. All AI crawlers allowed and served identical content. `llms.txt` is present. |

Platform view:

- **Google AI Overviews / AI Mode: about 75.** Content and technical basics are strong. The ceiling is set by ranking position and weak entity signals.
- **ChatGPT Search: about 70.** `OAI-SearchBot` is allowed. ChatGPT leans on Wikipedia and Reddit, and the brand has no presence on either.
- **Perplexity: about 65.** `PerplexityBot` is allowed. No Reddit or community discussion of the brand was found.
- **Claude search: about 72.** `Claude-SearchBot` is allowed.

## AI crawler access (live, 2026-10-28)

`robots.txt` contains only `User-agent: * / Allow: /` and two sitemaps. There are no per-bot groups, so every crawler below inherits `Allow: /`.

I requested `/`, `/guides/claude-code-vs-codex.html`, and `/llms.txt` with each user agent. Every request returned **HTTP 200** with byte counts identical to a normal browser (54,858 B, 20,162 B, and 4,402 B). Response headers show `server: Vercel` and `x-vercel-cache: HIT`, with no challenge or mitigation header. Vercel is not blocking any of these crawlers by user agent.

**Caveat:** these were spoofed user agents sent from a non-crawler IP address. A Vercel rule that checks verified bots by IP address cannot be ruled out from here. Confirm in Vercel Firewall logs.

Search and citation crawlers:

| User agent | Capability it governs | robots.txt | Live fetch |
|---|---|---|---|
| Googlebot | Google Search, AI Overviews, AI Mode | allowed (via `*`) | 200 |
| OAI-SearchBot | ChatGPT Search citations | allowed | 200 |
| Claude-SearchBot | Claude search citations | allowed | 200 |
| PerplexityBot | Perplexity search | allowed | 200 |
| Applebot | Siri, Spotlight, Safari | allowed | 200 |
| bingbot | Bing and Copilot | allowed | 200 |

Training crawlers (a licensing choice, not a visibility signal):

| User agent | Capability it governs | robots.txt | Live fetch |
|---|---|---|---|
| GPTBot | OpenAI model training | allowed | 200 |
| ClaudeBot | Anthropic model training | allowed | 200 |
| Google-Extended | Gemini and Vertex training/grounding (not Google Search) | allowed | 200 |
| Applebot-Extended | Apple Intelligence training opt-out (label only) | allowed | n/a |
| CCBot | Common Crawl | allowed | 200 |
| Bytespider | ByteDance | allowed | 200 |

User-triggered fetchers ignore robots.txt by design. ChatGPT-User, Claude-User, and Perplexity-User all returned 200.

## llms.txt status

- `/llms.txt`: **200**, 4,402 B, `text/plain` (source: `public/llms.txt`). It has a valid H1, a summary, key facts (prices, member count, income disclaimer), official links, all 24 guides, and a support email.
- `/llms-full.txt`: 404. `/.well-known/llms.txt`: 404.
- Gaps:
  - Guide links have no `: description` suffix.
  - The `/videos/*` topic hubs are not listed.
  - The H1 names "AI Automation Station" but not "AI Income Lab".
  - There is no last-updated line.

## Sampled page citability

### 1. `/guides/claude-code-vs-codex.html` (1,860 words) — High

- Opens with a definition: "Claude Code and Codex are both coding agents you run from a terminal."
- Has a dated "The short answer (October 2026)" H2 with conditional recommendations ("Pick Claude Code if… Pick Codex if…").
- Includes 1 comparison table, 8 lists, and a Sources section with 5 official doc links (code.claude.com, developers.openai.com).
- First-hand framing: "one person's working arrangement, not a benchmark."
- Byline is Mike Holp, published 2026-10-10, updated 2026-10-22.
- Weaknesses:
  - Only 3 of 14 headings are question-style.
  - It has no FAQPage block, unlike most other comparison guides.

### 2. `/guides/ai-automation.html` (2,663 words) — Very high

- The first sentence is a 45-word "Quick answer" definition, an ideal extractable block.
- "What is AI automation?" is an H2, and there are 7 FAQ H3 questions with matching FAQPage schema. 10 of 31 headings are question-style.
- Five named example H3s, 1 table, and 17 external sources (official pricing and docs for Zapier, Make, n8n, OpenAI, and Claude).
- Published 2026-10-23, updated 2026-10-24.
- This is the template the other guides should follow.

### 3. `/guides/codex-usage-limits.html` (1,627 words) — High

- Opens with a "Quick answer" that points to the exact place to check (Settings → Usage, `/status`).
- States "Official sources checked as of October 24, 2026", an explicit freshness claim.
- 5 FAQ questions phrased the way people search ("Does starting a new chat reset the limit?").
- 7 OpenAI help and docs sources, and 1 table of limits by plan.
- First-hand data: "The recorded sign-in fix: April 2026."
- Weakness: freshness-sensitive pricing content. Recency matters most here, so it needs a refresh schedule.

### 4. `/guides/make-money-with-ai-no-experience.html` (1,883 words) — Medium

- Good answer-first opening ("To make money with AI with no experience, start with a task you already understand…") and 4 FAQ questions.
- **Zero external links, no Sources section, no table, no figures** (no earnings ranges, time-to-first-client, or price examples backed by data).
- This is an income topic close to "your money or your life" territory. An answer engine has nothing verifiable to quote beyond advice.

### 5. `/guides/self-host-n8n.html` (1,108 words) — Medium-high

- Opens with a definition ("n8n is a workflow automation tool you can run yourself…").
- Includes a first-hand correction to the author's own video ("current n8n needs a newer Node.js than Ubuntu installs by default").
- 4 official sources (docs.n8n.io, nodejs.org).
- Weaknesses:
  - No FAQPage and no table.
  - Only 1 question-style heading.
  - Steps are numbered H2s with no "How to self-host n8n" summary block.

### Sitewide guide pattern (all 24 guides)

- All 24 have Article and BreadcrumbList schema, a byline, and visible Published/Updated dates. 13 also have FAQPage.
- 22 of 24 have a Sources section. The two without one are `ai-side-hustles.html` and `make-money-with-ai-no-experience.html`.
- 10 of 24 open with a "Quick answer" or "short answer" block in the first 60 words.
- 11 of 24 contain a table.

## What works

1. **Fully server-rendered static HTML.** Guides are plain `.html` and the homepage carries about 2,089 visible words in its raw HTML. Nothing depends on JavaScript for crawlers.
2. **Open crawler policy, verified live.** Every major AI search and training crawler gets the same 200 response.
3. **Strong authorship and freshness.** Every guide has a byline linked to a Person `@id`, visible published/updated dates matching `datePublished`/`dateModified`, and all dates fall within the last 3 weeks.
4. **Primary-source citations.** Most guides link to official docs and pricing pages, and several say when the sources were checked.
5. **First-hand experience** that answer engines reward: "I use both and route by task", corrections to the author's own videos, and recorded fixes.
6. **Honest income disclaimers** on the site, in `llms.txt`, and quoted by a third party (checkthecourse.com). This builds trust on money topics.
7. **Clean `llms.txt`** with prices, member count, and canonical links.
8. **Homepage `@graph`** with Person (with `knowsAbout`, and `sameAs` to GitHub, LinkedIn, and X), Organization (`sameAs` to YouTube and Skool), and WebSite.

## Findings

### F1. Brand name collides with another Skool community called "AI Income Lab" — High

- **Evidence:** A web search for `"AI Income Lab" Skool` returns `skool.com/ai-income-lab-3383` (by Pat Koyi, 188–190 members, $197) **above** Mike's community. Search synthesis blends the two ("The Pat Koyi version… The Mike Holp version…"). Mike's Skool URL slug is `ai-automation-station-7346`, so the name and the URL disagree. A second near-name, "AI Automation Society" on Skool, also appears in the n8n + Claude Code results.
- **Risk:** Answer engines may give the wrong price, member count, or founder when asked about "AI Income Lab".
- **Recommendation:** Always pair the name with a disambiguator ("AI Income Lab by Mike Holp" or "AI Income Lab, the AI Automation Station community"). Do this in the title, the H1 or lede, `public/llms.txt`, and the Skool description. Give AI Income Lab its own schema entity (see F2), with `sameAs` pointing to the Skool URL and `founder` set to `#mike`.

### F2. Entity markup does not model the AI Income Lab brand and is internally inconsistent — Medium

- **Evidence:**
  - The homepage `<title>` is "AI Income Lab: AI Automation Courses & Community".
  - The `Organization.name` is "AI Automation Station".
  - `WebSite.alternateName` is "Mike Holp", a person's name, not a site alias.
  - No entity is named "AI Income Lab", even though the phrase appears 36 times on the homepage.
  - The Organization has no `logo`.
  - The Person `sameAs` omits the YouTube channel.
  - Guide pages define the author only as `{@id, name, url}` with no `sameAs` (0 `sameAs` in `ai-automation.html`).
- **Recommendation:** Edit the homepage JSON-LD (the source that emits it):
  - Set `WebSite.alternateName` to `["AI Income Lab"]`.
  - Add `logo` to the Organization.
  - Add a second entity for AI Income Lab (`Organization` or `Brand`, linked through `parentOrganization` or `brand`) with `url` set to the Skool about page and `sameAs` set to the Skool URL.
  - Add the YouTube channel to the Person's `sameAs`.
  - Optionally give Person a `jobTitle` that mentions the channel.

### F3. Thin third-party brand footprint (no Reddit or Wikipedia, few independent mentions) — High

- **Evidence:** Brand searches return almost only first-party pages (the site, Skool, YouTube). The only independent coverage found was checkthecourse.com. No Reddit threads or Wikipedia/Wikidata entries surfaced. The channel has about 5.2K YouTube subscribers (homepage stats).
- **Why it matters:** The skill's evidence is that YouTube and Reddit mentions correlate with AI citations much more than backlinks do, and ChatGPT and Perplexity lean heavily on Wikipedia and Reddit.
- **Recommendation:**
  - Earn mentions in community threads (r/n8n, r/ClaudeAI, r/automation) by sharing guides where they answer real questions.
  - Create a Wikidata item for Mike Holp / AI Automation Station once there are independent sources.
  - Pitch guest content or podcasts.
  - Keep the YouTube video descriptions linking back to the matching guides.

### F4. Income guides lack sources, data, and tables — Medium

- **Evidence:**
  - `public/guides/make-money-with-ai-no-experience.html`: 0 external links, no Sources section, no table.
  - `public/guides/ai-side-hustles.html`: 0 external links, no Sources section.
  - `make-money-with-ai-fast.html`, `make-money-with-chatgpt.html`, and `ai-automation-services-small-business.html`: 1 external link each.
- **Why it matters:** These are the highest-volume, most competitive queries. Answer engines prefer passages with specific, sourced numbers.
- **Recommendation:** Add a Sources section to each. Add a comparison table (idea × startup cost × skills × time to first sale × typical price). Add first-hand data from the AI Income Lab community, such as anonymised member outcomes or pricing that members actually charge, clearly labelled. Original data is the most citable kind.

### F5. No "Quick answer" block on 14 of 24 guides — Medium

- **Evidence:** The guides that open with a quick or short answer are `ai-automation`, `codex-usage-limits`, `chatgpt-pro-20x`, `opencode-vs-claude-code`, `openseo-review`, `heygen-ai-avatar-tutorial`, `vapi-voice-agent-tutorial`, `claude-code-for-beginners`, `9router-setup`, and `claude-code-vs-codex` (an H2 rather than a lede). The other 14 open with narrative, for example `self-host-n8n`, `codex-workflow`, `first-api-request`, and `make-first-automation`.
- **Recommendation:** Add a 40–60 word "Quick answer" lede after the H1 in each remaining guide in `public/guides/`, matching the pattern in `ai-automation.html`.

### F6. Few question-style headings; FAQ missing on 11 guides — Low

- **Evidence:**
  - FAQPage is absent on `youtube-feed`, `consent-tracking`, `claude-code-vs-codex`, `first-api-request`, `codex-workflow`, `make-first-automation`, `self-host-n8n`, `hermes-desktop`, `dataforseo-mcp-claude`, `ai-side-hustles`, and `ai-automation-services-small-business`. (Some are task tutorials where an FAQ is optional.)
  - `claude-code-vs-codex` has 3 question-style headings out of 14, and `self-host-n8n` has 1 out of 13.
- **Recommendation:** Rephrase some H2s as the query people ask ("How do I route tasks between Claude Code and Codex?", "How do I self-host n8n on Ubuntu?"). Add a short FAQ to `claude-code-vs-codex.html` and `self-host-n8n.html`.

### F7. Watch pages are thin and lack transcripts — Medium

- **Evidence:** There are 220 `/watch/*` pages with a median of 210 words, and 173 of them are under 300 words. A sample (`/watch/wL6bjqaUcd8`) has VideoObject with `description`, `duration`, and `uploadDate`, but no transcript text.
- **Why it matters:** These pages hold the channel's first-hand content, but AI crawlers cannot read the video itself.
- **Recommendation:** Render a cleaned transcript, or a 150-word summary with key steps and timestamps, server-side on each watch page. Add `transcript` to VideoObject. Prioritise the videos that pair with guides.

### F8. No About page; author URL is a homepage anchor — Low

- **Evidence:** `/about` and `/about.html` return 404. Article `author.url` is `https://www.ai-automation-station.com/#about`. The anchor exists on the homepage, but there is no standalone author page.
- **Recommendation:** Create `/about.html` with a full bio (the 2013–present timeline already on the homepage), credentials, products, a channel stats snapshot, contact details, and `ProfilePage` + `Person` schema. Point `author.url` there.

### F9. llms.txt could be richer — Info

- **Evidence:** `public/llms.txt` lists guides without descriptions, omits the `/videos/*` topic hubs, its H1 omits "AI Income Lab", and `/llms-full.txt` returns 404.
- **Recommendation:** Add `: one-line summary` to each link. Add a "Video topics" section (`/videos/claude-code`, `/videos/n8n`, and so on). Use the H1 "Mike Holp: AI Automation Station and AI Income Lab". Add a "Last updated" line. This is optional and has no effect on Google.

### F10. robots.txt has no explicit AI-bot policy — Info

- **Evidence:** Only `User-agent: * / Allow: /` is present (`public/robots.txt`). Access is currently fully open, which is fine for visibility.
- **Recommendation:** No change is needed for visibility. If training opt-outs are ever wanted, add explicit groups (for example `User-agent: GPTBot` / `Disallow: /`) while keeping `OAI-SearchBot`, `Claude-SearchBot`, and `PerplexityBot` allowed. Also check that Vercel Firewall or bot protection does not challenge verified AI crawlers by IP address.

## Top 5 highest-impact changes

1. Disambiguate the "AI Income Lab" brand everywhere and model it as its own entity (F1, F2).
2. Add sources, a comparison table, and original community data to the five income guides (F4).
3. Build third-party mentions on Reddit, YouTube collaborations, and directories (F3).
4. Add server-rendered transcripts or summaries to the watch pages that pair with guides (F7).
5. Roll out the "Quick answer" lede and question-style H2s to the remaining 14 guides (F5, F6).
