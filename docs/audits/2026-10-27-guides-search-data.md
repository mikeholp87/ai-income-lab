# Guides search data — 2026-10-27

Pulled through treg using the team's own Google Search Console and DataForSEO connections (Google, United States, English). DataForSEO cost $0.022 (keyword overview $0.020 + one SERP $0.002); Search Console is free.

## Search Console (July 27 – October 26)

- **Indexing (URL Inspection, all 23 guides + hub):** 22 of 23 guides are "Submitted and indexed". `hermes-desktop.html` is **"Discovered – currently not indexed"**; its only referrers were `/videos/ai-agents` and one guide. Seven pages were last crawled October 9–21 and haven't been recrawled since the October 26 SEO pass: claude-code-vs-codex, codex-workflow, consent-tracking, first-api-request, make-first-automation, youtube-feed, guides.html.
- **Performance:** only 6 guides earned any impressions in 90 days (claude-code-vs-codex 35, codex-workflow 23, first-api-request 11, youtube-feed 11, consent-tracking 7, make-first-automation 3); 2 clicks total. The other 17 were mostly indexed on October 26, so they have no data yet.
- **Sitemaps:** both submitted, 0 errors; Search Console's "indexed" counts read 0, which the API reports unreliably for sitemaps; URL Inspection above is the source of truth.

## Keyword demand (monthly US searches, difficulty 0–100)

| Guide | Best keywords found | Action |
|---|---|---|
| claude-code-for-beginners | claude code install 22,200 (KD 25); how to use claude code 8,100 (26); claude code tutorial 2,900 (40); claude code for beginners 480 | **Retitled**: "Claude Code tutorial for beginners: install and use it" |
| codex-usage-limits | codex usage 12,100 (KD 8); codex usage limits 1,300 (20); codex limits 880 (12) | **Retitled**: "Codex usage limits: check usage, plans and reset times". The SERP for "codex usage" is about where to check usage (OpenAI help, Reddit, usage dashboard), which the guide's FAQ answers |
| codex-on-linux | install codex cli 4,400 (KD 10); codex linux 1,600 (22); codex app linux 590 (0); codex desktop linux 390 (1) | **Retitled**: "Codex on Linux: install Codex CLI and the desktop app" |
| vapi-voice-agent-tutorial | vapi ai 4,400 (KD 24); vapi voice agent 170 | **Retitled**: "Vapi AI tutorial: build a voice agent, test calls, webhooks" |
| hermes-desktop | hermes desktop 5,400 (KD 15); hermes desktop app 1,600 (4) | Title already matches. **Added links** from 9Router and OpenCode guides to get it indexed |
| claude-code-vs-codex | codex vs claude code 14,800 (22); claude code vs codex 5,400 (6) | Already matched (October 22) |
| opencode-vs-claude-code | opencode vs claude code 3,600 (KD 5) | Already matched |
| 9router-setup | 9router 1,600 (KD 5) | Already matched |
| ai-automation | ai automation 9,900 (26); what is ai automation 1,300 | Already matched |
| make-money-with-ai-no-experience | exact phrase 1,300 (KD 8) | Already matched |
| self-host-n8n | n8n docker 1,000 (8); n8n self hosted 1,000 (11) | Already matched |
| ai-side-hustles | ai side hustles 720 (KD 5) | Already matched |
| ai-automation-services-small-business | ai automation agency 4,400 (19); ai automation services 720 (3) | Not retitled: the guide never discusses agencies. **Added link** to Vapi |
| heygen-ai-avatar-tutorial | heygen ai avatar 1,900 (31) | Already matched |
| chatgpt-pro-20x | chatgpt pro 18,100 (56); chatgpt pro price 3,600 (47) | Left alone, too competitive to chase with a title change |
| codex-workflow | how to use codex 2,400 (38); codex tutorial 590 (17) | Left alone, since the guide isn't CLI-specific |
| low demand (≤ 210/mo) | dataforseo mcp 210, react cookie consent 210, how to make an api request 90, make.com tutorial 40, youtube api react 10 | No changes |

## After deploy

1. Resubmit `sitemap.xml` in Search Console (four `lastmod` dates moved to 2026-10-27).
2. In the Search Console UI, request indexing for `hermes-desktop.html` and the seven stale-crawl pages above. The API cannot request indexing for regular pages.
3. Recheck the Search Console query data around November 17 for the four retitled guides.
