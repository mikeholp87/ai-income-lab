# Decisions on the 2026-11-10 audit open items

Full audit (untracked, local): `audit-reports/2026-11-10/`. Fixes shipped in 0acd727 (dead watch links, topic titles, hero view count, tap targets, security.txt).

| ID | Decision | Reason |
|---|---|---|
| A-02 contrast | Closed, no change | Measured computed text vs. effective background for every visible text element on `/`, `/guides.html`, a guide, `/start-here.html`, `/videos`, a watch page, in dark and light, at 1440 and 390 px: 0 failures (>= 4.8:1 normal, >= 3.2:1 large; 53-274 elements per run; hero gradient treated as its base colour). |
| A-03 focus ring | Closed, false positive | Hero email pill has a `:focus-within` ring (`src/styles.css:523`); other inputs get the global `:focus-visible` outline. |
| C-01 search visibility | No further on-page edits now. Re-pull Search Console on 2026-11-24 and 2026-12-08 | The two pages with impressions already match their queries (`codex-on-linux` title/H1 cover "codex cli install/download/linux"; `opencode-go` covers pricing/limits). Remaining gap is authority for head terms ("codex cli" pos 42), which edits will not close. Keep publishing and linking from videos. |
| C-02 member proof | Do not add. Owner action | Nothing real to show yet: no testimonials or member results exist in the repo, and none may be invented. When 2-3 members give written permission, add them above the plans on `/` and in `llms.txt`. |
| R-01 Skool join attribution | No code change. Owner action | Join CTAs already carry `utm_*` + `utm_content` (`src/funnel.js`). Skool owns the join event. Monthly: compare Skool new members by source to `skool_outbound_clicked` in GA4; mark `skool_outbound_clicked` and `newsletter_signup` as key events in GA4 Admin. |
| P-01 watch-page player | Keep eager player | The player is the page's purpose and supports `?t=` chapter links; lab perf 97, LCP 2.1 s mobile. |
| S-01 / S-02 | Deferred | Nonce CSP needs a preview deploy test; HSTS `includeSubDomains` needs an inventory of subdomains first. |
