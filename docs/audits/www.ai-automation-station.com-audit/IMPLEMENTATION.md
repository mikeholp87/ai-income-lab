# Audit implementation — October 7, 2026

Verified locally before commit; deployment checks remain pending. Existing responsive thumbnails, lazy media, and the WebP community poster were preserved.

## Action status

| # | Implementation | Status / remaining check |
|---|---|---|
| 1 | Shared pixel handler looks up the send token before writing Opens; rejects missing or mismatched sends | Mocked checks pass; no production Airtable writes used for testing |
| 2 | Shorter hero and compact consent banner keep the main CTA visible | Verified at 320×740, 390×844, 1366×768; desktop screenshot also checked at 1440×900 |
| 3 | Removed cursor animation, moved real video into hero, prerendered feed, preloaded heading/body fonts | Local mobile performance 93 then 95; final TBT 40 ms, LCP 2.7 s, CLS 0. LCP remains above the 2.5 s target; verify on deployed hosting |
| 4 | source-map-js updated to 1.2.2 | npm audit: zero vulnerabilities |
| 5 | Banner identifies Google Analytics and Meta Pixel, with Allow both / Decline; loader and events check consent | Unit checks cover no choice, decline, allow, and revocation/regrant; privacy wording updated |
| 6 | Decorative drifting cursors removed; reduced-motion scrolling preserved | No indefinite hero animation |
| 7 | Native mobile menu closes on selection and Escape | Browser verified Contact navigation and Escape focus returning to summary |
| 8 | Added verified named course previews, classroom entry link, and plan help contact | Saved course access settings verified in Chrome with user approval. Plan descriptions, course previews, FAQ, and Start Here now explain tier/level unlocks; annual pricing added. Owner confirmed weekly one-to-one VIP coaching on October 7; plan copy, FAQ, and llms.txt now specify this |
| 9 | Added automojic@proton.me across support/policy surfaces; trial payment/cancellation note beside CTA | Implemented |
| 10 | Mobile inline Cal.com calendar preserves UTMs; deduplicated Call Requested event; provider-record reconciliation script | Mobile embed verified. Calendar requires manual approval. Actual confirmed bookings/payments need provider exports; automated Skool receipts are not configured |
| 11 | Short introduction with video beside it on desktop and below it on mobile | Implemented; no claim of conversion lift without live results |
| 12 | Validated build-time YouTube snapshot initializes both prerender and browser refresh | Network refresh and offline fallback builds both passed; raw HTML contains video links |
| 13 | Start Here collection plus two original written build guides; sitemap and llms.txt updated | Local links/assets checked; Start Here rendered in browser |
| 14 | Report-only CSP and branded 404 page | Configured. Hosting must verify the actual unknown-route HTTP 404 and CSP reports; local Vite preview uses SPA fallback and does not apply Vercel headers |

## Verification

- `npm test`: all six test files pass, including pixel write protection, consent loading, validated snapshots, and conversion deduplication/refunds.
- `npm run build`: passes; latest network-enabled build refreshed the public YouTube snapshot. Offline builds retained the saved valid snapshot.
- `npm audit --json`: zero vulnerabilities.
- `git diff --check`: passes.
- Final local Lighthouse 12.6.1 mobile: performance **95**, accessibility **100**, best practices **96**, SEO **100**. The best-practices deduction is the Vercel analytics script returning 404 in local preview; production provides that endpoint.
- Before audit on production: mobile performance 75/78, TBT 760/610 ms, LCP 2.6/2.8 s. Local and production transport differ, so these are directional measurements, not a guaranteed production improvement.
- Browser: no horizontal overflow at tested phone/laptop sizes; CTA clears banner; menu closes on Contact/Escape; embedded mobile calendar loads with UTMs. No real booking, payment, or optional-marketing consent submitted.

## External follow-up

Chrome classroom, pricing settings, and course access settings were inspected with explicit user approval after the initial automatic-review block. No Skool settings were changed or saved. Verified saved rules:

- Beginner’s Automation Course: level 2 OR Premium and above.
- VAPI AI Voice Agent Course: level 4 OR Premium and above.
- Complete AI Avatar Video Course: private, with Premium-and-above access enabled; individual manual grants are also possible.
- Ultimate N8N Template Library: private, with VIP access enabled; individual manual grants are also possible.
- Standard/Premium/VIP annual prices: $290/$490/$890. Monthly prices remain $29/$49/$89.

The site describes membership inclusions without claiming that manual exceptions cannot exist. VIP weekly calls are listed in saved plan benefits. The owner confirmed one-to-one coaching on October 7, 2026; website copy now states that format.

The offline reconciliation tool accepts normalized provider exports; it has not imported real customer data. See [conversion measurement](../../conversion-measurement.md). Live conversion comparisons require actual outcome records and traffic after deployment.

CSP is report-only with console diagnostics, without a collection endpoint. Review real embed/tracker requests on deployed hosting before enforcing it. The branded 404 file exists, but this report does not claim the hosting response status was tested locally.

## Evidence

- [Final mobile Lighthouse JSON](evidence/implementation-mobile.json)
- [Laptop layout](screenshots/implementation-laptop.png)
- [320px phone layout](screenshots/implementation-mobile-320.png)
- [Mobile calendar](screenshots/implementation-mobile-booking.png)
