# Design audit implementation

## Follow-up: Claude Code demo

The showcase now features [Anthropic’s official “Introducing Claude Code” video](https://www.youtube.com/watch?v=AJpK3YTTKZ4), replacing the n8n template below. Its original YouTube thumbnail is hosted locally at `public/workflows/claude-code-demo.jpg`. A keyboard-accessible play button loads the privacy-enhanced YouTube player only on activation, with captions requested, a descriptive iframe title, and focus transferred to the player. A direct YouTube link remains available. The old n8n screenshot was removed; the verified VIP n8n template benefit remains unchanged.

Navigation, audience-specific context, rendered/prerendered FAQ, and privacy copy match the new demo. Setup links to the [official Claude Code overview](https://code.claude.com/docs/en/overview). Claude Code access is explicitly separate from membership. This is Anthropic’s public product demo, not an included lesson or member result.

The design version is `claude-code-demo-v4`. `claude_demo_play_requested` records player activation, not confirmed playback or completion; `claude_demo_opened` records the external video link. Previous template events are retired.

Verification: production/prerender build and all three existing test files pass. Browser checks confirmed no iframe before activation, a loaded local poster, working embedded playback with captions enabled, and no horizontal overflow at 320px or 1440px. Desktop dark and mobile light appearances were visually reviewed. `git diff --check` passes.

## Follow-up: real n8n workflow showcase

The interactive sample described in the original implementation below has now been replaced by a real product showcase. It features [Nicolas Chourrout’s public Gmail draft-reply workflow on n8n](https://n8n.io/workflows/2271-gmail-ai-auto-responder-create-draft-replies-to-incoming-emails/), with an actual canvas screenshot, readable receive/draft/review steps, setup requirements, author attribution, and links to explore the template. The screenshot at `public/workflows/n8n-gmail-drafts.png` was captured from that public template’s interactive canvas on October 4, 2026; it is not a fabricated workflow or member result.

The workflow saves drafts in Gmail for manual review and sending. The page distinguishes this independent public template from membership lessons and the VIP template vault. The local sample generator, review controls, and unused monospace font were removed. Campaign context and the FAQ were updated, including prerendered FAQ schema.

Template links emit `workflow_template_opened` with their placement, campaign angle, product, and template ID. The design version is now `n8n-showcase-v3`; sample interaction events are retired.

Verification: the three remaining test files and production/prerender build pass; `git diff --check` passes. Browser checks confirmed the image loads, both links point to the real template, setup details open, no JavaScript errors were reported, and layouts fit at 320, 390, and 1440px. No conversion uplift has been measured.

## Original conversion redesign

The landing page now puts a clearly labeled interactive workflow example beside the offer, brings pricing ahead of the roadmap, and uses one explicit Skool continuation after the plan comparison. The changes are prepared for publication through the repository’s normal deployment process.

## Implemented

The final integration preserves the newer owner-approved direct hero “Join from $29 a month” action and community count, with a secondary pricing comparison link. Earlier screenshots show the pricing-first hero before that integration. The existing email-open tracking endpoint and configuration are preserved.

- Replaced the abstract tour with a working local sample-to-draft preview. Changing the sample changes the fields and draft; the review control records a local reviewed state. No AI inference or message delivery is implied.
- Extended the creator campaign into a matching content example. Business and agency campaigns have corresponding explanations. All membership links preserve campaign parameters.
- Removed repeated inclusion, proof-count, ticker, and roadmap sections. Kept a compact host introduction, optional captioned introductory video, one roadmap, and grouped FAQs.
- Preserved verified $29/$49/$89 monthly pricing and VIP-only coaching. Standard is the beginner starting point; Premium remains “advanced training” because specific modules were not supplied.
- Replaced duplicate external plan buttons with accessible native radio choices and a single continuation. Copy explains that the selected plan must be chosen again on Skool; no unsupported plan-selection URL is invented.
- Changed the final CTA to continue directly to Skool, with a secondary comparison link.
- Rebuilt type hierarchy, section spacing, and responsive layout. Removed repetitive uppercase/colored headings and limited monospaced text to example data labels.
- Fixed narrow-screen overflow, retained a direct mobile “See plans” action, moved appearance into Explore, and removed the clipped highlights strip.
- Reduced the mobile consent panel from about 156px to 94px. The sticky membership CTA is suppressed while privacy choices are open.
- Replaced Meta's outbound `Lead` call with the consent-gated custom `SkoolOutboundClicked` event. GA/Vercel use `skool_outbound`; common metadata includes placement, plan, angle, campaign, source, content, and `design_version=workflow-preview-v2`.
- Changed pricing exposure tracking to observe the heading rather than a percentage of the entire variable-height section.
- Generated FAQ structured data from the same content as the rendered answers, updated social text, removed an unused font weight, and preserved old section anchors.

## Verification

| Check | Result |
|---|---|
| Production build and prerender | Pass |
| Existing consent/attribution tests and new sample behavior tests | Pass |
| Generated FAQ schema and navigation anchors | Verified |
| Browser JavaScript errors | None reported during checks |
| Overflow at 320, 375, 390, 768, 1024, 1440px | None observed |
| Plan choice by arrow keys | Standard → Premium → VIP works |
| Workflow sample and review | Draft updates; review state changes |
| Creator/business/agency campaign content | Correct content and outbound parameters |
| Light/dark appearance | Visually checked |
| Reduced motion | Smooth scrolling becomes `auto` |
| Consent plus sticky action | Privacy panel visible; sticky CTA absent |
| Outbound telemetry | Captured locally: custom Meta event, no Lead; GA/Meta event delivery stops after decline |

At 390 × 844, default document height is approximately **4,515px**, compared with **12,165px** in the audit (about 63% shorter). The pricing continuation occupies roughly y=662–718 after navigating to pricing, so it fits in that viewport alongside all three plan options. At 320px the document width is exactly 320px, compared with 344px before.

These are local layout measurements, not conversion results or production Core Web Vitals. Conversion uplift has not been measured.

## External work and omitted evidence

Actual lesson previews, precise Premium module names, member results, and a new recording were not supplied. The page proceeds without inventing them. The interactive example is explicitly identified as sample data, not a course preview.

No authenticated Skool management surface or purchase/renewal integration was available. The replacement public copy below is ready to apply in Skool, but has **not** been published. Confirmed purchase/renewal attribution remains an external integration task; outbound activity is now correctly labeled and must not be substituted for paid membership.

### Ready-to-apply Skool public description

AI Income Lab is a private community for learning to build practical AI workflows for your business, creative work, or clients.

Choose the level of training and support you need:

- **Standard — $29/month:** Community access, courses, and tutorials. A starting point for your first workflow.
- **Premium — $49/month:** Everything in Standard, plus advanced training.
- **VIP — $89/month:** Everything in Premium, plus weekly coaching, curated software deals, and 6,400+ n8n templates.

No coding experience is required to start. Choose a small task, follow the training, and bring your questions to the community.

The suggested 30-day roadmap is a guide to building, not a guarantee of completion, income, or finding a client. Your progress depends on your project, experience, and time. Software subscriptions, hosting, and AI API usage may cost extra.

Plans are billed monthly in USD. You can cancel before your next billing period from your Skool account or upgrade as your needs change. Select a plan to review membership details and join.

**Suggested short description:** Build practical AI workflows with courses, tutorials, and a private community. Membership starts at $29/month; weekly coaching is included with VIP.

## Measurement handoff

- `skool_outbound` / Meta `SkoolOutboundClicked`: a visitor continued to the public Skool listing. It is not a signup or purchase.
- `plan_selected`: a local comparison preference, not a checkout selection.
- `view_pricing`: the pricing heading became visible.
- Keep historical event names separate when comparing pre/post metrics; the redesign intentionally changes their definitions/names.
- Connect a supported Skool/payment reporting source before emitting confirmed membership events. Use a server-verified transaction and deduplication key for paid conversions, and maintain consent and attribution requirements.
- Primary experiment metric: confirmed paid joins per eligible landing visitor where linkage exists. Guardrails: revenue per visitor, cancellations/refunds, and first renewal. If linkage is unavailable, report platform totals and page click rates separately.
- Establish the new baseline before testing a different recommended plan or real demonstration. This release does not launch an A/B experiment or assert a winner.

## Screenshots

- [Desktop overview](2026-10-04-implementation-screenshots/desktop-full.png)
- [Desktop hero, light](2026-10-04-implementation-screenshots/desktop-light.png)
- [Desktop hero, dark](2026-10-04-implementation-screenshots/desktop.png)
- [Mobile overview](2026-10-04-implementation-screenshots/mobile-full.png)
- [Mobile pricing, light](2026-10-04-implementation-screenshots/pricing-mobile-light.png)
- [Mobile pricing, dark](2026-10-04-implementation-screenshots/pricing-mobile.png)

Preview command: `npm run preview -- --host 127.0.0.1 --port 4173` after `npm run build`.
