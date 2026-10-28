# Measurement plan

Existing setup, unchanged: Vercel Web Analytics and Speed Insights (cookieless, always on); GA4 `G-XYRWT4PFN8` and Meta pixel `2384492104905321`, both only after the visitor allows them. See `docs/conversion-measurement.md` for the consent rules and the offline Skool/Cal.com reconciliation.

## Events

| Event (Vercel / GA4) | Trigger | Key properties | Notes |
|---|---|---|---|
| `View Pricing` / `view_pricing` | Plan list is 25% visible, once per page load | `angle` | Meta `ViewContent` when consented |
| `CTA Clicked` / `cta_click` | Any tracked button | `placement`, `button_text`, `link_url`, `action` | |
| `Skool Outbound Clicked` / `skool_outbound_clicked` | Any Join or plan link | `placement`, UTM fields, `video_id` (featured video) | Meta `SkoolOutboundClicked` |
| — plan choice | Plan link in pricing | adds `plan_name`, `plan_price`, `currency` | New on this branch |
| `Message Sent` / `message_sent` | Contact form accepted by `/api/contact` | `placement` | No form contents |
| `Newsletter Signup` / `newsletter_signup` | `/api/subscribe` succeeded | `placement` | No email address |
| `Call Requested` | Cal.com `bookingSuccessfulV2`, once per mount | `device`, `campaign` | A request, not a confirmed call |

Each click fires once per click. Email addresses and form contents are never sent to analytics.

## The limit

Measurement stops at the outbound click to Skool. This site cannot see completed signups, payments, refunds or cancellations, and an outbound click is not a signup. Paid conversions come from Skool's own records, reconciled with `scripts/reconcile-conversions.js`.

Smallest next step for automatic purchase data: Skool Pro's "New Paid Member" trigger through an authenticated Zapier connection, written to a private store. That needs the owner's approval and account access.

## Reviews

- **Day 30 (around Nov 27):** in GA4 and Vercel, compare pricing views, `skool_outbound_clicked` by `placement` and `plan_name`, and Join clicks per visit against the 30 days before release. Check Speed Insights field data (LCP, INP, CLS) for the homepage and guides. Pull new paid members from Skool for the same window.
- **Day 60 (around Dec 27):** repeat with 60-day windows. In Search Console, compare homepage and topic-hub impressions and clicks for queries containing "AI Income Lab", "AI automation course" and "n8n". Note anything else that changed in that period (new videos, sponsorships, Skool changes) before attributing any difference to this work.
