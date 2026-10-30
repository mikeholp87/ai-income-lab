# Topic cluster findings: www.ai-automation-station.com

Audit date: 2026-10-28. Skill: `seo-cluster` v2.3.1, run in audit mode: I mapped the existing content rather than planning new content from a seed keyword.

## Method and evidence

- **Source data:** `evidence/crawl.json`, covering all 274 pages and every internal link with its anchor text.
- **What a "link" means here:** the counts below are unique source pages, excluding self-links. The six site-wide navigation targets (`/`, `/start-here.html`, `/guides.html`, `/videos`, `/search.html`, `/privacy.html`) are linked from 272–273 pages. They're reported separately so they don't inflate cluster counts.
- **How pages were assigned to clusters:**
  - Topic hubs come from `src/topics.js`, which assigns videos to hubs with title regexes.
  - Watch-page → guide links come from the `guides` table in `src/archive.js` (lines 194–203).
  - Guide-to-guide links are hand-written in `public/guides/*.html`.
- **Limitations:**
  - Cluster membership is inferred from titles, headings and the link graph.
  - SERP-overlap clustering (the skill's core step) was spot-checked for only one money query, because no DataForSEO key is configured and the web-search budget was limited. The cannibalization calls below are therefore title and intent overlap, flagged as *risk* unless SERP evidence is cited.

## Site structure at a glance

| Section | Pages | Role |
|---|---|---|
| `/guides/*.html` | 24 | Written guides, 792–3,331 words |
| `/videos/<topic>` | 8 | Topic hubs (claude-code, codex-opencode, n8n, make-com, ai-agents, ai-seo, ai-video, new-models) |
| `/videos`, `/videos/2`…`/15` | 15 | Paginated archive ("Every video") |
| `/watch/<id>` | 220 | One page per YouTube video, 117–551+ words |

- **Watch pages and hubs:** 154 of 220 watch pages appear in at least one topic hub; **66 appear in none**. 25 appear in more than one.
- **Watch pages → hubs:** only **1 of 220** watch pages links to any topic hub. The watch breadcrumb is "Home / Videos / title" (`src/archive.js` line 259, with the BreadcrumbList at line 230). There's no topic level.

## Cluster map

Each guide is listed with its unique incoming internal sources (IN) and with whether it links to or from its topic hub.

### Cluster A: AI coding agents (Claude Code, Codex, OpenCode)

- **Hubs:** `/videos/claude-code` (22 videos, 1,387 words) and `/videos/codex-opencode` (14 videos, 649 words).
- **De facto pillar:** `/guides/claude-code-vs-codex.html`, with 16 incoming sources.

| Guide | IN | Linked from a hub? | Links to a hub? |
|---|---|---|---|
| claude-code-vs-codex | 16 | yes, both hubs | **no** |
| codex-workflow | **38** (25 from watch pages) | yes, both hubs | no |
| claude-code-for-beginners | 6 | **no** | yes → `/videos/claude-code` |
| opencode-vs-claude-code | 7 | **no** | no |
| codex-on-linux | 6 | **no** | no |
| codex-usage-limits | 7 | **no** | no |
| chatgpt-pro-20x | 5 | **no** | yes → `/videos/codex-opencode` |
| 9router-setup | 7 | **no** | no |

- **Guide imbalance:** `codex-workflow` is over-linked. The catch-all regex `/codex|open\s?code|claude code/i` (`src/archive.js` line 201) sends **13 of 15 Claude Code watch pages** to the Codex guide, with the anchor "Make and verify a small code change with Codex". Only 1 Claude Code watch page links `claude-code-for-beginners`, and only 1 links `claude-code-vs-codex`.
- **Guide/video overlap:** each pair below targets the same query. In the crawl they cross-link both ways unless noted.
  - `9router-setup` ↔ `/watch/geKngm3sg3w` "How to use 9Router: setup, providers and request checks" (0.71 title-token overlap).
  - `opencode-vs-claude-code` ↔ `/watch/_8qzOkIWMSk` "Why OpenCode is better than Claude Code: setup and limits".
  - `opencode-vs-claude-code` ↔ `/watch/ga22WZgoj9M` "Is OpenCode Better Than Free Claude Code?". The guide doesn't link back to this one.
  - `codex-on-linux` ↔ `/watch/g4BmgmEy_mI` "Codex desktop on Linux…".

### Cluster B: No-code automation (Make.com, n8n, what is AI automation)

- **Hubs:** `/videos/make-com` (9 videos, 566 words) and `/videos/n8n` (14 videos, 818 words).
- **Pillar candidate:** `/guides/ai-automation.html` (2,663 words, 16 incoming sources, Article/FAQ). **No hub links it, and it links no hub.**

| Guide | IN | Linked from a hub? | Links to a hub? |
|---|---|---|---|
| ai-automation (pillar) | 16 | **no** | **no** |
| make-first-automation | 24 | yes → make-com | **no** |
| self-host-n8n | 7 | yes → n8n | **no** |

- **n8n gap:** `/videos/n8n` receives **0 links from any guide**, and **0 of 14 n8n watch pages link `self-host-n8n`**. `/watch/7UMrV3w1e40` ("Self-Host N8N on Ubuntu…") is the same build as the guide but doesn't link it. The cause is that `src/archive.js` has no n8n entry in its `guides` table.
- **Missing spoke:** there's no "n8n tutorial for beginners / first n8n workflow" guide. That's despite 14 n8n videos and the VIP tier selling "6,400+ n8n templates".

### Cluster C: AI agents and voice agents

- **Hub:** `/videos/ai-agents`, the largest hub (**39 videos, 2,090 words**).
- **Guides:**
  - `hermes-desktop` (IN 6), which the hub links.
  - `vapi-voice-agent-tutorial` (IN 5), which the hub **doesn't** link.
- **Missing pillar:** no written "what are AI agents / build your first AI agent" guide exists, even though agents are the site's biggest video topic.

### Cluster D: AI video, avatars and YouTube

- **Hub:** `/videos/ai-video` (33 videos, 1,973 words). There's **no `guides` entry for it in `src/topics.js`**, so the hub links no guide.
- **Guides:** `heygen-ai-avatar-tutorial` (IN 6) and `youtube-feed` (IN 8, a React build that fits better under creator websites).
- **Exact cannibalization:** `/guides/heygen-ai-avatar-tutorial.html` and `/watch/pMLyxz6Dyt4` share the **identical title** "HeyGen AI avatar tutorial: create your first video". This is the only duplicate title in `crawl-summary.json`.

### Cluster E: AI SEO

- **Hub:** `/videos/ai-seo` (19 videos, 1,169 words).
- **Guides:**
  - `dataforseo-mcp-claude` (IN 5), which the hub links.
  - `openseo-review` (IN 4), which the hub **doesn't** link, although the guide links the hub.
- **Misfiled video:** `/watch/dQ_gnts0JCE` "Is OpenSEO Better Than Paid Tools? (Live Demo)" is in **no hub**. The ai-seo pattern `/\bseo\b/` doesn't match "OpenSEO", because there's no word boundary between "Open" and "SEO".

### Cluster F: New AI models (news)

- **Hub:** `/videos/new-models` (30 videos, 1,377 words). It has no guides, and no guide links to it.
- **Assessment:** acceptable for news content. The one natural spoke, `chatgpt-pro-20x`, links to codex-opencode instead.

### Cluster G: Earning with AI (the brand's own topic: "AI *Income* Lab")

- **Hub:** none. There's **no topic hub**, and no watch page links any guide in this cluster.

| Guide | Words | IN | Linked from watch pages |
|---|---|---|---|
| make-money-with-ai-no-experience | 1,883 | 7 | 0 |
| make-money-with-ai-fast | 2,068 | **3** | 0 |
| ai-side-hustles | 2,225 | 7 | 0 |
| ai-automation-services-small-business | 2,208 | 7 | 0 |
| make-money-with-chatgpt | 1,683 | 6 | 0 |

- **Missing pillar:** nothing covers the head term "how to make money with AI". Competing results for "make money with AI fast" include broad head-term pages (ClickUp "How to Make Money with AI: 15 Proven Ways", Foundable "How to Make Money With AI in 2026"). The two "make money with AI …" guides split the head term between them.
- **Cannibalization risk:** the SERP for "how to make money with AI fast" also returned a side-hustles listicle (money-lab.app "Best AI Side Hustles 2026"). That suggests `make-money-with-ai-fast` and `ai-side-hustles` may share results. It's unconfirmed at n=1 query; run a SERP-overlap check on both queries before acting.
- **Unused related videos:** at least 9 business and client-acquisition watch pages exist but sit in no hub and link to none of these guides. Examples:
  - `NoHkFvhbiuU` "Building an AI tool to find website clients"
  - `pYHt2qWvAr8` "How To Get More Clients For Your Web Agency"
  - `QMqe2ubsn0g` "How To Build A White Label Automation Agency With DextroLab"
  - `UkYoSNiqa6o` "Turn Cold Leads Into Closed Deals With This AI System!"
  - `6iFA7ds2PU4` "How to Build a Profitable Skool Community"

### Cluster H: APIs and creator websites

- **Guides:** `first-api-request` (IN 15), `youtube-feed` (IN 8) and `consent-tracking` (IN 5).
- **Hub:** none, which is acceptable at 3 guides. `/start-here.html` links all three.

## Watch pages with weak support

- **Few incoming links:** 8 watch pages have only one unique incoming source:
  - `3j4YyYFRQKU`, `EECptdYND6k`, `QMqe2ubsn0g`, `X0X8kJTK7vA`, `kXw2yntdmo4`, `mkm8cz6dp8w`, `tzUhKKzwgyE`, `vxH102ZvjUg`.
  - 34 more have exactly 2.
  - Most are in the 66 hub-less videos (lead-gen, website builders, Skool, Gamma, Lovable and similar).
- **Near-duplicate watch titles** (risk only; each is a separate video):
  - `/watch/3cP3DeBG5Q0` "How I Built An AI Video Editor Inside Claude Code" vs `/watch/ztEj6zCJh5k` "I Built an AI Video Editor with Claude Code" (0.88 overlap).
  - Three "…Saves Hours Every Week" n8n workflow titles.

## Anchor text quality

- **Good overall:** there are no generic anchors ("click here", "read more", "learn more") anywhere in the crawl. Guide anchors are descriptive and keyword-led. Examples: "Claude Code vs Codex" (8), "Build your first Make.com automation" (15), "What Is AI Automation?" (8).
- **Weak partial anchors:** "no experience" (2× → no-experience guide), "pricing section" and "data and access checklist" (→ small-business guide).
- **Wrong-intent anchors:** the Claude Code watch pages point at the Codex guide with a Codex anchor (see Cluster A).
- **Naming inconsistency:** the page title says "Codex vs Claude Code…" while most anchors say "Claude Code vs Codex". Both orders rank in the SERP, so this is informational only.

## Findings

### CL-1: The "Earning with AI" cluster has no hub, no pillar and no video links. Severity: **High**

- **Evidence:**
  - 5 money guides (about 10,000 words) receive **0 links from 220 watch pages**.
  - `make-money-with-ai-fast` has only 3 incoming sources.
  - No `/videos` hub covers business or clients, and at least 9 money/client videos sit in no hub.
  - This is the topic the brand name ("AI Income Lab") and the Skool pitch ("systems businesses will actually pay for") are built on.
- **Recommendation:**
  1. Add a topic to `src/topics.js`, e.g. `{ slug: 'ai-business', name: 'AI clients and business', pattern: /client|agency|lead|white label|skool community|business/i, guides: [...] }`, listing all 5 money guides.
  2. Create a "How to make money with AI" pillar guide in `public/guides/`. It should link to all 5 spokes, and each spoke should link back with a head-term anchor.
  3. Add a regex in `src/archive.js` `guides` that maps client and agency videos to `ai-automation-services-small-business.html`.

### CL-2: Watch pages don't link to topic hubs, and their breadcrumbs skip the topic level. Severity: **High**

- **Evidence:** only 1 of 220 watch pages links a hub. The breadcrumb and BreadcrumbList are "Home / Videos / title". Hubs get their links almost entirely from the 15 paginated archive pages and from each other.
- **Recommendation:** in `renderWatch` (`src/archive.js`), add the first matching topic from `topics` as a breadcrumb level and as a BreadcrumbList item, "Home / Videos / Claude Code / title". Also add a "More in Claude Code →" link next to "More builds".

### CL-3: Guides and topic hubs don't link to each other. Severity: **Medium**

- **Evidence:**
  - Only 3 of 24 guides link a hub (`claude-code-for-beginners`, `chatgpt-pro-20x`, `make-money-with-ai-fast` → make-com).
  - `/videos/n8n`, `/videos/ai-agents`, `/videos/ai-video` and `/videos/new-models` receive 0 guide links.
  - Hubs list only 1–2 guides each, and `ai-video` and `new-models` list none.
  - Guides missing from their hubs: claude-code-for-beginners, opencode-vs-claude-code, codex-on-linux, codex-usage-limits, chatgpt-pro-20x, 9router-setup, ai-automation, vapi-voice-agent-tutorial, openseo-review, heygen-ai-avatar-tutorial.
- **Recommendation:**
  - Extend each topic's `guides` array in `src/topics.js` to list every guide in that cluster, as mapped above.
  - Add a "Videos on this topic: <hub>" line to each guide's "Keep going" aside in `public/guides/*.html`, using the hub name as the anchor (e.g. "n8n tutorials and builds").

### CL-4: A catch-all regex sends Claude Code videos to the Codex guide. Severity: **Medium**

- **Evidence:** 13 of 15 Claude Code watch pages link `/guides/codex-workflow.html` with the anchor "Make and verify a small code change with Codex". `claude-code-for-beginners` gets 1 such link, and `claude-code-vs-codex` gets 1.
- **Recommendation:** in the `guides` table of `src/archive.js`, add `[/claude code/i, '/guides/claude-code-for-beginners.html', 'Claude Code tutorial for beginners']` **before** the codex catch-all. Also narrow the catch-all to `/codex|open\s?code/i`.

### CL-5: The n8n cluster is disconnected. Severity: **Medium**

- **Evidence:** 0 of 14 n8n watch pages link `self-host-n8n`, including the matching video `/watch/7UMrV3w1e40`. `/videos/n8n` gets 0 guide links. There's no beginner n8n guide.
- **Recommendation:**
  - Add `[/\bn8n\b/i, '/guides/self-host-n8n.html', 'Self-host n8n on Ubuntu']` to the `guides` table in `src/archive.js`.
  - Link `/videos/n8n` from `self-host-n8n.html` and `ai-automation.html`.
  - Consider an "n8n tutorial for beginners: first AI workflow" spoke.

### CL-6: The HeyGen guide and its watch page share an identical title. Severity: **Medium**

- **Evidence:** both `/guides/heygen-ai-avatar-tutorial.html` and `/watch/pMLyxz6Dyt4` are titled "HeyGen AI avatar tutorial: create your first video" (`crawl-summary.json` `dup_titles`).
- **Recommendation:** keep the guide as the ranking page. Retitle the watch page as a video variant, e.g. "HeyGen avatar video walkthrough (screen recording) | Mike Holp", through the video's title override or `watchNotes` in `src/watch-notes.js`. Also compare `9router-setup` with `/watch/geKngm3sg3w` (0.71 overlap) and differentiate it the same way.

### CL-7: The AI agents hub, the biggest topic, has no written pillar. Severity: **Medium**

- **Evidence:** 39 videos and 2,090 words, but the hub links only `hermes-desktop`. `vapi-voice-agent-tutorial` isn't linked.
- **Recommendation:**
  - Add Vapi to the `ai-agents` `guides` array in `src/topics.js`.
  - Plan a "Build your first AI agent" pillar guide that links Hermes, Vapi and the GrokBot videos.

### CL-8: 66 watch pages belong to no topic hub; OpenSEO is misfiled. Severity: **Low**

- **Evidence:** 66 of 220 watch pages match no hub pattern (lead-gen, Lovable, Gamma, Skool and others). `/watch/dQ_gnts0JCE` "Is OpenSEO…" misses the `/\bseo\b/` pattern.
- **Recommendation:** in `src/topics.js`, change the ai-seo pattern to include `openseo`, e.g. `/\bseo\b|openseo|…/i`, and add the business topic from CL-1. That covers most of the remaining hub-less videos. Re-run `src/topics.test.js`.

### CL-9: The beginner pillar `/guides/ai-automation.html` isn't linked from start-here or any hub. Severity: **Low**

- **Evidence:** its incoming sources are 9 guides, 5 watch pages, `/` and `/guides.html`. Neither `/start-here.html` nor `/videos/make-com` or `/videos/n8n` links it.
- **Recommendation:** link it from `public/start-here.html` (see SXO-2), and add it to the make-com and n8n `guides` arrays in `src/topics.js`.

### CL-10: Topic hub titles are short and say "videos" rather than "tutorials". Severity: **Low**

- **Evidence:** the hub titles are "n8n videos | Mike Holp" (22 characters), "Make.com videos | Mike Holp" (27), "AI agents videos | Mike Holp" (28) and "AI SEO videos | Mike Holp" (25), all flagged in `crawl-summary.json` `title_len_bad`. `/videos/make-com` has 566 words.
- **Recommendation:** in `renderArchive` (`src/archive.js` line 121), build the topic title from a new `topic.title` field, e.g. "n8n tutorials: AI workflows and self-hosting (14 videos)".

## What works

- The internal anchor text is descriptive everywhere, with no generic anchors in 274 pages.
- Guide-to-guide linking is dense inside the coding and money clusters (5–11 outgoing guide links per page), and every guide ends with a "Keep going" aside.
- The topic hubs are generated from data (`src/topics.js`), so new videos are filed automatically. Most fixes above are one-line config changes, not template rewrites.
- Most guide/video pairs already cross-link both ways (9Router, Codex on Linux, Make.com, Vapi, HeyGen).
- `/guides.html` groups all 24 guides under topical H2s that match the clusters above.
