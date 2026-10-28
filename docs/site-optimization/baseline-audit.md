# Baseline audit — October 28, 2026

Live site: https://www.ai-automation-station.com (production commit `b337798`). Work branch: `site-optimization`.

## Project

- Vite 8 + React 19 homepage (`src/main.jsx`), server-rendered at build time by `scripts/prerender.js`.
- Static HTML pages in `public/` (guides, about, start-here, privacy, terms, search, 404) share `public/reading.css` and `src/reading.js`.
- Vercel functions in `api/`: `/watch/:id`, `/videos[/:page|/:topic]` and the video sitemap (`api/videos.js`), the contact form (`api/contact.js`), the newsletter (`api/subscribe.js`), the YouTube feed and the email open pixel.
- Hosting and headers: `vercel.json`. Content comes from local files plus the YouTube API. There is no CMS.
- Tests: `npm test` (Node's test runner, 187 tests), `npm run lint` (ESLint 9). No TypeScript.
- Signup and payment happen on Skool (`skool.com/ai-automation-station-7346/plans`). Sponsor calls are booked through Cal.com.

## Routes

`/` (community, plans, videos, guides, products, about, media kit, sponsor packages, sponsored videos, contact, FAQ) · `/about.html` · `/start-here.html` · `/guides.html` + 24 guides · `/videos` with pages and 10 topic hubs · `/watch/:id` · `/search.html` · `/privacy.html` · `/terms.html` · `/404.html`. There is no separate membership, checkout or confirmation page on this domain; all of that happens on Skool.

## Measurements (live, before changes)

| Check | Result |
|---|---|
| Lighthouse mobile, homepage | Performance 99, Accessibility 100, Best practices 100, SEO 100. LCP 2.0 s, CLS 0, TBT 10 ms |
| Lighthouse desktop, homepage | 100 / 100 / 100 / 100. LCP 0.8 s |
| axe-core (WCAG 2.2 AA + best practice), 5 pages × 390/1366 px, homepage at 320 px | 0 violations |
| Horizontal overflow | None at 320, 390 or 1366 px |
| Console errors | None |
| Tap targets under 24 px | Header brand link (14 px tall); "Privacy choices" button on static pages is exactly 24 px |

These are lab measurements from one machine. Real-user field data comes from Vercel Speed Insights, which was added on October 28 and needs a few weeks of traffic.

## Findings, ranked

| # | Finding | Type | Impact |
|---|---|---|---|
| 1 | Two products (TubeAnalytics, VisiScan) appear in the main nav as "Tools", each with a primary orange trial/scan button that competes with Join | Observed | High: dilutes the single offer |
| 2 | The Runable course CTA opens the Skool group URL; every other Join button opens the plan picker | Observed | Medium: inconsistent destination |
| 3 | Annual prices ($290/$490/$890) appear only inside an FAQ answer; plan cards say "annual billing is available" without amounts | Observed | Medium: pricing readability |
| 4 | Nothing explains what happens after clicking Join (new tab, Skool account, payment on Skool) | Observed | Medium: trust at the hand-off |
| 5 | Nav label "Services" and heading "What I offer." describe sponsor packages, but on a membership page they read as services for members | Hypothesis | Medium |
| 6 | Hero copy says "reusable templates" for a $29 offer, but Skool lists the n8n template library on VIP only | Observed | Medium: accuracy |
| 7 | Plan clicks are tracked only by button text, so plan choice is hard to report | Observed | Low–medium |
| 8 | Header brand link is a 14 px tap target | Observed | Low |
| 9 | Forms have validation and a honeypot but no rate limit | Observed | Low: needs storage or a Vercel firewall rule |

Performance, accessibility and SEO were already strong, so no redesign or speed work was justified.
