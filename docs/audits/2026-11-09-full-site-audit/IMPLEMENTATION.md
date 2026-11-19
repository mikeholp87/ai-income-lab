# Audit fixes implementation

November 9, 2026. These changes were deployed to production from main as `7b34773`. See [release verification](RELEASE.md).

| Audit action | Result |
|---|---|
| Search discovery | Added Search to desktop/mobile navigation on home and sponsors, and to the Explore footer. Header switches to the mobile menu below 1169px so the additional link fits. |
| Search relevance | Make.com title matches rank above ordinary uses of “make”; other matches remain available. Typing during index loading is preserved. Non-OK index responses use the existing failure message. |
| Project source links | Shared tool mapping now links Tasky, Restic-Studio, Luma-Launcher and Update Forge to their repositories. |
| Latest Windows Herdr page | Added a chapter-backed website title, summary, steps, limits and source note; routes to the desktop companion. The YouTube title is unchanged. |
| Instructional accuracy | YouTube-feed tutorial distinguishes internal watch pages, external fallback and homepage click-to-play. Historical case study includes a dated follow-up. n8n topic uses source-available/fair-code terminology. |
| Welcome recovery | One retry for network/5xx failures with the same private idempotency key. Permanent failure appears in the owner notification. Existing active contacts still skip welcome delivery. |
| Concurrent email requests | Controlled fixtures model two successful contact creates. Same welcome request uses the same provider deduplication key. Owner notices deduplicate the same payload; differing delivery outcomes use separate keys so failure alerts are not suppressed. |
| Privacy copy | Distinguishes broadcast opt-out links from transactional confirmation and welcome-email removal requests. Welcome includes a mailto removal link. |
| Manual recovery | Added [newsletter recovery runbook](../../newsletter-recovery.md) with active-contact and delivery-log checks before replay. |
| Search Console baseline | After explicit approval, read the 28-day comparison, page/query sample, page/video indexing and field-performance status. See [Search Console follow-up](SEARCH-CONSOLE-FOLLOWUP.md). |

Validation:

- All **295 tests pass**, including actual inline search behavior and controlled welcome failure/concurrency tests.
- ESLint passes.
- Vite client production build and SSR/prerender pass. Existing npm configuration and bundled Vercel “use client” warnings remain non-blocking.
- Local built-site browser checks confirm the mobile Search link, Make.com guide as the first `make` result, 8→16 result expansion, and no document overflow at 390, 1024, 1200 or 1440px. Mobile menu and desktop header screenshots were inspected.
- No live newsletter/contact messages, purchases or membership changes were performed.
- Jev Review was invoked but returned `JEV_API_KEY is not set`; no review score is claimed.

Still pending:

1. **Make starter-kit import/run in a real test account.** Existing ZIP contents were inspected; the honest unverified notice remains. A local schema or CSV check does not establish successful Make execution.
2. **Paid conversion baseline.** Search Console access was initially denied, then explicitly approved by the owner and completed through the signed-in browser. The search baseline is now recorded in the follow-up. Verified memberships/refunds and their attribution still require a separate dataset; Search Console does not supply those outcomes.
3. **Strict confirmation-token consumption / opt-out state ordering.** The existing 15-minute reactivation window remains. Guaranteeing that every later opt-out defeats every earlier token requires durable subscription state; no new datastore was introduced.
4. **Low-priority image/bundle optimization and global rate limits.** The measured site already scored 97–100 in the sampled performance runs. No additional assets, bundle architecture or distributed infrastructure were added for score-only changes; estimated byte savings were not converted into a speed claim.

Resend retains idempotency keys for 24 hours. This implementation improves retry and simultaneous-request safety within that window; it is not a persistent exactly-once delivery system. If both welcome and owner notification fail, provider/application logs need operational review.
