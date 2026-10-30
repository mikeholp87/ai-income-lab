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

---

# Verification results

Live and local Chrome checks on October 29: at a 390px viewport the live guide title began around 352px; locally it began around 304px. The live homepage primary button ended around 504px; the revised local version ended around 477px. At 320px local homepage document width fell from 356px to 320px after the footer fix. Tablet and desktop layout widths were inspected; local homepage console showed no captured errors. These are layout observations, not speed or conversion results.

The public Skool plans page was inspected without signing in or purchasing. The local homepage rendered the updated text and links. After the interruption, commit `9295231` changed the plan layout and removed the classroom list and tour. The final test suite, lint and production build passed against that newer code; the browser observations above predate that commit. The build used saved video snapshots because network fetches failed. No standalone typecheck script exists.

The requested `gitleaks git --redact --no-banner` history scan examined 255 commits and reported 13 findings. They were not investigated or adjudicated here; review them securely before pushing, and rotate any confirmed active credentials.

October 30 follow-up: a fresh history scan reported the same 13 findings across 266 commits. Inspection of their source context identified 12 occurrences of Airtable base/table identifiers and one IndexNow verification key intentionally published as a verification file. These findings are not Airtable access tokens. This assessment applies to the reported matches, not a guarantee that history contains no other secrets.

The current plan cards were checked in local Chrome at 320, 768 and 1440px: document widths matched viewport widths and cards did not overflow. All three links point to the Skool plan picker. At 320px, Enter opened the mobile menu, Tab reached Plans with a visible outline, and Escape closed it and restored focus. On the contact form, with marketing requests blocked, focusing Submit generated zero form-start events; focusing Name and then Email generated one event containing only the contact placement. No form was submitted.

Fresh comparable Lighthouse before/after measurements, real-user metrics, complete keyboard and screen-reader testing, live analytics event receipt, provider-side form delivery, and all URLs were not verified. Automated and visual checks do not establish accessibility compliance. Recheck production metadata, redirects, consent, events and representative mobile/desktop journeys on an approved preview before release. Roll back by reverting the scoped code and sitemap changes and rebuilding; no production data migration is involved.
