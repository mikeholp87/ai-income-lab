# Personal hub design audit

Audited October 6, 2026, after the page became a personal hub (`bdc0fc6`). Scope: the live homepage at 1440 × 900, 390 × 844 and 320px, plus `src/main.jsx` and `src/styles.css`. This is an audit with proposals; no application code was changed.

**Recommendation: fix the two layout bugs now, then let the videos lead.** The page's most vivid, specific material is Mike's own thumbnails, and they sit below the fold and are split across two sections. The design around them spends its emphasis on uppercase slogans, orange labels and monospace text, so nothing stands out.

## Context that shapes the proposals

- The October 4 audit proposed a light, sans-led redesign. It shipped and was then rolled back (`96a7cea`), and the dark-only identity was kept. The proposals below keep the existing palette and fonts and change how they are used.
- Subject: Mike Holp tests new AI tools on real builds, most days, on YouTube. Audience: viewers arriving from the channel and builders comparing tools. The page's main job is to get someone watching or subscribed. Its second job is to route people to TubeAnalytics, VisiScan and AI Income Lab.

## Measurements

| Check | Result |
|---|---|
| Document height, 1440px / 390px | 8,210px / 11,926px |
| Tallest mobile section | Latest posts, 2,321px (6 single-column cards) |
| Horizontal overflow at 320px | None (document width 320px) |
| Text elements set in DM Mono | 121 of 185 (65%) |
| Uppercase Archivo Black headings | 12, including every section heading |
| Links ending in ↗ | 19 |
| Lowest text contrast | 6.02:1 (muted text on panels); every pair passes WCAG AA |
| Subscribe button bottom edge, first view | 771px desktop, 629px mobile; clear of the consent bar |
| PageSpeed (jev-seo run, same day) | Mobile performance 97; accessibility, best practices and SEO 100 |

## What to keep

- The live feed: real thumbnails, durations, view counts and a daily refresh. This is the page's best material.
- Honest copy. "Show you what held up and what broke" and "leave the mistakes in" give the page a specific voice. The FAQ answers about costs and income are plain and accurate.
- The quality floor: skip link, visible focus, reduced-motion handling, AA contrast, no overflow at 320px, and a user-triggered video embed.
- The plan list in the community section: three rows with name, inclusions and price. It is compact and readable.

## Findings

### 1. Bug: member avatars cover the member count on mobile

**Priority: high. Effort: one line.**

At 390px the `.avatars` flex item shrinks to 129px, but its 8 overlapping 32px images need 200px. The images spill over "2,900+ members building AI workflows on Skool". At 1440px there is room, so it only shows on narrow screens.

**Fixed in `d5a990b`:** the avatars no longer shrink, and the row wraps so the text drops below them when there is no room beside them. Verified at 320, 390 and 1440px.

```css
.members { display: flex; flex-wrap: wrap; align-items: center; gap: 10px 14px; margin-top: 28px; }
.avatars { display: flex; flex: none; }
.members p { flex: 1 1 200px; /* ... */ }
```

Evidence: [members-390.png](2026-10-06-screenshots/members-390.png).

### 2. Bug: the play button hides the poster's headline

**Priority: high. Effort: a few lines.**

The community video poster has its own painted headline, "STOP JUST LEARNING AI". The centered orange play button sits on top of it and hides "AI".

**Fixed in `d5a990b`:** the button moves to the lower left. A fixed 72px button still covered "LEARNING" at 390px, because the poster's text scales with the frame and the button did not. The button is now sized and placed as a share of the frame, so it starts 67% or more of the way down at 320, 390, 768, 1024 and 1440px. The headline ends about 64% down.

```css
.community-video .play-key { top: auto; left: 5%; bottom: 6%; width: min(72px, 15%); height: auto; aspect-ratio: 1; transform: none; }
.community-video .play-key svg { width: 40%; height: 40%; }
.community-video .play-overlay:hover .play-key { transform: scale(1.06); }
```

Evidence: [community-video-1440.png](2026-10-06-screenshots/community-video-1440.png).

### 3. The videos are split, and the best one starts below the fold

**Priority: high. Effort: about a day.**

The page has two video sections, "Latest video" and "Latest posts". Tools, Code and Community sit between them, so a visitor sees the newest upload, three unrelated sections, then six more uploads. The hero's "New video yesterday" pill points at a section that starts below the fold.

- Merge the featured player and the six-video grid into one section directly after the hero.
- On mobile, show the six videos as a compact list (thumbnail on the left, title and date on the right), or as a horizontal strip. The list form would roughly halve the current 2,321px.
- Remove the four-item topic list beside the featured player; the thumbnails below already show the range of topics.

### 4. Emphasis is spread so evenly that nothing stands out

**Priority: medium. Effort: about a day. Depends on whether the uppercase and monospace look is a deliberate brand choice.**

Every section repeats the same treatment: an orange `~/path` label, an uppercase Archivo Black heading, then muted text. Orange marks the H1's second half, every label, every bullet, every tagline, every timeline year, the FAQ toggles and every button. DM Mono sets 65% of the text, including the hero paragraph, nav, buttons and tool facts, which makes body copy slower to read.

- **Headline:** keep the uppercase Archivo Black H1 as the one loud moment, all in the text color. Coloring the second half orange is the most common headline treatment on generated pages, and it competes with the Subscribe button.
- **Section headings:** set them in Instrument Sans 600, sentence case, around 36px on desktop and 28px on mobile. Use Archivo Black only for the H1, the stats numerals and prices.
- **Labels:** remove the `~/latest`, `~/tools` and other path labels. The nav already names each section, and an orange label above every heading reads as template chrome.
- **Monospace:** keep DM Mono for real data only: dates, views, durations, repo names, years and prices. Set the hero paragraph, buttons, nav and tool facts in Instrument Sans.
- **Orange:** use it for the primary action, the play buttons and the live dot. Everything else goes to the text or muted color.
- **Hero paragraph:** set it left-aligned in Instrument Sans at 18 to 19px. It is currently 5 centered lines of 14 to 15px monospace.
- **↗:** keep it on inline text links, where it signals an external site, and drop it from filled buttons.

If the uppercase and monospace look is intentional, skip this finding and keep findings 1 to 3 and 5.

**Done (owner chose to apply it, keeping the centered hero):** the H1 is one color; section headings, tool names and the footer line are Instrument Sans 600 in sentence case; the `~/path` labels are gone; DM Mono is left on data (channel URL, dates, views, durations, repo names, languages, years, prices). Orange remains on actions, play buttons, the live dot, the brand mark, and hover and focus feedback. Filled buttons lost the ↗. The hero paragraph stays centered to match the centered hero, set in Instrument Sans at 19px (17px on phones). Measured on a local build: DM Mono text elements fell from 121 of 185 to 43 of 169, uppercase text from 12 elements to the 2 lines of the H1, and ↗ links from 19 to 12; no overflow at 320px.

### 5. Repetition and section order

**Priority: low. Effort: hours.**

- "2,900+" appears in the stats strip, the community heading and the member row, close together. Say it once in the community section.
- The Code section (923px on desktop) sits between Tools and Community. For a channel audience it works better inside About, as "Things I've built", next to the timeline it supports (Swiftris appears in both).
- `index.html` FAQ structured data lists 3 of the 7 visible questions, and its cost answer is worded differently from the visible one. Generate it from the same `faqs` array, as the October 4 implementation did.

**Done:** "2,900+" now appears once, in the community heading; the stats strip shows the 3 live channel numbers and the member row reads "Some of the members building AI workflows on Skool". The repo list moved into About as "Things I've built", below the timeline; "Code" left the nav and the `#code` anchor still works. The FAQ structured data was removed instead of generated: Google has limited FAQ rich results to well-known government and health sites since 2023, so keeping it in sync was not worth the code. Verified at 320, 390 and 1440px with no horizontal overflow.

## Proposed direction: the latest test is the hero

The most characteristic thing in this subject's world is the day's build: a thumbnail with Mike's face, a tool name, and a verdict. The proposal makes that the hero and keeps everything around it quiet, so the thumbnails supply the color.

| Token | Value | Role |
|---|---|---|
| Ink | `#070b14` | Page background (unchanged) |
| Panel | `#0f1626` | Media frames and the player only; stop alternating section bands |
| Text | `#e8ecf5` | Headings and body, including the whole H1 |
| Muted | `#8b95ad` | Metadata and secondary copy |
| Line | `#1d2740` | Dividers that separate list rows |
| Signal | `#ff6846` | Subscribe, play buttons and the live dot, nothing else |

Type: Archivo Black for the H1, stats numerals and prices. Instrument Sans for everything you read: 18px body, 36px section headings, 22px video titles. DM Mono at 13px for dates, views, durations and repo names. All prose is left-aligned.

```text
Desktop                                             Mobile
Mike Holp            Videos  Tools  Community  About  Mike Holp            Menu
                                                     NEW AI TOOLS,
NEW AI TOOLS,         +--------------------------+  TESTED ON REAL BUILDS.
TESTED ON REAL        |                          |  I'm Mike Holp. Most days I
BUILDS.               |   latest thumbnail       |  build something real with a
                      |          (play)          |  new AI tool, on camera.
I'm Mike Holp. Most   |                    13:03 |  [ Subscribe on YouTube ]
days I build ...      +--------------------------+  +------------------------+
[ Subscribe ]         Oct 5, 2026   109 views       | latest thumbnail (play)|
5.1K subscribers,     GrokBot Is The Ultimate AI    +------------------------+
336 videos            Chief Of Staff                GrokBot Is The Ultimate...
-------------------------------------------------  [thumb] title, date
[thumb] [thumb] [thumb] [thumb] [thumb] [thumb]     [thumb] title, date
 title   title   title   title   title   title      [thumb] title, date
                                                     ...
Tools I built   (TubeAnalytics | VisiScan)
AI Income Lab   (plans + tour video)
About Mike      (story, timeline, things I've built)
Questions
```

**Alternative with less change:** keep the centered hero exactly as it is, and move the merged video section directly below it. This keeps the brand moment and fixes the split, but the first screen still shows no video.

**Optional, needs Mike's input:** the hero promises "what held up and what broke". A one-word verdict per video ("Held up", "Broke", "Mixed"), entered by Mike and shown beside each title, would make that promise visible in the feed. Do not infer verdicts from titles.

### Self-review against the brief

- **Palette:** a near-black page with one vermilion accent is a common default. It is kept because the owner chose it twice. To stop it reading as a template, the accent is restricted to three uses so the colorful thumbnails carry the page.
- **Hero layout:** a statement beside a video is also a common creator layout. What makes this version specific is that the player always shows today's real upload, with its real date and views, rather than a promo reel.
- **Removed from my first draft:** a numbered "test log" layout (01 / 02 / 03), because the videos are not a sequence. Also a tinted gradient behind the hero, because it decorated without informing.

## Order of work

| Order | Change | Check |
|---|---|---|
| 1 | Findings 1 and 2 | Screenshot at 320, 390 and 1440px |
| 2 | Merge the video sections and compact the mobile list (finding 3) | Mobile height and position of the first thumbnail |
| 3 | Type and accent changes (finding 4), if the brand allows | Side-by-side screenshots, readability of the hero paragraph |
| 4 | Video-led hero, or the lower-change alternative | Subscribe and video-play rates before and after, from existing `CTA Clicked` and `Video Played` events |
| 5 | Repetition and order (finding 5) | Visual review; FAQ schema matches the visible FAQ |

## Screenshots

- [Desktop first view with consent bar](2026-10-06-screenshots/desktop-first-view.png)
- [Mobile first view with consent bar](2026-10-06-screenshots/mobile-first-view.png)
- [Desktop full page](2026-10-06-screenshots/desktop-full.png)
- [Mobile full page](2026-10-06-screenshots/mobile-full.png) (lazy-loaded thumbnails lower in this capture had not loaded; they load normally when scrolled)
- [320px hero](2026-10-06-screenshots/mobile-320-hero.png)
- [Member row overlap at 390px](2026-10-06-screenshots/members-390.png)
- [Play button over poster headline](2026-10-06-screenshots/community-video-1440.png)
