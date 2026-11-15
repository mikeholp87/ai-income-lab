# Content, search intent and conversion review

Reviewed November 9, 2026 against live HTTP responses and source at the current workspace. Read-only: no forms, payments, newsletter messages or account changes were submitted. This is a representative content review, not a factual verification of every recording or course.

## What is working

- The homepage clearly distinguishes free guides from the paid Skool community. Monthly prices of $29/$49/$89 match the public [Skool plan selector](https://www.skool.com/ai-automation-station-7346/plans) inspected in this run. The website explains the external checkout, annual billing, course unlocks, cancellation and extra tool costs. Private classroom entitlements were not independently verified.
- [Start here](https://www.ai-automation-station.com/start-here.html) offers four task-based paths with prerequisites and a visible finish line. It connects written guides, videos and applicable courses without requiring a login for the free material.
- Sample guides contain quick answers, named authors, dates, specific checks, failure limits and primary sources. The beginner income guide expressly distinguishes practice examples from customer results and avoids an income guarantee.
- Yesterday's watch-page title/summary findings have been addressed on [Herdr Desktop](https://www.ai-automation-station.com/watch/IV6q81wRay4) and [the three-project demo](https://www.ai-automation-station.com/watch/V0PoYhOprBI). Both now have descriptive search titles and structured outcomes/limits. Do not repeat those old findings.
- Product availability is honest: the live homepage and About page both mark TubeAnalytics temporarily unavailable. A web-search cached About result was stale; the direct production response has the correction.

## Recommended improvements

### C1. Update the YouTube-feed tutorial to match its current source

**Priority: medium; effort: small. Confirmed content mismatch.**

[The live tutorial](https://www.ai-automation-station.com/guides/youtube-feed.html) tells the reader the featured card links to YouTube before playing and asks them to verify `youtube.com/watch?v=` links in built HTML. `public/guides/youtube-feed.html:25` and `:43` contain these instructions. In current `src/main.jsx`, `watchUrl` sends embeddable videos to `/watch/:id`; YouTube is the fallback for videos which cannot embed. The tutorial's acceptance check no longer describes the main navigation path.

Change the two statements to verify internal watch links for embeddable videos and the YouTube fallback for non-embeddable videos. Keep the click-to-play statement scoped to the homepage; current dedicated watch pages have a different player-loading policy.

Also append a dated update to the case study at `public/guides/youtube-feed.html:62`. Its historical November 5 account is labeled as such, but its statement that confirmation reuse remains unresolved omits the later 15-minute resubscription window in `api/subscribe.js:135` and `:180`. Explain that mitigation and its remaining limitations rather than claiming either a complete fix or no change. Notification concurrency still needs a separate assessment.

**Acceptance:** a reader can follow the guide against the current repository; historical observations and current behavior are explicitly separated.

### C2. Correct the n8n topic introduction's license terminology

**Priority: medium; effort: small. Confirmed inconsistency.**

[The live n8n topic page](https://www.ai-automation-station.com/videos/n8n) calls n8n an open-source workflow tool, from `src/topics.js:31`. The site's [n8n alternatives guide](https://www.ai-automation-station.com/guides/n8n-alternatives-open-source.html) correctly distinguishes public source under fair-code licenses from OSI open source. The [vendor's documentation repository](https://github.com/n8n-io/n8n-docs/blob/main/docs/n8n-community-license/README.md) and [vendor comparison article](https://blog.n8n.io/open-source-workflow-automation/) support the source-available distinction.

Use “source-available workflow tool” in the topic introduction, with the same license explanation/link used by the guide. This is an accuracy fix; no ranking penalty or conversion loss is established.

**Acceptance:** the hub and guide give consistent licensing descriptions and link to the vendor's current license source.

### C3. Validate the starter kit's advertised first outcome

**Priority: high for onboarding; effort: moderate. Known validation gap, not a proven broken download.**

The homepage promotes a free Make starter kit. Its [download section](https://www.ai-automation-station.com/guides/make-first-automation.html#starter-kit), `public/guides/make-first-automation.html:31`, candidly says the blueprint has not been run in a live Make account. The complete beginner path therefore lacks recorded evidence that its first downloadable exercise imports and works in the intended tool.

In an owner-controlled test account, import the existing blueprint, connect a fictional test sheet and check: approved row copied, rejected row omitted, repeat run adds nothing, newly appended approved row copied. Keep scheduling off. Record the date, relevant module versions and screenshots with fictional data; replace the unverified note only after those checks pass. Do not imply this proves production reliability or exactly-once delivery.

**Acceptance:** a short, reproducible import/run record accompanies the existing manual fallback. No new template library is needed.

### C4. Apply the existing editorial pattern to the newest Windows Herdr video

**Priority: medium; effort: small to moderate. Editorial opportunity.**

[The newest watch page](https://www.ai-automation-station.com/watch/YYZSR1p32EQ) still uses an opinion-led title, “Herdr On Windows Is Better Than I Expected!”, and describes the desktop app as an AI coding agent. Its chapters are more specific: PowerShell installation, themes, mods, credit usage, insights and an Update Forge build. Its only written-companion link points to the terminal guide rather than the newer desktop guide. This contrasts with the improved desktop recording above.

Review the recording and reuse `videoSummaries` for a factual website title, a short observed outcome and limits, plus a link to the desktop companion. A candidate title is “Herdr on Windows: Installation, Themes, Mods and Usage”; verify it against the recording before use. No YouTube rename is required. The desktop guide describes a workspace for existing agents, which is a clearer distinction than calling Herdr itself an agent.

**Acceptance:** title, summary and companion link describe the same recorded workflow. Record query/page baseline before evaluating search impact; no CTR improvement is predicted from wording alone.

### C5. Link the project demo directly to the three repositories

**Priority: medium; effort: small. Confirmed journey gap.**

[The Tasky/Restic-Studio/Luma-Launcher watch page](https://www.ai-automation-station.com/watch/V0PoYhOprBI) tells visitors to inspect each project for source and build instructions, but its live HTML contains zero GitHub links. Its Tools used section renders these three names as plain text (`src/video-summaries.js:23`). The production repository API returns all three public repository URLs, and the homepage already links to them.

Add the existing destinations through the shared tool-link mapping or a small project-links block: [Tasky](https://github.com/mikeholp87/Tasky), [Restic-Studio](https://github.com/mikeholp87/Restic-Studio), [Luma-Launcher](https://github.com/mikeholp87/Luma-Launcher). Link to repository instructions rather than asserting an untested download/platform guarantee.

**Acceptance:** someone watching the demo can reach each demonstrated project's source directly without searching the homepage or YouTube description.

### C6. Establish a current paid-outcome baseline before larger homepage changes

**Priority: high for prioritization; effort: moderate. Measurement recommendation.**

`docs/conversion-measurement.md` correctly separates outbound Skool interest from paid membership and provides an existing reconciliation script. Its recorded validation is one October 7 receipt with unknown attribution; it is not a current reporting dataset. The current site emits outbound clicks, but this source review has no fresh complete 28-day click/member/refund cohort or Search Console export.

Use the existing process to compare the latest complete 28 days with the preceding period: landing pages and search queries; starter-kit downloads; confirmed newsletter subscriptions; Skool outbound clicks; verified new paid memberships and refunds. Keep unmatched attribution unknown and consented events separate from total visitors. Do not divide aggregate clicks and purchases into a claimed user conversion rate.

This evidence should determine whether the next larger investment is clearer plan outcomes, stronger beginner onboarding or particular topic pages. A classroom preview using real permitted material could explain the paid experience, but it is an experiment rather than a demonstrated conversion fix. No testimonials or new paid analytics service are needed to establish the baseline.

## Limits

No live Make import/run, private Skool classroom verification, checkout completion, email submission or current analytics/Search Console export was performed. Public monthly prices matched; annual amounts and private entitlements were not independently confirmed here. These findings establish content/journey issues and evidence gaps, not lost revenue, search penalties or a quantified overall SEO score.
