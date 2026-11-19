# New guides SEO audit — 2026-11-08

Scope: the 22 guides published 2026-11-07 (commit a2d867a, listed in `src/aas-new-guides.test.js`). The brief said 25; the repo has 22 new guides. The three existing-URL revisions (`claude-models-compared`, `openrouter-setup`, `claude-code-vs-codex`) were deliberately left out of that release. Say so if those are the other three.

Data: DataForSEO via treg, Google US English. 121 keywords for volume (one call), 44 for difficulty, 8 live SERPs. Treg quoted about $0.11; the balance read $100.10 before and after. Search Console was not queried: the pages are one day old and the earlier audits showed GSC impressions on this site are too small to steer on.

Volume caveats: Google Ads rounds small terms to 10 and returns nothing for rare ones, so "0" means "no data", not "no demand". Difficulty of `null` means unscored, which happens for brand terms.

## What is already sound

- All 22: unique title (47–57 chars), unique description (138–160), self-canonical, `index,follow`, in `sitemap.xml` with lastmod, in `llms.txt` and the hub's CollectionPage schema.
- Article + BreadcrumbList + FAQPage schema on every page, author linked to `/about.html`, one H1, 9–16 H2s, a quick-answer paragraph and a table of contents.
- 673–2,072 words each; 7–12 internal links per page. The YouTube embed is click-to-load, so no iframe weight.
- Live check: three sampled URLs return 200; `robots.txt` allows all.

## Keyword data and fit

| Guide | Main target | US vol/mo | KD | In title | Gap |
|---|---|---:|---:|---|---|
| grokbot-for-beginners (+4 GrokBot guides) | grokbot / grok bot | 49,500 | unscored | "GrokBot" | "Grok Bot" spaced form: 0 uses on the page |
| deepseek-harness-first-test | deepseek harness | 18,100 | unscored | yes | SERP is all "what is" explainers; guide has no definition up top |
| herdr-guide, herdr-desktop-app | herdr | 12,100 | 14 | yes, both | two pages for one head term |
| jev-skills-router-setup | jev ai / jev typesafe | 12,100 / 1,300 | unscored | "Jev" | SERP is "what is Jev" (Cloudflare docs, Forbes, you.com) |
| opendesign-linux-slides | opendesign / open design github / open design ai | 6,600 / 590 / 260 | 0 / 20 / 3 | "OpenDesign" | SERP brand is "Open Design"; 0 uses of the spaced form |
| ghostty-debian-configuration | ghostty terminal / themes / config | 6,600 / 2,400 / 1,900 | 23 / 0 / 13 | "Ghostty on Debian" | "ghostty config" used once; title leads with "ghostty debian" (70) |
| chatgpt-images-sketch-workflow | chatgpt image editing | 4,400 | 9 | no | phrase appears 0 times; title leads with "ChatGPT Images Sketch" (no data) |
| runable-audit-website | runable / runable ai | 4,400 / 1,900 | 4 / 5 | "Runable" | "Runable AI" not in title or description |
| muse-code-setup | muse code | 2,900 | 13 | "Muse Code" | SERP is entirely "Meta Muse Code"; "Meta" is in the body only |
| treg-inside-grokbot | treg | 1,900 | 21 | yes | fine |
| trakkr-codex-visibility-workflow | ai visibility / ai visibility tracking | 880 / 320 | 26 / 25 | partly | SERP is "best tools" listicles, so intent mismatch; do not chase |
| codex-seo-workflow | internal linking seo / internal link audit | 590 / 110 | 39 / 13 | "Internal-Link Audits" | query form is "internal link audit" |
| crowdreply-mcp-codex | crowdreply | 320 | 19 | yes | fine |
| grokbot-virtual-office | ai agent dashboard | 260 | 0 | "Agent Dashboard" | fine |
| grokbot-vs-dots | dots.dev | 210 | unscored | yes | fine |
| claude-code-task-manager, ai-threejs-rocket-demo, cleanyourtv-claude-code, rea-video-editor-prototype, run-a-blog-with-grokbot | various | 0–50 | — | — | no measurable demand; these serve video viewers |

SERP notes (top 8 each): "grokbot" is Facebook, YouTube, Medium and a row.so page, so it is weak and winnable. "herdr" is YouTube, Reddit, Medium, docs, HN. "deepseek harness" is Medium, Reddit and small blogs. "ghostty config" is Reddit, ghostty.org docs, dotfile repos. "muse code" is Engadget, Substack, Reddit, review sites. None of the site's pages appears in any of the eight.

## Recommendations, in order of payoff

1. **LCP image is lazy-loaded on all 22 pages.** The hero `<img>` has `loading="lazy"`. The Nov 6 Lighthouse run flagged this on two older guides. Make the hero `loading="eager" fetchpriority="high"` and keep lazy for the rest. Whatever template emits `public/guides/*.html` is the single fix.
2. **GrokBot cluster.** The head term is 49,500/mo with a weak SERP. Make `grokbot-for-beginners` the hub: add "Grok Bot" once in the intro and the FAQ, and link to it with "GrokBot" anchor text from the other four GrokBot guides and from the hub card text.
3. **Muse Code:** put "Meta" in the title, H1 and description first clause ("Meta Muse Code Setup: …"). Searchers use the full name.
4. **OpenDesign:** add "Open Design" (spaced), a link to the GitHub repo (`nexu-io/open-design`) and one sentence naming open-design.ai, so the page matches how the SERP names it.
5. **Ghostty:** retitle toward "Ghostty Config on Debian: Themes and Reload Checks"; make "Ghostty themes" and "Ghostty config" H2s. Together they have about 4,300 searches a month at KD 0–13.
6. **ChatGPT image editing:** work "ChatGPT image editing" into the intro, one H2 and the FAQ; consider "ChatGPT Image Editing: Sketch-to-Scene and Local Edits" as the title. KD 9, 4,400/mo.
7. **Intent fixes for DeepSeek Harness and Jev:** add a two-sentence "What is X" answer directly under the quick answer. Both SERPs reward the definition. For Jev, name TypeSafe and "System One" in the first sentence of the description.
8. **Herdr cannibalization:** both guides target "herdr". Keep the TUI guide as the head-term page and say in the desktop guide's intro that it is the desktop variant, linking up to the TUI guide. "herdr terminal" (210) fits the TUI page; "herdr desktop" and "herdr app" are 10 and 30.
9. **Add `VideoObject` schema to all 22.** Older guides (for example `self-host-n8n.html`) have it; the new ones do not, although each embeds a YouTube video. Reuse that block with each video's ID, title, thumbnail and upload date.
10. **Internal links:** `cleanyourtv-claude-code`, `jev-skills-router-setup` and `opendesign-linux-slides` have one inbound guide link each. Add a contextual link from a related older guide (OpenDesign from `build-apps-with-ai-coding-agents` or `lovable-vs-base44-vs-replit`; Jev from the SEO-tool guides).
11. **Small:** hero alt text is a caption sentence ("Diagram: …"); describe the image and include the topic. Four descriptions are 158–160 chars (`muse-code-setup`, `jev-skills-router-setup`, `grokbot-for-seo`, `grokbot-vs-dots`); trim to 155 or less. Title tag, H1 and Article `headline` are three different strings on every page; Google may rewrite the title, so keep the keyword lead identical across them.
12. **Do not spend time on** keyword work for the five zero-demand pages, or on "ai visibility tracking" (listicle SERP).

## Before changing titles

These pages are a day old. `seo-title-changes` memory: check recent title commits and the volume docs first, and `src/guides.test.js` locks some titles. `src/aas-new-guides.test.js` hard-codes the exact title, description and H1 of all 22, so any retitle needs the test table updated in the same commit.

## Follow-ups

- Reinspect indexing in Search Console after a few days; the Nov 6 follow-up showed new guides "unknown to Google" for a day or more.
- Re-pull Search Console queries in about 2–3 weeks and judge titles on that, not on this volume data alone.
