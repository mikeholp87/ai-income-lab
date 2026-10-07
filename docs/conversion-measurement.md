# Conversion measurement

The site records outbound interest separately from booking requests and confirmed bookings. The inline Cal.com calendar now works on phones and desktop, passes UTM parameters to Cal.com, and listens for `bookingSuccessfulV2`. The calendar requires manual approval, so the callback records `Call Requested`, not a confirmed booking. One callback is counted per calendar mount, with device and campaign but no attendee details. The direct Cal.com fallback preserves UTM parameters; completions there must be read from Cal.com. Google/Meta application events require the analytics and marketing choice; Vercel measurements remain separately disclosed.

Skool checkout happens on Skool. This site does not receive a trusted payment receipt and must not label outbound clicks as paid signups. No webhook credentials or account configuration were invented.

## Offline reconciliation

Export actual booking and membership/payment records using your providers' existing reporting tools. Export outbound click events for the same interval from your analytics provider. Map only the fields below into a local JSON array; omit names, emails, card details and booking notes. Keep the input outside the repository, for example `/tmp/conversion-records.json`.

Each record requires `provider` (`cal.com` or `skool`), a stable provider/event `id`, `kind` (`click`, `booking`, or `purchase`) and `occurredAt` (original booking/payment/click time, ISO 8601). Bookings require `status` `confirmed` or `cancelled`; purchases require `paid`, `refunded`, or `failed`. Normalize provider statuses deliberately: pending bookings are not confirmed, and a free member is not a paid purchase. Exclude renewals if measuring new-member acquisition; include them in a separate revenue report.

Map `utm_source`, `utm_medium`, `utm_campaign`, and `utm_content` into `source`, `medium`, `campaign`, and `content`. The content value identifies the source video; the medium separates descriptions from pinned comments. Leave unavailable attribution blank. Use `updatedAt` when a later export changes an existing receipt's status; preserve its original `occurredAt`. Duplicate IDs resolve to the newest update. Later refunds/cancellations are excluded from the original interval's successful outcomes. Never match records by names or timing guesses.

Example input shape (illustrative only):

```json
[
  { "provider": "skool", "kind": "click", "id": "event-1", "occurredAt": "2026-10-07T10:00:00Z", "source": "youtube", "medium": "description", "campaign": "october" },
  { "provider": "skool", "kind": "purchase", "id": "receipt-1", "occurredAt": "2026-10-07T10:10:00Z", "status": "paid", "source": "youtube", "medium": "description", "campaign": "october" }
]
```

Run:

```sh
node scripts/reconcile-conversions.js /tmp/conversion-records.json 2026-10-01 2026-11-01
```

The report groups clicks, confirmed bookings, paid memberships and excluded outcomes by destination and campaign. The start is inclusive; the end is exclusive. Missing attribution stays `unknown`. It does not report a conversion rate from these aggregate events because repeated clicks and cross-device visits are not unique prospective customers.

No production outcome data has been imported during this change. Automated purchase attribution requires a supported Skool/payment integration with trusted receipts; configure that in the provider account before replacing this manual reconciliation process.

Cal.com documentation: [UTM tracking](https://cal.com/help/bookings/utm-tracking).

## Written-guide campaign

The Start here page and guides reuse the homepage's consent state and Google/Meta loader. They record `guide_view` once per page load after consent, and `cta_click` plus `skool_outbound_clicked` for community links. Each event includes `page_path`, `source`, `medium`, `campaign`, and `content`. Meta receives the existing custom `SkoolOutboundClicked` event. Declining consent stops these application events; no guide event implies a paid membership.

Links preserve public UTM labels through same-origin pages and this community's Skool URLs. They do not propagate arbitrary query parameters or decorate unrelated external destinations. This uses the current URL, not a new persistent attribution cookie. Homepage community events now carry the same campaign fields.

Use campaign `build-guides-2026-10`, source `youtube`, medium `description` or `pinned_comment`, and content equal to the source video ID. In GA4 compare guide views and community clicks by campaign/content; these consented events undercount readers who decline. In Skool use actual successful payment records for new memberships. If Skool does not retain the UTM values, record attribution as unknown; this site cannot reconstruct it reliably.

Review a complete 28-day interval after the YouTube links go live, using the same reporting timezone for comparisons. Record the actual activation date in `docs/growth/2026-10-07-rollout.md`; do not count the pre-publication interval as exposed traffic. Review indexing after about a week. No automatic scheduled job or reminder is created by these code changes.
