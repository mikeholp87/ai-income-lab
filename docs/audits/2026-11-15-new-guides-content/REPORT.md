# New guides content audit — November 15, 2026

**Scope:** 62 guides published since the [November 10 content audit](../2026-11-10-guides-content-audit/REPORT.md): 27 on Nov 12–14 and 35 on Nov 15. Method: scripted metrics (`guide-metrics.json`), full read of 8 representatives across Skool / Make / HeyGen / Hostinger / Bluehost / Emergent / Free Claude comparison / Syllaby, and a pass over `scripts/guide-from-spec.mjs` plus the Nov 15 specs. Not covered: Search Console for these URLs (too new), live SERP comparison, or fact-checking every price against the vendor today.

**Verdict: FIX.** No critical trust failure. Affiliate and sponsored links disclose, every page has a Quick answer, FAQ, Sources, byline, video and hub card, and first-person voice is present. The batch still fails the same experience and exclusivity bar the Nov 10 audit flagged on video case guides: pages summarize “the recording” instead of teaching from lived setup, Sources are thin, and the generator that produced them hard-codes the weak pattern.

## Clusters

| Cluster | Pages | Avg words | State |
|---|---|---|---|
| Nov 12–14 build guides (Apify skills, Hermes, Rank Prompt, n8n agents, Claude skills, VisiScan, …) | 27 | ~1,170 | Longer and more useful, but denser “the recording” phrasing (509 hits) |
| Nov 15 video-companion guides from `guide-from-spec.mjs` | 35 | ~730 | Template-uniform. All labeled “Tool guide”. Every page has “What this recording did not cover” |
| Skool (Hobby, setup, free weeks, tiers, classroom, welcome email) | 6 | ~650 | Cross-linked well; prices from Jul–Oct 2025 |
| Make.com scenarios (Gmail reply, Tally agent, YouTube descriptions, faceless/json2video, Messenger) | 5 | ~750 | Honest first attempts; little that a reader can copy without the video |
| HeyGen / Syllaby / faceless video | 5 | ~850 | Strongest of the Nov 15 set when they include a real failure (Make.com API plan) |
| Hosting / builders (Hostinger n8n, Bluehost AI, Emergent ×2, Lovable, Replit, Odysseus, Pi, OpenCode desktop) | ~12 | ~750 | Useful walkthroughs; Sources often video + affiliate only |

## What works

- Structure matches the site standard: Quick answer, numbered sections, watch embed with chapters, FAQ, Sources, related guides, Keep going, CTA.
- Affiliate / sponsored disclosures are present (Skool, Make, Hostinger, Bluehost, HeyGen). Bluehost’s FAQ answers “Was this video sponsored?” honestly.
- First-person counts are non-zero on every Nov 15 page; the worst “spoken source does not establish / AAS” phrasing from Nov 10 did not return.
- Skool and Make clusters link to each other; Hostinger points at the deeper `self-host-n8n` guide.
- Title and H1 match on the Nov 15 set. Descriptions sit in the 120–160 band.

## Critical issues (must fix)

None. Disclosures and title/content alignment hold.

## Should-fix

1. **“The recording” voice is back, and the generator hard-codes it.** Across the 62 new guides there are ~690 uses of “the recording / in the recording / this recording”. Every Nov 15 page (and many Nov 12) has an H2 titled **“What this recording did not cover.”** FAQ answers often start with “In the recording…” or “per the recording.” Mike is the person in the video, so this reads like a third party auditing a tape and throws away the experience signal Google’s helpful-content guidance looks for. Root cause: `scripts/guide-from-spec.mjs` always emits that H2 when `limits` is set, and the specs in `docs/guide-specs/` lean on the phrase. Rewrite in first person (“I didn’t cover backups here”, “I used GPT-4-family in July 2025; pick a current model”), rename the H2 to **“What I didn’t cover”** or **“Limits of this build”**, and stop the generator from inserting “recording” language.

2. **Sources are thin and pricing is undated.** Nov 15 averages 2.3 source links; most are YouTube + an affiliate URL. 21 of 35 Nov 15 pages mention a dollar amount with no nearby “check the current page / prices change / last checked” caveat. Skool Hobby and Pro fees are July/October 2025 figures presented as current. Add the official docs or pricing page with a **checked &lt;date&gt;** line, the way evergreen guides do. Prefer “In July 2025 Hobby was $9…” over bare “Hobby is $9.”

3. **Nov 15 pages are companions, not standalone guides (~730 words, no runnable checklist).** Almost none have an ordered checklist, copyable command, or “done when” success check. A strong evergreen (`claude-code-for-beginners`) is ~1,700 words with zero “recording” phrasing. For each Nov 15 page, either (a) add one thing the reader can run without the video (exact install command, minimal Make scenario outline, plan-choice table with a checked date), or (b) fold the thinnest ones into their `/watch/` page and keep only the pages that justify a separate URL.

4. **Every Nov 15 byline says “Tool guide.”** Wrong for comparisons (`free-claude-code-vs-opencode-codex`), reviews (`skool-hobby-plan-review`) and walkthroughs. The generator hard-codes `Tool guide` in `guide-from-spec.mjs`. Pass a `type` from the spec (Comparison / Case study / How-to / Review / Tool guide) the way the Nov 11 relabel pass did for older pages.

5. **Ten Nov 15 titles are over 60 characters** and will truncate in SERPs (`nano-banana-gemini-images-make` at 71, `opencode-desktop-habit-tracker-electron` at 67, several others at 62–65). Shorten titles; keep the longer wording in the H1 only if needed.

## Nice-to-have

6. **Skool cluster intent.** Six guides share “Skool” head terms. Cross-links are good; make each job explicit in the Quick answer and hub card (Hobby = plan choice; setup = first community; free weeks = first 14 days; tiers = pricing levels; classroom = upsell path; welcome email = automation). Consider a short “Which Skool guide?” line at the top of each.

7. **Make / HeyGen / Syllaby overlap.** Faceless-video paths exist in Syllaby, Make+JSON2Video and HeyGen. Hub cards and intros should route: Syllaby = fastest first publish; Make+JSON2Video = spreadsheet-driven batch; HeyGen = avatar/voice quality and the API plan wall.

8. **Nov 12 “Build guide” label is better than “Tool guide” but still uniform.** Relabel comparisons and explainers when those pages are touched.

9. **Hub placement.** Confirm the 35 new cards are not burying the high-authority beginner guides at the top of `guides.html` (same risk the Nov 10 audit closed).

10. **Generator quality gate.** Add a test or lint that fails a guide (or its spec) if it contains `\bthe recording\b`, if Sources has fewer than two non-YouTube links, if `type` is missing, or if the title is over 60 characters.

## Top 5 by impact

1. Fix `guide-from-spec.mjs` + rewrite “recording” voice across Nov 12–15 (largest experience/trust gap; stops the next batch from repeating it).
2. Expand Sources with official docs and a checked date; add pricing caveats on the 21 pages that lack them.
3. Add one runnable artifact or success check to each Nov 15 guide worth keeping; merge the rest into watch pages.
4. Pass a real content-type into the byline instead of hard-coded “Tool guide.”
5. Shorten the 10 overlong titles.

## Action plan

### Quick wins (&lt; 30 minutes each)
- [ ] Change `guide-from-spec.mjs`: limits H2 → “What I didn’t cover”; accept `s.type`; enforce `title.length <= 60`.
- [ ] Shorten the 10 overlong Nov 15 titles.
- [ ] Relabel bylines on the Nov 15 set (Comparison / Case study / How-to / Review / Tool guide).

### Medium effort (1–2 hours)
- [ ] Pass over FAQ + body copy: replace “in the recording” with first-person dated claims.
- [ ] Add official pricing/docs links + “checked November 15, 2026” (or re-check date) to Sources on pricing-heavy pages (Skool ×6, Hostinger, Bluehost, HeyGen, Syllaby, Emergent).
- [ ] Add a one-line “Which guide?” router inside the Skool and faceless-video clusters.

### Strategic
- [ ] Decide keep-vs-merge for the thinnest Nov 15 pages (&lt;650 words with no runnable step).
- [ ] Add a regression test that rejects new specs containing “the recording” and requiring `type`, Sources depth and title length.
- [ ] Re-pull Search Console in 2–4 weeks for impressions on the Skool Hobby, Hostinger n8n and Free Claude comparison URLs.

## Implemented November 15, 2026

- `scripts/guide-from-spec.mjs`: requires `type`, title ≤60, bans “the recording”, emits **What I didn’t cover**, and adds a **Done when** checklist from `done` or card steps.
- Regenerated all 41 specs under `docs/guide-specs/` with first-person voice, real byline types, shortened titles, official Sources + checked dates, Skool/faceless cluster routers, and pricing caveats.
- Nov 12–14 HTML guides: same voice rewrite, Done when, Sources thickened where needed, `dateModified` / sitemap `lastmod` / `llms.txt` synced.
- Cleared “the recording” from `src/watch-notes.js`, `src/watch-seo.js`, `src/video-summaries*.js`, and rebuilt guide VideoObject schema.
- Regression tests in `src/guides.test.js` lock the new-guide rules and the generator gates.

## Re-run

```bash
rg -c -i -P '\b(the recording|in the recording|this recording|spoken source|What this recording did not cover)\b' public/guides/*.html
node --test src/guides.test.js --test-name-pattern='new guides|guide-from-spec'
```

## Handoff

- `status`: SHIP (fixes applied; re-measure Search Console in 2–4 weeks)
- `cap_applied`: false
- `raw_overall_score`: ~78 after fixes (Experience and Sources raised; still companion-length pages)
- `final_overall_score`: ~78
- `recommended_next_skill`: rank-tracker / Search Console pull for Skool Hobby, Hostinger n8n, Free Claude comparison
