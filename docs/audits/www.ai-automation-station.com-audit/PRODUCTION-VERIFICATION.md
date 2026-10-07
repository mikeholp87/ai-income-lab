# Production verification — October 7, 2026

## Live site

Verified https://www.ai-automation-station.com after the audit deployment. Homepage, Start Here, both original guides, /videos and /api/youtube returned 200. An unknown route returned a branded 404 with HTTP 404. Response headers include CSP Report-Only, X-Frame-Options DENY, nosniff, strict-origin-when-cross-origin and restricted camera/microphone/geolocation permissions.

Chrome at 390 × 844 showed readable content and a clear primary CTA above the consent banner. The mobile Contact menu link closed navigation. The lazy booking embed loaded dates and times, preserved website UTMs and displayed Requires confirmation. No booking was submitted. Pricing and named course inclusions matched the previously verified offer.

## Production mobile Lighthouse

Run at 2026-10-07T13:11:23.265Z with Lighthouse 12.6.1:

| Metric | Result |
|---|---:|
| Performance | 96 |
| Accessibility | 100 |
| Best practices | 100 |
| SEO | 100 |
| First contentful paint | 1.6 s |
| Largest contentful paint | 2.6 s |
| Total blocking time | 110 ms |
| Cumulative layout shift | 0 |

No console errors were reported. LCP remains slightly above the 2.5-second target in this single laboratory run. These scores describe the deployed version at the audit time, not field performance or later deployments. Saved evidence: evidence/production-mobile-summary.json and evidence/production-http-checks.json. The full Lighthouse run remains at /tmp/production-mobile-lighthouse.json.

## Confirmed conversion measurement

Read the signed-in Cal.com booking records and Skool payment history. Confirmed statuses can be distinguished from pending requests and successful receipts from membership labels. The site's calendar uses event 1022289 (10-Minute Discovery Call); recent AI Discovery Call records belong to a different event. Do not label those as website conversions. The current event's latest past booking was in June; the account showed no upcoming bookings at inspection.

Validated the existing offline reconciliation path with one real, successful new-member Skool receipt. This is a sample import, not a complete period export or an automated provider connection. Only receipt ID, status and date were retained outside the repository, without customer or payment-card details. The provider exposed a date only; no exact payment timestamp was invented. Unavailable UTM attribution stays unknown; a bit.ly referrer is not evidence of a particular campaign.

Full automated attribution remains incomplete. Cal.com Insights displayed a Teams/Organizations requirement; Vercel's aggregate custom-event API returned HTTP 402 requiring Pro or Enterprise. No plan was upgraded. No supported Skool receipt integration has been configured. Use provider exports plus a matching analytics export for complete reconciliation, or configure an authenticated provider integration with trusted receipts. Do not infer purchases from clicks.

## VIP coaching

The owner confirmed weekly one-to-one coaching. Updated the VIP plan, FAQ and llms.txt. Production build passed after the copy change.
