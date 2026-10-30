# Content quality and on-page SEO: www.ai-automation-station.com

Audit date: 2026-10-28. Sources: `evidence/crawl.json` (274 pages), `evidence/crawl-summary.json`, and a live fetch of 15 pages: the homepage, /start-here.html, /guides.html, 5 guides, 2 topic pages and 5 watch pages.
Scores are heuristics from this audit's scoring model, not Google-internal signals.

## Scores

| Area | Score |
|---|---|
| Content Quality (E-E-A-T, depth, uniqueness) | **62 / 100** |
| On-Page SEO (titles, meta, headings, cannibalization, internal links) | **74 / 100** |
| Images (alt text) | **72 / 100** |
| AI citation readiness (guides only) | 78 / 100 |

### E-E-A-T breakdown (sitewide, weighted by page count)

| Factor | Score | Key signals |
|---|---|---|
| Experience | 14/20 | Guides show first-hand use, for example "On Plus my credits were gone in about 5 to 10 minutes" in chatgpt-pro-20x and the recorded builds on watch pages. The make-money guides use hypothetical framing ("I would…") and include no real client or income examples. |
| Expertise | 17/25 | The homepage About section shows software shipping since 2013, a timeline, and GitHub, LinkedIn and X profiles. Guides are technically precise (exact commands, failure modes, a public example repo). There is no standalone author page. |
| Authoritativeness | 13/25 | Proof points are 2,900+ members, 5.2K subscribers, 534K views and two live products. There are no external mentions, press or testimonials on the site. |
| Trustworthiness | 24/30 | Every guide has visible Published and Updated dates plus `dateModified`, primary-source citations (OpenAI and HeyGen help centres), "Draft checked…" and "Notes checked…" lines, explicit no-income-guarantee language, transparent pricing and an FAQ on cancellation. |

Guides alone would score about 80. The main drag is 175 thin, templated watch pages, which make up 64% of crawled URLs.

## What works

- **The guides are people-first and trustworthy.** Average length is 1,569 words, each has a clear finish line, and they include troubleshooting sections, a "Sources" list, honest limits ("A passing script is evidence for these four checks; it does not establish a real provider connection") and dated verification notes. Readability is suitable: estimated Flesch 51–67 with an average sentence length of 13.5–17 words.
- **Answer-first formatting.** Examples include "Quick answer: as of October 22, 2026, ChatGPT Pro 20x … is available again at $200/month" (/guides/chatgpt-pro-20x.html) and the HeyGen guide's "Quick answer". Comparison tables and FAQ blocks make these pages highly quotable for AI search.
- **Strong technical on-page basics.** All 274 pages have unique titles except one pair, every page has a meta description, there are no duplicate descriptions, each page has exactly one H1, and canonicals are self-referencing. Article, BreadcrumbList, VideoObject and CollectionPage schema are present, and guide authors are linked by `@id` to the homepage Person entity.
- **Enriched watch pages are excellent.** /watch/TuVL2x6IfDk and /watch/qQVAnp4-EpI add chapters, build notes, explicit claim checks ("The '$50,000' figure comes from a third-party forum author… not a Google requirement"), a "What remains unfinished" section and a full transcript. This is clearly more than the YouTube embed.
- **Clear, honest CTAs.** Pricing ($29/$49/$89, annual $290/$490/$890), unlock rules and "Is income guaranteed? No." appear on the homepage. Watch-page CTAs are topic-matched by `src/video-offer.js`, for example the HeyGen video points to the Avatar course with "Included with Premium and VIP." Every guide carries two Skool CTAs plus a newsletter fallback.
- **Good internal linking in guides.** Guides have 15–29 internal links each, descriptive anchors, and a "Keep going" next-step block. /start-here.html routes beginners to a guide, then videos, then courses, by goal.

## Findings

### 1. Most watch pages are thin, templated video wrappers (High)

- **Evidence:** 175 of 274 pages have fewer than 300 words, and 174 of those are /watch/ pages. Across the 220 watch pages the median is 210 words, and only 30 have a transcript (`src/transcripts.json` has 30 entries) and 15 have build notes. /watch/wL6bjqaUcd8 (117 words) contains only the one-sentence YouTube description ("Learn how to give your Hermes Agent a memory upgrade with this SuperMemory plugin!"), the generic "Put what you watched into practice" CTA and four related links. /watch/0jzTOUv_B04 (127 words) has the same pattern. The same YouTube descriptions are repeated verbatim on /videos/<topic> pages, so the unique text on these watch pages is close to zero.
- **Risk:** This is a scaled, low-value pattern under the helpfulness signals in core ranking. It can dilute site-level quality and waste crawl attention that should go to the guides.
- **Recommendation:**
  1. Run `scripts/fetch-transcripts.mjs` for all 220 videos, not just 30, and render a lightly edited transcript.
  2. Prioritise build notes in `src/watch-notes.js` for watch pages that have impressions in Search Console or that match guide topics.
  3. Until a watch page has a transcript or notes, set it to `noindex,follow` in the generator (`src/archive.js` / `scripts/prerender.js`) and drop it from `video-sitemap.xml`. Alternatively, keep only the topic-page listing indexed.
  4. Gate this with a test, for example a page must have at least 300 unique words or a transcript to be indexable.

### 2. Watch pages compete with guides for the same keyword (High)

- **Evidence:** `searchTitle` overrides in `src/watch-notes.js` give watch pages titles that nearly duplicate guide titles:
  - /guides/heygen-ai-avatar-tutorial.html and /watch/pMLyxz6Dyt4 have the **identical** title "HeyGen AI avatar tutorial: create your first video" (`src/watch-notes.js` line 188). Both self-canonicalize.
  - /guides/opencode-vs-claude-code.html ("OpenCode vs Claude Code: pricing, setup and limits") competes with /watch/_8qzOkIWMSk ("Why OpenCode is better than Claude Code: setup and limits") and /watch/Qb6RG0-8O1k ("Claude Code access: the recorded setup and limits").
  - /guides/9router-setup.html ("9Router setup: providers, model combos and request checks") competes with /watch/geKngm3sg3w ("How to use 9Router: setup, providers and request checks").
  - /guides/vapi-voice-agent-tutorial.html competes with /watch/9kHdIiobKMA ("VAPI voice agent: setup, test call and webhook checks").
  - /guides/make-first-automation.html competes with /watch/Lifl4PC2_3M, and /guides/self-host-n8n.html competes with /watch/7UMrV3w1e40.
- **Recommendation:** Let the guide own the head term. Re-title the watch pages with video intent and a differentiator, for example "HeyGen avatar video walkthrough (41-min recording): ElevenLabs + Make.com" or "9Router setup video: live provider test". Do this in the `searchTitle` and `summary` fields of `src/watch-notes.js`. Keep the reciprocal "Prefer reading?" and "Watch" links. Add a test asserting that no watch `searchTitle` matches a guide `<title>`.

### 3. Topic pages have one-word H1s, short titles and little unique copy (Medium)

- **Evidence:** /videos/n8n has the title "n8n videos | Mike Holp" (22 chars) and H1 "n8n". /videos/make-com (27 chars), /videos/ai-agents (28) and /videos/ai-seo (25) are similar. The only unique copy is one line ("14 videos, newest first. Workflows and AI automations in n8n…"). The rest is reused YouTube descriptions.
- **Recommendation:** In `src/topics.js`:
  - Write 55–65 character titles, for example "n8n tutorials: AI automation workflows and self-hosting (14 videos)".
  - Use a descriptive H1, for example "n8n tutorials and AI automation builds".
  - Add a 150–300 word intro covering who the topic is for, where to start, and which guide to read first.
  - On the listing, show trimmed descriptions of 1–2 lines instead of the full YouTube description.

### 4. No dedicated author or About page (Medium)

- **Evidence:** Every guide byline links to `/#about` with `rel="author"`, and the Person schema `url` is `https://www.ai-automation-station.com/#about`. The bio sits inside a long homepage that also hosts pricing, products and a sponsor media kit ("Audience insights", "99 of every 100 viewers are men"). The make-money guides (/guides/make-money-with-ai-*.html, /guides/ai-side-hustles.html) are financial-adjacent, where raters look harder at "Who".
- **Recommendation:** Create /about.html containing the bio, timeline, products, credentials, links to the YouTube channel, GitHub, LinkedIn and X, and the editorial process ("how guides are checked"). Point bylines and the Person `url` at it, and add `sameAs` to the Person schema. Consider moving the media kit to /media-kit.html so the homepage stays focused on members.

### 5. Make-money guides lack first-hand evidence (Medium)

- **Evidence:** /guides/make-money-with-ai-no-experience.html relies on hypothetical framing ("I would follow a deliberately small path", "I would use a message like this") and states "Exercises are proposed checks… not reported client results." That is honest, but it adds no Experience. Five guides target overlapping "make money with AI" intents (no-experience, fast, side-hustles, ChatGPT, small-business services). They cross-link well (9–10 guide links each), but the phrase "make money with AI" appears 13 times in about 2,000 words and is used in H2s ("Make money with AI with no money: use free tiers first").
- **Recommendation:**
  - Add one real, documented case per guide, such as a member build, Mike's own TubeAnalytics or VisiScan pricing decisions, or a priced pilot with numbers and dates.
  - Write H2s for readers rather than for keyword variants.
  - Keep each guide's intent distinct, and consider making /guides/ai-side-hustles.html the hub, with the others targeting their long-tail queries.

### 6. Raw auto-caption transcripts contain errors (Low)

- **Evidence:** The /watch/TuVL2x6IfDk transcript contains "codeex", "handcodeex", "Versal" (Vercel) and "blogtoblog".
- **Recommendation:** Run a brand and term correction pass when generating `src/transcripts.json` (`scripts/fetch-transcripts.mjs`), with a replacement map for Codex, Vercel, n8n and Claude Code. Readable transcripts are also easier for AI search engines to quote.

### 7. A few titles and meta descriptions fall outside the recommended length (Low)

- **Evidence:**
  - Short titles: /watch/TuVL2x6IfDk "Codex internal-link audit" (25), /watch/lbBZ7uLJwbM (26), /watch/Ip8KBwDixJs "GrokBot as a chief of staff" (27), /watch/lumzbY6QV4Y (28), /watch/enKnxKJJFZw (29), /terms.html (29).
  - Short descriptions: /watch/t0nQSyryTPg (39 chars) and /watch/1aG1XbAQj-k (50 chars).
  - /watch/qQVAnp4-EpI's description ends with a truncation "…".
  - 48 of 220 watch pages have a `<title>` that differs from the H1. That is fine when intentional, but the short titles waste space.
- **Recommendation:** Extend these `searchTitle` and `summary` values in `src/watch-notes.js` to roughly 45–60 characters for titles and 120–155 characters for descriptions, and end descriptions on a full sentence.

### 8. HeyGen guide intro repeats the keyword (Low)

- **Evidence:** In its first two paragraphs, /guides/heygen-ai-avatar-tutorial.html uses "HeyGen AI avatar tutorial", "HeyGen tutorial", "how to use HeyGen" and "any HeyGen tutorial". The first H2 repeats the H1 ("HeyGen AI avatar tutorial: set up your first video"). The exact keyword appears 6 times in about 1,800 words.
- **Recommendation:** Edit `public/guides/heygen-ai-avatar-tutorial.html` so the intro reads naturally, and rename the first H2 to describe the step, for example "Plan the audience and frame before you open HeyGen".

### 9. Homepage pulls visitors in too many directions (Low)

- **Evidence:** The homepage has 1,968 words and 4 product or offer destinations: Skool plans, the Runable course, TubeAnalytics trial and VisiScan scan. It also includes a sponsor media kit and audience demographics. The primary H1 CTA is clear ("Build real AI automations." with "From $29/month").
- **Recommendation:** Keep the member funnel above the fold. Move the media kit to its own page, and push the products section below the guides block or onto /about.html.

### 10. Images: about 90 content images have empty alt text (Medium)

- **Evidence:** 577 of 587 images have empty alt text. About 360 are YouTube thumbnails inside cards that already carry a text title, and 128 are member avatar faces beside "Join 2,900+ members". Empty alt is acceptable for both because they are decorative or duplicate the adjacent text. The real gaps are:
  - Hero images on 9 guides: youtube-feed, consent-tracking, claude-code-vs-codex, first-api-request, codex-workflow, make-first-automation, self-host-n8n, hermes-desktop and dataforseo-mcp-claude. They use `alt=""` even though they are informative diagrams with a figcaption. The 5 newer make-money guides do have alt text ("Title card: …").
  - The 24 guide-card images on /guides.html have empty alt (acceptable as decorative).
  - /mike-holp.jpg appears twice on the homepage without alt text and once with "Mike Holp".
- **Recommendation:**
  - Add a descriptive alt to the 9 guide hero images in `public/guides/*.html` that describes the diagram, not the title.
  - Keep `alt=""` on thumbnails and avatars, and add `aria-hidden` to the avatar strip.
  - Add alt "Mike Holp" to the remaining author photos.
  - Add a test in `src/guide-seo.test.js` requiring non-empty alt on each guide's figure image.

### 11. Pagination and search pages (Info)

- /videos/2 to /videos/15 have generic H1s ("Every video") and are fine as crawl paths.
- /search.html is correctly `noindex,follow`.
- No action needed, though a pagination-specific H1 ("Every video, page 2") would be slightly clearer.

## Priority order

1. Enrich or noindex the thin watch pages (Finding 1).
2. De-conflict watch and guide titles (Finding 2).
3. Rework the topic pages (Finding 3).
4. Add an author page (Finding 4).
5. Add real experience to the make-money guides (Finding 5).
6. Add alt text to guide hero images (Finding 10).
7. Low-severity polish (Findings 6–9).
