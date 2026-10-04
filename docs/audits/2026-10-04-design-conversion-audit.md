# AI Income Lab design and conversion audit

Audited October 4, 2026. Scope: the live landing page, public Skool listing and plan selector, and local React/CSS/tracking implementation. This is an audit and proposed direction; no application changes were made.

**Recommendation: make the first workflow tangible, shorten the route to a membership decision, and simplify the Skool handoff.** The existing visual identity is usable. Its oversized headings, repeated explanations, and abstract proof currently give more prominence to the sales presentation than to the thing members will build.

Conversion effects below are hypotheses, not measured uplift. No traffic, purchase, retention, or experiment data was available.

## Evidence and coverage

- Live site: https://www.ai-automation-station.com/
- Destination: https://www.skool.com/ai-automation-station-7346/about
- Visual inspection: 1440 × 1000 desktop, including light/dark hero views; 390 × 844 mobile hero, consent, pricing, and full-page captures; 320px overflow diagnosis. Document-width checks also covered 768px.
- Exercised hero pricing navigation, theme toggle, privacy controls, and Skool's public Join button through the plan selector. Did not submit signup information or complete checkout.
- Source review covered offer variants, page structure, responsive rules, typography, video, semantic markup, keyboard handlers, and funnel events. This was not a comprehensive assistive-technology or WCAG audit.
- No field Core Web Vitals or throttled performance benchmark was collected. Asset observations are not evidence of real-user speed.

| Measurement | Observed result |
|---|---|
| Desktop document height, 1440px wide | Approximately 8,850px |
| Mobile document height, 390px wide | Approximately 12,165px |
| Mobile pricing section begins | Approximately 3,594px from page top |
| Mobile Standard card begins | Approximately 4,104px from page top |
| Mobile Standard CTA begins | Approximately 4,553px from page top |
| Mobile Premium / VIP CTA positions | Approximately 5,169px / 5,885px |
| Document width at 390px / 768px | 390px / 768px; no document overflow in these checks |
| Document width at 320px | 344px; 24px horizontal overflow |
| Consent banner at 390 × 844 | Approximately 156px tall; overlaps the video area |

The pricing anchor puts the section near the viewport top, but the first outbound button is roughly 959px farther down. On an 844px-tall screen, the pricing heading and introductory content consume the space where visitors expect to compare plans and act.

## What to preserve

- Clear entry price in the hero CTA and visible monthly billing/cancellation language.
- Recognizable navy, orange, and cool-white identity, with a prominent primary button.
- Practical enquiry-workflow examples in the audience section. These are stronger than the generic system/income language elsewhere.
- Honest qualification of the 30-day roadmap and separation of VIP coaching in the landing-page copy.
- User-initiated video, captions and transcript, image/video dimensions, local fonts, native FAQ disclosures, a skip link, focus styles, and reduced-motion handling in the source.
- Campaign-specific headlines and parameter forwarding already provide a foundation for audience-specific experiments.

## Prioritized findings

### 1. Reconcile the public offer and make the next step explicit

**Priority: high. Confidence: high that ambiguity exists; conversion impact unmeasured.**

The landing page correctly separates Standard at $29, Premium at $49, and VIP at $89. Skool's plan selector confirms those prices and places coaching and the template vault in VIP. However, its preceding public description lists coaching and software deals alongside a $29 entry offer without explaining the tier boundary. Its sidebar also makes a stronger first-client-in-30-days claim than the qualified landing-page roadmap.

All three landing-page pricing buttons have the same label and destination. A visitor goes from the landing comparison to the Skool about page, clicks Join, and compares the plans again. The landing-page selection is recorded as analytics metadata but does not preselect a destination plan.

**Recommended changes:**

- Align the public Skool description, sidebar, landing page, and video around the same tier inclusions and qualified outcomes.
- If Skool has a supported public plan-specific link, verify its behavior before using it. Do not assume query parameters select a plan.
- Otherwise use one transparent continuation after the comparison: “Continue to Skool” with “Choose your membership on the next page.” Retain plan-specific buttons only if their labels explain what actually happens.
- After the FAQ, offer a direct Skool continuation alongside an optional comparison link. The current final CTA sends an already-informed visitor back up the long page.

Evidence: [Skool public listing](https://www.skool.com/ai-automation-station-7346/about), [actual plan selector screenshot](2026-10-04-screenshots/skool-join.png), `src/main.jsx` pricing links and `trackPlanVisit`, `src/funnel.js`.

### 2. Show the actual product and a finished workflow before asking for a decision

**Priority: high. Confidence: high on missing evidence.**

“See inside” opens an explicitly illustrated roadmap, not a view of the course library or member experience. The 14-second video's transcript makes a broad offer; the large poster does not show a finished automation. The proof strip offers community size, template quantity, and the number of plans. None demonstrates a member's completed result.

**Recommended changes:**

- Make one real enquiry workflow the visual centerpiece: incoming message, extracted fields, draft reply, human approval. Show a real sample input and output, with sensitive details removed.
- Add a short, user-triggered screen recording of that workflow running. Its thumbnail should already communicate the result without playback.
- Show actual course/module titles, a lesson preview, and an anonymized community-help example with permission. Keep “See inside” only when it leads to these actual materials; otherwise rename it “How it works.”
- Add two or three permissioned member examples with project, artifact, and specific result. Do not imply the 2.9k public member count is paying members or successful graduates.
- Move a concise Mike introduction beside this proof, with a real photo and verifiable relevant work. The current host section is late and largely repeats that the community exists on Skool.
- Replace “3 membership levels” in the proof strip with useful evidence, or remove the strip. Keep template count as a VIP feature; show a few relevant, maintained examples before emphasizing volume.

### 3. Compress the page around the buying decision

**Priority: high. Confidence: high on repetition and scroll cost.**

The page contains an audience section, a four-week roadmap, pricing, a second inclusion list, a four-step illustrated roadmap, a host section, a mid-page pricing return, 11 FAQs, a second no-prerequisites strip, and a final pricing return. Several sections answer the same questions.

**Recommended changes:**

- Merge the inclusion list into pricing. Merge the illustrated tour and weekly roadmap into one brief sequence.
- Put a real demonstration and compact proof before pricing; keep detailed curriculum and less common questions below it.
- Shorten pricing's heading to “Choose your membership.” Remove the Level 01/02/03 labels and redundant fit/best-for/description layers.
- Order each plan as name, price, one audience-fit sentence, distinctive inclusions, action. Increase feature text from 11px to 14–16px.
- On mobile, show a compact three-tier summary first, followed by expandable detail. If keeping stacked cards, keep each card's price, difference, and action close together.
- Reduce mobile section padding from the common 72px per side toward 40–48px where content warrants it. Judge the result by comprehension and CTA reachability, not by an arbitrary page-length target.
- Group FAQ answers around price/cancellation, time/tools, and getting started. Preserve access to all useful answers without repeating them in separate sections.

Acceptance criterion: at the pricing anchor on a 390 × 844 screen, a visitor can see an entry price, its main inclusions, and a continuation without another full-screen scroll.

Evidence: [mobile pricing](2026-10-04-screenshots/pricing-mobile.png), [desktop page overview](2026-10-04-screenshots/desktop-full.png).

### 4. Give the visual hierarchy fewer competing accents

**Priority: medium. Confidence: design judgment grounded in screenshots.**

The page consistently uses oversized uppercase headings, colored heading fragments, uppercase mono labels, hard borders, and offset shadows. Applied to nearly every section, those devices lose their ability to distinguish the most important content. The pricing heading can be visually more dominant than the hero. Purchase details are much smaller than the slogans above them.

**Recommended changes:**

- Keep Archivo Black for one short hero statement or brand moment; use sentence-case Instrument Sans for section headings and body content.
- Set desktop section headings around 36–44px and mobile headings around 28–34px, with more comfortable line-height. Keep a clear size gap between the hero and ordinary sections.
- Use orange primarily for the main action and a real workflow's active step. Avoid coloring half of every heading.
- Use DM Mono only for actual workflow values, field labels, and sample payloads. Use the body face at readable sizes for plan inclusions, billing details, and navigation.
- Reserve the offset frame for the demonstration. Remove decorative frames or rules that do not explain a grouping or relationship.
- Keep body lines around 55–70 characters. Left-align explanation, pricing, and proof; a short centered hero remains an option if the demonstration sits below it.

### 5. Fix narrow-screen overflow and reduce mobile obstruction

**Priority: high for the confirmed layout bug; medium for other refinements.**

At 320px, the final CTA's grid children expand to about 300px inside a card with only about 232px of inner space. Its long heading and button contribute to the minimum content width. The page becomes 344px wide.

A temporary browser-only experiment using a `minmax(0, 1fr)` column, `min-width: 0` children, a smaller mobile heading with emergency wrapping, and reduced button gap/padding brought document width back to exactly 320px. The experiment was discarded when the audit browser closed.

Implementation candidate to refine visually:

```css
@media (max-width: 680px) {
  .join-card { grid-template-columns: minmax(0, 1fr); }
  .join-card > div { min-width: 0; }
  .join-card h2 {
    font-size: clamp(32px, 8.2vw, 45px);
    overflow-wrap: anywhere;
  }
  .join-card .button { gap: 12px; padding-inline: 12px; }
}
```

Also:

- The static highlights strip is wider than mobile and clipped by `overflow: hidden`; some messages are inaccessible visually. Wrap it or replace it with a short list.
- The consent panel obscures about 18% of the 844px viewport, including the video. Preserve explicit choices and legibility, but remove excess framing and coordinate it with the sticky CTA so both fixed panels do not compete.
- Mobile navigation hides the direct pricing link but retains the theme toggle. Give “See plans” stronger priority and move theme preference into Explore if space is tight.
- Increase small 10–12px purchase-related copy to 13–14px or more. Small text is a readability finding, not automatically a WCAG failure.
- Source includes focus styles and tab keyboard handling, but these still need an end-to-end keyboard/screen-reader pass after a redesign. Check focus visibility in both themes and reduced-motion behavior of remaining transitions.

Evidence: [320px overflow](2026-10-04-screenshots/overflow-320.png), [mobile first impression with consent](2026-10-04-screenshots/mobile-consent.png).

### 6. Match the recommended tier to the beginner promise

**Priority: medium; test this decision.**

The headline targets a first workflow, but Premium is visually recommended for advanced training. Its extra value is described only as “Advanced Training,” which makes the $20 difference difficult to assess. VIP's distinctive live support is clearer.

- Specify the real modules or capabilities unlocked by Premium.
- For beginner traffic, test Standard as the recommended starting point with an easy upgrade explanation.
- For experienced builder traffic, test Premium only with concrete advanced content and matching examples.
- Maintain the agency/business/creator landing variants through proof and first-project examples. The existing variants currently change the hero while most of the rest of the page remains general.
- Treat any proposed starter curriculum or included template as conditional on actual availability in Standard. The existing code explicitly reserves the complete vault for VIP.

### 7. Measure paid conversion separately from outbound interest

**Priority: high before choosing experiment winners.**

The source calls Meta's standard `Lead` event when a visitor clicks through to Skool. That is an outbound action, not evidence that a person became a lead or paid member. The code already has useful custom events for pricing, video, FAQs, and some Skool clicks, but outbound tracking is not uniform across placements.

- Standardize `skool_outbound` across every external membership CTA, including placement, chosen tier if applicable, campaign angle, and experiment variant.
- Keep outbound clicks as a diagnostic metric. Use a confirmed signup/lead event only for its actual completion; use paid membership for the purchase metric.
- Verify available Skool/payment reporting or integration before promising end-to-end attribution. If user-level linkage is unavailable, clearly separate platform signup totals from landing-page click rates.
- Define the primary outcome as confirmed new paid memberships divided by eligible landing visitors where attribution is available. Track revenue per visitor, cancellations/refunds, and first renewal as guardrails.
- Use a small pricing-heading sentinel or card-level exposure for pricing visibility. The current event observes 25% of a section whose height changes substantially by breakpoint, so the meaning of “viewed pricing” varies by layout.
- Preserve consent behavior and label attribution limits. Do not infer lost sales simply from a lack of tracked events.

Source: `src/main.jsx` functions `trackPlanVisit`, `trackCommunityVisit`, and pricing observer; `src/tracking.js` function `trackMetaLead`.

## Proposed design direction: a working automation bench

Use the actual enquiry-to-draft transformation as the distinctive element. The page should feel like a useful place to build, with evidence visible in the work itself. Retain the brand palette rather than adding another visual identity.

| Token | Value | Purpose |
|---|---|---|
| Work surface | `#F7F8FB` | Main page background |
| Paper | `#FFFFFF` | Sample inputs, outputs, and plan surfaces |
| Ink | `#13234A` | Text and strong structural contrast |
| Action orange | `#FF6846` | Main buttons and the active workflow step |
| Blueprint blue | `#DCE7FF` | Supporting context and subtle selected surfaces |
| Secondary ink | `#66708A` | Supporting text, contrast-checked on its actual background |

Type: Instrument Sans for interface and prose; Archivo Black for the single primary statement. DM Mono appears only inside real technical examples. Suggested body size: 16–18px; details: 14px; mobile H1: 34–40px; desktop H1: 48–56px. Final sizes depend on real copy and wrapping.

**Preferred layout:** left-aligned promise and action beside one real, readable workflow demonstration on desktop; mobile stacks promise, action, demonstration, proof, and compact pricing.

```text
Brand                          Examples   Membership   FAQ

Build a workflow you can use.     Incoming enquiry
Courses, tutorials, community.           ↓
                                  Extracted details
[See plans from $29/month]                ↓
Monthly. Cancel anytime.           Draft reply + review

Actual lesson preview · Verified member project · Meet Mike

Choose your membership
Standard $29     Premium $49     VIP $89
Core learning    Specific depth  Weekly coaching + vault
                [Continue to Skool]

One short build roadmap
FAQ
Final direct continuation
```

**Alternative:** a centered statement followed by a full-width screen recording. This preserves more of the current layout but pushes proof farther down on mobile. Prefer the split layout only if the real demonstration remains legible; do not miniaturize a complex n8n canvas to fit it.

**Example hero copy, subject to curriculum verification:**

> Build your first useful AI workflow.
>
> Learn to turn a customer enquiry into a draft reply you can review. Follow practical lessons and discuss your build in a private community.
>
> See plans from $29/month

Position the suggested 30-day schedule below this promise rather than making speed the dominant evidence. If the exact enquiry tutorial is not available in the entry plan, substitute an actual included starter project.

**Self-critique against the frontend-design brief:** a navy/orange palette, grid backdrop, and fake console would still be a generic automation landing page. The proposal therefore removes the decorative console, generic status strings, repeated uppercase labels, and section-by-section color accents. Its memorable element is a real sample transformation with real output. Weeks may be numbered because they are sequential; plans need descriptive names rather than Level 01/02/03.

## Execution and experiments

| Order | Work | How to evaluate |
|---|---|---|
| 1 | Fix 320px overflow, align public tier claims, correct event semantics | Responsive verification, consistent public copy, event inspection |
| 2 | Compress pricing and repeated sections; clarify the Skool continuation | Mobile pricing usability, pricing-to-Skool progression, paid joins |
| 3 | Add an actual demonstration and permissioned evidence | Test against current hero; paid conversion is primary, video engagement secondary |
| 4 | Test Standard-first versus Premium-first recommendation | Paid conversion and revenue per visitor, with renewal/refund guardrails |
| 5 | Extend audience variants into matching examples and proof | Compare within traffic source/audience; avoid mixing campaign quality with design effects |

Fix factual inconsistencies and layout defects directly. For persuasion changes, run one main hypothesis at a time, assign variants consistently, and choose duration/sample requirements from actual baseline traffic and the effect worth detecting. If volume is too low for a useful experiment, use observed user sessions and staged releases; do not declare a winner from a few clicks.

Performance follow-up: the local poster is about 116KiB and the video about 2.5MiB; video uses metadata preload and user-triggered playback. Keep that restraint when adding a real demo. Measure mobile LCP, INP, and CLS before introducing extra embeds or loading strategies. The current audit does not establish a speed problem.

## Deliverables

- [Desktop hero, light](2026-10-04-screenshots/desktop-light.png)
- [Desktop hero, dark with consent](2026-10-04-screenshots/desktop.png)
- [Desktop pricing](2026-10-04-screenshots/pricing-desktop.png)
- [Mobile hero](2026-10-04-screenshots/mobile.png)
- [Mobile consent overlay](2026-10-04-screenshots/mobile-consent.png)
- [Mobile pricing](2026-10-04-screenshots/pricing-mobile.png)
- [320px overflow](2026-10-04-screenshots/overflow-320.png)
- [Desktop full page](2026-10-04-screenshots/desktop-full.png)
- [Mobile full page](2026-10-04-screenshots/mobile-full.png)
- [Skool public listing](2026-10-04-screenshots/skool.png)
- [Skool plan selector](2026-10-04-screenshots/skool-join.png)

No source files were changed, and no purchase or signup was completed. The temporary diagnostic CSS existed only in the isolated browser session.
