# Verification results — October 28, 2026

Local production build (`vite build` + `scripts/prerender.js`, snapshots not refreshed) served with `vite preview`. Checks were scripted with Playwright, axe-core 4 and Lighthouse in Chrome.

| Check | Result |
|---|---|
| `npm test` | 187 pass, 0 fail |
| `npm run lint` | No issues |
| Production build and prerender | Pass |
| axe-core (WCAG 2.2 AA + best practice), homepage at 320, 390 and 1366 px | 0 violations |
| Horizontal overflow | None at any width |
| Small tap targets | None on the homepage (the brand link is now 44 px) |
| Keyboard, desktop | Skip link → brand → Plans, Videos, Guides, About, FAQ, Sponsors, Contact → Join → hero Join → Watch a free build. Every stop has a visible focus style |
| Keyboard, mobile menu | Enter opens the menu, Tab reaches "Plans" first, Escape closes it and returns focus to the Menu button |
| Skool links | All 8 Join and plan links open `/plans` in a new tab; footer links go to `/about` and member login |
| Campaign tags | `?utm_source=youtube&utm_medium=description&utm_campaign=test&utm_content=abc` is carried onto the hero Join link |
| JSON-LD | Parses; Product has 3 monthly and 3 annual offers |
| Lighthouse mobile (local server) | Accessibility 100, SEO 100. Performance 96 and best practices 96, lower than live only because the local server lacks compression and a CDN, and Vercel's `/_vercel/*` scripts return 404 there |
| Console | Only those two expected Vercel-script 404s |

## Not verified

- A Vercel preview or production deploy of this branch (not deployed, per the brief).
- Real screen readers (VoiceOver, NVDA) and 200% browser zoom.
- That GA4, Meta and Vercel receive the new `plan_name` and `plan_price` properties; that needs consent granted on a deployed build and a look at each dashboard.
- Skool checkout itself; no account was created and nothing was purchased.
- Course names and level unlocks inside the Skool classroom.
- No form was submitted, so no email was sent.
