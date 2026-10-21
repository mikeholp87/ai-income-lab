# /videos page audit — 2026-10-21

Live https://www.ai-automation-station.com/videos reviewed at 1440×900 and iPhone 15 (393px) after deploy d3920c3, plus `renderArchive` in `src/archive.js`. 218 long-form videos, 15 per page, 15 pages. HTML 16 KB, CDN-cached; no horizontal scroll; CollectionPage/ItemList schema, canonical and prev/next are correct. Desktop page height 2,701px, mobile 7,138px.

## Findings

### Bugs
1. `summarize()` (`src/youtube.js:21`) takes the first description paragraph without a URL. When a description opens with a chapter list, that list becomes the summary. Today it hits the newest video (Runable, `qQVAnp4-EpI`): its archive card reads "⌚ Timestamps: 00:00 - Intro to…", and its watch page uses the same text as meta description and og:description. 1 of 218 cards affected; every future upload with chapters first repeats it.
2. The shared reading-page cookie bar (`public/consent.css`) breaks on desktop: text pinned left, buttons in a separate 760px box below. Same on guides and start-here pages. The homepage shows one centred row.
3. Cards load only `mqdefault` (320px) thumbnails, shown about 361px wide on phones with 3× screens, so they look soft. The homepage grid already uses a 320w/480w `srcset`.

### Consistency with the homepage
4. Headers differ by page type: homepage "AI INCOME LAB" + section nav + Join; guides pages "Mike Holp" + Start here / Guides / All videos; `/videos` "MIKE HOLP" + YouTube only; watch pages "AI Automation Station" + Guides / All videos.
5. Body text uses the system font instead of Instrument Sans.
6. Cards omit duration and views, which the data has and the homepage cards show.
7. "Privacy choices" in the footer is orange and underlined while its siblings are grey (from `consent.css`).

### Layout
8. `minmax(260px, 1fr)` gives 4 columns on desktop, so 15 cards leave an empty slot in the last row.
9. Summaries run 1–8 lines, so cards in a row have uneven heights.
10. The pager lists all 15 page numbers (three rows of boxes on a phone).

### Content and conversion
11. No path to AI Income Lab anywhere on the archive (only watch pages have one).
12. The intro says every video "builds something real", but many are release breakdowns.
13. The archive says 218 long-form videos; the homepage stat says 345 "videos published" (includes Shorts).
14. Only chronological browsing; no topic pages (Claude Code, Codex, n8n, Make.com, model releases). Out of scope for this plan: needs its own design.
15. The "New here?" line uses inline `style` attributes (`src/archive.js:150`).

### Noted for later (outside /videos)
- Watch pages' header brand ("AI Automation Station") and Skool button label ("Explore plans on Skool ↗") differ from the homepage's "Join AI Income Lab ↗".

## Implementation (2026-10-21)

Plan: `docs/superpowers/plans/2026-10-21-videos-page-fixes.md`.

| | Before | After |
|---|---|---|
| Desktop page height (1440×900) | 2,701px | 2,945px |
| Mobile page height (iPhone 15) | 7,138px | 6,888px |

- Findings 1–12 and 15: done.
- Finding 13 (video counts): left as is (owner decision: no Shorts label).
- Finding 14 (topic pages): not started; needs its own plan.
- New Skool placements: `video_archive_header`, `video_archive`.
- The cookie-bar change in `public/consent.css` also applies to watch, guides and start-here pages.
- Follow-up fixes during implementation: `summarize()` also skips hashtag blocks (the Runable upload has no prose paragraph, so its summary is empty and pages use their default text); Newer/Older pager links hide below 640px so the list fits one row on phones.
- Task 7 (homepage count label) skipped by owner decision.
- Follow-up (owner request): watch pages now use the guides pages' header ("Mike Holp", Start here, Guides, All videos) and the Skool button reads "Join AI Income Lab ↗" (placement `watch_video` unchanged); the phone cookie bar uses the page's 16px side gutter. Screenshots: `followup-watch-*.png`.

Screenshots: `docs/audits/2026-10-21-videos-screenshots/`.

## Topic pages (finding 14)

Plan: `docs/superpowers/plans/2026-10-21-video-topic-pages.md`. Topics live in `src/topics.js` and match video titles.

| Topic | URL | Videos at build |
|---|---|---|
| Claude Code | `/videos/claude-code` | 21 |
| Codex and OpenCode | `/videos/codex-opencode` | 13 |
| n8n | `/videos/n8n` | 14 |
| Make.com | `/videos/make-com` | 9 |
| AI agents | `/videos/ai-agents` | 38 |
| AI SEO | `/videos/ai-seo` | 19 |
| AI video and YouTube | `/videos/ai-video` | 33 |
| New AI models | `/videos/new-models` | 31 |

Misfiles: "Private AI Made Simple: A Beginner's Guide to Ollama" sits under New AI models because `llama` matches inside "Ollama". Borderline: "OpenAI Just Released Dots! Here's What You Need To Know" (Dots is an assistant, not a model) under New AI models, and "The Best Claude Design Alternative You Can Run On Your PC" under Claude Code. Patterns unchanged.

- Follow-up during implementation: on phones the topic row starts scrolled to the current topic (inline script sets the row's scrollLeft; the page does not move).

Screenshots: `docs/audits/2026-10-21-topic-screenshots/`.
