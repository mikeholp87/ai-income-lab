# CRO Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Increase qualified clicks from the landing page into the Skool plan selector by removing mobile obstruction, making the checkout handoff accurate, and adding credible proof before pricing.

**Architecture:** Keep the existing single-page React/Vite structure and make the smallest viable changes in `src/main.jsx` and `src/styles.css`. Reuse the existing consent and analytics utilities; add no runtime dependencies. Ship friction fixes first, then add the proof module only after the evidence gate is satisfied.

**Tech Stack:** React, Vite, CSS, Node's built-in test runner, GA4, Meta Pixel, Vercel Analytics

**Spec:** `docs/superpowers/plans/2026-08-30-cro-improvements.md#audit-baseline`

## Global Constraints

- Preserve the orange, navy, light/dark visual system and the upper-right theme switcher.
- Keep pricing at Standard `$9/month`, Premium `$49/month`, and VIP `$89/month`.
- Do not claim that a Skool plan has been selected until Skool provides a stable plan-specific URL.
- Do not invent testimonials, member names, screenshots, outcomes, or “most popular” evidence.
- Keep GA4 and Meta tracking disabled until `marketing-consent` equals `granted`.
- Preserve `cta_click`, `generate_lead`, and `begin_checkout` event names and their existing parameters.
- Add no runtime dependency; use the existing React, CSS, and Node test setup.
- Maintain keyboard navigation, visible focus states, reduced-motion behavior, and 44px minimum mobile tap targets.

---

## Audit Baseline

- The value proposition and visual hierarchy are clear and highly scannable.
- On a first mobile visit, the consent panel overlaps the hero conversion area.
- “Choose Standard/Premium/VIP” opens one generic Skool selector, so the visitor must choose again.
- The FAQ references a plan finder that does not exist.
- The hero implies broad access to templates and tools although the full vault is a VIP benefit.
- The page contains numeric proof but no verified member outcomes, named testimonials, or real membership screenshots.
- The mobile header gives space to “Log in” instead of a prospect-oriented pricing action.
- Current GA4 events are sufficient to measure CTA clicks and checkout starts after consent.

## File Map

- Modify `src/main.jsx`: header action, offer copy, plan handoff copy, consent copy, FAQ, proof module, analytics metadata.
- Modify `src/styles.css`: compact mobile consent bar, header CTA, proof-module layout, responsive behavior.
- Modify `src/tracking.test.js` only if event parameters or consent behavior change.
- Create `public/proof/` assets only after the evidence gate in Task 3 passes.
- Do not split `src/main.jsx` during this project; the repository already uses a single-page component and restructuring is unrelated to conversion.

---

### Task 1: Make the CTA hierarchy and offer language accurate

**Files:**
- Modify: `src/main.jsx:98-116`
- Modify: `src/main.jsx:240-264`
- Modify: `src/main.jsx:286-309`
- Modify: `src/main.jsx:326-331`
- Modify: `src/styles.css:36-50`
- Modify: `src/styles.css:301-307`

**Interfaces:**
- Consumes: existing `trackEvent(name, properties)` and `outboundUrl(base, campaign, extras)` functions.
- Produces: prospect-oriented header CTA and truthful generic Skool handoff labels while retaining `plan`, `price`, and `placement` tracking.

- [ ] **Step 1: Replace the mobile/desktop member-login action with a pricing CTA**

Keep `ThemeToggle` in the upper-right. Replace the navigation login link with:

```jsx
<div className="nav-actions">
  <ThemeToggle />
  <a
    className="nav-pricing"
    href="#pricing"
    onClick={() => trackEvent('CTA Clicked', {
      button_text: 'See plans',
      link_url: '#pricing',
      placement: 'navigation',
      action: 'view_pricing',
    })}
  >
    See plans
  </a>
</div>
```

Add “Member login ↗” to `.footer-links`, using `skoolCommunityUrl` and this non-conversion callback so existing-member activity does not count as a lead:

```jsx
onClick={() => trackEvent('CTA Clicked', {
  button_text: 'Member login',
  link_url: skoolCommunityUrl,
  placement: 'footer',
  action: 'member_login',
})}
```

- [ ] **Step 2: Clarify plan-dependent benefits in the hero**

Replace the default hero description with:

```text
Get guided training and hands-on support to build an AI system for your own business—or sell it to clients. Upgrade when you want advanced training, software deals, and the full template vault.
```

Keep the campaign-specific descriptions unchanged unless they also imply that every plan includes the full vault.

- [ ] **Step 3: Remove the nonexistent plan-finder reference**

Replace the “Which plan should I choose?” answer with:

```text
Choose Standard for the foundations, Premium for advanced training, or VIP when you want the complete software-deal and N8N template vault. You can upgrade later as your needs grow.
```

- [ ] **Step 4: Make the Skool handoff truthful**

Because all three cards currently open the same selector, change every card button to:

```jsx
Continue to Skool plans <span>↗</span>
```

Replace the card note with:

```jsx
<small className="price-checkout">Choose and confirm your plan securely on Skool</small>
```

Continue passing the displayed plan into `trackCheckout(name, price, 'pricing_card')`; this records visitor intent even though Skool requires a second selection.

- [ ] **Step 5: Style the navigation CTA**

Add `.nav-pricing` using the existing accent color, mono label style, and a minimum 44px height. At `max-width: 680px`, keep the logo, theme toggle, and “See plans” on one row without horizontal overflow.

- [ ] **Step 6: Run the existing checks**

Run:

```bash
npm test
npm run build
git diff --check
```

Expected: all commands exit `0`; the generated bundle has no unresolved imports.

- [ ] **Step 7: Verify the user path manually**

At desktop `1440×900` and mobile `390×844`, verify:

- “See plans” scrolls to `#pricing`.
- “Member login” exists in the footer and opens Skool in a new tab.
- Each pricing CTA opens the Skool selector.
- No pricing CTA says the plan is already selected.
- The header does not overflow at `320px` width.

- [ ] **Step 8: Commit**

```bash
git add src/main.jsx src/styles.css
git commit -m "fix: clarify landing page conversion path"
```

---

### Task 2: Stop the consent panel from obstructing mobile conversion

**Files:**
- Modify: `src/main.jsx:61-82`
- Modify: `src/styles.css:253-261`
- Modify: `src/styles.css:301-325`
- Test: `src/tracking.test.js`

**Interfaces:**
- Consumes: `getTrackingConsent`, `setTrackingConsent`, `loadMarketingTracking`, and `disableMarketingTracking`.
- Produces: the same `granted`/`denied` consent values with a mobile panel no taller than `136px` at `390px` width.

- [ ] **Step 1: Preserve the existing consent test before styling changes**

Run:

```bash
node --test src/tracking.test.js
```

Expected: consent storage, one-time tracker loading, and consent-gated GA4 events pass before editing.

- [ ] **Step 2: Shorten the consent message without changing behavior**

Use this content:

```jsx
<strong>Analytics preferences</strong>
<p>Allow analytics to help improve this page and measure campaigns.</p>
```

Keep the Privacy and Terms links and the existing Decline/Allow analytics actions.

- [ ] **Step 3: Replace the mobile consent layout**

At `max-width: 680px`, use a compact full-width bottom bar:

```css
.consent-banner {
  left: 10px;
  right: 10px;
  bottom: 10px;
  width: auto;
  padding: 12px;
  gap: 8px;
}

.consent-banner p {
  margin-bottom: 4px;
  font-size: 11px;
  line-height: 1.35;
}

.consent-actions {
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.consent-actions button {
  min-height: 40px;
  padding: 8px 10px;
}
```

Adjust the existing declarations rather than duplicating selectors. Keep the desktop panel unchanged unless shared declarations must be reduced.

- [ ] **Step 4: Run automated checks**

Run:

```bash
npm test
npm run build
git diff --check
```

Expected: all commands exit `0`.

- [ ] **Step 5: Run first-visit mobile acceptance checks**

Clear only the test browser's local storage, reload at `390×844`, and verify:

- The panel height is at most `136px`.
- The primary “See plans from $9” button remains visible and tappable.
- Both consent buttons are at least `40px` tall and keyboard reachable.
- Decline stores `denied` and does not load GA/Meta scripts.
- Allow analytics stores `granted` and loads each tracker once.

- [ ] **Step 6: Commit**

```bash
git add src/main.jsx src/styles.css src/tracking.test.js
git commit -m "fix: keep mobile consent clear of the primary CTA"
```

---

### Task 3: Establish the verified-proof content gate

**Files:**
- Create after approval: `public/proof/member-result-1.webp`
- Create after approval: `public/proof/member-result-2.webp`
- Create after approval: `public/proof/community-preview.webp`
- Modify after approval: `src/main.jsx`
- Modify after approval: `src/styles.css`

**Interfaces:**
- Consumes: three approved proof records supplied by the community owner.
- Produces: a `#results` section positioned immediately before `#pricing`.

- [ ] **Step 1: Collect evidence before writing UI code**

Require all of the following before continuing this task:

- Two member quotes with the member's display name, role/business type, permission to publish, and a concrete result.
- One real community or course screenshot that contains no private email, payment, or account information.
- A written source for each numerical outcome.
- Confirmation that any “Most popular” badge is supported by plan-selection data; otherwise rename it “Recommended.”

If any requirement is missing, stop Task 3 and ship Tasks 1–2 without a testimonial section. Do not use anonymous or invented filler.

- [ ] **Step 2: Prepare approved assets**

Export the three approved images as WebP, remove private information, keep each image below `200 KB`, and use the exact filenames listed above. Verify each file opens correctly before adding it to Git.

- [ ] **Step 3: Add the results section before pricing**

Use semantic `<section>`, `<figure>`, `<blockquote>`, and `<figcaption>` elements. Each member card must show the approved quote, member identity, concrete result, and corresponding image. The third card must be a real “See inside the community” preview linking to `skoolCommunityUrl`.

The section heading must be:

```text
See what members are building.
```

The supporting copy must avoid guarantees:

```text
Real examples from members applying the training, templates, and community support.
```

- [ ] **Step 4: Style proof as evidence, not decoration**

Use the existing card borders, navy surfaces, accent rules, and mono captions. Display three columns above `900px` and one column below `680px`. Images must use `aspect-ratio`, `object-fit: cover`, explicit alt text, and lazy loading.

- [ ] **Step 5: Run accessibility and integrity checks**

Verify:

- Every image has descriptive alt text.
- Quotes remain readable in both themes.
- No result is framed as typical or guaranteed unless evidence supports that wording.
- The section appears before pricing on desktop and mobile.
- The page has no horizontal overflow at `320px`.

- [ ] **Step 6: Run project checks**

```bash
npm test
npm run build
git diff --check
```

Expected: all commands exit `0`.

- [ ] **Step 7: Commit**

```bash
git add public/proof/member-result-1.webp public/proof/member-result-2.webp public/proof/community-preview.webp src/main.jsx src/styles.css
git commit -m "feat: add verified member proof before pricing"
```

---

### Task 4: Verify analytics reporting for the revised funnel

**Files:**
- Modify only if a defect is found: `src/main.jsx`
- Modify only if a defect is found: `src/tracking.js`
- Test only if code changes: `src/tracking.test.js`
- External configuration: GA4 property `G-XYRWT4PFN8`

**Interfaces:**
- Consumes: `cta_click`, `generate_lead`, and `begin_checkout` emitted after consent.
- Produces: a dashboard funnel segmented by `placement`, `action`, `button_text`, and `plan`.

- [ ] **Step 1: Register GA4 custom dimensions**

In GA4 Admin → Data display → Custom definitions, create event-scoped dimensions with these exact event parameters:

- Button text → `button_text`
- Placement → `placement`
- CTA action → `action`
- Membership plan → `plan`

- [ ] **Step 2: Mark key events**

In GA4 Admin → Data display → Key events, mark these exact events:

- `begin_checkout`
- `generate_lead`

Do not mark `cta_click` as a key event; it is a diagnostic interaction, not a completed conversion step.

- [ ] **Step 3: Verify the live event sequence in DebugView**

After granting analytics consent, complete these paths without purchasing:

1. Navigation “See plans” → expect `cta_click` with `placement=navigation` and `action=view_pricing`.
2. Hero “See plans from $9” → expect `cta_click` with `placement=hero`.
3. Pricing-card click → expect `cta_click` followed by `begin_checkout`, with the displayed `plan`, `value`, and `currency=USD`.
4. “Verify on Skool” → expect `cta_click` followed by `generate_lead`.

- [ ] **Step 4: Verify the denied-consent path**

In a clean browser session, choose Decline and repeat one CTA click. Confirm no GA4 or Meta request is sent while Vercel Analytics continues according to its existing configuration.

- [ ] **Step 5: Fix only observed instrumentation defects**

If a required event or parameter is absent, update the existing call site instead of adding a second tracking abstraction. Add one focused assertion to `src/tracking.test.js`, then run:

```bash
npm test
npm run build
```

Expected: all checks pass and DebugView shows the corrected payload once.

- [ ] **Step 6: Commit only if code changed**

```bash
git add src/main.jsx src/tracking.js src/tracking.test.js
git commit -m "fix: align CRO events with GA4 reporting"
```

---

### Task 5: Release and measure the CRO baseline

**Files:**
- No source file changes expected.
- Deployment target: `origin/main` and the production Vercel project.

**Interfaces:**
- Consumes: completed Tasks 1–4 and a clean Git working tree.
- Produces: a verified production release and a 14-day baseline for future experiments.

- [ ] **Step 1: Run the release gate**

```bash
npm test
npm run build
git diff --check
git status --short --branch
```

Expected: tests/build pass, no whitespace errors, and only the intended task commits are ahead of `origin/main`.

- [ ] **Step 2: Push without overwriting remote work**

Fetch `origin/main`. If it advanced, rebase the task commits and rerun the release gate. Push only as a fast-forward update.

- [ ] **Step 3: Verify production**

At `https://www.ai-automation-station.com/`, verify desktop `1440×900`, mobile `390×844`, light mode, dark mode, first-visit consent, all pricing links, and the footer login. Confirm there are no console errors or broken assets.

- [ ] **Step 4: Record the 14-day baseline**

In GA4, record these metrics by device and traffic source:

- Landing sessions
- `view_pricing` users
- `cta_click` users by `placement`
- `begin_checkout` users by `plan`
- `generate_lead` users
- Session → begin-checkout conversion rate

Do not start an A/B test until each variant can receive enough traffic for a pre-calculated sample size. Use the dedicated A/B testing workflow for experiment design.

---

## Self-Review

- Spec coverage: immediate CTA, consent, handoff, copy, proof, analytics, mobile, and release findings are mapped to Tasks 1–5.
- Deliberate dependency: Task 3 cannot proceed without verified proof and written permission; Tasks 1–2 remain independently releasable.
- Content-integrity scan: no fabricated quote, result, URL, plan entitlement, or asset content is specified.
- Type consistency: all analytics calls reuse the existing `trackEvent`, `trackCheckout`, and consent interfaces.
- Scope exclusions: changing plan prices, redesigning Skool checkout, and running a statistical experiment require separate pricing/A/B work and are not part of this implementation.
