# Landing page design audit — 2026-10-21

Live site https://www.ai-automation-station.com/ reviewed at 1440×900 and iPhone 15 (393px), plus `src/main.jsx` and `src/styles.css` at commit 83cbfa2. The Oct 7 visual direction (Archivo Black uppercase headings with an orange closing clause, DM Mono, tracked-caps labels, pill buttons, scroll reveals) is out of scope: findings cover structure, copy and bugs.

Main job of the page: send visitors to join AI Income Lab on Skool. Page height before changes: about 10,555px desktop, 14,266px mobile.

## Findings

### Bugs and broken layout
1. On phones each plan's price renders after its features and "Choose" link (`.plan-list > li` becomes a column and the price is the last child).
2. Product card buttons sit at different heights: TubeAnalytics has a note under its button, VisiScan does not, and `.tool ul { margin: … auto }` absorbs the difference.
3. About section, desktop: about 700px of empty column under the portrait.
4. The nav, hero and footer Join buttons go to the Skool About page, though `main.jsx:18` says the plans page skips an extra Join click. Needs an owner decision.

### Repeated content
5. The hero status pill repeats the title of the featured video beside it on desktop. (The featured video and Runable promo overlap only while the newest upload is the Runable video.)
6. Course unlock rules are explained three times: plan list, "Inside the classroom", FAQ #3.
7. "Course access varies by plan" repeats (hero fine print, featured video, pricing area).
8. "Build something real, leave the mistakes in…" appears in About and Contact.
9. "Start a free build" links appear three times.

### Too many exits
10. The videos section offers seven exits (three buttons, grid, guides box, "Build with AI Income Lab" button, "Every video on YouTube" link).
11. Below pricing: a "View plans" button that repeats the three plan links, plus three lines of small links.
12. "Things I've built" lists five repos on a sales page.
13. FAQ #8 asks about TubeAnalytics and VisiScan inside the membership FAQ, before they are introduced.

### Copy
14. Two brand names (AI Income Lab, AI Automation Station) are never related to each other.
15. One Skool destination has six button labels: Join, Explore plans, Explore the course, Choose X, View plans, Build with.
16. "YouTube loads only after you press play." describes an implementation detail.
17. The ↗ new-tab marker is used on some new-tab links and not others.
18. Section labels "AI Income Lab" and "Keep exploring" carry no information.

### Typography
19. Three families with no rule: prose switches between DM Mono and Instrument Sans by section.
20. DM Mono's curly f reads as ƒ at body sizes ("ƒrom $29/month").
21. The guides box uses a different visual system (sans, sentence-case heading, widely spaced underlined orange links).

### Order and navigation
22. The nav has no pricing entry.
23. Channel stats sit between videos and products instead of near the pricing they support; the 2,900+ members figure is not among them.
24. The contact section is taller than its content needs.

Screenshots from the audit session were not committed; re-capture with the commands in the implementation plan.

## Implementation (2026-10-21)

Plan: `docs/superpowers/plans/2026-10-21-landing-page-audit-fixes.md`. Source checks: `src/homepage.test.js`.

| | Before | After |
|---|---|---|
| Desktop page height (1440×900) | 10,555px | 9,670px |
| Mobile page height (iPhone 15) | 14,266px | 13,064px |

- Findings 1–3, 5–18, 21–24: done (see commits).
- Finding 19–20 (prose typeface): done.
- Finding 4 (Join destination): switched to plan picker (owner decision).
- Tracking changes: removed placements `community` (View plans) and `video_grid`; removed `latest_posts` YouTube link; `button_text` now "Join AI Income Lab" for `featured_video` and `runable_course`; `start_free_build` now fires from `latest`.
- Found in final review: the sticky portrait (finding 3) pinned the photo over the bio on one-column layouts, because sticky is bounded by the whole About grid, not the photo's row. Fixed with `position: static` at `max-width: 960px` (pinned by `src/homepage.test.js`); `final-mobile-9600.png` shows the bug before the fix.
- Kept on purpose: the featured video's default access line ('Course access varies by plan.') comes from `src/video-offer.js`, shared with watch pages.

Screenshots: `docs/audits/2026-10-21-implementation-screenshots/`.
