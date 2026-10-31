# Guides: SEO, AEO and AI search review

Date: October 31, 2026. Scope: all 29 articles in `public/guides/`.

Evidence used:

- A repository scan of every guide: word count, openers, headings, tables, links, schema and dates.
- Search Console: 90 days of query and page data, plus URL Inspection on all 61 sitemap URLs.
- Live Google results from DataForSEO (US, desktop, with AI Overviews) for four target queries.
- Live robots.txt and bot user-agent checks.

This review builds on [the October 28 audit](2026-10-28-www.ai-automation-station.com-audit/ACTION-PLAN.md) and does not repeat items that have been fixed since.

## What already works (keep it)

- **AI crawlers can reach every guide.** robots.txt allows all agents. GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, Google-Extended and Bingbot user agents all get HTTP 200. `llms.txt` lists every guide with a description, and an IndexNow key file is published.
- **Every guide passes the basic checks:**
  - title of 60 characters or fewer, description of 160 or fewer;
  - FAQPage data built from the visible questions;
  - Article and BreadcrumbList data;
  - author linked to `/about.html`;
  - `dateModified` within the last 3 days;
  - listed on the hub, the sitemap and `llms.txt`.
- **Watch pages no longer compete with guide titles.** `src/archive.test.js:539` guards this.
- **42 of 61 sitemap URLs are indexed.** The other 19 are "Discovered" and not yet crawled. Indexing was requested on October 31 for the five n8n guides and `sponsors.html`.

## Who AI Overviews cite today

| Query | AI Overview | This site cited? | Who is cited | Shape of the answer |
|---|---|---|---|---|
| codex vs claude code | Yes | No | HackerNoon, Superblocks, Composio ("100+ hours with both"), Builder.io, Reddit, 5 YouTube videos | Core differences → "choose X if" → hybrid |
| 9router | Yes | No | 9router.com, GitHub, npm, AWS Marketplace, Cloudron forum | Opens: "9Router is an open-source, self-hosted smart gateway and LLM proxy… `localhost:20128/v1`", then features and install commands |
| n8n vs zapier vs make | Yes | No (page not indexed yet) | Parseur ("Figures checked August 2026, from each vendor's own pricing… pages"), Medium, flowmondo, n8n.io, 3 YouTube videos | A feature **table** (audience, learning curve, billing unit, entry plan, integrations, hosting, code, AI), then cost at scale |
| install codex cli | Yes | No | winstall, developersdigest, amanhimself.dev, 4 YouTube videos | Grouped **by OS**: npm (any OS), curl and brew (macOS and Linux), winget (Windows), then `codex --version` and `codex login` |

Observations:

- Every AI Overview opens with a one-sentence definition or verdict.
- They lift tables and command blocks almost verbatim.
- All four cite YouTube.
- For "9router", 3 of the 4 videos in the video carousel are this channel's own (`geKngm3sg3w`, `miBtL2fVkpg`, `tzSGF7gu6EE`), and the channel's playlist ranks #10 organically. The written guide sits at an average position of about 10.6 for the same query.

## P1: highest leverage

**Status, October 31:** items 1–3 are implemented. Details:

- **#1 openers:** done for all five guides. Each new opener uses only facts already on the page.
- **#2 status boxes:**
  - Claude Code vs Codex and Codex on Linux now open with a one-sentence answer.
  - Pro 20x already had a quick answer above its status box, so it is unchanged.
- **#3 links added:**
  - to chatgpt-pro-20x from claude-code-vs-codex and codex-workflow (it was already linked from codex-usage-limits);
  - to 9router-setup from codex-usage-limits, claude-code-vs-codex and opencode-vs-claude-code;
  - to openseo-review and dataforseo-mcp-claude from claude-code-vs-codex.
- **Skipped:** links to heygen and consent-tracking. No candidate page had a natural place for them.

### 1. Open tool guides with a definition or direct answer, not a description of the article

Four quick answers describe the article instead of answering the query, so an AI engine has nothing to quote:

| Guide | Current opener | Problem |
|---|---|---|
| 9router-setup | "start your 9Router setup with one provider and one checked request…" | Never says what 9Router is. The AI Overview's first line is the definition. |
| claude-code-for-beginners | "this Claude Code for beginners walkthrough starts with…" | Describes the article |
| heygen-ai-avatar-tutorial | "this HeyGen AI avatar tutorial starts with one short script…" | Describes the article |
| vapi-voice-agent-tutorial | "follow this Vapi voice agent tutorial by creating…" | Describes the article |
| opencode-vs-claude-code | "comes down to whether you want OpenCode's provider choice or…" | No verdict |

Pattern: **what it is (one sentence, with the key fact) → the verdict or steps (one or two sentences)**, 40–60 words in total.

Example for 9Router. Every fact in it already appears on the page.

> 9Router is a self-hosted gateway that gives Claude Code, Codex and other coding tools one OpenAI-compatible endpoint, `http://localhost:20128/v1`, in front of many AI providers. Install it with npm, add one provider, verify one request, then add model combos and fallbacks.

### 2. Shorten the long status boxes

These boxes push the answer below 100 words:

- **chatgpt-pro-20x:** 139 words.
- **claude-code-vs-codex:** 112 words.
- **codex-on-linux:** 78 words, and its heading still says "as of October 23".

Lead with a two-sentence answer and move the detail into a list below it. For Pro 20x, that answer is: "Pro 200 is on sale again at $200/month, and every Pro 200 subscription now gets the same, higher allowance."

### 3. Link to the guides that have few internal links

Number of other guides linking to each page:

| Guide | Inbound | Search Console | Add links from |
|---|---:|---|---|
| chatgpt-pro-20x | 1 | position 12, 67 impressions | codex-usage-limits (plans section), claude-code-vs-codex ("When one runs out"), codex-workflow |
| openseo-review | 1 | position 37, "openseo.so" at 10.8 | dataforseo-mcp-claude, ai-automation-services-small-business |
| consent-tracking | 1 | — | youtube-feed, first-api-request |
| 9router-setup | 2 | position 6.5, 206 impressions | codex-usage-limits ("What to do when a limit hits"), claude-code-vs-codex, opencode-vs-claude-code |
| dataforseo-mcp-claude | 2 | — | openseo-review, claude-code-for-beginners |
| heygen-ai-avatar-tutorial | 2 | position 11.8 | vapi-voice-agent-tutorial, ai-side-hustles |

### 4. Connect YouTube and the guides in both directions

AI Overviews cite YouTube on all four queries, and the channel already ranks for 9Router.

- **On YouTube:** put the matching guide URL in the first line of each video's description and in a pinned comment. This is outside the repo: Studio or the Data API.
- **On the site:** only 2 of 29 guides embed their video (`ai-automation`, `chatgpt-pro-20x`). Embed the matching video, using the existing facade pattern, in the guides whose videos rank:
  - 9router-setup (`miBtL2fVkpg`)
  - heygen-ai-avatar-tutorial
  - vapi-voice-agent-tutorial
  - openseo-review
  - self-host-n8n
  - codex-on-linux
- The 5 make-money guides and ai-automation-services-small-business link to no video at all.

### 5. The make-money cluster still needs evidence (October 28 item #9, still open)

These guides are about income, so readers and Google expect stronger proof. Today:

- each has 1–2 external sources;
- none links to a video;
- none shows a documented case.

Add to each guide:

- one real, dated example with the numbers stated;
- 3–5 sources;
- a comparison table where the guide doesn't have one.

`make-money-with-ai-fast` still opens with "If you want to know how to make money with AI fast…", which repeats the keyword instead of answering. Lead with its existing verdict: "speed lives in the draft, not in the payment."

## P2

### 6. Add tables where AI Overviews expect them

13 of 29 guides have no table. The n8n AI Overview is a table, and the Codex install AI Overview is a list of commands grouped by OS.

| Guide | Table to add |
|---|---|
| codex-on-linux | Install method, command, updates, when to use (installer, npm, binary, desktop .deb/.rpm) |
| 9router-setup | Defaults: dashboard URL, API URL, `--port` flag, update command, Docker image and update |
| vapi-voice-agent-tutorial | Documented cost components |
| hermes-desktop | OS, app, installs Hermes Agent? |
| what-is-n8n-used-for | Use case, trigger, nodes, example |
| claude-code-for-beginners | Plan or billing route, what it includes, best for |
| dataforseo-mcp-claude | Call type and what it costs (link the pricing page) |
| self-host-n8n | Node.js vs Docker install |

Under every comparison table, put a "Checked <date> against <vendor> pricing page" line. The page Google cites for n8n vs Zapier vs Make (Parseur) does exactly this.

### 7. Phrase some section headings as questions

Outside the FAQ blocks, only 3 of 29 guides have a question heading: `n8n-alternatives-open-source` ("Is n8n open source?"), `ai-automation` ("What is AI automation?") and `agentic-ai-vs-traditional-automation` (a four-question checklist). Convert one or two headings per guide to the exact People Also Ask wording from the live results:

- claude-code-vs-codex: "Are Codex and Claude Code the same thing?" and "How much does Claude Code cost per month?"
- n8n-vs-zapier-vs-make: "How much is pay per task in Zapier?" and "What are some competitors to n8n?" (link to n8n-alternatives-open-source)

### 8. Cover the related searches the guides miss

| Guide | Related searches not covered |
|---|---|
| claude-code-vs-codex | price, usage limits, vs Cursor, in VS Code |
| 9router-setup | Windows, install, GitHub, VS Code |
| codex-on-linux | Ubuntu (name it in a heading), uninstall |
| n8n-vs-zapier-vs-make | pricing or cost at a fixed volume (the AI Overview's "10-step workflow × 10,000 runs" example) |

## P3

9. **Bing Webmaster Tools.** ChatGPT search and Copilot draw on Bing's index. Confirm the property is verified there, submit both sitemaps, and check that IndexNow pings are being received. The current state wasn't checked in this review.
10. **Request indexing for `/about.html`.** It is the author page every guide points to, and it is still "Discovered, not crawled".
11. **Update the Pro 20x guide card image.** It still says "Back with a lower allowance", which OpenAI reversed (help page read October 31).

## Not recommended

- **HowTo structured data.** Google no longer shows HowTo rich results.
- **More FAQ blocks for rich results.** Google limits FAQ rich results to government and health sites. Keep the existing FAQPage data for AI engines, but don't add more expecting search snippets.
- **Retitling Codex on Linux or Claude Code vs Codex.** Both titles follow keyword-volume data (`2026-10-27-guides-search-data.md`), and tests lock them in.

## How to measure

- Re-run the four AI Overview queries after the P1 changes are crawled, about 2–3 weeks out.
- Track in Search Console: clicks on 9router-setup (0 today at position 6.5), position on chatgpt-pro-20x (12 today), and how many of the 19 unindexed URLs become indexed.
