# SEO fixes implemented: November 8, 2026

Status: implemented and verified locally. No commit, push or deployment was performed. Existing work in the shared checkout was retained.

## Changes

- **Watch-page player discovery:** `src/archive.js` now renders one privacy-enhanced YouTube iframe in the initial HTML. No click or JavaScript is needed to create it, and the initial URL does not request autoplay. Dimensions and the responsive 16:9 layout are retained. Timestamp query parameters and shared fragments cue the player; deliberate chapter navigation can start playback, including returning to 0:00. Modified clicks retain native link behavior. Removed the watch page's obsolete thumbnail-overlay styles. Guide embeds remain click-to-load.
- **Privacy notice:** `public/privacy.html` now explains that dedicated watch pages connect to YouTube when opened, before playback, while guide embeds connect after pressing play. Optional analytics consent code was not changed.
- **Ten contextual guide links:** added body links across seven existing articles. [implementation-checks.json](implementation-checks.json) records literal sources, destinations, anchors, local canonical checks and observed guide inlinks. These are local build observations, not new live backlinks.
- **Recent watch summaries:** added build context, tools, recorded outcomes and limits for Herdr Desktop, the three-project tour, the Claude Code task-manager demo and CleanYourTV. Sources are saved descriptions, chapters and existing written companions; the displayed attribution does not claim a separate transcript review. CleanYourTV now explicitly retains the unresolved remote-button limitation. Every page links to a relevant written guide.
- **Website titles:** clarified the Herdr, three-project and task-manager watch titles. Social titles and H1s use the reviewed website title. The already descriptive CleanYourTV title was retained. VideoObject keeps the recording's original name. No YouTube metadata was changed. These edits address clarity; no measured CTR improvement is claimed.

## Validation repairs

The full checks exposed several existing checkout issues, repaired without changing their intended assertions:

- Normalize CRLF when reading HTML in guide tests.
- Pin CSS files to LF in `.gitattributes` and normalize the three public stylesheets so immutable cache hashes match the delivered bytes on Windows and Linux. No stylesheet rules were changed for this repair.
- Compare newer guide sitemap dates with their Article `dateModified`, instead of a fixed November 6 date.
- Exclude temporary `.deploy-*` output from source linting.
- Synchronize the newly added local Codex CLI guide's FAQ JSON-LD with its existing visible answers. Its visible guidance was not rewritten.

## Checks completed

- Full suite: `node --test --test-reporter=dot src/*.test.js` passed.
- Lint: `npm.cmd run lint` passed.
- Production compilation: `npm.cmd exec vite build`, followed by `node scripts/prerender.js`, passed. The optional network-based snapshot refresh was not run. The build used existing saved feed data; this was not a fresh YouTube inventory check.
- Focused player regression tests execute the emitted chapter script: initial query/fragment cues do not request autoplay, chapter selection can return to zero, modified clicks are preserved, and fragment changes reuse the player. Every saved upload renders exactly one iframe matching its VideoObject embed URL before scripts run.
- [verify-implementation.mjs](verify-implementation.mjs) passed against the local production output: 64 guide files, ten contextual links, three direct API GET-handler requests returning 200 with initial iframe HTML, all three stylesheet hashes matching the emitted files, accurate privacy wording and a prerendered homepage. The guide inventory grew during the shared-checkout work; the original live audit remains a 63-guide snapshot.
- `git diff --check` passed.

The Vite build reports existing non-fatal warnings about bundled `use client` directives in Vercel dependencies.

## Remaining external verification

After deployment, inspect representative watch pages in Search Console's rendered HTML and video-indexing report. A player in the response fixes the implementation issue but does not prove Google has detected or indexed the video. Collect the current query/page baseline before further title experiments. Re-run mobile performance and browser playback checks when those tools are available; no fresh field Core Web Vitals or browser playback result is claimed here.

The original [audit report](REPORT.md) and live crawl files remain historical evidence. Do not interpret their click-only player count as the behavior of this local implementation.
