# Backlink findings: www.ai-automation-station.com

Audit date: 2026-10-28. Skill: `seo-backlinks` v2.3.1, free tier only.

## Backlink Health Score: INSUFFICIENT DATA (0/7 factors scored)

Common Crawl is the only configured backlink source. Under the skill's rules, Common Crawl supplies rank and presence signals only, so **no numeric score is produced**, overall or per factor. The report passed `validate_backlink_report.py` with `status: PASS`, 0 errors and 1 info message (`evidence/backlink-validation.json`).

## Data sources

Source availability comes from `backlinks_auth.py --check`, which reported tier 0 ("Basic (Common Crawl + Verify only)").

| Source | Status | Confidence |
|---|---|---|
| DataForSEO | Not installed | n/a |
| Moz API (DA/PA, spam score, anchors) | **Missing key** (`MOZ_API_KEY`) | n/a |
| Bing Webmaster | **Missing key** (`BING_WEBMASTER_API_KEY`) | n/a |
| Keywords Everywhere (0–10 rank) | **Missing key** (`KEYWORDSEVERYWHERE_API_KEY`) | n/a |
| Common Crawl web graph | Available | 0.50 |
| Verification crawler | Available | 0.95 |

Commands run, with `CLAUDE_SEO_PYTHON` set to `cpython-3.12`:

```bash
claude-seo run commoncrawl_graph.py --help
claude-seo run commoncrawl_graph.py ai-automation-station.com --json --timeout 300   # evidence/commoncrawl-graph.json
claude-seo run commoncrawl_graph.py --info --json
claude-seo run verify_backlinks.py --target https://www.ai-automation-station.com --links evidence/known-mentions.json --json   # evidence/verify-backlinks.json
claude-seo run validate_backlink_report.py --report evidence/backlink-report.json --json   # evidence/backlink-validation.json
```

## Section results

| Section | Status | Score | Data source |
|---|---|---|---|
| Profile overview | info | Not Assessed | CC (0.50): domain not in graph |
| Anchor distribution | n/a | Not Assessed | Needs Moz, Bing or DataForSEO |
| Referring domain quality | n/a | Not Assessed | Needs Moz or DataForSEO |
| Toxic links | n/a | Not Assessed | Needs Moz spam score or DataForSEO |
| Top pages by backlinks | n/a | Not Assessed | Needs Moz or DataForSEO |
| Competitor gap | n/a | Not Assessed | Needs Moz or DataForSEO |
| Link velocity | n/a | Not Assessed | DataForSEO only |

## Common Crawl domain metrics (CC, confidence 0.50)

Release `cc-main-2026-jan-feb-mar` is the newest release the tool knows about (`--info`).

| Metric | Value |
|---|---|
| `in_crawl` | false |
| `in_rankings` | false |
| PageRank / rank | null (not in graph) |
| Harmonic centrality / rank | null (not in graph) |
| Hosts (`n_hosts`) | null |
| Tool note | "Domain not found in Common Crawl data. It may be too new, too small, or not yet crawled." |

**How to read this:** the validator's info message applies. "Do NOT interpret as 'low authority' — it means CC hasn't crawled it yet." The newest graph covers January–March 2026, about 7 months before this audit, so any links earned since April 2026 can't appear in it.

## Verified links (verification crawler, confidence 0.95)

The three source pages below were found during the SXO brand-SERP searches. They aren't a complete inventory of backlinks.

| Source | Result | Anchor | rel |
|---|---|---|---|
| checkthecourse.com/communities/skool-ai-automation-station-7346 | **verified** link to the site | `ai-automation-station.com` (naked URL) | `nofollow` |
| skool.com/ai-automation-station-7346/about | `unverifiable_js`: the page is JS-rendered, so a link may exist but can't be confirmed over HTTP | not available | not available |
| exa.ai/library/person/59bsgq2ymr2 | Mentions Mike Holp, TubeAnalytics and VisiScan as text. **No link to the site was found.** The crawler labels this `link_removed`, but no earlier link was ever recorded, so treat it as an **unlinked mention**. | none | none |

## Findings

### BL-1: Backlink authority can't be measured with the configured sources. Severity: **High** (measurement gap)

- **Evidence:** the tier 0 source check shows Moz, Bing and Keywords Everywhere keys all missing. The domain is absent from Common Crawl's Jan–Mar 2026 graph. That leaves 0/7 health factors measurable.
- **Recommendation:**
  1. **Use Google Search Console → Links** (free, first-party) to export top linking sites, top linked pages and anchors. Save the export to `evidence/` and feed it to `verify_backlinks.py`.
  2. Add a free Moz API key and a Bing Webmaster key to `~/.config/claude-seo/backlinks-api.json`, then re-run `/seo backlinks`.
  3. Verify the site in Bing Webmaster Tools; Bing's inbound links report is free.

### BL-2: The domain isn't in the latest Common Crawl web graph. Severity: **Info**

- **Evidence:** `in_crawl: false` for release `cc-main-2026-jan-feb-mar`.
- **Recommendation:** none needed. `public/robots.txt` is `User-agent: * / Allow: /`, so CCBot isn't blocked. Re-check when the next quarterly release ships (`commoncrawl_graph.py --update`).

### BL-3: The only verified third-party link is `nofollow`. Severity: **Low**

- **Evidence:** checkthecourse.com links the site with a naked-URL anchor and `rel="nofollow"`. The Skool `/about` link can't be verified (JS-rendered).
- **Recommendation:** none required. A nofollow, naked-URL listing is a natural profile signal. Track it in a known-links list (`evidence/known-mentions.json`) and re-verify it each quarter.

### BL-4: Unlinked brand mentions exist. Severity: **Low**

- **Evidence:** the Exa person profile mentions Mike Holp, TubeAnalytics and VisiScan without linking the site.
- **Recommendation:** where Mike controls the source profile (LinkedIn, GitHub, X, product sites `tubeanalytics.net` and `visiscan.app`), make sure each one links to `https://www.ai-automation-station.com/`. The homepage already links out to all of these (`index.html` `sameAs`, plus homepage external links to tubeanalytics.net and visiscan.app). Making the links reciprocal on Mike's own properties is safe; these are same-owner profiles, not link schemes.

## Free link-earning opportunities (from on-site evidence, not link data)

1. **Linkable data pages:**
   - `/guides/chatgpt-pro-20x.html` (3,331 words; plan pause/return and Codex limits);
   - `/guides/codex-usage-limits.html`;
   - `/guides/claude-code-vs-codex.html`.

   These are the types of pages tech press and comparison sites cite. The ranking comparisons in the SXO SERP (Zapier, TechRepublic, GenAI Brief) cite benchmark and pricing sources, so adding dated, sourced facts (see SXO-3) raises the chance of being cited.
2. **Sponsor partners:** the homepage "Sponsored builds" section names Runable, Treg.to, DataForSEO and Bluehost. Ask each for a case-study or partner-page link back to the matching guide or watch page.
3. **Course and community directories:** checkthecourse.com already lists the community. Similar Skool and community directories are low-effort, mostly nofollow listings. Pursue them for referral traffic, not for ranking.
4. **YouTube descriptions:** `scripts/tag-youtube-descriptions.mjs` already exists. Make sure each of the 220 video descriptions links its `/watch/<id>` page or matching guide. These links are nofollow but carry referral and entity signals.

## What works

- The site has a consistent entity footprint: Organization `sameAs` lists YouTube and Skool, and Person `sameAs` lists GitHub, LinkedIn and X (`index.html`). That gives search engines clear brand-to-profile links even without measurable backlink data.
- No toxic-link signals were *observed*. This is not an assessment; toxic-link detection needs Moz or DataForSEO.

## Limitations

- **No referring-domain counts, Domain Authority, spam score, anchor distribution or link velocity:** these need Moz, Bing or DataForSEO, and the keys are missing.
- **Common Crawl lag:** the newest release is from Q1 2026.
- **Small verification sample:** only 3 known source URLs were checked. They came from search results, not from a link index.
