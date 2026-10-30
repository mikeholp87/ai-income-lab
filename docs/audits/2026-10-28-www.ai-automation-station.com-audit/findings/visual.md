# Visual / above-the-fold — www.ai-automation-station.com

Audit date: 2026-10-28 · Captured with Playwright Chromium after `networkidle` + 1.5 s, no consent stored (so the consent banner is visible, as a first-time visitor sees it).

Screenshots (`screenshots/`):
- `home-desktop-1440x900.png`, `home-mobile-390x844.png`, `home-mobile-390x844-full.png`
- `guide-claude-code-desktop-1440x900.png`, `guide-claude-code-mobile-390x844.png`, `guide-claude-code-mobile-390x844-full.png`

Automated mobile checks (390 px, DPR 2): no horizontal overflow on either page (`scrollWidth` = 390).

## What works

- **Homepage value prop is immediate and clear** on both viewports: H1 "BUILD REAL AI AUTOMATIONS." + one-sentence explanation ("paid community from the AI Automation Station YouTube channel… 2,900+ members"). The price anchor "From $29/month. Cancel anytime." sits directly under the CTAs.
- **Primary CTA visible above the fold** on desktop (orange "JOIN AI INCOME LAB ↗" in the hero and header) and on mobile (full-width 56 px button at y≈450, plus a "JOIN" pill in the header). Secondary "WATCH A FREE BUILD" is visually subordinate (outline), which is the right hierarchy.
- Mobile hero: H1 starts at 113 px; the video facade thumbnail (Mike + GrokBot → WordPress) shows below the CTAs. Strong human/face trust signal.
- Guide page: strong article typography, a high-contrast H1, a "Quick answer" lead paragraph, breadcrumbs, a byline and published/updated dates are all visible above the fold on desktop. Body text on mobile is ~18 px with generous line-height.
- Consent banner is a slim bottom bar (not a modal), with equal-weight "Decline" / "Allow both" buttons that are large enough to tap (~44 px).
- Lighthouse accessibility = 100 on all tested pages (contrast, labels, tap targets per Lighthouse's rules).

## Findings

### 1. Guide header wraps to three rows on mobile, pushing the H1 to ~376 px — Medium
- **Evidence:** `guide-claude-code-mobile-390x844.png`: brand on row 1, the "JOIN AI INCOME LAB" button on row 2, and the nav (Start here / Guides / All videos / Search) on row 3, followed by a divider and a 2-line breadcrumb whose final item wraps to its own line. The H1 starts at y≈376 px (vs 113 px on the homepage), so less than half the first screen is article content, and the consent banner takes another ~90 px at the bottom.
- **Recommendation:** In the guide header CSS (`public/reading.css`, header rules; markup in the guide template `public/guides/*.html`), keep the brand + Join button on one row (smaller pill, e.g. "Join ↗", as the homepage does) and make the nav a single horizontally scrollable row, or collapse it behind a menu button. On mobile, truncate the breadcrumb's current-page item with `text-overflow: ellipsis`, or drop it (the H1 repeats it). The watch/archive headers in `src/archive.js` share the pattern and should get the same fix.

### 2. Small 11 px mono labels on the homepage — Low
- **Evidence:** 44 text elements render at 11 px on mobile, all DM Mono uppercase eyebrows and metadata: "INCLUDED FOR ALL MEMBERS", "PLANS", "LATEST VIDEOS", video durations and dates/view counts ("Oct 26, 2026", "220 views"). The desktop nav (PLANS / VIDEOS / GUIDES…) is similarly small, letter-spaced and grey. All are below the fold on mobile, and they are labels, not body copy.
- **Recommendation:** Raise the mono label size to 12–13 px on mobile in `src/styles.css` (eyebrow, video meta and desktop nav classes), and keep the grey at ≥4.5:1 contrast on `#0b0b0b`.

### 3. Footer/inline link tap targets are 20–22 px tall — Low
- **Evidence:** On mobile homepage: footer links "LinkedIn ↗" (81×22), "X ↗" (26×22), "GitHub ↗" (65×22), project "Source ↗" / "Live site ↗" links (57–78×20); brand link "AI INCOME LAB" is 127×14. WCAG 2.2 AA 2.5.8 needs 24×24 px or sufficient spacing; Lighthouse passes them because of spacing, but "X ↗" is a narrow target.
- **Recommendation:** In `src/styles.css`, give footer and project links `padding-block: 6px` (or `min-height: 44px; display: inline-flex; align-items: center`) and add horizontal padding to "X ↗".

### 4. Consent bar overlaps the bottom of the first screen — Info
- **Evidence:** On both pages, the fixed bar covers ~90 px (mobile) / ~48 px (desktop) at the bottom, hiding the start of the GrokBot video title (home) and the 3rd paragraph (guide). It does not cover any CTA.
- **Recommendation:** Acceptable as is. Optionally reserve space with `padding-bottom` on `body` while the banner is shown (`public/consent.css`, plus the homepage equivalent in `src/styles.css`) so content isn't hidden behind it.

### 5. Guide page has no visual/CTA above the fold beyond the header button — Info
- **Evidence:** `guide-claude-code-desktop-1440x900.png`: text-only first screen (breadcrumb, meta, H1, three paragraphs). The only conversion element is the header "JOIN AI INCOME LAB" button; the embedded/linked video ("Get Started with Claude Code in 10 Minutes") is a text link.
- **Recommendation:** Optional: add a lightweight video thumbnail facade (same as the homepage hero; no iframe on load) after the "Quick answer" paragraph. That gives the page a visual anchor and a video rich-result signal without a performance cost.
