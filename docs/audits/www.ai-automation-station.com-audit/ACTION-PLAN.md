# Recommended improvements — October 7, 2026

Audit only; no application changes made. Effort estimates are approximate.

| Order | Change | Priority | Effort | Acceptance check |
|---|---|---|---|---|
| 1 | Validate pixel send tokens before writing open records | High | 1–3 hours | Unknown token returns GIF and makes zero Airtable writes; valid tokens preserve current behavior |
| 2 | Keep Subscribe visible above the consent bar | High | 1–3 hours | Entire CTA and focus visible at 320×740, 390×844, 1366×768 and 1440×900 with banner present |
| 3 | Profile and reduce mobile initial rendering work | High | Half–one day | Repeat same lab setup; target TBT below 200 ms and LCP at or below 2.5 s without removing useful content |
| 4 | Patch source-map-js to a resolved fixed version | Medium | Under 1 hour | Advisory cleared; build and existing tests pass |
| 5 | Make analytics/marketing choice explicit | Medium | 1–3 hours | Banner, policy, and enabled trackers describe the same purposes |
| 6 | Stop cursor motion within five seconds, or add pause/hide | Medium | Under 2 hours | No indefinite uncontrolled animation; text remains unobscured; reduced-motion behavior retained |
| 7 | Close mobile menu after selection and on Escape | Medium | Under 1 hour | Contact navigates correctly and menu no longer covers the destination |
| 8 | Explain Premium/VIP with specific real inclusions | Medium | 2–4 hours | Website and verified Skool offer agree; buyer can identify why each upgrade costs more |
| 9 | Clarify support contact and trial conditions | Medium/Low | Under 1 hour | Public support path available; payment-details requirement beside TubeAnalytics trial CTA |
| 10 | Reconcile completed bookings/purchases with outbound campaigns | Medium | Depends on existing integrations | Mobile/desktop completions distinguishable from clicks; no double-counting |
| 11 | Test shorter hero and earlier video preview | Opportunity | Half day | Compare video-play/subscription-click rates; do not assume a lift |
| 12 | Prerender a cached latest-video snapshot | Medium | Half day | Raw homepage HTML contains useful latest-video links, while browser refresh remains current |
| 13 | Curate a Start here collection and a few written build guides | Opportunity | Ongoing | Useful prerequisites, resources and real outcomes; track search and audience response |
| 14 | Add CSP in report-only mode and a branded 404 | Low | Half day | No legitimate embeds blocked; nonexistent URLs retain HTTP 404 |

Use the current dark visual identity and existing React/CSS implementation. A framework migration, new component library, or comprehensive redesign is not justified by these findings.

Full evidence and caveats: [FULL-AUDIT-REPORT.md](FULL-AUDIT-REPORT.md).
