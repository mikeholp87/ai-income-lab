# Guides ("blog") audit — 2026-10-21

The site has no `/blog` (404). Its written content is the Guides section: the hub `/guides.html`, six articles in `public/guides/`, and `public/start-here.html`, all styled by `public/reading.css` (the watch pages share it). Reviewed live at 1440×900 and iPhone 15, plus source at bf1bef0.

Strengths: dated, honest writing with version-checked commands; 8–14 KB pages; skip link, focus outlines and good contrast; Article schema on every guide.

## Findings

### Quick fixes
1. `/blog` returns 404.
2. The flagship guide `claude-code-vs-codex.html` (the only guide with Search Console impressions, ~1,600 words) has no figure, and its og:image and schema image are the generic `og-card.jpg`. The other five have their own `/assets/guides/<slug>.webp`.
3. On the five guides with figures, the image `alt` repeats the `figcaption`, so screen readers read it twice. The images are the social cards reused in-article; real result screenshots would serve readers better (content work, not in this plan).
4. On phones the reading-page header wraps "All videos" onto its own row.

### Consistency with the homepage and /videos
5. Reading pages use the system font instead of Instrument Sans, link colour `#ff927b` instead of `#ff6846`, orange underlined nav links instead of the grey DM Mono nav, and no Join button.
6. Skool links use five labels ("classroom", "check current membership and course access", "Compare current plans", "Compare membership options", "current plans"); six link to the member-only classroom, a login wall for non-members.
7. The hub meta line says "AI Automation Station · By Mike Holp" under a "Mike Holp" header.

### Hub
8. The hub is a bulleted list with no images, paired videos or what-you-need notes, though five guides have images and most have a companion video.
9. Guide topics and the new `/videos/<slug>` topic pages do not link to each other.

### Reading experience
10. The flagship guide (9 sections) has no "On this page" list.
11. Guide endings differ (classroom box, plans box, course-specific box); no consistent next guide / matching video / Join block.
12. Code blocks have no copy button; long commands scroll sideways on phones.

### Content
13. Six guides against 218 videos, none updated since Oct 11. Video topics without any guide: AI agents (38 videos), AI SEO (19), n8n (14). `src/watch-notes.js` already holds written notes for 13 videos. This is an editorial plan, not code; out of scope for the implementation plan.

## Implementation (2026-10-21)

Plan: `docs/superpowers/plans/2026-10-21-guides-fixes.md`.

Commits:
- 1e26a80 Redirect /blog to the guides and stop figures being described twice
- 96cd201 Give reading pages the homepage type, colours and a header with Join
- a912a50 End every guide with next steps and one Join link
- 75fdccb Give the Claude Code vs Codex guide its own image and a contents list
- 676fef2 Show images and paired videos on the guides hub and link guides from video topics
- 1f61da7 Add copy buttons to command blocks on reading pages
- ce6a290 Set watch-page video titles in Instrument Sans (follow-up: watch-page video titles now use Instrument Sans)

Status:
- Findings 1–12: done
- Finding 13: not started (editorial)

New Skool placements: `reading_header` (reading-page header Join button) and `watch_header` (watch-page header Join button).

Verification: ESLint clean, 129 tests pass, `npm run build` completes without `Pre-rendered page is incomplete`, and `dist/guides.html`, `dist/start-here.html` and each `dist/guides/*.html` contain `src="/assets/reading.js"` exactly once.

Screenshots: `docs/audits/2026-10-21-guides-screenshots/` (`t2-*` to `t6-*` per task, `final-desktop-*` at 1440×900 for the hub, start-here, claude-code-vs-codex, make-first-automation and 404, `final-mobile-*` on iPhone 15 for the hub and claude-code-vs-codex). Final check: no sideways scroll (scrollWidth equals viewport width on every page), header on one row on desktop and two rows on the phone, Join and cookie buttons readable. No problems found.

Notes for the owner:
- start-here: "Member next step: … in the members’ classroom" repeats "member" (left as is).
- youtube-feed: the "Source and next step" paragraph and the new "Keep going" box both link the consent-tracking guide (left as is).
