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

---

# Measurement plan

Vercel Analytics and Speed Insights provide separately disclosed measurements; Google Analytics and Meta application events require the existing marketing consent. Homepage `CTA Clicked` and `Skool Outbound Clicked` describe the same click in different event streams; count one event type for totals. `View Pricing` fires once per page mount when the pricing list is 25% visible. Pricing outbound events include plan name and price as the card clicked, not a confirmed selection. Newsletter and contact success events follow successful API responses; the newsletter API can also report an existing subscriber, so this is not necessarily a new subscriber.

`Form Started` on the homepage fires once per mounted contact or footer newsletter form on first field focus; Vercel receives the event and Google receives it only with consent. On reading pages `form_start` fires once after consent when the newsletter email field receives focus. Properties identify placement and, on reading pages, page and campaign labels. No email, message or name is sent. Focus is an intention signal, not a qualified inquiry. Existing booking callback means requested, not confirmed. Skool outbound clicks never mean paid membership.

At 30 days after an approved release, compare relevant landing visits, pricing views, outbound clicks by placement and source, form starts and successful responses with the preceding comparable period. Review actual qualified inquiries separately using a consistent manual definition, and reconcile confirmed bookings and paid new memberships from provider exports using `docs/conversion-measurement.md`; exclude renewals and refunds as documented. Attribution may be unknown. Record dates, consent coverage and sample sizes.

At 60 days, repeat the same cohort comparison, review guide entry pages and search queries with authorized Search Console access, and compare confirmed paid memberships and purchases against provider records. Investigate changes before drawing causal conclusions; no experiment or business gain has been established. A supported trusted payment receipt integration is the smallest automation step if provider access and approval are available.
