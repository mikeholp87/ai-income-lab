# Guides content audit — November 10, 2026

Scope: all 63 pages in `public/guides/` plus the `guides.html` hub. Method: scripted metrics on every page (`collect-metrics.mjs`, output in `guide-metrics.json`), manual reading of representative pages from each cluster, and the November 9 Search Console notes. Not covered: fact-checking every claim, live SERP comparison, conversion data.

**Verdict: FIX.** No critical trust issue found. Sponsored guides (Treg, DataForSEO) disclose the sponsorship, pricing-heavy pages carry "checked <date>" stamps, and every page has a quick answer, FAQ and author/date byline. The problems are voice, depth and labelling on a subset of pages, plus internal links to the guides Search Console is already showing.

## Clusters

| Cluster | Pages | Typical length | State |
|---|---|---|---|
| Evergreen tutorials and comparisons (Claude Code beginners, Codex, n8n, OpenRouter, 9Router, Kilo, OpenCode Go) | ~25 | 1,400–2,200 words | Strong. Dated official sources, concrete commands, success checks |
| Earning with AI | 5 | 1,850–2,700 words | Honest and well-sourced, but overlapping intent |
| GrokBot / SEO tool workflows | ~10 | 1,000–1,400 words | Good first-person experience; fine |
| Video case guides (Muse Code, DeepSeek Harness, Jev, REA, Ghostty, Rocket demo, ChatGPT images, OpenDesign, Trakkr, CrowdReply, Runable, Task Manager, CleanYourTV) | 13 | 590–950 words | Weakest. Detached voice, no Sources section, thin |

## Should-fix

1. **Video case guides read like a third party auditing Mike's video.** Phrases such as "the spoken source does not establish", "the recording does not demonstrate", "the AAS Muse Wonder video" and "Mike switches to…" appear across 27 guides (75 uses of "the recording", 52 of "not established / does not establish", 25 of "AAS"). One FAQ answer in `muse-code-setup.html` is literally "Not established by the spoken source." The author is the person in the video, so this voice discards the strongest experience signal the site has and reads as machine-generated. Rewrite in first person ("I tried the OpenCode API route first; it kept returning an invalid-key error"), drop "AAS" and "spoken source", and replace non-answer FAQs with useful ones or remove them.
2. **13 case guides have no Sources section and average ~700 words.** Every evergreen guide links its official docs in a dated Sources block; these don't. Add the official docs/repo/pricing links with a "checked <date>" line. Expand each with one thing the reader can actually run (install command from official docs, the exact error and fix, a minimal config). Pages that can't get that should be folded into their watch page rather than standing as separate guides.
3. **Internal links to pages Search Console is surfacing.** `opencode-go.html` has 666 impressions at position 9 but only 3 guide links in (OpenCode vs Claude Code, Kilo, OpenRouter). `install-openclaw.html` (discovered, not indexed) has 3. `codex-seo-workflow.html` (discovered, not indexed) gets links only from sibling SEO case guides. None of these are linked from the homepage or Start here. Add contextual links from the high-authority beginner pages (Claude Code for beginners has 28 inbound links, First API request and Codex workflow 19 each).
4. **ChatGPT Pro 20x leads with stale news.** The title ("…Limits, Pause & Codex"), meta description ("why the $200 plan was paused") and hub card ("Why new Pro 20x sign-ups stopped") lead with the September pause, while the quick answer says the plan is available again as of October 31. Lead the title/description with the current state and limits; keep the pause history as a section.
5. **Earning-with-AI cluster overlaps.** "Make money with AI fast", "with no experience", "with ChatGPT", "AI side hustles" and "sell AI automation services" all end at the same advice (pick a checkable task, find one client, deliver small). "Fast" and "Side hustles" each contain an identical "Ranked by readiness for a first paid client" and "Scams and red flags" section. Give each one a distinct job: no-experience = skills inventory to first offer; side hustles = the ranked list (canonical home for the ranking and scam sections); ChatGPT = ChatGPT-specific deliverables; services = sales/scoping/pricing; fast = short myth-busting page that routes to the others.

## Nice-to-have

6. **Content-type labels are wrong on ~11 pages.** 58 of 63 bylines say "Build guide", including comparisons (n8n vs Zapier vs Make, Lovable vs Base44 vs Replit, Claude Code vs Codex, GrokBot vs Dots, No-code AI agent builder, Agentic AI vs traditional automation) and explainers (What is n8n used for, the five earning guides). Use Comparison / Explainer so readers know what they're getting.
7. **Hub card copy undersells the case guides.** Cards lead with limits: "without treating it as a validated simulator", "without measured RAM claims", "the unfinished audit", "a buggy demo". Keep the honesty but lead with the reader outcome, then the caveat.
8. **Hub order.** `guides.html` opens with "Guides for channel video topics", which are the thinnest pages, and gives the rocket demo the `fetchpriority="high"` slot. Lead with Coding assistants or a "Start with these" row of the strongest guides.
9. **Herdr desktop hub card** links its video to `youtube.com/watch?v=IV6q81wRay4` instead of `/watch/IV6q81wRay4` like every other card.
10. **Bulk modified dates.** 37 guides carry `dateModified` 2026-11-08 from a single sitewide SEO pass. Only bump the date when the substance changes, otherwise the freshness signal stops meaning anything.
11. **ChatGPT Pro 20x title is 63 characters** (only page over 60) and will truncate.

## Top 5 by impact

1. Rewrite the 13 video case guides in first person and remove the "spoken source / AAS / not established" phrasing (fixes the largest experience and trust gap).
2. Add dated Sources sections and one runnable step to those same pages, or merge the thinnest into their watch pages.
3. Add contextual links into OpenCode Go, Install OpenClaw and Codex SEO workflow from the most-linked beginner guides and Start here.
4. Reframe the ChatGPT Pro 20x title, description and hub card around the current state.
5. Differentiate the five earning guides and keep the ranking and scam sections in one place.

## Implemented November 11, 2026

- All 13 case guides rewritten in first person from their transcripts, with dated official Sources and one documented command or checklist each (now ~1,180–1,630 words). Light first-person pass on 16 longer guides, Herdr desktop, Treg and Codex SEO. Zero matches for the detached-voice pattern below.
- Earning cluster split: `ai-side-hustles` holds the ranking and scams sections, `make-money-with-ai-fast` is a short myth-buster and router, the other three got distinct scopes and a "which guide is for you" line.
- Contextual links into OpenCode Go, Install OpenClaw and Codex SEO workflow from Start here, Claude Code for beginners, First API request, AI agent workflow and Build apps with AI coding agents.
- ChatGPT Pro 20x title (60 chars), description, hub card, card image and an intro sentence that contradicted the status box now lead with the current state.
- Bylines relabelled (Comparison, Explainer, How-to guide, Case study). Hub cards lead with the outcome, Claude Code for beginners is the first card, channel-video topics moved below Earning, Herdr desktop links its watch page.
- `dateModified` and sitemap `lastmod` moved to 2026-11-11 only for the 42 guides whose content changed; label-only pages kept their dates.
- Card template fix: three-line headlines overlapped the byline, so `cardHtml` now shrinks the headline to two lines.

## Re-run

```bash
node docs/audits/2026-11-10-guides-content-audit/collect-metrics.mjs
rg -c -i -P 'spoken source|not established|does not establish|the recording|\bAAS\b' public/guides/*.html
```
